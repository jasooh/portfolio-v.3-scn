// Rule.tsx
// a hairline that draws itself in from the left, like a pen across a straightedge.

"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useIntroReady } from "@/components/AnimatedLoading";

type Props = {
    /** seconds */
    delay?: number;
    on?: "load" | "view";
    className?: string;
};

export default function Rule({ delay = 0, on = "view", className }: Props) {
    const reduceMotion = useReducedMotion();
    const ready = useIntroReady();

    const transition = {
        duration: reduceMotion ? 0 : 1.1,
        delay: reduceMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1] as const,
    };
    const base = `h-px origin-left bg-rule ${className ?? ""}`;

    if (on === "load") {
        return (
            <motion.div
                aria-hidden="true"
                data-reveal
                className={base}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: ready ? 1 : 0 }}
                transition={transition}
            />
        );
    }

    return (
        <motion.div
            aria-hidden="true"
            data-reveal
            className={base}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 1 }}
            transition={transition}
        />
    );
}
