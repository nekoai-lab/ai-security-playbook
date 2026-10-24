# GitHubの公開前ゲート / 第3本レビュー

2026-10-24。緑の検査結果と差分を確認した人を前提に、その後の追加変更、必須の検査、適用ルールと権限を分ける。PR/ブランチ/コミット/CI/ワークフローの用語を場面から説明。

## 原典・境界
mayabot2026-10-21の公開repo保護は運用報告。main直接pushの方針や設定一式を移植せず、本教材はPR経由を説明。ユーザーのリポジトリ設定を変更する作業ではない。
GitHub公式のrulesets、Actions secure-useとworkflow syntaxを照合。PR必須と承認必須、Active/対象/bypass、検査の出所、token権限と別の秘密・通信を区別。自己承認制約や、AIのレビュー文と必須承認を混同しない。
changed-filesの2025年3月の侵害を当事者3/22 GHSA-mw4p-6x4p-x5m5とGitHub GHSA-mrrh-fwg8-r2c3で確認。全利用者の漏えいを断定せず、修正版の番号やPoC、悪性コード、秘密の復号手順を転載しない。SHA固定は信頼した内容の識別であり、悪性commitや実行時取得まで安全にする保証ではない。

架空の検査記録では現在の識別子と必須名・successを照合。空の必須条件は未確認にし、古い成功・欠落・pending/failure/skippedを成功にしない。実際のGitHubの全status/merge条件を再現するコードではないと明記。実通信・実マージなし。permissionsは最小の設定片とし、完成workflowと誤解させない。

6図、3状態のJS不要比較、新場面1、think/point/peek-side3案内。原本/生成指示/catalog/480960WebP。挿絵の門や装飾は概念であり安全証明ではない。

## 統合と検証
19記事/43ルート。developmentの疑問、solo-developmentシリーズの公開前、launch/agent関連へ接続。既存URL維持。
型71ファイル0件、build43、全リンク/base/画像/アンカー、34テスト成功。9coverageと図/コード/出力欠落拒否、古い/欠落/空条件/非成功の境界を確認。
初期CUSTOM3ページ×4幅は192passed/error0。最終FULL github-guards-fullは2744passed/error0/既存色数warning8/manual-review344。基準/除外変更なし。
全43×4幅axe/pageerror/はみ出し、全43ページ文字200%成功。新記事4幅で6図/3比較/猫3・全画像、キーボード・JSなし・320/375px全details200%、検索はURLのqが反映された後に確認。developmentテーマと前後のシリーズの次画像も確認。375/1280pxの比較・固定対象の図・次カードを目視。
既存5記事のpre-policy状態は維持。公開はCI/Pages/URLで確認する。
