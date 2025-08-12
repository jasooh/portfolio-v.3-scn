// ExperienceSection.tsx
// renders the experience section of the home page.

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FaChevronRight } from "react-icons/fa";
import TimelineEntry from "@/components/TimelineEntry";

export default function ExperienceSection() {
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
                <ol
                    role="list"
                    className="mt-8 sm:mt-10 pl-5 sm:pl-6"
                >
                    <li aria-current="true">
                        <TimelineEntry
                            title="Flynn Group of Companies"
                            description={
                                <p>
                                    💻 software engineering intern <br />
                                    🏗️ innovating and optimizing processes in the construction
                                    industry through software solutions
                                </p>
                            }
                            start="may 2025"
                            end="present"
                            currentJob={true} // keeps your pulsing indicator
                        />
                    </li>

                    <li>
                        <TimelineEntry
                            title="Jitto"
                            description={
                                <p>
                                    💻 full stack engineering intern <br />
                                    🍅 innovating and optimizing processes in the produce industry
                                    through software solutions
                                </p>
                            }
                            start="july 2024"
                            end="june 2025"
                            currentJob={false}
                        />
                    </li>

                    <li>
                        <TimelineEntry
                            title="Google Developer's Student Clubs"
                            description={
                                <p>
                                    💼 technical co-lead <br />
                                    👨‍💻 guiding and leading fellow computer science students to
                                    success
                                </p>
                            }
                            start="oct 2023"
                            end="may 2024"
                            currentJob={false}
                            lastEntry={true}
                        />
                    </li>
                </ol>
            </div>
        </section>
    );
}
