import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  ExternalLink,
  Github,
  Layers,
  ShieldAlert,
  Sparkles,
  Target,
  X,
  Zap,
} from "lucide-react";
import { Section } from "./Section";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "../ui/dialog";
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
      "Balancing visual polish with fast load speed and responsive scaling",
      "Maintaining typographic hierarchy and clarity on compact mobile screens",
      "Distilling the startup's multi-faceted robotics narrative into high-converting copy",
    ],
    learnings: [
      "How to ship a customer-facing production website with ruthless clarity",
      "How to translate high-level business goals into intuitive interface decisions",
    ],
    tech: ["Next.js", "React", "Node.js", "MongoDB", "Tailwind CSS"],
    impact:
      "Production startup platform demonstrating end-to-end engineering ownership, frontend finesse, and real-world deployment experience.",
    github: "https://github.com/Chandrasekhar246800",
    featured: true,
  },
  {
    id: "sqlguru",
    title: "SQLGuru",
    category: "Educational Platform",
    role: "Full Stack Engineer",
    duration: "2024",
    description:
      "Interactive SQL learning platform with hands-on challenges and progress tracking.",
    overview:
      "Built an interactive SQL learning experience focused on immediate feedback, iterative practice, and structured skill progression.",
    problem:
      "Learning SQL is frequently abstract and intimidating when exercises are disconnected from interactive querying and instant visual validation.",
    solution:
      "I designed a guided learning flow featuring challenge-driven execution loops, schema visualizers, and stateful completion tracking.",
    architecture:
      "Next.js frontend with modular practice views, stateful progress tracking, and lesson-driven content organization.",
    challenges: [
      "Keeping client-side execution loops instant and responsive",
      "Designing structured difficulty progression without cognitive overload",
      "Maintaining state consistency across multi-part challenge tracks",
    ],
    learnings: [
      "How to design intuitive developer education flows",
      "How to make complex database concepts approachable and engaging",
    ],
    tech: ["Next.js", "TypeScript", "SQL", "React", "Tailwind CSS"],
    impact:
      "Showcases strong product thinking and the engineering ability to turn complex educational curricula into an elegant interactive app.",
    github: "https://github.com/Chandrasekhar246800",
  },
  {
    id: "satellite-image-classification",
    title: "Satellite Image Classification",
    category: "AI / ML Project",
    role: "ML Researcher & Developer",
    duration: "2024",
    description:
      "A computer vision project for classifying satellite imagery into meaningful land-use categories.",
    overview:
      "Explored and engineered a deep-learning computer vision workflow to segment and classify satellite imagery into actionable land-use categories.",
    problem:
      "Raw high-resolution satellite imagery is difficult to interpret at scale without automated, noise-resilient classification pipelines.",
    solution:
      "I structured an end-to-end pipeline covering multispectral normalization, convolutional model training, inference evaluation, and accuracy validation.",
    architecture:
      "Python-based ML pipeline with preprocessing, augmentation, convolutional network training, and rigorous validation metrics.",
    challenges: [
      "Normalizing varying atmospheric image inputs and spectral bands",
      "Mitigating class imbalance across rare geographical terrain types",
      "Benchmarking model prediction latency versus accuracy tradeoffs",
    ],
    learnings: [
      "How to structure disciplined machine learning workflows from data to inference",
      "How to mathematically reason about model precision and recall tradeoffs",
    ],
    tech: ["Python", "Machine Learning", "Computer Vision", "TensorFlow", "NumPy"],
    impact:
      "Demonstrates technical versatility beyond web systems, reflecting disciplined data engineering and machine learning foundations.",
    github: "https://github.com/Chandrasekhar246800",
  },
  {
    id: "smartdonum",
    title: "SmartDonum",
    category: "Food Donation Platform",
    role: "Full Stack Developer",
    duration: "2024",
    description:
      "A platform connecting food donors with NGOs to reduce food waste and feed the hungry.",
    overview:
      "Built a community platform that bridges food donors (restaurants, events, individuals) with verified local NGOs to minimize waste and streamline aid.",
    problem:
      "Surplus food is wasted daily due to logistical friction, lack of real-time communication, and untrusted coordination channels between donors and charities.",
    solution:
      "I created an operational donation platform with distinct donor and NGO workflows, time-sensitive listing feeds, and clear fulfillment status tracking.",
    architecture:
      "React and Node.js application featuring RESTful API design, schema-validated MongoDB transactions, and role-based access control.",
    challenges: [
      "Designing time-sensitive dispatch states for perishable food items",
      "Handling role-based operational permissions clearly across donors and NGOs",
      "Crafting an uncluttered, legible dashboard for quick mobile coordination",
    ],
    learnings: [
      "How to engineer digital solutions for real-world logistical coordination",
      "How to simplify multi-party workflows without sacrificing data integrity",
    ],
    tech: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    impact:
      "Demonstrates high-empathy product thinking and scalable backend design targeted directly at measurable social impact.",
    github: "https://github.com/Chandrasekhar246800",
  },
  {
    id: "campuscode",
    title: "CampusCode",
    category: "Developer Community",
    role: "Lead Full Stack Developer",
    duration: "2024",
    description:
      "A platform for students to network, collaborate, and share resources in coding communities.",
    overview:
      "Built a specialized community hub for university students to share engineering resources, form hackathon teams, and organize technical workshops.",
    problem:
      "Student developers are frequently scattered across fragmented messaging groups without a central repository for project collaboration or peer discovery.",
    solution:
      "I designed a community-first web platform centered on resource repositories, peer profiles, project spotlights, and event listings.",
    architecture:
      "React and Node.js full-stack system with modular component views, structured MongoDB document collections, and optimized API routes.",
    challenges: [
      "Structuring multi-category resource directories for instant search and filtering",
      "Establishing clear navigation for events, teams, and knowledge sharing",
      "Optimizing initial load performance on varied mobile and campus network speeds",
    ],
    learnings: [
      "How to design engaging social and community user flows",
      "How to balance rich community interaction with clean, low-latency UI",
    ],
    tech: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    impact:
      "Exemplifies collaborative product design and complete full-stack delivery tailored to active developer communities.",
    github: "https://github.com/Chandrasekhar246800",
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
              {project.role && (
                <span className="chip text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                  {project.role}
                </span>
              )}
              {project.duration && (
                <span className="chip text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                  {project.duration}
                </span>
              )}
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
            <Button onClick={onOpen} className="gap-2 cursor-pointer">
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
          className="flex-shrink-0 cursor-pointer"
        >
          <ArrowUpRight className="h-4 w-4" />
        </Button>
      </div>

      <p className="mt-3 text-sm text-muted-foreground">{project.impact}</p>

      <div className="mt-4">
        <TechChips tech={project.tech.slice(0, 4)} />
      </div>

      <div className="mt-auto pt-5">
        <Button onClick={onOpen} variant="outline" className="w-full justify-center cursor-pointer">
          Case Study
        </Button>
      </div>
    </motion.article>
  );
}

