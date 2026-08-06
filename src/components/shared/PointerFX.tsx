import { useEffect, useRef, useState } from "react";
import { useIsTouchDevice } from "@/hooks/useMediaQuery";

/**
 * Site-wide pointer effects: a trailing cursor (dot + ring) and an ambient
 * radial glow that follows the mouse across the dark background. Runs on a
 * single rAF loop with direct DOM writes to stay off the React render path.
 */
export function PointerFX() {
  const isTouch = useIsTouchDevice();
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (isTouch) return;

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ring = { x: target.x, y: target.y };
    const glow = { x: target.x, y: target.y };
    let frame: number;

    function handleMove(e: PointerEvent) {
      target.x = e.clientX;
      target.y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    }

    function handleOver(e: PointerEvent) {
      const el = (e.target as HTMLElement)?.closest?.(
        'a, button, [data-cursor="hover"], input, textarea'
      );
      setIsHovering(Boolean(el));
    }

    function tick() {
      ring.x += (target.x - ring.x) * 0.18;
      ring.y += (target.y - ring.y) * 0.18;
      glow.x += (target.x - glow.x) * 0.08;
      glow.y += (target.y - glow.y) * 0.08;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0)`;
      }
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${glow.x}px, ${glow.y}px, 0)`;
      }
      frame = requestAnimationFrame(tick);
    }

    window.addEventListener("pointermove", handleMove, { passive: true });
    window.addEventListener("pointerover", handleOver, { passive: true });
    frame = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerover", handleOver);
      cancelAnimationFrame(frame);
    };
  }, [isTouch]);

  // On touch devices the rAF loop never starts, so nothing would ever move these.
  // The glow used to render anyway and sat frozen in the top-left corner of any
  // tablet wide enough to hit the `md:` breakpoint.
  if (isTouch) return null;

  return (
    <>
      {/* Ambient glow */}
      <div
        ref={glowRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-0 hidden h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 mix-blend-screen will-change-transform md:block"
        style={{
          background:
            "radial-gradient(circle, rgba(79,156,255,0.16) 0%, rgba(168,85,247,0.08) 45%, transparent 72%)",
        }}
      />

      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[60] hidden -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/40 mix-blend-difference transition-[width,height] duration-200 ease-out will-change-transform md:block"
        style={{
          width: isHovering ? 56 : 34,
          height: isHovering ? 56 : 34,
        }}
      />
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[60] hidden h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white mix-blend-difference will-change-transform md:block"
      />
    </>
  );
}
