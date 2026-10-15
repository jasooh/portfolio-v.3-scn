// SanityImage.tsx
// next/image for sanity assets: each srcset width is requested from the sanity
// cdn at that size (instead of fetching the full original), with the lqip as
// the blur placeholder.

"use client";

import React from "react";
import Image, { type ImageProps } from "next/image";
import { urlFor, type SanityImage as Source } from "@/sanity/lib/image";

type Props = Omit<ImageProps, "src" | "loader" | "placeholder" | "blurDataURL"> & {
    image: Source & { asset: NonNullable<Source["asset"]> };
    /** width / height. crops around the hotspot; leave it out to keep the image's own shape */
    aspect?: number;
};

export default function SanityImage({ image, aspect, alt, ...props }: Props) {
    const lqip = image.asset.metadata?.lqip ?? undefined;

    return (
        <Image
            {...props}
            alt={alt}
            src={urlFor(image).url()}
            loader={({ width, quality }) => {
                let url = urlFor(image).width(width).quality(quality ?? 75).auto("format");
                if (aspect) url = url.height(Math.round(width / aspect)).fit("crop");
                return url.url();
            }}
            placeholder={lqip ? "blur" : "empty"}
            blurDataURL={lqip}
        />
    );
}
