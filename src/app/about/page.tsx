import { JoinCTA } from "@/components/home/JoinCTA";
import { WhatWeDo } from "@/components/home/WhatWeDo";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { about, gdgExplainer, techAreas } from "@/data/about";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About",
  description: about.short,
  path: "/about/",
});

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="Students who learn,"
        accent="build, and grow together."
        lead={about.belong}
      />

      <section aria-labelledby="who-we-are" className="px-6 py-16 md:py-24">
        <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal blur={8} className="lg:col-span-4">
            <h2
              id="who-we-are"
              className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl"
            >
              Who <span className="serif-italic">we are</span>
            </h2>
          </Reveal>
          <div className="flex flex-col gap-4 lg:col-span-8">
            {about.full.map((p, i) => (
              <Reveal key={p} delay={i * 0.08} duration={0.5}>
                <p className="text-[17px] leading-[1.7] text-muted">{p}</p>
              </Reveal>
            ))}
            <Reveal delay={0.2} y={32} className="mt-4">
              <div className="rounded-2xl border border-line bg-white p-6 sm:p-7">
                <h3 className="text-[16px] font-bold text-foreground">Technology we explore</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {techAreas.map((t) => (
                    <li
                      key={t}
                      className="rounded-full border border-line bg-surface px-3 py-1 text-[13px] font-medium text-muted"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <WhatWeDo />

      <section aria-labelledby="what-is-gdg" className="mt-16 bg-surface px-6 py-20 md:py-28">
        <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal blur={8} className="lg:col-span-5">
            <h2
              id="what-is-gdg"
              className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl"
            >
              What is a <span className="serif-italic">Google Developer Group?</span>
            </h2>
          </Reveal>
          <ol className="flex flex-col gap-4 lg:col-span-7">
            {gdgExplainer.points.map((p, i) => (
              <Reveal as="li" key={p} y={32} delay={i * 0.15}>
                <div className="flex gap-5 rounded-2xl border border-line bg-white p-6 sm:p-7">
                  <span className="font-display text-3xl leading-none font-medium text-foreground/[0.16]">
                    0{i + 1}
                  </span>
                  <p className="text-[15px] leading-[1.7] text-muted">{p}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <JoinCTA />
    </>
  );
}
