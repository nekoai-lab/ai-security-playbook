import type { DiagramSpec } from "./lesson-visuals";
export const rotationDiagrams = {
  layers: {
    title: "交換の3つの場所を分ける",
    layout: "sequence",
    nodes: [
      {
        label: "発行元",
        detail: "新しいキーを発行し、旧キーの有効性を管理。",
        icon: "key",
      },
      {
        label: "保存先",
        detail: "使わせる版を保存・指定する。",
        icon: "box",
      },
      {
        label: "稼働先",
        detail: "プログラムが読み込んだ値で接続する。",
        icon: "server",
      },
    ],
    caption:
      "保存値を替えることと、稼働への反映、発行元での失効は別の操作です。",
  },
  read: {
    title: "同じ保存先でも、読む時点が違う",
    layout: "compare",
    nodes: [
      {
        label: "起動時に読む",
        detail: "起動済みのプロセスには、以前の値が残り得る。",
        icon: "clock",
      },
      {
        label: "ファイルから読む",
        detail: "読取で取得しても、アプリ内のキャッシュは別に確認。",
        icon: "file",
      },
    ],
    caption:
      "Cloud Runの環境変数とマウントの例です。別サービスの挙動は公式仕様で確かめます。",
  },
  planned: {
    title: "漏えいの兆候がない通常更新",
    layout: "sequence",
    nodes: [
      {
        label: "新しいキーを用意",
        detail: "併用が許可される場合、必要な権限で発行。",
        icon: "key",
      },
      {
        label: "稼働先を切り替える",
        detail: "利用先を更新し、限定した操作で確認。",
        icon: "server",
      },
      {
        label: "旧キーを失効",
        detail: "旧実行の残りと、失効後の動作も確認。",
        icon: "eye",
      },
    ],
    caption: "複数キーを併用できないサービスは、提供元の切替手順に合わせます。",
  },
  incident: {
    title: "漏えい時は、悪用を止める判断を優先",
    layout: "branch",
    nodes: [
      {
        label: "露出や不正利用の根拠",
        detail: "対象キーと接続先を特定し、提供元の手順へ。",
        icon: "eye",
      },
      {
        label: "失効と制限",
        detail: "被害と停止の影響を考え、迅速に判断。",
        icon: "key",
      },
      {
        label: "新しい認証で復旧",
        detail: "利用先を確認し、侵害された値へ戻さない。",
        icon: "server",
      },
    ],
    caption: "無停止の準備を待ち続けず、通常更新と分けて対応します。",
  },
  inventory: {
    title: "画面の裏にも、別の利用先がある",
    layout: "branch",
    nodes: [
      {
        label: "同じ接続先のキー",
        detail: "どこで使うかを一覧にする。",
        icon: "key",
      },
      {
        label: "Webサービス",
        detail: "旧リリースへの流量や別URLも見る。",
        icon: "screen",
      },
      {
        label: "定期ジョブ",
        detail: "次回・再試行・実行中の処理を確認。",
        icon: "clock",
      },
      {
        label: "CI・管理用の実行",
        detail: "別環境の設定と読込方法も照合。",
        icon: "file",
      },
    ],
    caption: "一つの成功を、すべての利用先の成功として扱いません。",
  },
  finish: {
    title: "交換を、次の動作までつなぐ",
    layout: "sequence",
    nodes: [
      {
        label: "版と実行を照合",
        detail: "キーの内容ではなく、版と実行IDで追う。",
        icon: "file",
      },
      {
        label: "失効後を確認",
        detail: "新しい版で動き、旧キーが無効かを見る。",
        icon: "eye",
      },
      {
        label: "未確認を残す",
        detail: "次回の定期実行と担当・期限を決める。",
        icon: "clock",
      },
    ],
    caption: "以前のアプリへ戻す場合も、有効なキーとの組み合わせを確認します。",
  },
} satisfies Record<string, DiagramSpec>;
export type RotationDiagramKind = keyof typeof rotationDiagrams;
