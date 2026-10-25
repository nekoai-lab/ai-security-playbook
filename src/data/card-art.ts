import type { CatPoseName } from "../components/CatPose.astro";
import { lessonVisuals, type LessonVisualId } from "./lesson-visuals";
import type { TopicId } from "./topic-guides";
export type CardArt =
  | { kind: "scene"; lesson: LessonVisualId; position: string }
  | { kind: "pose"; pose: CatPoseName };
export const topicCompositions = {
  "ai-tools": {
    layout: "scene-side",
    art: { kind: "scene", lesson: "ai-data-boundaries", position: "38% 50%" },
  },
  development: { layout: "walk", art: { kind: "pose", pose: "walk-right" } },
  secrets: { layout: "peek", art: { kind: "pose", pose: "peek-side" } },
  access: {
    layout: "scene-bottom",
    art: { kind: "scene", lesson: "access-control", position: "50% 10%" },
  },
  connections: { layout: "desk", art: { kind: "pose", pose: "laptop" } },
  release: {
    layout: "scene-bottom",
    art: { kind: "scene", lesson: "release-artifacts", position: "50% 10%" },
  },
  operations: { layout: "walk", art: { kind: "pose", pose: "investigate" } },
  response: { layout: "peek", art: { kind: "pose", pose: "concern" } },
} as const satisfies Record<TopicId, { layout: string; art: CardArt }>;
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
