// AnimatedLoading.tsx
// animated loading screen with transition.

"use client";

import {Suspense, useEffect, useState} from "react";
import {AnimatePresence, motion} from "framer-motion";

type Props = {
    children: React.ReactNode;
    /** Keep the overlay up for at least this long (ms) to avoid flashes */
    minDuration?: number;
    /** Fade-out duration (ms) */
    fadeOutMs?: number;
};

export default function AnimatedLoading(
    {
        children,
        minDuration = 300,
        fadeOutMs = 300,
    }: Props) {
    // This component isn’t mounted until Suspense resolves.
    // Once it mounts, we wait a beat, then fade the overlay out.
    const [showOverlay, setShowOverlay] = useState(true);
    const [mountedAt] = useState(() => Date.now());

    useEffect(() => {
        const elapsed = Date.now() - mountedAt;
        const remain = Math.max(0, minDuration - elapsed);
        const t = setTimeout(() => setShowOverlay(false), remain);
        return () => clearTimeout(t);
    }, [mountedAt, minDuration]);

    // Animated version of the same overlay for the fade-out phase
    const AnimatedOverlay = (
        <AnimatePresence>
            {showOverlay && (
                <motion.div
                    className="fixed inset-0 z-50 grid place-items-center bg-background"
                    initial={{opacity: 1}}
                    exit={{opacity: 0}}
                    transition={{duration: fadeOutMs / 1000}}
                >
                    <div className="animate-pulse text-sm">
                        <h1 className="relative font-extrabold tracking-tight leading-[1.1] text-[clamp(2.25rem,8vw,4rem)]">
                            <span
                                aria-hidden="true"
                                className="pointer-events-none absolute inset-0 select-none blur-sm opacity-80"
                            >
                                j
                            </span>
                            <span className="relative z-10">j</span>
                        </h1>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );

    return (
        <Suspense>
            {/* Children render only after Suspense resolves */}
            {children}
            {AnimatedOverlay}
        </Suspense>
    );
}
