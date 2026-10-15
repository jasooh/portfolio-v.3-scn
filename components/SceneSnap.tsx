// SceneSnap.tsx
// glides to the next scene once you stop scrolling past a threshold, in the
// direction you were going. css proximity snapping only engages very close to
// a boundary, and mandatory snapping traps you inside tall sections; this only
// acts when a scene's top is on screen, so reading mid-section is left alone.

"use client";

import React from "react";
import { useReducedMotion } from "framer-motion";

// keep in step with scroll-padding-top in globals.css
const PADDING = 48;
// heading must have climbed above this fraction of the viewport to pull forward
const FORWARD = 0.8;
// scrolling back up, a scene top this far above pulls you back to it
const BACKWARD = 0.55;
const IDLE_MS = 140;

export default function SceneSnap() {
    const reduceMotion = useReducedMotion();

    React.useEffect(() => {
        let lastY = window.scrollY;
        let direction = 0;
        let timer: ReturnType<typeof setTimeout> | undefined;
        // set while our own smooth scroll runs, so it doesn't re-trigger itself
        let gliding = false;

        const settle = () => {
            if (gliding) {
                gliding = false;
                return;
            }
            // radix marks the body while a dialog holds the scroll
            if (document.body.hasAttribute("data-scroll-locked")) return;

            const vh = window.innerHeight;
            const rects = Array.from(document.querySelectorAll<HTMLElement>("[data-scene]"))
                .map((el) => el.getBoundingClientRect());
            const tops = rects.map((r) => r.top - PADDING);

            let target: number | undefined;
            if (direction > 0) {
                // nearest scene top that has entered but not yet reached the top
                target = tops.filter((t) => t > 2 && t < vh * FORWARD).sort((a, b) => a - b)[0];
            } else if (direction < 0) {
                // nearest scene top just above the viewport
                target = tops.filter((t) => t < -2 && t > -vh * BACKWARD).sort((a, b) => b - a)[0];
                // or, having backed out of a scene into the tail of the one
                // before: settle on that one. its top if it fits on screen,
                // otherwise its last screenful, so nothing is skipped
                if (target === undefined) {
                    const i = tops.findIndex((t) => t > 2 && t < vh * FORWARD);
                    if (i > 0) {
                        target = rects[i - 1].height <= vh - PADDING
                            ? tops[i - 1]
                            : rects[i].top - vh;
                    }
                }
            }
            // a no-op scroll fires no event, which would leave `gliding` stuck on
            if (target === undefined || Math.abs(target) < 2) return;

            gliding = true;
            window.scrollTo({ top: window.scrollY + target, behavior: reduceMotion ? "auto" : "smooth" });
        };

        const onScroll = () => {
            const y = window.scrollY;
            if (!gliding && y !== lastY) direction = Math.sign(y - lastY);
            lastY = y;
            clearTimeout(timer);
            timer = setTimeout(settle, IDLE_MS);
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        return () => {
            window.removeEventListener("scroll", onScroll);
            clearTimeout(timer);
        };
    }, [reduceMotion]);

    return null;
}
