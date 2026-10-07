import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { liondevs } from "@/data/liondevs";
import { isTBD } from "@/lib/utils";

type Detail = {
  id: string;
  title: string;
  accent: string;
  lead: string;
  value: string;
  pending: string;
};

const details: Detail[] = [
  {
    id: "ld-challenge",
    title: "A real problem.",
    accent: "Your solution.",
    lead: "Every team works on the same real-world challenge. We will share it closer to the event.",
    value: liondevs.challenge,
    pending: "Challenge reveal coming soon",
  },
  {
    id: "ld-prizes",
    title: "Top teams",
    accent: "get rewarded.",
    lead: "There will be prizes and recognition for the best solutions and pitches.",
    value: liondevs.prizes,
    pending: "Prizes to be announced",
  },
];

/** The challenge and the prizes. Each shows a "coming soon" state while its value is TBD. */
export function Details() {
  return (
    <section aria-label="Challenge and prizes" className="px-6 py-20 md:py-24">
      <SectionHeading
        title="What's"
        accent="coming."
        lead="Follow us on Instagram and LinkedIn so you are the first to know."
        className="mb-12 md:mb-16"
      />
      <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-2">
        {details.map((d, i) => {
          const pending = isTBD(d.value);
          return (
            <Reveal key={d.id} y={32} delay={i * 0.15}>
              <article
                aria-labelledby={d.id}
                className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white p-7 sm:p-8"
              >
                <div
                  aria-hidden
                  className="dot-grid pointer-events-none absolute inset-0 opacity-[0.3]"
                />
                <div className="relative flex flex-1 flex-col">
                  <h2 id={d.id} className="text-3xl font-bold tracking-tight text-foreground">
                    {d.title} <span className="serif-italic">{d.accent}</span>
                  </h2>
                  <p className="mt-3 text-[15px] leading-relaxed text-muted">{d.lead}</p>
                  <div className="mt-auto pt-10">
                    {pending ? (
                      <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 text-[12.5px] font-medium text-muted">
                        <span className="size-1.5 animate-pulse rounded-full bg-brand" />
                        {d.pending}
                      </span>
                    ) : (
                      <p className="rounded-2xl border border-line bg-surface p-5 text-[15px] leading-relaxed text-foreground">
                        {d.value}
                      </p>
                    )}
                  </div>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
