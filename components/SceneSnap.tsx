// SceneSnap.tsx
// glides between scenes like a product page. the hero hands off to the next
// scene the moment you start scrolling; elsewhere it waits for you to stop,
// then settles on a scene whose top is on screen, in the direction you were
// going. reading mid-section, with no boundary in view, is left alone.

"use client";

import React from "react";
import type Lenis from "lenis";
import { useLenis } from "lenis/react";
import { useReducedMotion } from "framer-motion";
import { SCROLL_PADDING, easeOutExpo } from "@/components/SmoothScroll";

// heading must have climbed above this fraction of the viewport to pull forward
const FORWARD = 0.8;
// scrolling back up, a scene top this far above pulls you back to it
const BACKWARD = 0.55;
// how far into the hero a downward scroll must get before it hands off
const HERO_NUDGE = 24;
const IDLE_MS = 100;
const GLIDE_S = 1.1;

export default function SceneSnap() {
    const reduceMotion = useReducedMotion();
    const state = React.useRef({
        // set while our own glide runs, so it doesn't re-trigger itself
        gliding: false,
        timer: undefined as ReturnType<typeof setTimeout> | undefined,
        direction: 0,
        // when the visitor last drove the scroll themselves. anchor jumps
        // from the dock scroll too, and must not be hijacked
        lastInput: 0,
    });

    useLenis(
        (l) => {
            const s = state.current;
            if (s.gliding) return;
            if (l.direction !== 0) s.direction = l.direction;

            // radix marks the body while a dialog holds the scroll
            if (document.body.hasAttribute("data-scroll-locked")) return;
            if (performance.now() - s.lastInput > 400) return;

            const scenes = Array.from(document.querySelectorAll<HTMLElement>("[data-scene]"));
            const hero = scenes[0];
            const next = scenes[1];

            // the hero is one screen with nothing to read past its fold, so the
            // first nudge either way commits to the move
            if (hero && next) {
                const heroBottom = hero.offsetTop + hero.offsetHeight;
                const nextTop = next.getBoundingClientRect().top + l.scroll - SCROLL_PADDING;
                if (s.direction > 0 && l.scroll > HERO_NUDGE && l.scroll < nextTop - 2) {
                    glide(l, nextTop);
                    return;
                }
                if (s.direction < 0 && l.scroll > 2 && l.scroll < heroBottom - SCROLL_PADDING - 2) {
                    glide(l, 0);
                    return;
                }
            }

            clearTimeout(s.timer);
            s.timer = setTimeout(() => settle(l), IDLE_MS);
        },
        [reduceMotion],
    );

    function glide(l: Lenis, top: number) {
        const s = state.current;
        clearTimeout(s.timer);
        s.gliding = true;
        l.scrollTo(top, {
            duration: reduceMotion ? 0 : GLIDE_S,
            immediate: !!reduceMotion,
            easing: easeOutExpo,
            // wheel input during the glide is swallowed rather than fought
            lock: true,
            force: true,
            onComplete: () => {
                s.gliding = false;
            },
        });
        // an immediate jump completes without an animation frame
        if (reduceMotion) s.gliding = false;
    }

    function settle(l: Lenis) {
        const s = state.current;
        if (s.gliding || document.body.hasAttribute("data-scroll-locked")) return;
        if (performance.now() - s.lastInput > 400 + IDLE_MS) return;

        const vh = window.innerHeight;
        const rects = Array.from(document.querySelectorAll<HTMLElement>("[data-scene]"))
            .map((el) => el.getBoundingClientRect());
        const tops = rects.map((r) => r.top - SCROLL_PADDING);

        let target: number | undefined;
        if (s.direction > 0) {
            // nearest scene top that has entered but not yet reached the top
            target = tops.filter((t) => t > 2 && t < vh * FORWARD).sort((a, b) => a - b)[0];
        } else if (s.direction < 0) {
            // nearest scene top just above the viewport
            target = tops.filter((t) => t < -2 && t > -vh * BACKWARD).sort((a, b) => b - a)[0];
            // or, having backed out of a scene into the tail of the one
            // before: settle on that one. its top if it fits on screen,
            // otherwise its last screenful, so nothing is skipped
            if (target === undefined) {
                const i = tops.findIndex((t) => t > 2 && t < vh * FORWARD);
                if (i > 0) {
                    target = rects[i - 1].height <= vh - SCROLL_PADDING
                        ? tops[i - 1]
                        : rects[i].top - vh;
                }
            }
        }
        if (target === undefined || Math.abs(target) < 2) return;

        glide(l, l.scroll + target);
    }

    React.useEffect(() => {
        const s = state.current;
        const mark = () => {
            s.lastInput = performance.now();
        };
        const keys = new Set(["ArrowDown", "ArrowUp", "PageDown", "PageUp", " ", "Home", "End"]);
        const onKey = (e: KeyboardEvent) => {
            if (keys.has(e.key)) mark();
        };
        window.addEventListener("wheel", mark, { passive: true });
        window.addEventListener("touchmove", mark, { passive: true });
        window.addEventListener("keydown", onKey);
        return () => {
            clearTimeout(s.timer);
            window.removeEventListener("wheel", mark);
            window.removeEventListener("touchmove", mark);
            window.removeEventListener("keydown", onKey);
        };
    }, []);

    return null;
}
