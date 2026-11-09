import { motion } from "motion/react";
import { Briefcase, MapPin, Sparkles } from "lucide-react";
import { Section } from "./Section";
import { MOTION } from "@/lib/portfolio";

const BULLETS = [
  "Designed and developed the official Robohatch website end-to-end.",
  "Built responsive, modern user interfaces with React and Tailwind.",
  "Developed backend functionality and API integrations.",
  "Worked on database design and architecture decisions.",
  "Optimized performance, accessibility, and user experience.",
  "Collaborated in a startup environment, delivering production-ready solutions.",
];

export function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="Experience"
      title={
        <>
          Shipped in a <span className="text-gradient-aurora">real startup</span>.
        </>
      }
      description="From mockups to production — hands-on, end-to-end ownership."
    >
      <div className="relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={MOTION.enter}
          className="relative md:grid md:grid-cols-2 md:gap-8"
        >
          {/* Continuous Vertical Timeline Spine */}
          <div
            className="absolute left-4 top-0 h-full w-[2px] -translate-x-1/2 bg-gradient-to-b from-primary/50 via-secondary/50 to-transparent md:left-1/2"
            aria-hidden="true"
          />

          {/* Glowing Timeline Center Node: Anchored directly over spine center */}
          <div
            className="absolute left-4 top-1.5 z-10 -translate-x-1/2 md:left-1/2"
            aria-hidden="true"
          >
            <div className="relative flex h-5 w-5 items-center justify-center">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent/40 opacity-75 duration-1000" />
              <span className="absolute h-4 w-4 rounded-full bg-accent/25 blur-sm" />
              <span className="relative flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 border-accent bg-background shadow-[0_0_12px_rgba(20,241,149,0.85)]">
                <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_6px_var(--accent)]" />
              </span>
            </div>
          </div>

          {/* Left Column: Role & Period Metadata */}
          <div className="pl-11 md:pl-0 md:pr-12 md:text-right">
            <div className="inline-flex flex-col items-start gap-2 md:items-end">
              <span className="rounded-full glass px-3 py-1 font-mono text-xs text-muted-foreground">
                Jan 2025 – Jun 2025
              </span>
              <h3 className="font-display text-2xl font-bold text-foreground">Robohatch</h3>
              <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                <Briefcase className="h-3.5 w-3.5" />
                <span>Full Stack Developer</span>
                <span className="text-white/20">•</span>
                <MapPin className="h-3.5 w-3.5" />
                <span>Remote</span>
              </div>
            </div>
          </div>

          {/* Right Column: Experience Card */}
          <div className="mt-6 pl-11 md:mt-0 md:pl-12">
            <div className="rounded-[var(--radius-2xl)] glass p-6 transition-all duration-300 hover:border-accent/30 md:p-7">
              <ul className="space-y-2.5 text-sm text-foreground/90">
                {BULLETS.map((b) => (
                  <li key={b} className="flex gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-secondary" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex items-start gap-2.5 rounded-xl border border-accent/20 bg-accent/5 p-4">
                <Sparkles className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" />
                <p className="text-sm italic text-foreground/90">
                  "Contributed to building the official startup website Robohatch."
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
