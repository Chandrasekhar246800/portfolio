import { useRef, useState } from "react";
import { motion, MotionConfig, useReducedMotion } from "motion/react";
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

const ALL_SKILLS = [
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
  const [manualScroll, setManualScroll] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    trackRef.current?.getAnimations().forEach((anim) => anim.pause());
  };

  const handleMouseLeave = () => {
    trackRef.current?.getAnimations().forEach((anim) => anim.play());
  };

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

      {/* Single-Line Continuous Horizontal Auto-Scrolling Marquee Ribbon */}
      <div className="relative mt-12 w-full">
        {manualScroll ? (
          <div className="w-full overflow-x-auto rounded-[var(--radius-2xl)] glass px-4 py-5 [scrollbar-width:thin]">
            <div className="flex flex-nowrap shrink-0 items-center gap-4 whitespace-nowrap">
              {ALL_SKILLS.map((skill) => (
                <div
                  key={skill}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 font-mono text-xs md:text-sm text-zinc-300 backdrop-blur-sm transition-colors hover:border-primary/50 hover:bg-primary/10"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-accent/70 shadow-[0_0_8px_var(--accent)]" />
                  <span>{skill}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div
            className="group relative w-full overflow-hidden rounded-[var(--radius-2xl)] glass py-5 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* Left and right atmospheric edge gradient masks */}
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background via-background/60 to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background via-background/60 to-transparent" />

            {/* Seamless Infinite Gliding Track */}
            <MotionConfig reducedMotion="never">
              <motion.div
                ref={trackRef}
                className="flex flex-nowrap shrink-0 items-center gap-4 whitespace-nowrap"
                animate={{ x: ["0%", "-50%"] }}
                transition={{
                  repeat: Infinity,
                  ease: "linear",
                  duration: 35,
                }}
              >
                {[...ALL_SKILLS, ...ALL_SKILLS].map((skill, index) => (
                  <div
                    key={`${skill}-${index}`}
                    className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 font-mono text-xs md:text-sm text-zinc-300 backdrop-blur-sm transition-colors hover:border-primary/50 hover:bg-primary/10 cursor-default select-none"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-accent/70 shadow-[0_0_8px_var(--accent)]" />
                    <span>{skill}</span>
                  </div>
                ))}
              </motion.div>
            </MotionConfig>
          </div>
        )}

        {/* Accessibility Control (Shown when OS Reduced Motion is detected) */}
        {reduceMotion && (
          <div className="mt-2.5 flex justify-end px-2">
            <button
              type="button"
              onClick={() => setManualScroll(!manualScroll)}
              className="inline-flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground transition-colors hover:text-foreground cursor-pointer"
            >
              <span>
                {manualScroll
                  ? "⚡ Enable Auto-Scroll"
                  : "♿ Reduced Motion: Switch to Manual Scroll"}
              </span>
            </button>
          </div>
        )}
      </div>
    </Section>
  );
}
