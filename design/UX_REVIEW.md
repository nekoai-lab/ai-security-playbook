# FIELD NOTES v1.1 公開前の確認記録


## A案カード・教材検索・運営者フッター（2026-10-25）

ユーザーがA（PC・スマホとも上部に大きな横長の絵）を承認。トップ/テーマ一覧の8カードを拡大。教材一覧は2本だけだった画像表示を24本へ。既存のLessonScene正本からLessonArtを使用し、新しい絵・書体・色は作らない。画像は2:1・object-position40%、PC3列/中幅2列/スマホ1列。縦長になる分、既存の12件ページングと絞り込みを維持。ルート/シリーズ等は既存のLessonCard表示を保つ。

TsukinekoはOGP #39と共通フッターに限定。サイト内カードへ名前/マークを反復せず、フッターのロゴAと「制作・運営：Tsukineko」で運営主体を示す。リポジトリ内で別のTsukineko名の素材は見つからず、ユーザーが確認した正式ロゴAを使用する。

MPC/全角/エムシーピーをMCPとして照合。AMPC等の無関係な部分文字列は同義化しない。4表記とも同じ5件・MCP教材リンクあり。語に合う教材があるのに条件で0件の場合、語を残してテーマ/段階/種類（トップは段階）を解除できる。0件時のaxeで見つかった結果領域のARIA不備はregion roleで修正。

check（102ファイル0件）/build（50ページ）/test、制作見本build/check成功。公開FULL3196passed/error0/既存warning4、GUIDE FULL60passed/error0/既存warning4。全204画面のaxe・実行エラー・はみ出し0、375px全ページ文字200%。4幅で検索4表記、条件解除と語の維持、戻る、キーボード、検索状態のaxeと文字拡大を確認。0件状態のCUSTOMもerror0。画像上部・比率2:1と実幅（320pxで288px、1280pxのテーマで588px）、全24画像デコード、ページ2、no-JS全24件、カード内署名なしと全50ページのfooter publisherを確認。PC/スマホとフッターを目視。

旧5教材の編集基準移行と、commands/制作見本の計8件の色数注意は別課題として維持。検査基準の緩和・失敗の除外なし。画像と検査記録はdesign/previews/library-discoveryと同日のcatalog-search-* / library-poster-report。OGP #39と別PR、マージ・公開は未実施。

## 要件と証拠

| 要件 | 実装と確認 | 証拠 |
|---|---|---|
| R01 ガイドの拡充 | 12節、ページ構成・スマホ・MDX制作・品質。12リンクを実際に操作 | design-system.astro、ブラウザ記録 |
| R02 正式ロゴA | ヘッダー・favicon、縮小・単色・余白の見本。画像読込確認 | BrandMark、public/brand、identity画像 |
| R03 案内役C | 学習入口・教材末尾。主要操作を妨げない配置を確認 | ExplorerNote、companion/lesson-end画像 |
| R04 既存ハーネス | 契約・要件追跡・実行コマンド・before/after。全28条件のerror 0 | release/VALIDATION.md |
| R05 FIELD NOTES維持 | 紙・黒・朱色、承認済みの機械イラスト。入口・教材・制作ガイドの3型 | before/after、各画面の目視 |
| R06 脳・臓器を使わない | 承認済み機械イラストとA/Cのみ追加。教材の根拠は文章で提示 | docs/IMAGE_ASSETS.md、元画像 |
| R07 小画面・拡大・キーボード | 全7画面×4幅、代表3画面で文字200%と本文スキップ、チェック操作 | browser.json、brand-browser.json |
| R08 AIの参照負担を減らす | 約900文字の入口、変更→参照先の対応表。未知の変更は全画面へ。途中診断と公開前確認を分離 | AI_GUIDE、review-map、5つの回帰テスト |

当初のcritical 7/7と、追加のR08を確認。ここでいう達成は仕様・操作・画面の確認であり、学習効果やAIの速度改善の実証を意味しない。

## 機械検査

