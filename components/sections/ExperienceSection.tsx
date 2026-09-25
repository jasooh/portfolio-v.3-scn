// ExperienceSection.tsx
// renders the experience section of the home page.

import React from "react";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import TimelineEntry from "@/components/TimelineEntry";
import Reveal from "@/components/Reveal";
import { getExperiences } from "@/data/getExperiences";
import { getResume } from "@/data/getResume";

function fmt(date?: string | null) {
    if (!date) return "present"
    return new Date(date).toLocaleString("en-US", { month: "short", year: "numeric" }).toLowerCase()
}

// the newest entry isn't necessarily current, so check the end date.
function isOngoing(endDate?: string | null) {
    if (!endDate) return true
    return new Date(endDate).getTime() > Date.now()
}

export default async function ExperienceSection() {
    const [exps, resume] = await Promise.all([getExperiences(), getResume()]);

    return (
        <section
            id="experience"
            aria-labelledby="experience-title"
            aria-describedby="experience-desc"
            className="scroll-mt-24 mt-24 sm:mt-32 lg:mt-40"
        >
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
                <Reveal>
                <header className="flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <h2
                            id="experience-title"
                            className="font-bold tracking-tight leading-tight text-[clamp(1.75rem,5vw,3rem)]"
                        >
                            experience.
                        </h2>
                        <p
                            id="experience-desc"
                            className="mt-2 max-w-prose text-sm sm:text-base text-muted-foreground"
                        >
                            a collection of the teams i&apos;ve built with, the systems i&apos;ve
                            worked on, and the lessons i&apos;ve carried forward.
                        </p>
                    </div>

                    {resume.resumeUrl && (
                        <Button
                            asChild
                            variant="fill"
                            size="lg"
                            className="group w-full justify-center sm:w-auto focus-visible:ring-primary"
                            title="Open résumé (PDF)"
                        >
                            <Link
                                href={resume.resumeUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Open résumé (PDF, opens in a new tab)"
                            >
                                <span>check out my resume</span>
                                <FaChevronRight
                                    aria-hidden="true"
                                    className="ml-2 size-3 transition-transform group-hover:translate-x-0.5"
                                />
                            </Link>
                        </Button>
                    )}
                </header>
                </Reveal>

                {/* timeline */}
                <ol role="list" className="mt-8 sm:mt-10 pl-5 sm:pl-6">
                    {exps.length === 0 && (
                        <li className="text-sm text-muted-foreground">No experience entries yet.</li>
                    )}

                    {exps.map((e, i) => (
                        <li key={e._id} aria-current={isOngoing(e.endDate) ? "true" : undefined}>
                            <Reveal delay={i * 0.08}>
                            <TimelineEntry
                                title={e.title}
                                role={e.role}
                                description={e.description}
                                start={fmt(e.startDate)}
                                end={fmt(e.endDate)}
                                currentJob={isOngoing(e.endDate)}
                                lastEntry={i === exps.length - 1}    // oldest = no trail
                                images={e.images}
                            />
                            </Reveal>
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    );
}
