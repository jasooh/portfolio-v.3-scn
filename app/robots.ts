// robots.ts
// generates /robots.txt.

import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
            // authoring ui, nothing worth indexing
            disallow: "/studio",
        },
        sitemap: new URL("/sitemap.xml", siteUrl).toString(),
    };
}
