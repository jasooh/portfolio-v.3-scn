// funStats.ts
// assembles the fun stats parts list: sanity's values, overridden by live
// valorant numbers where the api answered, plus live-only rows for the last
// match and the last spotify track. a source that's down just drops back.

import type { PartsRow } from "@/components/PartsList";
import type { More } from "@/sanity/fetch";
import type { SpotifyTrack } from "@/lib/spotify";
import type { ValorantStats } from "@/lib/valorant";

// riot's tier names, shortened to fit the qty column ("Platinum 2" -> "plat 2")
const TIER_SHORT: Record<string, string> = {
    platinum: "plat",
    diamond: "dia",
    ascendant: "asc",
    immortal: "imm",
};

function shortRank(rank: string) {
    const [tier, ...rest] = rank.toLowerCase().split(" ");
    return [TIER_SHORT[tier] ?? tier, ...rest].join(" ");
}

// "now", "12m ago", "3h ago", "2d ago"
function ago(iso: string, now = Date.now()) {
    const mins = Math.max(0, Math.round((now - new Date(iso).getTime()) / 60000));
    if (mins < 1) return "now";
    if (mins < 60) return `${mins}m ago`;
    const hours = Math.round(mins / 60);
    if (hours < 48) return `${hours}h ago`;
    return `${Math.round(hours / 24)}d ago`;
}

export function buildFunStats(more: More, valorant: ValorantStats | null, spotify: SpotifyTrack | null): PartsRow[] {
    const rows: PartsRow[] = [
        { value: more.hackathons, label: "hackathons" },
        { value: more.redbulls, label: "red bulls" },
        valorant?.rank
            ? { value: shortRank(valorant.rank), label: "valorant rank", live: true }
            : { value: more.valorantRank, label: "valorant rank" },
        valorant?.headshotPercent != null
            ? { value: `${valorant.headshotPercent}%`, label: "headshot", kind: "bar", live: true }
            : { value: more.headshotPercent, label: "headshot", kind: "bar" },
    ];

    const match = valorant?.lastMatch;
    if (match) {
        const result = match.won === null ? "" : match.won ? " · w" : " · l";
        rows.push({
            value: `${match.kills}/${match.deaths}/${match.assists}`,
            label: `last match · ${match.map.toLowerCase()}${result}${match.score ? ` ${match.score}` : ""}`,
            live: true,
        });
    }

    rows.push(
        { value: more.osuRank, label: "osu! rank" },
        { value: more.currentObsession, label: "obsessed w/", kind: "cursor" },
    );

    if (spotify) {
        rows.push({
            value: spotify.playing ? "now" : spotify.playedAt ? ago(spotify.playedAt) : "paused",
            label: `${spotify.title.toLowerCase()} — ${spotify.artist.toLowerCase()}`,
            kind: spotify.playing ? "eq" : undefined,
            href: spotify.url,
            live: true,
        });
    }

    return rows;
}
