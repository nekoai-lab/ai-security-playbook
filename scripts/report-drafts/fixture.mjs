import { createHash } from 'node:crypto';
export const MAIN = 'a'.repeat(40), HEAD = 'b'.repeat(40);
export const PATH = 'reports/security/2026/10/2026-10-27.md';
export const report = (extra = '') => `# 調査日報\n\n## 調査項目\n\n### 【話題1：Sample Runtimeの変更】\n${[
 '製品：Sample Runtime。Cookieの検証を見直したとの報告。',
 '[公式資料候補](https://www.python.org/security/) 確認日時は原文参照。',
 '特定の機能を使う場合。実際の稼働環境は未確認。',
 '公式情報から修正版を確認する。',
 'INTERNAL_ONLY_SERVICE_NAME・未対応の内部構成。',
 '利用条件と反映状況は未確認。',
 '新規の報告。',
 '一般読者が更新の確認要否を判断するための候補。',
].map((body,i)=>`#### ${i+1}. 項目\n\n${body}\n`).join('\n')}\n${extra}`;
export function sourceFixture(text = report()) {
  const bytes = Buffer.from(text), blob = createHash('sha1').update(`blob ${bytes.length}\0`).update(bytes).digest('hex');
  const entry = { path: PATH, type: 'blob', mode: '100644', size: bytes.length, sha: blob };
  const calls = [];
  const api = async path => {
    calls.push(path);
    if (path === '') return { private: true };
    if (path === 'commits/main') return { sha: MAIN };
    if (path.startsWith('git/trees/')) return { truncated: false, tree: [entry] };
    if (path.startsWith('pulls?')) return [];
    if (path === `git/blobs/${blob}`) return { encoding: 'base64', size: bytes.length, content: bytes.toString('base64') };
    throw new Error('unexpected fixture request');
  };
  return { api, calls, entry, blob };
}
