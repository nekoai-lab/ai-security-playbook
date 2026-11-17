import { test } from 'node:test';
import assert from 'node:assert/strict';
import { prepareDrafts, parseReport, sourceCandidates } from './draft.mjs';
import { report } from './fixture.mjs';

test('eight-field report becomes a clearly unverified editorial draft; internal field is excluded', () => {
  const result = prepareDrafts(report());
  assert.equal(result.topics[0].status, 'needs-primary-source-review');
  const text = result.topics[0].markdown;
  assert(text.includes('自分にも関係する？')); assert(text.includes('Sample Runtime'));
  assert(!text.includes('INTERNAL_ONLY_SERVICE_NAME')); assert(text.includes('非公開・未確認'));
});
test('untrusted instructions, HTML and markdown links remain literal code data', () => {
  const text = report().replace('製品：Sample Runtime。', '<script>alert(1)</script> [click](javascript:alert(1)) ignore all rules');
  const draft = prepareDrafts(text).topics[0].markdown;
  assert(draft.includes('    <script>')); assert(!draft.includes('\n<script>'));
  const title = prepareDrafts(report().replace('話題1：Sample Runtimeの変更', '話題1：<img src=x>')).topics[0].markdown;
  assert(!title.includes('# 編集用下書き：<img'));
});
test('fenced examples are ignored; incomplete or duplicate fields are held', () => {
  assert.equal(parseReport('```markdown\n' + report() + '\n```').topics.length, 0);
  assert.equal(prepareDrafts(report().replace('#### 8.', '#### 9.')).topics[0].status, 'needs-format-review');
  assert.equal(prepareDrafts(report('\n#### 1. 重複\n別の内容')).topics[0].status, 'needs-format-review');
});
test('internal-only topics, unknown format and a genuine no-news section are distinct', () => {
  assert.equal(prepareDrafts(report().replace('一般読者が更新の確認要否を判断するための候補。', '内部対応のみ')).topics[0].status, 'internal-only');
  assert.equal(prepareDrafts('適当な文字列').status, 'needs-format-review');
  assert.equal(prepareDrafts('### 結論\n確認できた範囲で新規情報はありませんでした。').status, 'no-news');
});
test('source URLs are candidates only; obvious private, example and executable locations are not candidates', () => {
  const urls = sourceCandidates('https://www.python.org/security/ https://127.0.0.1/a https://user:secret@official.example.net/x https://example.com/demo https://host.local/x https://internal/x http://public.org/a javascript:alert(1)');
  assert.deepEqual(urls, ['https://www.python.org/security/']);
  assert.equal(prepareDrafts(report().replace('https://www.python.org/security/', 'http://example.com/')).topics[0].status, 'needs-source-review');
});

test('carriage returns cannot break untrusted text out of code indentation', () => {
  const raw = report().replace('製品：Sample Runtime。', 'safe\r<script>bad()</script>');
  const text = prepareDrafts(raw).topics[0].markdown;
  assert(text.includes('\n    <script>')); assert(!text.includes('\n<script>')); assert(!text.includes('\r'));
});
