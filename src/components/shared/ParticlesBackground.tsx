import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useMediaQuery";
import { useTheme } from "@/context/ThemeProvider";

interface Particle {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  hue: "blue" | "violet" | "white";
  alpha: number;
}

interface ParticlesBackgroundProps {
  className?: string;
  density?: number;
}

/**
 * Per-theme particle colours. The dark set includes near-white specks, which
 * are simply invisible on a light background — so the light set swaps them for
 * a deep slate and darkens the accents enough to register against #f6f6fa.
 */
const COLORS: Record<"dark" | "light", Record<Particle["hue"], string>> = {
  dark: {
    blue: "79, 156, 255",
    violet: "168, 85, 247",
    white: "246, 245, 248",
  },
  light: {
    blue: "37, 99, 235",
    violet: "124, 58, 237",
    white: "70, 70, 96",
  },
};

/** Lightweight canvas-based ambient particle field. Purely decorative. */
export function ParticlesBackground({ className, density = 60 }: ParticlesBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = useReducedMotion();
  const { theme } = useTheme();
  // Read through a ref so a theme change recolours the next frame instead of
  // tearing down the canvas and regenerating every particle.
  const paletteRef = useRef(COLORS[theme]);
  paletteRef.current = COLORS[theme];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || reducedMotion) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let frame: number;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      const parent = canvas!.parentElement;
      width = parent?.clientWidth ?? window.innerWidth;
      height = parent?.clientHeight ?? window.innerHeight;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.round((width * height) / 18000) + Math.min(density, 40);
      particles = Array.from({ length: Math.min(count, density) }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.6 + 0.4,
        vx: (Math.random() - 0.5) * 0.12,
        vy: -Math.random() * 0.18 - 0.04,
        hue: (["blue", "violet", "white"] as const)[Math.floor(Math.random() * 3)],
        alpha: Math.random() * 0.5 + 0.15,
      }));
    }

    function tick() {
      ctx!.clearRect(0, 0, width, height);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${paletteRef.current[p.hue]}, ${p.alpha})`;
        ctx!.fill();
      }
      frame = requestAnimationFrame(tick);
    }

    resize();
    frame = requestAnimationFrame(tick);
    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement ?? canvas);

    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
    };
  }, [density, reducedMotion]);

  if (reducedMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={className ?? "pointer-events-none absolute inset-0"}
    />
  );
}
