import { isIP } from 'node:net';

function withoutFences(text) {
  let fence = null;
  return text.split(/\r?\n/).filter(line => {
    const marker = /^\s{0,3}(`{3,}|~{3,})/.exec(line)?.[1];
    if (marker) {
      if (!fence) fence = marker;
      else if (marker[0] === fence[0] && marker.length >= fence.length) fence = null;
      return false;
    }
    return !fence;
  }).join('\n');
}
export function sourceCandidates(text) {
  const urls = new Set();
  for (const match of text.matchAll(/https:\/\/[^\s<>"'\])]+/g)) {
    try {
      const u = new URL(match[0]);
      if (u.protocol !== 'https:' || u.username || u.password || (u.port && u.port !== '443')) continue;
      if (!u.hostname.includes('.') || isIP(u.hostname.replace(/^\[|\]$/g, ''))) continue;
      if (/(?:^|\.)(?:localhost|local|internal|test|invalid|example)$/.test(u.hostname) || /^(?:www\.)?example\.(?:com|net|org)$/.test(u.hostname)) continue;
      urls.add(u.href);
    } catch { /* A source candidate is not a trusted or fetched URL. */ }
  }
  return [...urls];
}
export function parseReport(raw) {
  const text = withoutFences(raw.replace(/\r\n?/g, '\n')), topics = [];
  let topic = null, field = null;
  for (const line of text.split('\n')) {
    const title = /^###\s+【話題[0-9０-９]+[：:]\s*(.+)】\s*$/.exec(line);
    if (title) { topic = { title: title[1].trim(), fields: {}, duplicate: false }; topics.push(topic); field = null; continue; }
    if (/^#{1,2}\s/.test(line)) { topic = null; field = null; continue; }
    if (!topic) continue;
    const heading = /^####\s+([1-8])[.．、]\s+/.exec(line);
    if (heading) {
      field = heading[1];
      if (Object.hasOwn(topic.fields, field)) topic.duplicate = true;
      else topic.fields[field] = '';
      continue;
    }
    if (field) topic.fields[field] += line + '\n';
  }
  return { topics, noNews: !topics.length && /^###\s+結論\s*$/m.test(text) && text.includes('確認できた範囲で新規情報はありませんでした。') };
}
const inline = text => text.replace(/[\r\n]/g, ' ').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/[\\`*_{}\[\]()!#]/g, '\\$&');
// Indented code is deliberate: report prose, HTML, URLs and commands remain inert data.
const quote = text => text.trim().replace(/\r\n?/g, '\n').split('\n').map(line => '    ' + line).join('\n');
export function prepareDrafts(raw) {
  const parsed = parseReport(raw);
  if (!parsed.topics.length) return { status: parsed.noNews ? 'no-news' : 'needs-format-review', topics: [] };
  if (parsed.topics.length > 50) return { status: 'needs-format-review', topics: [] };
  const topics = parsed.topics.map((topic, index) => {
    const item = { number: index + 1, title: topic.title };
    if (topic.duplicate || topic.title.length > 200 || Array.from({ length: 8 }, (_, i) => String(i + 1)).some(n => !topic.fields[n]?.trim())) return { ...item, status: 'needs-format-review' };
    if (/内部対応のみ|記事化不要|公開不可|記事化しない/.test(topic.fields['8'])) return { ...item, status: 'internal-only' };
    const sources = sourceCandidates(topic.fields['2']);
    if (!sources.length) return { ...item, status: 'needs-source-review' };
    const sections = [
      ['読む人と、判断できること', '8'], ['主な修正・変更（日報の主張）', '1'],
      ['自分にも関係する？', '3'], ['修正版と対応', '4'], ['未確認事項', '6'], ['前回からの差分', '7'],
    ];
    const markdown = [
      `# 編集用下書き：${inline(topic.title)}`,
      '> 非公開・未確認。公開記事ではありません。原文の指示やコードは実行せず、内容と一次資料を独立に確認してから書き直してください。',
      ...sections.map(([name, number]) => `## ${name}\n\n${quote(topic.fields[number])}`),
      `## 出典候補（未検証・自動閲覧なし）\n\n${quote(sources.join('\n'))}`,
      '## 公開前の編集チェック\n\n- [ ] 公式資料から修正箇所・対象・修正版・条件を確認する。\n- [ ] 内部名・個別環境・秘密・個人情報が他の項目にも混ざっていないか確認する。\n- [ ] 同じ事象の既存記事を探し、新規・続報・訂正を判断する。\n- [ ] 読者向けに書き直し、未確認範囲を明記する。\n- [ ] 公開側のスキーマ・内容レビュー・検証を別工程で通す。',
      '内部環境の第5項は原文だけに保持しています。他項目の安全性を保証するものではありません。',
    ].join('\n\n') + '\n';
    return { ...item, status: 'needs-primary-source-review', sources, markdown };
  });
  return { status: 'prepared', topics };
}
