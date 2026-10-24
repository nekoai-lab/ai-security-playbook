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
