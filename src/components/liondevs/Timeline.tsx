import { CalendarRange } from "lucide-react";
import { RevealItem, Stagger } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { liondevs } from "@/data/liondevs";
import { ComingSoonCard } from "./ComingSoonCard";

export function Timeline() {
  const items = liondevs.timeline;
  return (
    <section aria-labelledby="ld-timeline" className="section-y bg-ld-bg-2/40">
      <div className="container-site max-w-4xl">
        <SectionHeading
          tone="ld"
          align="center"
          id="ld-timeline"
          eyebrow="Timeline"
          title="The road to pitch day."
          lead={items.length > 0 ? "Dates are tentative and may change." : undefined}
        />
        <div className="mt-12">
          {items.length === 0 ? (
            <ComingSoonCard
              Icon={CalendarRange}
              title="Schedule coming soon"
              text="Key dates will be posted here once they are set."
            />
          ) : (
            <Stagger as="ol" className="relative ml-4 border-l border-ld-gold/30 sm:ml-6">
              {items.map((t) => (
                <RevealItem
                  as="li"
                  key={t.title}
                  className="relative pb-10 pl-8 last:pb-0 sm:pl-10"
                >
                  <span
                    aria-hidden
                    className="absolute top-1.5 -left-[7px] size-3.5 rounded-full border-2 border-ld-gold bg-ld-bg"
                  />
                  <p className="text-sm font-bold tracking-[0.18em] text-ld-gold uppercase">
                    {t.date}
                  </p>
                  <h3 className="mt-1 text-xl font-semibold text-ld-text">{t.title}</h3>
                  {t.text && <p className="mt-2 text-ld-muted">{t.text}</p>}
                </RevealItem>
              ))}
            </Stagger>
          )}
        </div>
      </div>
    </section>
  );
}
