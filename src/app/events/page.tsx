import { CalendarHeart } from "lucide-react";
import { FeaturedEvent } from "@/components/home/FeaturedEvent";
import { JoinCTA } from "@/components/home/JoinCTA";
import { Card } from "@/components/ui/Card";
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

export default function EventsPage() {
  const featured = events.find((e) => e.featured);
  const others = events.filter((e) => !e.featured);

  return (
    <>
      <PageHeader
        eyebrow="Events"
        title="Come build with us."
        lead="Workshops, talks, and competitions for every skill level."
      />

      <section aria-labelledby="upcoming" className="section-y">
        <div className="container-site">
          <h2 id="upcoming" className="text-[length:var(--text-h2)] font-bold text-fg">
            Upcoming
          </h2>
          <div className="mt-8 grid gap-6">
            {featured && <FeaturedEvent headingLevel="h3" />}
            {others.map((e) => (
              <Card key={e.slug}>
                <h3 className="text-xl font-bold text-fg">{e.title}</h3>
                <p className="text-muted">{e.subtitle}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="past" className="section-y bg-bg-soft">
        <div className="container-site">
          <h2 id="past" className="text-[length:var(--text-h2)] font-bold text-fg">
            Past events
          </h2>
          {pastEvents.length === 0 ? (
            <Reveal className="mt-8">
              <div className="flex flex-col items-center rounded-[2rem] border border-dashed border-line bg-surface px-6 py-14 text-center">
                <CalendarHeart aria-hidden className="size-10 text-[#c5221f] dark:text-[#f28b82]" />
                <p className="mt-4 text-[length:var(--text-h3)] font-semibold text-fg">
                  More events coming soon.
                </p>
                <p className="mt-2 text-muted">Follow us to stay updated.</p>
                <SocialLinks className="mt-6" />
              </div>
            </Reveal>
          ) : (
            <ul className="mt-8 grid gap-6 [grid-template-columns:repeat(auto-fit,minmax(min(100%,18rem),1fr))]">
              {pastEvents.map((e) => (
                <li key={e.slug}>
                  <Card>
                    <h3 className="text-xl font-bold text-fg">{e.title}</h3>
                    <p className="text-muted">{e.subtitle}</p>
                  </Card>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <JoinCTA title="Never miss an event." />
    </>
  );
}
