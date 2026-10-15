// ExperienceSection.tsx
// renders the experience section of the home page.

import React from "react";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import TimelineEntry from "@/components/TimelineEntry";
import Reveal from "@/components/Reveal";
import SectionHeader from "@/components/SectionHeader";
import { getExperiences, getResume } from "@/sanity/fetch";

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
            className="mt-24 sm:mt-32 lg:mt-40"
        >
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
                <SectionHeader
                    index="02"
                    id="experience"
                    title="experience"
                    description={<>a collection of the teams i&apos;ve built with, the systems i&apos;ve
                        worked on, and the lessons i&apos;ve carried forward.</>}
                    action={resume.resumeUrl && (
                        <Button
                            asChild
                            variant="fill"
                            size="lg"
                            className="group w-full justify-center sm:w-auto"
                            title="Open résumé (PDF)"
                        >
                            <Link
                                href={resume.resumeUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Open résumé (PDF, opens in a new tab)"
                            >
                                <span>view résumé</span>
                                <FaArrowRightLong
                                    aria-hidden="true"
                                    className="ml-1 size-3.5 transition-transform group-hover:translate-x-1"
                                />
                            </Link>
                        </Button>
                    )}
                />

                {/* timeline */}
                <ol role="list" className="mt-10 sm:mt-12">
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
