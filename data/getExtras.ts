// getExtras.ts
// gets extra details about the more section.

import { client } from "@/sanity/lib/client";
import { More } from "@/lib/types/queryTypes";
import { moreQuery } from "@/lib/queries/sanityQueries";

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
function defined<T extends object>(obj: T | null): Partial<T> {
    if (!obj) return {}
    return Object.fromEntries(
        Object.entries(obj).filter(([, v]) => v !== null && v !== undefined)
    ) as Partial<T>
}

export async function getMoreSectionData(): Promise<More> {
    try {
        const data: Partial<More> | null = await client.fetch(moreQuery, {}, {
            next: { tags: ['more'] }
        })
        return { ...MORE_FALLBACK, ...defined(data) }
    } catch (err) {
        console.error('[getMoreSectionData] sanity fetch failed:', err)
        return MORE_FALLBACK
    }
}
