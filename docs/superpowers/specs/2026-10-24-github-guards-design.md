# GitHubの公開前ゲート / 第3本

github-guards、development、入門解説20分。19教材43ルート。題「緑のチェックが付いた。その変更を公開していい？」。

読者はAIの修正をPRとCIで確認している人。その確認が何の差分・どの条件・誰の権限で実行されたかを理解する。ブランチ/PR/コミット/CI/ワークフローを初出説明。指示とサービス側ルール、required checksとただの実行、対象枝/Active/bypass、本人レビュー制約、最新差分/検査範囲/失敗の見落とし、検査と公開の権限、信頼できないPRの設定/コード、秘密の渡し方、外部ActionのSHAと限界、更新/報告窓口を分ける。

原典mayabot2026-10-21の公開repo実践を参照するがmain直接pushの方針を移植しない。本教材はPR経由を説明し、実ユーザーrepoの設定変更は行わない。tj-actions changed-files2025年3月の事故は当事者の3/22 advisoryとGitHub公表を確認、侵害されたcommit/タグからの実行、ログへの秘密露出を概要だけ述べPoCなし。

演習: ローカルNode.jsの架空記録。必須check名と現在のcommit、成功、欠落/古い結果/未確認を比べる。GitHubの正確な全statusや全rulesを自作判定するものではない。許可された実マージを実行するコードはない。permissionsの最小片も示し、token権限と秘密やネットワーク制御を混同しない。

図6、比較3、新場面1、猫3。developmentテーマの質問1つを新記事へ、solo-developmentシリーズで公開前の間へ、関連とreview-mapに追加。既存URL/README/LICENSE/検査基準維持。source/date/9coverage/担当/チェックを必須。

検証: 34テスト予定、原文コードの出力・空必須list/欠落/古いcommit/pending/failure、type/build/全43リンク/FULL43×4/全ブラウザ・文字200%/新記事の画像/JSなし/キーボード/検索と回遊/CI/Pages/public。
