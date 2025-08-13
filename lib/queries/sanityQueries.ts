// sanityQueries.ts
// defines all the queries submitted to sanity.

import { groq } from  'next-sanity';

export const projectsQuery = groq`
*[_type == "Project"] | order(year desc, title asc) {
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

