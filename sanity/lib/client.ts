import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // off: the cdn can still serve stale docs after revalidateTag fires
  useCdn: false,
  perspective: 'published'
})
