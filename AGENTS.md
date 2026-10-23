# AI Security Playbook

デザイン変更を始めるときは `design/AI_GUIDE.md` を最初に読む。
`npm run design:context -- <変更ファイル...>` が、正本・必要な部品・ガイドの節・確認する画面を返す。
ガイド全文を毎回入力せず、必要な参照先を読む。数値の正本は `design/design-rules.json`、意図は `design/DESIGN.md`。

- FIELD NOTES、正式ロゴA、案内役Cの役割を保つ。既存部品を使い、変更の要件と証拠をSPEC_TRACEへ残す。
- READMEの導入・LICENSE・教材の事実・一次資料・未確認範囲を尊重する。根拠のない影響断定や危険な操作を追加しない。
- 新教材を追加したら `design/review-map.json` も更新する。参照先と教材一覧の整合はテストが確認する。
- `npm run check`、`npm run build`、`npm test` を実行する。
- `npm run design:audit:quick` は途中診断。公開前は `npm run design:audit` の全画面・全幅確認と、キーボード・文字200%・目視が必要。
- 私的ハーネスが使えない場合は未検証と報告する。しきい値の緩和、失敗の除外、過去結果の流用で合格にしない。
- 機械検査と人が見る項目を分け、結果・警告の理由・残課題を `design/UX_REVIEW.md` に残す。
