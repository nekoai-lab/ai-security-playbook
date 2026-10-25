# Search discovery implementation plan

Goal: 全52ページを監査し、検索エンジンとAI検索が内容・発行者・日付・階層を正しく読むための不足を直す。
Architecture: SEO共通データをShellからJSON-LDとしてSSR出力。記事の日付は既存frontmatterを利用し本文の意味や日付を改ざんしない。実ビルドのページ一覧からsitemap.xmlを生成。画像は既存WebPからAVIF配信版を生成しfallbackと元原本/OGPを保つ。
Tech stack: Astro、既存yaml/Sharp、Node標準モジュール、Lighthouse/Playwright（検証専用）。

- [x] 前提監査:全ページのstatus/title/description/canonical/H1/JSON-LD/内部リンク/JSなし本文を実測。GAは停止。root robotsとsitemap、性能ラボを確認。Search Console/実ユーザーCWVは未接続として区別する。
- [x] トップとハブ5ページの説明・重複タイトル1組を修正。Person/WebSite/WebPage/Article、表示と一致するBreadcrumbListを追加。ページ/記事日付/著者/URL/画像の整合をテストする。
- [x] 公開成果物の全HTMLページからsitemap.xmlを生成。lastmodは記事の実データのみ。制作見本/404/クエリURLを含めず、公開headへ参照を出す。無効なサブディレクトリrobotsや順位保証のないAI専用ファイルは追加しない。
- [x] AVIF配信版とmanifestを追加し、PNG/WebPとOGPを維持。heroと共通画像、動的な次記事のsource更新を確認。ビルドで新規素材も生成し、非対応ブラウザはWebPへ。
- [ ] check/build/test、制作見本、全画面4幅と文字200%/キーボード、SEOの前後監査と性能計測。PR/別AIレビュー/CI後に公開し本番確認。根拠付き報告をoutputsへ保存。
