import { Details } from "@/components/liondevs/Details";
import { FAQ } from "@/components/liondevs/FAQ";
import { FinalCTA } from "@/components/liondevs/FinalCTA";
import { LionDevsHero } from "@/components/liondevs/Hero";
import { Partners } from "@/components/liondevs/Partners";
import { Poster } from "@/components/liondevs/Poster";
import { QuickFacts } from "@/components/liondevs/QuickFacts";
import { Steps } from "@/components/liondevs/Steps";
import { Timeline } from "@/components/liondevs/Timeline";
import { liondevs } from "@/data/liondevs";
import { site } from "@/data/site";
import { jsonLd, pageMetadata } from "@/lib/seo";
import { parseDate } from "@/lib/utils";

const ogImage = liondevs.poster
  ? { url: liondevs.poster, width: 1054, height: 1492, alt: "LionDevs event poster" }
  : { url: liondevs.logo, width: 1254, height: 1254, alt: "LionDevs logo" };

export const metadata = pageMetadata({
  title: `${liondevs.name}: ${liondevs.label}`,
  description: `${liondevs.headline.join(" ")} ${liondevs.description}`,
  path: "/liondevs/",
  image: ogImage,
  largeImage: Boolean(liondevs.poster),
});

function eventJsonLd() {
  const start = parseDate(liondevs.date);
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: `${liondevs.name}: ${liondevs.label}`,
    description: liondevs.description,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    // Date fields are left out while the date is TBD.
    ...(start ? { startDate: start.toISOString() } : {}),
    location: {
      "@type": "Place",
      name: liondevs.org,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Hammond",
        addressRegion: "LA",
        addressCountry: "US",
      },
    },
    image: [new URL(ogImage.url, site.url).toString()],
    organizer: { "@type": "Organization", name: site.name, url: site.url },
  };
}

export default function LionDevsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(eventJsonLd())} />
      <LionDevsHero />
      <QuickFacts />
      <Steps />
      <Details />
      <Timeline />
      <Partners />
      <Poster />
      <FAQ />
      <FinalCTA />
    </>
  );
}
