import { motion } from "framer-motion";
import { useScrollProgress } from "@/hooks/useScrollProgress";

export function ScrollProgress() {
  const progress = useScrollProgress();

  return (
    <div className="fixed inset-x-0 top-0 z-[70] h-[3px] bg-transparent">
      <motion.div
        className="h-full origin-left bg-ivory"
        style={{ scaleX: progress }}
      />
    </div>
  );
}
