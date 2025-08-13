// queryTypes.ts
// defines the types of data returned by the sanity queries.

import type { PortableTextBlock } from '@portabletext/types'

// --- PROJECTS ---

export type Project = {
    _id: string
    title: string
    year: number
    imageUrl?: string
    alt?: string
    badges: string[]
    description: PortableTextBlock[]
    githubUrl: string | null
    websiteUrl: string | null
}

// --- EXPERIENCES ---

export type ExperienceImage = {
    url: string
    alt: string
}

export type Experience = {
    _id: string
    title: string
    startDate: string                // ISO date, e.g. "2025-05-01"
    endDate?: string | null          // null/undefined => "present"
    images: ExperienceImage[]        // up to 3 (per query)
    description: PortableTextBlock[] // rich text blocks
}