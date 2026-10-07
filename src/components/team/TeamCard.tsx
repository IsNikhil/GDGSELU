"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { Check, Copy, Mail } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { LinkedInIcon } from "@/components/ui/SocialIcons";
import type { TeamMember } from "@/data/team";
import { cn, initials, isTBD } from "@/lib/utils";

function Avatar({ name, photo }: { name: string; photo: string }) {
  return (
    <div className="relative size-28 rounded-full bg-[conic-gradient(from_200deg,#4285f4,#34a853,#fbbc04,#ea4335,#4285f4)] p-[3px]">
      <div className="size-full overflow-hidden rounded-full bg-surface p-[3px]">
        {photo ? (
          <Image
            src={photo}
            alt=""
            width={112}
            height={112}
            sizes="112px"
            className="size-full rounded-full object-cover"
          />
        ) : (
          <div
            aria-hidden
            className="flex size-full items-center justify-center rounded-full bg-gradient-to-br from-[#0b3d2e] to-[#1f5c47] text-3xl font-bold tracking-wide text-[#f7f3e8]"
          >
            {initials(name)}
          </div>
        )}
      </div>
    </div>
  );
}

/** Avatar that links to the member's LinkedIn profile when one is set. */
function ProfileAvatar({ member }: { member: TeamMember }) {
  if (isTBD(member.linkedin)) {
    return (
      <div className="mx-auto">
        <Avatar name={member.name} photo={member.photo} />
      </div>
    );
  }
  return (
    <a
      href={member.linkedin}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${member.name} on LinkedIn (opens in a new tab)`}
      className="group/avatar relative mx-auto block rounded-full transition-transform duration-300 hover:scale-[1.04] motion-reduce:hover:scale-100"
    >
      <Avatar name={member.name} photo={member.photo} />
      <span
        aria-hidden
        className="absolute right-0 bottom-0 flex size-9 items-center justify-center rounded-full border-[3px] border-surface bg-[#0a66c2] text-white shadow-card transition-transform duration-300 group-hover/avatar:scale-110"
      >
        <LinkedInIcon className="size-3.5" />
      </span>
    </a>
  );
}

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
      className="flex size-11 items-center justify-center rounded-full border border-line text-muted transition-colors hover:text-fg"
    >
      {copied ? (
        <Check aria-hidden className="size-4 text-[#188038]" />
      ) : (
        <Copy aria-hidden className="size-4" />
      )}
      <span aria-live="polite" className="sr-only">
        {copied ? "Copied" : ""}
      </span>
    </button>
  );
}

/** Board member card. Tilts slightly toward the pointer on desktop. */
export function TeamCard({ member }: { member: TeamMember }) {
  const reduce = useReducedMotion();
  const [fine, setFine] = useState(false);
  const rx = useSpring(useMotionValue(0), { stiffness: 200, damping: 18 });
  const ry = useSpring(useMotionValue(0), { stiffness: 200, damping: 18 });
  const hasEmail = !isTBD(member.email);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setFine(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const tilt = fine && !reduce;

  return (
    <motion.article
      style={tilt ? { rotateX: rx, rotateY: ry, transformPerspective: 900 } : undefined}
      onPointerMove={(e) => {
        if (!tilt) return;
        const r = e.currentTarget.getBoundingClientRect();
        ry.set(((e.clientX - r.left) / r.width - 0.5) * 10);
        rx.set(-((e.clientY - r.top) / r.height - 0.5) * 10);
      }}
      onPointerLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
      className={cn(
        "flex h-full flex-col items-center rounded-3xl border border-line bg-surface p-7 text-center shadow-card",
        "transition-shadow duration-300 hover:shadow-card-lg",
      )}
    >
      <ProfileAvatar member={member} />
      <h3 className="mt-5 text-xl font-bold text-fg">{member.name}</h3>
      <p className="mt-1 font-medium text-gold-text">{member.role}</p>
      {hasEmail && (
        <div className="mt-5 flex items-center justify-center gap-2">
          <a
            href={`mailto:${member.email}`}
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line px-4 text-sm font-semibold text-fg transition-colors hover:bg-surface-2"
          >
            <Mail aria-hidden className="size-4" />
            Email
            <span className="sr-only"> {member.name}</span>
          </a>
          <CopyEmail email={member.email} />
        </div>
      )}
    </motion.article>
  );
}
