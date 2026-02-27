import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Your excellent DRY approach
const baseSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  draft: z.boolean().optional().default(false),
});

// Modern Astro 5 Loaders
export const collections = {
  health: defineCollection({
    loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/health" }),
    schema: baseSchema,
  }),
  imagery: defineCollection({
    loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/imagery" }),
    schema: baseSchema,
  }),
  meTube: defineCollection({
    loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/meTube" }),
    schema: baseSchema,
  }),
  tech: defineCollection({
    loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/tech" }),
    schema: baseSchema,
  }),
};