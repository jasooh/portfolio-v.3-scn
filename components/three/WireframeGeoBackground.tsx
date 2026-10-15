// WireframeGeoBackground.tsx
// renders the background: an abstract gyroscope of hairline rings around a
// small octahedron, like a construction drawing of an armillary sphere.

import * as THREE from "three";
import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useReducedMotion } from "framer-motion";
import { scrollState } from "@/lib/scrollProgress";

const TAU = Math.PI * 2;

// how far left the composition slides, and how much it grows, across the page.
// the drift is measured for a landscape viewport and scaled down on narrow ones,
// which have far less horizontal room before it leaves the screen entirely.
const DRIFT_X = 6;
const REFERENCE_ASPECT = 1.6;
const GROWTH = 0.6;
const BASE_Z = -6;

const BONE = "#e9e6dd";
const PURPLE = "#a48bff";

// smooths the raw scroll value, so flicks ease rather than snap and returning
// to the top glides back to centre instead of teleporting
function useSmoothedScroll() {
    const value = useRef(0);
    useFrame((_, dt) => {
        const k = 1 - Math.pow(0.001, dt); // frame rate independent lerp
        value.current += (scrollState.progress - value.current) * k;
    });
    return value;
}

// a closed circle in the xy plane
function useCircle(radius: number, segments = 160) {
    const geometry = useMemo(() => {
        const pts: THREE.Vector3[] = [];
        for (let i = 0; i < segments; i++) {
            const a = (i / segments) * TAU;
            pts.push(new THREE.Vector3(Math.cos(a) * radius, Math.sin(a) * radius, 0));
        }
        return new THREE.BufferGeometry().setFromPoints(pts);
    }, [radius, segments]);
    useEffect(() => () => geometry.dispose(), [geometry]);
    return geometry;
}

// one ring of the gyroscope. `tilt` is its resting orientation; scrolling
// opens each ring further along `spread`, so the rings fan apart as you descend.
function Ring({
    scroll,
    radius,
    tilt,
    spread,
    color,
    opacity,
    dashed = false,
}: {
    scroll: React.RefObject<number>;
    radius: number;
    tilt: [number, number, number];
    spread: [number, number, number];
    color: string;
    opacity: number;
    dashed?: boolean;
}) {
    const ref = useRef<THREE.LineLoop>(null!);
    const geometry = useCircle(radius);

    // dashes are measured along the line, so the distances must exist first
    useEffect(() => {
        if (dashed) ref.current?.computeLineDistances();
    }, [dashed, geometry]);

    useFrame(() => {
        if (!ref.current) return;
        const p = scroll.current;
        ref.current.rotation.set(
            tilt[0] + spread[0] * p,
            tilt[1] + spread[1] * p,
            tilt[2] + spread[2] * p,
        );
    });

    return (
        <lineLoop ref={ref} geometry={geometry}>
            {dashed ? (
                <lineDashedMaterial color={color} transparent opacity={opacity} dashSize={0.18} gapSize={0.14} />
            ) : (
                <lineBasicMaterial color={color} transparent opacity={opacity} />
            )}
        </lineLoop>
    );
}

// the solid at the centre: the only thing that spins on its own
function Core({ scroll }: { scroll: React.RefObject<number> }) {
    const ref = useRef<THREE.LineSegments>(null!);
    const reduceMotion = useReducedMotion();

    const edges = useMemo(() => {
        const g = new THREE.OctahedronGeometry(1.1, 0);
        const e = new THREE.EdgesGeometry(g);
        g.dispose();
        return e;
    }, []);
    useEffect(() => () => edges.dispose(), [edges]);

    useFrame((_, dt) => {
        if (!ref.current) return;
        if (!reduceMotion) ref.current.rotation.y += dt * 0.25;
        ref.current.rotation.x = 0.4 + scroll.current * TAU * 0.5;
    });

    return (
        <lineSegments ref={ref} geometry={edges}>
            <lineBasicMaterial color={PURPLE} transparent opacity={0.85} />
        </lineSegments>
    );
}

export default function WireframeGeoBackground() {
    const scroll = useSmoothedScroll();
    const group = useRef<THREE.Group>(null!);
    const reduceMotion = useReducedMotion();
    const aspect = useThree((state) => state.viewport.aspect);
    const driftX = DRIFT_X * Math.min(1, aspect / REFERENCE_ASPECT);

    useFrame((state) => {
        if (!group.current) return;
        const p = scroll.current;
        // children sit at the group origin so scaling grows them in place
        // instead of also pushing them away from the camera
        group.current.position.set(-p * driftX, 0, BASE_Z);
        group.current.scale.setScalar(1 + p * GROWTH);
        // a slow precession keeps it alive at rest; scroll winds it further
        const idle = reduceMotion ? 0 : state.clock.elapsedTime * 0.04;
        group.current.rotation.set(0.25, idle + p * TAU * 0.25, 0);
    });

    return (
        <group ref={group}>
            {/* equator and two meridians, plus a dashed outer orbit */}
            <Ring scroll={scroll} radius={4.2} tilt={[Math.PI / 2, 0, 0]} spread={[0.6, 0, 0]} color={BONE} opacity={0.5} />
            <Ring scroll={scroll} radius={4.2} tilt={[0, 0, 0]} spread={[0, 0.9, 0]} color={BONE} opacity={0.35} />
            <Ring scroll={scroll} radius={4.2} tilt={[0, Math.PI / 2, 0.4]} spread={[0, -0.7, 0.5]} color={PURPLE} opacity={0.6} />
            <Ring scroll={scroll} radius={5.6} tilt={[1.2, 0.3, 0]} spread={[-0.4, 0, 0.8]} color={BONE} opacity={0.3} dashed />
            <Core scroll={scroll} />
        </group>
    );
}
