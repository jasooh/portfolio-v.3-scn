// Scene.tsx
// wraps a home page section so scrolling plays it like a product page: the
// section rises and sharpens as it arrives, then recedes as the next takes over.
// it is also the scroll snap target, so stopping near a boundary glides to it.

"use client";

import React from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

type Props = {
    children: React.ReactNode;
    /** skip the arrival half, for the section already on screen at load */
    first?: boolean;
    /** skip the departure half, e.g. for the last section before the footer */
    last?: boolean;
};

export default function Scene({ children, first = false, last = false }: Props) {
    const ref = React.useRef<HTMLDivElement>(null);
    const reduceMotion = useReducedMotion();

    // arrival: from the section's top touching the viewport bottom until it
    // reaches 25% from the top. departure: while its bottom leaves the top half.
    const { scrollYProgress: enter } = useScroll({ target: ref, offset: ["start end", "start 0.25"] });
    const { scrollYProgress: exit } = useScroll({ target: ref, offset: ["end 0.6", "end start"] });

    const enterOpacity = useTransform(enter, [0, 1], [first ? 1 : 0, 1]);
    const enterScale = useTransform(enter, [0, 1], [first ? 1 : 0.92, 1]);
    const enterY = useTransform(enter, [0, 1], [first ? 0 : 120, 0]);

    const exitOpacity = useTransform(exit, [0, 1], [1, last ? 1 : 0.15]);
    const exitScale = useTransform(exit, [0, 1], [1, last ? 1 : 0.94]);

    // the two halves multiply, so a short section can be doing both at once
    const opacity = useTransform(() => enterOpacity.get() * exitOpacity.get());
    const scale = useTransform(() => enterScale.get() * exitScale.get());

    return (
        <div ref={ref} data-scene className="relative">
            <motion.div
                style={reduceMotion ? undefined : { opacity, scale, y: enterY }}
                className="origin-top will-change-transform"
            >
                {children}
            </motion.div>
        </div>
    );
}
