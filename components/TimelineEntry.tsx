// TimelineEntry.tsx
// displays my jobs.

import React from "react";

// components
import {AspectRatio} from "@/components/ui/aspect-ratio";
import Image from "next/image";

// icons
import {FaSuitcase} from "react-icons/fa";

interface TimelineImagesProps {
    images: string[];
    className?: string;
}

function TimelineImages({images, className}: TimelineImagesProps) {
    const limitedImages: string[] = images.slice(0, 3); // show up to 3 images

    return (
        <div className={className}>
            {limitedImages.map((image, i) => (
                <div key={i} className="w-40 relative">
                    <AspectRatio ratio={16 / 9}>
                        <Image
                            src={image}
                            alt={`Preview ${i + 1}`}
                            className="rounded-md object-cover"
                            fill
                        />
                    </AspectRatio>
                </div>
            ))}
        </div>

    )
}

interface TimelineEntryProps {
    title: string;
    description: React.ReactNode;
    start: string;
    end?: string;
    currentJob?: boolean;
    lastEntry?: boolean;
}

export default function TimelineEntry({title, description, currentJob = false, start, end, lastEntry = false}: TimelineEntryProps) {
    return (
        <ol className={`pb-5 relative ${!lastEntry && "border-s border-dashed dark:border-gray-700"}`}>
            <li className="ml-8 ms-6">
                <span className="absolute flex items-center justify-center w-6 h-6 rounded-full -start-3 ring-8 dark:ring-primary-dark dark:bg-primary">
                    <span className={`absolute size-7 dark:bg-primary rounded-full z-[-1] ${currentJob && "animate-ping"}`}/>
                    <FaSuitcase className="w-2.5 h-2.5" aria-hidden="true"/>
                </span>
                <h3 className="mb-1 text-lg font-semibold  dark:text-white">{title}</h3>
                <time className="block mb-2 text-sm font-normal leading-none dark:text-gray-500">
                    {start} {end && `— ${end}`}
                </time>
                <div className="text-base font-normal dark:text-gray-400 mb-5">
                    {description}
                </div>
                <TimelineImages
                    className="my-4 flex flex-wrap gap-4"
                    images={["https://placehold.co/768x512.png", "https://placehold.co/768x512.png"]}
                />
            </li>
        </ol>
    );
}
