import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

type Props = {
  /** Bold part of the heading. */
  title: ReactNode;
  /** Optional serif italic ending, e.g. title "What your AI" + accent "can do". */
  accent?: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2";
  id?: string;
  className?: string;
  children?: ReactNode;
};

/** Section heading: Cabinet Grotesk bold with an Instrument Serif italic accent. */
export function SectionHeading({
  title,
  accent,
  lead,
  align = "center",
  as: Tag = "h2",
  id,
  className,
  children,
}: Props) {
  return (
    <Reveal
      blur={8}
      className={cn(align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-xl", className)}
    >
      <Tag id={id} className="mb-5 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
        {title}
        {accent && (
          <>
            {" "}
            <span className="serif-italic">{accent}</span>
          </>
        )}
      </Tag>
      {lead && (
        <p
          className={cn(
            "text-[16px] leading-relaxed text-muted md:text-[17px]",
            align === "center" && "mx-auto max-w-lg",
          )}
        >
          {lead}
        </p>
      )}
      {children}
    </Reveal>
  );
}
