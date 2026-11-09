import { useRef } from "react";
import { motion, MotionConfig } from "motion/react";
import { Section } from "./Section";
import { MOTION } from "@/lib/portfolio";

const SKILL_CATEGORIES = [
  {
    title: "Frontend",
    color: "from-primary to-secondary",
    skills: [
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
    skills: ["Node.js", "Express.js", "REST APIs", "JWT Auth"],
  },
  {
    title: "Database",
    color: "from-accent to-primary",
    skills: ["MongoDB", "MySQL", "SQL"],
  },
  {
    title: "Programming",
    color: "from-primary to-accent",
    skills: ["Java", "Python", "C"],
  },
  {
    title: "Tools",
    color: "from-secondary to-primary",
    skills: ["Git", "GitHub", "Postman", "VS Code", "Figma", "Vercel", "Netlify"],
  },
];

// Single source of truth: dynamically flatten all category skills with Set deduplication
const ALL_SKILLS = Array.from(new Set(SKILL_CATEGORIES.flatMap((category) => category.skills)));

export function Skills() {
  const track1Ref = useRef<HTMLDivElement>(null);
  const track2Ref = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    track1Ref.current?.getAnimations().forEach((anim) => anim.pause());
    track2Ref.current?.getAnimations().forEach((anim) => anim.pause());
  };

  const handleMouseLeave = () => {
    track1Ref.current?.getAnimations().forEach((anim) => anim.play());
    track2Ref.current?.getAnimations().forEach((anim) => anim.play());
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
      {/* 5 Upper Category Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {SKILL_CATEGORIES.map((category, i) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * MOTION.stagger, ...MOTION.fast }}
            className="group relative overflow-hidden rounded-[var(--radius-2xl)] gradient-border p-6 transition-transform hover:-translate-y-1"
          >
            <div
              className={`absolute -inset-px -z-10 rounded-2xl bg-gradient-to-br ${category.color} opacity-0 transition-opacity duration-500 group-hover:opacity-20`}
            />
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-display text-lg font-semibold">{category.title}</h3>
              <span className="font-mono text-xs text-muted-foreground">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {category.skills.map((skill) => (
                <span key={skill} className="chip">
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pure Infinite Continuous Horizontal Auto-Scrolling Marquee Ribbon */}
      <div
        className="group relative mt-12 w-full overflow-hidden rounded-[var(--radius-2xl)] glass py-5 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Left and right atmospheric edge gradient masks */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />

        {/* Mathematical Twin-Track Circular Loop */}
        <div className="flex w-full overflow-hidden select-none">
          <MotionConfig reducedMotion="never">
            {/* Track 1 */}
            <motion.div
              ref={track1Ref}
              className="flex shrink-0 items-center gap-4 pr-4"
              animate={{ x: ["0%", "-100%"] }}
              transition={{
                repeat: Infinity,
                ease: "linear",
                duration: 35,
              }}
            >
              {ALL_SKILLS.map((skill) => (
                <div
                  key={`track1-${skill}`}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 font-mono text-xs md:text-sm text-zinc-300 backdrop-blur-sm transition-colors hover:border-primary/50 hover:bg-primary/10 cursor-default"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-accent/70 shadow-[0_0_8px_var(--accent)]" />
                  <span>{skill}</span>
                </div>
              ))}
            </motion.div>

            {/* Track 2 (Identical sibling track seamlessly following Track 1) */}
            <motion.div
              ref={track2Ref}
              className="flex shrink-0 items-center gap-4 pr-4"
              animate={{ x: ["0%", "-100%"] }}
              transition={{
                repeat: Infinity,
                ease: "linear",
                duration: 35,
              }}
              aria-hidden="true"
            >
              {ALL_SKILLS.map((skill, index) => (
                <div
                  key={`track2-${skill}-${index}`}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 font-mono text-xs md:text-sm text-zinc-300 backdrop-blur-sm transition-colors hover:border-primary/50 hover:bg-primary/10 cursor-default"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-accent/70 shadow-[0_0_8px_var(--accent)]" />
                  <span>{skill}</span>
                </div>
              ))}
            </motion.div>
          </MotionConfig>
        </div>
      </div>
    </Section>
  );
}
