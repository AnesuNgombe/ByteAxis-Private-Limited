import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'paymentRequest',
  title: 'Payment Requests',
  type: 'document',
  fields: [
    defineField({ name: 'projectName', title: 'Project Name', type: 'string' }),
    defineField({ name: 'companyName', title: 'Company Name', type: 'string' }),
    defineField({ name: 'amount', title: 'Amount', type: 'number' }),
    defineField({ name: 'currency', title: 'Currency', type: 'string' }),
    defineField({ name: 'method', title: 'Method', type: 'string', initialValue: 'Paynow' }),
    defineField({ name: 'email', title: 'Email', type: 'string' }),
    defineField({ name: 'phone', title: 'Phone', type: 'string' }),
    defineField({ name: 'reference', title: 'Reference', type: 'string' }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      initialValue: 'pending',
      options: {
        list: [
          { title: 'Pending', value: 'pending' },
          { title: 'Processing', value: 'processing' },
          { title: 'Paid', value: 'paid' },
          { title: 'Failed', value: 'failed' },
        ],
      },
    }),
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
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
});