- 型検査 0 errors / 0 warnings / 0 hints。7ページのビルド、base・資産・内部リンク・アンカー検査成功。
- AI参照先の選択・不明変更時の全画面への復帰・教材一覧との整合・FULL/QUICKの分離・終了コード伝播の5テスト成功。
- 7画面×320/375/768/1280pxの28条件で横はみ出し、ブラウザエラー、axe WCAG A/AA違反0。
- ロゴ・猫の画像読込、12ガイドリンク、教材チェックリスト、学習入口、キーボードの本文スキップを確認。
- 代表3画面の375px幅で、計算済みの文字サイズを2倍にしてページの横はみ出し0。すべてのスクリーンリーダーやズーム環境の網羅検証ではない。
- 全体のdesign-audit: **436 passed / 12 failed（error 0） / 56 review**。12件はすべて色数のwarning。raw出力のreview 56件は機械では判定しない項目で、下の目視確認と分けて保存した。
- QUICKは3代表画面×2幅の6条件。FULLは全7画面×4幅の28条件。QUICK/CUSTOMは公開承認の代わりにしない。

## 測定方法の修正と前後比較

共通ハーネスの測定v2を使用。検証commit 77538fa、mainへの統合32f1d1b。非公開エンジンのコードはこの公開repoへ含めない。

旧判定は、文中の強調・コード・別の段組みを同じx座標の束として扱っていた。同じ親要素に属する文字ブロックを比較し、指摘へ親・対象のDOMセレクターを付けるよう修正した。コードの明示改行と文中断片を、段落末尾の孤立行と混同しない。旧measure.jsonは元の判定を保つ。

本当の兄弟要素の2px差と短い最終行を引き続き検出する回帰を含む18テスト、共通ハーネスのCI成功を確認。しきい値と有効ルールは変更していない。旧16件の指摘減少を、すべて画面改善による効果とは扱わない。

mainの23eaa34も同じ測定v2・同じ契約・全28条件で再測定した。main-v2は291 passed / 157 failed（error 137） / 56 review、導入案は436 / 12（error 0） / 56。条件ごとの判定数であり、137個の独立した不具合ではない。以前の9/12条件の集計と直接比較しない。

## 目視と判断

共通シェルはPC・タブレット・スマホで確認。ホーム、制作ガイド、5教材の先頭・本文・末尾、表・コード・チェックリストの代表箇所を確認。画像はminiの各audit/screenshotsと /tmp/ai-security-playbook-qa/screenshots に保持する。ブラウザ確認に対応したスクリーンショットを優先し、ビルド成功を見た目の成功へ読み替えない。

| 観点 | 確認した内容 |
|---|---|
| 最初の画面 | ホームの学習開始、教材の題名と目次、ガイドの制作入口が分かる |
| 主な操作 | ホームの朱色ボタンを主操作にする。読了後は次の教材へ進める |
| 階層 | 見出し・本文・補助文字、目次と本文、出典と操作を区別する |
| バランス | Cを各カードへ反復せず、入口と読了位置に限定する |
| 世界観 | 承認済みの紙・インク・朱色・機械図を維持。脳や臓器を追加しない |
| 内容 | 教材の事実、確認日、一次資料、未確認範囲を変更しない |
| 文言 | 次の行動を文字で伝える。未実装の検索やログインを追加しない |
| 画像 | 写真は使用せず、ユーザーが承認した図像と生成条件を保持する |

主観的な好みと学習成果は機械判定と別である。ユーザーの今回の採用判断を方向性の承認とし、利用者テスト済みとは表現しない。

## 残すwarningと負担

色数warningはホーム4条件、ガイド4条件、確認コマンド4条件。学習レベルの識別・意味のある注意/危険色、ガイド内のパレット見本、コードの構文色を保つために残した。ブランドの強調色は朱色。warningの基準値は緩めていない。

スマホでは文字拡大とCの案内でスクロールが増える。詳細ガイド自体をAIの入力として毎回読む運用にはせず、短い入口から正本と必要な節へ進む。AIの参照量は減らせるが、判断時間・品質の改善率、読了率、回遊率は未測定。私的エンジンは公開CIでは実行せず、ローカル確認と公開CIを分ける制約も残る。

