"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { nav, site } from "@/data/site";
import { cn, isTBD } from "@/lib/utils";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
  const pathname = usePathname();
  const dark = pathname.startsWith("/liondevs");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), [setOpen]);
  const joinHref = isTBD(site.joinUrl) ? "/contact#join" : site.joinUrl;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={cn("sticky top-0 z-40", dark && "theme-liondevs")}>
      {/* Background layer fades in on scroll (opacity only, for smooth 60 fps). */}
      <div
        aria-hidden
        className={cn(
          "absolute inset-0 border-b backdrop-blur-xl transition-opacity duration-300",
          dark
            ? "border-ld-gold/15 bg-ld-bg/80"
            : "border-line bg-bg/75",
          scrolled ? "opacity-100" : "opacity-0",
        )}
      />
      <div
        className={cn(
          "container-site relative flex h-[var(--nav-h)] items-center justify-between gap-4",
        )}
      >
        <Link
          href="/"
          aria-label="GDG Southeastern home"
          className={cn(
            "flex origin-left items-center gap-3 rounded-xl transition-transform duration-300",
            scrolled && "scale-90",
          )}
        >
          <Logo size={44} priority />
          <span
            className={cn(
              "hidden text-base leading-tight font-bold tracking-tight sm:block",
              dark ? "text-ld-text" : "text-fg",
            )}
          >
            GDG <span className={dark ? "text-ld-gold-light" : "text-gold-text"}>Southeastern</span>
          </span>
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((link) => {
              const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              if (link.highlight) {
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "ml-1 inline-flex min-h-11 items-center gap-2 rounded-full border px-4 text-sm font-semibold transition-[transform,background-color] duration-200 hover:-translate-y-0.5",
                        "border-[#d4af6a]/70 bg-[#0b1f1a] text-[#e6c988] hover:bg-[#0f2922]",
                      )}
                    >
                      <span aria-hidden className="size-1.5 rounded-full bg-[#e6c988]" />
                      {link.label}
                    </Link>
                  </li>
                );
              }
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative inline-flex min-h-11 items-center rounded-full px-3.5 text-sm font-medium transition-colors",
                      dark
                        ? "text-ld-muted hover:text-ld-text aria-[current=page]:text-ld-gold-light"
                        : "text-muted hover:text-fg aria-[current=page]:text-fg",
                    )}
                  >
                    {link.label}
                    {active && (
                      <span
                        aria-hidden
                        className={cn(
                          "absolute inset-x-3.5 bottom-1.5 h-0.5 rounded-full",
                          dark ? "bg-ld-gold" : "bg-[#1a73e8] dark:bg-[#8ab4f8]",
                        )}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          {!dark && <ThemeToggle className="hidden sm:flex" />}
          <Link
            href={joinHref}
            className={cn(
              "hidden min-h-11 items-center rounded-full px-5 text-sm font-semibold transition-[transform,background-color] duration-200 hover:-translate-y-0.5 active:scale-95 sm:inline-flex",
              dark
                ? "bg-gradient-to-r from-ld-gold to-ld-gold-light text-ld-bg"
                : "bg-[#1a73e8] text-white hover:bg-[#1765cc] dark:bg-[#8ab4f8] dark:text-[#0c1210]",
            )}
          >
            Join Us
          </Link>
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            className={cn(
              "flex size-11 items-center justify-center rounded-full border lg:hidden",
              dark ? "border-ld-gold/40 text-ld-gold-light" : "border-line bg-surface text-fg",
            )}
          >
            <Menu aria-hidden className="size-5" />
          </button>
        </div>
      </div>
      <MobileMenu open={open} onClose={close} pathname={pathname} joinHref={joinHref} dark={dark} />
    </header>
  );
}
