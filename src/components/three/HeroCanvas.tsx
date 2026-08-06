import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { FloatingObject } from "@/components/three/FloatingObject";
import { HeroVisualFallback } from "@/components/three/HeroVisualFallback";

/**
 * Pick a pixel-ratio ceiling from what the device reports.
 *
 * A distorting shader over a full-height canvas is fill-rate bound, so DPR is
 * the single biggest lever — far more than geometry. Read once at module scope:
 * these values never change for the life of the page, and reading them per
 * render would just cause layout thrash.
 */
function adaptiveDpr(): [number, number] {
  if (typeof navigator === "undefined") return [1, 1.5];
  const cores = navigator.hardwareConcurrency ?? 4;
  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 4;
  if (cores <= 4 || memory <= 4) return [1, 1.25];
  if (cores <= 8) return [1, 1.5];
  return [1, 2];
}

export function HeroCanvas() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(true);
  const [failed, setFailed] = useState(false);
  const dpr = useMemo(adaptiveDpr, []);

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

  // Some devices and locked-down browsers refuse a WebGL context entirely.
  // Falling back beats leaving a blank column where the hero visual should be.
  if (failed) return <HeroVisualFallback />;

  return (
    <div ref={wrapperRef} className="h-full w-full">
      <Canvas
        dpr={dpr}
        frameloop={inView ? "always" : "never"}
        onCreated={({ gl }) => {
          gl.domElement.addEventListener("webglcontextlost", (e) => {
            e.preventDefault();
            setFailed(true);
          });
        }}
        fallback={<HeroVisualFallback />}
        gl={{ antialias: dpr[1] <= 1.25 ? false : true, alpha: true, powerPreference: "high-performance" }}
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
