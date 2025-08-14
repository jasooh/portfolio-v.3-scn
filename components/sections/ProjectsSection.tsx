// ProjectsSection.tsx
// renders the projects section of the home page.

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FaChevronRight } from "react-icons/fa";
import ProjectCard from "@/components/ProjectCard";
import {getProjects} from "@/data/getProjects";

export default async function ProjectsSection() {
    const projects = await getProjects();
    console.log(projects);
    const limitedProjects = projects.slice(0, 3);

    return (
        <section
            id="projects"
            aria-labelledby="projects-title"
            aria-describedby="projects-desc"
            className="scroll-mt-24 mt-24 sm:mt-32 lg:mt-40"
        >
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
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

                    <Button
                        asChild
                        variant="ghost"
                        size="lg"
                        className="group w-full justify-center sm:w-auto focus-visible:ring-primary"
                        title="See more projects"
                    >
                        <Link href="/projects" aria-label="See more projects">
                            <span>see more</span>
                            <FaChevronRight
                                aria-hidden="true"
                                className="ml-2 size-3 transition-transform group-hover:translate-x-0.5"
                            />
                        </Link>
                    </Button>
                </header>

                <ul
                    role="list"
                    className="mt-8 grid gap-8 sm:mt-10 sm:gap-10 sm:grid-cols-2 lg:grid-cols-3"
                >
                    {limitedProjects.map((project) => (
                        <li key={project._id}>
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
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
