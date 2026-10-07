# GDG Southeastern website

The website for GDG Southeastern, the Google Developer Group at Southeastern Louisiana University,
plus the LionDevs event page and registration form.

Built with Next.js (static export), TypeScript, Tailwind CSS, and Framer Motion.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
```

## Build and deploy

```bash
npm run build      # writes a plain static site to out/
npm start          # preview the built site
```

Upload the `out/` folder to any static host:

- **Vercel or Netlify:** import the repo. Build command `npm run build`, output folder `out`.
- **GitHub Pages:** run the build in a GitHub Action and publish `out/`.

Set `NEXT_PUBLIC_SITE_URL` to the live address (for example `https://gdgselu.org`) so SEO links and the sitemap are correct.

## Checks

```bash
npm run lint           # zero warnings allowed
npm run check:dashes   # fails if any em or en dash appears
npm run typecheck
```

## Edit content (no coding needed)

All text lives in `src/data/`. Change a value, save, and rebuild.

| What | File | Field |
|---|---|---|
| LionDevs date (turns on the countdown) | `src/data/liondevs.ts` | `date`, as `"2026-11-20T09:00:00-06:00"`. Then set `tentativeDate` to `""` |
| Registration form | `src/data/liondevs.ts` | `registration.endpoint`. See `docs/registration-setup.md` |
| Timeline, challenge, prizes, FAQ | `src/data/liondevs.ts` | `timeline`, `challenge`, `prizes`, `faqs` |
| Mentors, judges, sponsors | `src/data/liondevs.ts` | `mentors`, `judges`, `sponsors` (empty lists are hidden) |
| Board members, emails, LinkedIn | `src/data/team.ts` | each member. A name of `"TBD"` hides the card |
| Board photos | `team-photos/` + `src/data/team.ts` | drop `name.jpg` in `team-photos/`, set `photo: "/images/team/name.png"` |
| Chapter email, join link, socials | `src/data/site.ts` | `contactEmail`, `joinUrl`, `social` |
| Announcement bar | `src/data/site.ts` | `announcement` |
| About text and tech chips | `src/data/about.ts` | |

Images in `brand-assets/` and `team-photos/` are resized to WebP automatically when you run `npm run dev` or `npm run build`.

`TODO_CONTENT.md` lists every placeholder that still needs real content.

## Registration and marketing emails

The LionDevs form saves sign ups to a Google Sheet through a small Google Apps Script. Setup takes about 10 minutes:
see `docs/registration-setup.md`. The form asks for marketing consent, and the sheet records it.

## Design notes

- Two moods, one design system: the main site is light with Google color accents. LionDevs is always dark green and gold to match the poster.
- Colors are CSS variables in `src/app/globals.css`. Google yellow and green are only used for decoration, never for text, because they fail contrast on white.
- Animations use only `transform` and `opacity` and switch off with the reduced motion setting.
- "Join" buttons go to the GDG community page.
- Every page passes an automated accessibility check (axe) in light and dark mode.
