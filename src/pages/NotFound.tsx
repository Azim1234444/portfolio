import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";

const EASE = [0.16, 1, 0.3, 1] as const;

export function NotFound() {
  return (
    <section className="relative flex min-h-svh flex-col items-center justify-center px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="mb-4 inline-flex items-center gap-2 rounded-sm border border-border bg-void/70 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.22em] text-fog backdrop-blur-sm"
      >
        Error · 404
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.05, ease: EASE }}
        className="font-display text-[7rem] font-bold leading-none tracking-tighter text-ivory sm:text-[10rem]"
      >
        404
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.12, ease: EASE }}
        className="mt-3 font-display text-2xl font-bold uppercase tracking-tight text-ivory sm:text-3xl"
      >
        Page Not Found
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
        className="mt-3 max-w-md text-sm leading-relaxed text-mist sm:text-base"
      >
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.28, ease: EASE }}
        className="mt-8"
      >
        <Button asChild size="lg" variant="primary">
          <Link to="/">
            <Home className="h-4 w-4" /> Back to Home
          </Link>
        </Button>
      </motion.div>
    </section>
  );
}
