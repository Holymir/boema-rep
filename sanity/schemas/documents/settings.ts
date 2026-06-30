import { defineType, defineField } from 'sanity';

// Singleton — company NAP and contact details used across the site / SEO.
export const settings = defineType({
  name: 'settings',
  title: 'Site settings',
  type: 'document',
  fields: [
    defineField({ name: 'companyName', title: 'Company name', type: 'string' }),
    defineField({ name: 'email', title: 'Email', type: 'string' }),
    defineField({ name: 'phone', title: 'Phone', type: 'string' }),
    defineField({ name: 'addressLine1', title: 'Address line 1', type: 'localeString' }),
    defineField({ name: 'addressLine2', title: 'Address line 2', type: 'localeString' }),
    defineField({ name: 'city', title: 'City', type: 'string' }),
    defineField({ name: 'region', title: 'Region', type: 'string' }),
    defineField({ name: 'postalCode', title: 'Postal code', type: 'string' }),
  ],
  preview: { select: { title: 'companyName' } },
});
