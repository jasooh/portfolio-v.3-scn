// global-error.tsx
// catches failures in the root layout, so it renders its own html/body.
// styled inline because globals.css may not have loaded.

"use client";

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <html lang="en">
            <body
                style={{
                    margin: 0,
                    minHeight: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "1rem",
                    background: "#0b0b0f",
                    color: "#fafafa",
                    fontFamily: "system-ui, sans-serif",
                    textAlign: "center",
                    padding: "1.5rem",
                }}
            >
                <h1 style={{ fontSize: "2rem", margin: 0 }}>something broke.</h1>
                <p style={{ color: "#a1a1aa", margin: 0 }}>
                    that&apos;s on me, not you. try again in a moment.
                </p>
                <button
                    type="button"
                    onClick={reset}
                    style={{
                        border: "1px solid rgba(255,255,255,0.1)",
                        background: "transparent",
                        color: "inherit",
                        borderRadius: "0.75rem",
                        padding: "0.5rem 1rem",
                        cursor: "pointer",
                    }}
                >
                    try again
                </button>
                {error.digest && (
                    <p style={{ color: "#52525b", fontSize: "0.75rem", margin: 0 }}>
                        reference: {error.digest}
                    </p>
                )}
            </body>
        </html>
    );
}
