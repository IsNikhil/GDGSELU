import Image from "next/image";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

/** Logo mark plus the chapter name set in Cabinet Grotesk. */
export function Logo({
  className,
  priority = false,
  showName = true,
}: {
  className?: string;
  priority?: boolean;
  showName?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <Image
        src={site.logo}
        alt=""
        width={32}
        height={32}
        sizes="64px"
        priority={priority}
        className="size-8 rounded-lg mix-blend-multiply"
      />
      {showName && (
        <span className="font-display text-[19px] leading-none font-extrabold tracking-tight text-foreground">
          GDG Southeastern
        </span>
      )}
    </span>
  );
}
