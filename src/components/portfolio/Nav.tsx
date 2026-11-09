import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Command } from "lucide-react";
import { Button } from "../ui/button";
import { NAV_ITEMS } from "@/lib/portfolio";

const ITEMS = NAV_ITEMS.map(({ id, label }) => ({
  id,
  label: label.replace(/^Go to /, ""),
}));

export function Nav({ onOpenPalette }: { onOpenPalette: () => void }) {
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );
    ITEMS.forEach((i) => {
      const el = document.getElementById(i.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
      className="fixed left-1/2 top-4 z-[100] w-[min(1100px,calc(100%-1.5rem))] -translate-x-1/2"
    >
      <nav
        className={`flex items-center justify-between rounded-[var(--radius-2xl)] px-3 py-2 transition-all duration-500 ${
          scrolled ? "glass-strong shadow-[0_10px_40px_-20px_rgba(0,0,0,0.6)]" : "glass"
        }`}
      >
        <a href="#home" className="group flex items-center gap-2 px-2">
          <span className="grid h-8 w-8 place-items-center rounded-lg gradient-border font-display text-sm font-bold text-gradient-aurora">
            CR
          </span>
          <span className="hidden font-display text-sm font-semibold sm:inline">Chandra Reddy</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {ITEMS.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className="relative inline-flex items-center rounded-lg px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {active === item.id && (
                  <motion.span
                    layoutId="nav-active"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    className="absolute inset-0 -z-10 rounded-lg bg-white/[0.06] ring-1 ring-white/10"
                  />
                )}
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <Button
          onClick={onOpenPalette}
          variant="outline"
          size="sm"
          aria-label="Open command palette"
          className="gap-2 text-xs text-muted-foreground"
        >
          <Command className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Press</span>
          <kbd className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[10px]">⌘K</kbd>
        </Button>
      </nav>
    </motion.header>
  );
}
