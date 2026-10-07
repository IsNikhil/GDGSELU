"use client";

import { Check, Copy } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { LinkedInIcon } from "@/components/ui/SocialIcons";
import type { TeamMember } from "@/data/team";
import { initials, isTBD } from "@/lib/utils";

function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 1800);
    return () => clearTimeout(t);
  }, [copied]);

  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(email);
          setCopied(true);
        } catch {}
      }}
      aria-label={copied ? "Email copied" : `Copy email address ${email}`}
      className="flex size-[38px] shrink-0 items-center justify-center rounded-full border border-line text-subtle transition-colors hover:border-line-hover hover:text-foreground"
    >
      {copied ? (
        <Check aria-hidden className="size-4 text-[#16803c]" />
      ) : (
        <Copy aria-hidden className="size-3.5" />
      )}
      <span aria-live="polite" className="sr-only">
        {copied ? "Copied" : ""}
      </span>
    </button>
  );
}

/** Board member card: portrait photo, name, role, and contact actions. */
export function TeamCard({ member }: { member: TeamMember }) {
  const hasEmail = !isTBD(member.email);
  const hasLinkedIn = !isTBD(member.linkedin);

  return (
    <article className="group flex h-full flex-col rounded-2xl border border-line bg-white p-3 transition-colors duration-200 hover:border-line-hover">
      <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-surface">
        {member.photo ? (
          <Image
            src={member.photo}
            alt={`Photo of ${member.name}`}
            fill
            sizes="(min-width: 1024px) 270px, (min-width: 640px) 45vw, 90vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            style={{ objectPosition: member.photoFocus }}
          />
        ) : (
          <span
            aria-hidden
            className="flex size-full items-center justify-center font-display text-5xl font-bold text-subtle"
          >
            {initials(member.name)}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col px-2 pt-4 pb-1">
        <h3 className="text-[18px] font-bold text-foreground">{member.name}</h3>
        <p className="text-[13.5px] text-muted">{member.role}</p>
        {(hasEmail || hasLinkedIn) && (
          <div className="mt-auto flex items-center gap-2 pt-5">
            {hasEmail && (
              <a
                href={`mailto:${member.email}`}
                className="flex-1 rounded-full border border-line px-4 py-2 text-center text-[13px] font-semibold text-foreground transition-colors hover:bg-black/[0.03]"
              >
                Email
                <span className="sr-only"> {member.name}</span>
              </a>
            )}
            {hasEmail && <CopyEmail email={member.email} />}
            {hasLinkedIn && (
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${member.name} on LinkedIn (opens in a new tab)`}
                className="flex size-[38px] shrink-0 items-center justify-center rounded-full border border-line text-subtle transition-colors hover:border-line-hover hover:text-[#0a66c2]"
              >
                <LinkedInIcon className="size-3.5" />
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
