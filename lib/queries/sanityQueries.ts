// sanityQueries.ts
// defines all the queries submitted to sanity.

import { groq } from  'next-sanity';

export const projectsQuery = groq`
*[_type == "project"] | order(year desc, title asc) {
  _id,
  title,
  year,
  "imageUrl": image.asset->url,
  "alt": image.alt,
  badges,
  description,
  githubUrl
}
`

export const experiencesQuery = groq`
*[_type == "experience"]
| order(coalesce(endDate, now()) desc, startDate desc, order asc) {
  _id,
  title,
  startDate,
  endDate,
  "images": images[0...3]{
    "url": asset->url,
    "alt": coalesce(alt, "")
  },
  description
}
`

