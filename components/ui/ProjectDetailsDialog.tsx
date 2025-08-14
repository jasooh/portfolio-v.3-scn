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
    DialogTrigger,
    DialogClose
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { PortableText } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import {FaChevronRight} from "react-icons/fa";

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
                <Button className="group w-full justify-center sm:w-auto focus-visible:ring-primary hover:cursor-pointer" variant="ghost" size="sm">
                    details
                    <FaChevronRight
                        aria-hidden="true"
                        className="ml-2 size-3 transition-transform group-hover:translate-x-0.5"
                    />
                </Button>
            </DialogTrigger>

            {/* extra detail content */}
            <DialogContent className="sm:max-w-4xl max-h-[85vh] p-0">
                <div className="p-6">
                    <DialogHeader className="space-y-1">
                        <DialogTitle className="text-xl">{title}</DialogTitle>
                        {subtitle && (
                            <DialogDescription className="text-xs text-muted-foreground">
                                {subtitle}
                            </DialogDescription>
                        )}
                    </DialogHeader>

                    <ScrollArea className="mt-4 h-[56vh] pr-4">
                        <article className="prose dark:prose-invert max-w-none">
                            <PortableText value={content} />
                        </article>
                    </ScrollArea>

                    <DialogClose className="mt-6 flex justify-end" type="button">
                        close
                    </DialogClose>
                </div>
            </DialogContent>
        </Dialog>
    );
}
