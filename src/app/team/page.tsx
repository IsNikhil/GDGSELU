import { JoinCTA } from "@/components/home/JoinCTA";
import { TeamGrid } from "@/components/team/TeamGrid";
import { PageHeader } from "@/components/ui/PageHeader";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Team",
  description: "Meet the student board that runs GDG Southeastern.",
  path: "/team/",
});

export default function TeamPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our board"
        title="Meet the team."
        lead="The students who plan our events and keep the community growing. Tap a photo to see their LinkedIn, or send them an email."
      />
      <section aria-label="Board members" className="section-y">
        <div className="container-site">
          <h2 className="sr-only">Board members</h2>
          <TeamGrid />
        </div>
      </section>
      <JoinCTA title="Want to help lead?" />
    </>
  );
}
