// Board members. Card rules:
//   name "TBD"            -> card is hidden
//   email "TBD" or ""     -> email button is hidden
//   photo ""              -> initials avatar is shown
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
  { name: "Mahesh Raj Pandit", role: "President", email: "TBD", linkedin: "", photo: "" },
  { name: "Nikhil Shah", role: "Vice President", email: "TBD", linkedin: "", photo: "" },
  { name: "Sonja Bhatta", role: "Officer", email: "TBD", linkedin: "", photo: "" },
  { name: "TBD", role: "Officer", email: "TBD", linkedin: "", photo: "" },
];
