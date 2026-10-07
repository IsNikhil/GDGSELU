"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { nav } from "@/data/site";
import { joinHref } from "@/lib/links";
import { cn, rise } from "@/lib/utils";
import { Logo } from "./Logo";

const links = nav.filter((l) => l.href !== "/");

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the menu whenever the route changes.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  // While the mobile menu is open: lock scroll, close on Escape, keep focus inside.
  useEffect(() => {
    if (!open) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    const toggle = toggleRef.current;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key !== "Tab" || !panelRef.current || !toggle) return;
      const items = [toggle, ...panelRef.current.querySelectorAll<HTMLElement>("a")];
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <nav
      aria-label="Main"
      className={cn(
        "rise fixed inset-x-0 top-0 z-50 transition-all duration-500",
        open
          ? "border-b border-line bg-background"
          : scrolled
            ? "border-b border-line bg-white/80 shadow-[0_1px_3px_rgba(0,0,0,0.04)] backdrop-blur-2xl backdrop-saturate-150"
            : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="relative mx-auto flex h-[var(--nav-h)] max-w-6xl items-center justify-between px-6">
        <Link href="/" aria-label="GDG Southeastern home" className="rounded-lg">
          <Logo priority />
        </Link>

        <ul className="absolute top-1/2 left-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-1 rounded-full border border-line bg-white/60 px-1.5 py-1 backdrop-blur-sm lg:flex">
          {links.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex items-center gap-1.5 rounded-full px-4 py-1.5 text-[13px] font-medium transition-all duration-200",
                    active
                      ? "bg-black/[0.05] text-foreground"
                      : "text-muted hover:bg-black/[0.03] hover:text-foreground",
                  )}
                >
                  {link.highlight && (
                    <span aria-hidden className="size-1.5 rounded-full bg-brand" />
                  )}
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="hidden text-[13px] font-medium text-muted transition-colors duration-200 hover:text-foreground lg:inline-flex"
          >
            Say hello
          </Link>
          <a
            href={joinHref}
            {...(joinHref.startsWith("http")
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            className="hidden rounded-full bg-foreground px-4 py-1.5 text-[13px] font-semibold text-white transition-all duration-200 hover:bg-[#222] hover:shadow-lg hover:shadow-black/10 sm:inline-flex"
          >
            Join us
          </a>
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="flex size-9 flex-col items-center justify-center gap-[5px] rounded-lg transition-colors hover:bg-black/[0.04] lg:hidden"
          >
            <span
              className={cn(
                "block h-[1.5px] w-[18px] rounded-full bg-foreground transition-transform duration-300",
                open && "translate-y-[6.5px] rotate-45",
              )}
            />
            <span
              className={cn(
                "block h-[1.5px] w-[18px] rounded-full bg-foreground transition-opacity duration-200",
                open && "opacity-0",
              )}
            />
            <span
              className={cn(
                "block h-[1.5px] w-[18px] rounded-full bg-foreground transition-transform duration-300",
                open && "-translate-y-[6.5px] -rotate-45",
              )}
            />
          </button>
        </div>
      </div>

      {open && (
        <div
          ref={panelRef}
          id="mobile-menu"
          className="h-[calc(100dvh-var(--nav-h))] overflow-y-auto border-t border-line px-6 pt-6 pb-[max(2rem,env(safe-area-inset-bottom))] lg:hidden"
        >
          <ul className="flex flex-col">
            {nav.map((link, i) => (
              <li
                key={link.href}
                className="rise border-b border-line"
                style={rise({ y: 12, dur: 0.5, delay: i * 0.04 })}
              >
                <Link
                  href={link.href}
                  aria-current={
                    (link.href === "/" ? pathname === "/" : isActive(pathname, link.href))
                      ? "page"
                      : undefined
                  }
                  className="flex items-center justify-between py-4 font-display text-[28px] font-bold tracking-tight text-foreground aria-[current=page]:text-brand"
                >
                  {link.label}
                  {link.highlight && (
                    <span className="rounded-full bg-brand/10 px-2.5 py-1 font-sans text-[11px] font-semibold text-brand">
                      Event
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
          <a
            href={joinHref}
            {...(joinHref.startsWith("http")
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            className="rise mt-8 flex w-full items-center justify-center rounded-full bg-foreground px-6 py-3.5 text-[15px] font-semibold text-white"
            style={rise({ y: 12, delay: 0.25 })}
          >
            Join GDG Southeastern
          </a>
        </div>
      )}
    </nav>
  );
}
