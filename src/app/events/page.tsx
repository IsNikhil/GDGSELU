import { FeaturedEvent } from "@/components/home/FeaturedEvent";
import { JoinCTA } from "@/components/home/JoinCTA";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { SocialLinks } from "@/components/ui/SocialIcons";
import { events, pastEvents } from "@/data/events";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Events",
  description: "Upcoming and past events from GDG Southeastern, including LionDevs.",
  path: "/events/",
});

function EventRow({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="rounded-2xl border border-line bg-white p-6">
      <h3 className="text-[18px] font-bold text-foreground">{title}</h3>
      <p className="mt-1 text-[14px] text-muted">{subtitle}</p>
    </div>
  );
}

export default function EventsPage() {
  const featured = events.find((e) => e.featured);
  const others = events.filter((e) => !e.featured);

  return (
    <>
      <PageHeader
        title="Come build"
        accent="with us."
        lead="Workshops, talks, and competitions for every skill level."
      />

      <section aria-labelledby="upcoming" className="px-4 pb-16 sm:px-6 md:pb-24">
        <div className="mx-auto max-w-4xl">
          <Reveal blur={8} className="mb-8 px-2 sm:px-0">
            <h2
              id="upcoming"
              className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl"
            >
              Upcoming
            </h2>
          </Reveal>
          <div className="grid gap-4">
            {featured && <FeaturedEvent headingLevel="h3" />}
            {others.map((e) => (
              <EventRow key={e.slug} title={e.title} subtitle={e.subtitle} />
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="past" className="px-4 pb-8 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <Reveal blur={8} className="mb-8 px-2 sm:px-0">
            <h2 id="past" className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Past <span className="serif-italic">events</span>
            </h2>
          </Reveal>
          {pastEvents.length === 0 ? (
            <Reveal y={32}>
              <div className="relative overflow-hidden rounded-3xl border border-line bg-white px-6 py-16 text-center">
                <div
                  aria-hidden
                  className="dot-grid pointer-events-none absolute inset-0 opacity-[0.35]"
                />
                <div className="relative">
                  <p className="font-display text-2xl font-bold text-foreground">
                    More events <span className="serif-italic font-normal">coming soon.</span>
                  </p>
                  <p className="mt-2 text-[14px] text-muted">Follow us to stay updated.</p>
                  <SocialLinks size="md" className="mt-6 justify-center" />
                </div>
              </div>
            </Reveal>
          ) : (
            <ul className="grid gap-4 sm:grid-cols-2">
              {pastEvents.map((e) => (
                <li key={e.slug}>
                  <EventRow title={e.title} subtitle={e.subtitle} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <JoinCTA title="Never miss" accent="an event." />
    </>
  );
}
