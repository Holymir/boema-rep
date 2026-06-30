import { defineType } from 'sanity';

// Bilingual string / text objects. bg is the default locale.
export const localeString = defineType({
  name: 'localeString',
  title: 'Localized string',
  type: 'object',
  fields: [
    { name: 'bg', title: 'Български', type: 'string' },
    { name: 'en', title: 'English', type: 'string' },
  ],
});

export const localeText = defineType({
  name: 'localeText',
  title: 'Localized text',
  type: 'object',
  fields: [
    { name: 'bg', title: 'Български', type: 'text', rows: 4 },
    { name: 'en', title: 'English', type: 'text', rows: 4 },
  ],
});

// Localized block content (rich text) — used for legal pages.
export const localeBlock = defineType({
  name: 'localeBlock',
  title: 'Localized rich text',
  type: 'object',
  fields: [
    { name: 'bg', title: 'Български', type: 'array', of: [{ type: 'block' }] },
    { name: 'en', title: 'English', type: 'array', of: [{ type: 'block' }] },
  ],
});
