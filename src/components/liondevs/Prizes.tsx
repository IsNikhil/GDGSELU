import { Trophy } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { liondevs } from "@/data/liondevs";
import { isTBD } from "@/lib/utils";
import { ComingSoonCard } from "./ComingSoonCard";

export function Prizes() {
  return (
    <section aria-labelledby="ld-prizes" className="section-y">
      <div className="container-site grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-center">
        <div className="lg:order-2">
          <SectionHeading
            tone="ld"
            id="ld-prizes"
            eyebrow="Prizes and recognition"
            title="Top teams get rewarded."
            lead="There will be prizes and recognition for the best solutions and pitches."
          />
        </div>
        {isTBD(liondevs.prizes) ? (
          <ComingSoonCard
            Icon={Trophy}
            title="Prizes to be announced"
            text="Details are coming soon. Stay tuned."
          />
        ) : (
          <Reveal>
            <div className="rounded-[1.75rem] border border-ld-gold/40 bg-ld-bg-2/70 p-8 text-lg text-ld-text">
              {liondevs.prizes}
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
