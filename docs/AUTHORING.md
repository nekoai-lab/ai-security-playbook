# 教材の追加

`src/content/lessons/` にMDXファイルを追加する。ファイル名がURLになる。

```yaml
---
title: "教材のタイトル"
summary: "学べること"
category: "MCP"
updated: "2026-10-23"
order: 6
minutes: 10
---
```

カテゴリは 基礎 / Node.js / MCP / AIエージェント / クラウド。
本文は「結論・対象と前提・図解・安全な確認・チェック・一次資料」を基本にする。
H2は自動で目次に表示される。Flow.astroはstepsとcaptionを受け取り、モバイルで縦並びになる。
公開記事・私的な履歴・公式発表を区別する。未確認の影響と製品の修正取り込みは断定しない。
秘密、端末固有の設定、ログ全文をコミットしない。危険な削除や一括停止を安易に掲載しない。

`npm run check && npm run build && npm test` を実行し、320px/375pxとデスクトップで表示を確認する。
トップの教材一覧と詳細ページは自動追加。学習ルートへの追加は src/pages/index.astro の paths を編集する。
更新日は実際に再確認した日に変更し、何を確認したかを本文に明記する。

## FIELD NOTESデザインシステム

[共通ルール](DESIGN_SYSTEM.md)と公開サイトの `/design-system/` を参照してください。
見出し・図解・表は共通スタイルに従い、各教材で独自の配色を追加しません。
注意書きには `src/components/Notice.astro` をimportして使えます。
脳・臓器は使わず、幾何学的なチップや機械部品で表現します。
