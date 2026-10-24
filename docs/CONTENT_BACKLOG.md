# Zenn候補から作る教材の進捗

元の選定は2026-10-24、8テーマ。記事を一括で薄く量産せず、1本ごとに具体例・図・一次資料・検証・公開まで仕上げる。公開後にURL確認し、完了として報告する。作業中と公開済みを混同しない。

| 候補 | 実装状況 | 対応先 |
| --- | --- | --- |
| 会話・ログに残る秘密 | 公開済み | ai-work-logs |
| 公開物・配布物の検査 | 公開済み | release-artifacts |
| ガードの効く範囲 | 既存記事へ反映済み | agent-permissions / operations |
| 外部サービス停止への備え | 公開済み（PR17/Pages40084134651、最終レビューでHTTP表示を補正） | external-service-failures |
| 依存の継続管理 | 公開済み（第2本、PR19/Pages40085878055、URL確認済み） | dependency-updates |
| GitHubの保護とCI権限 | 公開済み（第3本、PR20/Pages40092339499、URL確認済み） | github-guards |
| シークレットのローテーション | 公開済み（第4本、PR21/Pages40093664497、URL確認済み） | secret-rotation |
| 開発者自身の公開情報 | 公開済み（第5本、PR23/Pages40094595449、URL確認済み） | developer-privacy |

選定した8テーマはすべて対応済み。うち「ガードの効く範囲」は既存記事へ反映し、残りは独立教材として公開した。今回の5本は1本ずつ検証・公開URL確認まで完了。基本解説4本・テーマ入口8件の改訂や、AWSアカウント等の後続検討とは分けて記録する。公開直後の証拠はdesign/CANDIDATE_PUBLICATION_REVIEW.md。

## CONTENT_MAPに基づく次の深掘り

- approved-ai-data: 公開済み（PR25/Pages40096505211、記事と入口のURL確認済み）。企業で使う個人情報と、個人向け有料版/非学習の違い。ai-data-boundariesも改訂。
- cloud-account-safety: 実装・検証済み、公開はCI/Pages/URL確認。個人開発のクラウド管理アカウント、MFA、日常権限、復旧と料金の分離。
- ai-review-trust: 実装・検証済み、公開はCI/Pages/URL確認。AIレビューの合格が照らす範囲、同じ版でのぶれ、確認項目と使い回しのルール（research/ai-review-replay の再現実験）。
- uploads-and-input: 後続候補。入力と添付の保存先、種類/サイズ、公開権限、処理境界。
- usage-and-billing: 後続候補。APIの利用量、予算通知と利用制限、異常時の停止と復旧。

前回8テーマは完了済みで、上記の深掘りまで完了したという意味ではない。次の制作順は読者の必要性と一次資料・検証可能な例で決める。
