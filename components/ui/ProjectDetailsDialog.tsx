// ProjectDetailsDialog.tsx
// renders the rich text extra details of the project cards.

"use client";

import React from "react";
import { useReducedMotion } from "framer-motion";
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

// how far down, or how fast, a drag has to go to dismiss the sheet
const DISMISS_DISTANCE = 96;
const DISMISS_VELOCITY = 0.5; // px per ms
// matches the sm breakpoint, below which the panel is a sheet
const SHEET_QUERY = "(max-width: 39.99rem)";

const LINK_CLASS =
    "label inline-flex items-center gap-2 border border-rule px-3 py-2 text-foreground transition-colors hover:border-primary hover:text-primary";

export default function ProjectDetailsDialog({ title, content, subtitle, fig, githubUrl, websiteUrl }: ProjectDetailsDialogProps) {
    const hasLinks = Boolean(githubUrl || websiteUrl);
    // controlled, so a drag can close the sheet itself
    const [open, setOpen] = React.useState(false);
    const reduceMotion = useReducedMotion();
    const panelRef = React.useRef<HTMLDivElement | null>(null);
    const dragRef = React.useRef<{
        id: number;
        startY: number;
        lastY: number;
        lastTime: number;
        prevY: number;
        prevTime: number;
        offset: number;
    } | null>(null);

    // drag-to-dismiss, from the handle and header only. the scroller is never
    // touched, so native momentum scrolling is left exactly as it is.
    const startDrag = (event: React.PointerEvent<HTMLDivElement>) => {
        if (event.pointerType !== "touch" || !window.matchMedia(SHEET_QUERY).matches) return;
        const panel = panelRef.current;
        if (!panel) return;

        dragRef.current = {
            id: event.pointerId,
            startY: event.clientY,
            lastY: event.clientY,
            lastTime: event.timeStamp,
            prevY: event.clientY,
            prevTime: event.timeStamp,
            offset: 0,
        };
        panel.style.transition = "none";
        event.currentTarget.setPointerCapture(event.pointerId);
    };

    const moveDrag = (event: React.PointerEvent<HTMLDivElement>) => {
        const drag = dragRef.current;
        const panel = panelRef.current;
        if (!drag || !panel || event.pointerId !== drag.id) return;

        drag.offset = Math.max(0, event.clientY - drag.startY);
        drag.prevY = drag.lastY;
        drag.prevTime = drag.lastTime;
        drag.lastY = event.clientY;
        drag.lastTime = event.timeStamp;

        // the `translate` property, not `transform`: tw-animate-css leaves its
        // enter keyframe filling forwards, and an animation outranks an inline
        // style, so an inline transform here would be silently ignored. the
        // keyframes never touch `translate`.
        panel.style.translate = `0 ${drag.offset}px`;
    };

    const endDrag = (event: React.PointerEvent<HTMLDivElement>) => {
        const drag = dragRef.current;
        const panel = panelRef.current;
        if (!drag || event.pointerId !== drag.id) return;
        dragRef.current = null;

        const elapsed = Math.max(1, drag.lastTime - drag.prevTime);
        const velocity = (drag.lastY - drag.prevY) / elapsed;

        if (drag.offset > DISMISS_DISTANCE || velocity > DISMISS_VELOCITY) {
            // the exit animation carries it the rest of the way down
            setOpen(false);
            return;
        }

        if (!panel) return;
        // a drag tracks the finger either way; only the settle is motion
        panel.style.transition = reduceMotion ? "none" : "translate 200ms cubic-bezier(0.22, 1, 0.36, 1)";
        panel.style.translate = "0 0";
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
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
                ref={panelRef}
                sheetOnMobile
                className="flex max-h-[90svh] w-[calc(100%-2rem)] flex-col gap-0 overflow-hidden p-0 max-sm:pb-[env(safe-area-inset-bottom)] sm:max-h-[min(85svh,52rem)] sm:max-w-2xl lg:max-w-3xl"
            >
                {/* the drag surface: handle plus header. touch-none keeps the browser
                    from claiming the gesture, and the body below is never included. */}
                <div
                    onPointerDown={startDrag}
                    onPointerMove={moveDrag}
                    onPointerUp={endDrag}
                    onPointerCancel={endDrag}
                    className="shrink-0 max-sm:touch-none"
                >
                {/* grab handle, phones only */}
                <div aria-hidden="true" className="flex justify-center pt-3 sm:hidden">
                    <span className="h-1 w-10 bg-rule" />
                </div>

                {/* pr-14 clears the close button */}
                <DialogHeader className="gap-3 border-b border-border p-6 pr-14 text-left max-sm:pt-4 sm:p-8 sm:pr-16">
                    <DialogDescription className="label flex items-center gap-3">
                        {fig && <span className="text-primary">{fig}</span>}
                        {fig && subtitle && <span aria-hidden="true" className="h-px w-6 bg-rule" />}
                        {subtitle}
                    </DialogDescription>
                    <DialogTitle className="text-4xl sm:text-5xl">{title}</DialogTitle>
                </DialogHeader>
                </div>

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
