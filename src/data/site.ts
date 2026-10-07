// Chapter wide settings. Replace any "TBD" value when the real one is known.
export const site = {
  name: "GDG Southeastern",
  fullName: "Google Developer Group at Southeastern Louisiana University",
  tagline: "Learn. Build. Connect.",
  description:
    "GDG Southeastern is a student-run developer community at Southeastern Louisiana University. Workshops, tech talks, projects, and LionDevs.",
  location: "Southeastern Louisiana University, Hammond, Louisiana",
  contactEmail: "TBD", // add chapter email
  social: {
    linkedin: "https://www.linkedin.com/company/gdg-southeastern",
    instagram: "https://www.instagram.com/gdgselu/",
  },
  joinUrl:
    "https://gdg.community.dev/gdg-on-campus-southeastern-louisiana-university-hammond-united-states/",
  // Public address of the deployed site. Used for SEO links and the sitemap.
  // Set NEXT_PUBLIC_SITE_URL when you deploy, or edit the fallback here.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://gdgselu.com",
  logo: "/images/gdg-southeastern-logo.png",
};

export const nav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Events", href: "/events" },
  { label: "LionDevs", href: "/liondevs", highlight: true },
  { label: "Team", href: "/team" },
  { label: "Contact", href: "/contact" },
];

export const announcement = {
  text: "LionDevs is coming. Build. Solve. Pitch.",
  linkLabel: "Learn more",
  href: "/liondevs",
};

export const disclaimer =
  "GDG Southeastern is an independent group. Our activities and the opinions expressed here should in no way be linked to Google, the corporation.";
