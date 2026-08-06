import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useMediaQuery";

/**
 * Static stand-in for the WebGL hero.
 *
 * Used on phones and whenever motion is reduced. It is deliberately not a
 * "loading" placeholder — the 3D chunk is never requested in those cases, so
 * this has to read as a finished piece of art on its own. Pure CSS: gradients,
 * blur and a couple of rings, so it costs essentially nothing to paint.
 */
export function HeroVisualFallback() {
  const reducedMotion = useReducedMotion();

  return (
    <div aria-hidden className="relative flex h-full w-full items-center justify-center">
      {/* Core orb */}
      <motion.div
        className="absolute aspect-square w-[min(72%,320px)] rounded-full opacity-90 blur-[2px]"
        style={{
          background:
            "radial-gradient(circle at 34% 30%, #7ba8ff 0%, #4f6fff 32%, #6d28d9 68%, #2a1a6b 100%)",
          boxShadow: "0 0 90px 10px rgba(79,110,255,0.35)",
        }}
        animate={reducedMotion ? undefined : { y: [0, -14, 0], scale: [1, 1.03, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Specular highlight, so the orb reads as a lit sphere rather than a disc */}
      <div
        className="absolute aspect-square w-[min(72%,320px)] rounded-full mix-blend-screen"
        style={{
          background:
            "radial-gradient(circle at 30% 24%, rgba(255,255,255,0.55) 0%, transparent 38%)",
        }}
      />

      {/* Orbiting rings echo the torus geometry in the WebGL scene */}
      <motion.div
        className="absolute aspect-square w-[min(94%,430px)] rounded-full border border-violet-400/30"
        style={{ transform: "rotateX(72deg)" }}
        animate={reducedMotion ? undefined : { rotate: 360 }}
        transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute aspect-square w-[min(108%,500px)] rounded-full border border-blue-400/20"
        style={{ transform: "rotateX(68deg) rotateZ(24deg)" }}
        animate={reducedMotion ? undefined : { rotate: -360 }}
        transition={{ duration: 38, repeat: Infinity, ease: "linear" }}
      />

      {/* Ambient wash */}
      <div className="absolute inset-0 rounded-full bg-blue-500/10 blur-3xl" />
    </div>
  );
}
