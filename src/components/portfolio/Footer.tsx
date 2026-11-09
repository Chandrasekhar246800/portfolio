import { ArrowUp, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "../ui/button";
import { RESUME_HREF, SOCIAL_LINKS } from "@/lib/portfolio";

const LINKS = [
  { id: "about", label: "About" },
  { id: "why", label: "Why Me" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="relative mt-20 border-t border-white/10">
      <div className="aurora" />
      <div className="relative mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-3">
        <div>
          <a href="#home" className="inline-flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-lg gradient-border font-display text-sm font-bold text-gradient-aurora">
              CR
            </span>
            <span className="font-display font-semibold">Chandra Sekhar Reddy</span>
          </a>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            Full Stack Developer building scalable, modern web experiences.
          </p>
        </div>

        <div>
          <div className="mb-3 text-xs uppercase tracking-widest text-muted-foreground">
            Quick Links
          </div>
          <ul className="grid grid-cols-2 gap-1.5 text-sm">
            {LINKS.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col items-start gap-4 md:items-end">
          <div className="flex gap-2">
            {SOCIAL_LINKS.map(({ href, icon: Icon, label }) => (
              <Button
                key={label}
                asChild
                variant="outline"
                size="icon"
                aria-label={label}
                className="rounded-full"
              >
                <a href={href} target="_blank" rel="noreferrer">
                  <Icon className="h-4 w-4" />
                </a>
              </Button>
            ))}
          </div>
          <Button asChild variant="outline">
            <a href={RESUME_HREF} target="_blank" rel="noreferrer">
              <ArrowUp className="h-4 w-4" /> Resume
            </a>
          </Button>
          <Button asChild variant="outline">
            <a href="#home">
              <ArrowUp className="h-4 w-4" /> Back to top
            </a>
          </Button>
        </div>
      </div>
      <div className="border-t border-white/5">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-6 py-5 text-xs text-muted-foreground md:flex-row">
          <span>© {new Date().getFullYear()} Chandra Sekhar Reddy. All rights reserved.</span>
          <span className="font-mono">Crafted with care · Press ⌘K to navigate</span>
        </div>
      </div>
    </footer>
  );
}
