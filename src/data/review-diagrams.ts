import type { DiagramSpec } from "./lesson-visuals";
export const reviewDiagrams = {
  variance: {
    title: "同じ版・同じ依頼文でも、照らす範囲は回ごとに変わる",
    layout: "compare",
    nodes: [
      {
        label: "ある回のレビュー",
        detail: "ログイン回数と、データの持ち主を指摘して終わる。",
        icon: "eye",
      },
      {
        label: "別の回のレビュー",
        detail: "同じ2件に加えて、取り消しの確認漏れも指摘する。",
        icon: "eye",
      },
      {
        label: "どの回も照らさなかった所",
        detail: "表示のエスケープ、今の状態の確認、クライアントが送る値。",
        icon: "file",
      },
    ],
    caption:
      "研究上の再現実験で観察した傾向です。照らさなかった所に欠陥がないという意味ではありません。",
  },
  viewpoint: {
    title: "回数より先に、何を確かめるかを決める",
    layout: "sequence",
    nodes: [
      {
        label: "現場で出た穴を書き出す",
        detail: "過去の指摘・修正・見逃しを、欠陥の型で並べる。",
        icon: "file",
      },
      {
        label: "確認項目にして依頼文へ",
        detail: "「1つずつ確かめる」と書き、当てはまれば止める扱いにする。",
        icon: "key",
      },
      {
        label: "同じ版で比べて記録する",
        detail: "項目ごとに、何回中何回拾ったかを残す。",
        icon: "eye",
      },
    ],
    caption:
      "確認項目は観点をそろえる道具です。項目にない種類の欠陥まで見つかる保証はありません。",
  },
  "reuse-rule": {
    title: "合格の使い回しは、どの変更まで許す？",
    layout: "compare",
    nodes: [
      {
        label: "広い使い回しの条件",
        detail: "「docsだけの変更なら前の合格を使う」。その後のレビューが行われない。",
        icon: "clock",
      },
      {
        label: "止める条件を先に決める",
        detail: "ログイン・権限・お金・個人情報の変更を含む版では、使い回さない。",
        icon: "key",
      },
    ],
    caption:
      "使い回しは時間を節約しますが、前の合格が見落とした欠陥も、そのまま次の判断へ運びます。",
  },
  "rule-owner": {
    title: "依頼文と合否のルールは、変更される側に置かない",
    layout: "compare",
    nodes: [
      {
        label: "PRの中にある設定",
        detail: "レビューされる変更と一緒に、依頼文や合否の条件も書き換えられる。",
        icon: "file",
      },
      {
        label: "信頼済みの場所にある設定",
        detail: "取り込み済みの版や別の管理場所から読み、PR側の変更を採用しない。",
        icon: "server",
      },
    ],
    caption:
      "どこから読むかは、使うレビュー製品とCIの仕様で確かめます。ここでは置き場所の考え方だけを示します。",
  },
  "tool-scope": {
    title: "「誰のデータか」を、モデルに選ばせない",
    layout: "compare",
    nodes: [
      {
        label: "引数で対象の人を受け取るツール",
        detail: "モデルが別の人を指定すれば、そのデータも読める。",
        icon: "person",
      },
      {
        label: "触れる範囲を閉じ込めたツール",
        detail: "対象の人はログインの情報で決め、引数から外す。残る引数もその範囲で確かめる。",
        icon: "key",
      },
    ],
    caption:
      "依頼文で「他の人のデータを読まないで」と頼むことと、ツールで読めなくすることは別です。",
  },
  "same-type": {
    title: "1か所直したら、同じ型を探す",
    layout: "sequence",
    nodes: [
      {
        label: "指摘された箇所を直す",
        detail: "直す前に落ち、直した後に通るテストを足す。",
        icon: "file",
      },
      {
        label: "同じ型の箇所を探す",
        detail: "このPRの外も含め、同じ書き方・同じ入口を調べる。",
        icon: "eye",
      },
      {
        label: "調べた範囲と結果を残す",
        detail: "どこまで探し、何が見つかり、何を調べていないか。",
        icon: "clock",
      },
    ],
    caption:
      "1か所の修正とその合格は、別の場所に残る同じ型を確かめたことになりません。",
  },
} satisfies Record<string, DiagramSpec>;
export type ReviewDiagramKind = keyof typeof reviewDiagrams;
