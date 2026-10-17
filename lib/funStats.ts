// funStats.ts
// assembles the fun stats parts list: sanity's values, overridden by live
// valorant numbers where the api answered, plus a live-only row for the last
// match. a source that's down just drops back. spotify has its own tile.

import type { PartsRow } from "@/components/PartsList";
import type { More } from "@/sanity/fetch";
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

export function buildFunStats(more: More, valorant: ValorantStats | null): PartsRow[] {
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

    return rows;
}
