"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { nav } from "@/data/site";
import { cn } from "@/lib/utils";
import { SocialLinks } from "@/components/ui/SocialIcons";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";

type Props = {
  open: boolean;
  onClose: () => void;
  pathname: string;
  joinHref: string;
  dark: boolean;
};

export function MobileMenu({ open, onClose, pathname, joinHref, dark }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);

  // Lock page scroll, close on Escape, and keep focus inside while open.
  useEffect(() => {
    if (!open) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    const opener = document.activeElement as HTMLElement | null;
    const first = panelRef.current?.querySelector<HTMLElement>("a, button");
    first?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key !== "Tab" || !panelRef.current) return;
      const items = panelRef.current.querySelectorAll<HTMLElement>("a, button");
      const firstEl = items[0];
      const lastEl = items[items.length - 1];
      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault();
        lastEl.focus();
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKey);
      opener?.focus();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={panelRef}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className={cn(
            "fixed inset-0 z-[60] flex flex-col overflow-y-auto overscroll-contain lg:hidden",
            "pt-[env(safe-area-inset-top)] pb-[max(1.5rem,env(safe-area-inset-bottom))]",
            dark ? "bg-ld-bg text-ld-text" : "bg-bg text-fg",
          )}
        >
          <div className="container-site flex h-16 shrink-0 items-center justify-between">
            <Link
              href="/"
              onClick={onClose}
              className="flex items-center gap-3 rounded-xl"
              aria-label="GDG Southeastern home"
            >
              <Logo size={40} />
            </Link>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className={cn(
                "flex size-11 items-center justify-center rounded-full border",
                dark ? "border-ld-gold/40 text-ld-gold-light" : "border-line text-fg",
              )}
            >
              <X aria-hidden className="size-5" />
            </button>
          </div>

          <nav
            aria-label="Mobile"
            className="container-site flex flex-1 flex-col justify-center py-6"
          >
            <motion.ul
              className="flex flex-col gap-1"
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } },
              }}
            >
              {nav.map((link) => {
                const active =
                  link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
                return (
                  <motion.li
                    key={link.href}
                    variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      href={link.href}
                      onClick={onClose}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "flex min-h-14 items-center justify-between rounded-2xl px-3 text-[clamp(1.75rem,7vw,2.5rem)] font-bold tracking-tight",
                        active &&
                          (dark ? "text-ld-gold-light" : "text-[#1a73e8] dark:text-[#8ab4f8]"),
                      )}
                    >
                      <span>{link.label}</span>
                      {link.highlight && (
                        <span className="rounded-full bg-gradient-to-r from-ld-gold to-ld-gold-light px-3 py-1 text-xs font-bold tracking-wide text-ld-bg">
                          EVENT
                        </span>
                      )}
                    </Link>
                  </motion.li>
                );
              })}
            </motion.ul>
          </nav>

          <div className="container-site flex shrink-0 flex-wrap items-center justify-between gap-4">
            <Link
              href={joinHref}
              onClick={onClose}
              className={cn(
                "flex min-h-12 flex-1 items-center justify-center rounded-full px-6 font-semibold",
                dark
                  ? "bg-gradient-to-r from-ld-gold to-ld-gold-light text-ld-bg"
                  : "bg-[#1a73e8] text-white dark:bg-[#8ab4f8] dark:text-[#0c1210]",
              )}
            >
              Join Us
            </Link>
            <div className="flex items-center gap-3">
              <SocialLinks tone={dark ? "ld" : "site"} />
              {!dark && <ThemeToggle />}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
