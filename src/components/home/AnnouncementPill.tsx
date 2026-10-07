import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { registrationOpen } from "@/components/liondevs/RegisterButton";
import { announcement } from "@/data/site";
import { rise } from "@/lib/utils";

/** Small "New" pill above the hero headline that points to the current big thing. */
export function AnnouncementPill() {
  if (!announcement.text) return null;
  const href = registrationOpen ? announcement.href : "/liondevs";
  return (
    <Link
      href={href}
      className="rise group mb-7 inline-flex max-w-full items-center gap-2 whitespace-nowrap rounded-full border border-line bg-white/70 py-1 pr-3 pl-1 text-[12px] sm:gap-2.5 sm:pr-3.5 sm:text-[13px] font-medium text-foreground shadow-sm shadow-black/[0.03] backdrop-blur-md transition-all duration-300 hover:border-line-hover hover:bg-white hover:shadow-md hover:shadow-black/[0.06]"
      style={rise({ y: 12, blur: 4, dur: 0.6, delay: 0.2 })}
    >
      <span className="relative flex items-center gap-1.5 rounded-full bg-brand px-2 py-0.5 text-[10.5px] sm:px-2.5 sm:text-[11px] font-semibold text-white">
        <span aria-hidden className="relative flex size-1.5">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-white opacity-75 motion-reduce:hidden" />
          <span className="relative inline-flex size-1.5 rounded-full bg-white" />
        </span>
        {announcement.badge}
      </span>
      {announcement.text}
      <ArrowRight
        aria-hidden
        className="size-3.5 text-muted transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-foreground"
      />
    </Link>
  );
}
