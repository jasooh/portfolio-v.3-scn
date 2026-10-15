import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata, Viewport } from "next";
import { Hanken_Grotesk, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { siteUrl, siteName, siteTitle, siteDescription } from "@/lib/site";

// body copy
const hanken = Hanken_Grotesk({
    variable: "--font-hanken",
    subsets: ["latin"],
});

// display: the name and section titles
const instrument = Instrument_Serif({
    variable: "--font-instrument",
    subsets: ["latin"],
    weight: "400",
    style: ["normal", "italic"],
});

// annotations, labels, dates
const jetbrains = JetBrains_Mono({
    variable: "--font-jetbrains",
    subsets: ["latin"],
});

// browser chrome (mobile address bar, pwa title bar) matches the ink ground
export const viewport: Viewport = {
    themeColor: "#0c0d10",
    colorScheme: "dark",
};

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
        <body className={`${hanken.variable} ${instrument.variable} ${jetbrains.variable} antialiased dark`}>
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
