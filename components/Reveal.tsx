// Reveal.tsx
// entrance transitions. on="load" fires when the loading overlay clears,
// on="view" fires the first time the block is scrolled to.

"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useIntroReady } from "@/components/AnimatedLoading";

type Props = {
    children: React.ReactNode;
    /** seconds; stagger siblings by bumping this */
    delay?: number;
    on?: "load" | "view";
    /** travel distance in px */
    y?: number;
    /** starting blur radius in px */
    blur?: number;
    className?: string;
};

export default function Reveal({
    children,
    delay = 0,
    on = "view",
    y = 20,
    blur = 8,
    className,
}: Props) {
    const reduceMotion = useReducedMotion();
    const ready = useIntroReady();

    // reduced motion keeps the fade but drops the travel and the blur
    const hidden = reduceMotion
        ? { opacity: 0 }
        : { opacity: 0, y, filter: `blur(${blur}px)` };
    const shown = reduceMotion
        ? { opacity: 1 }
        : { opacity: 1, y: 0, filter: "blur(0px)" };

    const transition = {
        duration: reduceMotion ? 0 : 0.6,
        delay: reduceMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1] as const,
    };

    if (on === "load") {
        return (
            <motion.div
                data-reveal
                className={className}
                initial={hidden}
                animate={ready ? shown : hidden}
                transition={transition}
            >
                {children}
            </motion.div>
        );
    }

    return (
        <motion.div
            data-reveal
            className={className}
            initial={hidden}
            whileInView={shown}
            // once, so scrolling back up doesn't replay everything
            viewport={{ once: true, amount: 0.2 }}
            transition={transition}
        >
            {children}
        </motion.div>
    );
}
