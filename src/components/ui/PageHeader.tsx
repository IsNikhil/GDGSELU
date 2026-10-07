import type { ReactNode } from "react";
import { Brackets } from "./Brackets";

/** Light page intro with the bracket motif and a soft Google colored glow. */
export function PageHeader({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden border-b border-line">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="blob-a absolute -top-1/2 -left-[10%] size-[min(80vw,520px)] rounded-full bg-[radial-gradient(circle,rgb(66_133_244/0.16),transparent_65%)]" />
        <div className="blob-b absolute -right-[10%] -bottom-1/2 size-[min(80vw,520px)] rounded-full bg-[radial-gradient(circle,rgb(52_168_83/0.14),transparent_65%)]" />
      </div>
      <div className="container-site py-[clamp(3.5rem,8vw,6.5rem)]">
        <Brackets className="rise-in w-16" />
        <p className="rise-in mt-6 text-xs font-bold tracking-[0.22em] text-gold-text uppercase [animation-delay:60ms] sm:text-sm">
          {eyebrow}
        </p>
        <h1 className="rise-in mt-3 max-w-4xl text-[length:var(--text-h1)] font-bold text-fg [animation-delay:120ms]">
          {title}
        </h1>
        {lead && (
          <p className="rise-in mt-5 max-w-2xl text-[length:var(--text-lead)] text-muted [animation-delay:180ms]">
            {lead}
          </p>
        )}
      </div>
    </section>
  );
}
