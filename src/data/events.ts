export type EventItem = {
  slug: string;
  title: string;
  subtitle: string;
  date: string; // "TBD" or an ISO date such as "2027-02-20T09:00:00-06:00"
  location: string;
  featured: boolean;
  href: string;
};

export const events: EventItem[] = [
  {
    slug: "liondevs",
    title: "LionDevs",
    subtitle: "Innovation & Solutions Competition",
    date: "TBD",
    location: "Southeastern Louisiana University, Hammond, Louisiana",
    featured: true,
    href: "/liondevs",
  },
];

export const pastEvents: EventItem[] = []; // leave empty, show a friendly empty state
