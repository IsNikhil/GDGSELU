// Everything on the /liondevs page comes from here.
// Facts are from the official LionDevs poster. Keep "TBD" until the real value is known.
//
// date:        "TBD" or an ISO date like "2027-02-20T09:00:00-06:00".
//              A real date turns on the live countdown automatically.
// registerUrl: "TBD" shows a disabled "Registration opens soon" button.
// poster:      "" hides the poster section. Put the file in brand-assets/liondevs-poster.png,
//              run `npm run images`, then set this to "/images/liondevs-poster.png".

export type Person = { name: string; title?: string; photo?: string; url?: string };
export type Sponsor = { name: string; logo?: string; url?: string };
export type TimelineItem = { date: string; title: string; text?: string };

export const liondevs = {
  name: "LionDevs",
  org: "Southeastern Louisiana University",
  label: "Innovation & Solutions Competition",
  headline: ["Build.", "Solve.", "Pitch."],
  description:
    "A team-based competition where students tackle real-world challenges, build creative solutions, and present their ideas to judges and industry mentors.",
  highlights: [
    { icon: "GraduationCap", text: "Open to Engineering, Computer Science & Business Students" },
    { icon: "Users", text: "Team Competition" },
    { icon: "Trophy", text: "Prizes & Recognition" },
    { icon: "Lightbulb", text: "Industry Mentorship" },
    { icon: "Share2", text: "Networking Opportunities" },
  ],
  hostedBy: "GDG, Google Developer Group",
  date: "TBD",
  location: "Southeastern Louisiana University, Hammond, Louisiana",
  eligibility: "Engineering, Computer Science & Business students",
  format: "Team competition",
  closingLine: "Form your team. Create impact. Join LionDevs.",
  registerUrl: "TBD",
  prizes: "TBD",
  challenge: "TBD",
  poster: "",
  logo: "/images/liondevs-logo.png",
  mentors: [] as Person[],
  judges: [] as Person[],
  sponsors: [] as Sponsor[],
  timeline: [] as TimelineItem[],
  steps: [
    {
      word: "Build",
      title: "Build",
      text: "Form a team and create a working solution together.",
    },
    {
      word: "Solve",
      title: "Solve",
      text: "Take on a real-world challenge and find a smart way to fix it.",
    },
    {
      word: "Pitch",
      title: "Pitch",
      text: "Present your idea to judges and industry mentors.",
    },
  ],
  faqs: [
    {
      q: "Who can join?",
      a: "LionDevs is open to Engineering, Computer Science, and Business students.",
    },
    {
      q: "Do I need a team?",
      a: "Yes. LionDevs is a team competition. Team size details are coming soon.",
    },
    {
      q: "When is it?",
      a: "The date will be announced soon. Follow us on Instagram and LinkedIn for updates.",
    },
    {
      q: "Where is it?",
      a: "On campus at Southeastern Louisiana University in Hammond, Louisiana.",
    },
    {
      q: "What can we win?",
      a: "There will be prizes and recognition for top teams. Details are coming soon.",
    },
  ],
};
