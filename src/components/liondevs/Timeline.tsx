import { Reveal } from "@/components/ui/Reveal";
import { liondevs } from "@/data/liondevs";

export function Timeline() {
  const items = liondevs.timeline;
  return (
    <section aria-labelledby="ld-timeline" className="bg-surface px-6 py-20 md:py-28">
      <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal blur={8} className="lg:col-span-4">
          <h2
            id="ld-timeline"
            className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl"
          >
            The road <span className="serif-italic">to pitch day.</span>
          </h2>
          {items.length > 0 && (
            <p className="mt-5 text-[15px] text-muted">Dates are tentative and may change.</p>
          )}
        </Reveal>
        <div className="lg:col-span-8">
          {items.length === 0 ? (
            <Reveal y={32}>
              <p className="rounded-2xl border border-line bg-white p-6 text-[15px] text-muted">
                Key dates will be posted here once they are set.
              </p>
            </Reveal>
          ) : (
            <ol className="relative flex flex-col gap-4">
              <span aria-hidden className="absolute top-6 bottom-6 left-[23px] w-px bg-black/10" />
              {items.map((t, i) => (
                <Reveal
                  as="li"
                  key={t.title}
                  y={32}
                  delay={i * 0.15}
                  className="relative flex gap-5"
                >
                  <span className="relative z-10 mt-5 flex size-[47px] shrink-0 items-center justify-center rounded-full border border-line bg-white font-display text-[15px] font-bold text-foreground">
                    0{i + 1}
                  </span>
                  <div className="flex-1 rounded-2xl border border-line bg-white p-6">
                    <p className="text-[12px] font-medium text-subtle">{t.date}</p>
                    <h3 className="mt-1 text-[20px] font-bold text-foreground">{t.title}</h3>
                    {t.text && (
                      <p className="mt-2 text-[14px] leading-relaxed text-muted">{t.text}</p>
                    )}
                  </div>
                </Reveal>
              ))}
            </ol>
          )}
        </div>
      </div>
    </section>
  );
}
