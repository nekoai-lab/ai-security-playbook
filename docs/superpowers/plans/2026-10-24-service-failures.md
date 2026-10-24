# External service failure lesson Implementation Plan

Goal: 正常時の確認の先に、外部停止時の表示と結果不明の判断を学べる1本を公開。
Architecture: 既存MDX v2、LessonScene/CatGuide、共通LessonDiagramを利用。図定義と演習は記事固有ファイルへ分離。
Tech stack: Astro/MDX/TypeScript、既存のFIELD NOTES tokens、GitHub Pages。

Constraints: 本文16px、注記12px、操作44px。安全を猫や色で保証しない。実秘密/実通信/PoC/破壊操作なし。原典と独自例を分け、README/LICENSE/既存URL/検査基準維持。

- [x] 外部停止の記事を状況→事例→仕組み→比較コードと出力→フォールバック→再試行/結果不明→担当→チェック→次の判断で執筆。9coverageを設定。
- [x] 新場面をcanonical画像から生成し原本/指示/catalogを保存。480/960WebPを配信。5点以上の図をservice-failure-diagrams.tsとServiceFailureVisualへ。
- [x] lesson-visualsへ新ID、review-mapへ新URL、シリーズと関連とoperationsテーマへ接続。CONTENT_BACKLOGで残候補を明示。
- [x] scripts/service-failure-example.test.mjsで原文コードを抽出し、成功/空/HTTP/通信/不正形式の結果を検証。構造欠落も不合格、既存検査維持。
- [x] check/build/test、CUSTOM診断→FULL41ルート×4幅、全ルートaxe/文字200%、新記事の全画像・キーボード・JSなし・図/コード出力・目視。レビュー文書に根拠/限界/警告を記録。
- [ ] PR/CI/マージ/Pages/公開確認。第1本公開と残り4候補を区別して報告。
