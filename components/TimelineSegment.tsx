// TimelineSegment.tsx

import React from "react";

// icons
import {FaSuitcase} from "react-icons/fa";

export default function TimelineSegment() {
    return (
        <ol className="mb-5 relative ">
            <li className="ml-8 ms-6">
                <span
                    className="absolute flex items-center justify-center w-6 h-6 rounded-full -start-3 ring-8 dark:ring-primary-dark dark:bg-primary">
                    <span className="absolute size-7 dark:bg-primary rounded-full animate-ping z-[-1]" />
                    <FaSuitcase className="w-2.5 h-2.5" aria-hidden="true"/>
                </span>
                <h3 className="mb-1 text-lg font-semibold  dark:text-white">Jitto</h3>
                <time className="block mb-2 text-sm font-normal leading-none dark:text-gray-500">
                    July 2024 — June 2025
                </time>
                <p className="text-base font-normal dark:text-gray-400">
                    💻 Full Stack Engineering Intern <br/>
                    🍅 Innovating and optimizing processes in the produce industry through software solutions
                </p>
            </li>
        </ol>
    );
}
