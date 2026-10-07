// Board members. Card rules:
//   name "TBD"            -> card is hidden
//   email "TBD" or ""     -> email button is hidden
//   photo ""              -> initials avatar is shown
//   linkedin ""           -> avatar is not a link
// For a photo, put the file in team-photos/ (for example team-photos/mahesh.jpg),
// run `npm run images`, then set photo to "/images/team/mahesh.png".
// Optional photoFocus ("x% y%", the face center) and photoZoom (1 = no zoom)
// keep the face centered in the round avatar.
export type TeamMember = {
  name: string;
  role: string;
  email: string;
  linkedin: string;
  photo: string;
  photoFocus?: string;
  photoZoom?: number;
};

export const team: TeamMember[] = [
  {
    name: "Mahesh Raj Pandit",
    role: "President",
    email: "mahesh.pandit@selu.edu",
    linkedin: "https://www.linkedin.com/in/maheshpandit2",
    photo: "/images/team/mahesh.png",
    photoFocus: "46% 28%",
    photoZoom: 1.7,
  },
  {
    name: "Nikhil Shah",
    role: "Vice President",
    email: "nikhilkumar.shah@selu.edu",
    linkedin: "https://www.linkedin.com/in/nikhilsha",
    photo: "/images/team/nikhil.png",
    photoFocus: "42% 40%",
    photoZoom: 1.25,
  },
  {
    name: "Sona Bhatta",
    role: "Secretary",
    email: "sona.bhatta@selu.edu",
    linkedin: "https://www.linkedin.com/in/sona-bhatta",
    photo: "/images/team/sona.png",
    photoFocus: "50% 38%",
    photoZoom: 1.2,
  },
  {
    name: "Sonja Bhatta",
    role: "Treasurer",
    email: "sonja.bhatta@selu.edu",
    linkedin: "https://www.linkedin.com/in/sonja-bhatta",
    photo: "/images/team/sonja.png",
    photoFocus: "50% 36%",
    photoZoom: 1.25,
  },
];
