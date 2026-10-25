import type { CatPoseName } from "../components/CatPose.astro";
import { lessonVisuals, type LessonVisualId } from "./lesson-visuals";
import type { TopicId } from "./topic-guides";
export type CardArt =
  | { kind: "scene"; lesson: LessonVisualId; position: string }
  | { kind: "pose"; pose: CatPoseName }
  | {
      kind: "illustration";
      image:
        | "app-workshop"
        | "keys-and-records"
        | "agent-field-tools"
        | "maintenance-lookout";
    };
// Theme scenes are independent of article and OGP image assignments.
export const topicCompositions = {
  "ai-tools": {
    art: { kind: "scene", lesson: "ai-data-boundaries", position: "center" },
  },
  development: { art: { kind: "illustration", image: "app-workshop" } },
  secrets: { art: { kind: "illustration", image: "keys-and-records" } },
  access: {
    art: { kind: "scene", lesson: "access-control", position: "center" },
  },
  connections: { art: { kind: "illustration", image: "agent-field-tools" } },
  release: {
    art: { kind: "scene", lesson: "release-artifacts", position: "center" },
  },
  operations: { art: { kind: "illustration", image: "maintenance-lookout" } },
  response: {
    art: { kind: "scene", lesson: "incident-response", position: "center" },
  },
} as const satisfies Record<TopicId, { art: CardArt }>;
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
