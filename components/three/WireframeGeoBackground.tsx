// WireframeGeoBackground.tsx
// renders the cool background.

import * as THREE from "three";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";

function WireframeKnot(
    {
        color = "#FFFFF",
        radius = 4,
        tube = 0.9,
        tubularSegments = 96,
        radialSegments = 12,
        p = 2,
        q = 3,
        speed = 0.08,
        position = [0, 0, -6] as [number, number, number],
    }) {
    const ref = useRef<THREE.LineSegments>(null!);

    const edges = useMemo(() => {
        const g = new THREE.TorusKnotGeometry(radius, tube, tubularSegments, radialSegments, p, q);
        const e = new THREE.EdgesGeometry(g, 10);
        g.dispose();
        return e;
    }, [radius, tube, tubularSegments, radialSegments, p, q]);

    useFrame((_, dt) => {
        if (!ref.current) return;
        ref.current.rotation.y += dt * speed;
        ref.current.rotation.x += dt * (speed * 0.4);
    });

    return (
        <lineSegments ref={ref} geometry={edges} position={position}>
            <lineBasicMaterial color={color} transparent opacity={0.85}/>
        </lineSegments>
    );
}

function WireframeIcosahedron(
    {
        color = "#a78bfa",
        radius = 4.6,
        detail = 1,
        speed = 0.05,
        position = [0, 0, -6.5] as [number, number, number],
    }) {
    const ref = useRef<THREE.LineSegments>(null!);

    const edges = useMemo(() => {
        const g = new THREE.IcosahedronGeometry(radius, detail);
        const e = new THREE.EdgesGeometry(g, 10);
        g.dispose();
        return e;
    }, [radius, detail]);

    useFrame((_, dt) => {
        if (!ref.current) return;
        ref.current.rotation.y -= dt * speed;
        ref.current.rotation.z += dt * (speed * 0.3);
    });

    return (
        <lineSegments ref={ref} geometry={edges} position={position}>
            <lineBasicMaterial color={color} transparent opacity={0.6}/>
        </lineSegments>
    );
}

export default function WireframeGeoBackground() {
    return (
        <>
            <WireframeKnot/>
            <WireframeIcosahedron/>
        </>
    );
}
