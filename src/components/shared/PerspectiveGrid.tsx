import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useMediaQuery";
import { useTheme } from "@/context/ThemeProvider";
import { cn } from "@/utils/cn";

interface Star {
  x: number;
  y: number;
  r: number;
  alpha: number;
  twinkleSpeed: number;
  twinklePhase: number;
  vy: number;
}

interface ActiveCell {
  col: number;
  rowOffset: number;
  speed: number;
  alpha: number;
  maxAlpha: number;
  life: number;
  maxLife: number;
}

interface PerspectiveGridProps {
  className?: string;
  /** Number of columns across the runway */
  columns?: number;
  /** Number of depth rows from horizon to bottom */
  rows?: number;
  /** Show starfield particles in the surrounding space */
  showStars?: boolean;
  /** Vertical position of the vanishing horizon (0 to 1) */
  horizonRatio?: number;
  /** Render as a fixed full-viewport background that stays behind the page on scroll */
  fixed?: boolean;
}

/**
 * Animated 3D-projected triangulated perspective wireframe runway with
 * forward-scrolling grid lines, glowing active tiles, ambient starfield,
 * and scroll-reactive velocity boost.
 */
export function PerspectiveGrid({
  className,
  columns = 10,
  rows = 16,
  showStars = true,
  horizonRatio = 0.28,
  fixed = false,
}: PerspectiveGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = useReducedMotion();
  const { theme } = useTheme();
  const themeRef = useRef(theme);
  themeRef.current = theme;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let frame = 0;
    let inView = true;
    let offset = 0;
    let scrollBoost = 0;
    let lastScrollY = window.scrollY;
    let pointerX = 0;
    let targetPointerX = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let stars: Star[] = [];
    let cells: ActiveCell[] = [];

    function spawnCell(initial = false): ActiveCell {
      const col = Math.floor(Math.random() * columns) - columns / 2;
      return {
        col,
        rowOffset: initial ? Math.random() * rows : Math.random() * (rows * 0.65),
        speed: 0.35 + Math.random() * 0.45,
        alpha: 0,
        maxAlpha: 0.16 + Math.random() * 0.22,
        life: initial ? Math.random() * 140 : 0,
        maxLife: 160 + Math.random() * 140,
      };
    }

    function resize() {
      const parent = canvas!.parentElement;
      width = fixed ? window.innerWidth : (parent?.clientWidth ?? window.innerWidth);
      height = fixed ? window.innerHeight : (parent?.clientHeight ?? window.innerHeight);
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (showStars) {
        const starCount = Math.min(85, Math.max(30, Math.round((width * height) / 14000)));
        stars = Array.from({ length: starCount }, () => ({
          x: Math.random() * width,
          y: Math.random() * height,
          r: Math.random() * 1.15 + 0.35,
          alpha: Math.random() * 0.55 + 0.12,
          twinkleSpeed: 0.012 + Math.random() * 0.025,
          twinklePhase: Math.random() * Math.PI * 2,
          vy: -(0.03 + Math.random() * 0.08),
        }));
      }

      if (cells.length === 0) {
        cells = Array.from({ length: 8 }, () => spawnCell(true));
      }
    }

    /**
     * Project normalized grid coordinates:
     * u in [-columns/2, columns/2]
     * depth in [0, 1] where 0 = horizon, 1 = bottom foreground
     */
    function project(u: number, depth: number, vpX: number, vpY: number) {
      // Exponential curve so lines bunch near horizon and spread toward viewer
      const d = Math.pow(Math.max(0, depth), 1.85);
      const topHalfWidth = Math.min(width * 0.16, 170);
      const bottomHalfWidth = Math.max(width * 0.68, 520);
      const currentHalfWidth = topHalfWidth + (bottomHalfWidth - topHalfWidth) * d;
      const normU = u / (columns / 2);
      const x = vpX + normU * currentHalfWidth;
      const y = vpY + d * (height - vpY);
      return { x, y, d };
    }

    function render(now: number) {
      ctx!.clearRect(0, 0, width, height);
      const isLight = themeRef.current === "light";
      const strokeRgb = isLight ? "15, 15, 20" : "255, 255, 255";
      const cellRgb = isLight ? "15, 15, 20" : "255, 255, 255";

      if (!reducedMotion && scrollBoost > 0) {
        scrollBoost *= 0.91;
        if (scrollBoost < 0.00005) scrollBoost = 0;
      }
      const step = 0.0042 + scrollBoost;

      // 1. Ambient Starfield
      if (showStars) {
        for (const s of stars) {
          if (!reducedMotion) {
            s.y += s.vy * (1 + scrollBoost * 95);
            if (s.y < -4) {
              s.y = height + 4;
              s.x = Math.random() * width;
            }
          }
          const twinkle = reducedMotion
            ? 1
            : 0.65 + 0.35 * Math.sin(now * 0.002 + s.twinklePhase);
          const a = s.alpha * twinkle * (isLight ? 0.45 : 0.85);
          ctx!.fillStyle = `rgba(${strokeRgb}, ${a})`;
          ctx!.beginPath();
          ctx!.arc(s.x, s.y, s.r, 0, Math.PI * 2);
          ctx!.fill();
        }
      }

      // Smooth pointer parallax on horizon
      pointerX += (targetPointerX - pointerX) * 0.05;
      const vpX = width * 0.5 + pointerX * 26;
      const vpY = height * horizonRatio;

      if (!reducedMotion) {
        offset = (offset + step) % 1;
      }

      const halfCols = columns / 2;

      // 2. Active Pulsing / Traveling Grid Cells
      for (let i = 0; i < cells.length; i++) {
        const cell = cells[i];
        if (!reducedMotion) {
          cell.life += 1;
          cell.rowOffset += step * cell.speed;
          if (cell.life >= cell.maxLife || cell.rowOffset >= rows - 1) {
            cells[i] = spawnCell(false);
            continue;
          }
        }
        const lifeRatio = cell.life / cell.maxLife;
        const fade =
          lifeRatio < 0.2
            ? lifeRatio / 0.2
            : lifeRatio > 0.8
              ? (1 - lifeRatio) / 0.2
              : 1;

        const r0 = (cell.rowOffset + offset) % rows;
        const d0 = r0 / rows;
        const d1 = Math.min(1, (r0 + 1) / rows);
        if (d1 <= d0) continue;

        const pTL = project(cell.col, d0, vpX, vpY);
        const pTR = project(cell.col + 1, d0, vpX, vpY);
        const pBR = project(cell.col + 1, d1, vpX, vpY);
        const pBL = project(cell.col, d1, vpX, vpY);

        // Fade out near horizon and bottom edge
        const edgeFade = Math.sin(d0 * Math.PI);
        const cellAlpha =
          cell.maxAlpha * fade * edgeFade * (isLight ? 0.45 : 0.85);

        if (cellAlpha > 0.01) {
          ctx!.fillStyle = `rgba(${cellRgb}, ${cellAlpha})`;
          ctx!.beginPath();
          ctx!.moveTo(pTL.x, pTL.y);
          ctx!.lineTo(pTR.x, pTR.y);
          ctx!.lineTo(pBR.x, pBR.y);
          ctx!.lineTo(pBL.x, pBL.y);
          ctx!.closePath();
          ctx!.fill();
        }
      }

      ctx!.lineWidth = 1;

      // 3. Longitudinal Rays (from horizon to foreground)
      for (let c = -halfCols; c <= halfCols; c++) {
        const pStart = project(c, 0, vpX, vpY);
        const pEnd = project(c, 1, vpX, vpY);

        const grad = ctx!.createLinearGradient(pStart.x, pStart.y, pEnd.x, pEnd.y);
        const peakAlpha = isLight ? 0.14 : 0.18;
        grad.addColorStop(0, `rgba(${strokeRgb}, 0.02)`);
        grad.addColorStop(0.25, `rgba(${strokeRgb}, ${peakAlpha})`);
        grad.addColorStop(0.82, `rgba(${strokeRgb}, ${peakAlpha * 0.85})`);
        grad.addColorStop(1, `rgba(${strokeRgb}, 0)`);

        ctx!.strokeStyle = grad;
        ctx!.beginPath();
        ctx!.moveTo(pStart.x, pStart.y);
        ctx!.lineTo(pEnd.x, pEnd.y);
        ctx!.stroke();
      }

      // 4. Transverse Horizontal Lines + Triangulated Diagonals
      for (let r = 0; r < rows; r++) {
        const rawDepth = (r + offset) / rows;
        const nextRawDepth = Math.min(1, (r + 1 + offset) / rows);

        const pLeft = project(-halfCols, rawDepth, vpX, vpY);
        const pRight = project(halfCols, rawDepth, vpX, vpY);

        // Smooth fade at the horizon and very bottom
        const depthFade =
          rawDepth < 0.15
            ? rawDepth / 0.15
            : rawDepth > 0.85
              ? (1 - rawDepth) / 0.15
              : 1;
        const lineAlpha = (isLight ? 0.13 : 0.16) * Math.max(0, depthFade);

        if (lineAlpha > 0.008) {
          ctx!.strokeStyle = `rgba(${strokeRgb}, ${lineAlpha})`;
          ctx!.beginPath();
          ctx!.moveTo(pLeft.x, pLeft.y);
          ctx!.lineTo(pRight.x, pRight.y);
          ctx!.stroke();
        }

        // Diagonal triangulation segments within each cell
        const diagAlpha = lineAlpha * 0.55;
        if (diagAlpha > 0.006 && nextRawDepth > rawDepth) {
          ctx!.strokeStyle = `rgba(${strokeRgb}, ${diagAlpha})`;
          ctx!.beginPath();
          for (let c = -halfCols; c < halfCols; c++) {
            const pA = project(c, rawDepth, vpX, vpY);
            const pB = project(c + 1, nextRawDepth, vpX, vpY);
            ctx!.moveTo(pA.x, pA.y);
            ctx!.lineTo(pB.x, pB.y);
          }
          ctx!.stroke();
        }
      }

      // Top horizon cap line
      const pTopL = project(-halfCols, 0, vpX, vpY);
      const pTopR = project(halfCols, 0, vpX, vpY);
      ctx!.strokeStyle = `rgba(${strokeRgb}, ${isLight ? 0.08 : 0.1})`;
      ctx!.beginPath();
      ctx!.moveTo(pTopL.x, pTopL.y);
      ctx!.lineTo(pTopR.x, pTopR.y);
      ctx!.stroke();
    }

    function tick(now: number) {
      if (inView) {
        render(now);
      }
      if (!reducedMotion) {
        frame = requestAnimationFrame(tick);
      }
    }

    function onPointerMove(e: PointerEvent) {
      targetPointerX = (e.clientX / Math.max(1, window.innerWidth) - 0.5) * 2;
    }

    function onScroll() {
      const currentY = window.scrollY;
      const delta = Math.abs(currentY - lastScrollY);
      lastScrollY = currentY;
      if (delta > 0) {
        scrollBoost = Math.min(0.036, scrollBoost + delta * 0.00038);
      }
    }

    function onWindowResize() {
      resize();
      render(performance.now());
    }

    function onVisibilityChange() {
      inView = !document.hidden;
    }

    resize();
    render(performance.now());
    if (!reducedMotion) {
      frame = requestAnimationFrame(tick);
    }

    const ro = new ResizeObserver(() => {
      resize();
      render(performance.now());
    });
    if (!fixed) {
      ro.observe(canvas.parentElement ?? canvas);
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
      },
      { rootMargin: "150px" }
    );
    if (!fixed) {
      io.observe(canvas);
    }

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    if (fixed) {
      window.addEventListener("resize", onWindowResize, { passive: true });
      document.addEventListener("visibilitychange", onVisibilityChange);
    }

    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onWindowResize);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [columns, rows, showStars, horizonRatio, fixed, reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={cn(
        "pointer-events-none",
        fixed ? "fixed inset-0 z-0" : "absolute inset-0",
        className
      )}
    />
  );
}
