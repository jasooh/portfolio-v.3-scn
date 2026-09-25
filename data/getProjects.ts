// getProjects.ts
// gets the projects from the sanity database.

import { client } from "@/sanity/lib/client";
import { Project } from "@/lib/types/queryTypes";
import { projectsQuery } from "@/lib/queries/sanityQueries";

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
