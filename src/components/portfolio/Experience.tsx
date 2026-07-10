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
      title={<>Shipped in a <span className="text-gradient-aurora">real startup</span>.</>}
      description="From mockups to production — hands-on, end-to-end ownership."
    >
      <div className="relative">
        <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-primary/40 via-secondary/40 to-transparent md:left-1/2" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={MOTION.enter}
          className="relative md:grid md:grid-cols-2 md:gap-8"
        >
          <div className="md:pr-12 md:text-right">
            <div className="ml-10 inline-flex flex-col items-start gap-2 md:ml-0 md:items-end">
              <span className="rounded-full glass px-3 py-1 text-xs font-mono text-muted-foreground">
                Jan 2025 – Jun 2025
              </span>
              <h3 className="font-display text-2xl font-bold">Robohatch</h3>
              <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                <Briefcase className="h-3.5 w-3.5" />
                Full Stack Developer
                <span className="text-white/20">•</span>
                <MapPin className="h-3.5 w-3.5" />
                Remote
              </div>
            </div>
          </div>

          <div className="relative mt-6 md:mt-0 md:pl-12">
              <span className="absolute left-[9px] top-2 grid h-3 w-3 -translate-x-1/2 place-items-center rounded-full bg-background ring-2 ring-accent md:left-0">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            <div className="ml-10 rounded-[var(--radius-2xl)] glass p-6 md:ml-0">
              <ul className="space-y-2.5 text-sm text-foreground/90">
                {BULLETS.map((b) => (
                  <li key={b} className="flex gap-3">
                    <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-secondary" />
                    {b}
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex items-start gap-2 rounded-xl border border-accent/20 bg-accent/5 p-4">
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
