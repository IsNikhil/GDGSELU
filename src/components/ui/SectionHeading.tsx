import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  tone?: "site" | "ld";
  as?: "h1" | "h2";
  id?: string;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  tone = "site",
  as: Tag = "h2",
  id,
  className,
}: Props) {
  const ld = tone === "ld";
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "mb-3 text-xs font-bold uppercase tracking-[0.22em] sm:text-sm",
            ld ? "text-ld-gold" : "text-gold-text",
          )}
        >
          {eyebrow}
        </p>
      )}
      <Tag
        id={id}
        className={cn(
          "font-bold",
          Tag === "h1" ? "text-[length:var(--text-h1)]" : "text-[length:var(--text-h2)]",
          ld ? "font-serif font-semibold text-ld-text" : "text-fg",
        )}
      >
        {title}
      </Tag>
      {lead && (
        <p
          className={cn(
            "mt-4 text-[length:var(--text-lead)]",
            ld ? "text-ld-muted" : "text-muted",
          )}
        >
          {lead}
        </p>
      )}
    </div>
  );
}
