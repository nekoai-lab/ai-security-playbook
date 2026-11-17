import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, writeFile, readdir, stat, mkdir, symlink, rm } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { execFileSync } from 'node:child_process';
import { runDrafts, privateState } from './index.mjs';
import { sourceFixture, report } from './fixture.mjs';
const repo = 'example/private-reports';
async function temp(t) { const root = await mkdtemp(join(tmpdir(), 'report-drafts-')); t.after(() => rm(root, { recursive: true, force: true })); return root; }

test('private bundles are atomic, owner-only, idempotent and preserve edited drafts', async t => {
  const root = await temp(t), stateDir = join(root, 'state'), f = sourceFixture();
  const first = await runDrafts({ stateDir, api: f.api, sourceRepo: repo });
  assert.equal(first.draftsCreated, 1);
  const bundle = join(stateDir, 'reports', first.newBundles[0]);
  for (const name of ['report.txt', 'manifest.json', 'draft-01.md']) assert.equal((await stat(join(bundle, name))).mode & 0o777, 0o600);
  assert.equal((await stat(stateDir)).mode & 0o777, 0o700);
  await writeFile(join(bundle, 'draft-01.md'), 'human editorial changes', { mode: 0o600 });
  const calls = f.calls.length;
  const repeat = await runDrafts({ stateDir, api: f.api, sourceRepo: repo });
  assert.equal(repeat.draftsCreated, 0); assert.equal(repeat.unchangedReports, 1);
  assert.equal(await readFile(join(bundle, 'draft-01.md'), 'utf8'), 'human editorial changes');
  assert(!f.calls.slice(calls).some(path => path.startsWith('git/blobs/')));
  const correction = await runDrafts({ stateDir, api: sourceFixture(report().replace('Cookieの検証', 'Cookieとヘッダーの検証')).api, sourceRepo: repo });
  assert.equal(correction.draftsCreated, 1); assert.notEqual(correction.newBundles[0], first.newBundles[0]);
  const manifest = JSON.parse(await readFile(join(stateDir, 'reports', correction.newBundles[0], 'manifest.json'), 'utf8'));
  assert.deepEqual(manifest.previousHashes, first.newBundles);
});
test('checkout/workspace output and symlink redirection are rejected before writing', async t => {
  const root = await temp(t), checkout = join(root, 'checkout'); await mkdir(checkout); await mkdir(join(checkout, '.git'));
  await assert.rejects(privateState(join(checkout, 'public', 'drafts')), /repository/);
  await assert.rejects(stat(join(checkout, 'public')), /ENOENT/);
  const workspace = join(root, 'workspace'); await mkdir(workspace); const alias = join(root, 'alias'); await symlink(workspace, alias);
  await assert.rejects(privateState(join(alias, 'drafts'), workspace), /workspace/);
  await assert.rejects(stat(join(workspace, 'drafts')), /ENOENT/);
  await assert.rejects(privateState(alias), /unsafe-state/);
});
test('existing locks and incomplete bundles stop instead of deleting or overwriting', async t => {
  const root = await temp(t), stateDir = join(root, 'state'), f = sourceFixture();
  await mkdir(join(stateDir, 'run.lock'), { recursive: true });
  await assert.rejects(runDrafts({ stateDir, api: f.api, sourceRepo: repo }), /already-active/);
  await stat(join(stateDir, 'run.lock'));
  await rm(join(stateDir, 'run.lock'), { recursive: true });
  const first = await runDrafts({ stateDir, api: f.api, sourceRepo: repo });
  await rm(join(stateDir, 'reports', first.newBundles[0], 'draft-01.md'));
  await assert.rejects(runDrafts({ stateDir, api: f.api, sourceRepo: repo }));
  await assert.rejects(stat(join(stateDir, 'run.lock')), /ENOENT/);
});
test('source failure writes no bundle and releases only its own lock', async t => {
  const root = await temp(t), stateDir = join(root, 'state');
  await assert.rejects(runDrafts({ stateDir, sourceRepo: repo, api: async () => { throw new Error('network unavailable'); } }));
  assert.deepEqual(await readdir(join(stateDir, 'reports')), []);
  await assert.rejects(stat(join(stateDir, 'run.lock')), /ENOENT/);
});
test('unknown report is retained for format review; CLI has no publication command', async t => {
  const root = await temp(t), stateDir = join(root, 'state');
  const result = await runDrafts({ stateDir, sourceRepo: repo, api: sourceFixture('unstructured report').api });
  assert.equal(result.draftsCreated, 0); assert.equal(result.formatReviewReports, 1);
  assert.throws(() => execFileSync(process.execPath, [new URL('./index.mjs', import.meta.url).pathname, 'published'], { stdio: 'pipe' }));
});

test('cached bundle symlinks are never followed', async t => {
  const root = await temp(t), stateDir = join(root, 'state'), f = sourceFixture();
  const first = await runDrafts({ stateDir, api: f.api, sourceRepo: repo });
  const raw = join(stateDir, 'reports', first.newBundles[0], 'report.txt');
  const other = join(root, 'do-not-read.txt'); await writeFile(other, 'unrelated private text', { mode: 0o600 });
  await rm(raw); await symlink(other, raw);
  await assert.rejects(runDrafts({ stateDir, api: f.api, sourceRepo: repo }));
  assert.equal(await readFile(other, 'utf8'), 'unrelated private text');
});
