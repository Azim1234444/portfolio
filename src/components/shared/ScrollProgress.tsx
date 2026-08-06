import { motion } from "framer-motion";
import { useScrollProgress } from "@/hooks/useScrollProgress";

export function ScrollProgress() {
  const progress = useScrollProgress();

  return (
    <div className="fixed inset-x-0 top-0 z-[70] h-[3px] bg-transparent">
      <motion.div
        className="h-full origin-left bg-gradient-to-r from-blue-500 via-neon-blue to-violet-500"
        style={{ scaleX: progress }}
      />
    </div>
  );
}
