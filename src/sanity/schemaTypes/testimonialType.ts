import { defineType, defineField } from 'sanity'

export const testimonialType = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Client name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'roleRo', title: 'Role (RO)', type: 'string' }),
    defineField({ name: 'roleEn', title: 'Role (EN)', type: 'string' }),
    defineField({ name: 'quoteRo', title: 'Quote (RO)', type: 'text', rows: 3 }),
    defineField({ name: 'quoteEn', title: 'Quote (EN)', type: 'text', rows: 3 }),
    defineField({ name: 'published', title: 'Published', type: 'boolean', initialValue: true }),
    defineField({ name: 'order', title: 'Sort order', type: 'number', initialValue: 0 }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'roleEn' },
  },
})
