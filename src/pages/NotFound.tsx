import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ParticlesBackground } from "@/components/shared/ParticlesBackground";

export function NotFound() {
  return (
    <section className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-6 text-center">
      <div aria-hidden className="absolute inset-0 bg-grid opacity-30" />
      <ParticlesBackground density={30} />
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative font-display text-[9rem] font-semibold leading-none text-gradient sm:text-[12rem]"
      >
        404
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="relative mt-2 font-display text-2xl font-medium text-ivory sm:text-3xl"
      >
        This page wandered off the map.
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative mt-3 max-w-md text-mist"
      >
        The page you're looking for doesn't exist or has been moved.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="relative mt-8"
      >
        <Button asChild size="lg">
          <Link to="/">
            <Home className="h-4 w-4" /> Back to Home
          </Link>
        </Button>
      </motion.div>
    </section>
  );
}
