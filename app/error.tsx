// error.tsx
// route-level error boundary. data/* already degrades on fetch failures, so
// this only catches unexpected render errors.

"use client";

import { useEffect } from "react";
import Link from "next/link";

const ACTION_CLASS =
    "rounded-xl border border-white/10 px-4 py-2 hover:bg-white/5 duration-150";

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
                <h1 className="font-extrabold tracking-tight leading-[1.1] text-[clamp(1.75rem,6vw,3rem)]">
                    something broke.
                </h1>
                <p className="mt-3 text-sm sm:text-base text-gray-400">
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
                <p className="text-xs text-gray-600">reference: {error.digest}</p>
            )}
        </main>
    );
}
