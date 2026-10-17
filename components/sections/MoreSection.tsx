// MoreSection.tsx
// renders the more section of the home page.

import React from "react";
import TechMarquee from "@/components/TechMarquee";
import ContributionChart from "@/components/ContributionChart";
import { GITHUB_USER, getContributions } from "@/lib/github";
import {getMoreSectionData} from "@/sanity/fetch";
import MessageForm from "@/components/MessageForm";
import CaptchaProvider from "@/app/providers/CaptchaProvider";
import Reveal from "@/components/Reveal";
import SectionHeader from "@/components/SectionHeader";
import PartsList from "@/components/PartsList";
import { buildFunStats } from "@/lib/funStats";
import { getSpotify } from "@/lib/spotify";
import SpotifyTile from "@/components/SpotifyTile";

export default async function MoreSection() {
    const [moreData, github, spotify] = await Promise.all([
        getMoreSectionData(),
        getContributions(),
        getSpotify(),
    ]);

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

                    {/* row 2, cols 1-2: github activity, plotted weekly */}
                    <section aria-labelledby="github-title" className="drafted drafted-hover min-w-0 lg:col-span-2 h-full">
                        <div className="flex h-full flex-col gap-6 overflow-hidden p-6">
                            <div className="flex items-baseline justify-between gap-4">
                                <h3 id="github-title" className="label">commits / last 12 months</h3>
                                <a
                                    href={`https://github.com/${GITHUB_USER}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="label transition-colors hover:text-primary"
                                >
                                    @{GITHUB_USER} ↗
                                </a>
                            </div>

                            {github ? (
                                <>
                                    <dl className="grid grid-cols-2 gap-x-4 gap-y-4 sm:grid-cols-4">
                                        {[
                                            ["contributions", github.total],
                                            ["best week", github.bestWeek],
                                            ["longest streak", `${github.longestStreak}d`],
                                            ["current streak", `${github.currentStreak}d`],
                                        ].map(([label, value]) => (
                                            <div key={label} className="flex flex-col-reverse gap-1 border-t border-border pt-2">
                                                <dt className="label !text-[10px]">{label}</dt>
                                                <dd className="font-display text-[1.75rem] leading-none">{value}</dd>
                                            </div>
                                        ))}
                                    </dl>
                                    <ContributionChart weeks={github.weeks} />
                                </>
                            ) : (
                                <p className="text-sm text-muted-foreground">
                                    activity is unavailable right now. it&apos;s all on{" "}
                                    <a
                                        href={`https://github.com/${GITHUB_USER}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="underline underline-offset-4 hover:text-primary"
                                    >
                                        github
                                    </a>
                                    .
                                </p>
                            )}
                        </div>
                    </section>

                    {/* row 2, col 3: fun stats, as a drawing's bill of materials */}
                    <section aria-labelledby="fun-stats-title" className="drafted drafted-hover min-w-0 h-full">
                        <div className="h-full overflow-hidden p-6">
                            <PartsList
                                rev={new Date().getFullYear()}
                                rows={buildFunStats(moreData)}
                            />
                        </div>
                    </section>

                    {/* row 3, full width: spotify, only once it's configured */}
                    {spotify && <SpotifyTile now={spotify} />}
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