## 保存先

当初のbefore/finalは経緯として保持。最新の公開前判断はrelease/、同条件の旧mainはmain-v2/、今回の人による確認と限界はこの文書を参照する。READMEとLICENSE、教材の事実内容は変更していない。

## Node教材の完成見本

同日の追加実装はNODE_LESSON_REVIEW.mdを参照する。目標・確認・手元の記録をつなぎ、追加のcritical L01–L05は5/5確認。公開前の全28条件は引き続きerror 0。最新の証拠はaudit/2026-10-24/node-lessonとnode-lesson-openに保存する。

## 2026-10-24 ヘッダー更新

サイト名の1行表示と操作が分かるナビを実装。最新の検査・警告理由・目視・トレードオフは [HEADER_REVIEW.md](./HEADER_REVIEW.md)。

追加の公開文面整理・記録機能撤去・帯の文字改善後はHEADER_REVIEWの最終版とaudit/2026-10-24/reader-cleanupを参照。旧記録機能の検証記述は履歴。

## 2026-10-24 育つ教材ライブラリ

テーマと検索、目的別ルート、Node.jsシリーズ、日付と更新履歴を分離。要求対応・全18ページの検査・警告理由・導入効果と限界は [LIBRARY_REVIEW.md](./LIBRARY_REVIEW.md)。旧7ページ版の結果を現行版へ流用していない。

## 2026-10-24 個人開発・AI教材の拡充

8分野、全14教材へ。新9教材の内容・事例分類・役割別確認・品質ルール・旧教材との差分・検証は [CONTENT_REVIEW.md](./CONTENT_REVIEW.md)。

## 2026-10-24 / 読み物と図解の改訂

[READING_REVIEW.md](./READING_REVIEW.md)を現行のAPIキー教材・読了欄の確認記録とする。既存構成・資産を再利用し、5図と実コード例を追加。v2は固定見出しではなく9項目のcoverageを検査する。[FULL検査](./audit/2026-10-24/reading-final/VALIDATION.md)と同フォルダのブラウザ・操作結果を参照。旧5教材の内容移行や、全記事の読み物化まで完了したとは扱わない。

## 2026-10-24 / 場面の挿絵とNode.jsカード

[VISUALS_REVIEW.md](./VISUALS_REVIEW.md)に2つの新規挿絵、APIの8図、Node.jsのカード・比較図を記録。既存構成とPHP特集を残し、検索結果は14件のまま。[全幅FULL検査](./audit/2026-10-24/visuals-full/VALIDATION.md)とブラウザ・画像読み込み・操作結果を参照。挿絵を安全性の証拠や技術図として扱わない。


## 2026-10-24 / 記事の猫ガイド

[CAT_GUIDES_REVIEW.md](./CAT_GUIDES_REVIEW.md)に確認コマンド記事への初回配置、個別透過素材、部品化、効果と負担を記録。既存コマンド・一次資料・情報確認日は維持。[FULL検査](./audit/2026-10-24/cats-full/VALIDATION.md)は全38ページ×4幅、error 0。既存の色数警告8件は残す。装飾は読解を支える役割で、安全性の保証や実測した学習効果とは扱わない。


## 2026-10-24 / 全記事の挿絵・図解と罫線の整理

[ARTICLE_VISUALS_REVIEW.md](./ARTICLE_VISUALS_REVIEW.md)に14記事の配置一覧、承認済みポーズの採用、新しい場面、図解、回遊、変更前後と負担を記録。[最新FULL検査](./audit/2026-10-24/articles-full/VALIDATION.md)と同ディレクトリのブラウザ確認を参照。過去の検査を今回の合格へ流用せず、残る色数警告8件と内容移行前の5教材を明記。罫線多用を避けるルールをDESIGNとILLUSTRATION_GUIDEへ追加した。

