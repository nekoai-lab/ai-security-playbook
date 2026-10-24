# Dependency update lesson Implementation Plan

Goal: 検知から影響判断、修正、本番確認までを個人開発向けに理解できる1本。
Architecture: MDX v2、LessonScene/CatGuideと共通LessonDiagram。記事固有のUpdateVisual / update-diagrams、比較はJS不要のdetails。
Tech stack: Astro/MDX/TypeScript、既存FIELD NOTES tokens。
Constraints: 本文16px/注記12px/操作44px。実インストール・実秘密・本番変更なし。事故/運用報告/架空例を分ける。README/LICENSE/既存URL/検査基準維持。

- [x] dependency-updates.mdxを用語→依存地図→検知/判断→架空記録と出力→修正/本番確認→事例→担当→チェック→次で執筆。
- [x] 新場面を承認キャラから生成、PNG/指示/catalog/480960WebP。6図と2状態の比較を既存部品で配置。
- [x] operationsテーマの主記事、update-operationsルート、Node/PHP/operations関連、lesson-visualsとreview-mapに接続。backlog更新。
- [x] 演習コードを抽出実行し、成功0件/検査失敗/稼働版違い/未確認を検証。構造の欠落拒否を維持。
- [x] check/build/test、CUSTOM→FULL42ルート×4幅、全ブラウザと文字200%、記事画像/図/比較/キーボード/JSなし/検索/回遊/目視。
- [x] レビュー証拠を残しPR/CI/Pages/公開。第2本と残り3本を区別。
