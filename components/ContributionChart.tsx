// ContributionChart.tsx
// a year of github contributions as weekly columns, plotted like a
// measurement: hairline baseline and grid, month ticks, the peak labelled,
// and the exact week on hover. sized to its tile, so it never scrolls.

"use client";

import React from "react";
import type { ContributionWeek } from "@/lib/github";

const MONTH = new Intl.DateTimeFormat("en", { month: "short", timeZone: "UTC" });
const DAY = new Intl.DateTimeFormat("en", { month: "short", day: "numeric", timeZone: "UTC" });

const date = (iso: string) => new Date(`${iso}T00:00:00Z`);

// rounds the scale's top up to a clean step with an even half, so the grid
// reads easily without wasting the plot's height
function niceMax(n: number) {
    if (n <= 1) return 2;
    const pow = 10 ** Math.floor(Math.log10(n));
    const step = [1.2, 1.6, 2, 3, 4, 5, 6, 8, 10].find((m) => m * pow >= n) ?? 10;
    return Math.round(step * pow);
}

const plural = (n: number) => `${n} contribution${n === 1 ? "" : "s"}`;

export default function ContributionChart({ weeks }: { weeks: ContributionWeek[] }) {
    const [hover, setHover] = React.useState<number | null>(null);
    const n = weeks.length;
    const peak = Math.max(...weeks.map((w) => w.count));
    const peakIndex = weeks.findIndex((w) => w.count === peak);
    const top = niceMax(peak);

    // a tick wherever a new month starts, skipping one that would crowd the last
    const months: { i: number; label: string }[] = [];
    weeks.forEach((w, i) => {
        const m = date(w.start).getUTCMonth();
        if (i === 0 || m !== date(weeks[i - 1].start).getUTCMonth()) {
            const prev = months[months.length - 1];
            if (!prev || i - prev.i >= 3) months.push({ i, label: MONTH.format(date(w.start)).toLowerCase() });
        }
    });

    const hovered = hover === null ? null : weeks[hover];
    // keep the tooltip on the plot near either edge
    const tipAlign =
        hover === null ? "" : hover < n / 5 ? "left-0" : hover > (n * 4) / 5 ? "right-0" : "left-1/2 -translate-x-1/2";

    return (
        <figure className="flex flex-col gap-2">
            <div className="flex gap-3">
                {/* y axis: two clean ticks, the zero lives on the baseline */}
                <div aria-hidden="true" className="relative w-6 shrink-0 font-mono text-[10px] text-muted-foreground">
                    <span className="absolute right-0 top-0 -translate-y-1/2">{top}</span>
                    <span className="absolute right-0 top-1/2 -translate-y-1/2">{top / 2}</span>
                    <span className="absolute right-0 bottom-0 translate-y-1/2">0</span>
                </div>

                <div className="relative h-36 min-w-0 flex-1" onMouseLeave={() => setHover(null)}>
                    {/* recessive grid: hairlines at the top and half, solid baseline */}
                    <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-border" />
                    <div aria-hidden="true" className="absolute inset-x-0 top-1/2 h-px bg-border" />
                    <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-rule" />

                    <div aria-hidden="true" className="absolute inset-0 flex items-end gap-[2px]">
                        {weeks.map((w, i) => {
                            const active = hover === i;
                            return (
                                // the whole column is the hit target, not just the bar
                                <div
                                    key={w.start}
                                    className="relative flex h-full min-w-0 flex-1 items-end justify-center"
                                    onMouseEnter={() => setHover(i)}
                                >
                                    {active && <div className="absolute inset-y-0 w-full bg-foreground/[0.04]" />}
                                    {w.count > 0 ? (
                                        <div
                                            className={`relative w-full max-w-6 rounded-t-[2px] transition-colors ${
                                                active ? "bg-foreground" : "bg-primary"
                                            }`}
                                            style={{ height: `${(w.count / top) * 100}%` }}
                                        />
                                    ) : (
                                        // an empty week still gets a tick, so gaps read as measured zeros
                                        <div className="relative h-[3px] w-full max-w-6 bg-rule" />
                                    )}
                                    {i === peakIndex && hover === null && (
                                        <span
                                            className="label absolute whitespace-nowrap !text-[10px] !text-foreground"
                                            style={{ bottom: `calc(${(w.count / top) * 100}% + 4px)` }}
                                        >
                                            {peak}
                                        </span>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {hovered && (
                        <div
                            role="status"
                            className={`pointer-events-none absolute -top-2 z-10 -translate-y-full whitespace-nowrap border border-rule bg-background/95 px-2.5 py-1.5 font-mono text-[11px] backdrop-blur-sm ${tipAlign}`}
                            style={tipAlign.includes("left-1/2") ? { left: `${((hover! + 0.5) / n) * 100}%` } : undefined}
                        >
                            <span className="text-muted-foreground">week of {DAY.format(date(hovered.start)).toLowerCase()} · </span>
                            <span className="text-foreground">{plural(hovered.count)}</span>
                        </div>
                    )}
                </div>
            </div>

            {/* x axis: month ticks, every other one on narrow screens */}
            <div aria-hidden="true" className="relative ml-9 h-4">
                {months.map((m, k) => (
                    <span
                        key={m.i}
                        className={`label absolute top-0 !text-[10px] ${k % 2 ? "hidden sm:inline" : ""}`}
                        style={{ left: `${(m.i / n) * 100}%` }}
                    >
                        {m.label}
                    </span>
                ))}
            </div>

            {/* the table view, for screen readers */}
            <table className="sr-only">
                <caption>GitHub contributions per week, last 12 months</caption>
                <thead>
                    <tr>
                        <th scope="col">Week of</th>
                        <th scope="col">Contributions</th>
                    </tr>
                </thead>
                <tbody>
                    {weeks.map((w) => (
                        <tr key={w.start}>
                            <td>{DAY.format(date(w.start))}</td>
                            <td>{w.count}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </figure>
    );
}
