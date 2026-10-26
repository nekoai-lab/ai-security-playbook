import { createHash } from 'node:crypto';
import { TextDecoder } from 'node:util';

export const LIMIT = 512_000;
export const sha = value => typeof value === 'string' && /^[a-f0-9]{40}$/.test(value);
export function reportPath(path) {
  const m = /^reports\/security\/(\d{4})\/(\d{2})\/(\d{4}-\d{2}-\d{2})\.md$/.exec(path);
  if (!m || !m[3].startsWith(`${m[1]}-${m[2]}-`)) return false;
  const d = new Date(`${m[3]}T00:00:00Z`);
  return Number.isFinite(d.valueOf()) && d.toISOString().slice(0, 10) === m[3];
}
function fail(code) { throw new Error(code); }
export function fingerprint(path, text) {
  return createHash('sha256').update(path).update('\0').update(text).digest('hex');
}
function regular(entry) {
  if (entry.type !== 'blob' || !['100644', '100755'].includes(entry.mode) || !sha(entry.sha)) fail('non-regular-report');
  if (!Number.isInteger(entry.size) || entry.size < 0 || entry.size > LIMIT) fail('oversized-report');
  return entry;
}
async function tree(api, commit) {
  if (!sha(commit)) fail('invalid-source-commit');
  const data = await api(`git/trees/${commit}?recursive=1`);
  if (data.truncated !== false || !Array.isArray(data.tree)) fail('incomplete-source-tree');
  return data.tree;
}
async function pages(api, path, limit) {
  const all = [];
  for (let page = 1; page <= limit; page++) {
    const part = await api(`${path}${path.includes('?') ? '&' : '?'}per_page=100&page=${page}`);
    if (!Array.isArray(part) || part.length > 100) fail('invalid-api-page');
    all.push(...part);
    if (part.length < 100) return all;
  }
  fail('incomplete-api-pages');
}
export async function collectReports(api) {
  const repository = await api('');
  if (repository.private !== true) fail('private-source-required');
  const head = await api('commits/main');
  const mainTree = await tree(api, head.sha);
  const selected = new Map();
  for (const entry of mainTree.filter(e => reportPath(e.path))) {
    regular(entry);
    selected.set(entry.path, { path: entry.path, blob: entry.sha, commit: head.sha, origin: 'main' });
  }
  const touched = new Set(), skipped = [];
  const prs = await pages(api, 'pulls?state=open&base=main', 10);
  for (const pr of prs) {
    if (!Number.isInteger(pr.number) || pr.number <= 0 || !sha(pr.head?.sha)) fail('invalid-pull-request');
    const files = await pages(api, `pulls/${pr.number}/files`, 30);
    const reports = files.filter(f => reportPath(f.filename) || reportPath(f.previous_filename));
    if (!reports.length) continue;
    const comparison = await api(`compare/${head.sha}...${pr.head.sha}`);
    if (!Number.isInteger(comparison.behind_by) || comparison.behind_by < 0) fail('unknown-source-freshness');
    if (comparison.behind_by > 0) { skipped.push({ pullRequest: pr.number, reason: 'behind-main' }); continue; }
    if (reports.some(f => f.status === 'renamed' || f.previous_filename || !['added', 'modified'].includes(f.status))) fail('report-removal-or-rename');
    const prTree = await tree(api, pr.head.sha);
    for (const file of reports) {
      if (touched.has(file.filename)) fail('conflicting-report-prs');
      touched.add(file.filename);
      const entry = prTree.find(e => e.path === file.filename);
      if (!entry) fail('missing-report-blob');
      regular(entry);
      selected.set(file.filename, { path: file.filename, blob: entry.sha, commit: pr.head.sha, origin: 'pull-request', pullRequest: pr.number });
    }
  }
  return { reports: [...selected.values()].sort((a, b) => a.path.localeCompare(b.path)), skipped };
}
export async function readReport(api, entry) {
  if (!reportPath(entry.path) || !sha(entry.blob)) fail('invalid-report-reference');
  const blob = await api(`git/blobs/${entry.blob}`);
  if (blob.encoding !== 'base64' || typeof blob.content !== 'string' || blob.size > LIMIT) fail('invalid-report-blob');
  const base64 = blob.content.replace(/\s/g, '');
  if (!/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(base64)) fail('invalid-report-encoding');
  const bytes = Buffer.from(base64, 'base64');
  if (bytes.length > LIMIT || bytes.length !== blob.size) fail('invalid-report-size');
  const actual = createHash('sha1').update(`blob ${bytes.length}\0`).update(bytes).digest('hex');
  if (actual !== entry.blob) fail('report-blob-mismatch');
  return new TextDecoder('utf-8', { fatal: true }).decode(bytes);
}
