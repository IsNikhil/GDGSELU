"use client";

import { useSyncExternalStore } from "react";

function subscribe(cb: () => void) {
  const id = setInterval(cb, 1000);
  return () => clearInterval(id);
}

const getNow = () => Math.floor(Date.now() / 1000);
const getServerNow = () => null;

/** Live countdown to the event. Only rendered when the date is a real ISO date. */
export function Countdown({ iso }: { iso: string }) {
  const now = useSyncExternalStore(subscribe, getNow, getServerNow);
  const target = Math.floor(new Date(iso).getTime() / 1000);

  if (now === null) {
    return <div className="h-[5.5rem]" aria-hidden />;
  }

  const left = Math.max(0, target - now);
  if (left === 0) {
    return (
      <p className="rounded-full border border-ld-gold/50 bg-ld-gold/10 px-5 py-2 font-semibold text-ld-gold-light">
        LionDevs is happening now
      </p>
    );
  }

  const parts = [
    { label: "Days", value: Math.floor(left / 86400) },
    { label: "Hours", value: Math.floor((left % 86400) / 3600) },
    { label: "Minutes", value: Math.floor((left % 3600) / 60) },
    { label: "Seconds", value: left % 60 },
  ];

  return (
    <div
      role="timer"
      aria-label={`${parts[0].value} days and ${parts[1].value} hours until LionDevs`}
    >
      <ul aria-hidden className="flex gap-2 sm:gap-3">
        {parts.map((p) => (
          <li
            key={p.label}
            className="flex min-w-[4.25rem] flex-col items-center rounded-2xl border border-ld-gold/30 bg-ld-bg-2/70 px-2 py-3 sm:min-w-20"
          >
            <span className="font-serif text-2xl font-semibold text-ld-gold-light tabular-nums sm:text-3xl">
              {String(p.value).padStart(2, "0")}
            </span>
            <span className="mt-1 text-[0.7rem] tracking-[0.18em] text-ld-muted uppercase">
              {p.label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