## 会話ログ・公開ファイル教材（2026-10-24）
- 2本追加し16教材・40ルート。編集・出典・安全境界はLOG_RELEASE_REVIEW.md、計画はdocs/superpowers/plans/2026-10-24-log-release-guides.md。
- FULL: `design/audit/2026-10-24/log-release-full`。2552 passed / 8 warning failed / error 0 / 320 manual-review。全40ルート×4幅。以前と同じdesign-system（14色）とcommands（15色）の色数警告が各4幅残る。新規警告・除外・基準緩和はない。完全無警告とはしない。
- 全40ルート×4幅のaxe・表示・pageerror・はみ出し検査成功、全40ルート375px文字200%成功（browser-report.json）。
- 全16記事×4幅、画像デコード、axe、キーボード、320/375px details全展開200%、JSなしでの本文・図解・次記事を確認（article-report.json、64ケース、既存10ポーズ継続）。
- 新規記事は4図+場面1+猫案内2をそれぞれ実DOMで確認。検索2語と3つのルート別次記事・画像を確認。375/1280pxの導入・場面・図・猫・次カードを目視し、文字・主題欠けなし。画像は480/960WebP、PNG原本は設計資産。
- 型55ファイル0件、40ページビルド/内部リンク、18テスト成功。公開URL確認はデプロイ後に実施。

## 基本解説と少数テーマの拡充（2026-10-24）
- 4本をv2の包括的な読み物に改訂、全8テーマに状況・主記事・3つの疑問と該当節・隣接テーマを追加。16教材/40ルートのまま。内容レビューと根拠はTHEME_DEPTH_REVIEW.md。
- FULL: `design/audit/2026-10-24/theme-depth-full`。2552 passed / error0 / 8既存色数warning / 320 manual-review。design-system14色・commands15色の各4幅のみで、新規警告なし。基準・除外は変更しない。
- 全40ルート×320/375/768/1280pxのaxe/pageerror/はみ出しなし、全40ルート375px文字200%成功（browser-report.json）。
- 8テーマ/4記事×4幅、24疑問のリンクとアンカー、画像、キーボード、JSなし、4記事320/375px details全展開200%成功（topic-article-report.json）。テーマの4記事はそれぞれ4図+場面1+猫2。変更前後の4テーマ/4記事を375pxで比較、375/1280pxで主入口・図・猫・文字階層を目視（comparison.json）。
- check59ファイル0件、build40ページ、24テスト成功。v2の出典map最終行を認識しない検査不具合も修正し、必須条件の欠落を拒否するテストを維持。
- 既存5件のpre-policy状態は維持し、全教材の現行内容基準適合は主張しない。公開確認はCI/Pages後に実施。

## 外部サービス停止の教材1本（2026-10-24）
- external-service-failuresを追加し17記事/41ルート。6図+開いて比べる3状態+場面1+猫3。根拠・限界・内容の編集判断はSERVICE_FAILURES_REVIEW.md、候補の進捗はCONTENT_BACKLOG.md。
- FULL: design/audit/2026-10-24/service-failures-full。2616 passed / error0 / 8既存色数warning / 328 manual-review。design-system14色・commands15色の各4幅のみ。新しいwarningなし。基準/除外の変更なし。
- 全41ルート×4幅のaxe/pageerror/横はみ出し検査、全41ルート375px文字200%成功（browser-report.json）。
- 新記事の4幅、画像デコード、3状態のキーボード開閉、JSなし、320/375px details全展開200%、検索/operationsテーマ/シリーズ次リンクと挿絵を確認（article-report.json）。375/1280pxの場面・状態図・比較・結果不明図・猫・次カードを目視。新しい絵は概念として扱い、本文とHTML図で説明。
- check63ファイル0件、build41、27テストと全ローカルリンク/画像/アンカー/base成功。過去5記事のpre-policy状態は維持し、全教材の現行基準適合は主張しない。
- 公開はPRのCI・Pagesと公開URLを確認して完了とする。

