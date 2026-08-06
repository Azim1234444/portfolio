import { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { FloatingObject } from "@/components/three/FloatingObject";
import { useReducedMotion } from "@/hooks/useMediaQuery";

export function HeroCanvas() {
  const reducedMotion = useReducedMotion();
  const dpr = useRef<[number, number]>([1, 1.75]);

  if (reducedMotion) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <div className="h-64 w-64 rounded-full bg-gradient-to-br from-blue-500/30 to-violet-500/30 blur-2xl" />
      </div>
    );
  }

  return (
    <Canvas
      dpr={dpr.current}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 6.4], fov: 42 }}
      className="!touch-none"
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 4, 5]} intensity={1.1} color="#ffffff" />
      <pointLight position={[-4, -2, -2]} intensity={16} color="#8b5cf6" />
      <pointLight position={[3, -3, 3]} intensity={10} color="#4f9cff" />

      <Suspense fallback={null}>
        <FloatingObject />
      </Suspense>
    </Canvas>
  );
}
