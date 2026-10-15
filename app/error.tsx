// error.tsx
// route-level error boundary. data/* already degrades on fetch failures, so
// this only catches unexpected render errors.

"use client";

import { useEffect } from "react";
import Link from "next/link";

const ACTION_CLASS =
    "label border border-rule px-4 py-2.5 text-foreground duration-150 hover:border-primary hover:text-primary";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <main className="flex min-h-[100svh] flex-col items-center justify-center gap-6 px-6 text-center">
            <div>
                <h1 className="font-display italic leading-none text-[clamp(2.5rem,8vw,4.5rem)]">
                    something broke<span className="not-italic text-primary">.</span>
                </h1>
                <p className="mt-3 text-sm sm:text-base text-muted-foreground">
                    that&apos;s on me, not you. try again in a moment.
                </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                    type="button"
                    onClick={reset}
                    className={ACTION_CLASS}
                >
                    try again
                </button>
                <Link
                    href="/"
                    className={ACTION_CLASS}
                >
                    go home
                </Link>
            </div>

            {error.digest && (
                <p className="label">reference: {error.digest}</p>
            )}
        </main>
    );
}
