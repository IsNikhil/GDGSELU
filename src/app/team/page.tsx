import { JoinCTA } from "@/components/home/JoinCTA";
import { AdvisorList, TeamGrid } from "@/components/team/TeamGrid";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Team",
  description: "Meet the faculty advisor and student board that run GDG Southeastern.",
  path: "/team/",
});

function GroupLabel({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <Reveal blur={8} className="mb-6">
      <h2 id={id} className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        {children}
      </h2>
    </Reveal>
  );
}

export default function TeamPage() {
  return (
    <>
      <PageHeader
        title="Meet"
        accent="the team."
        lead="The people who plan our events and keep the community growing. Say hello on LinkedIn, or send them an email."
      />
      <section aria-labelledby="advisor" className="px-6 pb-16">
        <div className="mx-auto max-w-6xl">
          <GroupLabel id="advisor">
            Faculty <span className="serif-italic">advisor</span>
          </GroupLabel>
          <div className="max-w-2xl">
            <AdvisorList />
          </div>
        </div>
      </section>
      <section aria-labelledby="board" className="px-6 pb-8">
        <div className="mx-auto max-w-6xl">
          <GroupLabel id="board">
            Student <span className="serif-italic">board</span>
          </GroupLabel>
          <TeamGrid />
        </div>
      </section>
      <JoinCTA title="Want to" accent="help lead?" />
    </>
  );
}
