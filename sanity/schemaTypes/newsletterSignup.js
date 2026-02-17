import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'newsletterSignup',
  title: 'Newsletter Signups',
  type: 'document',
  fields: [
    defineField({ name: 'email', title: 'Email', type: 'string' }),
    defineField({ name: 'interests', title: 'Interests', type: 'string' }),
    defineField({ name: 'source', title: 'Source', type: 'string', initialValue: 'website' }),
    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
});
