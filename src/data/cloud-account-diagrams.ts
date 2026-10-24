import type { DiagramSpec } from "./lesson-visuals";
export const cloudAccountDiagrams = {
  identities: {
    title: "所有者・日常操作・実行の3つに分ける",
    layout: "branch",
    nodes: [
      {
        label: "自分のAWS利用",
        detail: "同じ人でも目的に合う権限を使い分ける。",
        icon: "person",
      },
      {
        label: "所有者の入口",
        detail: "ルートが必要な操作と復旧。",
        icon: "key",
      },
      {
        label: "日常の操作",
        detail: "必要な範囲で確認・変更・反映。",
        icon: "screen",
      },
      {
        label: "アプリの実行",
        detail: "データや外部機能を使うための権限。",
        icon: "server",
      },
    ],
    caption:
      "アプリが画像を読むために、所有者の強い認証を持つ必要はありません。",
  },
  sessions: {
    title: "人とアプリで、認証の使い方を分ける",
    layout: "compare",
    nodes: [
      {
        label: "人の作業",
        detail: "連携したログインなどから、期限のある認証を使う。",
        icon: "person",
      },
      {
        label: "アプリやCI",
        detail: "実行環境のロールや、対応する短期認証の連携。",
        icon: "server",
      },
    ],
    caption: "短い有効期限と、できる操作の狭さは別の条件です。",
  },
  permissions: {
    title: "必要な権限を3つの問いで見る",
    layout: "sequence",
    nodes: [
      {
        label: "何をする？",
        detail: "更新、読取、作成などの操作。",
        icon: "file",
      },
      {
        label: "どこへする？",
        detail: "対象アプリ、保存先、アカウント。",
        icon: "box",
      },
      {
        label: "どの条件で？",
        detail: "実行主体と、許可された場面。",
        icon: "eye",
      },
    ],
    caption:
      "ロール名や、デプロイに成功したという結果だけでは権限の範囲は分かりません。",
  },
  trust: {
    title: "ロールの入口と、引受後の操作",
    layout: "sequence",
    nodes: [
      {
        label: "誰が使える？",
        detail: "信頼する人・サービス・外部の条件。",
        icon: "person",
      },
      {
        label: "ロールを引き受ける",
        detail: "条件が合う主体がセッションを使う。",
        icon: "key",
      },
      {
        label: "何ができる？",
        detail: "操作と対象、資源側の設定も確認。",
        icon: "server",
      },
    ],
    caption: "入口を絞ることと、引受後の権限を絞ることは別に確認します。",
  },
  recovery: {
    title: "認証を強くし、復旧先も確かめる",
    layout: "branch",
    nodes: [
      {
        label: "管理する入口",
        detail: "MFAと日常認証の分離。",
        icon: "key",
      },
      {
        label: "予備の方法",
        detail: "唯一の端末だけに依存しない構成。",
        icon: "box",
      },
      {
        label: "回復の連絡先",
        detail: "メールや連絡先、組織の復旧手順。",
        icon: "person",
      },
    ],
    caption: "使える唯一の認証を先に消して復旧を試す、という手順にはしません。",
  },
  migration: {
    title: "止めずに、通常の権限整理を進める",
    layout: "sequence",
    nodes: [
      {
        label: "利用先を把握",
        detail: "アプリ・CI・定期処理の認証を追う。",
        icon: "eye",
      },
      {
        label: "新しい構成で確認",
        detail: "必要な操作と、想定した対象を照合。",
        icon: "server",
      },
      {
        label: "切替後も確認",
        detail: "旧利用の残りと、復旧先を確認。",
        icon: "clock",
      },
    ],
    caption:
      "漏えい・不正利用を疑う場合は、通常整理とは別の優先度で対応します。",
  },
} satisfies Record<string, DiagramSpec>;
export type CloudAccountDiagramKind = keyof typeof cloudAccountDiagrams;
