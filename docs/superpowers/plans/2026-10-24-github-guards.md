# GitHub guards Implementation Plan

Goal: 緑のチェックの意味と、公開までの権限・検査の境界を読者が理解する。
Architecture: MDX v2、GuardVisual/guard-diagrams、JS不要の比較、既存LessonScene/CatGuide/LessonDiagram。
Tech stack: Astro/MDX/TypeScript。本文16px、注記12px、操作44px、危険な実操作なし、基準維持。

- [x] 原典とGitHub公式/当事者advisoryを照合し、具体例→語句→ゲート→架空check→権限/外部部品→担当/チェックの本文を作る。
- [x] 6図・3比較・新場面と猫3。原本/生成指示/catalog/480960WebPを保存。
- [x] development/solo-development/関連記事/review-map/backlogへ追加。
- [x] コード抽出と境界テスト、9coverageと出典。type/build/test、CUSTOM修正、FULL43×4・全browserと200%、記事操作/画像/JSなし/回遊/目視。
- [x] 内容レビュー・証拠、PR/CI/Pages/public。残り2本を区別。
