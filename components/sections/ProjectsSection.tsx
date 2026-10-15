// ProjectsSection.tsx
// renders the projects section of the home page.

import React from "react";
import ProjectCard from "@/components/ProjectCard";
import Reveal from "@/components/Reveal";
import {getProjects} from "@/sanity/fetch";
import SectionHeader from "@/components/SectionHeader";

export default async function ProjectsSection() {
    const projects = await getProjects();
    const limitedProjects = projects.slice(0, 3);

    return (
        <section
            id="projects"
            aria-labelledby="projects-title"
            aria-describedby="projects-desc"
            className="mt-16 sm:mt-24 lg:mt-32"
        >
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
                <SectionHeader
                    index="01"
                    id="projects"
                    title="projects"
                    description={<>a glimpse into the products i&apos;ve crafted, the ideas i&apos;ve
                        pursued, and the problems i&apos;ve solved along the way.</>}
                />

                <ul
                    role="list"
                    className="mt-10 grid gap-8 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3"
                >
                    {limitedProjects.map((project, i) => (
                        <li key={project._id}>
                            {/* cascade rather than landing all at once */}
                            <Reveal delay={i * 0.1}>
                            <ProjectCard
                                index={i + 1}
                                _id={project._id}
                                title={project.title}
                                year={project.year}
                                image={project.image}
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
