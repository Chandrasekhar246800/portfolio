import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const reduceMotion = useReducedMotion();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.3 });
  if (reduceMotion) return null;
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed left-0 top-0 z-[9998] h-[2px] w-full origin-left bg-gradient-to-r from-primary via-secondary to-accent"
    />
  );
}
