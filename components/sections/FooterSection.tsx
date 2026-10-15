// FooterSection.tsx
// renders the footer section of the home page, as the title block of the sheet.

import React from "react";
import SocialLinks from "@/components/SocialLinks";
import { contactEmail } from "@/lib/site";
import Reveal from "@/components/Reveal";

// one cell of the title block: a small caption over its value
function Cell({ caption, children, className = "" }: { caption: string; children: React.ReactNode; className?: string }) {
    return (
        <div className={`flex flex-col gap-2 border-border p-4 sm:p-5 ${className}`}>
            <span className="label !text-[10px]">{caption}</span>
            <div className="text-sm text-foreground/90">{children}</div>
        </div>
    );
}

export default function FooterSection() {
    const year = new Date().getFullYear();

    return (
        <footer className="w-full border-t border-border bg-card/70 backdrop-blur-sm">
            {/* bottom padding clears the floating dock */}
            <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-14 pb-28 sm:pb-32">
                <Reveal>
                <div className="flex flex-col gap-10 sm:flex-row sm:items-end sm:justify-between">
                    <div className="flex flex-col gap-5">
                        <p className="font-display italic leading-[0.9] text-[clamp(2.75rem,8vw,4.5rem)]">
                            let&apos;s build<br />something<span className="not-italic text-primary">.</span>
                        </p>
                        {/* fallback for when recaptcha is blocked and the form won't send */}
                        <a
                            href={`mailto:${contactEmail}`}
                            className="w-fit font-mono text-sm text-muted-foreground underline decoration-rule underline-offset-4 transition-colors hover:text-primary hover:decoration-primary"
                        >
                            {contactEmail}
                        </a>
                    </div>
                    <SocialLinks />
                </div>

                {/* title block */}
                <div className="drafted mt-12 grid grid-cols-2 sm:grid-cols-4 !bg-transparent">
                    <Cell caption="drawn by" className="border-b sm:border-b-0 border-r">justin abuyuan</Cell>
                    <Cell caption="title" className="border-b sm:border-b-0 sm:border-r">software engineer &amp; perpetual tinkerer</Cell>
                    <Cell caption="built with" className="border-r">next.js · typescript · vercel</Cell>
                    <Cell caption="rev. / sheet">
                        <span className="font-mono">{year}</span>
                        <span className="text-muted-foreground"> · 04 of 04</span>
                    </Cell>
                </div>

                <p className="label mt-4 !text-[10px]">© {year} justin abuyuan. all rights reserved.</p>
                </Reveal>
            </div>
        </footer>
    );
}
