# 教材の追加と更新

`src/content/lessons/` にMDXを追加する。ファイル名が既存のlearn URLになるため、公開後の変更は避ける。

```yaml
---
title: "MCPの権限を確認する"
summary: "連携前に実行範囲と認証情報の渡し方を確かめる。"
topic: "connections"
level: "基本知識が必要"
format: "手順"
published: "2026-10-24"
updated: "2026-10-24"
reviewed: "2026-10-24"
keywords: ["MCP", "権限", "認証", "連携"]
changes: []
minutes: 10
qualityVersion: 1
prerequisites: ["api-keys"]
related: ["agent-permissions"]
---
```

日付と内容は実際の公開・確認に合わせる。公開日は最初の掲載、updatedは内容の変更、reviewedは根拠の再確認。分類やレイアウトの変更だけでreviewedを進めない。読者に関係する変更はchangesへdate/summaryを追加する。非公開の作成過程や原稿名を公開本文へ書かない。

## 分類と回遊

値の正本は`src/data/catalog.ts`。テーマ、前提知識、教材形式は別々に指定する。テーマの入口は教材があるものだけ自動生成される。検索対象はタイトル・説明・keywords。表記揺れ（Node.js/Nodejsなど）も必要に応じてkeywordsへ。教材に関係しない語は入れない。

本文は複製しない。シリーズの読む順番はcatalog.tsのseries、目的別ルートはlearning-paths.tsのidsで明示する。学習ルートの所要時間は教材の合計に合わせる。ルートのリンクからはrouteパラメータを引き継ぎ、そのルート順の次教材を表示する。通常訪問ではシリーズ順。

単独教材にはシリーズ所属は必須でない。その場合は次教材を自動で作らず、同じテーマの関連教材から案内する。新シリーズは対象範囲と読む順序を定義してから追加する。

## 本文と検証

対象・前提・結論・図解・安全な確認・一次資料を示す。outcomesは任意の1〜4件。Flow、Notice、DataTableと共通tokensを使う。脳・臓器、秘密、ログ全文、危険な一括停止は掲載しない。確認できない製品影響は断定しない。記録フォームやダウンロード機能は使わない。

追加ページをdesign/review-map.jsonへ登録。npm run check/build/testとFULL検査を実行する。生成HTMLの全ルートと検査対象の一致、リンク、分類、日付、シリーズ・ルート参照はテストが確認する。空テーマは公開しない。検索・URL復元・キーボード・文字200%・目視も確認する。

## 内容の品質（必読）

新規教材は[CONTENT_STANDARD.md](./CONTENT_STANDARD.md)に従う。想定リスク、事例の事実と限界、役割別の確認、根拠を伴うチェックリストを必須とする。見出しが揃っただけで内容レビューの代わりにしない。

既存v1の構成検査は継続する。具体例・コードと結果を通して学ぶ実践教材ではqualityVersion: 2とreviewSectionsを指定できる。prerequisitesとrelatedは教材IDの配列で、Nodeの入門を一律に前提としない。8分野の定義はcatalog.tsを正本とし、実際に扱う内容へ分類する。

## 図を含む読み物の見本

api-keys.mdxは読者の迷う場面から入り、ArticleVisualでscene/types/build/boundary/inspectを示す。部品は本文を画像化せず、既存ExplorerCat/FieldIconと実テキストを使う。図の目的とcaptionをセットで確認する。記事の目次へ、検査用の項目名をそのまま並べる必要はない。reviewSectionsはCONTENT_STANDARD.md参照。

読了欄の主リンクは次の記事。最後は習得や作業完了を推定せず「このルートはここまで」と表示し、関連する次のテーマへ案内する。順番とルートへの戻りは補助情報としてまとめる。queryのrouteは実在し、その教材を含むものだけ採用する。
