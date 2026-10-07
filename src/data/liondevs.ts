import { site } from "./site";

// Everything on the /liondevs page comes from here.
// Facts are from the official LionDevs poster. Keep "TBD" until the real value is known.
//
// date:        "TBD" or an ISO date like "2027-02-20T09:00:00-06:00".
//              A real date turns on the live countdown automatically.
// registration.endpoint: the Google Apps Script web app URL that saves sign ups to a
//              Google Sheet (see docs/registration-setup.md). It is set once as
//              formsEndpoint in src/data/site.ts. While it is "TBD" every Register
//              button shows a disabled "Registration opens soon" state.
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
    { icon: "GraduationCap", text: "Open to All Majors and Schools" },
    { icon: "Users", text: "Compete Solo or in Teams of 3" },
    { icon: "Trophy", text: "Prizes & Recognition" },
    { icon: "Lightbulb", text: "Industry Mentorship" },
    { icon: "Share2", text: "Networking Opportunities" },
  ],
  hostedBy: "GDG, Google Developer Group",
  date: "TBD", // exact start time for the countdown, once confirmed
  // Shown while the date is not final. Set to "" once `date` is set.
  tentativeDate: "Finals planned for November 20, 2026",
  location: "Southeastern Louisiana University, Hammond, Louisiana",
  eligibility: "Any major, any school. Must be an active student.",
  openTo: "Open to students from any college or university, not just Southeastern.",
  teamSize: "Teams of up to 3, or compete solo",
  format: "Team competition",
  closingLine: "Form your team. Create impact. Join LionDevs.",
  registration: {
    endpoint: site.formsEndpoint, // set in src/data/site.ts
    pageUrl: "/liondevs/register",
  },
  prizes: "TBD",
  challenge: "TBD",
  poster: "",
  logo: "/images/liondevs-logo.png",
  mentors: [] as Person[],
  judges: [] as Person[],
  sponsors: [] as Sponsor[],
  timeline: [
    {
      date: "Early November (tentative)",
      title: "Challenge starts",
      text: "The challenge is revealed and teams start building. This is about 2 weeks before the finals.",
    },
    {
      date: "November 20 (tentative)",
      title: "Finals",
      text: "Teams pitch their solutions to judges and industry mentors.",
    },
  ] as TimelineItem[],
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
      a: "Anyone can join. LionDevs is open to every major, and you do not have to be a Southeastern student. Students from any college or university are welcome. You just need to be an active student.",
    },
    {
      q: "Do I need a team?",
      a: "No. You can compete on your own or with a team of up to 3 people.",
    },
    {
      q: "When is it?",
      a: "The finals are planned for November 20, and the challenge starts about 2 weeks before that. These dates are not final yet, so follow us on Instagram and LinkedIn for updates.",
    },
    {
      q: "Where is it?",
      a: "On campus at Southeastern Louisiana University in Hammond, Louisiana. Students from other schools are welcome to join us there.",
    },
    {
      q: "What can we win?",
      a: "There will be prizes and recognition for top teams. Details are coming soon.",
    },
  ],
};
