// Three Fiber
import * as THREE from "three";
import vertex from "./shaders/vertex";
import fragment from "./shaders/fragment";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function SphereEffect() {
  const circleMesh = useRef<THREE.Mesh>(null!);
  const shaderRef = useRef<THREE.ShaderMaterial>(null!);
  const uniforms = useRef({
    uTime: { value: 0 },
    uFrequency: { value: 50 },
    uPrimaryColor: { value: new THREE.Color("#FFFFFF") },
  });

  useFrame((state, delta) => {
    if (!shaderRef.current) return;
    shaderRef.current.uniforms.uTime.value += delta * 0.5;
    circleMesh.current.rotation.y += delta * 0.1;
  });

  return (
    <mesh ref={circleMesh} position={[0,0,0]}>
      <sphereGeometry args={[5, 40, 40]} />
      <shaderMaterial
        wireframe={true}
        ref={shaderRef}
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={uniforms.current}
      />
    </mesh>
  );
}