### 外部停止教材の最終内容レビュー補正
未分類HTTP失敗も一時的と表示する例を補正。503の分岐を明示し、400/404/409/500等は原因や回復を断定しない一般的な取得失敗へ。回帰テストを先に追加して失敗、修正後28テスト成功。check63ファイル0件、build41、全内部リンク/アンカー成功。
補正後FULLはservice-failures-finalで2616 passed/error0/既存色数warning8/manual-review328。新記事4幅の全画像/比較操作/axe/文字200%/JSなし/検索/回遊も再確認。全41×4幅のブラウザ検査は補正前service-failures-fullに記録し、この補正では本文の表示コードと回帰テスト、記録のみを変更。補正後の公開URLはデプロイ後に再確認する。

## 依存管理の第2本（2026-10-24）
18教材/42ルート。6図+3状態比較+新場面+猫3。根拠と限界はDEPENDENCY_UPDATES_REVIEW.md。運用の共通入口を新記事へ、update-operationsルート35分。LearningContextはシリーズ優先でpath fallbackを追加。
FULL: dependency-updates-full、2680 passed/error0/既存色数warning8/manual-review336。基準変更/除外なし。全42×4幅axe/pageerror/はみ出し、全42ページ375px文字200%成功。新記事4幅の画像/図/比較/全展開200%/キーボード/JSなし/検索/テーマ/次画像、全18記事の回遊をJS有無で確認。型67ファイル0件、build42、31テストとリンク/base/アンカー成功。公開はCI/Pages/URL確認後。

## GitHub公開前ゲートの第3本（2026-10-24）
19記事/43ルート。6図+3比較+新場面+猫3。根拠と限界はGITHUB_GUARDS_REVIEW.md。開発テーマ/公開前シリーズ/関連に接続。
FULL github-guards-fullは2744passed/error0/既存色数warning8/manual-review344、基準変更と除外なし。全43×4幅axe/pageerror/はみ出し、全43ページ375px文字200%成功。新記事4幅の画像/図/比較/全展開200%/キーボード/JSなし、URL反映後の検索、テーマと前後の次画像を確認。型71ファイル0件、build43、34テストとリンク/base/アンカー成功。公開はCI/Pages/URL後。

## キー更新の第4本（2026-10-24）
20記事44ルート。6図・3比較・専用場面・猫3。SECRET_ROTATION_REVIEW.mdに内容と限界を記録。型75ファイル0件/build44/37テスト成功。初回320px本文2箇所の折り返しを整え、最終FULL2808passed/error0/既存warning8/manual352。全44×4幅axe/overflow/pageerrorと全44文字200%、記事4幅/全展開200%/キーボード/JSなし/検索/テーマ/前後画像を確認。閾値変更・除外なし。公開はCI/Pages/URL後。

## 開発者自身の公開情報 / 第5本（2026-10-24）
21記事45ルート。6図・3比較・専用場面・猫3。内容の根拠・原典の報告との区別・限界はDEVELOPER_PRIVACY_REVIEW.md。型79ファイル0件/build45/40テスト成功。初回の本文/比較見出しの孤立文字を修正し、最終FULL2872passed/error0/既存warning8/manual360。全45×4幅axe/pageerror/overflow、全45ページ375px文字200%、修正後記事4幅/全展開200%/キーボード/JSなし/検索URL反映/テーマ/前後画像成功。目視あり。しきい値変更と除外なし。公開はCI/Pages/URL後。

## 追加5本の公開確認完了（2026-10-24）
1本ずつCI/Pages/公開URLを確認。第5本はPR23/Pages40094595449、公開45ルート成功。全8候補の対応先と各回の証拠はCANDIDATE_PUBLICATION_REVIEW.mdとdocs/CONTENT_BACKLOG.md。今回の完了記録はdocs/designのみ、実装・教材・基準変更なし。

