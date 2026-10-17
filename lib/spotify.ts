// spotify.ts
// what's playing on spotify right now (or the last track if nothing is), plus
// the few tracks before it. authenticates as the site owner with a long-lived
// refresh token (get one with scripts/spotify-auth.mjs), so it runs server side
// only. fails soft to null.

import { unstable_cache } from "next/cache";

export type SpotifyTrack = {
    title: string;
    artist: string;
    album: string | null;
    /** album art, ~300px square */
    image: string | null;
    url: string;
};

export type SpotifyNow = {
    track: SpotifyTrack;
    playing: boolean;
    /** iso time it was last played; null while playing or paused */
    playedAt: string | null;
    /** the tracks played before it, newest first */
    recent: (SpotifyTrack & { playedAt: string | null })[];
};

const RECENT = 5;

type ApiTrack = {
    id?: string;
    name?: string;
    artists?: { name?: string }[];
    album?: { name?: string; images?: { url?: string; width?: number }[] };
    external_urls?: { spotify?: string };
};

function toTrack(t: ApiTrack | undefined): SpotifyTrack | null {
    if (!t?.name) return null;
    // images come largest first; the ~300px one is plenty for the tile
    const images = t.album?.images ?? [];
    const image = images.find((i) => (i.width ?? 0) <= 320)?.url ?? images[0]?.url ?? null;
    return {
        title: t.name,
        artist: (t.artists ?? []).map((a) => a.name).filter(Boolean).join(", "),
        album: t.album?.name ?? null,
        image,
        url: t.external_urls?.spotify ?? "https://open.spotify.com",
    };
}

async function accessToken(id: string, secret: string, refresh: string) {
    const res = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
            Authorization: `Basic ${Buffer.from(`${id}:${secret}`).toString("base64")}`,
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({ grant_type: "refresh_token", refresh_token: refresh }),
        cache: "no-store",
    });
    if (!res.ok) throw new Error(`token status ${res.status}`);
    const data: { access_token?: string } = await res.json();
    if (!data.access_token) throw new Error("no access token");
    return data.access_token;
}

async function fetchSpotify(): Promise<SpotifyNow | null> {
    const { SPOTIFY_CLIENT_ID: id, SPOTIFY_CLIENT_SECRET: secret, SPOTIFY_REFRESH_TOKEN: refresh } = process.env;
    // not configured: the tile simply doesn't show
    if (!id || !secret || !refresh) return null;

    try {
        const token = await accessToken(id, secret, refresh);
        const headers = { Authorization: `Bearer ${token}` };

        const [nowRes, recentRes] = await Promise.all([
            fetch("https://api.spotify.com/v1/me/player/currently-playing", { headers, cache: "no-store" }),
            fetch(`https://api.spotify.com/v1/me/player/recently-played?limit=${RECENT + 1}`, { headers, cache: "no-store" }),
        ]);

        const history = recentRes.ok
            ? ((await recentRes.json()) as { items?: { track?: ApiTrack; played_at?: string }[] }).items ?? []
            : [];
        const recent = history
            .map((i) => {
                const t = toTrack(i.track);
                return t ? { ...t, playedAt: i.played_at ?? null, id: i.track?.id } : null;
            })
            .filter((t): t is NonNullable<typeof t> => t !== null);

        // 204 means nothing is playing; a paused track still counts as current
        if (nowRes.status === 200) {
            const data: { is_playing?: boolean; item?: ApiTrack; currently_playing_type?: string } = await nowRes.json();
            const track = data.currently_playing_type === "track" ? toTrack(data.item) : null;
            if (track) {
                return {
                    track,
                    playing: Boolean(data.is_playing),
                    playedAt: null,
                    // history can already hold the current track; don't list it twice
                    recent: recent.filter((r) => r.id !== data.item?.id).slice(0, RECENT),
                };
            }
        }

        const [last, ...rest] = recent;
        if (!last) return null;
        return {
            track: last,
            playing: false,
            playedAt: last.playedAt,
            recent: rest.slice(0, RECENT),
        };
    } catch (err) {
        console.error("[getSpotify] spotify fetch failed:", err);
        return null;
    }
}

// a minute is fresh enough for "now playing", and keeps regenerations rare
export const getSpotify = unstable_cache(fetchSpotify, ["spotify-now"], { revalidate: 60 });
