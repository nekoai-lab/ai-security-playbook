import type { DiagramSpec } from "./lesson-visuals";
export const guardDiagrams = {
  flow: {
    title: "作る・検査する・反映するを分ける",
    layout: "sequence",
    nodes: [
      {
        label: "修正を提案",
        detail: "ブランチとPRで差分を示す。",
        icon: "file",
      },
      {
        label: "検査とレビュー",
        detail: "どの状態に何を確かめたかを見る。",
        icon: "eye",
      },
      {
        label: "マージして公開",
        detail: "取り込んだ変更と公開先を照合。",
        icon: "cloud",
      },
    ],
    caption: "PR、検査の成功、公開の完了は、それぞれ別の状態です。",
  },
  rules: {
    title: "方針を、実際に働く条件へつなげる",
    layout: "branch",
    nodes: [
      {
        label: "公開用ブランチのルール",
        detail: "作っただけでなく、適用された条件を見る。",
        icon: "key",
      },
      {
        label: "対象と適用状態",
        detail: "どのブランチに、どの状態で効くか。",
        icon: "file",
      },
      {
        label: "必要な手順",
        detail: "PR、承認、必須チェックの条件。",
        icon: "eye",
      },
      {
        label: "回避できる相手",
        detail: "管理者、アプリなどの例外を確認。",
        icon: "person",
      },
    ],
    caption: "使える機能と運用する人数に合わせ、管理する検証環境で確かめます。",
  },
  checks: {
    title: "緑の項目を、3つの問いで見る",
    layout: "sequence",
    nodes: [
      {
        label: "何を検査した？",
        detail: "ビルド、動作、権限などの実行内容。",
        icon: "eye",
      },
      {
        label: "どの差分の結果？",
        detail: "追加の修正後にも必要な結果があるか。",
        icon: "file",
      },
      {
        label: "何が必須？",
        detail: "必要な名前と結果の出所、省略の扱いを確認。",
        icon: "key",
      },
    ],
    caption:
      "検査が一つ成功したことだけで、必要な確認すべてを満たしたとは判断しません。",
  },
  permissions: {
    title: "検査する仕事と、公開する権限を分ける",
    layout: "compare",
    nodes: [
      {
        label: "検査のジョブ",
        detail: "必要な読み取りと実行。不要な秘密や公開権限を渡さない。",
        icon: "eye",
      },
      {
        label: "公開のジョブ",
        detail: "許可した対象・条件で、必要な公開権限を使う。",
        icon: "cloud",
      },
    ],
    caption:
      "トークンの権限、別に渡す秘密、実行するコードと通信を合わせて確認します。",
  },
  actions: {
    title: "固定した対象と、まだ変わり得るものを見る",
    layout: "compare",
    nodes: [
      {
        label: "Action本体のコミット",
        detail: "提供元と内容を確認し、完全なSHAで識別する。",
        icon: "file",
      },
      {
        label: "実行時に取得する部品",
        detail: "別のスクリプトやイメージの取得元と指定も見る。",
        icon: "cloud",
      },
    ],
    caption:
      "本体の固定だけで、実行時のすべての外部取得まで固定されたとは限りません。",
  },
  publish: {
    title: "検査の結果から、公開した結果まで",
    layout: "sequence",
    nodes: [
      {
        label: "同じ差分を確認",
        detail: "検査とレビュー後の追加変更も照合。",
        icon: "file",
      },
      {
        label: "反映条件を確認",
        detail: "必要なルールと権限を満たしたか。",
        icon: "key",
      },
      {
        label: "公開先で確認",
        detail: "意図したリリース、URL、主要な動作を見る。",
        icon: "screen",
      },
    ],
    caption: "マージだけで公開完了にせず、実際の反映先を確かめます。",
  },
} satisfies Record<string, DiagramSpec>;
export type GuardDiagramKind = keyof typeof guardDiagrams;
