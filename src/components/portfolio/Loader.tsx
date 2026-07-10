import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

export function Loader() {
  const [pct, setPct] = useState(0);
  const [done, setDone] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) {
      setDone(true);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const dur = 1600;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setPct(Math.floor(p * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => setDone(true), 250);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduceMotion]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(10px)" }}
          transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-background"
        >
          <div className="aurora" />
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="relative mb-8"
          >
            <div className="relative grid h-20 w-20 place-items-center rounded-2xl gradient-border">
              <span className="font-display text-3xl font-bold text-gradient-aurora">CR</span>
              <div className="absolute -inset-2 -z-10 rounded-3xl bg-primary/30 blur-2xl animate-pulse-glow" />
            </div>
          </motion.div>

          <div className="w-64">
            <div className="mb-3 flex items-baseline justify-between font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
              <span>Loading</span>
              <span className="text-foreground">{pct}%</span>
            </div>
            <div className="h-[2px] w-full overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full bg-gradient-to-r from-primary via-secondary to-accent"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
