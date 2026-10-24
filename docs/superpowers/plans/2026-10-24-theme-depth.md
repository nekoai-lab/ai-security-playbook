# Theme explanation depth Implementation Plan

Goal: 4本の包括的な解説と8テーマの判断できる入口を整備。
Architecture: MDX既存URLを維持しv2 coverageへ移行。図は独立したfoundation-diagrams.tsと共通LessonDiagramで表示。テーマ固有データはtopic-guides.tsへ分離、TopicGuide.astroで共有表示。
Tech Stack: Astro/MDX/TypeScript、既存CSS tokens、静的GitHub Pages。

## Constraints
本文16px、注記12px、操作44px以上。罫線を多用しない。実秘密・実データ・攻撃経路を演習に使わない。事故と脆弱性と架空例を区別。16記事/40ルート。

- [x] 4本を場面・仕組み・具体的な演習結果・一次事例・役割・チェック・次の判断で改訂。Files: src/content/lessons/{ai-data-boundaries,app-architecture,access-control,incident-response}.mdx。heading前のASCIIアンカーでテーマの節導線を安定させる。
- [x] 図の説明をfoundation-diagrams.ts、FoundationVisual.astroへ。DiagramSpecは既存型を利用、LessonDiagram spec/nameで描画。型と内容検査に実図として登録。
- [x] topics全8件にintro/feature/questions/relatedをtyped recordで登録、1本の場合は同じ記事リストを重複表示せず節へ案内。topicページではこの構造を使い、残りの教材と隣接テーマを表示。
- [x] 演習をnode VMで抽出実行し出力検証。認可のA/B/未ログイン/対象なしを拒否、仮名化でも再特定情報が残る比較、APIが余分な項目を返さないこと、失効/調査/復旧の架空時系列を検証。npm testへ追加。
- [x] check/build/test、CUSTOM診断で指摘修正後FULL。ブラウザ全40×4幅、4記事の画像/図/JSなし/200%、8テーマの主入口と節リンク/キーボードを確認。
- [ ] 編集根拠・限界・検証証拠をUX_REVIEWへ記録しPR/CI/Pages/公開確認。
