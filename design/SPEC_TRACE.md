# Design implementation trace / 2026-10-24

| ID | 必須要件 | 出典 | 対象 | 証拠 |
| --- | --- | --- | --- | --- |
| R01 critical | デザインガイドを具体例で充実 | ユーザー依頼10/24 | /design-system/ | 画面・内部リンク検証 |
| R02 critical | Aの羅針盤と猫を正式ロゴに | ユーザー選択A | ヘッダー・favicon・ガイド | PC/スマホ画像 |
| R03 critical | Cをサイト内の案内役に | ユーザー追加依頼 | ルート入口・教材末尾・ガイド | PC/スマホ画像 |
| R04 critical | GitHubのデザインハーネスを取り込む | ユーザー追加依頼 | DESIGN.md / rules / runner / UX_REVIEW | before/after検査 |
| R05 critical | 既存のFIELD NOTES方向を保つ | ユーザー承認10/23 | 共通シェル・教材 | Before/After目視 |
| R06 critical | 脳・臓器を使わない | ユーザー指示10/23 | 全イラスト | 元画像・目視 |
| R07 critical | 320px・文字200%・キーボードを確認 | 既存ハーネス | 代表画面と操作 | ブラウザ検証記録 |

確認状況の集計と画像パスはUX_REVIEW.mdに残す。未確認は完了として扱わない。

R01–R07はUX_REVIEW.mdの対応表とrelease/の証拠で確認済み。追加R08（AIの参照負担削減）はAI_GUIDE.md・review-map.json・context/runnerの5テストで確認。速度改善率は未測定。


## Node教材の完成見本 2026-10-24

| ID | critical要件 | 対象 | 確認方法 |
|---|---|---|---|
| L01 | 学習目標と読む順を明示 | Node冒頭・既存Flow | 目視・目次と内部リンク |
| L02 | 図解から安全な確認へ接続 | 一つを確かめる節 | commandsへの2リンク |
| L03 | 確認済みと未確認を分離 | 本文・記録欄・出典 | 公式再確認と未確認のみの操作 |
| L04 | 記録を手元へ残せる | LessonRecord | 空入力・任意文字・書出し・送信保存なし |
| L05 | 小画面と既存UIを保つ | 開いた記録欄・共通シェル | 4幅・文字200%・keyboard・全体検査 |

証拠と達成状況はNode教材のUX_REVIEWに残す。全条件を確認するまで完成扱いにしない。

L01–L05はNODE_LESSON_REVIEW.mdの証拠で5/5確認済み。目標はoutcomesから目次前に表示する。機械のreview項目と、目視・操作の判断を分けて記録した。

## 2026-10-24 ヘッダー改善
- H01: 明示改行を除去し、通常表示320–1440pxでサイト名を1行表示する。
- H02: ナビに枠・ホバー・フォーカス・現在位置を設け、リンクであることを伝える。実際のタブではないためtabロールは使わない。
- H03: 狭い画面はナビを独立行へ。文字200%では折返しを許し欠落を防ぐ。
- H04: Aの猫とFIELD NOTES、既存教材・LICENSEを維持する。
- 設計: 単一行のワードマーク、区切られた3リンク、ハッシュと一致した項目のみaria-current。ガイド見本も同期する。
- 検証証拠: design/HEADER_REVIEW.md に記録する。

## 公開読者向けの整理（追加指示）
署名・無料表記、非公開原稿名・照合履歴・転載方針を公開ページから削除。LessonRecord部品・書き出し処理・専用CSSを撤去。一次資料と安全判断に必要な留保は維持。帯は朱色を維持し、補足文を12→16px・太字にして英語の装飾ラベルを削除。証拠はHEADER_REVIEWの追記とreader-cleanup検査。

