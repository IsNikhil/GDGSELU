import { ArrowUpRight, Mail, MapPin, Rocket } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { GoogleColorIcon } from "@/components/ui/GoogleColorIcon";
import { PageHeader } from "@/components/ui/PageHeader";
import { RevealItem, Stagger } from "@/components/ui/Reveal";
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

export default function ContactPage() {
  const hasEmail = !isTBD(site.contactEmail);
  const channels = [
    {
      Icon: InstagramIcon,
      label: "Instagram",
      value: "@gdgselu",
      href: site.social.instagram,
      color: "red" as const,
    },
    {
      Icon: LinkedInIcon,
      label: "LinkedIn",
      value: "GDG Southeastern",
      href: site.social.linkedin,
      color: "blue" as const,
    },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Say hello."
        lead="Questions, ideas, or want to partner with us? Reach out on any of these."
      />

      <section aria-labelledby="channels" className="section-y">
        <div className="container-site">
          <h2 id="channels" className="sr-only">
            Ways to reach us
          </h2>
          <Stagger
            as="ul"
            className="grid gap-5 [grid-template-columns:repeat(auto-fit,minmax(min(100%,16rem),1fr))]"
          >
            {channels.map(({ Icon, label, value, href, color }) => (
              <RevealItem as="li" key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block h-full rounded-3xl"
                >
                  <Card className="h-full">
                    <span className="flex items-start justify-between">
                      <span
                        className={`flex size-12 items-center justify-center rounded-2xl ${color === "red" ? "bg-[#ea4335]/12 text-[#c5221f] dark:text-[#f28b82]" : "bg-[#4285f4]/12 text-[#1a73e8] dark:text-[#8ab4f8]"}`}
                      >
                        <Icon className="size-6" />
                      </span>
                      <ArrowUpRight
                        aria-hidden
                        className="size-5 text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </span>
                    <span className="mt-5 block text-lg font-bold text-fg">{label}</span>
                    <span className="block text-muted">{value}</span>
                    <span className="sr-only"> (opens in a new tab)</span>
                  </Card>
                </a>
              </RevealItem>
            ))}
            {hasEmail && (
              <RevealItem as="li">
                <a href={`mailto:${site.contactEmail}`} className="block h-full rounded-3xl">
                  <Card className="h-full">
                    <GoogleColorIcon Icon={Mail} color="yellow" />
                    <span className="mt-5 block text-lg font-bold text-fg">Email</span>
                    <span className="block break-all text-muted">{site.contactEmail}</span>
                  </Card>
                </a>
              </RevealItem>
            )}
            <RevealItem as="li">
              <Card hover={false} className="h-full">
                <GoogleColorIcon Icon={MapPin} color="green" />
                <span className="mt-5 block text-lg font-bold text-fg">Where we are</span>
                <span className="block text-muted">{site.location}</span>
              </Card>
            </RevealItem>
          </Stagger>
        </div>
      </section>

      <section id="join" aria-labelledby="join-title" className="section-y bg-bg-soft">
        <div className="container-site">
          <div className="grid items-center gap-8 rounded-[2rem] bg-[#0b3d2e] p-8 text-[#f7f3e8] sm:p-12 md:grid-cols-[1fr_auto]">
            <div>
              <span className="flex size-12 items-center justify-center rounded-2xl bg-white/10 text-[#e6c988]">
                <Rocket aria-hidden className="size-6" />
              </span>
              <h2 id="join-title" className="mt-5 text-[length:var(--text-h2)] font-bold">
                Join GDG Southeastern
              </h2>
              <p className="mt-3 max-w-xl text-[#f7f3e8]/85">
                Become a member on our GDG community page to get event invites and updates. It is
                free and open to every student.
              </p>
            </div>
            <Button href={joinHref} variant="light" size="lg">
              Become a member
              <ArrowUpRight aria-hidden className="size-5" />
              <span className="sr-only"> (opens in a new tab)</span>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
