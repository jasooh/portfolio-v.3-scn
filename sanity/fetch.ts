// fetch.ts
// gets the site's content from sanity. each getter tags its fetch so the
// /api/revalidate webhook can refresh just that content, and falls back
// rather than failing the render when sanity is unreachable.

import { client } from "@/sanity/lib/client";
import { experiencesQuery, moreQuery, projectsQuery, resumeQuery } from "@/sanity/queries";
import type { ExperiencesQueryResult, MoreQueryResult, ProjectsQueryResult } from "@/sanity/types";

export type Project = ProjectsQueryResult[number]
export type Experience = ExperiencesQueryResult[number]
export type More = NonNullable<MoreQueryResult>
export type Resume = { resumeUrl: string | null }

// --- PROJECTS ---

export async function getProjects(): Promise<Project[]> {
    try {
        return await client.fetch(projectsQuery, {}, {
            next: { tags: ['project'] }
        })
    } catch (err) {
        // don't fail the build over a sanity hiccup
        console.error('[getProjects] sanity fetch failed:', err)
        return []
    }
}

// --- EXPERIENCES ---

export async function getExperiences(): Promise<Experience[]> {
    try {
        return await client.fetch(experiencesQuery, {}, {
            next: { tags: ['experience'] }
        })
    } catch (err) {
        console.error('[getExperiences] sanity fetch failed:', err)
        return []
    }
}

// --- MORE ---

// used when sanity is unreachable or the doc doesn't exist yet.
const MORE_FALLBACK: More = {
    status: "available for projects",
    hackathons: 3,
    redbulls: "100+",
    valorantRank: "plat",
    headshotPercent: "28.6%",
    osuRank: "101k",
    currentObsession: "fpgas",
}

// groq returns null for unset fields; those shouldn't overwrite the fallbacks.
// (the generated types assume required fields are set, so this guards older docs.)
function defined<T extends object>(obj: T | null): Partial<T> {
    if (!obj) return {}
    return Object.fromEntries(
        Object.entries(obj).filter(([, v]) => v !== null && v !== undefined)
    ) as Partial<T>
}

export async function getMoreSectionData(): Promise<More> {
    try {
        const data = await client.fetch(moreQuery, {}, {
            next: { tags: ['more'] }
        })
        return { ...MORE_FALLBACK, ...defined(data) }
    } catch (err) {
        console.error('[getMoreSectionData] sanity fetch failed:', err)
        return MORE_FALLBACK
    }
}

// --- RESUME ---

export async function getResume(): Promise<Resume> {
    try {
        const data = await client.fetch(resumeQuery, {}, {
            next: { tags: ['resume'] }
        })
        return { resumeUrl: data?.resumeUrl ?? null }
    } catch (err) {
        console.error('[getResume] sanity fetch failed:', err)
        return { resumeUrl: null }
    }
}
