import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type Tone = "neutral" | "gold" | "ld" | "green";

const tones: Record<Tone, string> = {
  neutral: "border-line bg-surface-2 text-fg",
  gold: "border-[#d4af6a]/60 bg-[#d4af6a]/15 text-gold-text",
  green: "border-[#34a853]/40 bg-[#34a853]/10 text-fg",
  ld: "border-ld-gold/50 bg-ld-gold/10 text-ld-gold-light",
};

export function Badge({
  tone = "neutral",
  className,
  ...props
}: ComponentProps<"span"> & { tone?: Tone }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold tracking-wide",
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}
