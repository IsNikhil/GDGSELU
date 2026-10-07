"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/** Renders its children everywhere except the private board inbox. */
export function HideOnInbox({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return pathname.startsWith("/inbox") ? null : children;
}
