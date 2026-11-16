import type { DiagramSpec } from "./lesson-visuals";
export const uploadDiagrams = {
  flow: {
    title: "ファイルが届いた後にも、別の処理がある",
    layout: "sequence",
    nodes: [
      {
        label: "選択と受付",
        detail: "画面の制限と、受信側の条件。",
        icon: "screen",
      },
      {
        label: "検査と解析",
        detail: "内容を読み、必要な派生物を作る。",
        icon: "eye",
      },
      {
        label: "保存と公開",
        detail: "置く場所と、取得する相手を制御。",
        icon: "box",
      },
    ],
    caption: "受付・解析・公開は別の完了状態です。",
  },
  checks: {
    title: "名前・申告・内容を分けて確認",
    layout: "sequence",
    nodes: [
      {
        label: "ファイル名",
        detail: "拡張子は名前の一部。",
        icon: "file",
      },
      {
        label: "申告された種類",
        detail: "Content-Typeが内容と合うか。",
        icon: "cloud",
      },
      {
        label: "実際の内容",
        detail: "形式の目印と、解析での検証。",
        icon: "eye",
      },
    ],
    caption:
      "先頭の形式が合うことだけで、ファイル全体が正しいとは決まりません。",
  },
  processing: {
    title: "読むプログラムにも、実行範囲がある",
    layout: "branch",
    nodes: [
      {
        label: "受け取ったファイル",
        detail: "必要な形式と処理量に絞る。",
        icon: "file",
      },
      {
        label: "画像・文書の解析",
        detail: "部品の版と、読み書き・通信の権限。",
        icon: "server",
      },
      {
        label: "時間とメモリ",
        detail: "展開後の大きさや処理の上限。",
        icon: "gauge",
      },
      {
        label: "失敗時の状態",
        detail: "検査中やエラーを成功にしない。",
        icon: "clock",
      },
    ],
    caption: "解析や検査の失敗を、何も検出しなかった結果と混同しません。",
  },
  storage: {
    title: "置く場所と、取り出す入口を分ける",
    layout: "sequence",
    nodes: [
      {
        label: "受取用の保存先",
        detail: "まだ公開しない状態を管理する。",
        icon: "box",
      },
      {
        label: "管理するID",
        detail: "利用者とファイルの対応を持つ。",
        icon: "file",
      },
      {
        label: "取得と共有",
        detail: "必要な相手・操作・期限を確認。",
        icon: "person",
      },
    ],
    caption: "保存できたことと、相手の取得権限が正しいことは別です。",
  },
  permissions: {
    title: "同じ無害なテスト資料で、許可と拒否を見る",
    layout: "compare",
    nodes: [
      {
        label: "テスト用のA",
        detail: "自分の元ファイル・派生物を取得。",
        icon: "person",
      },
      {
        label: "Bと未ログイン",
        detail: "許可しない取得・変更・削除が拒否されるか。",
        icon: "eye",
      },
    ],
    caption: "実際の利用者の個人情報を使わず、保存先ごとの結果を確かめます。",
  },
  review: {
    title: "形式や機能を増やしたら、処理の先まで確認",
    layout: "sequence",
    nodes: [
      {
        label: "追加した形式",
        detail: "画像から文書や圧縮ファイルへ。",
        icon: "file",
      },
      {
        label: "増える処理",
        detail: "解析部品、処理量、外部送信先。",
        icon: "server",
      },
      {
        label: "公開と運用",
        detail: "権限・保持・失敗時を見直す。",
        icon: "eye",
      },
    ],
    caption: "拡張子を増やすだけで、同じ検証が十分とは考えません。",
  },
} satisfies Record<string, DiagramSpec>;
export type UploadDiagramKind = keyof typeof uploadDiagrams;
