import type { DiagramSpec } from "./lesson-visuals";
export const serviceFailureDiagrams = {
  dependencies: {
    title: "画面の材料を、取得先ごとに分ける",
    layout: "branch",
    nodes: [
      {
        label: "お店の案内アプリ",
        detail: "写真・地図・案内文を一つの画面に表示。",
        icon: "screen",
      },
      {
        label: "画像配信",
        detail: "写真やアバターを取りに行く。",
        icon: "cloud",
      },
      {
        label: "地図・情報API",
        detail: "位置や外部の情報を取りに行く。",
        icon: "server",
      },
      {
        label: "アプリ側の案内",
        detail: "独立して用意した文章や連絡先。",
        icon: "file",
      },
    ],
    caption:
      "架空の構成です。どの依存先の失敗が、どの表示へ影響するかを見ます。",
  },
  states: {
    title: "空の結果と、確認できなかった結果は違う",
    layout: "branch",
    nodes: [
      {
        label: "取得を試みる",
        detail: "APIの仕様に沿って、状態と内容を確認。",
        icon: "eye",
      },
      {
        label: "正常なデータ",
        detail: "確認した案内を表示する。",
        icon: "file",
      },
      {
        label: "正常だが0件",
        detail: "今回の要求では掲載がないと案内。",
        icon: "box",
      },
      {
        label: "取得や解析が失敗",
        detail: "情報の有無は未確認。失敗の案内を出す。",
        icon: "cloud",
      },
    ],
    caption: "失敗を空配列へ置き換えると、0件だったように見えてしまいます。",
  },
  fallback: {
    title: "残す役割と、止める操作を選ぶ",
    layout: "compare",
    nodes: [
      {
        label: "写真が取れない",
        detail: "アプリ側の代替画像と文章で、案内を続ける。",
        icon: "file",
      },
      {
        label: "権限が確かめられない",
        detail: "保護した内容は返さず、案内と相談先を示す。",
        icon: "key",
      },
    ],
    caption: "代わりを出すことと、確認を省いて許可することを混同しません。",
  },
  retry: {
    title: "再試行には、対象・時間・回数の条件がある",
    layout: "sequence",
    nodes: [
      {
        label: "再送してよいか判断",
        detail: "一時的か、認証の問題か。処理を重ねてもよいか。",
        icon: "eye",
      },
      {
        label: "間隔と上限を設ける",
        detail: "提供元の待機指定と、SDKの再試行も確認。",
        icon: "clock",
      },
      {
        label: "戻らないときの案内",
        detail: "待ち続けず、利用者の次の操作と相談先へ。",
        icon: "person",
      },
    ],
    caption:
      "この図は無条件の自動再送を勧めるものではありません。更新系は結果確認が先に必要な場合があります。",
  },
  "unknown-result": {
    title: "応答が失われても、保存は済んでいるかもしれない",
    layout: "sequence",
    nodes: [
      {
        label: "予約を送信",
        detail: "サーバー側で保存が完了した可能性がある。",
        icon: "server",
      },
      {
        label: "応答が届かない",
        detail: "利用者側では結果が不明になる。",
        icon: "cloud",
      },
      {
        label: "結果を照会する",
        detail: "予約番号や一覧などで確かめ、無条件に再送しない。",
        icon: "eye",
      },
    ],
    caption:
      "架空例です。時間切れは、未実行や取り消し完了の証明ではありません。",
  },
  recovery: {
    title: "提供元が戻った後も、自分の結果を見る",
    layout: "sequence",
    nodes: [
      {
        label: "取得を確認",
        detail: "状態とデータ形式が、利用中の仕様に合うか。",
        icon: "cloud",
      },
      {
        label: "画面と保留操作を確認",
        detail: "古い表示、結果不明の予約、重複が残らないか。",
        icon: "screen",
      },
      {
        label: "監視と連絡を続ける",
        detail: "失敗率や待ち時間、必要な案内を確認。",
        icon: "eye",
      },
    ],
    caption: "提供元の稼働状況と、自分のアプリの回復は別々に確認します。",
  },
} satisfies Record<string, DiagramSpec>;
export type ServiceFailureKind = keyof typeof serviceFailureDiagrams;
