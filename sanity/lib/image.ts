import createImageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import type { SanityImageCrop, SanityImageHotspot } from '../types'

import { dataset, projectId } from '../env'

// https://www.sanity.io/docs/image-url
const builder = createImageUrlBuilder({ projectId, dataset })

export const urlFor = (source: SanityImageSource) => {
  return builder.image(source)
}

// the image shape our queries project: enough for urlFor to size and crop it,
// plus the lqip blur placeholder.
export type SanityImage = {
  asset: { _id: string; metadata?: { lqip?: string | null } | null } | null
  crop?: SanityImageCrop | null
  hotspot?: SanityImageHotspot | null
  alt?: string | null
}

export function hasAsset<T extends SanityImage>(
  image: T | null | undefined
): image is T & { asset: NonNullable<T['asset']> } {
  return !!image?.asset?._id
}
