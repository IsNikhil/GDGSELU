import type { ReactNode } from "react";
import { rise } from "@/lib/utils";
import { Sky } from "./Sky";

/** Page intro: sky backdrop, bold headline with a serif italic accent, staged rise in. */
export function PageHeader({
  title,
  accent,
  lead,
  children,
}: {
  title: ReactNode;
  accent?: ReactNode;
  lead?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="relative flex flex-col items-center overflow-x-clip px-6 pt-[calc(var(--nav-h)+4rem)] pb-16 md:pt-[calc(var(--nav-h)+5.5rem)] md:pb-24">
      <Sky className="h-[70vh] min-h-[480px]" />
      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center text-center">
        <h1 className="rise mb-5" style={rise({ y: 30, blur: 6, delay: 0.25 })}>
          <span className="block text-[clamp(2.25rem,10.5vw,3rem)] leading-[0.95] font-extrabold tracking-[-0.03em] text-foreground md:text-[clamp(3rem,5vw,3.75rem)]">
            {title}
          </span>
          {accent && (
            <span className="serif-italic block text-[clamp(2.25rem,10.5vw,3rem)] leading-[1.05] tracking-[-0.02em] text-foreground md:text-[clamp(3rem,5vw,3.75rem)]">
              {accent}
            </span>
          )}
        </h1>
        {lead && (
          <p
            className="rise max-w-xl text-[15px] leading-[1.65] text-muted"
            style={rise({ y: 20, dur: 0.6, delay: 0.45 })}
          >
            {lead}
          </p>
        )}
        {children && (
          <div className="rise mt-7" style={rise({ y: 20, dur: 0.6, delay: 0.6 })}>
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