## 育つ教材ライブラリ（2026-10-24承認）
I01: トップの全件列挙をやめテーマ・学習ルート・少数更新の入口へ。
I02: テーマ/前提知識/形式を分離し、Node.jsシリーズとして適用範囲を明記。
I03: 検索/絞り込み/件数/0件/解除/ページ送り/URL復元/JSなし閲覧。
I04: 既存URL維持、シリーズとルートの次を区別し、関連と所属へ戻れる。
I05: 公開/内容更新/情報確認日と変更要約、過去事例の現在確認先。
I06: 全生成ページを検査対象にし、安全上の留保・デザイン・LICENSEを維持。
正本: docs/superpowers/specs/2026-10-24-growing-library-design.md。実装計画は同日growing-library.md。

I01–I06の実装・検証・残課題はdesign/LIBRARY_REVIEW.md。全生成ルートとFULL検査対象の一致を必須化。初回公開日はgit初出、更新日は内容変更、確認日は根拠照合の日を使用し、分類だけの変更で確認日を進めない。

## 個人開発・AI実践教材の拡充（2026-10-24承認）
C01: PHPの2026年10月更新を、AIで作るサイトの実行環境確認と提供元照合へ結びつける。
C02: MCP接続前の信頼・権限・データ送信先を、2026-07-28の公式資料から確認する。
C03: エージェントの指示・実権限・承認・外部データを分離し、具体的な判断例を置く。
C04: 非エンジニアの個人開発に向け、APIキー、認証と認可、公開前の料金・復旧・設定確認を追加する。
C05: 各教材に対象・前提・学習目標・図・具体的な確認・判断例・一次資料と確認日を置く。危険な停止/削除/権限解除コマンドや、入力保存/ダウンロードは導入しない。
C06: 内容に合うテーマと目的別ルートを追加し、Node.js固有の前提を新教材へ押し付けない。全生成画面を検証対象に含める。

C01–C06の実装と内容照合はdesign/CONTENT_REVIEW.md。8分野の充足範囲はdocs/CONTENT_MAP.md。新規9教材に品質v1、旧5教材は導入前として別表示。役割表・チェックリストの証拠・事故と実験の区別を検査と編集レビューへ分離した。

## 2026-10-24 / Reader-first API key article

Approved: retain current site structure and assets; publish the approved API key narrative; increase useful inline diagrams/illustrations; simplify confusing read-next block. Evidence: article is framed for first-time external-service users, five figures show the situation, key types, build path, server boundary and inspection points. Existing compass logo / ExplorerCat / colors / URLs stay. Nine content requirements remain checked via explicit section coverage for narrative v2, not arbitrary fixed public headings. Verify dummy-key code, all routes/widths, route switching and final-step state, keyboard, text 200% and visual review. Results will be recorded in READING_REVIEW.md and UX_REVIEW.md.

## 2026-10-24 / More editorial illustrations and Node.js cards

User approved the key-setting scene and requested this illustration style throughout reading, plus a Node.js article card. Add two scenario artworks (API-key setting, runtime inspection), real-text mechanism diagrams, top-page reading cards and artwork on the existing library entries. Add one contextual Node.js card at the API article end, clearly a separate runtime concern. Maintain existing page structure and PHP feature; no new or duplicate search results. Validate responsive images/alt/CLS, explanatory text under zoom, links/search/route state and all pages/widths.

## 2026-10-24 / Approved illustration archive

Store approved designs and usage guidance for future reuse, as requested. Nine records distinguish formal identity, adopted scenes, poses/layout references, stamps and corrected expressions. Old rounded faces are not the current character reference. No site UI changes; verify source hashes, preview links and identical dist output. Evidence: ILLUSTRATION_LIBRARY_REVIEW.md.

## 2026-10-24 / Use approved cat designs in commands article

User requests actual article use after approving the reusable library. Begin with commands: investigating pose at introduction, peeking neutral face on the execPath distinction, and paw decoration between sections. Create individual transparent assets from approved composition/face references, without sheet labels or drawn card borders. Commands, sources, caveats and evidence-review date remain. Preserve text/keyboard access and reserve art space under text zoom. Verify full routes/widths and actual publication.
# All-article illustrated reading design / 2026-10-24

