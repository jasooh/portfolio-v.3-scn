// homepage
// it's the homepage.

import React from "react";

// components

import ProjectCard from "@/components/ProjectCard";

// icons
import {FaGithub} from "react-icons/fa";
import {FaLinkedin} from "react-icons/fa";
import {IoDocumentTextSharp} from "react-icons/io5";
import {FaArrowDownLong} from "react-icons/fa6";
import TimelineEntry from "@/components/TimelineEntry";
import {Button} from "@/components/ui/button";
import GitHubCalendar from "react-github-calendar";
import {FaChevronRight} from "react-icons/fa";
import {Separator} from "@/components/ui/separator";
import Image from "next/image";
import TechMarquee from "@/components/TechMarquee";

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
                                <IoDocumentTextSharp/> resume.
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
                                a glimpse into the products i&#39;ve crafted, the ideas i&#39;ve pursued, and the
                                problems i&#39;ve solved along the way.
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

                {/* more section */}
                <section className="mt-40 mb-20" id="more">
                    <div className="flex flex-row justify-between items-end mb-10">
                        <div>
                            <h2 className="text-5xl leading-25 font-bold">more.</h2>
                            <p className="text-gray-400">github activity, tools i use, and what i’m up to now.</p>
                        </div>
                    </div>

                    <div className="grid gap-8 lg:grid-cols-3">
                        {/* Row 1, Cols 1-2: Tech marquee */}
                        <div className="flex justify-center lg:col-span-2 h-full rounded-2xl border border-white/10 p-6 bg-background/40">
                            <TechMarquee />
                        </div>

                        {/* Row 1, Col 3: Availability (pill) */}
                        <div className="h-full rounded-2xl border border-white/10 bg-background/40 p-6">
                            <div className="flex items-center justify-between gap-3 flex-wrap">
                                {/* status pill */}
                                <div
                                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
                                    <span className="relative flex h-2.5 w-2.5">
                                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400"></span>
                                    </span>
                                    <span className="text-sm font-medium leading-none">available for projects</span>
                                </div>

                                {/* location / mode */}
                                <span className="text-xs sm:text-sm text-gray-400 leading-none">
                                    Toronto · remote-friendly
                                </span>
                            </div>
                        </div>

                        {/* Row 2, Cols 1-2: GitHub calendar */}
                        <div className="lg:col-span-2 h-full rounded-2xl border border-white/10 p-6 bg-background/40">
                            <GitHubCalendar hideColorLegend hideMonthLabels username="jasooh"/>
                        </div>

                        {/* Row 2, Col 3: Fun stats */}
                        <div className="h-full rounded-2xl border border-white/10 p-6 bg-background/40">
                            <h3 className="text-lg font-semibold mb-4">fun stats 🎯</h3>

                            {/* row 1 of fun stats */}
                            <div className="grid grid-cols-3 gap-4 text-center">
                                <div>
                                    <div className="text-2xl font-semibold leading-tight">4</div>
                                    <div className="text-xs text-gray-400">hackathons</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-semibold leading-tight">12</div>
                                    <div className="text-xs text-gray-400">PRs</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-semibold leading-tight">plat</div>
                                    {/* TODO: link tracker gg to ts */}
                                    <div className="text-xs text-gray-400">valorant rank</div>
                                </div>
                            </div>

                            {/* row 2 of fun stats */}
                            <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                                <div>
                                    <div className="text-2xl font-semibold leading-tight">X</div>
                                    <div className="text-xs text-gray-400">leetcode</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-semibold leading-tight">Y</div>
                                    <div className="text-xs text-gray-400">talks/posts</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-semibold leading-tight">Z</div>
                                    <div className="text-xs text-gray-400">coffee ☕</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>


            </div>
            {/* footer */}
            <Separator/>
            <section className="flex flex-row justify-between px-12 w-[1200px] py-10 h-60">
                <div className="flex flex-col justify-between w-1/4 h-full">
                    <div>
                        <h3 className="relative font-bold text-2xl leading-12 tracking-wide">
                            <span className="absolute inset-0 blur-xl ">justin abuyuan</span>
                            <span className="relative z-10 text-gray-200">justin abuyuan</span>
                        </h3>
                        <p className="italic text-gray-400">software engineer and hardstuck plat on valorant</p>
                    </div>
                    <div className="flex flex-row gap-2">
                        <FaGithub className="size-7"/>
                        <FaLinkedin className="size-7"/>
                        <IoDocumentTextSharp className="size-7"/>
                        <Image
                            src="/logo_w.svg"
                            alt="SE Webring Logo"
                            width={28}
                            height={28}
                            className="size-7"
                        />
                    </div>
                </div>
                <div className="flex flex-col justify-end">
                    <p className="italic text-gray-500 text-sm text-right">
                        Built with ❤ using Next.js and TypeScript, and deployed using Vercel.
                        <br/>
                        © 2024 Justin Abuyuan. All rights reserved.
                    </p>
                </div>
            </section>
        </main>
    );
}
