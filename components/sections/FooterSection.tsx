// FooterSection.tsx
// renders the footer section of the home page.

import React from "react";
import SocialLinks from "@/components/SocialLinks";
import { contactEmail } from "@/lib/site";
import Reveal from "@/components/Reveal";

export default function FooterSection() {
    const year = new Date().getFullYear();

    return (
        <footer className="w-full bg-card">
            {/* bottom padding clears the floating dock */}
            <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-10 pb-28 sm:pb-32">
                <Reveal>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-end">
                    {/* left: brand + tagline + social */}
                    <div className="flex flex-col gap-4">
                        <div>
                            <h3 className="relative font-bold text-2xl sm:text-3xl leading-[1.2] tracking-wide">
                                {/* decorative glow */}
                                <span aria-hidden="true" className="absolute inset-0 blur-xl">
                                    justin abuyuan
                                </span>
                                <span className="relative z-10 text-gray-200">justin abuyuan</span>
                            </h3>
                            <p className="italic text-gray-400">
                                software engineer and perpetual tinkerer
                            </p>
                            {/* fallback for when recaptcha is blocked and the form won't send */}
                            <a
                                href={`mailto:${contactEmail}`}
                                className="mt-1 inline-block text-sm text-gray-400 underline underline-offset-4 hover:text-primary duration-150"
                            >
                                {contactEmail}
                            </a>
                        </div>

                        {/* social links */}
                        <SocialLinks />
                    </div>

                    {/* right: credits */}
                    <div className="flex flex-col sm:items-end">
                        <p className="italic text-gray-500 text-sm text-left sm:text-right">
                            Built with ❤ using Next.js and TypeScript, and deployed using Vercel.
                            <br />
                            © {year} Justin Abuyuan. All rights reserved.
                        </p>
                    </div>
                </div>
                </Reveal>
            </div>
        </footer>
    );
}
