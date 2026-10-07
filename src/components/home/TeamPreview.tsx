import { ArrowRight } from "lucide-react";
import { TeamGrid } from "@/components/team/TeamGrid";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function TeamPreview() {
  return (
    <section aria-labelledby="team-preview" className="section-y bg-bg-soft">
      <div className="container-site">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            id="team-preview"
            eyebrow="Our board"
            title="The students behind the chapter."
          />
          <Button href="/team" variant="secondary">
            Meet the team
            <ArrowRight aria-hidden className="size-4" />
          </Button>
        </div>
        <div className="mt-12">
          <TeamGrid />
        </div>
      </div>
    </section>
  );
}
