// queryTypes.ts
// defines the types of data returned by the sanity queries.

export type Project = {
    _id: string
    title: string
    year: number
    imageUrl?: string
    alt?: string
    badges: string[]
    description: string
    githubUrl: string | null
}