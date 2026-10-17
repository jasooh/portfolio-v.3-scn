// funStats.ts
// assembles the fun stats parts list from sanity's values, in table order.

import type { PartsRow } from "@/components/PartsList";
import type { More } from "@/sanity/fetch";

export function buildFunStats(more: More): PartsRow[] {
    return [
        { value: more.hackathons, label: "hackathons" },
        { value: more.redbulls, label: "red bulls" },
        { value: more.valorantRank, label: "valorant rank" },
        { value: more.headshotPercent, label: "headshot", kind: "bar" },
        { value: more.osuRank, label: "osu! rank" },
        // the stat that changes most often gets the caret
        { value: more.currentObsession, label: "obsessed w/", kind: "cursor" },
    ];
}