User authorizes applying approved illustrations to every article, creating meaningful additional art/diagrams and reducing repeated rules. Existing FIELD NOTES direction and individual cat designs are approved; proceed within that scope without another approval loop.

Scope: 14 lessons, shared next/related reading, illustration library and editorial rules. Every lesson gets scenario-relevant illustration and at least two real-text explanatory figures, including existing high-quality figures. Existing API/Node work stays. Use approved walking, thinking, laptop, pointing, side-peeking, tail and corrected-expression designs as individual assets, alongside existing investigate/top-peek/back companion and paws. Six additional scenario scenes provide context; they do not substitute for using the approved pose library.

Each visual must answer a reader question: where does information go, who can do what, what does a version check establish, what evidence remains missing? Technical text remains HTML, not baked into art. Preserve fenced commands, original claims, sources, caveats, checklists and reviewed dates. No new security claims, incidents or operational commands.

Repeated separators around article headings, figure exteriors, notes, checklist rows and next/related sections are removed. Use existing spacing/type/paper backgrounds. Keep table structure, diagram connections, focus rings and meaningful risk cues. Paw decoration has no horizontal rules.

Architecture: per-lesson typed visual data; LessonArt responsive imagery; LessonScene situation/reader question; LessonDiagram layouts for sequence, comparisons and scoped boundaries; existing CatGuide extended with approved poses. LearningContext gets a route-aware image that follows the same target as its link; related articles use compact illustrated cards. Do not copy the same cat into every paragraph.

Verification: matrix of lesson → illustration/pose/figures and insertion point, file/hash/provenance index, check/build/test, commands/URLs invariant comparison, actual image decode, four widths, expanded details, 200% text, no-JS, route-next state, keyboard, axe, screenshots, FULL audit all 38 pages. Record warning reasons/limitations; no threshold changes or excluded failures. Check communication costs and mobile vertical space. Preserve README/LICENSE and existing navigation/URLs.

## 会話ログ・配布物の教材追加（承認済み）
Z01: 2本の読者向けv2教材、各4図以上・挿絵・具体例と観察結果。
Z02: 参考著者の報告と架空演習を区別、原典へリンク。ログ保持と漏えい対応、実配布物の照合を説明。
Z03: 既存ルートとシリーズへ接続、既存ガード事例の限界を補強。
Z04: 全ルートFULL、例の実行、スマホ・文字200%・キーボード・公開URL確認。
計画: docs/superpowers/plans/2026-10-24-log-release-guides.md。証拠はUX_REVIEWへ追記。
Z01–Z04: LOG_RELEASE_REVIEW.md / UX_REVIEW.mdとlog-release-fullの証拠で確認。公開はCI/Pages後に別途確認する。
# 教材の少ないテーマを、理解と判断につながる入口へ

ユーザー方針: テーマを減らさず、丁寧・分かりやすく、必要な説明と具体例を補う。記事数や文字数を増やすだけにしない。

対象: ai-data-boundaries / app-architecture / access-control / incident-responseの4本をv2へ改訂。既存場面と猫ポーズを継続し、各4図以上、架空例のコードと出力、実例の分類・時点・一次資料、3役の確認、証拠つきチェック、分岐した次の行動を設ける。

記事で扱う問い:
- AI入力: 名前を消せば足りるか。入力・保存・学習・連携・共有を区別し、仮名化と情報を減らすことを説明。
- 構成: 動いた画面の裏はどこか。要求/応答、保存、公開、本番/プレビュー、依存更新、担当サービスを説明。
- 権限: ログインして本人のデータしか見えていないのに何が未確認か。画面の絞り込みと処理側の認可、A/B/未ログイン、所有者/操作/ファイル/共有を説明。
- 初動: AIに削除や交換を案内された後、何を終えればよいか。露出と悪用の区別、失効・履歴・保全・復旧・再開を場面別に説明。

全8テーマページ: 固有の状況説明、既存教材の挿絵付き主入口、学ぶ3つの問いと該当記事/節へのリンク、残りの教材、隣接テーマ。教材1本でも空の一覧ページにしない。シリーズや絞り込みの重複CTAを前面に出さない。既存URL/カテゴリ維持。

