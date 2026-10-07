import Link from "next/link";
import { disclaimer, nav, site } from "@/data/site";
import { liondevs } from "@/data/liondevs";
import { joinHref } from "@/lib/links";
import { isTBD } from "@/lib/utils";
import { SocialLinks, socialLinks } from "@/components/ui/SocialIcons";
import { Logo } from "./Logo";

const heading = "mb-4 text-[13px] font-bold tracking-wider text-foreground uppercase";
const item = "text-[13px] text-subtle transition-colors duration-200 hover:text-muted";

export function Footer() {
  const year = new Date().getFullYear();
  const hasEmail = !isTBD(site.contactEmail);

  return (
    <footer className="relative border-t border-line bg-background px-6 pt-16 pb-[max(2.5rem,env(safe-area-inset-bottom))]">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-12">
          <div className="sm:col-span-2 lg:col-span-4">
            <Link
              href="/"
              aria-label="GDG Southeastern home"
              className="mb-5 inline-block rounded-lg"
            >
              <Logo />
            </Link>
            <p className="mb-6 max-w-xs text-[14px] leading-[1.7] text-subtle">
              A student-run developer community at Southeastern Louisiana University. {site.tagline}
            </p>
            <SocialLinks />
          </div>

          <nav aria-label="Footer" className="lg:col-span-2">
            <h2 className={heading}>Chapter</h2>
            <ul className="flex flex-col gap-3">
              {nav.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={item}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-2">
            <h2 className={heading}>LionDevs</h2>
            <ul className="flex flex-col gap-3">
              <li>
                <Link href="/liondevs" className={item}>
                  Overview
                </Link>
              </li>
              <li>
                <Link href={liondevs.registration.pageUrl} className={item}>
                  Register
                </Link>
              </li>
              <li>
                <Link href="/liondevs#faq" className={item}>
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h2 className={heading}>Follow</h2>
            <ul className="flex flex-col gap-3">
              {socialLinks.map((s) => (
                <li key={s.href}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className={item}>
                    {s.label}
                  </a>
                </li>
              ))}
              <li>
                <a href={joinHref} target="_blank" rel="noopener noreferrer" className={item}>
                  GDG community page
                </a>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h2 className={heading}>Find us</h2>
            <ul className="flex flex-col gap-3 text-[13px] text-subtle">
              <li>Hammond, Louisiana</li>
              <li>Southeastern Louisiana University</li>
              {hasEmail && (
                <li>
                  <a href={`mailto:${site.contactEmail}`} className={`${item} break-all`}>
                    {site.contactEmail}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-line pt-8 text-[12px] text-subtle md:flex-row md:items-start md:justify-between">
          <p>
            &copy; {year} {site.name}. All rights reserved.{" "}
            <Link href="/inbox" className="ml-2 text-subtle/70 transition-colors hover:text-muted">
              Board login
            </Link>
          </p>
          <p className="max-w-xl md:text-right">{disclaimer}</p>
        </div>
      </div>
    </footer>
  );
}
