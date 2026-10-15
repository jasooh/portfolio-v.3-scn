// generate-icons.mjs
// renders every raster icon from app/icon0.svg, so the logo has one source.
// run with: node scripts/generate-icons.mjs

import { readFile, writeFile } from "node:fs/promises";
import sharp from "sharp";

const svg = await readFile(new URL("../app/icon0.svg", import.meta.url));
const png = (size) => sharp(svg, { density: 384 }).resize(size, size).png().toBuffer();

const targets = {
    "app/icon1.png": 96,
    "app/apple-icon.png": 180,
    "public/web-app-manifest-192x192.png": 192,
    "public/web-app-manifest-512x512.png": 512,
};
for (const [path, size] of Object.entries(targets)) {
    await writeFile(new URL(`../${path}`, import.meta.url), await png(size));
}

// favicon.ico: a directory of png entries, which every current browser accepts
const sizes = [16, 32, 48];
const images = await Promise.all(sizes.map(png));
const header = Buffer.alloc(6 + 16 * sizes.length);
header.writeUInt16LE(0, 0);             // reserved
header.writeUInt16LE(1, 2);             // type: icon
header.writeUInt16LE(sizes.length, 4);
let offset = header.length;
sizes.forEach((size, i) => {
    const entry = 6 + 16 * i;
    header.writeUInt8(size, entry);     // width
    header.writeUInt8(size, entry + 1); // height
    header.writeUInt16LE(1, entry + 4); // colour planes
    header.writeUInt16LE(32, entry + 6); // bits per pixel
    header.writeUInt32LE(images[i].length, entry + 8);
    header.writeUInt32LE(offset, entry + 12);
    offset += images[i].length;
});
await writeFile(new URL("../app/favicon.ico", import.meta.url), Buffer.concat([header, ...images]));

console.log("icons written");