## 企業向けAIと実データ利用（2026-10-24）
22教材46ルート。既存入口に一律禁止でない旨と承認/必要性の図、独立解説に6図/比較3/専用場面/猫3。型83ファイル0件/build46/43テスト成功。CUSTOM初回の320px折り返し3箇所を文言で直し、再診断128passed/error0。FULL approved-ai-full2936passed/error0/既存色数warning8/manual368。全46×4幅axe/overflow/pageerror、全46ページ375px文字200%成功。記事4幅/全展開200%/JSなし/キーボード/検索/テーマ/前後画像と入口の明示/本文リンク/短い既存route画像を確認。目視あり。基準変更と除外なし。内容と未確認範囲はAPPROVED_AI_DATA_REVIEW.md。公開はCI/Pages/URL後。

## クラウドの管理と実行の権限（2026-10-24）
23教材47ルート。6図/比較3/専用場面/猫3、access/series/関連へ接続。型87ファイル0件/build47/46テスト成功。CUSTOMの320px折り返し2箇所を修正、再診断128passed/error0。FULL cloud-account-full3000passed/error0/既存warning8/manual376、全47×4幅axe/pageerror/overflowと全47ページ375px文字200%成功。記事4幅/全展開200%/JSなし/キーボード/検索/テーマ/前後画像を確認し目視あり。構成テストのコード欠落変異をshとjsの実構成へ合わせ、検査基準の緩和はない。内容はCLOUD_ACCOUNT_REVIEW.md。公開はCI/Pages/URL後。

## 2026-10-24 / Featured lessons

## Evidence
- npm run check: 89 files, 0 errors/warnings/hints.
- npm run build: 47 static routes.
- npm test: design 5, catalog 4, content 5 and examples 32 = 46 passing tests.
- Final FULL: design/audit/2026-10-24/featured-final-full, all 47 routes × 320/375/768/1280. 3000 passed, errors 0, warnings 8, manual review prompts 376.
- The 8 existing color-count warnings remain on design-system and commands at four widths each. No thresholds or exclusions changed.
- Browser report: 188 route/width cases, no axe WCAG A/AA violations, page errors or horizontal overflow; all 47 routes at 200% text on 375px.
- Focused report: six unique selected lesson IDs, six real destinations, metadata and decoded images at four widths; correct one/two-column layout; Tab/Enter; homepage 200% text at all four widths; six cards without JavaScript.
- Visual review: final six-card section at 375/1280 and existing guide at 320px/200%. Ivory/ink/orange contrast, heading hierarchy, image composition, reading order and no repeated border decoration reviewed.

## Failure resolved
The first focused 320px/200% run exposed an existing home-paths ExplorerNote overflow (360px document at 320px viewport), outside the new cards. Its grid text child kept its automatic minimum width. A homepage-scoped min-width:0 and overflow-wrap:anywhere produced 320px document width in a minimal browser experiment, then passed the final focused run. No overflow was hidden. Final FULL and browser reports were rerun on the rebuilt final version.

## Scope and limitations
README/LICENSE, lesson facts and article bodies unchanged. The separate uploads-and-input working tree was not altered or published. Five legacy lessons are not newly certified against the newer editorial contract. Automated accessibility and screenshots do not establish complete assistive-technology coverage. The final reports use the isolated mini preview on port 4389; earlier diagnostics are not release evidence.

Publication: pending CI, exact-head merge, Pages and public six-card/link smoke verification.

## 2026-10-25 / Reader navigation

Three purpose/audience entries with explicit prerequisite stages; recommendations unified. See READER_NAVIGATION_REVIEW.md. Public FULL errors 0/warnings4; separate GUIDE FULL errors0/warnings4. Browser200 route/width cases and focused keyboard/no-JS/text200 pass. Eight existing warnings remain across both scopes; no rules changed. 375px first guided choice y4309→887, document9693→6152; layout metrics are not user-test evidence. Article bodies and main #30/#31 preserved.

## 2026-10-25 / Reader navigation release confirmation

