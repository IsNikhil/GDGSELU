import { Users } from "lucide-react";
import { JoinCTA } from "@/components/home/JoinCTA";
import { WhatWeDo } from "@/components/home/WhatWeDo";
import { Card } from "@/components/ui/Card";
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
        eyebrow="About us"
        title="Students who learn, build, and grow together."
        lead={about.belong}
      />

      <section aria-labelledby="who-we-are" className="section-y">
        <div className="container-site grid gap-12 lg:grid-cols-[1.3fr_1fr]">
          <Reveal>
            <h2 id="who-we-are" className="text-[length:var(--text-h2)] font-bold text-fg">
              Who we are
            </h2>
            {about.full.map((p) => (
              <p key={p} className="mt-5 text-[length:var(--text-lead)] text-muted">
                {p}
              </p>
            ))}
          </Reveal>
          <Reveal delay={0.1}>
            <Card hover={false} className="bg-bg-soft">
              <h3 className="text-lg font-bold text-fg">Technology we explore</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {techAreas.map((t) => (
                  <li
                    key={t}
                    className="rounded-full border border-line bg-surface px-3.5 py-1.5 text-sm font-medium text-fg"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </Card>
          </Reveal>
        </div>
      </section>

      <div className="bg-bg-soft">
        <WhatWeDo />
      </div>

      <section aria-labelledby="what-is-gdg" className="section-y">
        <div className="container-site">
          <Reveal>
            <div className="grid gap-8 rounded-[2rem] border border-line bg-surface p-8 shadow-card sm:p-12 md:grid-cols-[auto_1fr]">
              <span className="flex size-16 items-center justify-center rounded-2xl bg-[#4285f4]/12 text-[#1a73e8] dark:text-[#8ab4f8]">
                <Users aria-hidden className="size-8" />
              </span>
              <div>
                <h2 id="what-is-gdg" className="text-[length:var(--text-h2)] font-bold text-fg">
                  {gdgExplainer.title}
                </h2>
                {gdgExplainer.points.map((p) => (
                  <p key={p} className="mt-4 text-[length:var(--text-lead)] text-muted">
                    {p}
                  </p>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <JoinCTA />
    </>
  );
}
