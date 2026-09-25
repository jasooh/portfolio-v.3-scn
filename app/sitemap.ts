// sitemap.ts
// generates /sitemap.xml. single page site, so there is one entry.

import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: new URL("/", siteUrl).toString(),
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 1,
        },
    ];
}
