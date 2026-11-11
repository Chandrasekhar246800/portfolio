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

  // If user requests reduced motion, lock to instantaneous coordinates rather than suppressing the cursor
  const cursorX = reduceMotion ? mouseX : smoothX;
  const cursorY = reduceMotion ? mouseY : smoothY;

  useEffect(() => {
    setMounted(true);

    // Initial check: only mark touch on small mobile screens (< 768px)
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      setIsTouch(true);
    }

    const onPointerMove = (e: PointerEvent) => {
      // If an actual touch event occurs, hide custom cursor
      if (e.pointerType === "touch") {
        setIsTouch(true);
        setIsVisible(false);
        document.documentElement.classList.remove("cursor-none-all");
        return;
      }

      // Mouse or pen pointer actively moving
      setIsTouch(false);
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setIsVisible(true);
      document.documentElement.classList.add("cursor-none-all");

      const target = e.target as HTMLElement | null;
      const interactive = !!target?.closest(INTERACTIVE_SELECTOR);
      setIsHovered((prev) => (prev !== interactive ? interactive : prev));
    };

    const onMouseDown = (e: MouseEvent) => {
      if (e.button === 0) setIsClicked(true);
    };
    const onMouseUp = () => setIsClicked(false);
    const onMouseLeave = () => {
      setIsVisible(false);
      document.documentElement.classList.remove("cursor-none-all");
    };
    const onMouseEnter = () => {
      if (!isTouch) {
        setIsVisible(true);
        document.documentElement.classList.add("cursor-none-all");
      }
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    document.documentElement.addEventListener("mouseleave", onMouseLeave);
    document.documentElement.addEventListener("mouseenter", onMouseEnter);

    return () => {
      document.documentElement.classList.remove("cursor-none-all");
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.documentElement.removeEventListener("mouseleave", onMouseLeave);
      document.documentElement.removeEventListener("mouseenter", onMouseEnter);
    };
  }, [mouseX, mouseY, isTouch]);

  if (!mounted || isTouch) {
    return null;
  }

  const targetScale = isClicked ? (isHovered ? 1.6 : 0.9) : isHovered ? 1.8 : 1.0;

  return (
    <>
      {/* Outer follower ring with margin centering to avoid CSS transform conflicts */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
        }}
        className="pointer-events-none fixed left-0 top-0 z-[9999] -ml-4 -mt-4 h-8 w-8"
      >
        <motion.div
          animate={{
            scale: targetScale,
            opacity: isVisible ? 1 : 0,
          }}
          transition={{ duration: reduceMotion ? 0.05 : 0.15, ease: "easeOut" }}
          className={cn(
            "h-full w-full rounded-full border transition-colors duration-200",
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
        transition={{ duration: reduceMotion ? 0.05 : 0.15 }}
        className="pointer-events-none fixed left-0 top-0 z-[9999] -ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-accent"
      />
    </>
  );
}
