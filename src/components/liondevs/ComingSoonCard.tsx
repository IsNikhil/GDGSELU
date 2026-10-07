import type { LucideIcon } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { CircuitCorner } from "./CircuitLines";

/** Gold bordered placeholder used while a detail is still TBD. */
export function ComingSoonCard({
  Icon,
  title,
  text,
}: {
  Icon: LucideIcon;
  title: string;
  text: string;
}) {
  return (
    <Reveal>
      <div className="relative overflow-hidden rounded-[1.75rem] border border-dashed border-ld-gold/45 bg-ld-bg-2/60 px-6 py-12 text-center sm:px-10 sm:py-16">
        <CircuitCorner
          corner="tr"
          draw={false}
          className="absolute top-0 right-0 w-32 opacity-40"
        />
        <CircuitCorner
          corner="bl"
          draw={false}
          className="absolute bottom-0 left-0 w-32 opacity-40"
        />
        <span className="glow-pulse mx-auto flex size-16 items-center justify-center rounded-full border-[1.5px] border-ld-gold text-ld-gold-light">
          <Icon aria-hidden className="size-7" strokeWidth={1.6} />
        </span>
        <p className="mt-6 font-serif text-[length:var(--text-h3)] font-semibold text-ld-text">
          {title}
        </p>
        <p className="mx-auto mt-3 max-w-md text-ld-muted">{text}</p>
      </div>
    </Reveal>
  );
}
