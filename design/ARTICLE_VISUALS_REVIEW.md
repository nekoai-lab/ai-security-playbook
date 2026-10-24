# 全記事の挿絵・図解と罫線整理 / 2026-10-24

ユーザーの要求は全記事への配置。承認済みの多様なポーズを保存しただけで使わない状態を改め、14教材へ実装した。新しい場面6種だけで済ませず、歩く・考える・PC操作・指し示す・横からのぞく・尻尾・笑顔・心配の8系統を個別素材化して採用。既存の調べる猫・上からのぞく猫・後ろ姿C・肉球を維持した。正式ロゴA、既存URL/構成、README/ライセンスは変えていない。

## 記事別の採用先

表の図数は実際のfigure総数（場面の挿絵も含む）。本文画像数には読了・次の記事・関連記事の挿絵も含む。各記事を単に同じ猫で埋める設計にはしていない。既存の後ろ姿CはAPIキー以外の読了位置に継続使用。

| 記事 | 本文の猫の案内 | figure 前→後 | 本文画像 前→後 |
| --- | --- | --- | --- |
| [ログインと、データを使う権限を分ける](https://nekoai-lab.github.io/ai-security-playbook/learn/access-control/) | peek-side | 1 → 3 | 1 → 5 |
| [AIに任せる操作と、確認する操作を分ける](https://nekoai-lab.github.io/ai-security-playbook/learn/agent-permissions/) | think | 1 → 3 | 1 → 5 |
| [AIに渡す情報を、送る前に分ける](https://nekoai-lab.github.io/ai-security-playbook/learn/ai-data-boundaries/) | concern | 1 → 3 | 1 → 6 |
| [AIに「APIキーを設定して」と言われた。どこに入れるのが正解？](https://nekoai-lab.github.io/ai-security-playbook/learn/api-keys/) | smile | 8 → 8 | 2 → 5 |
| [AIで作ったアプリの、動く場所を知る](https://nekoai-lab.github.io/ai-security-playbook/learn/app-architecture/) | point | 1 → 3 | 1 → 6 |
| [AIツールと実行環境の基本](https://nekoai-lab.github.io/ai-security-playbook/learn/basics/) | think | 2 → 5 | 1 → 5 |
| [Node.jsの更新を完了させるチェックリスト](https://nekoai-lab.github.io/ai-security-playbook/learn/checklist/) | smile | 0 → 3 | 1 → 6 |
| [Node.jsを安全に調べる確認コマンド](https://nekoai-lab.github.io/ai-security-playbook/learn/commands/) | investigate, peek, tail（回遊） | 0 → 2 | 5 → 9 |
| [漏えい・異常・消失に気づいたとき、最初にすること](https://nekoai-lab.github.io/ai-security-playbook/learn/incident-response/) | concern, tail（回遊） | 1 → 3 | 1 → 7 |
| [AIで作ったサービスを、公開する前に確かめる](https://nekoai-lab.github.io/ai-security-playbook/learn/launch-checklist/) | point, tail（回遊） | 1 → 3 | 1 → 6 |
| [MCPをつなぐ前に、渡す権限を確かめる](https://nekoai-lab.github.io/ai-security-playbook/learn/mcp-permissions/) | peek-side, tail（回遊） | 1 → 3 | 1 → 6 |
| [Node.js 2026年10月のセキュリティ更新](https://nekoai-lab.github.io/ai-security-playbook/learn/node-october-2026/) | walk-right | 2 → 4 | 2 → 6 |
| [更新とAIレビューを運用につなげる](https://nekoai-lab.github.io/ai-security-playbook/learn/operations/) | point | 1 → 4 | 1 → 6 |
| [PHPの緊急更新、自分のサイトは何を確認する？](https://nekoai-lab.github.io/ai-security-playbook/learn/php-october-2026/) | laptop | 1 → 3 | 1 → 5 |

## 何を変えたか

- LessonSceneは「誰が、どんな時に迷うか」を場面と実テキストの問いで示す。API/Nodeの既存場面は再利用し、commandsは既存の調べる猫を導入に残す。
- LessonDiagramは情報の行き先、認証/認可、テスト用A/B、指示/実権限、更新/実行版、通知/上限、復旧/原因解消を比較や経路で示す。13記事へ2図ずつ、26の実テキスト図を配置（8つの単純Flowを置換）。APIキーの8図は維持。図のテキストは各記事内の既存説明から整理し、一次資料へつながる本文を残した。
- 図のために旧Flowを置き換えた箇所も、元のcaptionは段落として維持。全記事のコードフェンス、外部参照URL、情報確認日を親リビジョンと照合し一致。新しい事故・影響断定・実行コマンドは追加しない。
- 全記事の補足・前提・学習目標を開閉できる欄へ集約。スマホの目次も開閉可能にして、本文へ進む前の長い一覧を減らした。前提や目標を削除したわけではない。
- 次の記事と関連教材は内容に合う挿絵を表示。学習ルートの途中/最後/無効なroute指定で、次のタイトル・リンク・画像が同じ対象を指すことをブラウザで確認。JavaScriptなしでも既定シリーズで読める。
- 記事のH2、図外周、Flow、案内、チェックリスト行、読了・次の記事から反復する装飾罫線を除去。背景・余白・文字階層で区切る。比較対象として定義した装飾ブロックは全14記事で合計187→0。表・フォーカス・意味のある境界線の撤去を意味しない。
- 新しい図解部品をv1の内容検査へ認識させた。仕組みの節に実在のFlowまたはLessonDiagramが必要。欠落や別節へ移した場合に失敗するテストを追加し、件数・分類・役割・チェックリスト要件は維持した。

## 確認

- check: 52ファイル、エラー/警告/ヒント0。build: 38ページ。test: 15テストと全38ページのメタ情報・base・画像・アンカー確認が成功。内容構成は9教材が現行基準、5教材は移行前のまま。挿絵追加で内容移行完了とはしない。
- 図・画像・10種のdata-cat-pose: 全14記事×320/375/768/1280px。実画像decode、axe WCAG A/AA、横はみ出し・ページエラー、キーボード、320/375pxの詳細全開＋文字200%、JSなし、ルートの行き先と画像を確認。
- 全38ページ×4幅のブラウザ検査: 152ケース、axe・ページエラー・横はみ出し0。38ページで375px文字200%のはみ出しなし。
- [FULLデザイン検査](./audit/2026-10-24/articles-full/VALIDATION.md): 2,424 pass / 8 warning failures / error 0 / 304 manual-review prompts。既存の色数警告はdesign-system（14色）とcommands（15色）の各4幅。閾値・除外・対象を変更していない。
- 途中の3記事診断で320pxの補足欄タイトルに1文字落ちを発見。「読む前の補足」と短く修正した後のFULL記録を採用。途中診断は公開合格扱いにしない。
- 目視: 横からのぞく猫/笑顔/歩く猫/指す猫/PC操作/考える猫と図・次の記事カードを確認。元の細いインク線とオレンジを保ち、本文へ重ならず紙色へなじむ。例図の文字やコードを絵に焼き込んでいない。

## 効果と負担

以前は多くの記事に小さな3段Flowと共通の後ろ姿だけがあった。今回、場面・異なる対象の比較・確認時の声かけ・次の記事へ景色が変わる構成になった。効果は編集と表示上の評価であり、読者の理解度・完読率を実測した結論ではない。
画像と図の分だけ縦の長さと通信量が増える。新規配信ファイルは28個、合計2,245,068 bytes（全種類・両サイズを合わせた値。1ページの転送量ではない）。幅予約・遅延読込・responsive WebPを使用し、原本PNGや見本ボードを記事へ配信しない。同じ話題の場面を複数記事で再利用しキャッシュを活かす。モバイルでは比較図を縦に並べる。
一部の猫は小さな注記の案内として控えめなサイズにする。すべての段落へ飾りを追加しない。笑顔・肉球は読解の区切りで、作業完了や安全認定ではない。5教材の内容移行と既存の色数警告は別の残課題。
