// ProjectsSection.tsx
// renders the projects section of the home page.

import React from "react";
import ProjectCard from "@/components/ProjectCard";
import Reveal from "@/components/Reveal";
import {getProjects} from "@/data/getProjects";

export default async function ProjectsSection() {
    const projects = await getProjects();
    const limitedProjects = projects.slice(0, 3);

    return (
        <section
            id="projects"
            aria-labelledby="projects-title"
            aria-describedby="projects-desc"
            className="scroll-mt-24 mt-24 sm:mt-32 lg:mt-40"
        >
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
                <Reveal>
                <header className="flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <h2
                            id="projects-title"
                            className="font-bold tracking-tight leading-tight text-[clamp(1.75rem,5vw,3rem)]"
                        >
                            projects.
                        </h2>
                        <p
                            id="projects-desc"
                            className="mt-2 max-w-prose text-sm sm:text-base text-gray-400"
                        >
                            a glimpse into the products i&apos;ve crafted, the ideas i&apos;ve
                            pursued, and the problems i&apos;ve solved along the way.
                        </p>
                    </div>

                </header>
                </Reveal>

                <ul
                    role="list"
                    className="mt-8 grid gap-8 sm:mt-10 sm:gap-10 sm:grid-cols-2 lg:grid-cols-3"
                >
                    {limitedProjects.map((project, i) => (
                        <li key={project._id}>
                            {/* cascade rather than landing all at once */}
                            <Reveal delay={i * 0.1}>
                            <ProjectCard
                                _id={project._id}
                                title={project.title}
                                year={project.year}
                                imageUrl={project.imageUrl}
                                alt={project.alt}
                                githubUrl={project.githubUrl}
                                websiteUrl={project.websiteUrl}
                                badges={project.badges}
                                description={project.description}
                                extraDetails={project.extraDetails}
                            />
                            </Reveal>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
