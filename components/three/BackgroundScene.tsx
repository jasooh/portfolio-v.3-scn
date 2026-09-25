// BackgroundScene.tsx
// the canvas itself. split out so three + r3f land in their own lazy chunk.

"use client";

import React from "react";
import { motion } from "framer-motion";
import WireframeGeoBackground from "./WireframeGeoBackground";
import { Canvas } from "@react-three/fiber";
import { trackScrollProgress } from "@/lib/scrollProgress";

export default function BackgroundScene({ onReady }: { onReady?: () => void }) {
    const [ready, setReady] = React.useState(false);

    // feeds the module level value that useFrame reads each frame
    React.useEffect(() => trackScrollProgress(), []);

    // onCreated fires once the gl context exists. it both fades the scene up
    // and tells the loading overlay it no longer has to wait.
    const handleCreated = () => {
        setReady(true);
        onReady?.();
    };

    return (
        <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: ready ? 1 : 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
        >
            <Canvas onCreated={handleCreated}>
                <WireframeGeoBackground />
            </Canvas>
        </motion.div>
    );
}
