import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),          // now a normal schema field (not reserved in Astro 6)
    description: z.string(),
    date: z.string(),          // "YYYY-MM-DD" string — matches live file format
    icon: z.string(),          // Material Icons name, e.g. "inventory"
    faq: z.array(z.object({ q: z.string(), a: z.string() })).optional(),
  }),
});

export const collections = { posts };
