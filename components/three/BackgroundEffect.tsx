// BackgroundEffect.tsx
// styling for the wireframe background.

"use client";

import React from "react";
import dynamic from "next/dynamic";
import { useIntroHold } from "@/components/AnimatedLoading";

// decorative: nothing to server render, and no reason to ship three.js
// before the page is interactive.
const BackgroundScene = dynamic(() => import("./BackgroundScene"), {
    ssr: false,
});

export default function BackgroundEffect() {
    const [sceneReady, setSceneReady] = React.useState(false);

    // the hold is registered here rather than inside BackgroundScene: this
    // wrapper mounts on the first client render, while the scene arrives with
    // its chunk and would be too late to hold anything.
    useIntroHold(sceneReady);

    return (
        <div className="fixed w-screen h-screen flex items-center opacity-20 sm:opacity-40 justify-center pointer-events-none z-[-999]">
            <BackgroundScene onReady={() => setSceneReady(true)} />
        </div>
    );
}
