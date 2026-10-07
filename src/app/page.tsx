import { AboutPreview } from "@/components/home/AboutPreview";
import { FeaturedEvent } from "@/components/home/FeaturedEvent";
import { Hero } from "@/components/home/Hero";
import { JoinCTA } from "@/components/home/JoinCTA";
import { WhatWeDo } from "@/components/home/WhatWeDo";

export default function Home() {
  return (
    <>
      <Hero />
      <AboutPreview />
      <WhatWeDo />
      <section aria-label="Featured event" className="px-4 py-10 sm:px-6 md:py-14">
        <div className="mx-auto max-w-4xl">
          <FeaturedEvent />
        </div>
      </section>
      <JoinCTA />
    </>
  );
}
