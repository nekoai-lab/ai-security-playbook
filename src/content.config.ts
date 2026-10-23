import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";
const lessons = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/lessons" }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    category: z.enum(["基礎", "Node.js", "MCP", "AIエージェント", "クラウド"]),
    updated: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    order: z.number(),
    minutes: z.number(),
    outcomes: z.array(z.string().trim().min(1)).min(1).max(4).optional(),
  }),
});
export const collections = { lessons };
