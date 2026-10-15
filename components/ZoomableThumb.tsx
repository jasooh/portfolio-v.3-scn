// ZoomableThumb.tsx
// renders a zoomable thumbnail used for images.

"use client";

import * as React from "react";
import Image from "next/image";
import {Dialog, DialogContent, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export default function ZoomableThumb({url, alt, className}: {
    url: string;
    alt?: string;
    className?: string;
}) {
    return (
        <Dialog>
            {/* smaller image used as a button */}
            <DialogTrigger asChild>
                <button
                    type="button"
                    className={`relative w-40 border border-border p-1 duration-200 hover:cursor-pointer hover:border-primary/60 ${className || ""}`}
                    aria-label={`Open preview for ${alt || "image"}`}
                >
                    <AspectRatio ratio={16 / 9}>
                        <Image
                            src={url}
                            alt={alt || "Zoom preview"}
                            fill
                            className="object-cover grayscale-[35%] transition hover:grayscale-0"
                            draggable={false}
                        />
                    </AspectRatio>
                </button>
            </DialogTrigger>

            {/* sm:max-w-none isn't redundant: tailwind-merge keys it separately
                from the unprefixed one, so the base sm:max-w-lg would survive. */}
            <DialogContent className="w-[95vw] max-w-none gap-0 overflow-hidden p-0 sm:w-[92vw] sm:max-w-none lg:w-[88vw]">
                {/* radix needs a title; the visible caption is conditional so it
                    can't render as an empty pill */}
                <DialogTitle className="sr-only">{alt || "Image preview"}</DialogTitle>

                <div className="relative h-[80vh] w-full bg-black">
                    {alt && (
                        <span className="absolute left-3 top-3 z-10 label bg-background/80 px-2 py-1 text-foreground">
                            {alt}
                        </span>
                    )}
                    <Image
                        src={url}
                        alt={alt || ""}
                        fill
                        sizes="92vw"
                        className="object-contain"
                        draggable={false}
                    />
                </div>
            </DialogContent>
        </Dialog>
    );
}
