import { AboutPreview } from "@/components/home/AboutPreview";
import { FeaturedEvent } from "@/components/home/FeaturedEvent";
import { Hero } from "@/components/home/Hero";
import { JoinCTA } from "@/components/home/JoinCTA";
import { TeamPreview } from "@/components/home/TeamPreview";
import { TechMarquee } from "@/components/home/TechMarquee";
import { WhatWeDo } from "@/components/home/WhatWeDo";

export default function Home() {
  return (
    <>
      <Hero />
      <AboutPreview />
      <WhatWeDo />
      <section aria-label="Featured event" className="pb-[var(--section-y)]">
        <div className="container-site">
          <FeaturedEvent />
        </div>
      </section>
      <TeamPreview />
      <TechMarquee />
      <JoinCTA />
    </>
  );
}
