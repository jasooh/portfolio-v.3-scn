// TimelineEntry.tsx

import React from "react";

// icons
import {FaSuitcase} from "react-icons/fa";

interface TimelineEntryProps {
    title: string;
    description: React.ReactNode;
    start: string;
    end?: string;
    currentJob?: boolean;
}

export default function TimelineEntry({title, description, currentJob = false, start, end}: TimelineEntryProps) {
    return (
        <ol className={`pb-25 relative ${!currentJob && "border-s dark:border-gray-700"}`}>
            <li className="ml-8 ms-6">
                <span
                    className="absolute flex items-center justify-center w-6 h-6 rounded-full -start-3 ring-8 dark:ring-primary-dark dark:bg-primary">
                    <span className={`absolute size-7 dark:bg-primary rounded-full z-[-1] ${currentJob && "animate-ping"}`} />
                    <FaSuitcase className="w-2.5 h-2.5" aria-hidden="true"/>
                </span>
                <h3 className="mb-1 text-lg font-semibold  dark:text-white">{title}</h3>
                <time className="block mb-2 text-sm font-normal leading-none dark:text-gray-500">
                    {start} {end && `— ${end}`}
                </time>
                <p className="text-base font-normal dark:text-gray-400 mb-5">
                    {description}
                </p>
            </li>
        </ol>
    );
}
