export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/** True when a content value is missing or still marked as TBD. */
export function isTBD(value: string | undefined | null) {
  return !value || value.trim() === "" || value.trim().toUpperCase() === "TBD";
}

/** Returns a Date when the value is a real ISO date, otherwise null. */
export function parseDate(value: string | undefined | null) {
  if (isTBD(value)) return null;
  const d = new Date(value as string);
  return Number.isNaN(d.getTime()) ? null : d;
}

export function formatDate(d: Date) {
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "America/Chicago",
  });
}

export function initials(name: string) {
  const parts = name.split(/\s+/).filter(Boolean);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
}
