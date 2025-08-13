import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next"
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CaptchaProvider from "@/app/providers/CaptchaProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const baseUrl = new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.justin-abuyuan.xyz");

export const metadata: Metadata = {
    metadataBase: baseUrl, // lets you use relative image URLs below
    title: "Justin Abuyuan (v3)",
    description:
        "I'm Justin Abuyuan, an undergraduate Software Engineering student at the University of Waterloo. " +
        "I'm interested in software development and machine intelligence.",
    openGraph: {
        type: "website",
        url: baseUrl,
        siteName: "Justin Abuyuan",
        title: "Justin Abuyuan (v3)",
        description:
            "I'm Justin Abuyuan, an undergraduate Software Engineering student at the University of Waterloo. " +
            "I'm interested in software development and machine intelligence.",
        images: ["/opengraph-image"],
    },
    twitter: {
        card: "summary_large_image",
        title: "Justin Abuyuan (v3)",
        description:
            "I'm Justin Abuyuan, an undergraduate Software Engineering student at the University of Waterloo. " +
            "I'm interested in software development and machine intelligence.",
        images: ["/opengraph-image"],
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
            <CaptchaProvider>
                {children}
            </CaptchaProvider>
            <SpeedInsights />
            <Analytics />
        </body>
    </html>
);
}
