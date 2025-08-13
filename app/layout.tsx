import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
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

export const metadata: Metadata = {
    title: "Justin Abuyuan (v3)",
    description:
        "I'm Justin Abuyuan, an undergraduate Software Engineering student at the University of Waterloo. " +
        "I'm interested in software development and machine intelligence.",
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
