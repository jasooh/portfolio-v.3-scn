// getExperiences.ts
// gets the experiences from the sanity database.

import { client } from "@/sanity/lib/client";
import { Experience } from "@/lib/types/queryTypes";
import { experiencesQuery } from "@/lib/queries/sanityQueries";

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
