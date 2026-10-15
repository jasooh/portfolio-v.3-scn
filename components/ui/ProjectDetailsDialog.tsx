// ProjectDetailsDialog.tsx
// renders the rich text extra details of the project cards.

"use client";

import React from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PortableText } from "@portabletext/react";
import type { Project } from "@/sanity/fetch";
import {FaChevronRight, FaGithub} from "react-icons/fa";
import {FaArrowRightLong} from "react-icons/fa6";
import {TbWorld} from "react-icons/tb";
import {ptComponents} from "@/components/ptComponents";

interface ProjectDetailsDialogProps {
    title: string;
    content: Project["extraDetails"];  // rich text from Sanity (Portable Text)
    subtitle?: string;                 // optional (e.g., year or tagline)
    /** figure label matching the card, e.g. "fig. 01" */
    fig?: string;
    githubUrl?: string | null;
    websiteUrl?: string | null;
}

const LINK_CLASS =
    "label inline-flex items-center gap-2 border border-rule px-3 py-2 text-foreground transition-colors hover:border-primary hover:text-primary";

export default function ProjectDetailsDialog({ title, content, subtitle, fig, githubUrl, websiteUrl }: ProjectDetailsDialogProps) {
    const hasLinks = Boolean(githubUrl || websiteUrl);

    return (
        <Dialog>
            {/* trigger button */}
            <DialogTrigger asChild>
                <Button className="group justify-center sm:w-auto hover:cursor-pointer" variant="fill" size="sm">
                    details
                    <FaChevronRight
                        aria-hidden="true"
                        className="ml-2 size-3 transition-transform group-hover:translate-x-0.5"
                    />
                </Button>
            </DialogTrigger>

            {/* width steps up per breakpoint rather than sitting at one max-width.
                flex + max-h lets it shrink to short content and cap at the viewport,
                with the body taking whatever height is left. */}
            <DialogContent
                className="flex max-h-[min(85svh,52rem)] w-[calc(100%-2rem)] flex-col gap-0 overflow-hidden p-0 sm:max-w-2xl lg:max-w-3xl"
            >
                {/* pr-14 clears the close button */}
                <DialogHeader className="shrink-0 gap-3 border-b border-border p-6 pr-14 text-left sm:p-8 sm:pr-16">
                    <DialogDescription className="label flex items-center gap-3">
                        {fig && <span className="text-primary">{fig}</span>}
                        {fig && subtitle && <span aria-hidden="true" className="h-px w-6 bg-rule" />}
                        {subtitle}
                    </DialogDescription>
                    <DialogTitle className="text-4xl sm:text-5xl">{title}</DialogTitle>
                </DialogHeader>

                {/* a plain overflow container rather than radix's ScrollArea, whose
                    viewport grows with its content inside a flex column and never
                    scrolls. overscroll-contain keeps the page from moving at the ends. */}
                <div className="scroll-thin relative min-h-0 flex-1 overflow-y-auto overscroll-contain">
                    {/* ptComponents sets no paragraph margin, so space them here */}
                    <article className="space-y-4 px-6 pt-6 pb-2 text-[0.95rem] leading-relaxed text-foreground/80 sm:px-8 sm:text-base">
                        <PortableText value={content} components={ptComponents} />
                    </article>
                    {/* fades the last line into the edge, hinting there's more below */}
                    <div aria-hidden="true" className="pointer-events-none sticky bottom-0 h-10 bg-linear-to-t from-card to-transparent" />
                </div>

                {hasLinks && (
                    <footer className="flex shrink-0 flex-wrap items-center gap-2 border-t border-border px-6 py-4 sm:px-8">
                        {githubUrl && (
                            <a href={githubUrl} target="_blank" rel="noopener noreferrer" className={LINK_CLASS}>
                                <FaGithub aria-hidden="true" className="size-3.5" /> source
                            </a>
                        )}
                        {websiteUrl && (
                            <a href={websiteUrl} target="_blank" rel="noopener noreferrer" className={LINK_CLASS}>
                                <TbWorld aria-hidden="true" className="size-3.5" /> visit
                                <FaArrowRightLong aria-hidden="true" className="size-3" />
                            </a>
                        )}
                    </footer>
                )}
            </DialogContent>
        </Dialog>
    );
}
