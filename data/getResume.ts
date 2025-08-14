// getResume.ts
// gets the resume from sanity.

import { Resume } from "@/lib/types/queryTypes";
import { client } from "@/sanity/lib/client";
import { resumeQuery } from "@/lib/queries/sanityQueries";

export async function getResume(): Promise<Resume> {
    return client.fetch(resumeQuery, {}, {
        next: { tags: ['resume'] }
    })
}