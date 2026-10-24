import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";
import { topicIds, levels, formats } from "./data/catalog";
const lessons = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/lessons" }),
  schema: z.object({
    title: z.string(),
    shortTitle: z.string().trim().min(1).optional(),
    summary: z.string(),
    updated: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    topic: z.enum(topicIds),
    level: z.enum(levels),
    format: z.enum(formats),
    published: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    reviewed: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    keywords: z.array(z.string()),
    changes: z
      .array(
        z.object({
          date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
          summary: z.string().min(1),
        }),
      )
      .default([]),
    minutes: z.number(),
    qualityVersion: z.union([z.literal(1), z.literal(2)]).optional(),
    reviewSections: z
      .object({
        audience: z.string().min(1),
        mechanism: z.string().min(1),
        risks: z.string().min(1),
        case: z.string().min(1),
        roles: z.string().min(1),
        exercise: z.string().min(1),
        checklist: z.string().min(1),
        next: z.string().min(1),
        sources: z.string().min(1),
      })
      .optional(),
    prerequisites: z.array(z.string()).default([]),
    related: z.array(z.string()).default([]),
    outcomes: z.array(z.string().trim().min(1)).min(1).max(4).optional(),
  }),
});
export const collections = { lessons };
