"use client";

import { useSyncExternalStore } from "react";

function subscribe(cb: () => void) {
  const id = setInterval(cb, 1000);
  return () => clearInterval(id);
}

const getNow = () => Math.floor(Date.now() / 1000);
const getServerNow = () => null;

/** Live countdown to the event, styled for the dark event console. */
export function Countdown({ iso }: { iso: string }) {
  const now = useSyncExternalStore(subscribe, getNow, getServerNow);
  const target = Math.floor(new Date(iso).getTime() / 1000);

  if (now === null) {
    return <div className="h-14" aria-hidden />;
  }

  const left = Math.max(0, target - now);
  if (left === 0) {
    return <p className="text-[13px] font-semibold text-[#4ade80]">LionDevs is happening now</p>;
  }

  const parts = [
    { label: "days", value: Math.floor(left / 86400) },
    { label: "hrs", value: Math.floor((left % 86400) / 3600) },
    { label: "min", value: Math.floor((left % 3600) / 60) },
    { label: "sec", value: left % 60 },
  ];

  return (
    <div
      role="timer"
      aria-label={`${parts[0].value} days and ${parts[1].value} hours until LionDevs`}
    >
      <ul aria-hidden className="flex gap-2">
        {parts.map((p) => (
          <li
            key={p.label}
            className="flex min-w-14 flex-col items-center rounded-lg border border-white/[0.08] bg-white/[0.04] px-2 py-2"
          >
            <span className="font-mono text-[18px] text-white tabular-nums">
              {String(p.value).padStart(2, "0")}
            </span>
            <span className="text-[9px] tracking-wider text-white/40 uppercase">{p.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
