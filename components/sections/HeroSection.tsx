// HeroSection.tsx
// the website hero, laid out like the title area of a drawing sheet.

import React from "react";
import TypedText from "@/components/TypedText";
import {HERO_TEXT} from "@/lib/constants";
import SocialLinks from "@/components/SocialLinks";
import Reveal from "@/components/Reveal";
import Rule from "@/components/Rule";
import {getMoreSectionData} from "@/data/getExtras";

// a dimension line: end ticks, a rule either side, the measurement in the middle
function Dimension({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex items-center gap-3">
            <span aria-hidden="true" className="h-3 w-px bg-rule" />
            <Rule on="load" delay={0.45} className="flex-1" />
            <span className="label whitespace-nowrap text-foreground/80">{children}</span>
            <Rule on="load" delay={0.45} className="flex-1" />
            <span aria-hidden="true" className="h-3 w-px bg-rule" />
        </div>
    );
}

export default async function HeroSection() {
    const { status } = await getMoreSectionData();

    return (
        <section
            id="home"
            aria-label="Introduction"
            className="relative flex min-h-[100svh] flex-col px-4 sm:px-6"
        >
            <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center gap-10 py-24">
                {/* sheet annotations */}
                <Reveal on="load" delay={0} y={0} blur={0}>
                    <div className="flex items-center justify-between gap-4">
                        <span className="label">sheet 00 — index</span>
                        <span className="label hidden sm:inline">43.4723° n, 80.5449° w</span>
                    </div>
                </Reveal>

                <header className="flex flex-col gap-8">
                    <Reveal on="load" delay={0.05}>
                        <p
                            role="status"
                            className="label inline-flex items-center gap-2.5 border border-border bg-card/60 px-3 py-1.5 text-foreground backdrop-blur-sm"
                        >
                            <span className="relative flex size-2">
                                <span className="absolute inline-flex size-full bg-primary opacity-75 animate-ping motion-reduce:animate-none" />
                                <span className="relative inline-flex size-2 bg-primary" />
                            </span>
                            {status}
                        </p>
                    </Reveal>

                    <div>
                        <Reveal on="load" delay={0.1}>
                            <p className="label mb-2">hey, i&apos;m</p>
                        </Reveal>
                        {/* each line rises on its own beat */}
                        <h1 className="font-display italic leading-[0.86] tracking-[-0.02em] text-[clamp(4rem,15vw,11rem)]">
                            <Reveal on="load" delay={0.16} y={40}>
                                <span className="block">justin</span>
                            </Reveal>
                            <Reveal on="load" delay={0.26} y={40}>
                                <span className="block pl-[0.6em]">
                                    abuyuan<span className="not-italic text-primary">.</span>
                                </span>
                            </Reveal>
                        </h1>
                    </div>

                    <Reveal on="load" delay={0.4} y={0} blur={0}>
                        <Dimension>
                            <h2>software engineering @ uwaterloo</h2>
                        </Dimension>
                    </Reveal>

                    <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
                        <Reveal on="load" delay={0.5}>
                            <div
                                className="flex max-w-md items-start gap-2 font-mono text-sm text-muted-foreground"
                                aria-live="polite"
                            >
                                <span aria-hidden="true" className="text-primary">&gt;</span>
                                <TypedText words={HERO_TEXT} />
                            </div>
                        </Reveal>

                        <Reveal on="load" delay={0.58}>
                            <SocialLinks />
                        </Reveal>
                    </div>
                </header>
            </div>

            {/* scroll cue: a plumb line */}
            <Reveal
                on="load"
                delay={0.8}
                className="pointer-events-none absolute inset-x-0 bottom-6 flex flex-col items-center gap-2"
            >
                <span className="label">scroll</span>
                <span
                    aria-hidden="true"
                    className="h-10 w-px origin-top bg-linear-to-b from-primary to-transparent animate-pulse motion-reduce:animate-none"
                />
            </Reveal>
        </section>
    );
}
