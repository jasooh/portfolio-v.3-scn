// opengraph-image.tsx
// OG image for socials

import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const runtime = "edge";
export const revalidate = 60 * 60 * 24; // 1 day

export default async function OGImage() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    padding: 64,
                    background:
                        "linear-gradient(135deg, #0b0f1a 0%, #141a2b 50%, #0b0f1a 100%)",
                    color: "white",
                }}
            >
                <div style={{ fontSize: 72, fontWeight: 700, letterSpacing: -1 }}>
                    Justin Abuyuan
                </div>
                <div style={{ fontSize: 36, opacity: 0.9, lineHeight: 1.25 }}>
                    Undergraduate Software Engineering @ UWaterloo
                    <br />
                    Building software & machine intelligence.
                </div>
                <div style={{ fontSize: 28, opacity: 0.7 }}>
                    justin-abuyuan.xyz
                </div>
            </div>
        ),
        size
    );
}
