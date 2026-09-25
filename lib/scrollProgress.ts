// scrollProgress.ts
// module level scroll state for the three.js background. deliberately not react
// state: useFrame reads this every frame, and re-rendering the tree on every
// scroll pixel would be far more expensive than the animation itself.

export const scrollState = { progress: 0 };

// call once from a client component. returns a cleanup.
export function trackScrollProgress() {
    const update = () => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        scrollState.progress = max > 0 ? Math.min(1, window.scrollY / max) : 0;
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
        window.removeEventListener("scroll", update);
        window.removeEventListener("resize", update);
    };
}
