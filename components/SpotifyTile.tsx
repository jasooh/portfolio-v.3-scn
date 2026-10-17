// SpotifyTile.tsx
// the full-width "now playing" tile: the current (or last) track large, with
// its album art framed like a figure, and the few tracks before it as a log.

import React from "react";
import Image from "next/image";
import { FaSpotify } from "react-icons/fa";
import { ago } from "@/lib/ago";
import type { SpotifyNow } from "@/lib/spotify";

// tall bouncing bars, the big sibling of the parts list's equaliser
function Equaliser() {
    return (
        <span aria-hidden="true" className="eq inline-flex h-5 items-end gap-[3px] [&>span]:!w-[3px]">
            <span /><span /><span /><span /><span />
        </span>
    );
}

export default function SpotifyTile({ now }: { now: SpotifyNow }) {
    const { track, playing, playedAt, recent } = now;
    const state = playing ? "now playing" : playedAt ? `last played · ${ago(playedAt)}` : "paused";

    return (
        <section aria-labelledby="spotify-title" className="drafted drafted-hover min-w-0 md:col-span-2 lg:col-span-3">
            <div className="grid gap-8 overflow-hidden p-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-10">
                {/* current track */}
                <div className="flex min-w-0 flex-col gap-5">
                    <div className="flex items-center justify-between gap-4">
                        <h3 id="spotify-title" className="label flex items-center gap-2.5">
                            {playing ? <Equaliser /> : <span aria-hidden="true" className="size-1.5 bg-rule" />}
                            <span className={playing ? "text-primary" : undefined}>{state}</span>
                        </h3>
                        <span className="label hidden sm:inline">fig. sp — on rotation</span>
                    </div>

                    <div className="flex min-w-0 items-center gap-5 sm:gap-7">
                        {/* album art, matted inside a hairline frame */}
                        <a
                            href={track.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${track.title} by ${track.artist} on Spotify`}
                            className="group relative shrink-0 border border-border p-1.5 transition-colors hover:border-primary/60"
                        >
                            <div className="relative size-24 overflow-hidden sm:size-36">
                                {track.image ? (
                                    <Image
                                        src={track.image}
                                        alt=""
                                        fill
                                        sizes="144px"
                                        className={`object-cover transition duration-500 group-hover:scale-105 ${playing ? "" : "grayscale-[40%]"}`}
                                    />
                                ) : (
                                    <div className="grid size-full place-items-center bg-muted">
                                        <FaSpotify aria-hidden="true" className="size-8 text-muted-foreground" />
                                    </div>
                                )}
                            </div>
                        </a>

                        <div className="min-w-0">
                            <a
                                href={track.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-display text-[clamp(1.75rem,4vw,3rem)] leading-[0.95] line-clamp-2 transition-colors hover:text-primary"
                            >
                                {track.title}
                            </a>
                            <p className="mt-2 truncate text-foreground/80">{track.artist}</p>
                            {track.album && <p className="label mt-1.5 truncate">{track.album}</p>}
                            <a
                                href={track.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="label mt-4 inline-flex items-center gap-2 border border-rule px-2.5 py-1.5 text-foreground transition-colors hover:border-primary hover:text-primary"
                            >
                                <FaSpotify aria-hidden="true" className="size-3.5" /> open in spotify
                            </a>
                        </div>
                    </div>
                </div>

                {/* the log of what came before */}
                {recent.length > 0 && (
                    <div className="min-w-0 border-t border-border pt-6 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
                        <h4 className="label mb-3">previously</h4>
                        <ol className="font-mono text-xs">
                            {recent.map((r, i) => (
                                <li key={`${i}-${r.url}`} className="flex items-baseline gap-3 border-b border-border py-2 last:border-b-0">
                                    <span className="text-muted-foreground tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                                    <a
                                        href={r.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        title={`${r.title} — ${r.artist}`}
                                        className="min-w-0 flex-1 truncate text-foreground/80 transition-colors hover:text-primary"
                                    >
                                        {r.title.toLowerCase()} <span className="text-muted-foreground">— {r.artist.toLowerCase()}</span>
                                    </a>
                                    {r.playedAt && <span className="shrink-0 text-muted-foreground">{ago(r.playedAt)}</span>}
                                </li>
                            ))}
                        </ol>
                    </div>
                )}
            </div>
        </section>
    );
}
