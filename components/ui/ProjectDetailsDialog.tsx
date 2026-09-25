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
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { PortableText } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import {FaChevronRight} from "react-icons/fa";
import {ptComponents} from "@/components/ptComponents";

interface ProjectDetailsDialogProps {
    title: string;
    content: PortableTextBlock[];      // rich text from Sanity (Portable Text)
    subtitle?: string;                 // optional (e.g., year or tagline)
}

export default function ProjectDetailsDialog({ title, content, subtitle }: ProjectDetailsDialogProps) {
    return (
        <Dialog>
            {/* trigger button */}
            <DialogTrigger asChild>
                <Button className="group justify-center sm:w-auto focus-visible:ring-primary hover:cursor-pointer" variant="fill" size="sm">
                    details
                    <FaChevronRight
                        aria-hidden="true"
                        className="ml-2 size-3 transition-transform group-hover:translate-x-0.5"
                    />
                </Button>
            </DialogTrigger>

            {/* width steps up per breakpoint rather than sitting at one max-width.
                flex + max-h lets it shrink to short content and cap at the viewport,
                with the scroll area taking whatever height is left. */}
            <DialogContent
                className="flex max-h-[min(85vh,52rem)] w-[calc(100%-2rem)] flex-col gap-0 overflow-hidden p-0 sm:max-w-2xl lg:max-w-3xl xl:max-w-4xl"
            >
                {/* pr-12 clears the close button */}
                <DialogHeader className="shrink-0 space-y-1 border-b border-white/10 p-6 pr-12 pb-4">
                    <DialogTitle className="text-xl">{title}</DialogTitle>
                    {subtitle && (
                        <DialogDescription className="text-xs text-muted-foreground">
                            {subtitle}
                        </DialogDescription>
                    )}
                </DialogHeader>

                <ScrollArea className="min-h-0 flex-1">
                    {/* ptComponents sets no paragraph margin, so space them here */}
                    <article className="space-y-3 px-6 py-5 text-sm leading-relaxed sm:text-base">
                        <PortableText value={content} components={ptComponents} />
                    </article>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
}
