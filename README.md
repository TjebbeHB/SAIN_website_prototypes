# SAIN: Safe AI Netherlands

Website for Safe AI Netherlands (SAIN), the national AI Safety initiative with chapters in Groningen, Amsterdam, and Utrecht.

## Tech stack

- **Next.js 14** (App Router, static export)
- **React 18** + **TypeScript**
- **Tailwind CSS 4** with brand tokens in `src/app/globals.css`, light and dark
- **Motion** for scroll animations
- **d3-geo** for the homepage atlas (globe and Netherlands map)

## Getting started

```bash
npm install
npm run dev     # → http://localhost:3000
npm run build   # static export to /out
npm run images  # regenerate responsive image variants
npm run fetch-impact-metrics   # count the SAIN Pipeline base (needs AIRTABLE_TOKEN)
npm run build-atlas-geography  # rebuild the globe and North Sea maps from Natural Earth
```

## Project structure

```
src/
  app/
    page.tsx              # Homepage
    about/                # About, plus the vision / theory of change / code of conduct documents
    community/            # Community and chapter overview
    courses/              # Free courses
    research/             # Research hub and handbook
    get-involved/         # Volunteering
    open-positions/       # Careers
    contact/
    chapters/
      groningen/          # SAIN Groningen chapter (+ events archive)
      amsterdam/          # SAIN Amsterdam chapter
      utrecht/            # SAIN Utrecht chapter
    team/
  components/             # Shared and per-page components
    atlas/                # Homepage hero: the story globe and the Netherlands map
  data/                   # Site content (people, research, events, positions)
    atlas/                # Story steps, the Dutch ecosystem, the North Sea basemap
    impactMetrics.json    # Aggregates for the impact band (written by a script)
    impactTargets.ts      # The target line and the pipeline's level names

public/
  sain-symbol.svg         # SAIN network symbol (favicon, structured data)
  atlas/world.json        # Simplified world coastlines for the globe
  landing/                # Landing photographs and logo lockups, with responsive variants
  illustrations/          # Hero and research illustrations
  photos/                 # Event, city, team, advisory board and supervisor photos

docs/                     # SAIN documents rendered on the site
design/                   # Design system (design.md, sain-brand.css) and page copy briefs
scripts/                  # Image generation, Luma and Airtable fetches, atlas geography
```

## Brand

- **Colours**: Navy `#021c4d`, Orange `#ff6025`, paper `#f7f5f2`
- **Fonts**: League Spartan (headings), Poppins (body)
- **Themes**: light by day, dark by night. The reader's toggle wins, otherwise the system decides (`ThemeToggle`, and the inline script in `layout.tsx`). Colours are roles, not paints: write `text-navy`, `bg-page`, `bg-cream`, `bg-inverse`, and the dark theme re-points them
- **Design system**: see `design/design.md`, including the section on this redesign

## The homepage atlas

The hero's right two thirds tell SAIN's story on a globe (funders, then curricula), dive into the Netherlands, and hand the reader an explorable map of the chapters and the organisations around them.

- **The story** is `src/data/atlas/story.ts`. Each step has a camera, the organisations it pins, and its copy.
- **The map** is `src/data/atlas/ecosystem.ts`. Every organisation and every line carries a `source`: if SAIN does not say it in public, it does not get a line. Orange lines are working relationships; dotted lines are people in common.
- It plays once, pauses off screen, and never plays under `prefers-reduced-motion`.
- In development, `__sainAtlas.at(ms)` in the console scrubs to any moment of the story.

## Find your next step

The hero button opens the Airtable form set in `PATHFINDER_FORM_URL` (`src/data/siteContact.ts`). Until that is set it asks the same question itself and links to the courses, the Research hub and the supervisor form.

## Impact metrics

The band under the hero reads `src/data/impactMetrics.json`. `scripts/fetch-impact-metrics.mjs` writes it from the SAIN Pipeline base as aggregates only (no names, emails or rows; chapters under five people are suppressed). It needs `AIRTABLE_TOKEN`, a personal access token with `data.records:read` on that base. `.github/workflows/refresh-impact-metrics.yml` runs it weekly and opens a PR when the totals change, once the `AIRTABLE_TOKEN` repo secret exists. Until then the band shows illustrative figures and says so. The dotted target line is `src/data/impactTargets.ts`.

## Deployment

Static export via `next build`. Every push to `main` triggers a Vercel production deploy (`.github/workflows/deploy.yml`) on `safeainetherlands.org`.
