import { RevealItem, Stagger } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { liondevs } from "@/data/liondevs";
import { getIcon } from "@/lib/icons";

/** The five poster highlights. Snap scroll on phones, 2 columns on tablet, one row on desktop. */
export function Highlights() {
  return (
    <section aria-labelledby="ld-highlights" className="section-y">
      <div className="container-site">
        <SectionHeading
          tone="ld"
          align="center"
          id="ld-highlights"
          eyebrow="Why join"
          title="More than a competition."
        />
      </div>
      {/* Scrollable on phones, so it is focusable and labelled for keyboard users. */}
      <div
        tabIndex={0}
        role="region"
        aria-label="Event highlights"
        className="mt-12 snap-x snap-mandatory overflow-x-auto pb-4 [scrollbar-width:none] sm:overflow-visible sm:pb-0"
      >
        <Stagger
          as="ul"
          className="container-site flex gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-5"
        >
          {liondevs.highlights.map((h) => {
            const Icon = getIcon(h.icon);
            return (
              <RevealItem
                as="li"
                key={h.text}
                className="flex w-[72%] shrink-0 snap-center flex-col items-center rounded-3xl border border-ld-gold/15 bg-ld-bg-2/50 px-5 py-8 text-center transition-colors duration-300 hover:border-ld-gold/50 sm:w-auto"
              >
                <span className="flex size-20 items-center justify-center rounded-full border-[1.5px] border-ld-gold text-ld-gold-light shadow-[0_0_30px_-8px_rgb(212_179_106/0.5)]">
                  <Icon aria-hidden className="size-9" strokeWidth={1.6} />
                </span>
                <p className="mt-5 font-medium text-ld-text">{h.text}</p>
              </RevealItem>
            );
          })}
        </Stagger>
      </div>
      <p className="mt-2 text-center text-xs text-ld-muted sm:hidden">Swipe to see more</p>
    </section>
  );
}
