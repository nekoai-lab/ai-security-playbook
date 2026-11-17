import type { LessonVisualId } from "./lesson-visuals";
export const readerJourneys = [
  {
    id: "use-ai",
    label: "AIを使う",
    summary: "仕事の情報を入力する、ファイルを渡す、操作を任せる。その前に。",
    firstLesson: "ai-data-boundaries",
    firstLabel: "AIに渡す情報を整理する",
    art: "ai-data-boundaries",
    ids: [
      "ai-data-boundaries",
      "ai-work-logs",
      "agent-permissions",
      "mcp-permissions",
      "approved-ai-data",
    ],
  },
  {
    id: "build-apps",
    label: "AIでアプリを作る",
    summary: "APIをつなぐ、ログインを付ける、サービスを公開する。そのときに。",
    firstLesson: "app-architecture",
    firstLabel: "画面・処理・保存先を知る",
    art: "app-architecture",
    ids: [
      "app-architecture",
      "basics",
      "api-keys",
      "access-control",
      "agent-permissions",
      "mcp-permissions",
      "release-artifacts",
      "launch-checklist",
      "developer-privacy",
      "secret-rotation",
      "cloud-account-safety",
      "dependency-updates",
      "github-guards",
      "ai-review-trust",
      "external-service-failures",
    ],
  },
  {
    id: "operate-services",
    label: "サービスを守る",
    summary: "公開した後の更新、異常への備え、復旧までを確かめたいときに。",
    firstLesson: "app-architecture",
    firstLabel: "画面・処理・保存先を知る",
    art: "dependency-updates",
    ids: [
      "app-architecture",
      "basics",
      "incident-response",
      "commands",
      "checklist",
      "node-october-2026",
      "php-october-2026",
      "dependency-updates",
      "cloud-account-safety",
      "secret-rotation",
      "github-guards",
      "external-service-failures",
      "operations",
    ],
  },
] as const satisfies readonly {
  id: string;
  label: string;
  summary: string;
  firstLesson: LessonVisualId;
  firstLabel: string;
  art: LessonVisualId;
  ids: readonly LessonVisualId[];
}[];
export type ReaderJourney = (typeof readerJourneys)[number];
