# Zenn候補 / 追加5本の公開確認

2026-10-24、Mac miniで1本ずつ実装・内容確認・検証・PR・CI・Pages・公開URL確認まで完了。

| 教材 | PR | 最終Pages | 公開直後のルート数 |
| --- | --- | --- | --- |
| external-service-failures | 17、最終HTTP表示補正18 | 40084624857 | 41 |
| dependency-updates | 19 | 40085878055 | 42 |
| github-guards | 20 | 40092339499 | 43 |
| secret-rotation | 21 | 40093664497 | 44 |
| developer-privacy | 23 | 40094595449 | 45 |

公開URLは https://nekoai-lab.github.io/ai-security-playbook/learn/<教材ID>/ 。各回の公開検証はaudit/2026-10-24/publicationに保存。これらはそれぞれの公開直後の証拠で、古いブラウザ結果を後の変更への新規承認として流用していない。公開サイトで記事タイトル、6図、猫3、画像復号、比較操作、原典リンク、検索、テーマ入口、次記事と画像を確認（各記録の検査項目を参照）。

最終サイトは21教材45ルート。最終コードの型79ファイル0件/build45/40テスト成功。developer-privacy-release FULLは2872passed/error0/既存色数warning8/manual360。全45×4幅axe/pageerror/overflow、全45ページ375px文字200%、修正後の記事4幅・全展開200%・JSなし・キーボード・検索と回遊を確認。警告8はdesign-system14色とcommands15色の4幅で、閾値と対象は変更していない。導入前の旧5記事を今回の品質規則で再認証したとは扱わない。

並行して取り込まれたPR22はresearch/ai-review-replay配下だけの変更で、公開ページ実装と検証契約の変更はなかった。本記録の更新もdocs/design内に限定し、サイトの実装・教材・検証基準は変更しない。

各記事の内容レビュー: SERVICE_FAILURES_REVIEW.md、DEPENDENCY_UPDATES_REVIEW.md、GITHUB_GUARDS_REVIEW.md、SECRET_ROTATION_REVIEW.md、DEVELOPER_PRIVACY_REVIEW.md。事実と架空例、原著者の報告と当事者の事故公表を区別し、危険な実操作や秘密の取得を演習にしていない。
