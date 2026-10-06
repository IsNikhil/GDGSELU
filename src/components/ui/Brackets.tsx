import { cn } from "@/lib/utils";

/** The angle bracket motif from the GDG logo. Purely decorative. */
export function Brackets({ className, muted = false }: { className?: string; muted?: boolean }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 120 60"
      fill="none"
      strokeLinecap="round"
      strokeWidth="12"
      className={cn(muted && "opacity-60", className)}
    >
      <path d="M40 10 L12 30" stroke="var(--g-red)" />
      <path d="M12 30 L40 50" stroke="var(--g-blue)" />
      <path d="M80 10 L108 30" stroke="var(--g-green)" />
      <path d="M108 30 L80 50" stroke="var(--g-yellow)" />
    </svg>
  );
}
