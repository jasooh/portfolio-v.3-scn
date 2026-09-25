// opengraph-image.tsx
// link preview card. no remote fonts or assets, so it can't fail a build.

import { ImageResponse } from "next/og";
import { siteDescription } from "@/lib/site";

export const alt = "Justin Abuyuan — Software Engineering @ Waterloo";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    backgroundColor: "#0b0b0f",
                    backgroundImage:
                        "radial-gradient(circle at 15% 20%, #3b1f7a 0%, transparent 45%), " +
                        "radial-gradient(circle at 85% 85%, #1e1b4b 0%, transparent 50%)",
                    padding: "80px",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        fontSize: 30,
                        color: "#a1a1aa",
                        marginBottom: 12,
                    }}
                >
                    hey, i&apos;m
                </div>
                <div
                    style={{
                        display: "flex",
                        fontSize: 92,
                        fontWeight: 800,
                        color: "#fafafa",
                        letterSpacing: "-0.03em",
                        lineHeight: 1.05,
                    }}
                >
                    justin abuyuan.
                </div>
                <div
                    style={{
                        display: "flex",
                        fontSize: 38,
                        color: "#c4b5fd",
                        marginTop: 20,
                    }}
                >
                    software engineering @ uwaterloo
                </div>
                <div
                    style={{
                        display: "flex",
                        fontSize: 26,
                        color: "#71717a",
                        marginTop: 40,
                        maxWidth: 900,
                    }}
                >
                    {siteDescription}
                </div>
            </div>
        ),
        { ...size }
    );
}
