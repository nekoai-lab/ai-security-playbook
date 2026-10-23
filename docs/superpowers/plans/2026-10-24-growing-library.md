# Growing Library Implementation Plan

Goal: 情報が増えてもテーマ・検索・目的別ルートから教材を探せる構造。
Architecture: Astroの既存MDXを単一の本文として維持。taxonomyとseries/pathデータでページを生成し、一覧の絞り込みはURLと同期する軽量なクライアント処理。
Tech Stack: 既存Astro/MDX/TypeScript。新たな依存・認証・バックエンドなし。

## Global Constraints
既存URL、FIELD NOTES、猫A/C、design-rules.jsonの値を維持。根拠のない日付・影響断定を作らない。フォーム保存・書き出しを導入しない。

## 1 分類と参照モデル
- [x] src/data/catalog.tsにthemes/levels/formats/seriesを定義。
- [x] src/content.config.tsにtopic/level/format/published/reviewed/keywords/changesを追加し5教材を移行。
- [x] src/data/learning-paths.tsを目的別の明示的ID順へ。全参照・日付・シリーズの整合を検査する。

## 2 図書館とトップ
- [x] LessonCard/CatalogSearch/TopicCards部品、library/topics/series/paths/updates/aboutページを実装。
- [x] 入力はq/topic/level/type/pageでURL同期。12件ずつ、0件案内と全解除、戻る復元。教材名・説明・キーワードをNFKC正規化し空白区切りAND検索。
- [x] トップの全件列挙をテーマ入口と少数の更新へ変更。ナビは専用ページへ移動し、従来アンカーは保持。

## 3 教材の回遊
- [x] Learnページへ所属テーマ、公開/更新/確認日、前提、LearningContext、関連最大2件を実装。
- [x] routeパラメータは有効な所属教材だけに適用し、他は通常シリーズへ戻す。シリーズとルートで次の教材を分離。

## 4 検証・公開
- [x] npm run check/build/test。新規全ページをreview-mapへ追加し生成済み全HTMLとの一致をテスト。
- [x] FULL全画面×4幅、検索条件・戻る・0件・日本語/英字・ページ送りの境界・ルート終端・不正route・JSなし・文字200%・キーボードを検証。
- [x] desktop/mobileを目視。UX_REVIEWに結果と警告理由を記録。
公開手順: PRのCI成功後にマージし、Pages公開URLを確認する。
