// site.ts
// site identity, shared by the metadata, og image, robots.txt and sitemap.

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.justin-abuyuan.xyz")
    .replace(/\/$/, "");

export const siteName = "Justin Abuyuan";

export const siteTitle = "Justin Abuyuan — Software Engineering @ Waterloo";

export const siteDescription =
    "Justin Abuyuan is an undergraduate Software Engineering student at the University of " +
    "Waterloo, interested in software development and machine intelligence.";

// public: rendered as a mailto in the footer.
export const contactEmail = "abuyuanjustin@gmail.com";
