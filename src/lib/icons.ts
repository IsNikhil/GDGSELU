import {
  GraduationCap,
  Hammer,
  HeartHandshake,
  Lightbulb,
  Mic,
  Share2,
  Trophy,
  Users,
  Wrench,
  type LucideIcon,
} from "lucide-react";

// Icons referenced by name from the data files.
const icons: Record<string, LucideIcon> = {
  GraduationCap,
  Hammer,
  HeartHandshake,
  Lightbulb,
  Mic,
  Share2,
  Trophy,
  Users,
  Wrench,
};

export function getIcon(name: string): LucideIcon {
  return icons[name] ?? Lightbulb;
}
