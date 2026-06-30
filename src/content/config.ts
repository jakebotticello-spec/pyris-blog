import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.string(),   // "YYYY-MM-DD" — matches live file format exactly
    icon: z.string(),   // Material Icons name, e.g. "inventory"
    // 'slug' is intentionally excluded: Astro treats it as a reserved routing
    // field. Keystatic writes it to frontmatter via slugField:'slug', and
    // Astro uses the frontmatter slug value to override the filename-derived
    // slug — but it must NOT be declared in this schema or Astro throws.
  }),
});

export const collections = { posts };
