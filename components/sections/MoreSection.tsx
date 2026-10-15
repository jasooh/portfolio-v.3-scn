// MoreSection.tsx
// renders the more section of the home page.

import React from "react";
import TechMarquee from "@/components/TechMarquee";
import GitHubCalendar from "react-github-calendar";
import {getMoreSectionData} from "@/sanity/fetch";
import MessageForm from "@/components/MessageForm";
import CaptchaProvider from "@/app/providers/CaptchaProvider";
import Reveal from "@/components/Reveal";
import SectionHeader from "@/components/SectionHeader";
import type { More } from "@/sanity/fetch";

const STATS: { key: Exclude<keyof More, "status">; label: string }[] = [
    { key: "hackathons", label: "hackathons" },
    { key: "redbulls", label: "redbulls" },
    { key: "valorantRank", label: "valorant" },
    { key: "currentObsession", label: "obsessed w/" },
    { key: "osuRank", label: "osu! rank" },
    { key: "headshotPercent", label: "headshot %" },
];

export default async function MoreSection() {
    const moreData = await getMoreSectionData();

    return (
        <section
            id="more"
            aria-labelledby="more-title"
            aria-describedby="more-desc"
            className="mt-24 sm:mt-32 lg:mt-40 mb-16 sm:mb-20"
        >
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
                <SectionHeader
                    index="03"
                    id="more"
                    title="more"
                    description="github activity, tools i use, and what i’m up to now."
                />

                {/* revealed as one unit: the children rely on lg:col-span-2 and
                    h-full, which a per-tile wrapper would break. tiles are
                    .drafted, so clipping happens on an inner wrapper. */}
                <Reveal>
                <div className="mt-10 sm:mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {/* row 1, cols 1-2: tech marquee */}
                    <div aria-label="Technologies I use" className="drafted drafted-hover min-w-0 lg:col-span-2 h-full">
                        <div className="flex h-full flex-col gap-5 overflow-hidden p-6">
                            <span className="label">stack / tools</span>
                            <div className="flex w-full overflow-hidden">
                                <TechMarquee />
                            </div>
                        </div>
                    </div>

                    {/* row 1, col 3: availability */}
                    <aside aria-label="Availability and location" className="drafted drafted-hover min-w-0 h-full">
                        <div className="flex h-full flex-col justify-between gap-6 overflow-hidden p-6">
                            <span className="label">status</span>
                            <div className="flex flex-col gap-2">
                                <div role="status" aria-live="polite" className="inline-flex items-center gap-2.5">
                                    <span className="relative flex size-2">
                                        <span className="absolute inline-flex size-full bg-primary opacity-75 animate-ping motion-reduce:animate-none" />
                                        <span className="relative inline-flex size-2 bg-primary" />
                                    </span>
                                    <span className="font-display text-2xl leading-none">{moreData.status}</span>
                                </div>
                                <span className="label">toronto · remote-friendly</span>
                            </div>
                        </div>
                    </aside>

                    {/* row 2, cols 1-2: GitHub calendar */}
                    <div className="drafted drafted-hover min-w-0 lg:col-span-2 h-full">
                        <div className="flex h-full flex-col gap-5 overflow-hidden p-6">
                            <span className="label">commits / last 12 months</span>
                            <div
                                className="min-w-0 overflow-x-auto -mx-2 px-2 font-mono text-xs"
                                aria-label="GitHub activity calendar"
                                tabIndex={0}
                            >
                                <GitHubCalendar
                                    hideColorLegend
                                    hideMonthLabels
                                    username="jasooh"
                                    blockRadius={0}
                                    blockMargin={3}
                                    colorScheme="dark"
                                    theme={{ dark: ["#16181e", "#3b3168", "#5f4cb3", "#8670e6", "#b7a5ff"] }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* row 2, col 3: fun stats, as a table of measurements */}
                    <section aria-labelledby="fun-stats-title" className="drafted drafted-hover min-w-0 h-full">
                        <div className="h-full overflow-hidden p-6">
                            <h3 id="fun-stats-title" className="label mb-5">fun stats</h3>

                            <dl className="grid grid-cols-3 gap-x-4 gap-y-5">
                                {STATS.map(({ key, label }) => (
                                    <div key={key} className="flex flex-col-reverse gap-1 border-t border-border pt-2">
                                        <dt className="label !text-[10px]">{label}</dt>
                                        <dd className="font-display text-[1.75rem] leading-none truncate">{moreData[key]}</dd>
                                    </div>
                                ))}
                            </dl>
                        </div>
                    </section>
                </div>
                </Reveal>

                {/* captcha provider is scoped here so google's script isn't
                    pulled into every route */}
                <Reveal>
                    <CaptchaProvider>
                        <MessageForm />
                    </CaptchaProvider>
                </Reveal>
            </div>
        </section>
    );
}
