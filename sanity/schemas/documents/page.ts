import { defineType, defineField } from 'sanity';

// Editable copy pages — used for Privacy and Terms legal stubs.
export const page = defineType({
  name: 'page',
  title: 'Page (legal / copy)',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'localeString' }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title.en' },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'body', title: 'Body', type: 'localeBlock' }),
  ],
  preview: { select: { title: 'title.bg', subtitle: 'slug.current' } },
});
