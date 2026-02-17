import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'quotationRequest',
  title: 'Quotation Requests',
  type: 'document',
  fields: [
    defineField({ name: 'projectName', title: 'Project Name', type: 'string' }),
    defineField({ name: 'companyName', title: 'Company Name', type: 'string' }),
    defineField({ name: 'timeline', title: 'Timeline', type: 'string' }),
    defineField({ name: 'notes', title: 'Notes', type: 'text', rows: 3 }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      initialValue: 'new',
      options: {
        list: [
          { title: 'New', value: 'new' },
          { title: 'Reviewing', value: 'reviewing' },
          { title: 'Approved', value: 'approved' },
          { title: 'Completed', value: 'completed' },
        ],
      },
    }),
    defineField({ name: 'subtotal', title: 'Subtotal', type: 'number' }),
    defineField({ name: 'vat', title: 'VAT', type: 'number' }),
    defineField({ name: 'total', title: 'Total', type: 'number' }),
    defineField({
      name: 'client',
      title: 'Client',
      type: 'object',
      fields: [
        defineField({ name: 'clerkUserId', title: 'Clerk User ID', type: 'string' }),
        defineField({ name: 'name', title: 'Name', type: 'string' }),
        defineField({ name: 'email', title: 'Email', type: 'string' }),
      ],
    }),
    defineField({
      name: 'lineItems',
      title: 'Line Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'string' }),
            defineField({ name: 'category', title: 'Category', type: 'string' }),
            defineField({ name: 'price', title: 'Price', type: 'number' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
});
