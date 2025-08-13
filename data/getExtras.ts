// getExtras.ts
// gets extra details about the more section.

import { client } from "@/sanity/lib/client";
import { More } from "@/lib/types/queryTypes";
import { moreQuery } from "@/lib/queries/sanityQueries";

export async function getMoreSectionData(): Promise<More> {
    return client.fetch(moreQuery, {}, {
        next: { tags: ['more'] }
    })
}