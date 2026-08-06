import { useEffect, useRef } from "react";

/**
 * Tracks the pointer position in a ref (not state) to avoid re-renders on every
 * mousemove. Consumers should read `.current` inside animation frames / GSAP ticks.
 */
export function useMousePosition() {
  const position = useRef({ x: 0, y: 0 });

  useEffect(() => {
    function handleMove(e: PointerEvent) {
      position.current = { x: e.clientX, y: e.clientY };
    }
    window.addEventListener("pointermove", handleMove, { passive: true });
    return () => window.removeEventListener("pointermove", handleMove);
  }, []);

  return position;
}
