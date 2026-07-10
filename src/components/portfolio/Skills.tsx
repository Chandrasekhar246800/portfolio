import { motion } from "motion/react";
import { Section } from "./Section";
import { MOTION } from "@/lib/portfolio";

const GROUPS = [
  {
    title: "Frontend",
    color: "from-primary to-secondary",
    items: ["HTML", "CSS", "JavaScript", "TypeScript", "React.js", "Next.js", "Tailwind CSS", "Framer Motion", "Shadcn UI"],
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

const MARQUEE = [
  "React", "Next.js", "TypeScript", "Node.js", "MongoDB", "Tailwind",
  "Framer Motion", "GSAP", "Express", "PostgreSQL", "Python", "Java",
  "Git", "Figma", "Vercel", "Shadcn", "REST", "JWT",
];

export function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Skills"
      title={<>The <span className="text-gradient-aurora">toolbox</span> I build with.</>}
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
            <div className={`absolute -inset-px -z-10 rounded-2xl bg-gradient-to-br ${g.color} opacity-0 transition-opacity duration-500 group-hover:opacity-20`} />
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-display text-lg font-semibold">{g.title}</h3>
              <span className="font-mono text-xs text-muted-foreground">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {g.items.map((s) => (
                <span
                  key={s}
                  className="chip"
                >
                  {s}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Marquee */}
      <div className="relative mt-12 overflow-hidden rounded-[var(--radius-2xl)] glass py-5"
           style={{ maskImage: "linear-gradient(90deg, transparent, black 12%, black 88%, transparent)" }}>
        <div className="flex w-max animate-marquee gap-10 whitespace-nowrap px-6 font-mono text-sm text-muted-foreground">
          {[...MARQUEE, ...MARQUEE].map((t, i) => (
            <span key={i} className="flex items-center gap-10">
              {t}
              <span className="h-1 w-1 rounded-full bg-accent/60" />
            </span>
          ))}
        </div>
      </div>
    </Section>
  );
}
