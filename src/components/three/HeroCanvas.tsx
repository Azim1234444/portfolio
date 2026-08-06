import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { FloatingObject } from "@/components/three/FloatingObject";
import { useReducedMotion } from "@/hooks/useMediaQuery";

/** Cap the device pixel ratio — past ~1.75 the extra fill cost buys nothing here. */
const DPR: [number, number] = [1, 1.75];

export function HeroCanvas() {
  const reducedMotion = useReducedMotion();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(true);

  // R3F's default `frameloop="always"` keeps rendering at 60fps even once the
  // hero has scrolled far off screen — a continuous GPU and battery cost for
  // something nobody can see. Pause it whenever the canvas leaves the viewport.
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "120px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Also stop when the tab is hidden — browsers throttle rAF, but a background
  // tab holding a live WebGL context still costs memory and wakeups.
  useEffect(() => {
    function onVisibility() {
      if (document.hidden) setInView(false);
    }
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  if (reducedMotion) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <div className="h-64 w-64 rounded-full bg-gradient-to-br from-blue-500/30 to-violet-500/30 blur-2xl" />
      </div>
    );
  }

  return (
    <div ref={wrapperRef} className="h-full w-full">
      <Canvas
        dpr={DPR}
        frameloop={inView ? "always" : "never"}
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
    </div>
  );
}
