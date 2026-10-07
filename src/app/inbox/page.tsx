import type { Metadata } from "next";
import { InboxApp } from "@/components/inbox/InboxApp";

export const metadata: Metadata = {
  title: "Board inbox | GDG Southeastern",
  robots: { index: false, follow: false },
};

/** Private inbox for board members. All data comes from the signed in /api/inbox routes. */
export default function InboxPage() {
  return <InboxApp />;
}
