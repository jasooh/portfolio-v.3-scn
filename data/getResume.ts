// getResume.ts
// gets the resume from sanity.

import { Resume } from "@/lib/types/queryTypes";
import { client } from "@/sanity/lib/client";
import { resumeQuery } from "@/lib/queries/sanityQueries";

export async function getResume(): Promise<Resume> {
    try {
        const data: Resume | null = await client.fetch(resumeQuery, {}, {
            next: { tags: ['resume'] }
        })
        return { resumeUrl: data?.resumeUrl ?? null }
    } catch (err) {
        console.error('[getResume] sanity fetch failed:', err)
        return { resumeUrl: null }
    }
}
