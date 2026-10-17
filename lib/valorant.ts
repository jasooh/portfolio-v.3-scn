// valorant.ts
// competitive rank, recent headshot rate and the last match, from the
// community henrikdev api (riot keeps its own match api to approved apps).
// unofficial, so every piece fails soft to null and sanity's values stand in.

import { unstable_cache } from "next/cache";

const API = "https://api.henrikdev.xyz/valorant";
// matches averaged for the headshot rate
const SAMPLE = 10;

export type ValorantMatch = {
    map: string;
    agent: string | null;
    kills: number;
    deaths: number;
    assists: number;
    won: boolean | null;
    /** rounds as "13–9", from the player's side */
    score: string | null;
    startedAt: string | null;
};

export type ValorantStats = {
    rank: string | null;
    /** 0–100, over the last few competitive matches */
    headshotPercent: number | null;
    lastMatch: ValorantMatch | null;
};

type Stats = { kills?: number; deaths?: number; assists?: number; headshots?: number; bodyshots?: number; legshots?: number };
type ApiMatch = {
    metadata?: { map?: { name?: string }; started_at?: string };
    players?: { name?: string; tag?: string; team_id?: string; agent?: { name?: string }; stats?: Stats }[];
    teams?: { team_id?: string; won?: boolean; rounds?: { won?: number; lost?: number } }[];
};

const same = (a?: string, b?: string) => (a ?? "").toLowerCase() === (b ?? "").toLowerCase();

async function get<T>(path: string, key: string): Promise<T | null> {
    const res = await fetch(`${API}${path}`, { headers: { Authorization: key }, cache: "no-store" });
    if (!res.ok) throw new Error(`${path} status ${res.status}`);
    const body: { data?: T } = await res.json();
    return body.data ?? null;
}

async function fetchValorant(): Promise<ValorantStats | null> {
    const { HENRIKDEV_API_KEY: key, VALORANT_NAME: name, VALORANT_TAG: tag } = process.env;
    const region = process.env.VALORANT_REGION ?? "na";
    if (!key || !name || !tag) return null;

    const who = `${region}/pc/${encodeURIComponent(name)}/${encodeURIComponent(tag)}`;

    // fetched side by side, and each allowed to fail on its own
    const [mmr, matches] = await Promise.all([
        get<{ current?: { tier?: { name?: string } } }>(`/v3/mmr/${who}`, key).catch((err) => {
            console.error("[getValorant] mmr failed:", err);
            return null;
        }),
        get<ApiMatch[]>(`/v4/matches/${who}?mode=competitive&size=${SAMPLE}`, key).catch((err) => {
            console.error("[getValorant] matches failed:", err);
            return null;
        }),
    ]);

    // the player's own line from each match
    const mine = (matches ?? [])
        .map((m) => ({ m, me: m.players?.find((p) => same(p.name, name) && same(p.tag, tag)) }))
        .filter((x): x is { m: ApiMatch; me: NonNullable<typeof x.me> } => Boolean(x.me));

    let headshotPercent: number | null = null;
    const shots = mine.reduce(
        (acc, { me }) => {
            const s = me.stats ?? {};
            acc.head += s.headshots ?? 0;
            acc.all += (s.headshots ?? 0) + (s.bodyshots ?? 0) + (s.legshots ?? 0);
            return acc;
        },
        { head: 0, all: 0 },
    );
    if (shots.all > 0) headshotPercent = Math.round((shots.head / shots.all) * 1000) / 10;

    let lastMatch: ValorantMatch | null = null;
    if (mine[0]) {
        const { m, me } = mine[0];
        const team = m.teams?.find((t) => t.team_id === me.team_id);
        const rounds = team?.rounds;
        lastMatch = {
            map: m.metadata?.map?.name ?? "unknown",
            agent: me.agent?.name ?? null,
            kills: me.stats?.kills ?? 0,
            deaths: me.stats?.deaths ?? 0,
            assists: me.stats?.assists ?? 0,
            won: typeof team?.won === "boolean" ? team.won : null,
            score: rounds && typeof rounds.won === "number" && typeof rounds.lost === "number"
                ? `${rounds.won}–${rounds.lost}`
                : null,
            startedAt: m.metadata?.started_at ?? null,
        };
    }

    const rank = mmr?.current?.tier?.name ?? null;
    if (!rank && headshotPercent === null && !lastMatch) return null;
    return { rank, headshotPercent, lastMatch };
}

// ranked games last half an hour or so; ten minutes keeps it current enough
export const getValorant = unstable_cache(fetchValorant, ["valorant-stats"], { revalidate: 600 });
