import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { Award, GitBranch, Rocket, Trophy } from "lucide-react";
import { Section } from "./Section";
import { MOTION } from "@/lib/portfolio";

const HIGHLIGHTS = [
  { icon: Trophy, title: "Bharatiya Antariksha Hackathon", body: "Participated in India's premier space-tech hackathon." },
  { icon: Rocket, title: "Startup Development", body: "Shipped production website for Robohatch as Full Stack Developer." },
  { icon: GitBranch, title: "Robohatch Delivery", body: "Designed and shipped the official startup website in production." },
  { icon: Award, title: "React Ecosystem Expertise", body: "Modern stack: Next.js, TypeScript, Tailwind, Framer Motion." },
];

const STATS = [
  { label: "Projects Completed", value: 12, suffix: "+" },
  { label: "Technologies Learned", value: 24, suffix: "+" },
  { label: "GitHub Repositories", value: 30, suffix: "+" },
  { label: "Certifications Earned", value: 8, suffix: "" },
];

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const dur = 1600;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.floor(eased * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  return (
    <span ref={ref} className="font-display text-5xl font-bold tracking-tight md:text-6xl">
      {n}
      <span className="text-gradient-aurora">{suffix}</span>
    </span>
  );
}

export function Achievements() {
  return (
    <Section
      id="achievements"
      eyebrow="Achievements"
      title={<>Milestones & <span className="text-gradient-aurora">momentum</span>.</>}
      description="Building, learning, and shipping — proof of work over time."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * MOTION.stagger, ...MOTION.fast }}
            className="rounded-[var(--radius-3xl)] glass p-6"
          >
            <Counter to={s.value} suffix={s.suffix} />
            <div className="mt-2 text-sm text-muted-foreground">{s.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {HIGHLIGHTS.map(({ icon: Icon, title, body }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * MOTION.stagger, ...MOTION.fast }}
            className="group flex items-start gap-4 rounded-[var(--radius-2xl)] glass p-5 transition-colors hover:bg-white/[0.05]"
          >
            <div className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary/30 to-secondary/30">
              <Icon className="h-4 w-4 text-accent" />
            </div>
            <div>
              <div className="font-display font-semibold">{title}</div>
              <div className="text-sm text-muted-foreground">{body}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