図はHTMLの文字。図・見出し・猫の周囲の罫線を増やさない。現行16記事/40ルートのまま。既存のREADME/LICENSE/基準は維持。

検証: 架空例の期待結果と拒否ケース、9coverage、内部リンク・節アンカー、型/ビルド/テスト、全40ルート×4幅FULL、axe/キーボード/文字200%/JSなし/画像/目視。既存警告と新規指摘を区別。CIとPages、公開URLを確認。

代替との比較: 単に短文を追加する方法では判断が変わらない。多数の小記事に分割する方法はページ間の移動を増やす。まず4本の包括的な解説とテーマ入口を充実させ、実装固有の手順は必要時に独立させる。

基本解説4本・全8テーマ入口の実装と検証はTHEME_DEPTH_REVIEW.md、UX_REVIEW.md、theme-depth-fullの証拠を参照。
# 外部サービス停止への備え / 1本ずつ作る候補の第1稿

対象は外部画像・AI・認証・予約APIを利用する個人開発者。記事ID external-service-failures、operations、入門解説、20分。17記事/41ルート。

場面: お店の案内アプリの外部画像が表示できない。データなしと通信失敗を区別し、残す機能と止める操作を決める。

範囲: 可用性/縮退/フォールバックを初出で説明。依存先地図、症状と原因の区別、read-only仮想応答でHTTPと空データと不正形式/timeoutを分類する例、独立した代替画像/本文、待ち時間、回数制限/待機と再試行、更新系の重複/結果不明、期限付きキャッシュの注意、障害時の表示/利用者の次操作、復旧確認/監視、担当別確認、証拠付きチェック。原典SCOPEWEST2026-10-17は著者の外部配信停止報告とし、32アバターのデータ削除や20対策全体の検証を主張しない。

視覚: 新規場面1、既存猫ポーズ3、HTML図5以上。失敗状態の比較は実テキスト。縦の罫線を並べない。既存共通LessonDiagram利用。

構造: ServiceFailureVisualとservice-failure-diagramsを分離。既存app-architecture/operationsから関連、solo-developmentシリーズの公開前後の間に置く。operationsテーマの質問を1つ新記事へ。新URLをreview-mapへ追加。

演習: 実通信・実キー・実予約なし。JavaScriptをNode.jsの練習用ファイルで動かす想定を明記し、読まなくても出力と比較できる。transportは事前に定義した架空結果を返すだけ。200空配列/200有効/401/403/429/500/503/timeout/network/JSONや型不正を区別。再試行の実装は本記事の目的外とし、自動リトライをサンプルに入れない。

検証: 原典/MDN/AWS一次資料、9coverage、例の期待結果と境界、41ルートのリンク/base/アンカー、check/build/test、FULL全41×4幅、axe/200%/キーボード/JSなし/画像/目視、PR/CI/Pages/公開。

進捗の正本: docs/CONTENT_BACKLOG.mdに最初の8テーマの実装状況を記載。この1本の完了を、残り全部の完了と報告しない。

外部停止の第1本はSERVICE_FAILURES_REVIEW.md、UX_REVIEW.md、service-failures-fullの証拠で検証。残り4候補と区別して報告する。

外部停止の最終レビュー: 503以外の未分類HTTP失敗を一時的と断定しない。回帰テストで区別し、記事のコードを修正。
# 依存の継続管理 / 候補の第2本

dependency-updates、operations、入門、20分。18教材42ルート。タイトル「自分は直していないのに、更新が必要になるのはなぜ？」。

読者の確認の先: 公開して動く、通知も来た。その次に、自分の構成に何が入り、何を直し、どの公開先で動くかをたどる。

説明: ライブラリ/直接と推移的依存/manifestとlockfile/ランタイムとコンテナ、公開後に新しい脆弱性が見つかること、検知と成立と未確認、CVSS等の重大度だけで優先を決めない、影響経路と修正版/回避策/修正なし、更新差分と互換性/テスト/配信、本番確認、dismiss/未検査/抑制と解消の違い、継続する小さな担当/判断/再確認日。

