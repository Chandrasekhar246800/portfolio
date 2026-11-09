import { useEffect } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Command } from "cmdk";
import { COMMAND_ACTIONS, NAV_ITEMS } from "@/lib/portfolio";

const NAV = NAV_ITEMS;
const ACTIONS = COMMAND_ACTIONS;

export function CommandPalette({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
}) {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(!open);
      }
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, setOpen]);

  const go = (id: string) => {
    setOpen(false);
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 80);
  };

  const easter = () => {
    setOpen(false);
    if (reduceMotion) return;
    document.body.animate([{ filter: "hue-rotate(0deg)" }, { filter: "hue-rotate(360deg)" }], {
      duration: 1600,
      iterations: 1,
    });
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[300] grid place-items-start bg-background/70 px-4 pt-[14vh] backdrop-blur-xl"
        >
          <motion.div
            initial={{ scale: 0.96, opacity: 0, y: -10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.96, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl overflow-hidden rounded-2xl gradient-border shadow-[0_30px_120px_-30px_rgba(0,0,0,0.8)]"
          >
            <Command label="Command Menu" className="bg-surface/90">
              <Command.Input
                placeholder="Type a command or search…"
                className="w-full border-b border-white/10 bg-transparent px-5 py-4 text-sm outline-none placeholder:text-muted-foreground"
              />
              <Command.List className="max-h-[60vh] overflow-auto p-2">
                <Command.Empty className="px-4 py-6 text-sm text-muted-foreground">
                  No results found.
                </Command.Empty>
                <Command.Group
                  heading="Navigate"
                  className="px-2 text-xs uppercase tracking-widest text-muted-foreground"
                >
                  {NAV.map(({ id, label, icon: Icon }) => (
                    <Command.Item
                      key={id}
                      onSelect={() => go(id)}
                      className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm text-foreground data-[selected=true]:bg-white/10"
                    >
                      <Icon className="h-4 w-4 text-secondary" /> {label}
                    </Command.Item>
                  ))}
                </Command.Group>
                <Command.Group
                  heading="Actions"
                  className="mt-2 px-2 text-xs uppercase tracking-widest text-muted-foreground"
                >
                  {ACTIONS.map((a) => (
                    <Command.Item
                      key={a.id}
                      onSelect={() => {
                        if ("action" in a && a.action === "easter") return easter();
                        if ("href" in a && a.href)
                          window.open(a.href, "_blank", "noopener,noreferrer");
                        setOpen(false);
                      }}
                      className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm text-foreground data-[selected=true]:bg-white/10"
                    >
                      <a.icon className="h-4 w-4 text-accent" /> {a.label}
                    </Command.Item>
                  ))}
                </Command.Group>
              </Command.List>
              <div className="flex items-center justify-between border-t border-white/10 px-4 py-2 text-[11px] text-muted-foreground">
                <span>Navigate with ↑ ↓ · Enter to select</span>
                <span className="font-mono">ESC to close</span>
              </div>
            </Command>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
