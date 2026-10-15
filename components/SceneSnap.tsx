// SceneSnap.tsx
// glides between scenes on the browser's own scrolling, without ever taking
// the wheel away. the hero hands off to the next scene on the first nudge (a
// "commit" glide: more wheel the same way rides along, turning around cancels
// it). elsewhere, once you pause with a scene's top close to the top of the
// view, it eases the last stretch (a "magnet" glide, which any input cancels,
// as the browser does natively). skimming fast, it stays out of the way.
// it also routes in-page links, so they land on the scene exactly.

"use client";

import React from "react";
import { useReducedMotion } from "framer-motion";

// keep in step with scroll-padding-top in globals.css
const PADDING = 48;
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
// peak speed (px per ms) above which a gesture counts as skimming
const SKIM_SPEED = 2.5;
// longest a native smooth scroll is assumed to take, where scrollend is missing
const GLIDE_TIMEOUT_MS = 1200;

type Mode = "commit" | "magnet";

export default function SceneSnap() {
    const reduceMotion = useReducedMotion();

    React.useEffect(() => {
        const s = {
            mode: null as Mode | null,
            dir: 0,
            glideTimer: undefined as ReturnType<typeof setTimeout> | undefined,
            idleTimer: undefined as ReturnType<typeof setTimeout> | undefined,
            direction: 0,
            lastY: window.scrollY,
            lastT: performance.now(),
            // when the visitor last drove the scroll themselves. programmatic
            // scrolls (links, our own glides) must not trigger more glides
            lastInput: 0,
            // fastest the current gesture has moved
            peak: 0,
        };

        const end = () => {
            s.mode = null;
            clearTimeout(s.glideTimer);
        };

        const start = (top: number, mode: Mode) => {
            clearTimeout(s.idleTimer);
            if (Math.abs(top - window.scrollY) < 2) return;
            if (reduceMotion) {
                window.scrollTo({ top, behavior: "auto" });
                return;
            }
            s.mode = mode;
            s.dir = Math.sign(top - window.scrollY);
            window.scrollTo({ top, behavior: "smooth" });
            clearTimeout(s.glideTimer);
            s.glideTimer = setTimeout(end, GLIDE_TIMEOUT_MS);
        };

        const sceneTop = (el: Element) => el.getBoundingClientRect().top + window.scrollY - PADDING;

        const settle = () => {
            if (s.mode || document.body.hasAttribute("data-scroll-locked")) return;
            if (performance.now() - s.lastInput > GESTURE_GAP_MS + IDLE_MS) return;
            // a fast skim means they're looking for something further on
            if (s.peak > SKIM_SPEED) return;

            const vh = window.innerHeight;
            const offsets = Array.from(document.querySelectorAll("[data-scene]"))
                .map((el) => sceneTop(el) - window.scrollY);

            let target: number | undefined;
            if (s.direction > 0) {
                target = offsets.filter((t) => t > 2 && t < vh * FORWARD).sort((a, b) => a - b)[0];
            } else if (s.direction < 0) {
                target = offsets.filter((t) => t < -2 && t > -vh * BACKWARD).sort((a, b) => b - a)[0];
            }
            if (target !== undefined) start(window.scrollY + target, "magnet");
        };

        const onScroll = () => {
            const y = window.scrollY;
            const t = performance.now();
            const dy = y - s.lastY;
            if (dy !== 0 && !s.mode) {
                s.direction = Math.sign(dy);
                s.peak = Math.max(s.peak, Math.abs(dy) / Math.max(1, t - s.lastT));
            }
            s.lastY = y;
            s.lastT = t;
            if (s.mode) return;

            // radix marks the body while a dialog holds the scroll
            if (document.body.hasAttribute("data-scroll-locked")) return;
            if (t - s.lastInput > GESTURE_GAP_MS + 100) return;

            // the hero is one screen with nothing to read past its fold, so the
            // first nudge either way commits to the move
            const scenes = document.querySelectorAll<HTMLElement>("[data-scene]");
            const [hero, next] = [scenes[0], scenes[1]];
            if (hero && next) {
                const heroBottom = hero.offsetTop + hero.offsetHeight;
                const nextTop = next.offsetTop - PADDING;
                if (s.direction > 0 && y > HERO_NUDGE && y < nextTop - 2) {
                    start(nextTop, "commit");
                    return;
                }
                if (s.direction < 0 && y > 2 && y < heroBottom - PADDING - 2) {
                    start(0, "commit");
                    return;
                }
            }

            clearTimeout(s.idleTimer);
            s.idleTimer = setTimeout(settle, IDLE_MS);
        };

        // the visitor's own input. during a commit glide, wheel the same way
        // is absorbed so a flick lands cleanly; anything else hands the scroll
        // back (the browser cancels its own smooth scroll on new input)
        const onWheel = (e: WheelEvent) => {
            const now = performance.now();
            if (now - s.lastInput > GESTURE_GAP_MS) s.peak = 0;
            s.lastInput = now;
            if (!s.mode || e.deltaY === 0) return;
            if (s.mode === "commit" && Math.sign(e.deltaY) === s.dir) {
                e.preventDefault();
                return;
            }
            end();
        };
        const onTouch = () => {
            s.lastInput = performance.now();
            end();
        };
        const keys = new Set(["ArrowDown", "ArrowUp", "PageDown", "PageUp", " ", "Home", "End"]);
        const onKey = (e: KeyboardEvent) => {
            if (!keys.has(e.key)) return;
            s.lastInput = performance.now();
            end();
        };

        // in-page links (the dock, the scroll cue) glide to the scene wrapper,
        // which is never transformed; the section inside may still be mid
        // entrance, which would throw a native jump off. capture, so this runs
        // before next/link, which skips its own jump once we preventDefault
        const onClick = (e: MouseEvent) => {
            if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
            const link = (e.target as Element | null)?.closest<HTMLAnchorElement>('a[href^="#"]');
            const id = link?.getAttribute("href")?.slice(1);
            // the skip link stays native, so focus moves with it
            if (!id || id === "main") return;
            const el = document.getElementById(id);
            if (!el) return;
            e.preventDefault();
            const scene = el.closest("[data-scene]") ?? el;
            const top = scene === document.querySelector("[data-scene]") ? 0 : sceneTop(scene);
            start(top, "magnet");
            history.replaceState(null, "", `#${id}`);
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("scrollend", end);
        window.addEventListener("wheel", onWheel, { passive: false });
        window.addEventListener("touchstart", onTouch, { passive: true });
        window.addEventListener("keydown", onKey);
        document.addEventListener("click", onClick, true);
        return () => {
            clearTimeout(s.idleTimer);
            clearTimeout(s.glideTimer);
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("scrollend", end);
            window.removeEventListener("wheel", onWheel);
            window.removeEventListener("touchstart", onTouch);
            window.removeEventListener("keydown", onKey);
            document.removeEventListener("click", onClick, true);
        };
    }, [reduceMotion]);

    return null;
}
