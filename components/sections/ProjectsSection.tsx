// ProjectsSection.tsx
// renders the projects section of the home page.

import {Button} from "@/components/ui/button";
import {FaChevronRight} from "react-icons/fa";
import ProjectCard from "@/components/ProjectCard";
import React from "react";

export default function ProjectsSection() {
    return (
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
    )
}