/**
 * CaseStudyModal
 * An immersive, full-screen cinematic reader drawer.
 * Eclipses background elements with z-[200], locks background scrolling,
 * and delivers an editorial Linear/Apple-grade reading experience.
 */
function CaseStudyModal({ p, onClose }: { p: Project; onClose: () => void }) {
  const reduceMotion = useReducedMotion();

  return (
    <Dialog open onOpenChange={(next) => !next && onClose()}>
      <DialogPortal>
        {/* Viewport Backdrop: z-[200] ensures complete isolation above the floating Nav (z-[100]) */}
        <DialogOverlay className="fixed inset-0 z-[200] bg-background/90 backdrop-blur-2xl transition-opacity duration-300" />

        {/* Content Container: captures scrolling and covers the entire viewport */}
        <DialogPrimitive.Content
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
          className="fixed inset-0 z-[200] flex flex-col overflow-y-auto [scrollbar-gutter:stable] [scrollbar-width:thin] focus:outline-none select-text"
          aria-describedby="case-study-description"
        >
          {/* Atmospheric ambient lighting */}
          <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
            <div className="absolute left-1/2 top-0 h-[480px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-b from-primary/15 via-secondary/10 to-transparent blur-3xl" />
            <div className="absolute right-0 top-1/4 h-[320px] w-[400px] rounded-full bg-accent/5 blur-3xl" />
          </div>

          {/* Sticky Executive Action Header */}
          <header className="sticky top-0 z-30 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl">
            <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
              {/* Left: Breadcrumb & Meta Pill */}
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="flex items-center gap-2 rounded-full border border-border/80 bg-surface/70 px-3 py-1 font-mono text-xs text-muted-foreground backdrop-blur-md">
                  <Sparkles className="h-3.5 w-3.5 text-accent" />
                  <span className="hidden sm:inline">Case Study</span>
                  <span className="text-border">/</span>
                  <span className="font-semibold text-foreground">{p.title}</span>
                </div>
                {p.featured && (
                  <span className="hidden md:inline-flex items-center rounded-full border border-accent/30 bg-accent/10 px-2.5 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wider text-accent">
                    Featured
                  </span>
                )}
              </div>

              {/* Right: Direct Action Links + Executive Close Button */}
              <div className="flex items-center gap-2 sm:gap-3">
                {p.liveDemo && (
                  <Button
                    asChild
                    size="sm"
                    variant="outline"
                    className="hidden sm:inline-flex gap-1.5 text-xs"
                  >
                    <a href={p.liveDemo} target="_blank" rel="noreferrer">
                      <ExternalLink className="h-3.5 w-3.5" />
                      <span>Live Demo</span>
                    </a>
                  </Button>
                )}
                {p.github && (
                  <Button
                    asChild
                    size="sm"
                    variant="outline"
                    className="hidden sm:inline-flex gap-1.5 text-xs"
                  >
                    <a href={p.github} target="_blank" rel="noreferrer">
                      <Github className="h-3.5 w-3.5" />
                      <span>Code</span>
                    </a>
                  </Button>
                )}
                {p.title === "Robohatch" && (
                  <Button
                    asChild
                    size="sm"
                    variant="outline"
                    className="hidden sm:inline-flex gap-1.5 text-xs"
                  >
                    <a href={RESUME_HREF} target="_blank" rel="noreferrer">
                      <ArrowUpRight className="h-3.5 w-3.5" />
                      <span>Resume</span>
                    </a>
                  </Button>
                )}

                {/* Executive Close Glass Pill */}
                <DialogClose asChild>
                  <button
                    type="button"
                    onClick={onClose}
                    className="group inline-flex items-center gap-2 rounded-full border border-border/80 bg-surface/80 px-3.5 py-1.5 text-xs font-medium text-foreground backdrop-blur-md transition-all duration-200 hover:border-accent/50 hover:bg-surface hover:text-white hover:shadow-[0_0_24px_-4px_rgba(20,241,149,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer"
                    aria-label="Close case study and return to projects"
                  >
                    <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-x-0.5" />
                    <span>Back to Projects</span>
                    <kbd className="hidden sm:inline-flex h-4 items-center rounded border border-border/80 bg-background/80 px-1.5 font-mono text-[10px] text-muted-foreground">
                      Esc
                    </kbd>
                  </button>
                </DialogClose>
              </div>
            </div>
          </header>

          {/* Main Case Study Article */}
          <motion.article
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: 14 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto w-full max-w-4xl px-6 py-10 md:py-14 space-y-12"
          >
            {/* Header / Hero Section */}
            <div className="space-y-5">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="chip-strong text-[11px] font-mono uppercase tracking-widest text-accent">
                  {p.category}
                </span>
                {p.role && (
                  <span className="chip text-[11px] font-mono text-muted-foreground">{p.role}</span>
                )}
                {p.duration && (
                  <span className="chip text-[11px] font-mono text-muted-foreground">
                    {p.duration}
                  </span>
                )}
              </div>

              <div className="space-y-3">
                <DialogTitle className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
                  {p.title}
                </DialogTitle>
                <DialogDescription
                  id="case-study-description"
                  className="max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg"
                >
                  {p.description}
                </DialogDescription>
              </div>

              {/* Core Technologies Chips */}
              <div className="space-y-2 pt-2">
                <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  Core Technologies
                </div>
                <div className="flex flex-wrap gap-2">
                  {p.tech.map((item) => (
                    <span
                      key={item}
                      className="rounded-lg border border-border/70 bg-surface/50 px-3 py-1 font-mono text-xs font-medium text-foreground/90 backdrop-blur-sm transition-colors hover:border-accent/40"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Mobile Action Buttons (visible only on mobile viewports) */}
              <div className="flex flex-wrap gap-3 pt-2 sm:hidden">
                {p.liveDemo && (
                  <Button asChild size="sm" className="gap-1.5 flex-1">
                    <a href={p.liveDemo} target="_blank" rel="noreferrer">
                      <ExternalLink className="h-4 w-4" /> Live Demo
                    </a>
                  </Button>
                )}
                {p.github && (
                  <Button asChild size="sm" variant="outline" className="gap-1.5 flex-1">
                    <a href={p.github} target="_blank" rel="noreferrer">
                      <Github className="h-4 w-4" /> Code
                    </a>
                  </Button>
                )}
              </div>
            </div>

            {/* Impact Banner */}
            <div className="relative overflow-hidden rounded-2xl border border-accent/30 bg-gradient-to-r from-accent/[0.08] via-secondary/[0.05] to-transparent p-6 md:p-7 backdrop-blur-sm">
              <div className="flex items-start gap-4">
                <div className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-xl border border-accent/40 bg-accent/15 text-accent shadow-[0_0_20px_-5px_rgba(20,241,149,0.4)]">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div className="space-y-1.5">
                  <div className="font-mono text-xs font-semibold uppercase tracking-widest text-accent">
                    Key Impact & Engineering Outcome
                  </div>
                  <p className="text-sm font-medium leading-relaxed text-foreground/95 md:text-base">
                    {p.impact}
                  </p>
                </div>
              </div>
            </div>

            {/* Overview Card */}
            <div className="rounded-2xl border border-border/50 bg-surface/40 p-6 md:p-8 backdrop-blur-sm space-y-3">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
                Executive Overview
              </div>
              <p className="text-sm leading-relaxed text-foreground/90 md:text-base">
                {p.overview}
              </p>
            </div>

            {/* Two-Column Problem & Solution Grid */}
            <div className="grid gap-6 md:grid-cols-2">
              {/* Problem */}
              <div className="flex flex-col rounded-2xl border border-destructive/25 bg-destructive/[0.03] p-6 md:p-7 backdrop-blur-sm">
                <div className="mb-4 flex items-center justify-between">
                  <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-rose-400">
                    01 / The Challenge
                  </span>
                  <div className="grid h-8 w-8 place-items-center rounded-lg border border-destructive/30 bg-destructive/10 text-rose-400">
                    <Target className="h-4 w-4" />
                  </div>
                </div>
                <h4 className="font-display text-xl font-bold text-foreground">
                  Problem & Bottlenecks
                </h4>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-[15px]">
                  {p.problem}
                </p>
              </div>

              {/* Solution */}
              <div className="flex flex-col rounded-2xl border border-accent/30 bg-accent/[0.04] p-6 md:p-7 backdrop-blur-sm">
                <div className="mb-4 flex items-center justify-between">
                  <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-accent">
                    02 / The Approach
                  </span>
                  <div className="grid h-8 w-8 place-items-center rounded-lg border border-accent/40 bg-accent/15 text-accent">
                    <Zap className="h-4 w-4" />
                  </div>
                </div>
                <h4 className="font-display text-xl font-bold text-foreground">
                  Engineered Solution
                </h4>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-[15px]">
                  {p.solution}
                </p>
              </div>
            </div>

            {/* Architecture Deep Dive */}
            <div className="rounded-2xl border border-border/60 bg-surface/40 p-6 md:p-8 backdrop-blur-sm space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="grid h-8 w-8 place-items-center rounded-lg border border-secondary/30 bg-secondary/10 text-secondary">
                  <Layers className="h-4 w-4" />
                </div>
                <div>
                  <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-secondary">
                    03 / Architecture & Infrastructure
                  </span>
                  <h4 className="font-display text-xl font-bold text-foreground">
                    System Design & Implementation
                  </h4>
                </div>
              </div>
              <div className="border-t border-border/40 pt-4">
                <p className="text-sm leading-relaxed text-foreground/90 md:text-base">
                  {p.architecture}
                </p>
              </div>
            </div>

            {/* Challenges & Learnings Grid */}
            <div className="grid gap-6 md:grid-cols-2">
              {/* Technical Challenges */}
              <div className="rounded-2xl border border-border/50 bg-surface/30 p-6 md:p-7 backdrop-blur-sm space-y-4">
                <div className="flex items-center gap-2.5">
                  <div className="grid h-8 w-8 place-items-center rounded-lg border border-amber-500/30 bg-amber-500/10 text-amber-400">
                    <ShieldAlert className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="font-mono text-[10px] font-medium uppercase tracking-wider text-amber-400">
                      Obstacles Surmounted
                    </div>
                    <h4 className="font-display text-lg font-bold text-foreground">
                      Engineering Challenges
                    </h4>
                  </div>
                </div>
                <ul className="space-y-3 pt-2">
                  {p.challenges.map((c, idx) => (
                    <li key={c} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <span className="font-mono text-xs font-bold text-amber-400/80 mt-0.5">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <span className="leading-relaxed">{c}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Key Learnings */}
              <div className="rounded-2xl border border-border/50 bg-surface/30 p-6 md:p-7 backdrop-blur-sm space-y-4">
                <div className="flex items-center gap-2.5">
                  <div className="grid h-8 w-8 place-items-center rounded-lg border border-accent/40 bg-accent/15 text-accent">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="font-mono text-[10px] font-medium uppercase tracking-wider text-accent">
                      Key Takeaways
                    </div>
                    <h4 className="font-display text-lg font-bold text-foreground">
                      Architectural Learnings
                    </h4>
                  </div>
                </div>
                <ul className="space-y-3 pt-2">
                  {p.learnings.map((l) => (
                    <li key={l} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                      <span className="leading-relaxed">{l}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom Footer Action Bar */}
            <div className="border-t border-border/50 pt-8 sm:flex sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <div className="space-y-1">
                <div className="font-display text-base font-semibold text-foreground">
                  Explore More Work
                </div>
                <p className="text-xs text-muted-foreground">
                  Ready to return to the project showcase or explore full source code?
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {p.liveDemo && (
                  <Button asChild variant="outline" size="sm" className="gap-2 cursor-pointer">
                    <a href={p.liveDemo} target="_blank" rel="noreferrer">
                      <ExternalLink className="h-4 w-4" /> Live Demo
                    </a>
                  </Button>
                )}
                {p.github && (
                  <Button asChild variant="outline" size="sm" className="gap-2 cursor-pointer">
                    <a href={p.github} target="_blank" rel="noreferrer">
                      <Github className="h-4 w-4" /> View Code
                    </a>
                  </Button>
                )}
                <Button onClick={onClose} className="gap-2 cursor-pointer">
                  <ArrowLeft className="h-4 w-4" /> Back to Projects
                </Button>
              </div>
            </div>
          </motion.article>

          {/* Sticky Mobile Thumb Close Pill (Mobile viewports only) */}
          <div className="sticky bottom-6 mx-auto mb-6 z-40 sm:hidden pointer-events-auto">
            <DialogClose asChild>
              <button
                type="button"
                onClick={onClose}
                className="flex items-center gap-2 rounded-full border border-border/80 bg-background/95 px-5 py-2.5 text-xs font-semibold text-foreground shadow-[0_10px_35px_rgba(0,0,0,0.8)] backdrop-blur-xl transition-transform active:scale-95 cursor-pointer"
              >
                <X className="h-3.5 w-3.5" />
                <span>Close Case Study</span>
              </button>
            </DialogClose>
          </div>
        </DialogPrimitive.Content>
      </DialogPortal>
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

      {open && <CaseStudyModal p={open} onClose={() => setOpen(null)} />}
    </Section>
  );
}
