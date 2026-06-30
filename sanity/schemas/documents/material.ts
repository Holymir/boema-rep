import { defineType, defineField } from 'sanity';

export const material = defineType({
  name: 'material',
  title: 'Material',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'localeString' }),
    defineField({ name: 'order', title: 'Order', type: 'number' }),
  ],
  preview: { select: { title: 'name.bg', subtitle: 'name.en' } },
});
