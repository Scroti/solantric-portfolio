import { defineType, defineField } from 'sanity'

export const projectType = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: (r) => r.required() }),
    defineField({ name: 'descRo', title: 'Description (RO)', type: 'text', rows: 2 }),
    defineField({ name: 'descEn', title: 'Description (EN)', type: 'text', rows: 2 }),
    defineField({ name: 'tags', title: 'Tech tags', type: 'array', of: [{ type: 'string' }], options: { layout: 'tags' } }),
    defineField({ name: 'link', title: 'Link', type: 'url' }),
    defineField({ name: 'accent', title: 'Accent color (hex)', type: 'string', initialValue: '#22c55e' }),
    defineField({ name: 'image', title: 'Preview image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'featured', title: 'Featured', type: 'boolean', initialValue: false }),
    defineField({ name: 'order', title: 'Sort order', type: 'number', initialValue: 0 }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'descEn', media: 'image' },
  },
})
