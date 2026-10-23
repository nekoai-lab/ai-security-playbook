export const topics = [
  {
    id: "development",
    title: "開発・実行環境",
    summary: "アプリとランタイムを分け、使っている環境を確かめる。",
    kind: "terminal",
  },
  {
    id: "operations",
    title: "更新・運用",
    summary: "更新後の確認、通知、AIレビューを日々の運用につなげる。",
    kind: "layers",
  },
  {
    id: "ai-tools",
    title: "AIツールの利用",
    summary: "AIツールの利用と情報の扱い方を学ぶ。",
    kind: "book",
  },
  {
    id: "mcp",
    title: "MCP・連携",
    summary: "ツール連携の権限とデータの流れを理解する。",
    kind: "compass",
  },
  {
    id: "agents",
    title: "AIエージェント",
    summary: "エージェントの権限と実行範囲を考える。",
    kind: "layers",
  },
  {
    id: "cloud",
    title: "クラウド",
    summary: "クラウドで動くAIの設定と運用を確認する。",
    kind: "layers",
  },
] as const;
export const topicIds = [
  "development",
  "operations",
  "ai-tools",
  "mcp",
  "agents",
  "cloud",
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
