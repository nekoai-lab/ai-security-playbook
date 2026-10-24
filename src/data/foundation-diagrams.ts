import type { DiagramSpec } from "./lesson-visuals";
export const foundationDiagrams = {
  "input-minimize": {
    title: "名前の置換と、情報の選び直しは違う",
    layout: "compare",
    nodes: [
      {
        label: "名前だけ置き換える",
        detail: "顧客Aに変えても、電話・所属・細かい事情が残る。",
        icon: "person",
        example: "元の相手へ結び付く可能性",
      },
      {
        label: "目的に必要な条件を選ぶ",
        detail: "返信の目的と口調を渡し、実名や詳細は手元で入れる。",
        icon: "file",
        example: "日程変更 / 丁寧な口調",
      },
    ],
    caption:
      "情報を減らして目的を達成できるか考えます。法的な匿名化の判断を示す図ではありません。",
  },
  "input-destinations": {
    title: "確認するのは、入力の先の扱いも",
    layout: "branch",
    nodes: [
      {
        label: "入力・添付",
        detail: "処理に必要な情報だけを選んで渡す。",
        icon: "screen",
      },
      {
        label: "保存・学習の条件",
        detail: "何を保存し、何に利用するかを別々に確認。",
        icon: "box",
      },
      {
        label: "外部の連携先",
        detail: "ツールに渡す項目と、送信先の条件を確認。",
        icon: "cloud",
      },
      {
        label: "回答の共有",
        detail: "言い換えられた秘密や、共有できる人も確認。",
        icon: "person",
      },
    ],
    caption: "一つの設定だけで全部の条件が決まるわけではありません。",
  },
  "input-brief": {
    title: "実データを渡す前に、仕事を言葉にする",
    layout: "sequence",
    nodes: [
      {
        label: "頼みたいこと",
        detail: "日程変更をお願いする返信を作りたい。",
        icon: "person",
      },
      {
        label: "必要な条件",
        detail: "お詫び・変更のお願い・候補日の相談。",
        icon: "file",
      },
      {
        label: "送信前に自分で整える",
        detail: "実名や日付を手元で入れ、事実と口調を確認する。",
        icon: "eye",
      },
    ],
    caption:
      "架空例です。実際の文言そのものを調べる仕事では、別途必要性と利用条件を確認します。",
  },
  "input-attachments": {
    title: "見えている部分だけが、送る情報とは限らない",
    layout: "compare",
    nodes: [
      {
        label: "画面の画像",
        detail: "周辺の通知、顧客名、別ウィンドウの写り込み。",
        icon: "screen",
        example: "加工した画像を開き直す",
      },
      {
        label: "文書・表計算",
        detail: "別シート、コメント、変更履歴、添付の内容。",
        icon: "file",
        example: "必要な部分だけの資料も検討",
      },
    ],
    caption:
      "解析される範囲は製品により異なります。非表示だから届かないとは判断しません。",
  },
  "app-roles": {
    title: "4つの役割で、アプリの構成を読む",
    layout: "branch",
    nodes: [
      {
        label: "ブラウザ：画面",
        detail: "利用者の端末。操作を受け付け、届いたデータを表示。",
        icon: "screen",
      },
      {
        label: "サーバー：処理",
        detail: "要求の条件を確認し、結果を返す。",
        icon: "server",
      },
      {
        label: "DB：保存",
        detail: "予約やメモなど、残す記録を管理。",
        icon: "box",
      },
      {
        label: "外部API：別の機能",
        detail: "決済やAIなどのサービスへ処理を頼む。",
        icon: "cloud",
      },
    ],
    caption:
      "同じ提供元が複数の役割を担う場合もあります。物理的な台数の図ではありません。",
  },
  "app-request": {
    title: "予約ボタンの先を、要求と応答でたどる",
    layout: "sequence",
    nodes: [
      {
        label: "要求を送る",
        detail: "利用者の画面から、予約したい時間を送信。",
        icon: "screen",
      },
      {
        label: "条件を確かめる",
        detail: "本人、空き時間、重複などを処理側で確認。",
        icon: "server",
      },
      {
        label: "保存して結果を返す",
        detail: "保存先の結果を受け、画面へ成功や失敗を返す。",
        icon: "box",
      },
    ],
    caption:
      "典型的な構成の一例です。画面上の成功表示と、保存結果を対応させます。",
  },
  "app-storage": {
    title: "「残った」の場所を分ける",
    layout: "compare",
    nodes: [
      {
        label: "画面のメモリ",
        detail: "再読み込みすると失われる場合がある。",
        icon: "screen",
      },
      {
        label: "ブラウザ内の保存領域",
        detail: "同じ端末で残っても、他端末へ引き継ぐとは限らない。",
        icon: "file",
      },
      {
        label: "DB・ファイル保存サービス",
        detail: "権限、バックアップ、保存期間を管理する。",
        icon: "box",
      },
    ],
    caption:
      "保存方式の比較です。上から順に全方式へ保存する処理ではありません。",
  },
  "app-environments": {
    title: "画面が似ていても、接続先が違う",
    layout: "compare",
    nodes: [
      {
        label: "開発・プレビュー",
        detail: "テスト用DB、テスト用API、確認用URLかを調べる。",
        icon: "screen",
      },
      {
        label: "本番",
        detail: "実利用者のデータ、課金、メール送信への影響を確認。",
        icon: "cloud",
      },
    ],
    caption: "名称だけで安全性を決めず、実際の接続先と公開範囲を見ます。",
  },
  "access-identity": {
    title: "認証したあとに、認可の判断がある",
    layout: "sequence",
    nodes: [
      {
        label: "本人の確認：認証",
        detail: "ログインした利用者はAと確認する。",
        icon: "person",
      },
      {
        label: "対象と操作の確認：認可",
        detail: "そのメモの所有者か。読む・変える権限があるか。",
        icon: "key",
      },
      {
        label: "許可した内容だけ返す",
        detail: "条件を満たさなければ、本文を返さない。",
        icon: "file",
      },
    ],
    caption: "ログイン済みという条件だけで、全利用者の記録を返しません。",
  },
  "access-filter": {
    title: "同じ見た目でも、端末に届く情報が違う",
    layout: "compare",
    nodes: [
      {
        label: "画面で絞るだけ",
        detail: "全員のデータを受け取ってから、自分の分を表示。",
        icon: "screen",
        example: "表示しない情報も端末へ届く",
      },
      {
        label: "処理側で制限",
        detail: "本人と対象の権限を確認し、許可したデータだけ返す。",
        icon: "server",
        example: "拒否する内容は返さない",
      },
    ],
    caption: "画面の非表示と、情報を渡さない制御を分けます。",
  },
  "access-scope": {
    title: "本文だけでなく、操作と添付も分ける",
    layout: "branch",
    nodes: [
      {
        label: "対象：Aの非公開メモ",
        detail: "誰の、どの記録を扱うかを決める。",
        icon: "file",
      },
      {
        label: "読む・変える・消す",
        detail: "操作ごとに許可する相手を決める。",
        icon: "key",
      },
      {
        label: "画像・添付",
        detail: "別の保存先でも、閲覧範囲を確認。",
        icon: "box",
      },
      {
        label: "共有の変更",
        detail: "相手・期間・取り消し方を確認。",
        icon: "person",
      },
    ],
    caption: "共有や共同編集を追加したら、権限表とテストも更新します。",
  },
  "access-evidence": {
    title: "許可される結果と、拒否される結果をそろえる",
    layout: "compare",
    nodes: [
      {
        label: "本人Aの操作",
        detail: "Aのメモが読め、許可した変更が反映される。",
        icon: "person",
        example: "正常側の確認",
      },
      {
        label: "別のB・未ログイン",
        detail: "Aの本文が返らず、許可外の変更も起きない。",
        icon: "eye",
        example: "拒否側の確認",
      },
    ],
    caption: "自分が管理するテスト環境と架空データで確認します。",
  },
  "incident-first": {
    title: "事実・拡大防止・調査を分けて進める",
    layout: "sequence",
    nodes: [
      {
        label: "対象と時刻を絞る",
        detail: "どのプロジェクトで、何を実際に見たか。",
        icon: "eye",
      },
      {
        label: "拡大を抑える",
        detail: "対象の公開・権限を、担当と確認して制限。",
        icon: "key",
      },
      {
        label: "記録を保全して相談",
        detail: "秘密を広めず、未確認の範囲も伝える。",
        icon: "file",
      },
    ],
    caption:
      "公開が続いているとき、調査完了まで放置する順序を示すものではありません。",
  },
  "incident-key": {
    title: "削除・失効・確認は、それぞれ仕事がある",
    layout: "sequence",
    nodes: [
      {
        label: "公開場所から除く",
        detail: "これ以上、その場所から値を見られないようにする。",
        icon: "screen",
      },
      {
        label: "発行元で失効・交換",
        detail: "古いキーを無効にし、利用する処理を更新。",
        icon: "key",
      },
      {
        label: "履歴と動作を確認",
        detail: "利用履歴と影響、交換後のアプリを確かめる。",
        icon: "eye",
      },
    ],
    caption:
      "露出したキーへの対応です。具体的な順序は発行元・組織の手順で速やかに進めます。",
  },
  "incident-restore": {
    title: "戻す時点と、その後の更新を分ける",
    layout: "compare",
    nodes: [
      {
        label: "昨日の控え",
        detail: "demo-1 と demo-2。2件の予約がある。",
        icon: "box",
        example: "復元元の時点",
      },
      {
        label: "現在の一覧",
        detail: "上の2件に加え demo-3 と demo-4 がある。",
        icon: "file",
        example: "追加された2件の扱いを決める",
      },
    ],
    caption:
      "架空のID比較です。内容の更新・削除・画像まで比較する演習ではありません。",
  },
  "incident-restart": {
    title: "復旧した画面だけで、対応完了にしない",
    layout: "sequence",
    nodes: [
      {
        label: "原因・権限・キー",
        detail: "同じ問題が続く経路を残していないか。",
        icon: "key",
      },
      {
        label: "動作とデータ",
        detail: "戻した範囲、失った更新、外部への処理を確認。",
        icon: "server",
      },
      {
        label: "監視と連絡",
        detail: "再開後に見る指標、担当、利用者への案内を決める。",
        icon: "eye",
      },
    ],
    caption: "復元と、原因への対処、再開の判断を別々に確認します。",
  },
} satisfies Record<string, DiagramSpec>;
export type FoundationDiagramKind = keyof typeof foundationDiagrams;
