# 検索・AI検索への公開情報

SEOの正本は本文とfrontmatter。検索・AI検索への掲載や引用を保証する設定はない。

## 教材を追加・更新するとき

- titleは固有で具体的にする。summaryは誰のどんな判断を支えるかを書く。検索語の詰め込みや内容にない効能を書かない。
- published/updatedは実際の日付。軽微なビルドだけで更新日を増やさない。一次資料・条件・未確認範囲はCONTENT_STANDARDに従う。
- Shellが全ページにcanonical、OGP、WebPage/WebSite/Personを出す。教材はArticle、画面にある階層はBreadcrumbList。著者情報の正本はcreator.ts。構造化データにだけ見えない実績やFAQを足さない。
- 構造化データは安全にJSONへシリアライズし、本文と同じ情報を出す。表示形式やGoogleの強調表示は保証されない。
- ビルドの実ルートからsitemap.xmlを生成。lastmodは教材のupdatedのみ。制作見本・存在しないページ・検索クエリURLは含めない。
- 画像は承認済みの原本を保持。images:optimizeで小さくなるAVIFのみ配信に追加、WebPフォールバックとOGPのPNGを保つ。新規画像は台帳へ登録する。
- npm run check / npm run build / npm test。検索のテストは重複・JSON-LD・日付・サイトマップ・派生画像の寸法とハッシュを確認する。表示変更は通常のFULLと制作見本の検証も必要。

## 管理者の確認（2026-10-26 未実施）

1. Google Search Consoleで `https://nekoai-lab.github.io/ai-security-playbook/` のURLプレフィックスを所有権確認する。必要な確認タグ/ファイルはアカウントから取得する。GA設置だけでSearch Consoleの確認が完了したとは扱わない。
2. `https://nekoai-lab.github.io/ai-security-playbook/sitemap.xml` を送信する。トップと代表教材をURL検査し、インデックス、Google選択canonical、クロール情報を確認する。
3. Bing Webmaster Toolsでも同様に登録・サイトマップ送信・URL検査。GA4は流入や検索語を見る道具、検索インデックスの証明とは分ける。
4. 公開後は表示回数・検索語・クリック率・記事への流入・読了/回遊を継続して評価。Lighthouseは検査室の単発値で実ユーザーのCore Web Vitalsとは異なる。

## robotsとAI

このサイトはGitHub Pagesのプロジェクト配下。robots.txtが有効なのは `https://nekoai-lab.github.io/robots.txt` であり、プロジェクト配下に作ってもルートの代わりにならない。監査時のルート404はクロール拒否を意味しない。別リポジトリやドメイン全体の規則はこの変更で操作しない。

GoogleのAI機能には特別なAIファイルや追加schemaは必須でない。HTML本文・内部リンク・一次資料・画像・正しいメタ情報を優先する。OpenAIのOAI-SearchBot（検索）とGPTBot（学習）は別の制御。クロール許可、インデックス、回答への採用は別の段階であり保証しない。llms.txtや利用条件だけで転載/学習を技術的に防止できるとは案内しない。

## 一次資料

- [Google: AI features and your website](https://developers.google.com/search/docs/appearance/ai-features)
- [Article structured data](https://developers.google.com/search/docs/appearance/structured-data/article)
- [Breadcrumb structured data](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb)
- [Build and submit a sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- [Introduction to robots.txt](https://developers.google.com/search/docs/crawling-indexing/robots/intro)
- [OpenAI bots](https://developers.openai.com/api/docs/bots)
