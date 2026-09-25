import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { siteUrl, siteName, siteTitle, siteDescription } from "@/lib/site";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    // makes the relative og/twitter image urls resolve to absolute ones
    metadataBase: new URL(siteUrl),
    title: {
        default: siteTitle,
        template: `%s — ${siteName}`,
    },
    description: siteDescription,
    applicationName: siteName,
    authors: [{ name: siteName, url: siteUrl }],
    creator: siteName,
    keywords: [
        "Justin Abuyuan",
        "software engineer",
        "University of Waterloo",
        "software engineering",
        "portfolio",
    ],
    alternates: {
        canonical: "/",
    },
    openGraph: {
        type: "website",
        siteName,
        title: siteTitle,
        description: siteDescription,
        url: siteUrl,
        locale: "en_CA",
    },
    twitter: {
        card: "summary_large_image",
        title: siteTitle,
        description: siteDescription,
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
        },
    },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
return (
    <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased dark`}>
            {/* entrance animations render at opacity:0 in the server html, so
                without js nothing would ever reveal them */}
            <noscript>
                <style>{`[data-reveal]{opacity:1!important;transform:none!important;filter:none!important}`}</style>
            </noscript>
            {children}
            <SpeedInsights />
            <Analytics />
        </body>
    </html>
);
}
