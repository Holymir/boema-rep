import { defineType, defineField } from 'sanity';

export const download = defineType({
  name: 'download',
  title: 'Download (catalog / brochure)',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'localeString' }),
    defineField({ name: 'meta', title: 'Meta line', type: 'localeString' }),
    defineField({
      name: 'file',
      title: 'PDF file',
      type: 'file',
      options: { accept: '.pdf' },
    }),
    defineField({ name: 'order', title: 'Order', type: 'number' }),
  ],
  preview: {
    select: { title: 'title.bg', subtitle: 'title.en' },
  },
});
