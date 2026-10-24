export const readingHighlights = {
  "api-keys": {
    image: "api-key-scene",
    title: "APIキー、どこに入れるのが正解？",
    situation: "はじめて外部サービスをつなぐとき",
    description: "設定して動いた。その値がどこへ届くか、猫と一緒に確かめます。",
  },
  "node-october-2026": {
    image: "node-runtime-scene",
    title: "Node.jsの更新、確認するのはどこ？",
    situation: "AIツールやMCPの実行環境を確かめたいとき",
    description:
      "PC・MCP・CI・本番を分け、更新した版と動いている版を確認します。",
  },
} as const;
export type ReadingHighlightId = keyof typeof readingHighlights;