原典anizozina2026-10-22は運用設計の一次報告。社内期限や企業ツール一式を個人の必須にしない。Apache Log4jの一次公表を脆弱性事例として別に紹介し、全環境で悪用成立としない。

安全な例: 実repo/実脆弱性照合なしの架空リリース記録。検査が成功した0件と検査失敗を分け、PRマージ済みでも稼働版が違う対象を残す。どの版が安全かを番号比較で自作判定しない。実パッケージ変更・install・一括fixは載せない。演習はNode.jsのローカルファイル、通信なし。

図6以上、新場面1と既存猫3。閉じた状態と完了状態を比べるHTMLの詳細表示を用意。既存部品を使い、図と本文に罫線を多用しない。

接続: operationsテーマの主記事を個別Nodeニュースから新しい共通解説へ変更し、Node/PHP個別教材へ案内。update-operationsルートに加え時間更新。新規シリーズは増やさず単体・テーマ・ルートから読める構成。関連リンクとreview-mapに追加。CONTENT_BACKLOGの状態更新。

検証: 原典/Apache/GitHub/npm公式、9coverageと役割/事例/チェック、演習の出力と取得失敗/版差/未反映/未確認、check/build/test、FULL42×4、ブラウザ/画像/JSなし/200%/キーボード/検索とテーマ/次カード、CI/Pages/公開確認。既存色警告を混同しない。

依存管理の回遊: 学習ルートだけに属する記事ではLearningContextが出ない既存条件を修正。シリーズ優先を維持し、該当ルートをfallbackとして次/一覧/ラベル/クエリを静的にも提示する。JSなしと既存シリーズの導線を確認。
# GitHubの公開前ゲート / 第3本

github-guards、development、入門解説20分。19教材43ルート。題「緑のチェックが付いた。その変更を公開していい？」。

読者はAIの修正をPRとCIで確認している人。その確認が何の差分・どの条件・誰の権限で実行されたかを理解する。ブランチ/PR/コミット/CI/ワークフローを初出説明。指示とサービス側ルール、required checksとただの実行、対象枝/Active/bypass、本人レビュー制約、最新差分/検査範囲/失敗の見落とし、検査と公開の権限、信頼できないPRの設定/コード、秘密の渡し方、外部ActionのSHAと限界、更新/報告窓口を分ける。

原典mayabot2026-10-21の公開repo実践を参照するがmain直接pushの方針を移植しない。本教材はPR経由を説明し、実ユーザーrepoの設定変更は行わない。tj-actions changed-files2025年3月の事故は当事者の3/22 advisoryとGitHub公表を確認、侵害されたcommit/タグからの実行、ログへの秘密露出を概要だけ述べPoCなし。

演習: ローカルNode.jsの架空記録。必須check名と現在のcommit、成功、欠落/古い結果/未確認を比べる。GitHubの正確な全statusや全rulesを自作判定するものではない。許可された実マージを実行するコードはない。permissionsの最小片も示し、token権限と秘密やネットワーク制御を混同しない。

図6、比較3、新場面1、猫3。developmentテーマの質問1つを新記事へ、solo-developmentシリーズで公開前の間へ、関連とreview-mapに追加。既存URL/README/LICENSE/検査基準維持。source/date/9coverage/担当/チェックを必須。

検証: 34テスト予定、原文コードの出力・空必須list/欠落/古いcommit/pending/failure、type/build/全43リンク/FULL43×4/全ブラウザ・文字200%/新記事の画像/JSなし/キーボード/検索と回遊/CI/Pages/public。

# シークレット更新を稼働先まで追う / 第4本

secret-rotation、secrets、入門解説20分。20教材44ルート。保存先を更新し新しい実行が成功しても、旧プロセス・定期ジョブ・発行元の旧キーが残る境界を説明する。通常更新と漏えい対応を分け、二重キー対応は提供元が許可した場合だけ。Cloud Runの環境変数は起動時、マウントは読取時という公式仕様を例にし、全クラウドへ一般化しない。

