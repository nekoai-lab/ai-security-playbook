# FIELD NOTES / OGP共有カード

Issue #36。画面のCSS・本文・書体トークンを変えず、共有時の情報とPNGだけを追加する。

## 生成

`npm run ogp:generate`（`npm run build` / `build:design`からも実行）。ネットワーク、OSフォント、ブラウザーは不要。`tsx`で既存の`lesson-visuals.ts` / `catalog.ts`を読み、YAML frontmatterのtitle/shortTitleと分野名を使う。画像にsummaryは入れない。

- 1200×630 PNG。左720pxが文字、右480pxが承認済みの挿絵。
- paper / ink / muted / orange / sansの指定は`src/styles/tokens.css`から読む。色を別に定義しない。帯は上端12pxのみ。挿絵とロゴは紙・墨の濃淡へ機械変換し、絵を新しく作らない。
- 正式ロゴA、AI Security Playbook、Tsukinekoを表示。大事な要素はx100–1100 / y65–565へ置く。
- 見出し64px固定、3行まで。3行になる長い題名では既存shortTitleを優先し、なお収まらなければ生成を失敗させる。文字を縮めたり省略記号で切らない。
- 原図は`LessonScene` / `LessonArt`の正本`lesson-visuals.ts`と同じ。Node.jsの場面は左寄せで切り抜き、猫の顔を保つ。ほかは中央。小さな番号入り見本シートを使わない。
- 挿絵のないページは共通の`default.png`を使う。正式ロゴAを大きく表示し、案内役Cと入れ替えない。将来、挿絵未割り当ての教材にも共通画像を使う。

## 書体と再現性

画面の`--font-sans`はシステムフォントとsans-serifの指定で、同じ字体がすべてのOSに存在するわけではない。共有画像では、この日本語ゴシックのfallbackを **Noto Sans JP**へ固定する。画面のCSS・トークンや読み込み書体は変更しない。

`fonts/NotoSansJP.ttf`はGoogle Fontsの固定commitから取得した未改変ファイル。SIL Open Font License 1.1（`fonts/OFL.txt`）と著作権表示を同梱。取得URLとSHA-256は`fonts/SOURCE.json`、実際に使ったhashは`manifest.json`に記録する。

fontkitで400/700の字形を取り出しSVG pathへ変換してからsharpでPNG化する。日本語をOSへ描画依頼しない。欠字は生成エラーにする。フォントファイル自体はpublicへ置かず、サイトの閲覧時には転送しない。画像にした字形はOFLのフォント再配布と区別し、再生成用のTTFにはOFLを維持する。

出典：[Google Fonts / Noto Sans JP](https://github.com/google/fonts/tree/66a36c8c94b1a5d992ee4e7f392fccfe4945767c/ofl/notosansjp)。画像の由来は`docs/IMAGE_ASSETS.md` / `docs/ILLUSTRATION_GUIDE.md`。

## headと検査

`Shell.astro`で全ページにOGP / twitter:cardを出す。教材はarticleとfrontmatterのtitle/summary、それ以外はwebsiteと既存title/description。URLはAstro.siteとBASE_URLを使う。query/hashを共有URLへ含めない。

`npm test`の`ogp.test.mjs`は全公開ルートを読む。必須要素、重複、値、絶対HTTPS URL・base、画像存在・PNG/JPEG・1200×630、生成元hash・字体hash・タイトル・オレンジ帯・ロゴ透過を検査する。不足メタ、相対URL、異なるtype、WebP、誤寸法、欠字、収まらない題名の負例も通さない。

OGPは取得先サービスがカード表示を決める情報であり、Zenn・note・X等がいつ・どの形で表示するかやキャッシュ更新を保証しない。PR段階ではローカルHTTP200を確認する。公開画像URLのHTTP200と実際のサービス上の表示は、request-qaのレビューとマージ後に別途確認する。
