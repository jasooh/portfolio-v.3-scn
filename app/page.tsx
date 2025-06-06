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

export default function Home() {
    return (
        <main className="px-[10%]">
            <section className="flex relative items-center h-screen">
                <div className="flex flex-col gap-10">
                    <header>
                        <p>hey, i&#39;m</p>
                        <h1 className="relative font-bold text-6xl leading-20 tracking-wide">
                            <span className="absolute inset-0 blur-xs">justin abuyuan.</span>
                            <span className="relative z-10">justin abuyuan.</span>
                        </h1>
                        <h2 className="text-xl leading-10">software engineering @ uwaterloo</h2>
                        <p className="text-gray-400">i like to code stuff and build things that solve problems.</p>
                    </header>

                    {/* social buttons */}
                    <section className="flex flex-row gap-4 opacity-75">
                        <FaGithub className="size-10"/>
                        <FaLinkedin className="size-10"/>
                        <IoDocumentOutline className="size-10"/>
                    </section>
                </div>
                <div className="absolute flex justify-center bottom-10 w-full">
                    <FaArrowDownLong
                        className="opacity-50 animate-bounce size-5"/>
                </div>
            </section>

            {/* projects */}
            <section className="flex flex-col gap-10 min-h-screen py-[10%]">
                <div>
                    <h2 className="text-4xl leading-15 font-bold">projects.</h2>
                    <p className="text-gray-400">my best ideas expressed in code.</p>
                </div>

                <div className="h-full grid grid-cols-4 gap-x-2 gap-y-5">
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
            <section className="flex flex-col gap-10 min-h-screen py-[10%]">
                <div>
                    <h2 className="text-4xl leading-15 font-bold">experience.</h2>
                    <p className="text-gray-400">
                        a collection of the teams i&#39;ve built with, the systems i&#39;ve scaled, and the lessons
                        i&#39;ve carried
                        forward.
                    </p>
                </div>

                <div className="pl-5">
                    <TimelineEntry
                        title="Jitto"
                        description={
                            <p>
                                💻 Full Stack Engineering Intern <br/>
                                🍅 Innovating and optimizing processes in the produce industry through software solutions
                            </p>
                        }
                        start="July 2024"
                        end="June 2025"
                        currentJob={false}
                    />
                    <TimelineEntry
                        title="Flynn Group of Companies"
                        description={
                            <p>
                                💻 Software Engineering Intern <br/>
                                🏗️ Innovating and optimizing processes in the construction industry through software solutions
                            </p>
                        }
                        start="May 2025"
                        end="Present"
                        currentJob={true}
                    />
                </div>
            </section>
        </main>
    );
}
