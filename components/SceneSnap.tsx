// SceneSnap.tsx
// glides between scenes like a product page, without ever taking the wheel
// away. the hero hands off to the next scene on the first nudge (a "commit"
// glide, which a turnaround cancels). elsewhere, once you pause with a scene's
// top close to the top of the view, it eases the last stretch (a "magnet"
// glide, which any input cancels). skimming fast, it stays out of the way.

"use client";

import React from "react";
import type Lenis from "lenis";
import { useLenis } from "lenis/react";
import { useReducedMotion } from "framer-motion";
import { SCROLL_PADDING, easeOutExpo } from "@/components/SmoothScroll";
import { glide, type GlideMode } from "@/lib/glide";

// a scene top within this fraction of the viewport below the top pulls forward
const FORWARD = 0.4;
// scrolling back up, a scene top this far above pulls you back to it
const BACKWARD = 0.3;
// how far into the hero a downward scroll must get before it hands off
const HERO_NUDGE = 16;
// a pause this long ends a gesture and invites a settle
const IDLE_MS = 160;
// input this far apart starts a new gesture
const GESTURE_GAP_MS = 300;
// peak speed (px per frame) above which a gesture counts as skimming
const SKIM_SPEED = 18;
const COMMIT_S = 0.8;
const MAGNET_S = 0.7;

export default function SceneSnap() {
    const reduceMotion = useReducedMotion();
    const state = React.useRef({
        timer: undefined as ReturnType<typeof setTimeout> | undefined,
        direction: 0,
        // when the visitor last drove the scroll themselves. anchor jumps
        // from the dock scroll too, and must not be hijacked
        lastInput: 0,
        // fastest the current gesture has moved
        peak: 0,
    });

    function start(l: Lenis, top: number, mode: GlideMode) {
        clearTimeout(state.current.timer);
        if (reduceMotion) {
            l.scrollTo(top, { immediate: true, force: true });
            return;
        }
        glide.mode = mode;
        glide.dir = Math.sign(top - l.scroll);
        l.scrollTo(top, {
            duration: mode === "commit" ? COMMIT_S : MAGNET_S,
            easing: easeOutExpo,
            force: true,
            onComplete: () => {
                glide.mode = null;
            },
        });
    }

    function settle(l: Lenis) {
        const s = state.current;
        if (glide.mode || document.body.hasAttribute("data-scroll-locked")) return;
        if (performance.now() - s.lastInput > GESTURE_GAP_MS + IDLE_MS) return;
        // a fast skim means they're looking for something further on
        if (s.peak > SKIM_SPEED) return;

        const vh = window.innerHeight;
        const tops = Array.from(document.querySelectorAll<HTMLElement>("[data-scene]"))
            .map((el) => el.getBoundingClientRect().top - SCROLL_PADDING);

        let target: number | undefined;
        if (s.direction > 0) {
            target = tops.filter((t) => t > 2 && t < vh * FORWARD).sort((a, b) => a - b)[0];
        } else if (s.direction < 0) {
            target = tops.filter((t) => t < -2 && t > -vh * BACKWARD).sort((a, b) => b - a)[0];
        }
        if (target === undefined) return;

        start(l, l.scroll + target, "magnet");
    }

    useLenis(
        (l) => {
            const s = state.current;
            if (glide.mode) return;
            if (l.direction !== 0) s.direction = l.direction;
            s.peak = Math.max(s.peak, Math.abs(l.velocity));

            // radix marks the body while a dialog holds the scroll
            if (document.body.hasAttribute("data-scroll-locked")) return;
            if (performance.now() - s.lastInput > GESTURE_GAP_MS + 100) return;

            // the hero is one screen with nothing to read past its fold, so the
            // first nudge either way commits to the move
            const scenes = document.querySelectorAll<HTMLElement>("[data-scene]");
            const [hero, next] = [scenes[0], scenes[1]];
            if (hero && next) {
                const heroBottom = hero.offsetTop + hero.offsetHeight;
                const nextTop = next.offsetTop - SCROLL_PADDING;
                if (s.direction > 0 && l.scroll > HERO_NUDGE && l.scroll < nextTop - 2) {
                    start(l, nextTop, "commit");
                    return;
                }
                if (s.direction < 0 && l.scroll > 2 && l.scroll < heroBottom - SCROLL_PADDING - 2) {
                    start(l, 0, "commit");
                    return;
                }
            }

            clearTimeout(s.timer);
            s.timer = setTimeout(() => settle(l), IDLE_MS);
        },
        [reduceMotion],
    );

    React.useEffect(() => {
        const s = state.current;
        const mark = () => {
            const now = performance.now();
            if (now - s.lastInput > GESTURE_GAP_MS) s.peak = 0;
            s.lastInput = now;
        };
        const keys = new Set(["ArrowDown", "ArrowUp", "PageDown", "PageUp", " ", "Home", "End"]);
        const onKey = (e: KeyboardEvent) => {
            if (keys.has(e.key)) mark();
        };
        // capture, so the timestamp is fresh before lenis acts on the same event
        const opts = { passive: true, capture: true };
        window.addEventListener("wheel", mark, opts);
        window.addEventListener("touchmove", mark, opts);
        window.addEventListener("keydown", onKey, true);
        return () => {
            clearTimeout(s.timer);
            window.removeEventListener("wheel", mark, opts);
            window.removeEventListener("touchmove", mark, opts);
            window.removeEventListener("keydown", onKey, true);
        };
    }, []);

    return null;
}
