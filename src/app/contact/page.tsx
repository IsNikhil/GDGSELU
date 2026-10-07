import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { InstagramIcon, LinkedInIcon } from "@/components/ui/SocialIcons";
import { site } from "@/data/site";
import { joinHref } from "@/lib/links";
import { pageMetadata } from "@/lib/seo";
import { isTBD } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "Contact",
  description: "Get in touch with GDG Southeastern at Southeastern Louisiana University.",
  path: "/contact/",
});

const cardBase =
  "group flex h-full flex-col rounded-2xl border border-line bg-white p-6 transition-colors duration-200";

export default function ContactPage() {
  const hasEmail = !isTBD(site.contactEmail);
  const channels = [
    { Icon: InstagramIcon, label: "Instagram", value: "@gdgselu", href: site.social.instagram },
    {
      Icon: LinkedInIcon,
      label: "LinkedIn",
      value: "GDG Southeastern",
      href: site.social.linkedin,
    },
    ...(hasEmail
      ? [
          {
            Icon: Mail,
            label: "Email",
            value: site.contactEmail,
            href: `mailto:${site.contactEmail}`,
          },
        ]
      : []),
  ];

  return (
    <>
      <PageHeader
        title="Say"
        accent="hello."
        lead="Questions, ideas, or want to partner with us? Reach out on any of these."
      />

      <section aria-labelledby="channels" className="px-6 pb-16 md:pb-24">
        <h2 id="channels" className="sr-only">
          Ways to reach us
        </h2>
        <ul className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {channels.map(({ Icon, label, value, href }, i) => (
            <Reveal as="li" key={label} y={32} delay={i * 0.1}>
              <a
                href={href}
                {...(href.startsWith("http")
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className={`${cardBase} hover:border-line-hover`}
              >
                <span className="flex items-start justify-between">
                  <span className="flex size-10 items-center justify-center rounded-xl border border-line text-foreground">
                    <Icon className="size-[18px]" />
                  </span>
                  <ArrowUpRight
                    aria-hidden
                    className="size-4 text-subtle transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </span>
                <span className="mt-8 block font-display text-[19px] font-bold text-foreground">
                  {label}
                </span>
                <span className="block text-[14px] break-all text-muted">{value}</span>
                {href.startsWith("http") && <span className="sr-only"> (opens in a new tab)</span>}
              </a>
            </Reveal>
          ))}
          <Reveal as="li" y={32} delay={channels.length * 0.1}>
            <div className={cardBase}>
              <span className="flex size-10 items-center justify-center rounded-xl border border-line text-foreground">
                <MapPin aria-hidden className="size-[18px]" />
              </span>
              <span className="mt-8 block font-display text-[19px] font-bold text-foreground">
                Where we are
              </span>
              <span className="block text-[14px] text-muted">{site.location}</span>
            </div>
          </Reveal>
        </ul>
      </section>

      <section id="join" aria-labelledby="join-title" className="px-6 pb-24 md:pb-32">
        <Reveal y={32} className="mx-auto max-w-5xl">
          <div className="grid items-center gap-8 rounded-3xl border border-line bg-surface p-8 sm:p-12 md:grid-cols-[1fr_auto]">
            <div>
              <h2
                id="join-title"
                className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
              >
                Join <span className="serif-italic">GDG Southeastern</span>
              </h2>
              <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-muted">
                Become a member on our GDG community page to get event invites and updates. It is
                free and open to every student.
              </p>
            </div>
            <Button href={joinHref} variant="dark">
              Become a member
              <ArrowUpRight aria-hidden className="size-4" />
              <span className="sr-only"> (opens in a new tab)</span>
            </Button>
          </div>
        </Reveal>
      </section>
    </>
  );
}
