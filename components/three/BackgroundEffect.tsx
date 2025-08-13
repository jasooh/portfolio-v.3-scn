"use client";

// Components
import SphereEffect from "./SphereEffect";

// Three Fiber
import { Canvas } from "@react-three/fiber";

export default function BackgroundEffect() {
  return (
    <div className="fixed w-screen h-screen flex items-center opacity-40 justify-center pointer-events-none z-[-999]">
      <Canvas>
        <SphereEffect />
      </Canvas>
    </div>
  );
}
