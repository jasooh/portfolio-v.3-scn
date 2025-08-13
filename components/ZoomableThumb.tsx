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
    const [zoomed, setZoomed] = React.useState(false);

    return (
        <Dialog onOpenChange={(open) => !open && setZoomed(false)}>
            {/* smaller image used as a button */}
            <DialogTrigger asChild>
                <button
                    type="button"
                    className={`w-40 relative hover:opacity-30 hover:cursor-pointer duration-150 ${className || ""}`}
                    aria-label={`Open preview for ${alt || "image"}`}
                >
                    <AspectRatio ratio={16 / 9}>
                        <Image
                            src={url}
                            alt={alt || "Zoom preview"}
                            fill
                            className="rounded-md object-cover"
                            draggable={false}
                        />
                    </AspectRatio>
                </button>
            </DialogTrigger>

            {/* preview content */}
            <DialogContent className="p-0 gap-0 !max-w-none w-[95vw] sm:w-[90vw]">
                {/* zoom container */}
                <div className="relative w-[95vw] sm:w-[90vw] h-[85vh] overflow-auto bg-black">
                    <DialogTitle className="absolute left-3 top-3 z-10 rounded bg-black/50 px-2 py-1 text-xs text-white">
                        {zoomed ? "Click to reset • Scroll to pan" : "Click to zoom"}
                    </DialogTitle>
                    <div
                        className={`inline-block transition-transform duration-200 ${
                            zoomed ? "scale-[1.8] cursor-zoom-out" : "scale-100 cursor-zoom-in"
                        }`}
                        style={{ transformOrigin: "center center" }}
                        onClick={() => setZoomed((z) => !z)}
                    >
                        <div className="relative w-[95vw] sm:w-[90vw] h-[85vh] select-none">
                            <Image
                                src={url}
                                alt={alt || ""}
                                fill
                                sizes="90vw"
                                className="object-contain"
                                draggable={false}
                            />
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}