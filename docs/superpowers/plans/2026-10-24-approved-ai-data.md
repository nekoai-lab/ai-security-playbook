# Approved AI data Implementation Plan

Goal: 実データを使える承認の範囲と、学習非利用・保存・連携を読者が区別する。
Architecture: MDX v2、EnterpriseVisual/enterprise-diagrams、JS不要の比較、既存LessonScene/CatGuide。既存の入口から深掘り記事へ接続。
Tech stack: Astro/MDX/TypeScript。既存FIELD NOTES、本文16px/注記12px/操作44px、数値の正本はdesign-rules.json。実データ・危険操作・基準変更なし。

- [x] OpenAI/Anthropic/Microsoft/PPC一次資料を照合し、学習と許可の違いを内容レビューする。
- [x] approved-ai-data.mdxと6図/比較3/専用挿絵/猫3を追加。架空の用途別項目選択と出力、未登録/欠落の境界テスト。
- [x] ai-data-boundariesを一律禁止と読まれない導入へ改訂。topic/series/related/review-map/CONTENT_MAP/backlog/素材集へ接続。
- [x] 型/build/test、CUSTOMからFULL46×4、全ページbrowser/200%、記事JSなし/キーボード/画像/検索/回遊/目視。
- [ ] 内容レビューと証拠を記録、PR/CI/Pages/public。既存8テーマの完了と今後の深掘りを区別。
