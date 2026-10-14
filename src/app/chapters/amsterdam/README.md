# SAIN Amsterdam chapter page

Source for `/chapters/amsterdam`. The page is one of three thin city fact
sheets built on the shared template in `src/components/chapters/`: hero, Show
up this week, the course, the team, the record, the close. Change the template
there and all three cities move together; change this file only for Amsterdam
facts.

## Past events list

The record band is populated from a static JSON snapshot at
`src/data/lumaPastEventsAmsterdam.json`, **not** from a live Luma fetch. This
keeps deploys independent of Luma's API. If Luma is down or changes shape, the
build still works.

### Refresh the list

Run from the repo root:

```bash
npm run fetch-luma-events-amsterdam
```

This calls Luma's API for past events on calendar `cal-WD5xl5IYLpY7xNm`
(SAIN Amsterdam, the same id the page embeds) and overwrites
`src/data/lumaPastEventsAmsterdam.json`. Then:

```bash
git diff src/data/lumaPastEventsAmsterdam.json   # eyeball the changes
git add src/data/lumaPastEventsAmsterdam.json
git commit -m "chore(amsterdam): refresh Luma past events"
git push
```

This refresh is also run automatically once a day by the
`.github/workflows/refresh-past-events.yml` GitHub Action, so manual runs are
only needed if you want to update immediately.

`pastEventsThisYear` in `src/components/chapters/PastEvents.tsx` filters to
events on or after 1 September of the current academic year, most recent
first. If that year has produced nothing yet, which is the case for most of
September, it falls back to the six most recent events rather than printing an
empty record. Every row carries its own month and year either way.

### Where things live

| File | Purpose |
| --- | --- |
| `page.tsx` | Amsterdam's facts: calendar id, inboxes, course copy, team. |
| `src/components/chapters/*` | The shared six-band chapter template. |
| `src/data/sainAmsTeam.ts` | Team roster (name + role). |
| `src/data/courseApplications.ts` | Whether the cohort is open, and the closed note. |
| `src/data/lumaPastEventsAmsterdam.json` | Snapshot of past Luma events. |
| `scripts/fetch-luma-events-amsterdam.mjs` | Refresh script for the snapshot above. |
| `public/logos/ellis.svg` | ELLIS logo, taken unmodified from their site. |

### ELLIS

ELLIS Unit Amsterdam supports the chapter by promoting our work through its
network. It appears once, as a "Supported by" lockup under the hero's calls to
action, linking to <https://ivi.fnwi.uva.nl/ellis/>. The hero ground is white,
so the logo needs no chip behind it. Amsterdam is the only chapter with a
partner lockup; if a second partner is ever added, factor the markup out of
`page.tsx`.

### Upcoming events

Upcoming events are rendered via a Luma `<iframe>` embed in the shared
`ShowUpBand` component and need no maintenance, because Luma serves them live.
