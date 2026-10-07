// Organizations we have collaborated with. Shown in the slider above the footer.
// logo: optional. Put the file in brand-assets/ (for example brand-assets/north-oaks.png),
//       run `npm run images`, then set logo to "/images/north-oaks.png".
//       Without a logo the name is shown as a wordmark.
// url:  optional link to the organization's site.
export type Partner = { name: string; logo?: string; url?: string };

export const partners: Partner[] = [
  { name: "North Oaks Health System" },
  { name: "Southeastern Northshore STEM Center" },
  { name: "Google" },
];
