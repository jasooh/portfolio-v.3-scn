// NavDock.tsx
// floating bottom dock. hidden over the hero, and highlights the section in view.

"use client";

import React from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { IoHome, IoCodeSlash, IoBriefcase, IoSparkles, IoDocumentTextSharp } from "react-icons/io5";

const LINKS = [
    { id: "home", label: "home", Icon: IoHome },
    { id: "projects", label: "projects", Icon: IoCodeSlash },
    { id: "experience", label: "experience", Icon: IoBriefcase },
    { id: "more", label: "more", Icon: IoSparkles },
];

const ITEM_CLASS = "relative flex items-center justify-center rounded-full p-2.5 duration-200";

// the icons carry no visible label, so hover and focus surface one
function DockTooltip({ show, children }: { show: boolean; children: React.ReactNode }) {
    return (
        <span className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 pb-2">
            <AnimatePresence>
                {show && (
                    <motion.span
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 4 }}
                        transition={{ duration: 0.15 }}
                        className="block whitespace-nowrap rounded-md border border-white/10 bg-background/90 px-2 py-1 text-xs text-foreground shadow-md backdrop-blur-md"
                    >
                        {children}
                    </motion.span>
                )}
            </AnimatePresence>
        </span>
    );
}

export default function NavDock({ resumeUrl }: { resumeUrl?: string | null }) {
    const [active, setActive] = React.useState("home");
    const [visible, setVisible] = React.useState(false);
    const [hovered, setHovered] = React.useState<string | null>(null);
    const reduceMotion = useReducedMotion();

    // reveal once the hero is mostly off screen
    React.useEffect(() => {
        const hero = document.getElementById("home");
        if (!hero) {
            setVisible(true);
            return;
        }
        const observer = new IntersectionObserver(
            ([entry]) => setVisible(!entry.isIntersecting),
            { threshold: 0.35 }
        );
        observer.observe(hero);
        return () => observer.disconnect();
    }, []);

    // rootMargin biases "current" toward the middle of the viewport
    React.useEffect(() => {
        const sections = LINKS
            .map(({ id }) => document.getElementById(id))
            .filter((el): el is HTMLElement => el !== null);
        if (sections.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const top = entries
                    .filter((e) => e.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
                if (top) setActive(top.target.id);
            },
            { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] }
        );
        sections.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    const spring = reduceMotion
        ? { duration: 0 }
        : { type: "spring" as const, stiffness: 420, damping: 34, mass: 0.7 };

    const hoverProps = (key: string) => ({
        onMouseEnter: () => setHovered(key),
        onMouseLeave: () => setHovered(null),
        onFocus: () => setHovered(key),
        onBlur: () => setHovered(null),
    });

    return (
        // outer div holds the centering transform so framer can animate its own
        <div className="pointer-events-none fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-1/2 z-40 -translate-x-1/2">
            <AnimatePresence>
                {visible && (
                    <motion.nav
                        aria-label="Primary"
                        initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.9 }}
                        animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
                        exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.9 }}
                        transition={spring}
                        className="pointer-events-auto"
                    >
                        <ul className="flex items-center gap-0.5 rounded-full border border-white/10 bg-background/70 p-1.5 shadow-lg shadow-black/40 backdrop-blur-xl">
                            {LINKS.map(({ id, label, Icon }) => {
                                const isActive = active === id;
                                return (
                                    <li key={id} className="relative">
                                        <DockTooltip show={hovered === id}>{label}</DockTooltip>
                                        <Link
                                            href={`#${id}`}
                                            aria-current={isActive ? "true" : undefined}
                                            {...hoverProps(id)}
                                            className={`${ITEM_CLASS} ${
                                                isActive ? "text-foreground" : "text-gray-400 hover:text-foreground"
                                            }`}
                                        >
                                            {/* layoutId slides the highlight between items */}
                                            {isActive && (
                                                <motion.span
                                                    layoutId="dock-active"
                                                    transition={spring}
                                                    className="absolute inset-0 rounded-full bg-white/10"
                                                />
                                            )}
                                            <Icon aria-hidden="true" className="relative size-5 shrink-0" />
                                            <span className="sr-only">{label}</span>
                                        </Link>
                                    </li>
                                );
                            })}

                            {resumeUrl && (
                                <>
                                    <li aria-hidden="true" className="mx-1 h-5 w-px shrink-0 bg-white/10" />
                                    <li className="relative">
                                        <DockTooltip show={hovered === "resume"}>resume</DockTooltip>
                                        <Link
                                            href={resumeUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label="Open résumé (PDF, opens in a new tab)"
                                            {...hoverProps("resume")}
                                            className={`${ITEM_CLASS} bg-primary/15 text-primary hover:bg-primary/25`}
                                        >
                                            <IoDocumentTextSharp aria-hidden="true" className="size-5 shrink-0" />
                                        </Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </motion.nav>
                )}
            </AnimatePresence>
        </div>
    );
}
