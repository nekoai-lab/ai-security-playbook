import type { CatPoseName } from "../components/CatPose.astro";
import { lessonVisuals, type LessonVisualId } from "./lesson-visuals";
import type { TopicId } from "./topic-guides";
export type CardArt =
  | { kind: "scene"; lesson: LessonVisualId; position: string }
  | { kind: "pose"; pose: CatPoseName };
// Theme artwork keeps the complete approved scene or pairs a pose with topic cues.
export const topicCompositions = {
  "ai-tools": {
    layout: "scene",
    art: { kind: "scene", lesson: "ai-data-boundaries", position: "center" },
  },
  development: {
    layout: "map",
    art: { kind: "pose", pose: "walk-right" },
    cues: ["画面", "サーバー", "保存先"],
  },
  secrets: {
    layout: "boundary",
    art: { kind: "pose", pose: "peek-side" },
    cues: ["置き場所", "届く先"],
  },
  access: {
    layout: "scene",
    art: { kind: "scene", lesson: "access-control", position: "center" },
  },
  connections: {
    layout: "desk",
    art: { kind: "pose", pose: "laptop" },
    cues: ["読める範囲", "変えられる範囲"],
  },
  release: {
    layout: "scene",
    art: { kind: "scene", lesson: "release-artifacts", position: "center" },
  },
  operations: {
    layout: "inspect",
    art: { kind: "pose", pose: "investigate" },
    cues: ["更新した版", "動いている版"],
  },
  response: {
    layout: "scene",
    art: { kind: "scene", lesson: "incident-response", position: "center" },
  },
} as const satisfies Record<
  TopicId,
  { layout: string; art: CardArt; cues?: readonly string[] }
>;
// Cards have their own composition; article scenes and OGP assignments stay intact.
const poses = {
  "ai-review-trust": "investigate",
  "agent-permissions": "think",
  "ai-data-boundaries": "point",
  "ai-work-logs": "peek-side",
  "app-architecture": "walk-right",
  basics: "laptop",
  checklist: "smile",
  commands: "investigate",
  "developer-privacy": "peek",
  "external-service-failures": "concern",
  "launch-checklist": "point",
  "mcp-permissions": "peek-side",
  operations: "laptop",
} as const satisfies Partial<Record<LessonVisualId, CatPoseName>>;
export function lessonCardArt(id: LessonVisualId): CardArt {
  if (id in poses)
    return { kind: "pose", pose: poses[id as keyof typeof poses] };
  return {
    kind: "scene",
    lesson: id,
    position: id === "node-october-2026" ? "20% 20%" : "50% 10%",
  };
}
export const lessonCardIds = Object.keys(lessonVisuals) as LessonVisualId[];
