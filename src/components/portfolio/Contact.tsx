import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Check, Github, Linkedin, Mail, MapPin, Send, Sparkles } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import { Section } from "./Section";
import { Button } from "../ui/button";
import { SOCIAL_LINKS } from "@/lib/portfolio";

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  subject: z.string().trim().min(1, "Subject is required").max(150),
  message: z.string().trim().min(1, "Message is required").max(2000),
});

export function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    };
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const r = schema.safeParse(form);
    if (!r.success) {
      const errs: Record<string, string> = {};
      r.error.issues.forEach((i) => (errs[i.path[0] as string] = i.message));
      setErrors(errs);
      toast.error("Please fill out all required fields properly.");
      return;
    }
    setErrors({});
    setSent(true);

    toast.success("Message sent successfully!", {
      description: "Thanks for reaching out! I'll review your note and reply within 24 hours.",
      duration: 4500,
    });

    setForm({ name: "", email: "", subject: "", message: "" });

    if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    resetTimerRef.current = setTimeout(() => {
      setSent(false);
    }, 4500);
  };

  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title={
        <>
          Let's build <span className="text-gradient-aurora">something</span>.
        </>
      }
      description="Open to internships, freelance projects, and collaboration opportunities."
    >
      <div className="grid gap-6 lg:grid-cols-5">
        <div className="space-y-3 lg:col-span-2">
          {[
            ...SOCIAL_LINKS.map(({ icon: Icon, label, href }) => ({
              icon: Icon,
              label,
              value:
                label === "GitHub"
                  ? "@Chandrasekhar246800"
                  : label === "LinkedIn"
                    ? "Chandra Sekhar Reddy"
                    : "mcsr8020@gmail.com",
              href,
            })),
            {
              icon: MapPin,
              label: "Location",
              value: "India · Remote-friendly",
              href: undefined,
            },
          ].map(({ icon: Icon, label, value, href }) => {
            const inner = (
              <div className="group flex items-center gap-4 rounded-2xl glass p-4 transition-colors hover:bg-white/[0.05]">
                <div className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary/25 to-secondary/25">
                  <Icon className="h-4 w-4 text-accent" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">
                    {label}
                  </div>
                  <div className="truncate font-medium">{value}</div>
                </div>
              </div>
            );
            return href ? (
              <a key={label} href={href} target="_blank" rel="noreferrer">
                {inner}
              </a>
            ) : (
              <div key={label}>{inner}</div>
            );
          })}
          <div className="rounded-2xl border border-accent/20 bg-accent/5 p-4 text-sm">
            <div className="mb-1 inline-flex items-center gap-2 font-medium text-accent">
              <Sparkles className="h-4 w-4" /> Currently available
            </div>
            <p className="text-muted-foreground">
              Open to internships, freelance, and collaboration. Usually reply within a day.
            </p>
          </div>
        </div>

        <form
          onSubmit={submit}
          className="lg:col-span-3 rounded-3xl gradient-border p-6 md:p-8 space-y-4"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Name" error={errors.name}>
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Jane Doe"
                className="input-field"
              />
            </Field>
            <Field label="Email" error={errors.email}>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="jane@company.com"
                className="input-field"
              />
            </Field>
          </div>
          <Field label="Subject" error={errors.subject}>
            <input
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              placeholder="Project, internship, or collaboration?"
              className="input-field"
            />
          </Field>
          <Field label="Message" error={errors.message}>
            <textarea
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              rows={5}
              placeholder="Tell me a bit about what you're building…"
              className="input-field resize-none"
            />
          </Field>

          <Button type="submit" className="w-full justify-center">
            {sent ? (
              <>
                <Check className="h-4 w-4" /> Message sent
              </>
            ) : (
              <>
                <Send className="h-4 w-4" /> Send message
              </>
            )}
          </Button>
        </form>
      </div>

      <style>{`
        .input-field {
          width: 100%;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 0.875rem;
          padding: 0.75rem 0.95rem;
          color: var(--foreground);
          outline: none;
          transition: border-color .2s, background .2s, box-shadow .2s;
          font-family: var(--font-sans);
        }
        .input-field::placeholder { color: var(--muted-foreground); }
        .input-field:focus {
          border-color: color-mix(in oklab, var(--primary) 55%, transparent);
          background: rgba(255,255,255,0.06);
          box-shadow: 0 0 0 4px color-mix(in oklab, var(--primary) 18%, transparent);
        }
      `}</style>
    </Section>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <div className="mb-1.5 flex items-center justify-between text-xs uppercase tracking-widest">
        <span className="text-muted-foreground">{label}</span>
        {error && <span className="text-destructive normal-case tracking-normal">{error}</span>}
      </div>
      {children}
    </label>
  );
}
