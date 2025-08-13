// ExperienceSection.tsx
// renders the experience section of the home page.

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FaChevronRight } from "react-icons/fa";
import TimelineEntry from "@/components/TimelineEntry";
import {PortableText} from "@portabletext/react";
import {getExperiences} from "@/data/getExperiences";

function fmt(date?: string | null) {
    if (!date) return "present"
    return new Date(date).toLocaleString("en-US", { month: "short", year: "numeric" }).toLowerCase()
}

export default async function ExperienceSection() {
    const exps = await getExperiences();

    return (
        <section
            id="experience"
            aria-labelledby="experience-title"
            aria-describedby="experience-desc"
            className="scroll-mt-24 mt-24 sm:mt-32 lg:mt-40"
        >
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
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
                            scaled, and the lessons i&apos;ve carried forward.
                        </p>
                    </div>

                    <Button
                        asChild
                        variant="ghost"
                        size="lg"
                        className="group w-full justify-center sm:w-auto focus-visible:ring-primary"
                        title="Open résumé (PDF)"
                    >
                        <Link
                            href="/resume.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Open résumé"
                        >
                            <span>check out my resume</span>
                            <FaChevronRight
                                aria-hidden="true"
                                className="ml-2 size-3 transition-transform group-hover:translate-x-0.5"
                            />
                        </Link>
                    </Button>
                </header>

                {/* timeline */}
                <ol role="list" className="mt-8 sm:mt-10 pl-5 sm:pl-6">
                    {exps.length === 0 && (
                        <li className="text-sm text-muted-foreground">No experience entries yet.</li>
                    )}

                    {exps.map((e, i) => (
                        <li key={e._id} aria-current={i === 0 ? "true" : undefined}>
                            <TimelineEntry
                                title={e.title}
                                description={<PortableText value={e.description} />}
                                start={fmt(e.startDate)}
                                end={fmt(e.endDate)}
                                currentJob={i === 0}                 // newest = pulsing
                                lastEntry={i === exps.length - 1}    // oldest = no trail
                                images={e.images}                    // [{ url, alt }, ...] (if your TimelineEntry accepts images)
                            />
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    );
}
