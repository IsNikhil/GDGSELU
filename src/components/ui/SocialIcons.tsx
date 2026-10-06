import type { SVGProps } from "react";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

export function LinkedInIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}

export function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden {...props}>
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.6" cy="6.4" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

type Tone = "site" | "ld" | "onDark";

const tones: Record<Tone, string> = {
  site: "border-line bg-surface text-fg hover:border-[#1a73e8] hover:text-[#1a73e8] dark:hover:border-[#8ab4f8] dark:hover:text-[#8ab4f8]",
  ld: "border-ld-gold/50 text-ld-gold-light hover:border-ld-gold-light hover:bg-ld-gold/10",
  onDark: "border-white/25 text-white hover:border-white hover:bg-white/10",
};

export function SocialLinks({ tone = "site", className }: { tone?: Tone; className?: string }) {
  const links = [
    { label: "GDG Southeastern on LinkedIn", href: site.social.linkedin, Icon: LinkedInIcon },
    { label: "GDG Southeastern on Instagram", href: site.social.instagram, Icon: InstagramIcon },
  ];
  return (
    <ul className={cn("flex items-center gap-3", className)}>
      {links.map(({ label, href, Icon }) => (
        <li key={href}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className={cn(
              "flex size-12 items-center justify-center rounded-full border transition-[transform,color,border-color,background-color] duration-200 hover:-translate-y-0.5 motion-reduce:hover:translate-y-0",
              tones[tone],
            )}
          >
            <Icon className="size-5" />
          </a>
        </li>
      ))}
    </ul>
  );
}
