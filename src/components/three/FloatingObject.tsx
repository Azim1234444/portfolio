import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sparkles, Torus, Icosahedron } from "@react-three/drei";
import type { Group } from "three";

/** The hero's centerpiece — a distorted core with orbiting rings and sparkles. */
export function FloatingObject() {
  const groupRef = useRef<Group>(null);
  const ringRef = useRef<Group>(null);
  const target = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    target.current.x += (state.pointer.y * 0.3 - target.current.x) * 0.04;
    target.current.y += (state.pointer.x * 0.3 - target.current.y) * 0.04;

    if (groupRef.current) {
      groupRef.current.rotation.x = target.current.x;
      groupRef.current.rotation.y += delta * 0.15 + target.current.y * 0.02;
    }
    if (ringRef.current) {
      ringRef.current.rotation.x += delta * 0.08;
      ringRef.current.rotation.z += delta * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.6} rotationIntensity={0.5} floatIntensity={1.3}>
        <Icosahedron args={[1.35, 5]}>
          <MeshDistortMaterial
            color="#4f6fff"
            attach="material"
            distort={0.42}
            speed={1.6}
            roughness={0.15}
            metalness={0.85}
            emissive="#3a2bff"
            emissiveIntensity={0.25}
          />
        </Icosahedron>
      </Float>

      <group ref={ringRef}>
        <Torus args={[2.15, 0.012, 16, 120]} rotation={[Math.PI / 2.4, 0.4, 0]}>
          <meshStandardMaterial color="#a855f7" emissive="#a855f7" emissiveIntensity={0.6} roughness={0.4} />
        </Torus>
        <Torus args={[2.5, 0.008, 16, 120]} rotation={[Math.PI / 1.8, -0.3, 0.4]}>
          <meshStandardMaterial color="#4f9cff" emissive="#4f9cff" emissiveIntensity={0.5} roughness={0.4} />
        </Torus>
      </group>

      <Sparkles count={60} scale={5.5} size={2.2} speed={0.35} color="#8fb8ff" opacity={0.55} />
    </group>
  );
}
