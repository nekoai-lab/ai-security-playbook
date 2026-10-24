export const topics = [
  {
    id: "ai-tools",
    title: "AIを使う前に",
    summary: "入力する情報と、AIに任せる範囲を決める。",
    kind: "book",
  },
  {
    id: "development",
    title: "アプリの仕組み",
    summary: "画面・処理・保存先・実行環境を分けて理解する。",
    kind: "terminal",
  },
  {
    id: "secrets",
    title: "秘密とデータ",
    summary: "APIキーや個人情報を、必要な範囲で扱う。",
    kind: "book",
  },
  {
    id: "access",
    title: "ログインと権限",
    summary: "本人確認と、データを使える権限を分ける。",
    kind: "layers",
  },
  {
    id: "connections",
    title: "MCPとエージェント",
    summary: "接続先と、読む・変える・送る権限を確かめる。",
    kind: "compass",
  },
  {
    id: "release",
    title: "公開前の確認",
    summary: "公開範囲・料金・復旧を、実際の設定で確かめる。",
    kind: "layers",
  },
  {
    id: "operations",
    title: "公開後の運用",
    summary: "更新、監視、通知を日々の確認につなげる。",
    kind: "terminal",
  },
  {
    id: "response",
    title: "困ったとき",
    summary: "漏えい・異常・消失への初動と復旧を分ける。",
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
export const levels = ["入門", "基本知識が必要", "実務経験が必要"] as const;
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
