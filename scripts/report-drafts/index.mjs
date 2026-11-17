import { constants } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { randomUUID } from 'node:crypto';
import { mkdir, lstat, realpath, readdir, writeFile, chmod, rename, rm, open } from 'node:fs/promises';
import { homedir } from 'node:os';
import { resolve, join, dirname, basename, isAbsolute } from 'node:path';
import { pathToFileURL } from 'node:url';
import { collectReports, readReport, fingerprint } from './source.mjs';
import { prepareDrafts } from './draft.mjs';

async function privateRead(path) {
  const file = await open(path, constants.O_RDONLY | constants.O_NOFOLLOW);
  try {
    const stat = await file.stat();
    if (!stat.isFile() || (stat.mode & 0o077) !== 0 || stat.uid !== process.getuid()) throw new Error('unsafe-private-file');
    return await file.readFile('utf8');
  } finally { await file.close(); }
}
async function ensureDirectory(path) {
  await mkdir(path, { recursive: true, mode: 0o700 });
  const stat = await lstat(path);
  if (!stat.isDirectory() || stat.isSymbolicLink() || stat.uid !== process.getuid()) throw new Error('unsafe-state-directory');
  await chmod(path, 0o700);
}

const HASH = /^[a-f0-9]{64}$/;
async function prospectiveRealpath(path) {
  let current = resolve(path);
  const tail = [];
  for (;;) {
    try { return join(await realpath(current), ...tail.reverse()); }
    catch (e) { if (e.code !== 'ENOENT') throw e; }
    tail.push(basename(current));
    current = dirname(current);
  }
}
export async function privateState(path, cwd = process.cwd()) {
  if (!isAbsolute(path)) throw new Error('absolute-private-state-required');
  try {
    const info = await lstat(path);
    if (info.isSymbolicLink() || !info.isDirectory() || info.uid !== process.getuid()) throw new Error('unsafe-state-directory');
  } catch (e) { if (e.code !== 'ENOENT') throw e; }
  const actual = await prospectiveRealpath(path), here = await realpath(cwd);
  if (actual === here || actual.startsWith(here + '/')) throw new Error('state-inside-workspace');
  for (let parent = actual;; parent = dirname(parent)) {
    try { await lstat(join(parent, '.git')); throw new Error('state-inside-repository'); }
    catch (e) { if (e.code !== 'ENOENT') throw e; }
    if (dirname(parent) === parent) break;
  }
  await ensureDirectory(actual);
  if (await realpath(actual) !== actual) throw new Error('unsafe-state-directory');
  return actual;
}
async function loadBundles(reportsDir) {
  const bundles = [];
  for (const entry of await readdir(reportsDir, { withFileTypes: true })) {
    if (!HASH.test(entry.name) || !entry.isDirectory()) throw new Error('invalid-private-bundle');
    const path = join(reportsDir, entry.name), manifest = JSON.parse(await privateRead(join(path, 'manifest.json')));
    if (manifest.version !== 1 || manifest.reportHash !== entry.name || !Array.isArray(manifest.topics)) throw new Error('incomplete-private-bundle');
    await privateRead(join(path, 'report.txt'));
    for (const topic of manifest.topics) if (topic.draftFile) {
      if (!/^draft-\d{2,4}\.md$/.test(topic.draftFile)) throw new Error('invalid-draft-path');
      await privateRead(join(path, topic.draftFile));
    }
    bundles.push(manifest);
  }
  return bundles;
}
export async function runDrafts({ stateDir, api, sourceRepo, cwd = process.cwd() }) {
  const dir = await privateState(stateDir, cwd);
  const lock = join(dir, 'run.lock'), owner = randomUUID();
  try { await mkdir(lock, { mode: 0o700 }); }
  catch (e) { if (e.code === 'EEXIST') throw new Error('draft-run-already-active'); throw e; }
  let staging;
  try {
    await writeFile(join(lock, 'owner'), owner, { mode: 0o600, flag: 'wx' });
    const reportsDir = join(dir, 'reports');
    await ensureDirectory(reportsDir);
    const previous = await loadBundles(reportsDir);
    const input = await collectReports(api);
    const result = { version: 1, reportsSeen: input.reports.length, unchangedReports: 0, reportsPrepared: 0, draftsCreated: 0, heldTopics: 0, internalTopics: 0, noNewsReports: 0, formatReviewReports: 0, skippedPullRequests: input.skipped.length, newBundles: [] };
    for (const entry of input.reports) {
      if (previous.some(old => old.sourceRepo === sourceRepo && old.source.path === entry.path && old.source.blob === entry.blob)) { result.unchangedReports++; continue; }
      const raw = await readReport(api, entry), hash = fingerprint(`${sourceRepo}/${entry.path}`, raw);
      if (previous.some(old => old.reportHash === hash)) { result.unchangedReports++; continue; }
      const prepared = prepareDrafts(raw);
      const topics = prepared.topics.map(({ markdown, ...item }) => ({ ...item, ...(markdown ? { draftFile: `draft-${String(item.number).padStart(2, '0')}.md` } : {}) }));
      const manifest = { version: 1, reportHash: hash, sourceRepo, source: entry, preparedAt: new Date().toISOString(), status: prepared.status, previousHashes: previous.filter(old => old.sourceRepo === sourceRepo && old.source.path === entry.path).map(old => old.reportHash), topics };
      staging = join(dir, `staging-${randomUUID()}`);
      await mkdir(staging, { mode: 0o700 });
      await writeFile(join(staging, 'report.txt'), raw, { mode: 0o600, flag: 'wx' });
      for (const topic of prepared.topics) if (topic.markdown) await writeFile(join(staging, `draft-${String(topic.number).padStart(2, '0')}.md`), topic.markdown, { mode: 0o600, flag: 'wx' });
      await writeFile(join(staging, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n', { mode: 0o600, flag: 'wx' });
      await rename(staging, join(reportsDir, hash));
      staging = undefined;
      previous.push(manifest);
      result.reportsPrepared++;
      result.draftsCreated += topics.filter(t => t.draftFile).length;
      result.heldTopics += topics.filter(t => t.status.startsWith('needs-') && !t.draftFile).length;
      result.internalTopics += topics.filter(t => t.status === 'internal-only').length;
      result.noNewsReports += prepared.status === 'no-news' ? 1 : 0;
      result.formatReviewReports += prepared.status === 'needs-format-review' ? 1 : 0;
      result.newBundles.push(hash);
    }
    return result;
  } finally {
    if (staging) await rm(staging, { recursive: true, force: true });
    if (await privateRead(join(lock, 'owner')) === owner) await rm(lock, { recursive: true });
    else throw new Error('lock-ownership-lost');
  }
}
export async function main() {
  if (process.argv.length > 2) throw new Error('no-publication-or-extra-arguments');
  const sourceFile = join(homedir(), '.local/state/ai-security-playbook-intake/source.json');
  const sourceRepo = process.env.PLAYBOOK_REPORT_REPO || JSON.parse(await privateRead(sourceFile)).repo;
  if (!/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(sourceRepo)) throw new Error('invalid-source-repository');
  const api = async path => JSON.parse(execFileSync('gh', ['api', '--method', 'GET', `repos/${sourceRepo}${path ? '/' + path : ''}`], { encoding: 'utf8', stdio: 'pipe', maxBuffer: 16 * 1024 * 1024, timeout: 60_000 }));
  const stateDir = process.env.PLAYBOOK_DRAFT_STATE || join(homedir(), '.local/state/ai-security-playbook-drafts');
  const result = await runDrafts({ stateDir, api, sourceRepo });
  // Counts and opaque hashes only: never print report bodies, topic titles or private URLs.
  console.log(JSON.stringify(result, null, 2));
}
if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) main().catch(error => {
  const allowed = new Set(['private-source-required', 'draft-run-already-active', 'report-removal-or-rename', 'conflicting-report-prs', 'state-inside-repository', 'state-inside-workspace', 'unsafe-state-directory', 'incomplete-private-bundle', 'incomplete-source-tree', 'incomplete-api-pages', 'non-regular-report', 'oversized-report']);
  console.error(allowed.has(error.message) ? error.message : 'report-draft-preparation-failed');
  process.exitCode = 1;
});
