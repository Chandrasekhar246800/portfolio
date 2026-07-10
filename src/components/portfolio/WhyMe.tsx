import { motion } from "motion/react";
import { Brain, Layers, Lightbulb, Rocket, Sparkles, Users, Zap } from "lucide-react";
import { Section } from "./Section";
import { MOTION } from "@/lib/portfolio";

const CARDS = [
  { icon: Zap, title: "Fast Learner", body: "I ramp up on new stacks quickly and ship within days, not weeks." },
  { icon: Lightbulb, title: "Problem Solver", body: "I break complex problems into small, shippable, test-able pieces." },
  { icon: Layers, title: "Full Stack Developer", body: "Comfortable across frontend, backend, and database design." },
  { icon: Rocket, title: "Startup Experience", body: "Production website shipped at Robohatch — real users, real impact." },
  { icon: Sparkles, title: "Modern UI Builder", body: "Premium UX with Tailwind, Framer Motion, and design systems." },
  { icon: Users, title: "Team Collaborator", body: "Calm communicator, async-friendly, opinionated yet open." },
  { icon: Brain, title: "Creative Thinker", body: "I treat product, code, and design as one continuous craft." },
];

export function WhyMe() {
  return (
    <Section
      id="why"
      eyebrow="Why work with me"
      title={<>Engineering meets <span className="text-gradient-aurora">craft</span>.</>}
      description="What you can expect when we build together."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CARDS.map(({ icon: Icon, title, body }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * MOTION.stagger, ...MOTION.fast }}
            whileHover={{ y: -4, rotateX: 4, rotateY: -3 }}
            style={{ transformStyle: "preserve-3d" }}
            className="group relative overflow-hidden rounded-[var(--radius-2xl)] gradient-border p-6 transition-shadow hover:shadow-[0_24px_80px_-20px_rgba(124,58,237,0.45)]"
          >
            <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-primary/0 via-secondary/0 to-accent/0 opacity-0 transition-opacity duration-500 group-hover:from-primary/10 group-hover:via-secondary/10 group-hover:to-accent/10 group-hover:opacity-100" />
            <div className="mb-4 grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-primary/25 to-secondary/25">
              <Icon className="h-5 w-5 text-accent" />
            </div>
            <h3 className="font-display text-lg font-semibold">{title}</h3>
            <p className="mt-1.5 text-sm text-muted-foreground">{body}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
