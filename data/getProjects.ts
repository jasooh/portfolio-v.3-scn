// getProjects.ts
// gets the projects from the sanity database.

import { client } from "@/sanity/lib/client";
import { Project } from "@/lib/types/queryTypes";
import { projectsQuery } from "@/lib/queries/sanityQueries";

export async function getProjects(): Promise<Project[]> {
    return client.fetch(projectsQuery)
}