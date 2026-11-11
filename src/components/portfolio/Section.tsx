import type { ReactNode } from "react";
import { motion } from "motion/react";
import { MOTION } from "@/lib/portfolio";

export function Section({
  id,
  eyebrow,
  title,
  description,
  children,
  className = "",
}: {
  id: string;
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`relative mx-auto w-full max-w-6xl px-6 py-24 md:py-28 scroll-mt-24 md:scroll-mt-28 ${className}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={MOTION.enter}
        className="mb-12 max-w-3xl"
      >
        {eyebrow && (
          <div className="chip mb-4 uppercase tracking-[0.18em] text-muted-foreground">
            <span className="h-1 w-1 rounded-full bg-accent" />
            {eyebrow}
          </div>
        )}
        <h2 className="font-display text-4xl font-bold tracking-tight text-gradient md:text-5xl">
          {title}
        </h2>
        {description && (
          <p className="mt-4 text-balance text-muted-foreground md:text-lg">{description}</p>
        )}
      </motion.div>
      {children}
    </section>
  );
}
