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
    extraDetails: PortableTextBlock[]
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
    startDate: string
    endDate?: string | null
    images: ExperienceImage[]
    description: PortableTextBlock[]
}

// --- MORE ---

export type More = {
    status: "available for projects" | "open to work" | "studying" | "on break";
    hackathons: number;
    redbulls: string;
    valorantRank: string;
    headshotPercent: string;
    osuRank: string;
    currentObsession: string;
};