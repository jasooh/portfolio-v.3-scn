// ExperienceSection.tsx
// renders the experience section of the home page.

import {Button} from "@/components/ui/button";
import {FaChevronRight} from "react-icons/fa";
import TimelineEntry from "@/components/TimelineEntry";
import React from "react";

export default function ExperienceSection() {

    return (
        <section className="mt-40 flex flex-col gap-10">
            <div className="flex flex-row justify-between items-end">
                <div>
                    <h2 className="text-5xl leading-25 font-bold">experience.</h2>
                    <p className="text-gray-400">
                        a collection of the teams i&#39;ve built with, the systems i&#39;ve scaled, and the
                        lessons
                        i&#39;ve carried
                        forward.
                    </p>
                </div>
                <Button variant="ghost" size="lg">
                    check out my sick resume <FaChevronRight className="size-3"/>
                </Button>
            </div>

            <div className="pl-5">
                <TimelineEntry
                    title="Flynn Group of Companies"
                    description={
                        <p>
                            💻 software engineering intern <br/>
                            🏗️ innovating and optimizing processes in the construction industry through software
                            solutions
                        </p>
                    }
                    start="may 2025"
                    end="present"
                    currentJob={true}
                />
                <TimelineEntry
                    title="Jitto"
                    description={
                        <p>
                            💻 full stack engineering intern <br/>
                            🍅 innovating and optimizing processes in the produce industry through software
                            solutions
                        </p>
                    }
                    start="july 2024"
                    end="june 2025"
                    currentJob={false}
                />
                <TimelineEntry
                    title="Google Developer's Student Clubs"
                    description={
                        <p>
                            💼 technical co-lead <br/>
                            👨‍💻 guiding and leading fellow computer science students to success
                        </p>
                    }
                    start="oct 2023"
                    end="may 2024"
                    currentJob={false}
                    lastEntry={true}
                />
            </div>
        </section>
    )
}