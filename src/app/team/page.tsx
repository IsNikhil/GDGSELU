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
        title="Meet"
        accent="the team."
        lead="The students who plan our events and keep the community growing. Say hello on LinkedIn, or send them an email."
      />
      <section aria-labelledby="board" className="px-6 pb-8">
        <div className="mx-auto max-w-6xl">
          <h2 id="board" className="sr-only">
            Board members
          </h2>
          <TeamGrid />
        </div>
      </section>
      <JoinCTA title="Want to" accent="help lead?" />
    </>
  );
}
