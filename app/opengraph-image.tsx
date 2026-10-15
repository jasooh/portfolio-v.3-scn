// opengraph-image.tsx
// link preview card, drawn as a drafting sheet to match the site. no remote
// fonts or assets, so it can't fail a build; the monogram is read from disk.

import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Justin Abuyuan — Software Engineering @ Waterloo";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const INK = "#0c0d10";
const BONE = "#e9e6dd";
const MUTED = "#8f8d87";
const PURPLE = "#a48bff";
const RULE = "rgba(233,230,221,0.22)";

// mono-style caps annotation
const label = {
    display: "flex",
    fontSize: 18,
    letterSpacing: "0.18em",
    textTransform: "uppercase" as const,
    color: MUTED,
};

// a + registration mark centred on (x, y)
function Tick({ x, y }: { x: number; y: number }) {
    return (
        <div style={{ position: "absolute", left: x - 14, top: y - 14, width: 28, height: 28, display: "flex" }}>
            <div style={{ position: "absolute", left: 0, top: 13, width: 28, height: 2, backgroundColor: BONE, opacity: 0.6 }} />
            <div style={{ position: "absolute", left: 13, top: 0, width: 2, height: 28, backgroundColor: BONE, opacity: 0.6 }} />
        </div>
    );
}

export default async function Image() {
    const monogram = await readFile(join(process.cwd(), "app/icon0.svg"));
    const monogramSrc = `data:image/svg+xml;base64,${monogram.toString("base64")}`;

    return new ImageResponse(
        (
            <div
                style={{
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    position: "relative",
                    backgroundColor: INK,
                    // minor + major grid, then a purple bloom top right
                    backgroundImage:
                        "radial-gradient(circle at 92% -10%, rgba(164,139,255,0.22) 0%, transparent 45%), " +
                        "linear-gradient(to right, rgba(164,139,255,0.08) 1px, transparent 1px), " +
                        "linear-gradient(to bottom, rgba(164,139,255,0.08) 1px, transparent 1px), " +
                        "linear-gradient(to right, rgba(233,230,221,0.035) 1px, transparent 1px), " +
                        "linear-gradient(to bottom, rgba(233,230,221,0.035) 1px, transparent 1px)",
                    backgroundSize: "100% 100%, 120px 120px, 120px 120px, 24px 24px, 24px 24px",
                    color: BONE,
                }}
            >
                {/* sheet frame */}
                <div style={{ position: "absolute", left: 48, top: 48, right: 48, bottom: 48, border: `2px solid ${RULE}`, display: "flex" }} />
                <Tick x={48} y={48} />
                <Tick x={1152} y={48} />
                <Tick x={48} y={582} />
                <Tick x={1152} y={582} />

                <div style={{ display: "flex", flexDirection: "column", width: "100%", padding: "84px 96px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <div style={label}>sheet 00 — index</div>
                        <div style={label}>43.4723° n, 80.5449° w</div>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 56 }}>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <div style={{ ...label, color: BONE, marginBottom: 8 }}>hey, i&apos;m</div>
                            <div style={{ display: "flex", fontSize: 112, fontWeight: 700, letterSpacing: "-0.045em", lineHeight: 1 }}>
                                justin abuyuan
                                <span style={{ color: PURPLE }}>.</span>
                            </div>
                        </div>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={monogramSrc} width={150} height={150} alt="" />
                    </div>

                    {/* dimension line */}
                    <div style={{ display: "flex", alignItems: "center", marginTop: 44 }}>
                        <div style={{ width: 2, height: 22, backgroundColor: RULE }} />
                        <div style={{ flex: 1, height: 2, backgroundColor: RULE }} />
                        <div style={{ ...label, color: BONE, padding: "0 22px" }}>software engineering @ uwaterloo</div>
                        <div style={{ flex: 1, height: 2, backgroundColor: RULE }} />
                        <div style={{ width: 2, height: 22, backgroundColor: RULE }} />
                    </div>

                    {/* title block */}
                    <div style={{ display: "flex", marginTop: "auto", border: `2px solid ${RULE}` }}>
                        {[
                            ["drawn by", "justin abuyuan"],
                            ["focus", "software · ml"],
                            ["site", "justin-abuyuan.xyz"],
                        ].map(([caption, value], i) => (
                            <div
                                key={caption}
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    flex: 1,
                                    padding: "14px 20px",
                                    borderLeft: i === 0 ? "none" : `2px solid ${RULE}`,
                                }}
                            >
                                <div style={{ ...label, fontSize: 13 }}>{caption}</div>
                                <div style={{ display: "flex", fontSize: 22, marginTop: 6 }}>{value}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        ),
        { ...size }
    );
}
