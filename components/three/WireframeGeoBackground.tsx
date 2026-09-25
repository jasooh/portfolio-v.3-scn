// WireframeGeoBackground.tsx
// renders the cool background.

import * as THREE from "three";
import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useReducedMotion } from "framer-motion";
import { scrollState } from "@/lib/scrollProgress";

const TAU = Math.PI * 2;

// how far left the composition slides, and how much it grows, across the page.
// the drift is measured for a landscape viewport and scaled down on narrow ones,
// which have far less horizontal room before it leaves the screen entirely.
const DRIFT_X = 7;
const REFERENCE_ASPECT = 1.6;
const GROWTH = 1.1;
const BASE_Z = -6;

// the violet accent drifts toward cyan as you descend
const COLOR_START = new THREE.Color("#a78bfa");
const COLOR_END = new THREE.Color("#22d3ee");

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

// shared wireframe body: takes a geometry factory so the two shapes don't
// duplicate the edge extraction and the frame loop.
function Wireframe({
    build,
    scroll,
    color,
    tint,
    opacity,
    spin,
    scrollSpin,
    position,
}: {
    build: () => THREE.BufferGeometry;
    scroll: React.RefObject<number>;
    color: string;
    /** lerp the material from COLOR_START to COLOR_END on scroll */
    tint?: boolean;
    opacity: number;
    spin: number;
    scrollSpin: number;
    position: [number, number, number];
}) {
    const ref = useRef<THREE.LineSegments>(null!);
    const reduceMotion = useReducedMotion();

    const edges = useMemo(() => {
        const g = build();
        const e = new THREE.EdgesGeometry(g, 10);
        g.dispose();
        return e;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => () => edges.dispose(), [edges]);

    useFrame((_, dt) => {
        if (!ref.current) return;
        const p = scroll.current;
        if (!reduceMotion) {
            ref.current.rotation.y += dt * spin;
            ref.current.rotation.x += dt * spin * 0.4;
        }
        // additive on top of the idle spin, so scrolling visibly winds it round
        ref.current.rotation.z = p * TAU * scrollSpin;
        if (tint) {
            const mat = ref.current.material as THREE.LineBasicMaterial;
            mat.color.copy(COLOR_START).lerp(COLOR_END, p);
        }
    });

    return (
        <lineSegments ref={ref} geometry={edges} position={position}>
            <lineBasicMaterial color={color} transparent opacity={opacity} />
        </lineSegments>
    );
}

export default function WireframeGeoBackground() {
    const scroll = useSmoothedScroll();
    const group = useRef<THREE.Group>(null!);
    const aspect = useThree((state) => state.viewport.aspect);
    const driftX = DRIFT_X * Math.min(1, aspect / REFERENCE_ASPECT);

    useFrame(() => {
        if (!group.current) return;
        const p = scroll.current;
        // children sit at the group origin so scaling grows them in place
        // instead of also pushing them away from the camera
        group.current.position.set(-p * driftX, 0, BASE_Z);
        group.current.scale.setScalar(1 + p * GROWTH);
        group.current.rotation.y = p * TAU * 0.3;
        // everything keys off scroll progress, so scrolling back to the top
        // returns it to centre on its own
    });

    return (
        <group ref={group}>
            <Wireframe
                scroll={scroll}
                build={() => new THREE.TorusKnotGeometry(4, 0.9, 96, 12, 2, 3)}
                color="#ffffff"
                opacity={0.55}
                spin={0.08}
                scrollSpin={1.25}
                position={[0, 0, 0]}
            />
            <Wireframe
                scroll={scroll}
                build={() => new THREE.IcosahedronGeometry(4.6, 1)}
                color="#a78bfa"
                tint
                opacity={0.6}
                spin={-0.05}
                scrollSpin={-1.75}
                position={[0, 0, -0.5]}
            />
        </group>
    );
}
