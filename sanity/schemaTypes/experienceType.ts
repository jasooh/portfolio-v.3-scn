// experienceType.ts
// defines an experience type document.

import {defineType, defineField} from 'sanity'

export const experienceType = defineType({
    name: 'experience',
    title: 'Experience',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Company',
            description: 'Organisation name, e.g. "Carta"',
            type: 'string',
            validation: (Rule) => Rule.required().min(2).max(200),
        }),
        defineField({
            name: 'role',
            title: 'Role',
            description: 'Your job title, e.g. "Software Engineer Intern". Optional — the entry falls back to showing just the company if this is empty.',
            type: 'string',
            validation: (Rule) => Rule.max(200),
        }),
        defineField({
            name: 'startDate',
            title: 'Start date',
            type: 'date',
            options: {dateFormat: 'YYYY-MM-DD'},
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'endDate',
            title: 'End date (leave empty if present)',
            type: 'date',
            options: {dateFormat: 'YYYY-MM-DD'},
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'array',
            of: [{type: 'block'}],
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'images',
            title: 'Images (max 3, 3:2 preferred)',
            type: 'array',
            of: [
                defineField({
                    name: 'image',
                    type: 'image',
                    options: {hotspot: true},
                    fields: [
                        defineField({
                            name: 'alt',
                            title: 'Alt text',
                            type: 'string',
                            description: 'Describe the image for accessibility',
                            validation: (Rule) => Rule.required().min(5).max(160),
                        }),
                    ],
                }),
            ],
            validation: (Rule) => Rule.max(3),
        }),
        defineField({
            name: 'order',
            title: 'Manual order (lower appears first)',
            type: 'number',
        }),
    ],
})