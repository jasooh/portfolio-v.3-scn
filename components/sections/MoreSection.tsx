// MoreSection.tsx
// renders the more section of the home page.

import React from "react";
import TechMarquee from "@/components/TechMarquee";
import GitHubCalendar from "react-github-calendar";
import {getMoreSectionData} from "@/data/getExtras";
import MessageForm from "@/components/MessageForm";

export default async function MoreSection() {
    const moreData = await getMoreSectionData();

    return (
        <section
            id="more"
            aria-labelledby="more-title"
            aria-describedby="more-desc"
            className="scroll-mt-24 mt-24 sm:mt-32 lg:mt-40 mb-16 sm:mb-20"
        >
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
                <header className="mb-6 sm:mb-8">
                    <h2
                        id="more-title"
                        className="font-bold tracking-tight leading-tight text-[clamp(1.75rem,5vw,3rem)]"
                    >
                        more.
                    </h2>
                    <p id="more-desc" className="mt-2 text-sm sm:text-base text-gray-400">
                        github activity, tools i use, and what i’m up to now.
                    </p>
                </header>

                {/* grid content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {/* row 1, cols 1-2: tech marquee */}
                    <div
                        aria-label="Technologies I use"
                        className="min-w-0 overflow-hidden flex justify-center lg:col-span-2 h-full rounded-2xl border border-white/10 p-6 bg-card"
                    >
                        <div className="flex w-full mx-auto max-w-full sm:max-w-3xl lg:max-w-none overflow-hidden">
                            <TechMarquee />
                        </div>
                    </div>

                    {/* row 1, col 3: availability */}
                    <aside
                        aria-label="Availability and location"
                        className="min-w-0 overflow-hidden h-full rounded-2xl border border-white/10 bg-card p-6"
                    >
                        <div className="flex items-center justify-between gap-3 flex-wrap">
                            <div
                                role="status"
                                aria-live="polite"
                                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5"
                            >
                                <span className="relative flex h-2.5 w-2.5">
                                    <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 animate-ping motion-reduce:animate-none" />
                                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
                                </span>
                                <span className="text-sm font-medium leading-none">{moreData.status}</span>
                            </div>
                            <span className="text-xs sm:text-sm text-gray-400 leading-none">
                                Toronto · remote-friendly
                            </span>
                        </div>
                    </aside>

                    {/* row 2, cols 1-2: GitHub calendar */}
                    <div className="min-w-0 overflow-hidden lg:col-span-2 h-full rounded-2xl border border-white/10 p-6 bg-card">
                        <div
                            className="min-w-0 overflow-x-auto -mx-2 px-2"
                            aria-label="GitHub activity calendar"
                            tabIndex={0}
                        >
                            <GitHubCalendar hideColorLegend hideMonthLabels username="jasooh" />
                        </div>
                    </div>

                    {/* row 2, col 3: fun stats */}
                    <section
                        aria-labelledby="fun-stats-title"
                        className="min-w-0 overflow-hidden h-full rounded-2xl border border-white/10 p-6 bg-card"
                    >
                        <h3 id="fun-stats-title" className="text-lg font-semibold mb-4">
                            fun stats 🎯
                        </h3>

                        <dl className="grid grid-cols-3 gap-4 text-center">
                            <div>
                                <dd className="text-2xl font-semibold leading-tight">{moreData.hackathons || 3}</dd>
                                <dt className="text-xs text-gray-400">hackathons</dt>
                            </div>
                            <div>
                                <dd className="text-2xl font-semibold leading-tight">{moreData.redbulls || "100+"}</dd>
                                <dt className="text-xs text-gray-400">redbulls</dt>
                            </div>
                            <div>
                                <dd className="text-2xl font-semibold leading-tight">{moreData.valorantRank || "radiant"}</dd>
                                <dt className="text-xs text-gray-400">valorant rank</dt>
                            </div>
                        </dl>

                        <dl className="mt-4 grid grid-cols-3 gap-4 text-center">
                            <div>
                                <dd className="text-2xl font-semibold leading-tight">{moreData.currentObsession || "none :("}</dd>
                                <dt className="text-xs text-gray-400">current obsession</dt>
                            </div>
                            <div>
                                <dd className="text-2xl font-semibold leading-tight">{moreData.osuRank || 100 + "k"}</dd>
                                <dt className="text-xs text-gray-400">osu! rank</dt>
                            </div>
                            <div>
                                <dd className="text-2xl font-semibold leading-tight">{moreData.headshotPercent || 100 + "%"}</dd>
                                <dt className="text-xs text-gray-400">headshot %</dt>
                            </div>
                        </dl>
                    </section>
                </div>

                {/* form */}
                <MessageForm />
            </div>
        </section>
    );
}
