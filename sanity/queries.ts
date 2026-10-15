// queries.ts
// defines all the queries submitted to sanity.
// `npm run typegen` reads these and writes their result types to sanity/types.ts.

import { defineQuery } from 'next-sanity'

// images come back as the asset id plus crop/hotspot rather than a raw url,
// so urlFor can request a sized, cropped version. lqip is the blur placeholder.

export const projectsQuery = defineQuery(`
*[_type == "project"] | order(year desc, title asc) {
    _id,
    title,
    year,
    image{
        alt,
        crop,
        hotspot,
        asset->{ _id, metadata{ lqip } }
    },
    badges,
    description,
    githubUrl,
    websiteUrl,
    extraDetails[]{
        ...,
        _type == "image" => {
            asset->{ _id, metadata{ lqip } }
        }
    }
}
`)

export const experiencesQuery = defineQuery(`
*[_type == "experience"] | order(coalesce(endDate, now()) desc, startDate desc, order asc) {
    _id,
    title,
    role,
    startDate,
    endDate,
    "images": images[0...3]{
        "alt": coalesce(alt, ""),
        crop,
        hotspot,
        asset->{ _id, metadata{ lqip } }
    },
    description
}
`)

export const moreQuery = defineQuery(`
*[_type == "more"][0]{
    status,
    hackathons,
    redbulls,
    valorantRank,
    headshotPercent,
    osuRank,
    currentObsession
}
`)

export const resumeQuery = defineQuery(`
*[_type == "siteSettings"][0]{
    "resumeUrl": resume.asset->url
}
`)
