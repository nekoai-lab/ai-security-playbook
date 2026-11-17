import { test } from 'node:test';
import assert from 'node:assert/strict';
import { collectReports, readReport, reportPath } from './source.mjs';
import { sourceFixture, MAIN, HEAD, PATH } from './fixture.mjs';

test('dated paths match their directory and a real calendar date', () => {
  assert(reportPath(PATH));
  for (const path of ['reports/security/templates/daily-report.md', 'reports/security/2026/02/2026-02-30.md', 'reports/security/2026/09/2026-10-27.md', '../.env']) assert(!reportPath(path));
});
test('main reports are read from verified blobs, not a movable ref or contents endpoint', async () => {
  const f = sourceFixture();
  const { reports } = await collectReports(f.api);
  assert.equal(reports[0].commit, MAIN);
  assert((await readReport(f.api, reports[0])).includes('Sample Runtime'));
  assert(f.calls.every(path => !path.startsWith('contents/') && !path.includes('.env')));
  const bad = async path => path.startsWith('git/blobs/') ? { encoding: 'base64', size: 1, content: 'eA==' } : f.api(path);
  await assert.rejects(readReport(bad, reports[0]), /mismatch/);
});
function withPr(f, { behind = 0, files = [{ filename: PATH, status: 'modified' }], prs = [{ number: 1, head: { sha: HEAD } }], mode = '100644' } = {}) {
  return async path => {
    if (path.startsWith('pulls?')) return prs;
    if (/^pulls\/\d+\/files/.test(path)) return files;
    if (path.startsWith('compare/')) return { behind_by: behind };
    if (path.startsWith(`git/trees/${HEAD}`)) return { truncated: false, tree: [{ ...f.entry, mode }] };
    return f.api(path);
  };
}
test('current PR wins over main, stale PR does not, unrelated PR is not compared', async () => {
  const f = sourceFixture();
  assert.equal((await collectReports(withPr(f))).reports[0].origin, 'pull-request');
  const stale = await collectReports(withPr(f, { behind: 1 }));
  assert.equal(stale.reports[0].origin, 'main'); assert.equal(stale.skipped.length, 1);
  let compared = false;
  const api = withPr(f, { files: [{ filename: 'README.md', status: 'modified' }] });
  await collectReports(async path => { if (path.startsWith('compare/')) compared = true; return api(path); });
  assert.equal(compared, false);
});
test('competing reports, deletions, renames and symlinks stop intake', async () => {
  const f = sourceFixture();
  for (const status of ['removed', 'renamed']) await assert.rejects(collectReports(withPr(f, { files: [{ filename: PATH, status }] })), /removal-or-rename/);
  await assert.rejects(collectReports(withPr(f, { files: [{ filename: 'README.md', previous_filename: PATH, status: 'renamed' }] })), /removal-or-rename/);
  await assert.rejects(collectReports(withPr(f, { mode: '120000' })), /non-regular/);
  await assert.rejects(collectReports(withPr(f, { prs: [{ number: 1, head: { sha: HEAD } }, { number: 2, head: { sha: HEAD } }] })), /conflicting/);
});
test('public source, truncated tree and unbounded pages fail closed', async () => {
  const f = sourceFixture();
  await assert.rejects(collectReports(async path => path === '' ? { private: false } : f.api(path)), /private-source/);
  await assert.rejects(collectReports(async path => path.startsWith('git/trees/') ? { truncated: true, tree: [] } : f.api(path)), /incomplete-source-tree/);
  const files = Array.from({ length: 100 }, () => ({ filename: 'README.md', status: 'modified' }));
  await assert.rejects(collectReports(withPr(f, { files })), /incomplete-api-pages/);
});

test('stale report deletions are skipped and cannot suppress current main',async()=>{const result=await collectReports(withPr(sourceFixture(),{behind:1,files:[{filename:PATH,status:'removed'}]}));assert.equal(result.reports[0].origin,'main');assert.equal(result.skipped.length,1);});
