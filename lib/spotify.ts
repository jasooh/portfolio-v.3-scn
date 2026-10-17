// spotify.ts
// what's playing on spotify right now, or the last track if nothing is.
// authenticates as the site owner with a long-lived refresh token (get one with
// scripts/spotify-auth.mjs), so it runs server side only. fails soft to null.

import { unstable_cache } from "next/cache";

export type SpotifyTrack = {
    title: string;
    artist: string;
    url: string;
    playing: boolean;
    /** iso time it was last played; null while playing or paused */
    playedAt: string | null;
};

type ApiTrack = {
    name?: string;
    artists?: { name?: string }[];
    external_urls?: { spotify?: string };
};

function toTrack(t: ApiTrack | undefined, playing: boolean, playedAt: string | null): SpotifyTrack | null {
    if (!t?.name) return null;
    return {
        title: t.name,
        artist: (t.artists ?? []).map((a) => a.name).filter(Boolean).join(", "),
        url: t.external_urls?.spotify ?? "https://open.spotify.com",
        playing,
        playedAt,
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

async function fetchLastPlayed(): Promise<SpotifyTrack | null> {
    const { SPOTIFY_CLIENT_ID: id, SPOTIFY_CLIENT_SECRET: secret, SPOTIFY_REFRESH_TOKEN: refresh } = process.env;
    // not configured: the row simply doesn't show
    if (!id || !secret || !refresh) return null;

    try {
        const token = await accessToken(id, secret, refresh);
        const headers = { Authorization: `Bearer ${token}` };

        // 204 means nothing is playing; a paused track still counts as last played
        const now = await fetch("https://api.spotify.com/v1/me/player/currently-playing", { headers, cache: "no-store" });
        if (now.status === 200) {
            const data: { is_playing?: boolean; item?: ApiTrack; currently_playing_type?: string } = await now.json();
            if (data.currently_playing_type === "track") {
                // paused mid-track: playing false with no playedAt reads as "paused"
                const track = toTrack(data.item, Boolean(data.is_playing), null);
                if (track) return track;
            }
        }

        const recent = await fetch("https://api.spotify.com/v1/me/player/recently-played?limit=1", { headers, cache: "no-store" });
        if (!recent.ok) throw new Error(`recently played status ${recent.status}`);
        const data: { items?: { track?: ApiTrack; played_at?: string }[] } = await recent.json();
        const item = data.items?.[0];
        return toTrack(item?.track, false, item?.played_at ?? null);
    } catch (err) {
        console.error("[getLastPlayed] spotify fetch failed:", err);
        return null;
    }
}

// a minute is fresh enough for "now playing", and keeps regenerations rare
export const getLastPlayed = unstable_cache(fetchLastPlayed, ["spotify-last-played"], { revalidate: 60 });
