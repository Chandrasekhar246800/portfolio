import { useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, ExternalLink, Github, Sparkles } from "lucide-react";
import { Section } from "./Section";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { MOTION, RESUME_HREF } from "@/lib/portfolio";

type Project = {
  id: string;
  title: string;
  category: string;
  role?: string;
  duration?: string;
  description: string;
  overview: string;
  problem: string;
  solution: string;
  architecture: string;
  challenges: string[];
  learnings: string[];
  tech: string[];
  impact: string;
  github?: string;
  liveDemo?: string;
  featured?: boolean;
};

const PROJECTS: Project[] = [
  {
    id: "robohatch",
    title: "Robohatch",
    category: "Production Startup Project",
    role: "Full Stack Developer",
    duration: "Jan 2025 – Jun 2025",
    description:
      "Built the official startup website end-to-end, shaping the product story, frontend system, and production experience.",
    overview:
      "Designed and shipped the official Robohatch website as a production-facing platform that communicates the startup clearly and credibly.",
    problem:
      "The startup needed a polished public presence that could express trust, speed, and technical maturity without feeling overdesigned.",
    solution:
      "I built a responsive marketing experience with a clean information hierarchy, strong visual system, and production-ready frontend structure.",
    architecture:
      "Next.js application architecture with component-driven UI, reusable sections, responsive layouts, and backend-ready integration points.",
    challenges: [
      "Balancing visual polish with load speed",
      "Maintaining hierarchy on smaller screens",
      "Keeping the startup story concise",
    ],
    learnings: [
      "How to ship a production website with clarity",
      "How to translate business goals into interface decisions",
    ],
    tech: ["Next.js", "React", "Node.js", "MongoDB", "Tailwind CSS"],
    impact:
      "Production startup site that demonstrates end-to-end ownership, frontend quality, and real shipping experience.",
    github: "https://github.com/Chandrasekhar246800",
    featured: true,
  },
  {
    id: "sqlguru",
    title: "SQLGuru",
    category: "Educational Platform",
    description:
      "Interactive SQL learning platform with hands-on challenges and progress tracking.",
    overview:
      "Built an interactive SQL learning experience focused on practice, progress, and structured learning.",
    problem:
      "Learning SQL can feel abstract when practice is disconnected from feedback and progression.",
    solution:
      "I designed a guided learning flow with challenge-driven interaction and a clear progression model.",
    architecture:
      "Next.js front end with modular practice views, stateful progress tracking, and lesson-driven content organization.",
    challenges: [
      "Keeping practice loops fast",
      "Making progression easy to follow",
      "Keeping content structured",
    ],
    learnings: ["How to design learning flows", "How to keep complex content approachable"],
    tech: ["Next.js", "TypeScript", "SQL", "React"],
    impact:
      "Shows product thinking and the ability to turn technical learning into a usable interface.",
  },
  {
    id: "satellite-image-classification",
    title: "Satellite Image Classification",
    category: "AI / ML Project",
    description:
      "A computer vision project for classifying satellite imagery into meaningful land-use categories.",
    overview:
      "Explored a computer vision workflow for classifying satellite imagery into land-use categories.",
    problem:
      "Raw satellite imagery is difficult to interpret without a reliable classification pipeline.",
    solution:
      "I structured the project around image preprocessing, model training, and prediction evaluation.",
    architecture:
      "Python-based ML pipeline with preprocessing, model training, inference, and evaluation steps.",
    challenges: [
      "Normalizing image inputs",
      "Managing model quality",
      "Evaluating predictions consistently",
    ],
    learnings: ["How to structure an ML workflow", "How to reason about model tradeoffs"],
    tech: ["Python", "Machine Learning", "Computer Vision", "TensorFlow"],
    impact: "Demonstrates technical breadth beyond frontend work and a disciplined ML workflow.",
  },
  {
    id: "smartdonum",
    title: "SmartDonum",
    category: "Food Donation Platform",
    description:
      "A platform connecting food donors with NGOs to reduce food waste and feed the hungry.",
    overview:
      "Built a service platform connecting food donors and NGOs to reduce waste and improve distribution.",
    problem:
      "Food donation workflows need to be simple, trustworthy, and operationally clear for all users.",
    solution:
      "I created a structured platform with donor and NGO flows, requests, and lightweight operational clarity.",
    architecture:
      "React and Node.js application with structured workflows, API-driven interactions, and MongoDB-backed data.",
    challenges: [
      "Keeping flows trustworthy",
      "Handling operational states clearly",
      "Making the dashboard understandable",
    ],
    learnings: [
      "How to design for real-world coordination",
      "How to simplify multi-user workflows",
    ],
    tech: ["React", "Node.js", "Express", "MongoDB"],
    impact: "Shows product and backend thinking in a real-world social impact context.",
  },
  {
    id: "campuscode",
    title: "CampusCode",
    category: "Developer Community",
    description:
      "A platform for students to network, collaborate, and share resources in coding communities.",
    overview:
      "Built a community platform for students to collaborate, share work, and stay connected.",
    problem: "Student communities need a focused space to collaborate without friction or clutter.",
    solution:
      "I designed a community-first experience centered on collaboration, resource sharing, and events.",
    architecture:
      "React and Node.js stack with content organization, collaborative workflows, and data persistence.",
    challenges: [
      "Keeping community actions organized",
      "Making collaboration paths obvious",
      "Supporting resource sharing",
    ],
    learnings: ["How to design social product flows", "How to keep community UI efficient"],
    tech: ["React", "Node.js", "MongoDB"],
    impact:
      "Demonstrates community product design and full-stack execution across a multi-user experience.",
  },
];

