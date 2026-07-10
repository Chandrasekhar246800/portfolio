import type { LucideIcon } from "lucide-react";
import { Briefcase, Code2, FileText, Github, Home, Linkedin, Mail, Sparkles, Trophy, User, Wrench } from "lucide-react";

export const RESUME_HREF = "/Chandra_Sekhar_Reddy_Resume.pdf";

export const NAV_ITEMS: Array<{ id: string; label: string; icon: LucideIcon }> = [
  { id: "home", label: "Go to Home", icon: Home },
  { id: "about", label: "Go to About", icon: User },
  { id: "skills", label: "Go to Skills", icon: Wrench },
  { id: "experience", label: "Go to Experience", icon: Briefcase },
  { id: "projects", label: "Go to Projects", icon: Code2 },
  { id: "achievements", label: "Go to Achievements", icon: Trophy },
  { id: "contact", label: "Go to Contact", icon: Mail },
];

export const SOCIAL_LINKS: Array<{ label: string; href: string; icon: LucideIcon }> = [
  { label: "GitHub", href: "https://github.com/Chandrasekhar246800", icon: Github },
  { label: "LinkedIn", href: "https://linkedin.com/in/chandra-sekhar-54040b232", icon: Linkedin },
  { label: "Email", href: "mailto:mcsr8020@gmail.com", icon: Mail },
];

export const COMMAND_ACTIONS: Array<
  | { id: string; label: string; icon: LucideIcon; href: string }
  | { id: string; label: string; icon: LucideIcon; action: "easter" }
> = [
  { id: "resume", label: "Download Resume", icon: FileText, href: RESUME_HREF },
  { id: "github", label: "Open GitHub", icon: Github, href: "https://github.com/Chandrasekhar246800" },
  { id: "easter", label: "Easter Egg ✨", icon: Sparkles, action: "easter" },
];

export const MOTION = {
  enter: { duration: 0.55, ease: [0.65, 0, 0.35, 1] as const },
  fast: { duration: 0.35, ease: [0.65, 0, 0.35, 1] as const },
  stagger: 0.06,
};
