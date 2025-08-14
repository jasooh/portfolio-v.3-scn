// loading.tsx
// loading page before the site begins.

import React from "react";

export default function Loading() {
    return (
        <div className="fixed inset-0 z-50 grid place-items-center bg-background">
            <div className="animate-pulse text-sm text-muted-foreground">
                <h1 className="relative font-extrabold tracking-tight leading-[1.1] text-[clamp(2.25rem,8vw,4rem)]">
                    <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 select-none blur-sm opacity-80"
                    >
                            j
                        </span>
                    <span className="relative z-10">j.a</span>
                </h1>
            </div>
        </div>
    );
}