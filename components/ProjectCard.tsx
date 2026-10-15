// ProjectCard.tsx
// displays project info, framed like a figure on a drawing sheet.

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Project } from "@/lib/types/queryTypes";
import { PortableText } from "@portabletext/react";
import { FaGithub } from "react-icons/fa";
import { TbWorld } from "react-icons/tb";
import ProjectDetailsDialog from "@/components/ui/ProjectDetailsDialog";
import {ptComponents} from "@/components/ptComponents";

type Props = Project & {
    /** figure number shown in the caption */
    index?: number;
};

export default function ProjectCard({title, year, imageUrl, alt, githubUrl, badges, description, extraDetails, websiteUrl, index = 1}: Props) {
    const fig = String(index).padStart(2, "0");

    return (
        <article className="drafted drafted-hover group flex h-[540px] w-full flex-col">
            {/* figure: inset frame keeps a hairline of card between image and border */}
            <div className="shrink-0 p-3 pb-0">
                <div className="relative w-full overflow-hidden border border-border" style={{ aspectRatio: "3 / 2" }}>
                    <Image
                        src={imageUrl || "https://placehold.co/768x512.png"}
                        alt={alt || title}
                        fill
                        sizes="(min-width:1024px) 384px, 100vw"
                        className="object-cover grayscale-[35%] transition duration-500 group-hover:scale-[1.03] group-hover:grayscale-0 motion-reduce:transition-none"
                    />
                </div>
                <div className="mt-2 flex items-center justify-between">
                    <span className="label">fig. {fig}</span>
                    <span className="label">{year}</span>
                </div>
            </div>

            <div className="flex min-h-0 grow flex-col gap-4 border-t border-border mt-3 p-5">
                <h3 className="font-display text-[1.75rem] leading-none line-clamp-1">{title}</h3>

                <ul className="flex flex-row flex-wrap gap-1.5" aria-label="Technologies">
                    {badges?.map((badgeText, i) => (
                        <li
                            key={i}
                            className="border border-border px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-foreground/75"
                        >
                            {badgeText}
                        </li>
                    ))}
                </ul>

                {/* clamp, or the fixed card height cuts the text mid-sentence */}
                <div className="line-clamp-4 text-sm text-muted-foreground">
                    <PortableText value={description} components={ptComponents} />
                </div>

                {/* icons */}
                <div className="mt-auto flex w-full items-center justify-between gap-1">
                    <div className="-ml-2">
                        {githubUrl && (
                            <Button variant="ghost" size="icon" asChild>
                                <a href={githubUrl} target="_blank" rel="noreferrer" aria-label={`${title} on GitHub`}>
                                    <FaGithub className="size-5 opacity-75" />
                                </a>
                            </Button>
                        )}
                        {websiteUrl && (
                            <Button variant="ghost" size="icon" asChild>
                                <a href={websiteUrl} target="_blank" rel="noreferrer" aria-label={`${title} website`}>
                                    <TbWorld className="size-5 opacity-75" />
                                </a>
                            </Button>
                        )}
                    </div>
                    {/* see more details */}
                    <ProjectDetailsDialog
                        title={title}
                        content={extraDetails}
                        subtitle={String(year)}
                    />
                </div>
            </div>
        </article>
    );
}
