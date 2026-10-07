"use client";

import { ArrowRight, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { announcement } from "@/data/site";
import { ANNOUNCEMENT_KEY, ANNOUNCEMENT_STORAGE } from "@/lib/theme-script";

export function AnnouncementBar() {
  const pathname = usePathname();
  const [dismissed, setDismissed] = useState(false);

  if (dismissed || pathname.startsWith("/liondevs")) return null;

  const dismiss = () => {
    setDismissed(true);
    try {
      localStorage.setItem(ANNOUNCEMENT_STORAGE, ANNOUNCEMENT_KEY);
    } catch {}
  };

  return (
    <aside
      aria-label="Announcement"
      className="announcement relative z-50 bg-[#0b1f1a] text-[#f7f3e8]"
    >
      <div className="container-site flex min-h-11 items-center justify-center gap-2 py-1.5 pr-12 text-center text-sm sm:pr-14">
        <span aria-hidden className="hidden size-1.5 rounded-full bg-[#e6c988] sm:inline-block" />
        <p>
          <span className="font-semibold text-[#e6c988]">{announcement.text}</span>{" "}
          <Link
            href={announcement.href}
            className="inline-flex items-center gap-1 font-medium underline decoration-[#e6c988]/60 underline-offset-4 hover:decoration-[#e6c988]"
          >
            {announcement.linkLabel}
            <ArrowRight aria-hidden className="size-3.5" />
          </Link>
        </p>
      </div>
      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss announcement"
        className="absolute top-1/2 right-[max(0.25rem,env(safe-area-inset-right))] flex size-11 -translate-y-1/2 items-center justify-center rounded-full text-[#f7f3e8]/80 hover:text-[#f7f3e8]"
      >
        <X aria-hidden className="size-4" />
      </button>
    </aside>
  );
}
