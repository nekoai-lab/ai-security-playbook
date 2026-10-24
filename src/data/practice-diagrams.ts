import type { DiagramSpec } from "./lesson-visuals";
export const practiceDiagrams = {
  "log-map": {
    title: "1つの情報でも、保存先は1つとは限らない",
    layout: "branch",
    nodes: [
      {
        label: "AIへの入力・ツール出力",
        detail: "貼り付けた文章、読み込んだファイル、画面の内容。",
        icon: "screen",
      },
      {
        label: "端末の記録",
        detail: "会話の履歴・編集前の控え・一時ファイルを確認。",
        icon: "file",
      },
      {
        label: "サービス・接続先",
        detail: "送った先の保存・共有設定を別に確認。",
        icon: "cloud",
      },
      {
        label: "同期・バックアップ",
        detail: "端末やフォルダーの写しが、どこに残るか確認。",
        icon: "box",
      },
    ],
    caption:
      "確認先を分ける概念図です。保存される内容は製品・版・設定によって異なります。",
  },
  "log-fields": {
    title: "残す項目を選ぶと、分かることも変わる",
    layout: "compare",
    nodes: [
      {
        label: "データ全体を文字列にする",
        detail: "処理に使ったダミーの秘密まで、記録に含まれる。",
        example: "全文ログ：ダミー値を含む → true",
        icon: "file",
      },
      {
        label: "必要な項目だけを選ぶ",
        detail: "操作名と文章の長さを記録。文章や秘密の値は選ばない。",
        example: "要約処理 / 5文字",
        icon: "eye",
      },
    ],
    caption: "架空例の比較です。選んだ項目に秘密が入らない設計も必要です。",
  },
  "log-review": {
    title: "使う人・端末・接続先を分けて見る",
    layout: "sequence",
    nodes: [
      {
        label: "何を見せた？",
        detail: "入力だけでなく、AIが読んだ結果や画像も対象。",
        icon: "person",
      },
      {
        label: "どこに残る？",
        detail: "会話、編集履歴、一時ファイルとバックアップ。",
        icon: "box",
      },
      {
        label: "誰が読める？",
        detail: "端末・共有先・AIサービスの権限と契約を確認。",
        icon: "eye",
      },
    ],
    caption: "値を別の場所へ貼り直さず、情報の種類と確認状況を整理します。",
  },
  "log-retention": {
    title: "記録を役立てながら、残す範囲を絞る",
    layout: "compare",
    nodes: [
      {
        label: "調査に必要な記録",
        detail: "目的と担当を決め、読める人を制限して保全する。",
        example: "何が起きたかを後から確かめる",
        icon: "eye",
      },
      {
        label: "不要になった記録",
        detail: "保存義務と調査の要否を確認し、決めた手順で扱う。",
        example: "期間・削除対象・バックアップも確認",
        icon: "clock",
      },
    ],
    caption: "全部残す／全部消すの二択にせず、目的と扱いを決めます。",
  },
  "artifact-scope": {
    title: "作る場所と、届ける中身を分ける",
    layout: "compare",
    nodes: [
      {
        label: "作業用：4ファイル",
        detail: "説明書・サンプル・価格メモ・設定例がある。",
        example: "試行錯誤の資料も置く場所",
        icon: "file",
      },
      {
        label: "公開用：2ファイル",
        detail: "今回届ける説明書とサンプルだけを選ぶ。",
        example: "guide.txt / sample.csv",
        icon: "box",
      },
    ],
    caption: "本教材の架空例です。公開用フォルダーやZIPそのものを確認します。",
  },
  "artifact-allowlist": {
    title: "必要なファイルを選び、足りなければ止める",
    layout: "sequence",
    nodes: [
      {
        label: "含めるものを決める",
        detail: "説明書とサンプルを許可リストにする。",
        icon: "file",
      },
      {
        label: "そろっているか確認",
        detail: "必要なファイルがなければ、公開用を作る処理を止める。",
        icon: "eye",
      },
      {
        label: "選んだ中身も読む",
        detail: "名前が正しくても、秘密や実データが入っていないか確かめる。",
        icon: "box",
      },
    ],
    caption:
      "許可リストは範囲を絞る仕組みです。内容の安全性まで保証するものではありません。",
  },
  "artifact-route": {
    title: "最後は、受け取る人の入口から",
    layout: "sequence",
    nodes: [
      {
        label: "作成した公開用ファイル",
        detail: "選んだ内容と、必要な説明がそろっているか。",
        icon: "file",
      },
      {
        label: "アップロードした公開物",
        detail: "公開先・版・権限が合っているか。",
        icon: "cloud",
      },
      {
        label: "利用者が受け取ったもの",
        detail: "利用者のリンクで開き、一覧と中身を確かめる。",
        icon: "person",
      },
    ],
    caption: "管理画面のプレビューと、利用者が受け取る結果を分けて確認します。",
  },
  "artifact-evidence": {
    title: "3つの「合っている」を確かめる",
    layout: "sequence",
    nodes: [
      {
        label: "範囲が合う",
        detail: "含めると決めた一覧と、実際のファイルが一致する。",
        icon: "file",
      },
      {
        label: "内容が公開に適する",
        detail: "秘密・実データ・権利の問題がないか確認する。",
        icon: "eye",
      },
      {
        label: "届くものが合う",
        detail: "配布先から受け取り、意図した版か照合する。",
        icon: "box",
      },
    ],
    caption:
      "同一性の照合だけでは、公開してよい内容かどうかまでは分かりません。",
  },
  "guard-boundary": {
    title: "フックの検知と、実行できる権限を分ける",
    layout: "compare",
    nodes: [
      {
        label: "フック：見つけて止める",
        detail: "見ている文字列や呼び出し方によって、検知できる範囲が変わる。",
        icon: "eye",
      },
      {
        label: "権限：そもそも届かせない",
        detail: "OS・実行アカウント・隔離環境で、読める場所と操作を制限する。",
        icon: "key",
      },
    ],
    caption:
      "どちらも設定と検証が必要です。フックの成功だけで権限制限を確認したことにはなりません。",
  },
  "review-trust": {
    title: "レビュー対象と、レビューを動かす設定を分ける",
    layout: "compare",
    nodes: [
      {
        label: "PR側：確認するデータ",
        detail: "変更コードや説明に、レビュー側の設定を決めさせない。",
        icon: "file",
      },
      {
        label: "信頼できる側：実行条件",
        detail: "権限・ツール・起動設定を管理し、実際の起動元を確かめる。",
        icon: "key",
      },
    ],
    caption:
      "記事で挙げられた監査上の懸念を学ぶ概念図です。攻撃の成立を再現した図ではありません。",
  },
} satisfies Record<string, DiagramSpec>;
export type PracticeDiagramKind = keyof typeof practiceDiagrams;
