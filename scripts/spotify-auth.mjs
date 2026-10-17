// spotify-auth.mjs
// one-time helper: prints the SPOTIFY_REFRESH_TOKEN the site needs.
//
// 1. create an app at https://developer.spotify.com/dashboard and add the
//    redirect uri http://127.0.0.1:8888/callback (spotify rejects "localhost")
// 2. run: SPOTIFY_CLIENT_ID=... SPOTIFY_CLIENT_SECRET=... node scripts/spotify-auth.mjs
// 3. open the printed url, approve, and copy the token from the terminal

import { createServer } from "node:http";

const id = process.env.SPOTIFY_CLIENT_ID;
const secret = process.env.SPOTIFY_CLIENT_SECRET;
if (!id || !secret) {
    console.error("set SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET first");
    process.exit(1);
}

const redirect = "http://127.0.0.1:8888/callback";
const scope = "user-read-currently-playing user-read-recently-played";
const url = new URL("https://accounts.spotify.com/authorize");
url.search = new URLSearchParams({ client_id: id, response_type: "code", redirect_uri: redirect, scope }).toString();

const server = createServer(async (req, res) => {
    const params = new URL(req.url ?? "/", redirect).searchParams;
    const code = params.get("code");
    if (!code) {
        res.end(params.get("error") ?? "no code");
        return;
    }
    const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
            Authorization: `Basic ${Buffer.from(`${id}:${secret}`).toString("base64")}`,
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({ grant_type: "authorization_code", code, redirect_uri: redirect }),
    });
    const data = await tokenRes.json();
    if (data.refresh_token) {
        console.log(`\nSPOTIFY_REFRESH_TOKEN=${data.refresh_token}\n`);
        res.end("done: the refresh token is in your terminal. you can close this tab.");
    } else {
        console.error(data);
        res.end("token exchange failed; see the terminal");
    }
    server.close();
});

server.listen(8888, "127.0.0.1", () => {
    console.log(`open this url and approve:\n\n${url}\n`);
});
