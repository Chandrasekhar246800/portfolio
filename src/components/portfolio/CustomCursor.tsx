import { useEffect, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { cn } from "@/lib/utils";

const SPRING_CONFIG = {
  damping: 28,
  stiffness: 300,
  mass: 0.5,
};

const INTERACTIVE_SELECTOR = 'a, button, input, textarea, [role="button"], .cursor-pointer';

export function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const reduceMotion = useReducedMotion();

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const smoothX = useSpring(mouseX, SPRING_CONFIG);
  const smoothY = useSpring(mouseY, SPRING_CONFIG);

  useEffect(() => {
    setMounted(true);

    const pointerMedia = window.matchMedia("(pointer: coarse)");
    const updateDeviceType = () => {
      const touch = pointerMedia.matches || window.innerWidth < 768;
      setIsTouch(touch);
      if (touch || reduceMotion) {
        document.documentElement.classList.remove("cursor-none-all");
      } else {
        document.documentElement.classList.add("cursor-none-all");
      }
    };

    updateDeviceType();
    pointerMedia.addEventListener("change", updateDeviceType);
    window.addEventListener("resize", updateDeviceType);

    const onPointerMove = (e: PointerEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      setIsVisible((prev) => (prev ? prev : true));

      const target = e.target as HTMLElement | null;
      const interactive = !!target?.closest(INTERACTIVE_SELECTOR);
      setIsHovered((prev) => (prev !== interactive ? interactive : prev));
    };

    const onMouseDown = () => setIsClicked(true);
    const onMouseUp = () => setIsClicked(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    document.documentElement.addEventListener("mouseleave", onMouseLeave);
    document.documentElement.addEventListener("mouseenter", onMouseEnter);

    return () => {
      document.documentElement.classList.remove("cursor-none-all");
      pointerMedia.removeEventListener("change", updateDeviceType);
      window.removeEventListener("resize", updateDeviceType);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.documentElement.removeEventListener("mouseleave", onMouseLeave);
      document.documentElement.removeEventListener("mouseenter", onMouseEnter);
    };
  }, [mouseX, mouseY, reduceMotion]);

  if (!mounted || isTouch || reduceMotion) {
    return null;
  }

  const targetScale = isClicked ? (isHovered ? 1.6 : 0.9) : isHovered ? 1.8 : 1.0;

  return (
    <>
      {/* Outer spring-smoothed follower ring */}
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
        }}
        className="pointer-events-none fixed left-0 top-0 z-[9999] -translate-x-1/2 -translate-y-1/2"
      >
        <motion.div
          animate={{
            scale: targetScale,
            opacity: isVisible ? 1 : 0,
          }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          className={cn(
            "h-8 w-8 rounded-full border backdrop-blur-[1px] transition-colors duration-200",
            isHovered
              ? "border-primary/80 bg-primary/25 shadow-[0_0_20px_-3px_color-mix(in_oklab,var(--primary)_60%,transparent)]"
              : "border-primary/50 bg-primary/10",
          )}
        />
      </motion.div>

      {/* Sharp central dot tracking exact pointer coordinates */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
        }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isHovered ? 0.5 : 1,
        }}
        transition={{ duration: 0.15 }}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent"
      />
    </>
  );
}
