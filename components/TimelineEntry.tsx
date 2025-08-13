// TimelineEntry.tsx
// displays my jobs.

import React from "react";

// icons
import { FaSuitcase } from "react-icons/fa";
import ZoomableThumb from "@/components/ZoomableThumb";

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
    description: React.ReactNode;
    start: string;
    end?: string;
    currentJob?: boolean;
    lastEntry?: boolean;
    images?: { url: string; alt: string }[]; // ⬅️ optional images prop
}

export default function TimelineEntry({
      title,
      description,
      currentJob = false,
      start,
      end,
      lastEntry = false,
      images,
    }: TimelineEntryProps) {
    return (
        <ol className={`pb-5 relative ${!lastEntry ? "border-s border-dashed dark:border-gray-700" : ""}`}>
            <li className="ml-8 ms-6">
                <span className="absolute flex items-center justify-center w-6 h-6 rounded-full -start-3 ring-8 dark:ring-primary-dark dark:bg-primary">
                    <span className={`absolute size-7 dark:bg-primary rounded-full z-[-1] ${currentJob ? "animate-ping" : ""}`}/>
                    <FaSuitcase className="w-2.5 h-2.5" aria-hidden="true" />
                </span>
                <h3 className="mb-1 text-lg font-semibold dark:text-white">{title}</h3>
                <time className="block mb-2 text-sm font-normal leading-none dark:text-gray-500">
                    {start} {end && `— ${end}`}
                </time>
                <div className="text-base font-normal dark:text-gray-400 mb-5">
                    {description}
                </div>
                {images && (
                    <TimelineImages className="my-4 flex flex-wrap gap-4" images={images} />
                )}
            </li>
        </ol>
    );
}
