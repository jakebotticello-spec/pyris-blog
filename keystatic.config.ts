import { config, collection, fields } from '@keystatic/core';

// fields.document() defaults to contentExtension: '.mdoc', which makes Keystatic
// scan for .mdoc files and fail to find our .md posts. Spread and override so
// getDataFileExtension() returns '.md'. The splitFrontmatter path in loadDataFile
// is still triggered (contentField is set), so YAML frontmatter parses correctly
// and the body lands in extraFakeFile, which parseEntry injects into filesWithFakeFile
// at the right virtual path for the document editor to read.
const mdBody: any = {
  ...fields.document({
    label: 'Content',
    formatting: true,
    dividers: true,
    links: true,
    images: true,
  }),
  contentExtension: '.md',
};

export default config({
  storage: { kind: 'local' },
  collections: {
    posts: collection({
      label: 'Posts',
      // slugField MUST point to a fields.slug() field — keystatic-core-ui.js checks
      // formKind === 'slug' when opening an entry and throws otherwise.
      // Using 'slug' (not 'title') keeps the frontmatter `slug:` key as the single
      // source of truth: serializeWithSlug writes value.name → frontmatter slug, and
      // value.slug → filename. For URL-safe input these are identical, so
      // post.data.slug === filename (no split-brain).
      slugField: 'slug',
      path: 'src/content/posts/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.text({ label: 'Title' }),
        slug: fields.slug({ name: { label: 'Slug' } }),
        description: fields.text({ label: 'Description', multiline: true }),
        date: fields.date({ label: 'Date' }),
        icon: fields.text({ label: 'Icon (Material Icons name)' }),
        content: mdBody,
      },
    }),
  },
});
