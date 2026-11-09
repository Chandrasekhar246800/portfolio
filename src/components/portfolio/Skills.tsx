import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Section } from "./Section";
import { MOTION } from "@/lib/portfolio";

const GROUPS = [
  {
    title: "Frontend",
    color: "from-primary to-secondary",
    items: [
      "HTML",
      "CSS",
      "JavaScript",
      "TypeScript",
      "React.js",
      "Next.js",
      "Tailwind CSS",
      "Framer Motion",
      "Shadcn UI",
    ],
  },
  {
    title: "Backend",
    color: "from-secondary to-accent",
    items: ["Node.js", "Express.js", "REST APIs", "JWT Auth"],
  },
  {
    title: "Database",
    color: "from-accent to-primary",
    items: ["MongoDB", "MySQL", "SQL"],
  },
  {
    title: "Programming",
    color: "from-primary to-accent",
    items: ["Java", "Python", "C"],
  },
  {
    title: "Tools",
    color: "from-secondary to-primary",
    items: ["Git", "GitHub", "Postman", "VS Code", "Figma", "Vercel", "Netlify"],
  },
];

const MARQUEE_ITEMS = [
  "React",
  "Next.js",
  "TypeScript",
  "JavaScript",
  "Node.js",
  "Express.js",
  "MongoDB",
  "PostgreSQL",
  "MySQL",
  "SQL",
  "Tailwind CSS",
  "Framer Motion",
  "Motion v12",
  "Shadcn UI",
  "Java",
  "Python",
  "C / C++",
  "Docker",
  "Git",
  "GitHub",
  "REST APIs",
  "JWT Auth",
  "Postman",
  "VS Code",
  "Figma",
  "Vercel",
  "TanStack Start",
  "TanStack Router",
];

export function Skills() {
  const reduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isReduced = mounted && reduceMotion;

  return (
    <Section
      id="skills"
      eyebrow="Skills"
      title={
        <>
          The <span className="text-gradient-aurora">toolbox</span> I build with.
        </>
      }
      description="A modern stack tuned for performance, DX, and shippable products."
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {GROUPS.map((g, i) => (
          <motion.div
            key={g.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * MOTION.stagger, ...MOTION.fast }}
            className="group relative overflow-hidden rounded-[var(--radius-2xl)] gradient-border p-6 transition-transform hover:-translate-y-1"
          >
            <div
              className={`absolute -inset-px -z-10 rounded-2xl bg-gradient-to-br ${g.color} opacity-0 transition-opacity duration-500 group-hover:opacity-20`}
            />
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-display text-lg font-semibold">{g.title}</h3>
              <span className="font-mono text-xs text-muted-foreground">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {g.items.map((s) => (
                <span key={s} className="chip">
                  {s}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Marquee Skills Ticker Ribbon */}
      {isReduced ? (
        <div className="relative mt-12 overflow-hidden rounded-[var(--radius-2xl)] glass p-6">
          <div className="mb-3 text-center font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Core Technologies & Tooling
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {MARQUEE_ITEMS.map((tech) => (
              <span
                key={tech}
                className="rounded-lg border border-border/70 bg-surface/60 px-3 py-1 font-mono text-xs font-medium text-foreground/90 backdrop-blur-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      ) : (
        <div
          className="group relative mt-12 overflow-hidden rounded-[var(--radius-2xl)] glass py-5"
          style={{
            maskImage:
              "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
          }}
        >
          {/* Edge gradient fade masks */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background via-background/60 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background via-background/60 to-transparent" />

          {/* Scrolling ticker track */}
          <div className="flex w-max flex-nowrap overflow-hidden">
            <div className="flex min-w-max shrink-0 animate-marquee items-center gap-8 pr-8 font-mono text-sm text-muted-foreground transition-all duration-300 hover:[animation-play-state:paused] group-hover:[animation-play-state:paused]">
              {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((tech, i) => (
                <span
                  key={`${tech}-${i}`}
                  className="flex items-center gap-8 transition-colors duration-200 hover:text-foreground cursor-default"
                >
                  <span>{tech}</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-accent/70 shadow-[0_0_8px_var(--accent)]" />
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </Section>
  );
}
