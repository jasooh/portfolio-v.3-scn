// homepage
// it's the homepage.

import React from "react";

// components

import ProjectCard from "@/components/ProjectCard";

// icons
import {FaGithub} from "react-icons/fa";
import {FaLinkedin} from "react-icons/fa";
import {IoDocumentOutline} from "react-icons/io5";
import {FaArrowDownLong} from "react-icons/fa6";
import TimelineEntry from "@/components/TimelineEntry";
import {Button} from "@/components/ui/button";
import GitHubCalendar from "react-github-calendar";
import { FaChevronRight } from "react-icons/fa";

export default function Home() {
    return (
        <main className="flex flex-col items-center">
            <div className="px-12 w-[1200px]">
                <section className="flex relative items-center justify-center h-screen">
                    <div className="flex flex-col gap-10">
                        <header className="text-center">
                            <p>hey, i&#39;m</p>
                            <h1 className="relative font-bold text-6xl leading-20 tracking-wide">
                                <span className="absolute inset-0 blur-xs">justin abuyuan.</span>
                                <span className="relative z-10">justin abuyuan.</span>
                            </h1>
                            <h2 className="text-xl leading-10">software engineering @ uwaterloo</h2>
                            <p className="text-gray-400">i like to code stuff and build things that solve problems.</p>
                        </header>

                        {/* social buttons */}
                        <section className="flex flex-row justify-center gap-4 opacity-75">
                            <FaGithub className="size-10"/>
                            <FaLinkedin className="size-10"/>
                            <Button variant="outline" size="lg">
                                <IoDocumentOutline /> resume.
                            </Button>
                        </section>
                    </div>
                    <div className="absolute flex justify-center bottom-10 w-full">
                        <FaArrowDownLong
                            className="opacity-50 animate-bounce size-5"/>
                    </div>
                </section>

                {/* projects */}
                <section className="mt-40 flex flex-col gap-10">
                    <div className="flex flex-row justify-between items-end">
                        <div>
                            <h2 className="text-5xl leading-25 font-bold">projects.</h2>
                            <p className="text-gray-400">
                                a glimpse into the products i&#39;ve crafted, the ideas i&#39;ve pursued, and the problems i&#39;ve solved along the way.
                            </p>
                        </div>
                        <Button variant="ghost" size="lg">
                            see more <FaChevronRight className="size-3"/>
                        </Button>
                    </div>

                    <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
                        <ProjectCard
                            title="project #1"
                            year={2025}
                            github={true}
                            badges={["react", "tensorflow"]}
                            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed accumsan nibh malesuada finibus ornare. Nam sed arcu placerat, mollis ligula id, dapibus lectus."
                        />
                        <ProjectCard
                            title="project #1"
                            year={2025}
                            github={true}
                            badges={["react", "tensorflow"]}
                            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed accumsan nibh malesuada finibus ornare. Nam sed arcu placerat, mollis ligula id, dapibus lectus."
                        />
                    </div>
                </section>

                {/* experience */}
                <section className="mt-40 flex flex-col gap-10">
                    <div className="flex flex-row justify-between items-end">
                        <div>
                            <h2 className="text-5xl leading-25 font-bold">experience.</h2>
                            <p className="text-gray-400">
                                a collection of the teams i&#39;ve built with, the systems i&#39;ve scaled, and the lessons
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
                                    🏗️ innovating and optimizing processes in the construction industry through software solutions
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
                                    🍅 innovating and optimizing processes in the produce industry through software solutions
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

                {/* more */}
                {/*TODO: cool grid shi*/}
                <section className="mt-40 flex flex-col gap-10">
                    <div className="flex items-center justify-center bg-card text-card-foreground rounded-xl border p-6">
                        <GitHubCalendar hideColorLegend username="jasooh" />
                    </div>
                </section>
            </div>
        </main>
    );
}
