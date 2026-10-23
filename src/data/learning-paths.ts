export const learningPaths = [
  {
    label: "初学者",
    num: "01",
    kind: "book" as const,
    title: "まず、自分の環境を知る。",
    text: "AIツールを使っているけれど、NodeやMCPはまだ詳しくない方へ。",
    ids: ["basics", "commands", "checklist"],
    time: "約20分",
  },
  {
    label: "経験者",
    num: "02",
    kind: "terminal" as const,
    title: "影響を見極め、更新する。",
    text: "開発環境や公開サービスを持つ方へ。実際の実行環境まで確認します。",
    ids: ["node-october-2026", "commands", "checklist"],
    time: "約25分",
  },
  {
    label: "上級者",
    num: "03",
    kind: "layers" as const,
    title: "確認を、運用の仕組みに。",
    text: "チーム・CI・クラウドを管理する方へ。継続的な確認と証跡を設計します。",
    ids: ["node-october-2026", "operations", "checklist"],
    time: "約30分",
  },
];