Release completed 2026-10-25: PR #34, merge f7ba4fc99d662ae6366b43f88402aa7a5eeec125, CI 40140283928 and Pages 40140345680 succeeded. Live smoke passed all 49 public routes, all 23 prerequisite headers, 3 audience hubs / all stages, eight recommendations, four-width keyboard/text200/old-query checks and no-JS stage links. The public design-system URL returned HTTP404; its source, preview build, link checks and GUIDE FULL remain. See navigation-public-full/public-report.json.
## AIレビューの合格と確認項目（2026-10-25）
24教材48ルート。6図・3比較・表・場面（既存review-workbench-sceneを再利用）・猫3。内容と根拠・限界はAI_REVIEW_TRUST_REVIEW.md。型93ファイル0件/build48/51テスト成功（examples 37）。CUSTOM初回 ai-review-diagnostic-initial は320pxの孤立文字3箇所（本文2・比較の見出し1）をerrorとして指摘。文言を整え、再診断4幅でerror0。表の見出しも短くした。FULL ai-review-full は最終版で3064passed/error0/既存色数warning8（design-system・commandsの各4幅、従来と同じ）/manual-review384。しきい値変更・除外なし。 公開前の内容確認で、猫の見出しと使い回しの1文の言い切りを弱めた（記録と合わない強さ）。この worktree で preview を別ポート（4395）に立ててFULLを再実行し、3064passed/error0/既存warning8で同じ。既定ポート4387に残っていた別作業の古い preview で測ると新記事が404になり誤判定するため、DESIGN_PREVIEW_URL で自分のpreviewを指す。 main の読者導線（#34・#35）の後に載せ直し：level を「発展」、prerequisiteNote を追加、reader-journeys の build-apps に github-guards の次として登録。check/build/test 成功、FULL（自分の preview）3196passed/error0/既存warning4。
全48×4幅のaxe（WCAG 2.0/2.1 A・AA）/pageerror/横はみ出しなし、全48ページ375px文字200%成功（browser-report.json）。新記事は4幅で図8（6図+比較+場面）・猫3・全画像デコード、Tab/Enterで比較の開閉とフォーカス表示位置、320/375pxでdetails全展開200%、JSなしで比較・表・結果が読める、URLのqによる検索、releaseテーマの疑問、シリーズ前後の次カードと画像（article-report.json）。320px・320px文字200%・1280pxの全体と各図を目視。表とコードは既存の横スクロール領域で、320pxでは3列目・長い行がスクロール先になる（既存教材と同じ挙動）。
ブラウザ検査は私的ハーネスと別に、作業用の Playwright + axe-core スクリプトで実施（公開repoには入れていない）。自動検査とスクリーンショットは支援技術での完全な確認を意味しない。公開はCI/Pages/URL確認後。


## Issue #36 / OGP共有カード（2026-10-25）

本体のpreflightは未コミット28件・レーン記載なし・main先行の注意。ユーザー指定どおり本体を修復/変更せず、origin/main 4b24d2dからfeat/ogp-cardsの指定worktreeで作業。.envファイルは開いていない。

Shell headと教材のarticle指定を追加。50ページで全OGP・twitter:card、frontmatter/既存titleとdescriptionの一致、絶対URL/site/base、PNG/JPEG・1200×630を検査。25 PNGを承認済みの正式ロゴA / LessonSceneから生成。見出し64px、3行まで・長い場合shortTitle、summaryなし。ロゴA＋Tsukineko、中央1000×500に重要要素。紙・墨の濃淡と上端12pxの橙色だけ。Node.jsの場面は左へ寄せて顔を保つ。全25枚の猫と文字を目視、トップ・AIレビュー・共通一覧用をPRで提示。

日本語ゴシックfallbackをOFLのNoto Sans JPへ固定し、字形pathへ変換してPNG化。画面用CSS/トークンは変えない。OSフォントへの黙った代替・新しいイラスト生成・原稿/README/LICENSEの変更なし。取得commit/hash/ライセンスと再生成手順はdesign/ogp。

check（105ファイル0件）/build（50ページ）/test成功。制作見本build/check成功。公開FULL3196passed/error0/既存color warning4/manual400、GUIDE FULL60passed/error0/既存color warning4/manual8。全204画面のaxe・横はみ出し・実行エラー0、375pxの全50ページ＋見本文字200%成功。キーボードでトップ段階・一覧検索を確認。変更前後の全50ページbodyが完全一致。ローカルHTTPで25画像200、公開用ビルドの見本404・制作見本200。しきい値変更・検査除外なし。

