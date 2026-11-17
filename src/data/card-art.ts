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
        | "maintenance-lookout"
        | "runtime-field-guide"
        | "command-observation"
        | "mcp-connection-station"
        | "agent-permission-station"
        | "php-hosting-inspection"
        | "update-checklist-stations"
        | "operations-observation";
    };
// Theme scenes are independent of article and OGP image assignments.
export const topicCompositions = {
  "ai-tools": {
    art: { kind: "scene", lesson: "ai-data-boundaries", position: "50% 0%" },
  },
  development: { art: { kind: "illustration", image: "app-workshop" } },
  secrets: { art: { kind: "illustration", image: "keys-and-records" } },
  access: {
    art: { kind: "scene", lesson: "access-control", position: "50% 0%" },
  },
  connections: { art: { kind: "illustration", image: "agent-field-tools" } },
  release: {
    art: { kind: "scene", lesson: "release-artifacts", position: "50% 0%" },
  },
  operations: { art: { kind: "illustration", image: "maintenance-lookout" } },
  response: {
    art: { kind: "scene", lesson: "incident-response", position: "50% 0%" },
  },
} as const satisfies Record<TopicId, { art: CardArt }>;
// Each lesson has a distinct scene; every card shares the note-style media frame.
const cardWorlds = {
  basics: "runtime-field-guide",
  commands: "command-observation",
  "mcp-permissions": "mcp-connection-station",
  "agent-permissions": "agent-permission-station",
  "php-october-2026": "php-hosting-inspection",
  checklist: "update-checklist-stations",
  operations: "operations-observation",
} as const;
export function lessonCardArt(id: LessonVisualId): CardArt {
  if (id in cardWorlds)
    return {
      kind: "illustration",
      image: cardWorlds[id as keyof typeof cardWorlds],
    };
  return { kind: "scene", lesson: id, position: "50% 0%" };
}
export const lessonCardIds = Object.keys(lessonVisuals) as LessonVisualId[];

/** One image identity for list, related cards and sharing. */
export function lessonCardSource(id: LessonVisualId): string {
  const art = lessonCardArt(id);
  if (art.kind === "illustration") return `public/images/${art.image}-960.webp`;
  if (art.kind === "scene")
    return `public/images/${lessonVisuals[art.lesson].image}-960.webp`;
  throw new Error(`Lesson card requires a scene: ${id}`);
}
export function lessonCardFocalX(id: LessonVisualId): number {
  const positions: Partial<Record<LessonVisualId, number>> = {
    basics: 0.35,
    commands: 0.66,
    "mcp-permissions": 0.27,
    "agent-permissions": 0.61,
    "php-october-2026": 0.32,
    checklist: 0.68,
    operations: 0.75,
    "node-october-2026": 0,
  };
  return positions[id] ?? 0.5;
}
