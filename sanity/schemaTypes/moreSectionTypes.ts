// moreSectionTypes.ts
// defines the fun stats.

import { defineType, defineField } from 'sanity'

export const moreSectionTypes = defineType({
    name: 'more',
    title: 'More / Stats',
    type: 'document',
    fields: [
        defineField({
            name: 'status',
            title: 'Status',
            type: 'string',
            options: {
                list: [
                    { title: 'available for projects', value: 'available for projects' },
                    { title: 'open to work', value: 'open to work' },
                    { title: 'studying', value: 'studying' },
                    { title: 'on break', value: 'on break' },
                ],
                layout: 'dropdown',
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'hackathons',
            title: 'Hackathons',
            type: 'number',
            description: 'Whole number',
            initialValue: 0,
            validation: (Rule) => Rule.required().integer().min(0),
        }),
        defineField({
            name: 'redbulls',
            title: 'Red Bulls',
            type: 'string',
            description: 'String',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'valorantRank',
            title: 'Valorant Rank',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'headshotPercent',
            title: 'Headshot Percentage',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'osuRank',
            title: 'osu! Rank',
            type: 'string',
            description: 'Global rank (string)',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'currentObsession',
            title: 'Current Obsession',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
    ],
    preview: {
        select: { title: 'status', hackathons: 'hackathons', redbulls: 'redbulls' },
        prepare({ title, hackathons, redbulls }) {
            return {
                title: 'More / Stats',
                subtitle: `${title ?? 'status'} • hackathons: ${hackathons ?? 0} • red bulls: ${redbulls ?? 0}`,
            }
        },
    },
})