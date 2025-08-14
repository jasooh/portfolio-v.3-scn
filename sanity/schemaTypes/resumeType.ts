// resumeType.ts
// defines a resume type.

import { defineType, defineField } from "sanity";

export const resumeType = defineType({
    name: 'siteSettings',
    title: 'Site Settings',
    type: 'document',
    fields: [
        defineField({
            name: 'resume',
            title: 'Resume (PDF)',
            type: 'file',
            options: { accept: '.pdf' },
            description: 'Upload your most recent resume (PDF)',
            validation: (Rule) => Rule.required(),
        }),
    ],
})