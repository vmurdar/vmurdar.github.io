import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const baseSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  draft: z.boolean().optional().default(false),
  pubDate: z.coerce.date().optional(),
  navOrder: z.number().optional().default(99),
  isProtected: z.boolean().optional().default(false),
});

export const collections = {
  // ONE single collection that dynamically reads all sub-folders
  pages: defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: "./src/content",
   }),
    schema: baseSchema,
  }),
};