export const topics = [
  {
    id: "ai-tools",
    title: "AIに渡す情報",
    summary: "個人情報・添付資料・会社のAI。入力してよい範囲を整理する。",
    kind: "book",
  },
  {
    id: "development",
    title: "アプリの仕組み",
    summary: "画面・サーバー・保存先・実行環境。どこを確認するかが分かる。",
    kind: "terminal",
  },
  {
    id: "secrets",
    title: "APIキー・会話・データ",
    summary: "キーの置き場所、会話の保存と共有、交換後の反映を確かめる。",
    kind: "book",
  },
  {
    id: "access",
    title: "ログインと権限",
    summary: "本人確認とアクセス権限を分け、誰が何を使えるかを確かめる。",
    kind: "layers",
  },
  {
    id: "connections",
    title: "AIに任せる操作",
    summary: "MCPとエージェントの、読む・変える・送る範囲を決める。",
    kind: "compass",
  },
  {
    id: "release",
    title: "公開前の確認",
    summary: "配布するファイル、公開範囲、復旧の備えを具体例で確かめる。",
    kind: "layers",
  },
  {
    id: "operations",
    title: "更新・公開後の運用",
    summary: "Node.js・PHP・依存部品の更新から、外部APIの失敗への備えまで。",
    kind: "terminal",
  },
  {
    id: "response",
    title: "異常に気づいたら",
    summary: "状況の記録、相談、初動・復旧を、担当と操作に分けて考える。",
    kind: "compass",
  },
] as const;
export const topicIds = [
  "ai-tools",
  "development",
  "secrets",
  "access",
  "connections",
  "release",
  "operations",
  "response",
] as const;
export const levels = ["入門", "実践", "発展"] as const;
export const formats = [
  "解説",
  "手順",
  "チェックリスト",
  "事例・更新情報",
] as const;
export const topicTitle = (id: string) =>
  topics.find((t) => t.id === id)?.title ?? id;
export const series = [
  {
    id: "solo-development",
    title: "AIで作って公開する基本",
    summary:
      "情報の扱いとアプリの仕組みから、秘密・権限・公開前確認・異常時対応まで。",
    ids: [
      "ai-data-boundaries",
      "approved-ai-data",
      "app-architecture",
      "api-keys",
      "secret-rotation",
      "access-control",
      "release-artifacts",
      "developer-privacy",
      "github-guards",
      "ai-review-trust",
      "cloud-account-safety",
      "launch-checklist",
      "external-service-failures",
      "incident-response",
    ],
  },
  {
    id: "ai-connections",
    title: "AI連携の権限を決める",
    summary: "会話ログに残る情報から、MCPの接続とエージェントの権限まで学ぶ。",
    ids: ["ai-work-logs", "mcp-permissions", "agent-permissions"],
  },
  {
    id: "node-security",
    title: "Node.jsの更新を確かめる",
    summary:
      "実行環境の基本から、更新事例、確認手順、運用まで。Node.jsを中心に学ぶ実践シリーズ。",
    ids: ["basics", "node-october-2026", "commands", "checklist", "operations"],
  },
];
export const seriesFor = (id: string) => series.find((s) => s.ids.includes(id));
export const normalizeSearch = (s: string) =>
  s.normalize("NFKC").toLocaleLowerCase("ja");
export function matchesSearch(text: string, query: string) {
  const normalized = normalizeSearch(text);
  return normalizeSearch(query)
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .every((word) => normalized.includes(word));
}

export const levelDetails = {
  入門: {
    label: "仕組みを知る",
    prerequisite: "専門知識なしで、用語やリスク、確認する場所を知る。",
  },
  実践: {
    label: "自分の環境で確かめる",
    prerequisite: "基本の仕組みを知ったら、管理する設定や結果を確認する。",
  },
  発展: {
    label: "設計・運用を見直す",
    prerequisite:
      "実装や業務の管理を担う方が、権限・契約・失敗時の備えを掘り下げる。",
  },
} as const;
export function normalizeLevel(value: string): string {
  return (
    (
      { 基本知識が必要: "実践", 実務経験が必要: "発展" } as Record<
        string,
        string
      >
    )[value] ?? value
  );
}
