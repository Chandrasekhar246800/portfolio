import { motion } from "motion/react";
import { Code2, Database, Layout, Rocket, Sparkles, Workflow } from "lucide-react";
import { Section } from "./Section";
import { MOTION } from "@/lib/portfolio";

const HIGHLIGHTS = [
  { icon: Layout, label: "Full Stack Development" },
  { icon: Code2, label: "Frontend Engineering" },
  { icon: Sparkles, label: "React Ecosystem" },
  { icon: Rocket, label: "Next.js Development" },
  { icon: Database, label: "Database Design" },
  { icon: Workflow, label: "Problem Solving" },
];

const JOURNEY = [
  {
    year: "2021",
    title: "Started Programming",
    body: "First lines of C and Python — fell in love with building.",
  },
  {
    year: "2022",
    title: "Engineering Journey",
    body: "Began Computer Science Engineering, deep-dived into web.",
  },
  {
    year: "2023",
    title: "Full Stack Development",
    body: "Shipped React + Node apps end-to-end, learned databases.",
  },
  {
    year: "2025",
    title: "Startup Experience",
    body: "Joined Robohatch — built the official production website.",
  },
  {
    year: "Now",
    title: "Hackathons & Projects",
    body: "Bharatiya Antariksha Hackathon and the Robohatch launch.",
  },
];

export function About() {
  return (
    <Section
      id="about"
      eyebrow="About"
      title={
        <>
          Engineer by training, <span className="text-gradient-aurora">builder by craft</span>.
        </>
      }
      description="I'm a Computer Science Engineering student building modern web applications and solving real problems through code. My focus: scalable full-stack systems, intuitive UX, and polished products."
    >
      <div className="grid gap-10 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <div className="rounded-3xl glass p-6 md:p-8">
            <p className="text-balance text-foreground/90 md:text-lg">
              I enjoy transforming ideas into polished applications using modern technologies —
              continuously learning, shipping, and improving as a developer. Every project is a
              chance to ship something better than the last.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3">
              {HIGHLIGHTS.map(({ icon: Icon, label }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * MOTION.stagger, ...MOTION.fast }}
                  className="group flex items-center gap-2.5 rounded-[var(--radius-xl)] border border-white/10 bg-white/[0.03] px-3 py-2.5 text-sm transition-colors hover:border-primary/40 hover:bg-white/[0.06]"
                >
                  <Icon className="h-4 w-4 text-secondary transition-colors group-hover:text-accent" />
                  <span className="truncate">{label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Journey timeline */}
        <div className="lg:col-span-2">
          <ol className="relative space-y-5 border-l border-white/10 pl-6">
            {JOURNEY.map((j, i) => (
              <motion.li
                key={j.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * MOTION.stagger, ...MOTION.fast }}
                className="relative"
              >
                <span className="absolute -left-[31px] top-1.5 grid h-4 w-4 place-items-center rounded-full bg-background ring-2 ring-primary/60">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                </span>
                <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  {j.year}
                </div>
                <div className="mt-0.5 font-display text-base font-semibold">{j.title}</div>
                <div className="text-sm text-muted-foreground">{j.body}</div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  );
}
