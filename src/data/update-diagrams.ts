import type { DiagramSpec } from "./lesson-visuals";
export const updateDiagrams = {
  "dependency-map": {
    title: "自分で指定していなくても、部品の先に部品がある",
    layout: "sequence",
    nodes: [
      {
        label: "自分のアプリ",
        detail: "画像を表示するライブラリAを指定。",
        icon: "screen",
      },
      {
        label: "直接依存：A",
        detail: "A自身が、別の部品Bを使っている。",
        icon: "box",
      },
      {
        label: "推移的依存：B",
        detail: "自分が直接選ばなくても、構成に含まれる。",
        icon: "file",
      },
    ],
    caption:
      "架空の依存関係です。実際は複数の経路から同じ部品が入る場合もあります。",
  },
  detection: {
    title: "検出0件と、検査できなかった結果は違う",
    layout: "compare",
    nodes: [
      {
        label: "検査が成功した",
        detail: "対象と時点の範囲で、既知の問題の結果が分かった。",
        icon: "eye",
      },
      {
        label: "失敗・対象外・未確認",
        detail: "結果が取れていない。0件へ置き換えない。",
        icon: "clock",
      },
    ],
    caption: "0件は完全な安全証明ではありません。何を検査したかも確かめます。",
  },
  decision: {
    title: "検知から、自分の構成への判断へ",
    layout: "sequence",
    nodes: [
      {
        label: "対象を照合",
        detail: "部品、版、利用している機能を確認。",
        icon: "box",
      },
      {
        label: "条件と経路を確認",
        detail: "外部の入力、実行権限、公開先をたどる。",
        icon: "eye",
      },
      {
        label: "判断と次の確認",
        detail: "修正・影響なし・未確認・修正版待ちを分ける。",
        icon: "file",
      },
    ],
    caption:
      "重大度だけでも、名前に見覚えがないだけでも、影響判断を終えません。",
  },
  delivery: {
    title: "修正したものを、本番で動くものまで届ける",
    layout: "sequence",
    nodes: [
      {
        label: "差分と互換性を確認",
        detail: "部品・設定・ロックファイルと動作の変化を見る。",
        icon: "file",
      },
      {
        label: "検証して公開",
        detail: "対象の操作を確かめ、リリースを識別する。",
        icon: "server",
      },
      {
        label: "稼働先で照合",
        detail: "本番の版・動作・解消確認を記録する。",
        icon: "eye",
      },
    ],
    caption: "PRをマージした状態と、稼働先の反映を別に確認します。",
  },
  record: {
    title: "通知を閉じる理由を、証拠とつなげる",
    layout: "branch",
    nodes: [
      {
        label: "対象の検知",
        detail: "最初に気づいた日と元の情報を残す。",
        icon: "file",
      },
      {
        label: "修正する",
        detail: "修正PRと本番反映、確認結果へリンク。",
        icon: "server",
      },
      {
        label: "影響なしと判断",
        detail: "該当しない条件と根拠、見直す契機を残す。",
        icon: "eye",
      },
      {
        label: "未修復・未確認",
        detail: "理由、暫定対応、担当、再確認日を決める。",
        icon: "clock",
      },
    ],
    caption: "通知の抑制や終了を、修復や解消の証明にしません。",
  },
  cycle: {
    title: "継続するための、小さな確認の輪",
    layout: "sequence",
    nodes: [
      {
        label: "知る",
        detail: "対象と通知の成否、未検査を確認。",
        icon: "eye",
      },
      {
        label: "判断して直す",
        detail: "根拠と差分、互換性を確認。",
        icon: "file",
      },
      {
        label: "公開して見直す",
        detail: "稼働先と結果、残った対象の次の確認を決める。",
        icon: "server",
      },
    ],
    caption:
      "一人で兼任しても、どの段階にいるかを分けると抜けを見つけやすくなります。",
  },
} satisfies Record<string, DiagramSpec>;
export type UpdateDiagramKind = keyof typeof updateDiagrams;