function TechChips({ tech }: { tech: string[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {tech.map((item) => (
        <span key={item} className="chip">
          {item}
        </span>
      ))}
    </div>
  );
}

function FeaturedProjectCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={MOTION.enter}
      whileHover={{ y: -4 }}
      className="group relative overflow-hidden rounded-[var(--radius-3xl)] gradient-border p-6 md:p-8"
    >
      <div className="pointer-events-none absolute -inset-px -z-10 rounded-[var(--radius-3xl)] bg-gradient-to-br from-primary via-secondary to-accent opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-30" />

      <div className="grid gap-6 md:min-h-[470px] md:grid-cols-[1.05fr_0.95fr] md:items-stretch">
        <div className="flex h-full flex-col justify-between gap-6">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="chip-strong text-[10px] font-medium uppercase tracking-widest text-accent">
                Production Startup Project
              </span>
              <span className="chip text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                {project.role}
              </span>
              <span className="chip text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                {project.duration}
              </span>
            </div>

            <div>
              <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                {project.category}
              </div>
              <h3 className="mt-2 font-display text-3xl font-bold md:text-4xl">{project.title}</h3>
            </div>

            <p className="max-w-xl text-sm leading-6 text-muted-foreground md:text-[15px]">
              {project.description}
            </p>

            <TechChips tech={project.tech} />
          </div>

          <div className="flex flex-wrap gap-3 pt-1">
            <Button onClick={onOpen} className="gap-2">
              <ArrowUpRight className="h-4 w-4" /> Case Study
            </Button>
            {project.liveDemo && (
              <Button asChild variant="outline">
                <a href={project.liveDemo} target="_blank" rel="noreferrer" className="gap-2">
                  <ExternalLink className="h-4 w-4" /> Live Demo
                </a>
              </Button>
            )}
            {project.github && (
              <Button asChild variant="outline">
                <a href={project.github} target="_blank" rel="noreferrer" className="gap-2">
                  <Github className="h-4 w-4" /> GitHub
                </a>
              </Button>
            )}
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[var(--radius-2xl)] border border-white/10">
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-accent opacity-35" />
          <div className="absolute inset-0 grid-bg opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-background/10 to-transparent" />
          <div className="absolute inset-0 p-4 md:p-5">
            <div className="flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-2xl)-4px)] border border-white/10 bg-background/40 backdrop-blur-sm">
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                <span>Preview</span>
                <span>Production Ready</span>
              </div>
              <div className="grid flex-1 place-items-center p-4">
                <div className="relative w-full max-w-md rounded-[var(--radius-xl)] border border-white/10 bg-background/60 p-4 shadow-[0_20px_80px_-30px_rgba(0,0,0,0.7)]">
                  <div className="absolute inset-0 rounded-[var(--radius-xl)] bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10" />
                  <div className="relative space-y-3">
                    <div className="flex gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-accent/80" />
                      <span className="h-2.5 w-2.5 rounded-full bg-secondary/80" />
                      <span className="h-2.5 w-2.5 rounded-full bg-primary/80" />
                    </div>
                    <div className="rounded-[var(--radius-lg)] border border-white/10 bg-white/[0.04] p-4">
                      <div className="font-display text-2xl font-bold text-gradient md:text-3xl">
                        {project.title.split(" ")[0]}
                      </div>
                      <div className="mt-3 grid grid-cols-2 gap-2 text-[11px] text-muted-foreground">
                        <div className="rounded-xl border border-white/10 bg-black/10 px-3 py-2">
                          Ship fast
                        </div>
                        <div className="rounded-xl border border-white/10 bg-black/10 px-3 py-2">
                          Stay polished
                        </div>
                        <div className="rounded-xl border border-white/10 bg-black/10 px-3 py-2">
                          Scale cleanly
                        </div>
                        <div className="rounded-xl border border-white/10 bg-black/10 px-3 py-2">
                          Improve clarity
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
    </motion.article>
  );
}

function ProofCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={MOTION.enter}
      whileHover={{ y: -3 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-3xl)] gradient-border p-6"
    >
      <div className="pointer-events-none absolute -inset-px -z-10 rounded-[var(--radius-3xl)] bg-gradient-to-br from-primary via-secondary to-accent opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-20" />

      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            {project.category}
          </div>
          <h3 className="mt-1 font-display text-xl font-semibold">{project.title}</h3>
        </div>
        <Button
          onClick={onOpen}
          variant="outline"
          size="icon"
          aria-label={`Open ${project.title} case study`}
          className="flex-shrink-0"
        >
          <ArrowUpRight className="h-4 w-4" />
        </Button>
      </div>

      <p className="mt-3 text-sm text-muted-foreground">{project.impact}</p>

      <div className="mt-4">
        <TechChips tech={project.tech.slice(0, 4)} />
      </div>

      <div className="mt-auto pt-5">
        <Button onClick={onOpen} variant="outline" className="w-full justify-center">
          Case Study
        </Button>
      </div>
    </motion.article>
  );
}

function SectionBlock({ title, body }: { title: string; body: string }) {
  return (
    <div className="mt-6">
      <div className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">{title}</div>
      <p className="text-sm leading-6 text-foreground/90">{body}</p>
    </div>
  );
}

function SectionList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="mt-6">
      <div className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">{title}</div>
      <ul className="grid gap-2 text-sm sm:grid-cols-2">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2">
            <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-accent" /> {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Modal({ p, onClose }: { p: Project; onClose: () => void }) {
  return (
    <Dialog open onOpenChange={(next) => !next && onClose()}>
      <DialogContent className="max-h-[85vh] overflow-auto p-8 backdrop-blur-xl sm:max-w-2xl">
        <DialogHeader className="text-left">
          <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            {p.category}
          </div>
          <DialogTitle className="font-display text-3xl font-bold text-gradient">
            {p.title}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">{p.description}</DialogDescription>
        </DialogHeader>

        <SectionBlock title="Overview" body={p.overview} />
        <SectionBlock title="Problem" body={p.problem} />
        <SectionBlock title="Solution" body={p.solution} />
        <SectionBlock title="Architecture" body={p.architecture} />

        <div className="mt-6">
          <div className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">
            Tech Stack
          </div>
          <TechChips tech={p.tech} />
        </div>

        <SectionList title="Challenges" items={p.challenges} />
        <SectionList title="Learnings" items={p.learnings} />

        <div className="mt-7 flex flex-wrap gap-3">
          {p.github && (
            <Button asChild variant="outline">
              <a href={p.github} target="_blank" rel="noreferrer">
                <Github className="h-4 w-4" /> GitHub
              </a>
            </Button>
          )}
          {p.liveDemo && (
            <Button asChild variant="outline">
              <a href={p.liveDemo} target="_blank" rel="noreferrer">
                <ExternalLink className="h-4 w-4" /> Live Demo
              </a>
            </Button>
          )}
          {p.title === "Robohatch" && (
            <Button asChild variant="outline">
              <a href={RESUME_HREF} target="_blank" rel="noreferrer">
                <ArrowUpRight className="h-4 w-4" /> Resume
              </a>
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function Projects() {
  const [open, setOpen] = useState<Project | null>(null);
  const featured = PROJECTS.find((p) => p.id === "robohatch")!;
  const rest = PROJECTS.filter((p) => p.id !== "robohatch");

  return (
    <Section
      id="projects"
      eyebrow="Selected work"
      title={
        <>
          Projects with <span className="text-gradient-aurora">real impact</span>.
        </>
      }
      description="Production output that demonstrates engineering ability, production experience, technical breadth, and product thinking."
    >
      <FeaturedProjectCard project={featured} onOpen={() => setOpen(featured)} />

      <div className="mt-5 grid gap-5 md:grid-cols-2">
        {rest.map((project) => (
          <ProofCard key={project.id} project={project} onOpen={() => setOpen(project)} />
        ))}
      </div>

      {open && <Modal p={open} onClose={() => setOpen(null)} />}
    </Section>
  );
}
