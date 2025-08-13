import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "placehold.co",
            },
            {
                protocol: "https",
                hostname: "cdn.sanity.io",
                pathname: "/images/**", // optional but good for scoping
            }
        ]
    }
};

export default nextConfig;
