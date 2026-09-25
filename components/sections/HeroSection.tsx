// HeroSection.tsx
// the website hero.

import {FaArrowDownLong} from "react-icons/fa6";
import React from "react";
import TypedText from "@/components/TypedText";
import {HERO_TEXT} from "@/lib/constants";
import SocialLinks from "@/components/SocialLinks";
import Reveal from "@/components/Reveal";

export default function HeroSection() {
    return (
        <section
            id="home"
            aria-label="Introduction"
            className="relative flex items-center justify-center min-h-[100svh] px-4 sm:px-6"
        >
            <div className="mx-auto flex max-w-3xl flex-col items-center gap-8 sm:gap-10 text-center">
                {/* staggered once the loading overlay clears */}
                <header>
                    <Reveal on="load" delay={0}>
                        <p className="text-sm sm:text-base text-gray-400">hey, i&apos;m</p>
                    </Reveal>

                    <Reveal on="load" delay={0.08}>
                        <h1 className="relative font-extrabold tracking-tight leading-[1.1] text-[clamp(2.25rem,8vw,4.75rem)]">
                            {/* decorative glow layer, hidden from AT for screenreaders */}
                            <span
                                aria-hidden="true"
                                className="pointer-events-none absolute inset-0 select-none blur-sm opacity-40"
                            >
                                justin abuyuan.
                            </span>
                            <span className="relative z-10">justin abuyuan.</span>
                        </h1>
                    </Reveal>

                    <Reveal on="load" delay={0.16}>
                        <h2 className="mt-2 text-base sm:text-lg text-gray-300">
                            software engineering @ uwaterloo
                        </h2>
                    </Reveal>

                    <Reveal on="load" delay={0.24}>
                        <div className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-400" aria-live="polite">
                            <TypedText className="text-gray-400" words={HERO_TEXT}/>
                        </div>
                    </Reveal>
                </header>

                {/* social links */}
                <Reveal on="load" delay={0.32}>
                    <SocialLinks />
                </Reveal>
            </div>

            {/* scroll cue */}
            <Reveal on="load" delay={0.5} className="pointer-events-none absolute bottom-4 sm:bottom-8 flex w-full justify-center">
                <FaArrowDownLong
                    aria-hidden="true"
                    className="size-5 sm:size-6 opacity-50 animate-bounce motion-reduce:animate-none"
                />
            </Reveal>
        </section>
    );
}
