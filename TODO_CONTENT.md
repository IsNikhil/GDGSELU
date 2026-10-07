# Content still needed

Every item below is a placeholder on the live site. Update the file listed, then rebuild.

## Chapter (`src/data/site.ts`)

- [ ] `contactEmail`: chapter email address. While "TBD", email links are hidden.
- [ ] `url`: the real website address once deployed (or set `NEXT_PUBLIC_SITE_URL`). Used for SEO and the sitemap.

## LionDevs (`src/data/liondevs.ts`)

- [ ] `registration.endpoint`: Google Apps Script URL. Steps in `docs/registration-setup.md`. Until set, every Register button says "Registration opens soon".
- [ ] `date`: exact date and time of the finals as an ISO date (for example `2026-11-20T09:00:00-06:00`). Setting it turns on the live countdown. Then set `tentativeDate` to "".
- [ ] `timeline`: confirm the two tentative dates (challenge start in early November, finals on November 20).
- [ ] `challenge`: the challenge statement.
- [ ] `prizes`: prize details. No dollar amounts until confirmed.
- [ ] `mentors`, `judges`, `sponsors`: add people and sponsors once confirmed.
- [ ] `poster`: the official poster. Put it in `brand-assets/liondevs-poster.png` and set `poster` to `/images/liondevs-poster.png`.

## Team (`src/data/team.ts`)

- [ ] Photos for each board member. Put files in `team-photos/` and set `photo` (see the comment at the top of the file).

## Brand

- [ ] A larger GDG Southeastern logo (at least 800 by 800 px). The current one is 200 px and looks soft on high resolution screens.
