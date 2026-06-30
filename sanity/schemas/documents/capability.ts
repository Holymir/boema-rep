import { defineType, defineField } from 'sanity';

export const capability = defineType({
  name: 'capability',
  title: 'Capability',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'localeString' }),
    defineField({ name: 'description', title: 'Description', type: 'localeText' }),
    defineField({ name: 'order', title: 'Order', type: 'number' }),
  ],
  preview: { select: { title: 'title.bg', subtitle: 'title.en' } },
});
