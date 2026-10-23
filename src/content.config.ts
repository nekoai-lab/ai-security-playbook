import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";
import { topicIds, levels, formats } from "./data/catalog";
const lessons = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/lessons" }),
  schema: z.object({
    title: z.string(),
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
    outcomes: z.array(z.string().trim().min(1)).min(1).max(4).optional(),
  }),
});
export const collections = { lessons };
