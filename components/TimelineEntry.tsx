// TimelineEntry.tsx
// displays my jobs.

import React from "react";

import ZoomableThumb from "@/components/ZoomableThumb";
import {PortableTextBlock} from "@portabletext/types";
import {PortableText} from "@portabletext/react";
import {ptComponents} from "@/components/ptComponents";

// timeline images
interface TimelineImagesProps {
    images: { url: string; alt: string }[];
    className?: string;
}

function TimelineImages({ images, className }: TimelineImagesProps) {
    const limitedImages = images.slice(0, 3);
    return (
        <div className={className}>
            {limitedImages.map((img, i) => (
                <ZoomableThumb key={i} url={img.url} alt={img.alt || `Preview ${i + 1}`} />
            ))}
        </div>
    );
}

// timeline entry

interface TimelineEntryProps {
    title: string;
    role?: string | null;
    description: PortableTextBlock[];
    start: string;
    end?: string;
    currentJob?: boolean;
    lastEntry?: boolean;
    images?: { url: string; alt: string }[];
}

export default function TimelineEntry({
      title,
      role,
      description,
      currentJob = false,
      start,
      end,
      lastEntry = false,
      images,
    }: TimelineEntryProps) {
    return (
        <div className="relative grid gap-x-10 pb-14 sm:grid-cols-[10rem_1fr]">
            {/* dates sit in their own column on wide screens, like a margin note */}
            <time className="label mb-3 block pl-8 pt-1 sm:mb-0 sm:pl-0 sm:text-right">
                {start} {end && <><span aria-hidden="true">→</span> {end}</>}
            </time>

            <div className="relative pl-8">
                {/* the rail: a hairline with a tick every 12px. the oldest entry stops at its marker */}
                {!lastEntry && (
                    <span
                        aria-hidden="true"
                        className="absolute left-0 top-3 -bottom-3 w-2 border-l border-foreground/25 bg-[repeating-linear-gradient(to_bottom,var(--rule)_0_1px,transparent_1px_12px)] bg-[length:6px_100%] bg-no-repeat"
                    />
                )}
                {/* marker: a diamond, filled and pinging while the role is ongoing */}
                <span aria-hidden="true" className="absolute left-0 top-1.5 grid size-3 -translate-x-1/2 place-items-center">
                    {currentJob && (
                        <span className="absolute size-3 rotate-45 bg-primary/60 animate-ping motion-reduce:animate-none" />
                    )}
                    <span className={`relative size-2.5 rotate-45 border ${currentJob ? "border-primary bg-primary" : "border-foreground/60 bg-background"}`} />
                </span>

                {/* role leads if set, company otherwise */}
                <h3 className="font-display text-3xl leading-none">{role || title}</h3>
                {role && (
                    <p className="mt-1.5 text-sm text-foreground/80">{title}</p>
                )}
                <div className="mt-3 max-w-2xl text-[0.95rem] text-muted-foreground">
                    <PortableText value={description} components={ptComponents} />
                </div>
                {images && (
                    <TimelineImages className="mt-5 flex flex-wrap gap-3" images={images} />
                )}
            </div>
        </div>
    );
}
