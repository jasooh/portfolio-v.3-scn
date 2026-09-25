// AnimatedLoading.tsx
// animated loading screen with transition.

"use client";

import React, {Suspense, useEffect, useMemo, useState} from "react";
import {AnimatePresence, motion} from "framer-motion";

type Props = {
    children: React.ReactNode;
    /** overlay is never dismissed before this */
    minDuration?: number;
    /** overlay is always dismissed by this, however slow the holders are */
    maxDuration?: number;
    fadeOutMs?: number;
};

// lets the hero start its entrance when the overlay leaves, instead of
// guessing a delay that would drift if the timings change.
const IntroReadyContext = React.createContext(true);

export function useIntroReady() {
    return React.useContext(IntroReadyContext);
}

type Gate = { hold: () => () => void };

const GateContext = React.createContext<Gate | null>(null);

// keeps the overlay up until `ready` turns true. call it from a component that
// mounts immediately, not from a lazily imported one, or the hold arrives after
// the floor has already elapsed and does nothing.
export function useIntroHold(ready: boolean) {
    const gate = React.useContext(GateContext);
    useEffect(() => {
        if (!gate || ready) return;
        return gate.hold();
    }, [gate, ready]);
}

export default function AnimatedLoading(
    {
        children,
        minDuration = 300,
        maxDuration = 2500,
        fadeOutMs = 300,
    }: Props) {
    // this component isn’t mounted until suspense resolves
    const [showOverlay, setShowOverlay] = useState(true);
    const [floorPassed, setFloorPassed] = useState(false);
    const [pending, setPending] = useState(0);
    const [mountedAt] = useState(() => Date.now());

    const gate = useMemo<Gate>(() => ({
        hold: () => {
            setPending((n) => n + 1);
            let released = false;
            return () => {
                if (released) return;   // strict mode invokes cleanups twice
                released = true;
                setPending((n) => n - 1);
            };
        },
    }), []);

    const remaining = (ms: number) => Math.max(0, ms - (Date.now() - mountedAt));

    useEffect(() => {
        const t = setTimeout(() => setFloorPassed(true), remaining(minDuration));
        return () => clearTimeout(t);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mountedAt, minDuration]);

    // the ceiling is the safety net: a failed webgl context or a chunk that
    // never arrives must not leave the page stuck behind the overlay.
    useEffect(() => {
        const t = setTimeout(() => setShowOverlay(false), remaining(maxDuration));
        return () => clearTimeout(t);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mountedAt, maxDuration]);

    useEffect(() => {
        if (floorPassed && pending === 0) setShowOverlay(false);
    }, [floorPassed, pending]);

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
            {/* children render only after Suspense resolves */}
            <GateContext.Provider value={gate}>
                <IntroReadyContext.Provider value={!showOverlay}>
                    {children}
                </IntroReadyContext.Provider>
            </GateContext.Provider>
            {AnimatedOverlay}
        </Suspense>
    );
}
