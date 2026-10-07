import { Mail, MapPin } from "lucide-react";
import Link from "next/link";
import { disclaimer, nav, site } from "@/data/site";
import { isTBD } from "@/lib/utils";
import { SocialLinks } from "@/components/ui/SocialIcons";
import { Brackets } from "@/components/ui/Brackets";
import { Logo } from "./Logo";

export function Footer() {
  const year = new Date().getFullYear();
  const hasEmail = !isTBD(site.contactEmail);

  return (
    <footer className="relative overflow-hidden bg-[#0b3d2e] text-[#f7f3e8]">
      <Brackets className="pointer-events-none absolute -right-10 -bottom-6 hidden w-80 opacity-10 md:block" />
      <div className="container-site relative grid gap-12 pt-16 pb-[max(2.5rem,env(safe-area-inset-bottom))] md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="max-w-sm">
          <Link
            href="/"
            className="inline-flex items-center gap-3 rounded-xl"
            aria-label="GDG Southeastern home"
          >
            <Logo size={56} />
            <span className="text-lg leading-tight font-bold">
              GDG <span className="text-[#e6c988]">Southeastern</span>
            </span>
          </Link>
          <p className="mt-5 text-[#f7f3e8]/85">
            A student-run developer community at Southeastern Louisiana University. {site.tagline}
          </p>
          <SocialLinks tone="onDark" className="mt-6" />
        </div>

        <nav aria-label="Footer">
          <h2 className="text-sm font-bold tracking-[0.18em] text-[#e6c988] uppercase">
            Quick links
          </h2>
          <ul className="mt-4 grid grid-cols-2 gap-x-4 md:grid-cols-1">
            {nav.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="inline-flex min-h-11 items-center text-[#f7f3e8]/85 hover:text-white"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-bold tracking-[0.18em] text-[#e6c988] uppercase">Find us</h2>
          <ul className="mt-4 space-y-3 text-[#f7f3e8]/85">
            <li className="flex gap-3">
              <MapPin aria-hidden className="mt-1 size-4 shrink-0 text-[#e6c988]" />
              <span>{site.location}</span>
            </li>
            {hasEmail && (
              <li className="flex gap-3">
                <Mail aria-hidden className="mt-1 size-4 shrink-0 text-[#e6c988]" />
                <a href={`mailto:${site.contactEmail}`} className="break-all hover:text-white">
                  {site.contactEmail}
                </a>
              </li>
            )}
          </ul>
        </div>

        <div className="border-t border-white/15 pt-8 text-sm text-[#f7f3e8]/75 md:col-span-3">
          <p className="max-w-3xl">{disclaimer}</p>
          <p className="mt-3">
            &copy; {year} {site.name}. Made by students at Southeastern Louisiana University.
          </p>
        </div>
      </div>
    </footer>
  );
}
