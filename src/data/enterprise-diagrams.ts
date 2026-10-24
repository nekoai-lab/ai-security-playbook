import type { DiagramSpec } from "./lesson-visuals";
export const enterpriseDiagrams = {
  scope: {
    title: "許可の範囲を、同じ単位でそろえる",
    layout: "sequence",
    nodes: [
      {
        label: "何の仕事？",
        detail: "問い合わせ分類、配送先照合などの目的。",
        icon: "file",
      },
      {
        label: "何をどこで使う？",
        detail: "情報の種類と、契約対象の作業場所。",
        icon: "server",
      },
      {
        label: "誰に渡る？",
        detail: "利用者、連携先、回答の共有先。",
        icon: "person",
      },
    ],
    caption:
      "サービスの利用可だけで、すべてのデータ・用途・送信先が許可されたとは考えません。",
  },
  plans: {
    title: "料金・学習設定・会社の承認は別の条件",
    layout: "branch",
    nodes: [
      {
        label: "利用条件を照合",
        detail: "実際の製品・プラン・機能を確認する。",
        icon: "eye",
      },
      {
        label: "企業向けの既定",
        detail: "対象の契約で、非学習の既定や例外を確認。",
        icon: "box",
      },
      {
        label: "個人向けの設定",
        detail: "有料かどうかとは別に、対象と設定を見る。",
        icon: "screen",
      },
      {
        label: "業務で使う許可",
        detail: "目的と情報に対する会社の案内を確認。",
        icon: "person",
      },
    ],
    caption:
      "企業向けだけを唯一の条件にせず、個人の設定だけで会社の許可とも判断しません。",
  },
  handling: {
    title: "学習以外の扱いも、目的に合わせる",
    layout: "branch",
    nodes: [
      {
        label: "承認された入力",
        detail: "必要なデータを、認められた作業へ使う。",
        icon: "file",
      },
      {
        label: "モデルの学習",
        detail: "対象データ、非利用の既定や設定、例外。",
        icon: "server",
      },
      {
        label: "保存と保持",
        detail: "会話・添付・ログの保存先と期間。",
        icon: "clock",
      },
      {
        label: "閲覧と監査",
        detail: "利用者・管理者・運用側の権限と目的。",
        icon: "eye",
      },
    ],
    caption: "非学習と、無保存や全員に閲覧不能という条件は同じではありません。",
  },
  connections: {
    title: "機能を足した先の経路を見る",
    layout: "sequence",
    nodes: [
      {
        label: "会社の作業場所",
        detail: "契約と設定が適用される範囲。",
        icon: "screen",
      },
      {
        label: "追加の機能",
        detail: "検索、外部ツール、フィードバック。",
        icon: "cloud",
      },
      {
        label: "別の取扱条件",
        detail: "誰へ何が送られ、どう使われるか。",
        icon: "eye",
      },
    ],
    caption:
      "AI本体で確認した条件だけで、接続先や別の送信操作も確認済みにはしません。",
  },
  fields: {
    title: "同じデータでも、必要な項目が変わる",
    layout: "compare",
    nodes: [
      {
        label: "問い合わせの分類",
        detail: "案件IDと内容。宛名・住所は今回使わない。",
        icon: "file",
      },
      {
        label: "配送先の照合",
        detail: "案件ID・宛名・住所。今回不要なメモは外す。",
        icon: "box",
      },
    ],
    caption:
      "承認済みという架空の業務例です。項目の中身や法令・契約への適合を自動判断する図ではありません。",
  },
  review: {
    title: "日常利用と、条件が変わるときを分ける",
    layout: "sequence",
    nodes: [
      {
        label: "範囲が明確な業務",
        detail: "認められた情報を、手順に沿って使う。",
        icon: "file",
      },
      {
        label: "用途・機能を追加",
        detail: "増えたデータや送信先を確かめる。",
        icon: "cloud",
      },
      {
        label: "案内を更新",
        detail: "適用範囲・確認日・相談先をそろえる。",
        icon: "person",
      },
    ],
    caption:
      "毎回一から審査するより、何が変わったら確認するかを分かる形にします。",
  },
} satisfies Record<string, DiagramSpec>;
export type EnterpriseDiagramKind = keyof typeof enterpriseDiagrams;
