import { guardDiagrams } from "./guard-diagrams";
import { updateDiagrams } from "./update-diagrams";
import { serviceFailureDiagrams } from "./service-failure-diagrams";
import { practiceDiagrams } from "./practice-diagrams";
export type DiagramIcon =
  | "screen"
  | "server"
  | "file"
  | "person"
  | "key"
  | "cloud"
  | "eye"
  | "clock"
  | "box"
  | "gauge";
export interface DiagramNode {
  label: string;
  detail: string;
  icon: DiagramIcon;
  example?: string;
}
export interface DiagramSpec {
  title: string;
  layout: "sequence" | "compare" | "branch";
  nodes: DiagramNode[];
  caption: string;
}
export interface LessonVisual {
  image: string;
  question: string;
  situation: string;
  pose: string;
  diagrams: [DiagramSpec, DiagramSpec];
}
const n = (
  label: string,
  detail: string,
  icon: DiagramIcon,
  example?: string,
): DiagramNode => ({ label, detail, icon, example });
const d = (
  title: string,
  layout: DiagramSpec["layout"],
  nodes: DiagramNode[],
  caption: string,
): DiagramSpec => ({ title, layout, nodes, caption });
export const lessonVisuals = {
  "github-guards": {
    image: "github-gate-scene",
    question: "そのチェックは、今の変更を確かめた結果？",
    situation: "AIの修正をGitHubから公開する前に",
    pose: "think",
    diagrams: [guardDiagrams.flow, guardDiagrams.permissions],
  },
  "dependency-updates": {
    image: "dependency-update-scene",
    question: "部品を直した。その更新は、本番まで届いた？",
    situation: "公開したアプリに更新通知が来たら",
    pose: "think",
    diagrams: [updateDiagrams["dependency-map"], updateDiagrams.delivery],
  },
  "external-service-failures": {
    image: "service-fallback-scene",
    question: "写真が届かなくても、案内は続けられる？",
    situation: "外部の画像やAPIを使うアプリを公開する前に",
    pose: "think",
    diagrams: [
      serviceFailureDiagrams.dependencies,
      serviceFailureDiagrams.states,
    ],
  },
  "ai-work-logs": {
    image: "ai-log-copies-scene",
    question: "会話を閉じても、記録はどこかに残っている？",
    situation: "AIと設定やログを扱ったあとに",
    pose: "think",
    diagrams: [practiceDiagrams["log-map"], practiceDiagrams["log-fields"]],
  },
  "release-artifacts": {
    image: "release-package-scene",
    question: "この箱に、届けたいものだけ入っている？",
    situation: "サイト・資料・ZIPを公開する前に",
    pose: "point",
    diagrams: [
      practiceDiagrams["artifact-scope"],
      practiceDiagrams["artifact-route"],
    ],
  },
  basics: {
    image: "node-runtime-scene",
    question: "Nodeは更新した。でも、AIツールも更新できた？",
    situation: "AIツールと、その裏で動くものを整理したいとき",
    pose: "think",
    diagrams: [
      d(
        "同じPCにも、別の実行環境がある",
        "compare",
        [
          n("ターミナルのNode", "普段のコマンドで呼び出す環境。", "screen"),
          n("アプリ同梱のNode", "アプリの提供元が更新を届ける環境。", "box"),
          n("MCPのプロセス", "どの環境で起動されたかを別に調べる。", "server"),
        ],
        "一つの更新や版確認で、残りも同じ状態だと判断しません。",
      ),
      d(
        "更新ファイルと、動いている処理を分ける",
        "sequence",
        [
          n("更新版を入れる", "導入方法に合う手順を使う。", "box"),
          n("対象を起動し直す", "作業を保存し、影響を確かめてから。", "clock"),
          n("実行版と動作を見る", "新しい処理へ反映されたか確かめる。", "eye"),
        ],
        "更新だけで、すでに動いている処理が切り替わるとは限りません。",
      ),
    ],
  },
  "ai-data-boundaries": {
    image: "data-sorting-scene",
    question: "この返信案、顧客メールを丸ごと渡す必要ある？",
    situation: "AIへ文章・画像・資料を送る前に",
    pose: "concern",
    diagrams: [
      d(
        "同じ依頼でも、送る情報は選べる",
        "compare",
        [
          n("元のメール", "氏名・連絡先・注文番号も含まれる。", "file"),
          n(
            "依頼に必要な内容",
            "日程変更の目的と、希望する口調を伝える。",
            "file",
            "架空例：丁寧な日程変更の返信案",
          ),
        ],
        "名前だけ消せば十分とは限りません。実資料が必要なら、許可・送信先・保存条件も確認します。",
      ),
      d(
        "入力した後にも、情報は移動する",
        "sequence",
        [
          n("入力・添付", "画像の通知や、資料のコメントも見直す。", "screen"),
          n("AIと連携先", "利用機能ごとの送信先を確かめる。", "cloud"),
          n("回答・共有", "元の情報が回答に残っていないか見る。", "eye"),
        ],
        "学習への利用、保存、外部連携は別の確認です。回答も共有前に点検します。",
      ),
    ],
  },
  "app-architecture": {
    image: "connection-map-scene",
    question: "画面はできた。保存したデータは、どこにある？",
    situation: "AIでアプリが動くところまで作れたら",
    pose: "point",
    diagrams: [
      d(
        "メモを保存する場所をたどろう",
        "branch",
        [
          n(
            "ブラウザ → サーバー",
            "画面で操作し、処理側で要求と権限を確かめる。",
            "screen",
          ),
          n("データベース", "メモなどの記録を保存する。", "server"),
          n("外部API", "別サービスへ必要な処理を依頼する。", "cloud"),
        ],
        "典型的な一例。ブラウザからデータサービスへ直接つなぐ場合は、そのサービス側で権限を制限します。",
      ),
      d(
        "ボタンの非表示と、操作の拒否は違う",
        "compare",
        [
          n("画面で隠す", "削除ボタンが見えなくなる。", "screen"),
          n(
            "処理側で制限する",
            "許可されない削除要求を受け付けない。",
            "server",
          ),
        ],
        "自分の画面で見えないだけでは、別の要求でも拒否されることを確認できません。",
      ),
    ],
  },
  "access-control": {
    image: "access-gate-scene",
    question: "自分のメモは見えた。他の人からも見えない？",
    situation: "利用者ごとにデータを分けるアプリで",
    pose: "peek-side",
    diagrams: [
      d(
        "二つの質問を、別々に確かめる",
        "sequence",
        [
          n("認証：誰ですか？", "利用者が本人かを確かめる。", "person"),
          n(
            "認可：何ができますか？",
            "対象の記録と、読む・変える操作を照合する。",
            "key",
          ),
          n("許可した結果を返す", "要求を受ける処理側で判断する。", "server"),
        ],
        "ログイン済みでも、すべての利用者の記録を扱えるとは限りません。",
      ),
      d(
        "自分のテスト用アカウントで比べる",
        "compare",
        [
          n(
            "A → Aの非公開メモ",
            "読むことが許可される。",
            "person",
            "架空のメモと利用者で確認",
          ),
          n(
            "B・未ログイン → Aのメモ",
            "内容が返らない。編集・削除も許可されない。",
            "eye",
            "実在する他人のデータで試さない",
          ),
        ],
        "管理するテスト環境での期待結果です。画面だけで拒否を確かめられない範囲は未確認にします。",
      ),
    ],
  },
  "api-keys": {
    image: "api-key-scene",
    question: "APIキーは、どこへ届く？",
    situation: "はじめて外部サービスをつなぐとき",
    pose: "laptop",
    diagrams: [
      d(
        "キーの用途を確認",
        "compare",
        [
          n("公開を想定", "発行元の用途と制限を確認する。", "key"),
          n("秘密のキー", "ブラウザへ返さず処理側で使う。", "server"),
        ],
        "既存の本文図で具体的な経路を確認します。",
      ),
      d(
        "確認する場所",
        "sequence",
        [
          n("発行元", "用途と権限。", "key"),
          n("アプリ", "値を使う場所。", "screen"),
          n("公開先", "配信物と設定。", "cloud"),
        ],
        "既存の本文図とコード例を参照します。",
      ),
    ],
  },
  "mcp-permissions": {
    image: "connection-map-scene",
    question: "つなぐだけで、どの資料まで読めるようになる？",
    situation: "AIにファイルや外部サービスをつなぐ前に",
    pose: "peek-side",
    diagrams: [
      d(
        "接続先と、その先の権限をたどる",
        "sequence",
        [
          n("AIアプリ", "クライアントを介してツールを使う。", "screen"),
          n("MCPサーバー", "手元のプログラムや遠隔サービスで処理。", "server"),
          n(
            "ファイル・外部API",
            "与えたアカウントやOSの権限が影響する。",
            "cloud",
          ),
        ],
        "MCPという方式や接続画面の表示だけで、接続先の安全性や隔離を保証できません。",
      ),
      d(
        "読む許可と、送る許可は組み合わせで考える",
        "compare",
        [
          n("読む対象", "必要なテスト資料だけに絞れるか。", "file"),
          n("送る宛先", "取得した情報がどこへ返るか。", "cloud"),
        ],
        "読み取り専用でも、読んだ秘密を別の連携先へ送れるなら流出につながり得ます。",
      ),
    ],
  },
  "agent-permissions": {
    image: "review-workbench-scene",
    question: "誤字直しを頼んだだけ。公開まで任せてよかった？",
    situation: "AIにコード変更やブラウザ操作を任せるとき",
    pose: "think",
    diagrams: [
      d(
        "誤字を直す依頼で、任せる境界を決める",
        "compare",
        [
          n("依頼の範囲", "テスト用の複製を編集し、ローカルで確認。", "file"),
          n(
            "別に判断する操作",
            "本番公開・顧客への通知・別資料の削除。",
            "cloud",
          ),
        ],
        "架空例です。すでに明確に許可した操作の確認を、毎回繰り返す必要はありません。",
      ),
      d(
        "指示と、実際にできる操作を分ける",
        "compare",
        [
          n("「削除しないで」", "作業の意図を伝える指示。", "person"),
          n("削除権限を外す", "ツールやアカウントの設定で制限。", "key"),
        ],
        "外部ページやメール内の指示は、依頼した人の許可ではありません。読む資料と通信先も別に制限します。",
      ),
    ],
  },
  "launch-checklist": {
    image: "release-preparation-scene",
    question: "動いた。でも、誰かに使ってもらう前に何を見る？",
    situation: "デモを、利用者が使うサービスへ進めるとき",
    pose: "point",
    diagrams: [
      d(
        "公開前に見るのは、画面だけではない",
        "branch",
        [
          n(
            "公開する範囲を決める",
            "本番URLと、預かる情報を一つずつ特定。",
            "screen",
          ),
          n("権限・秘密", "拒否の結果と、配信される内容を確認。", "key"),
          n("料金・復旧", "利用制限と、隔離した復元テストを確認。", "box"),
        ],
        "確認できない範囲を問題なしとせず、実データの受付や公開範囲を判断します。",
      ),
      d(
        "「ある」だけでは、足りない二つの確認",
        "compare",
        [
          n("料金の通知", "利用を止める上限と同じとは限らない。", "gauge"),
          n("バックアップ", "DB・画像・設定を必要な範囲まで戻せるか。", "box"),
        ],
        "通知条件、利用制限、保存範囲はサービスごとに確認。本番を練習の復元先にしません。",
      ),
    ],
  },
  "incident-response": {
    image: "incident-notes-scene",
    question: "利用量が急に増えた。いま分かっている事実は？",
    situation: "漏えい・異常・データ消失に気づいたら",
    pose: "concern",
    diagrams: [
      d(
        "見たことと、まだ分からないことを分ける",
        "compare",
        [
          n(
            "確認した事実",
            "どのAPI・時間帯・プロジェクトの利用量が増えたか。",
            "eye",
          ),
          n("まだ推測のこと", "攻撃されたか、鍵が盗まれたか。", "file"),
        ],
        "架空の初動例。料金の増加だけで侵害と断定せず、秘密を公開せずに担当者へ相談します。",
      ),
      d(
        "復元できたことと、原因の解消は別",
        "compare",
        [
          n("データを戻す", "復元先・時点・失う更新・対象範囲を確認。", "box"),
          n("原因に対応する", "漏れた鍵や侵入口が残っていないか確認。", "key"),
        ],
        "アプリの再起動やコードの巻戻しだけで、盗まれた鍵や外部のデータが元へ戻るとは限りません。",
      ),
    ],
  },
  "php-october-2026": {
    image: "review-workbench-scene",
    question: "PHPを入れた覚えはない。でも、このサイトは使ってる？",
    situation: "PHPやWordPressで動くサイトを管理するとき",
    pose: "laptop",
    diagrams: [
      d(
        "調べる場所は、公開サイトの実行環境",
        "compare",
        [
          n("手元のPHP", "PC上で確認した実行ファイルと版。", "screen"),
          n("公開サイトのPHP", "ホスティング側で実際に動く環境。", "server"),
        ],
        "手元の版が分かっても公開サイトの反映確認にはなりません。提供元の管理画面や対応案内と照合します。",
      ),
      d(
        "過去の案内と、現在の確認先を分ける",
        "sequence",
        [
          n("2026年10月の事例", "21日の修正と23日の追加案内を読む。", "file"),
          n("現在の提供元情報", "自分のサービスへの適用状況を確認。", "cloud"),
          n("反映と動作", "実行環境とアプリの結果を照合。", "eye"),
        ],
        "このページの版番号だけを将来の安全判定に使わず、PHP公式と提供元の最新案内を確認します。",
      ),
    ],
  },
  "node-october-2026": {
    image: "node-runtime-scene",
    question: "新しい版を入れた。動いているNodeも切り替わった？",
    situation: "Node.jsの修正が自分の環境へ届いたか調べるとき",
    pose: "walk-right",
    diagrams: [
      d(
        "影響の判断には、三つの確認がある",
        "sequence",
        [
          n("対象の版か", "自分の系列・版と、公式発表を照合。", "server"),
          n("機能を使うか", "対象機能を呼ぶ処理を調べる。", "file"),
          n("外部入力が届くか", "どの経路で処理されるかをたどる。", "cloud"),
        ],
        "古い版を見つけたことは、侵害された証拠ではありません。不明な経路は未確認に残します。",
      ),
      d(
        "更新した版と、実行版を分ける",
        "compare",
        [
          n("インストール済み", "新しく起動する処理が使う環境を確認。", "box"),
          n("起動中の処理", "起動元・起動時刻・実際の版を別に確認。", "clock"),
        ],
        "一括停止をせず、対象と作業保存、停止の影響を確かめて反映します。",
      ),
    ],
  },
  commands: {
    image: "node-runtime-scene",
    question: "この結果は、どのNodeのこと？",
    situation: "確認コマンドの結果を読むとき",
    pose: "laptop",
    diagrams: [
      d(
        "同じNodeでも、見ている対象が違う",
        "compare",
        [
          n(
            "新しく起動するNode",
            "このコマンドで呼んだ版と場所。",
            "screen",
            "node --version / process.execPath",
          ),
          n(
            "すでに起動中の処理",
            "起動元や実行ファイルを別に調べる。",
            "clock",
            "ほかの処理の版を証明しない",
          ),
        ],
        "確認結果は、調べた対象の範囲で読みます。表示する結果に秘密や内部情報がないかも見直します。",
      ),
      d(
        "設定と、本番の実体を照合する",
        "sequence",
        [
          n("リポジトリの指定", "DockerfileやCIの設定を確認。", "file"),
          n("配信したもの", "ビルド・デプロイした対象を確認。", "box"),
          n("本番で動くもの", "提供元の画面や運用ログと照合。", "server"),
        ],
        "設定ファイルだけで本番の実行版は確定しません。一般公開の診断用画面は安易に追加しません。",
      ),
    ],
  },
  checklist: {
    image: "release-preparation-scene",
    question: "更新済みと言えるのは、どこまで確かめたとき？",
    situation: "Node.jsの更新作業を、対象ごとに終えるとき",
    pose: "smile",
    diagrams: [
      d(
        "PC・MCP・CI・本番を別々に見る",
        "compare",
        [
          n(
            "PCとアプリ",
            "同梱ランタイムや長時間起動した処理も確認。",
            "screen",
          ),
          n("CIと本番", "版指定だけでなく稼働リビジョンも照合。", "server"),
        ],
        "一つが更新済みでも、ほかの対象へ自動で同じ確認結果を当てはめません。",
      ),
      d(
        "チェック印ではなく、証拠で状態を分ける",
        "compare",
        [
          n("確認できた", "実行版と正常動作、確認日を残す。", "eye"),
          n("まだ未確認", "担当者と次の確認日を決める。", "clock"),
        ],
        "対象外も理由を分けて残します。猫の表情やチェック操作で安全性を判定するものではありません。",
      ),
    ],
  },
  operations: {
    image: "review-workbench-scene",
    question: "便利な通知が、秘密まで送っていない？",
    situation: "AIの実装とレビューを、継続運用へつなぐとき",
    pose: "point",
    diagrams: [
      d(
        "端末で見る詳細と、送る通知を分ける",
        "compare",
        [
          n(
            "端末内で確認",
            "実行ファイルや対象の詳細を必要な範囲で見る。",
            "screen",
          ),
          n(
            "承認した通知先へ",
            "種類・件数・次の行動に絞れるか検討。",
            "cloud",
          ),
        ],
        "引数・直接実行したコード・トークンを表示名へ流用しません。ファイル名も秘密になり得ます。",
      ),
      d(
        "自動化は、確認できる段階から進める",
        "sequence",
        [
          n("観察する", "停止せず、版や起動状況を見る。", "eye"),
          n("人が判断する", "対象と保存状況を確認して操作。", "person"),
          n("条件を絞る", "誤検知・競合・保護対象を検証。", "server"),
        ],
        "CPUや起動時刻だけで未使用と判断しません。別のAIのレビューだけでも安全を保証できません。",
      ),
    ],
  },
} satisfies Record<string, LessonVisual>;
export type LessonVisualId = keyof typeof lessonVisuals;
