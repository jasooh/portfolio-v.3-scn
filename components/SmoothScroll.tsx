// SmoothScroll.tsx
// inertial page scrolling: wheel input eases toward its target instead of
// stepping, which is most of what makes a product page feel weighty.

"use client";

import React from "react";
import { ReactLenis, useLenis, type LenisRef } from "lenis/react";
import { useReducedMotion } from "framer-motion";
import "lenis/dist/lenis.css";
import { glide } from "@/lib/glide";

// keep in step with SceneSnap and scroll-padding-top in globals.css
export const SCROLL_PADDING = 48;

// a long, soft tail: quick off the mark, then a slow settle
export const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

// in-page links (the dock, the scroll cue) glide too. lenis has its own anchor
// handling, but it measures the section itself, which a Scene may still be
// translating mid-entrance; the untransformed scene wrapper is the true spot.
function AnchorGlide() {
    const lenis = useLenis();
    const reduceMotion = useReducedMotion();

    React.useEffect(() => {
        if (!lenis) return;
        const onClick = (e: MouseEvent) => {
            if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
            const link = (e.target as Element | null)?.closest<HTMLAnchorElement>('a[href^="#"]');
            const id = link?.getAttribute("href")?.slice(1);
            // the skip link stays native, so focus moves with it
            if (!id || id === "main") return;
            const el = document.getElementById(id);
            if (!el) return;

            e.preventDefault();
            const target = el.closest<HTMLElement>("[data-scene]") ?? el;
            const isTop = target === document.querySelector("[data-scene]");
            // a plain number: lenis's element targeting adds its own margins
            const top = isTop ? 0 : target.getBoundingClientRect().top + lenis.scroll - SCROLL_PADDING;
            // a magnet glide: any wheel input takes the scroll straight back
            glide.mode = reduceMotion ? null : "magnet";
            glide.dir = Math.sign(top - lenis.scroll);
            lenis.scrollTo(top, {
                duration: reduceMotion ? 0 : 1.2,
                immediate: !!reduceMotion,
                easing: easeOutExpo,
                force: true,
                onComplete: () => {
                    glide.mode = null;
                },
            });
            history.replaceState(null, "", `#${id}`);
        };
        // capture, so this runs before next/link's own handler, which would
        // otherwise do a native hash jump; it skips once we preventDefault
        document.addEventListener("click", onClick, true);
        return () => document.removeEventListener("click", onClick, true);
    }, [lenis, reduceMotion]);

    return null;
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
    const reduceMotion = useReducedMotion();
    const ref = React.useRef<LenisRef>(null);

    // runs on every wheel/touch event before lenis applies it. a glide never
    // locks the page: the visitor's input either rides along with it or
    // cancels it, depending on the kind of glide (see lib/glide.ts)
    const virtualScroll = React.useCallback(({ deltaY, event }: { deltaY: number; event: Event }) => {
        if (!glide.mode || deltaY === 0) return true;
        const dir = Math.sign(deltaY);
        if (glide.mode === "commit" && dir === glide.dir && event.type.includes("wheel")) {
            // absorbed: returning false alone would let the page scroll natively
            if (event.cancelable) event.preventDefault();
            return false;
        }
        // drop the glide where it is, so this input applies from the current
        // position rather than from the glide's destination
        glide.mode = null;
        const lenis = ref.current?.lenis;
        lenis?.scrollTo(lenis.animatedScroll, { immediate: true, force: true });
        return true;
    }, []);

    return (
        <ReactLenis
            root
            ref={ref}
            options={{
                // quicker to answer than a floaty 0.08, still clearly eased
                lerp: 0.1,
                smoothWheel: !reduceMotion,
                // touch keeps the platform's own momentum
                syncTouch: false,
                virtualScroll,
            }}
        >
            <AnchorGlide />
            {children}
        </ReactLenis>
    );
}