ogp-metadata-report.json / ogp-browser-report.json / ogp-*-fullを参照。旧5教材の編集基準移行未了と既存8件の色数注意は今回解消した扱いにしない。マージ・公開はしていない。request-qaレビュー後の公開画像URL200と各共有サービスでの表示/キャッシュ確認は未実施。Issueの公開後条件はそこで確認する。

## 2026-10-25 カードの密度・構図の再設計

### 変更と意図
- ユーザーは全面の大きな猫の反復を指摘。小さな図記号だけの案も余白が大きく魅力が下がるため不採用。最終承認は、場面画/のぞく/歩く/下部の場面画を混ぜる案。
- トップとテーマ一覧8件に5構図。24教材とテーマ内教材は場面画と8種以上の既存ポーズ。おすすめ先頭3枚は指さす/APIキー場面/歩く。複数ポーズの使用を実際の配置まで確認した。
- テーマの重複CTAを削除し、見出しと教材リンクを入口へ。段階で1教材なら直接記事へ。学習入口の汎用段階リンク3回反復も整理し、遷移先で段階を1組提示。

### 最終ビルドの機械検査
- check:108ファイル、error/warning/hint 0。build:50ページ。npm test:成功（reader-navigation 10項目含む）。GUIDE build:51ページ、専用check成功。
- 公開FULL:3196 passed、error 0、色数warning 4、manual review 400。GUIDE FULL:60 passed、error 0、色数warning 4、manual review 8。基準・除外・検査対象を変更していない。
- 既存warning:commandsの色数15と制作見本の色数14を4幅で検出。今回のカード由来の色数増加ではない。5本の旧教材の内容品質を、このUI検査で再認定したものではない。
- 公開50ページ×320/375/768/1280＋制作見本4幅の204画面。axe、実行エラー、横はみ出し0。375pxで全50ページ＋制作見本の文字200%を確認。
- MCP/MPC/ＭＰＣ/エムシーピー、0件から検索語を残して条件解除、履歴・キーボード、段階別の見出し遷移先、12件ページ送り、JSなしの24教材/8テーマを4幅で確認。
- 最初に見つかった矢印のサイズ差と語尾の折り返し9件は修正。3ページCUSTOM診断と、その後の全件FULLで再確認。初回指摘はinitial-findings.jsonに残した。

### 目視と実用面
- topics-desktop/mobile、featured-desktop/mobile、library-desktop/mobile、entriesのPC/スマホを確認。原画と照合して最初の場面画の顔の位置を38%へ調整。本文と画像の間に空欄を増やすおすすめの行サイズも修正。
- 顔・見出し・記事リンクの重なり、猫のポーズ/視線/構図の連続、白地の量と教材の密度を一覧で確認。これらは自動監査のmanual review項目とは別の目視記録であり、400件すべてを自動合格と表現しない。
- 場面画とポーズを混ぜるため画面のリズムが変わる。画像を全カード上部へ統一する規則は採らず、IDごとの構図を維持し、追加時は検索後の並びも確認する。
- 記録:design/audit/2026-10-25/card-composition-*。実装プレビュー:design/previews/card-composition/。本文・技術図・OGP・README/LICENSEは変更なし。公開はPRレビュー後。

### OGP公開版との統合確認
作業中にmainへ入った#39（8df7fff）を取り込み、SPEC_TRACEとUX_REVIEWの双方の追記を保持して競合解消。OGP生成とその4テストを含めてcheck/build/test、制作専用build/checkを再実行。公開FULL 3196 passed/error 0/warning 4、GUIDE FULL 60 passed/error 0/warning 4、204画面のaxe/実行エラー/はみ出し0と全ページ文字200%、検索/段階/ページ送り/履歴/JSなしも統合後に再確認。OGP画像・本文の仕様変更なし。UIの実装プレビューも統合後に更新。
