// projectType.ts
// defines a project type document.

import { defineType, defineField } from "sanity";

export const projectType = defineType({
    name: 'project',
    title: 'Project',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule) => Rule.required().min(2).max(120)
        }),
        defineField({
            name: 'year',
            title: 'Year',
            type: 'number',
            description: 'Year the project was built or worked on',
            validation: (Rule) =>
                Rule.required()
                    .integer()
                    .min(2000)
                    .max(new Date().getFullYear() + 1),
        }),
        defineField({
            name: 'image',
            title: 'Card Image (3:2)',
            type: 'image',
            options: {hotspot: true},
            validation: (Rule) => Rule.required(),
            fields: [
                defineField({
                    name: 'alt',
                    title: 'Alt text',
                    type: 'string',
                    description: 'Briefly describe the image for accessibility',
                    validation: (Rule) => Rule.required().min(5).max(160),
                }),
            ],
        }),
        defineField({
            name: 'badges',
            title: 'Technologies',
            type: 'array',
            of: [{type: 'string'}],
            options: {layout: 'tags'}, // nice tag UI in Studio
            validation: (Rule) => Rule.min(0).unique(),
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'array',
            of: [{type: 'block'}],
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'githubUrl',
            title: 'GitHub URL',
            type: 'url',
            description: 'Optional: link to the GitHub repo for this post/project',
            validation: (rule) => rule.uri({
                scheme: ['http', 'https'],
            }),
        }),
    ]
})