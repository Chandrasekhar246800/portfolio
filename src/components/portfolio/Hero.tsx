import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { ArrowDown, ArrowUpRight, Download, Github, Linkedin, Mail, Sparkles } from "lucide-react";
import { MagneticButton } from "./MagneticButton";
import { Button } from "../ui/button";
import { RESUME_HREF, SOCIAL_LINKS } from "@/lib/portfolio";

const ROLES = [
  "Full Stack Developer",
  "Next.js Engineer",
  "React Architect",
  "CS Engineering Student",
];

function Typer() {
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [del, setDel] = useState(false);

  useEffect(() => {
    const target = ROLES[i];
    const speed = del ? 35 : 70;
    const t = setTimeout(() => {
      if (!del) {
        const next = target.slice(0, text.length + 1);
        setText(next);
        if (next === target) setTimeout(() => setDel(true), 1400);
      } else {
        const next = target.slice(0, text.length - 1);
        setText(next);
        if (next === "") {
          setDel(false);
          setI((p) => (p + 1) % ROLES.length);
        }
      }
    }, speed);
    return () => clearTimeout(t);
  }, [text, del, i]);

  return (
    <span className="inline-flex items-baseline">
      <span className="text-gradient-aurora">{text}</span>
      <span className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[2px] animate-pulse bg-accent" />
    </span>
  );
}

const METRICS = [
  { label: "Projects Built", value: 12, suffix: "+" },
  { label: "Technologies", value: 24, suffix: "+" },
  { label: "GitHub Repos", value: 30, suffix: "+" },
  { label: "Years Learning", value: 4, suffix: "" },
];

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const dur = 1400;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.floor(eased * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to]);
  return (
    <span className="font-display text-3xl font-bold tracking-tight md:text-4xl">
      {n}
      <span className="text-gradient-aurora">{suffix}</span>
    </span>
  );
}

function Particles() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let raf = 0;
    let w = 0,
      h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const pts: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      c: string;
    }[] = [];
    const colors = ["rgba(124,58,237,0.9)", "rgba(6,182,212,0.85)", "rgba(20,241,149,0.8)"];
    const mouse = { x: -9999, y: -9999 };

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      pts.length = 0;
      const count = Math.min(70, Math.floor((w * h) / 22000));
      for (let i = 0; i < count; i++) {
        pts.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          r: Math.random() * 1.6 + 0.4,
          c: colors[i % colors.length],
        });
      }
    };

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      // links
      for (let i = 0; i < pts.length; i++) {
        const a = pts[i];
        a.x += a.vx;
        a.y += a.vy;
        if (a.x < 0 || a.x > w) a.vx *= -1;
        if (a.y < 0 || a.y > h) a.vy *= -1;

        const mdx = a.x - mouse.x;
        const mdy = a.y - mouse.y;
        const md = Math.hypot(mdx, mdy);
        if (md < 120) {
          a.x += (mdx / md) * 0.6;
          a.y += (mdy / md) * 0.6;
        }

        for (let j = i + 1; j < pts.length; j++) {
          const b = pts[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d < 130) {
            ctx.strokeStyle = `rgba(148,163,184,${(1 - d / 130) * 0.18})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
        ctx.fillStyle = a.c;
        ctx.beginPath();
        ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);
  return <canvas ref={ref} className="absolute inset-0 h-full w-full" aria-hidden="true" />;
}

export function Hero() {
  const reduceMotion = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });
  const tx = useTransform(sx, (v) => v * 14);
  const ty = useTransform(sy, (v) => v * 14);

  useEffect(() => {
    if (reduceMotion) return;
    const onMove = (e: MouseEvent) => {
      mx.set((e.clientX / window.innerWidth - 0.5) * 2);
      my.set((e.clientY / window.innerHeight - 0.5) * 2);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my, reduceMotion]);

  return (
    <section id="home" className="relative isolate min-h-dvh overflow-hidden pt-28">
      {/* Background layers */}
      <div className="absolute inset-0 -z-30 grid-bg" />
      <div className="absolute inset-0 -z-20">{!reduceMotion && <Particles />}</div>
      <motion.div
        style={reduceMotion ? undefined : { x: tx, y: ty }}
        className="absolute inset-0 -z-10"
      >
        <div className="aurora" />
      </motion.div>
      <div className="noise -z-10" />

      <div className="mx-auto flex max-w-6xl flex-col items-center px-6 pb-24 pt-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full glass px-3.5 py-1.5 text-xs text-muted-foreground"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
          </span>
          Available for internships & freelance
        </motion.div>

        <h1 className="font-display text-[clamp(2.75rem,9vw,7rem)] font-bold leading-[0.95] tracking-tight">
          <motion.span
            initial={{ opacity: 0, y: 40, filter: "blur(20px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
            className="block text-gradient"
          >
            Chandra Sekhar
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 40, filter: "blur(20px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              duration: 0.9,
              delay: 0.15,
              ease: [0.65, 0, 0.35, 1],
            }}
            className="block text-gradient-aurora"
          >
            Reddy
          </motion.span>
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.6 }}
          className="mt-6 font-display text-xl text-foreground/90 md:text-2xl"
        >
          I'm a <Typer />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mt-5 max-w-2xl text-balance text-muted-foreground md:text-lg"
        >
          Building scalable web applications, modern user experiences, and real-world digital
          products. Computer Science Engineering student crafting high-performance apps with React,
          Next.js, and Node.js.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.6 }}
          className="mt-9 flex flex-wrap items-center justify-center gap-3"
        >
          <MagneticButton>
            <Button asChild>
              <a href="#projects" className="group">
                <Sparkles className="h-4 w-4" />
                View Projects
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </Button>
          </MagneticButton>
          <MagneticButton>
            <Button asChild variant="outline">
              <a href={RESUME_HREF} target="_blank" rel="noreferrer">
                <Download className="h-4 w-4" />
                Download Resume
              </a>
            </Button>
          </MagneticButton>
          <MagneticButton>
            <Button asChild variant="secondary">
              <a href="#contact">
                <Mail className="h-4 w-4" />
                Contact Me
              </a>
            </Button>
          </MagneticButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.05 }}
          className="mt-7 flex items-center gap-4 text-muted-foreground"
        >
          {SOCIAL_LINKS.map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="grid h-10 w-10 place-items-center rounded-full glass transition-all hover:text-foreground hover:scale-110"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </motion.div>

        {/* Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.15, duration: 0.6 }}
          className="mt-16 grid w-full max-w-3xl grid-cols-2 gap-3 md:grid-cols-4"
        >
          {METRICS.map((m) => (
            <div
              key={m.label}
              className="rounded-2xl glass p-5 text-left transition-colors hover:bg-white/[0.05]"
            >
              <Counter to={m.value} suffix={m.suffix} />
              <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                {m.label}
              </div>
            </div>
          ))}
        </motion.div>

        <motion.a
          href="#about"
          aria-label="Scroll to about"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="mt-14 inline-flex flex-col items-center gap-2 text-xs text-muted-foreground"
        >
          <span className="uppercase tracking-[0.25em]">Scroll</span>
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            className="grid h-9 w-9 place-items-center rounded-full border border-white/10"
          >
            <ArrowDown className="h-4 w-4" />
          </motion.span>
        </motion.a>
      </div>
    </section>
  );
}
