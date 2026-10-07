// Board members. Card rules:
//   name "TBD"            -> card is hidden
//   email "TBD" or ""     -> email button is hidden
//   photo ""              -> initials avatar is shown
//   linkedin ""           -> avatar is not a link
// For a photo, put the file in team-photos/ (for example team-photos/mahesh.jpg),
// run `npm run images`, then set photo to "/images/team/mahesh.png".
export type TeamMember = {
  name: string;
  role: string;
  email: string;
  linkedin: string;
  photo: string;
};

export const team: TeamMember[] = [
  {
    name: "Mahesh Raj Pandit",
    role: "President",
    email: "mahesh.pandit@selu.edu",
    linkedin: "https://www.linkedin.com/in/maheshpandit2",
    photo: "",
  },
  {
    name: "Nikhil Shah",
    role: "Vice President",
    email: "nikhilkumar.shah@selu.edu",
    linkedin: "https://www.linkedin.com/in/nikhilsha",
    photo: "",
  },
  {
    name: "Sona Bhatta",
    role: "Secretary",
    email: "sona.bhatta@selu.edu",
    linkedin: "https://www.linkedin.com/in/sona-bhatta",
    photo: "",
  },
  {
    name: "Sonja Bhatta",
    role: "Treasurer",
    email: "sonja.bhatta@selu.edu",
    linkedin: "https://www.linkedin.com/in/sonja-bhatta",
    photo: "",
  },
];