原典numekudiの運用報告と、CircleCI2023-01-12事故報告を分離。架空の版名だけを使うNode演習、6つの実テキスト図、3状態比較、専用場面と猫3。値・実ログ・実キーを扱わず、実変更や失効は実行しない。ロールバック/暗号鍵の例外/次の定期実行までを扱う。

soloシリーズでapi-keysの次へ、secretsテーマ・関連・review-mapへ接続。README/LICENSE/既存URL/検査基準維持。9coverage、コードと結果、担当と証拠付きチェック、一次資料と確認日。check/build/test、FULL44×4、全ページaxeと文字200%、新記事キーボード/JSなし/画像/検索/回遊/目視、CI/Pages/publicで確認。

# 開発者自身の公開情報 / 第5本

developer-privacy、release、入門解説20分。21教材45ルート。本文は既に点検する読者に、コミット作者/プロフィールの初期値とURL/画像や配布物/既存公開の違いを説明する。匿名化保証や全員に実名非公開を勧めない。noreplyと表示名、WebとlocalGit、今後の設定と過去の履歴、pushブロックの最新コミット対象を明確化。

原典のアイコン初期値は著者自身の報告。独立確認した漏えい事故や第三者閲覧の証拠はないため、分類確認できる事例なしと理由を明示。未実施の推奨を実施済みと扱わない。法的な一般化やスキャンなし。既存公開は影響を整理し、履歴書換/forcepushを安易に提示しない。

実際の履歴や個人情報を取得しない架空データ演習、6図・比較3・専用場面・猫3。source/date/9coverage/担当/証拠付きチェック、releaseテーマとsoloシリーズでrelease-artifactsの次へ。README/LICENSE/URL/基準維持。型79、build45、40テスト予定、FULL45×4とbrowser/文字200%、記事画像/操作/JSなし/検索/回遊/目視、CI/Pages/public。

# 企業で使えるAIと個人情報 / 2026-10-24

ユーザーは残る解説を継続し、企業向けAIや学習オフで個人情報を使える条件を明確化するよう指定。既存の8候補は完了済み、CONTENT_MAPの深掘りとしてapproved-ai-dataを追加し、ai-data-boundariesの冒頭・許可・チェック・関連を改訂する。

一律禁止にしない。会社承認の用途・情報区分・必要項目・契約・設定・保持/閲覧・連携/出力先が一致する場合に実データを使う具体例を示す。料金・学習オフ・法人プランのいずれかだけを許可やゼロ保存の判定にしない。同意をすべての利用で必須と断定せず、個別の法令・契約上必要な確認を担当と行う。個人事業主も提供元の非学習と自分の顧客情報取扱いを分ける。

公式資料はOpenAI Business/Enterprise/APIの既定非学習、個人ChatGPTの設定、新規会話・履歴・フィードバック例外、Anthropic商用条件とフィードバック、Microsoft企業データ保護と権限/連携、PPC2023注意喚起。画面/プランの移行・個別契約は現在条件で確認し、全サービスへ一般化しない。過去脆弱性は一次公表で確認できた範囲に限定し、PoCを転載しない。

新記事20分、ai-tools、6実テキスト図、3状態比較、専用黒猫場面と案内3。実データと通信なしの用途別項目選択演習は、許可判定や匿名化を自動化しない。必要情報を残す承認済み業務と、加工だけで足りる作業の両方を説明。22教材46ルート。既存URL/README/LICENSE/数値基準を維持、テーマ/関連/seriesへ接続しreview-map更新。

型/build/43テスト予定、内容9項目と機構/コード/結果の欠落検知、用途未登録/項目不足を検査。CUSTOM診断で本文の折り返しを調整後、FULL46×4、全ブラウザ/200%、記事4幅の画像/図/比較/JSなし/キーボード/検索/テーマ/前後画像を確認。CI/Pages/公開URLまで1本ずつ仕上げる。次の深掘りは独立した候補とし、今回すべて完成と表示しない。
