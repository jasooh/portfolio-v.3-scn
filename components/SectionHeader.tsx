// SectionHeader.tsx
// the numbered, ruled heading every home page section opens with.

import React from "react";
import Reveal from "@/components/Reveal";
import Rule from "@/components/Rule";

type Props = {
    /** sheet number, e.g. "01" */
    index: string;
    /** used for the aria-labelledby / aria-describedby ids */
    id: string;
    title: string;
    description: React.ReactNode;
    /** right-hand slot, e.g. a résumé button */
    action?: React.ReactNode;
};

export default function SectionHeader({ index, id, title, description, action }: Props) {
    return (
        <header>
            <div className="flex items-center gap-4">
                <span className="label text-primary">[ {index} ]</span>
                <Rule className="flex-1" />
                <span className="label hidden sm:inline">{id}</span>
            </div>

            <Reveal>
                <div className="mt-6 flex flex-col items-start gap-6 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <h2
                            id={`${id}-title`}
                            className="font-display italic leading-[0.95] tracking-tight text-[clamp(2.75rem,7vw,5rem)]"
                        >
                            {title}
                            <span className="text-primary not-italic">.</span>
                        </h2>
                        <p
                            id={`${id}-desc`}
                            className="mt-3 max-w-prose text-sm sm:text-base text-muted-foreground"
                        >
                            {description}
                        </p>
                    </div>
                    {action}
                </div>
            </Reveal>
        </header>
    );
}
