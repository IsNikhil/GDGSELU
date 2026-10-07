"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Thin gold reading progress bar fixed to the top of the page. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[55] h-1 origin-left bg-gradient-to-r from-ld-emerald via-ld-gold to-ld-gold-light"
    />
  );
}
