import { Puzzle } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { liondevs } from "@/data/liondevs";
import { isTBD } from "@/lib/utils";
import { ComingSoonCard } from "./ComingSoonCard";

export function Challenge() {
  return (
    <section aria-labelledby="ld-challenge" className="section-y">
      <div className="container-site grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:items-center">
        <SectionHeading
          tone="ld"
          id="ld-challenge"
          eyebrow="The challenge"
          title="A real problem. Your solution."
          lead="Every team works on the same real-world challenge. We will share it closer to the event."
        />
        {isTBD(liondevs.challenge) ? (
          <ComingSoonCard
            Icon={Puzzle}
            title="Challenge reveal coming soon"
            text="Follow us on Instagram and LinkedIn so you are the first to know."
          />
        ) : (
          <Reveal>
            <div className="rounded-[1.75rem] border border-ld-gold/40 bg-ld-bg-2/70 p-8 text-lg text-ld-text">
              {liondevs.challenge}
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
