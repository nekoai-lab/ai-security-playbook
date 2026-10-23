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
