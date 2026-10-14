---
name: sain-design
description: "Design, build, or substantially improve official Safe AI Netherlands (SAIN) pages. Use for the marketing site, landing, courses, research hub, careers, community, and any SAIN-authored surface that must carry the civic navy-and-orange language of the shipped landing page."
---

# Design official SAIN pages

Act as a SAIN designer, editor, and design engineer. Turn the available material into an official Safe AI Netherlands page. Shape the argument and the interface together. Do not restyle a generic nonprofit template, a lab website, or a SaaS landing.

This file is the design authority. Tokens are the values. The prose is why those values exist and how to apply them. When a later mock disagrees with this file, this file wins unless the user is explicitly changing the system.

**Source of truth.** The shipped landing page: `src/app/page.tsx`, `src/app/globals.css`, `src/components/Navbar.tsx`, `src/components/Footer.tsx`, and `src/components/landing/*`, as of 13 September 2026. This file documents that implementation; where this file and the shipped landing ever disagree, the landing wins and this file gets corrected. The Paper file ([Safe AI Netherlands](https://app.paper.design/file/01M1ETAWAXME52JE86CQ1HDSVZ/1-0), artboard **Desktop - Landing**) is lineage: it set the language, but the implementation has since refined the ramp, retired the mono face, and added a quiet ornament and motion system. Earlier HTML drafts are older lineage still. v1 used Spectral, cream `#fbfaf9`, 56px gutters, and uppercase IBM Plex Mono kickers. The landing rejected those. Do not revive them.

## October 2026 redesign (branch `redesign/atlas-home`)

This branch changes the system on purpose, at the Head of Projects' request: a homepage that shows SAIN's place in the field on a map, a dark theme, and slightly more contemporary components. Where it departs from the rules below, the departure is listed here so it can be reviewed and kept or reverted piece by piece. Everything not listed still stands.

- **Two themes.** Colours are roles, re-pointed by `data-theme` on `<html>`: `navy` (ink), `page`, `cream` (paper), `inverse` (the navy band), `deep` (the hero sky), `chalk` (light ink that stays light), `on-ink`. By night ink is chalk `#F1EEE8`, the page is brand navy, paper lifts to `#082656` and inverse sinks to `#01112F`. Orange does not move; orange-ink brightens to `#FF8A5B`. Write roles (`bg-page`, `bg-inverse`), never `bg-white` or `bg-navy` for a ground. Default follows the reader's system; the header toggle remembers a choice. This replaces "Dark mode as the default marketing surface" with "dark when the reader asks for it".
- **Headings at 700.** Display and heading now set League Spartan 700 with tighter tracking. `--text-hero` (42 to 64px) exists for the homepage claim only.
- **Buttons at 4px.** Every `btn-*` keeps its colours and sizes and gains a 4px corner and a 500 label. Square still reads as print; 4px reads as something you can press.
- **Eyebrow.** A new `eyebrow` utility (tracked uppercase, orange-ink) labels the hero and the impact band. It is a label of a few words, not a kicker: keep the italic kicker everywhere else.
- **The homepage hero is the atlas** (`src/components/atlas`). A deliberate exception to the motion rules: it tells SAIN's story once on a globe (funders, curricula), dives into the Netherlands and stops on an explorable map, where routes flow, chapters pulse and the sea and wind move. Its purpose in one sentence: show that SAIN connects the Netherlands to the field. It has pause, step and skip controls, pauses off screen, and never plays under reduced motion. No other page gets ambient motion.
- **Map honesty.** Every node and line in `src/data/atlas` names its source; city anchors are GeoNames points; shared-city organisations are spread schematically and the legend says so. Orange lines are working relationships, dotted lines are people in common, never affiliation (the chapter pages say the courses are not affiliated with the universities).
- **The impact band** (`ImpactMetrics`) puts numbers under the hero for funders: a target-versus-actual chart on an inverse card, four figures on a hairline (not boxes), and the six pipeline levels. It reads aggregates from Airtable and labels illustrative data as illustrative.
- **Header.** The lockup sits beside "Safe AI Netherlands" behind a hairline, the nav gains Impact (`/#impact`), and the theme toggle sits before the two buttons. The active nav item underlines in orange.

## SAIN, and the job of a page

SAIN is Stichting Safe AI Netherlands. It is a volunteer-run civic organisation that upskills students and young professionals in the Netherlands, then connects the strongest people onward to labs, institutes, ministries, and jobs. Every programme is free.

The reader is usually a student, early researcher, or public-sector person who has heard of AI safety and is asking whether a real path exists here. They are not buying software. They are deciding whether to show up on a Tuesday in Utrecht.

If they saw only the first viewport, they should remember three facts:

1. This is a Dutch organisation with a serious institutional voice.
2. There is a path (course, community, research, career), and it is free.
3. The work is already happening. The illustration, the cities, the photos, and the papers are evidence, not decoration.

Write for that reader. British spelling (`programme`, `organisation`). Sentence case. Periods on claims. No slogans.

## Site structure

The site the landing belongs to. Build inner pages into this structure; do not invent routes.

**Primary nav:** `Courses` (/courses) | `Community` (/community) | `Research hub` (/research) | `About` (/about). **Header buttons:** `Join a free course` (/courses, ink fill) and `Volunteer` (/get-involved, ghost). **Open positions** lives at `/open-positions` and is reached from the announcement bar and the footer only, never the nav. Chapter sub-pages stay at `/chapters/utrecht`, `/chapters/groningen`, `/chapters/amsterdam`, under the Community page. `/research/handbook` is the research handbook. `/contact` stays.

One avatar per page. Write each page to exactly one reader:

- **Community** speaks to the same person the landing speaks to: someone deciding whether to walk into an event and join the community.
- **Research hub** speaks to researchers. Primarily beginning researchers choosing a first real project; experienced researchers read the same page for reputability, and the page moves them to become supervisors.
- **About** speaks to outsiders who need the mission and the means (the talent pipeline) established. It may inspire; it must be crystal clear about scale and stakes.
- **Open positions** speaks to candidates.

Every page hero must establish in one glance that the reader landed on the right page. The heading claims the page's territory; the subheading states the page's premise in one or two sentences. The hero's illustration, when there is one, supports the premise with an analogy, the way the landing's learning-to-steering drawing supports "your career starts here".

## Use this priority order

When requirements compete, protect them in this order:

1. Preserve supplied facts, names, cities, programme details, and the claim that programmes are free.
2. Preserve this visual system. Do not substitute Inter, Geist, rounded pills, or a second accent.
3. Make the path through SAIN visible. A page that explains "who we are" without showing course → community → contribution → career has failed the job.
4. Keep orange as identity, not garnish. Navy as ink, not a dark-mode theme.
5. Choose a composition that belongs to this material. Do not import a hero-plus-card-grid.
6. Refine responsive behaviour and interaction without flattening the hierarchy.

Ask questions only when proceeding would invent a programme, a city, a publication, a statistic, a legal claim, or a call to action SAIN has not earned. Otherwise omit the unknown and proceed.

## Why this language exists

SAIN talks to universities, ministries, and frontier labs while recruiting students who have never been in those rooms. The design has to look like a Dutch civic body and still feel like a community you can walk into.

**Navy `#021C4D` is ink.** It is close to Dutch government and university blue. It has to survive in a letter from a stichting, on a slide in The Hague, and on a course handout. It is not tech-startup navy (too black) and not flag blue (too bright). On light grounds, hierarchy is navy at different opacities, never a grey scale. Grey would make this look like a product UI.

**Orange `#FF6025` is Dutch and it is action.** The A in the wordmark is orange. The pinwheel interlocks navy and orange through a white core. The announcement bar is a full-bleed orange strip. Orange is not a 10% accent you sprinkle on icons. It marks joining, hiring, the active course track, the last step of the pipeline, and the part of the trajectory that is still rising. If a page uses orange only as a bullet dot, it is not SAIN.

**White is the reading page. Paper `#F7F5F2` is the printed programme.** White is default. Cream is for the chapters index, courses, and careers, the parts that behave like a schedule. Navy inverse is earned. Use it when the page is presenting proof (the research hub band, publications) or asking for a decision (the get-involved close, footer). Do not default the site to dark.

**IBM Plex Serif is the voice. Archivo is the work.** Headlines are a newspaper serif at weight 400, not a bold billboard. Kickers are IBM Plex Serif italic, not tracked uppercase. Body is Archivo at 16.5/27. IBM Plex Mono has been retired from the implementation: it is not loaded, and indices (`01` `02` `03`) are set in Archivo at the index role, or as serif numerals beside inverse step headings. Do not reintroduce a mono face.

**Corners are square because this is print, not product.** Buttons, chips, tabs, and sections have radius 0. The only radii that exist are 3px on inverse trail cards and 50% on 7 to 9px dots. A pill button is a category error.

**Hairlines, not cards.** Structure is 1px ink at low opacity (`border-navy/10` through `border-navy/14` on light; `border-white/10` through `border-white/16` on inverse). Cards with shadows are the lazy answer. The shadows that exist are objects: navy-tinted shadows on photo prints (they are photographs on a table), a drop shadow on the funnel diagram on /about (a diagram you could pick up), and the faint navy-tinted shadow on the print-strip arrow chips.

## Frame the reader's job

Before designing, privately establish:

- Who opens this, in what city or chapter, to decide what?
- What is the next real action (drop in this week, apply to the hub, volunteer)?
- What evidence makes that action credible (a course that ran, a paper, a named supervisor, a photograph from a room that happened)?
- What should remain available without dominating the first read (KvK, full supervisor list, full publication list)?

Order by reader need. Support two speeds:

- **Walk-in path.** Identity, headline, path, one free CTA.
- **Audit path.** Cities, course outline, supervisors, papers, legal footer.

Every section must answer a new question. Combine duplicates. Do not recap the talent pipeline in prose after the funnel has already drawn it.

## Choose the composition

The first viewport is the argument. On the landing that is a split: IBM Plex Serif claim on the left, an illustrated diagram on the right. The diagram is `sain-learning-to-steering.svg`: an accelerating AI trajectory rises from the origin; two figures learn and practise while a third holds a tether, steering the curve away from its dashed continuation. It is not a dashboard widget and not decoration. If you cannot name what the geometry proves, do not draw it.

Name the obvious layout this page type would suggest, then reject it unless the material earns it. A nonprofit landing does not need a centered hero, three circular icons, and a donor strip.

Recurring geometries in the system, use them when they fit the material:

| Material | Geometry |
|---|---|
| A compounding claim, and SAIN's answer to it | The learning-to-steering trajectory illustration (navy linework, orange for the rising part and the people acting on it) |
| A narrowing path | The trapezoid funnel on /about, last band solid orange |
| Cities as peers | Three photo-backed cells under an italic kicker, left hairline, hover reveals the chapter's own photograph under a navy scrim |
| A programme with tracks | 3-up square disclosure tabs, active tab white with a 3px orange underline that slides between tabs |
| Community as fact | Photo prints on white 8px mats with navy-tinted shadows; a snap strip below xl, a tilted scatter at xl |
| People in a role | Square portraits at 140px, serif name with an orange rule drawing under it on hover, sans role. Never circles, never avatars |
| Work already published | Cream cards on inverse navy: illustration plate, orange-ink venue label, serif title, summary, "Read paper" |
| A stepped journey | Serif numerals at 40px column width beside serif headings, a 1px white/8 spine connecting steps (inverse) |
| The close | Inverse navy banner: closing claim left, one accent CTA and one ghost CTA right |

Open space must amplify the focal object. The hero is a `minmax(0,700px)` copy column against a flexible illustration column capped at 560px, inside the 1440 shell. Do not center a short heading in a 1440px void.

## Authorship shell

Every completed page has the same SAIN authorship outcome. The shell is already built (`Navbar.tsx`, `Footer.tsx`); inner pages inherit it, so do not rebuild it, but know how it behaves.

**Announcement (conditional, site-wide).** Renders only while there is something to broadcast (currently: open positions). Full-bleed orange. IBM Plex Serif italic at kicker-sm, white at 85%, for the news. A 22×1 white hairline at 50% (hidden on the narrowest screens). Archivo caption link, white, underline white at 45%, to /open-positions. Padding 11px block, 24/48px inline. It scrolls away once read; it does not stick. This is a civic broadcast. Do not turn it into a dismissible marketing cookie.

**Header.** Sticky (`sticky top-0 z-50`), 70px min height, white at 94% with backdrop blur, 1px `navy/10` bottom hairline. The logo is the PNG lockup (navy wordmark, orange A, pinwheel) at 121×50, served with 2x/3x rungs. Nav is Archivo 14/20 navy, gap 30px; the active item gets a 1px ink bottom border, inactive items get a transparent border that rises to `navy/40` on hover. No filled active pill, no desktop hamburger. Right side: ghost `Volunteer`, ink-fill `Join a free course`, both `min-h-[44px]`. Below lg the nav collapses into a bordered 44px square toggle (Phosphor `List`/`X`) opening a sheet inside the sticky box.

**Footer.** Inverse navy, top hairline white/16. Light lockup at 113×48 with 2x/3x rungs. IBM Plex Serif italic kicker-sm at white/50 for the stichting line and column titles. Archivo 14/20 white/78 for links, rising to white on hover. Bottom rule white/16; copyright, document links (Vision, Theory of Change, Code of Conduct) and the cities line in Archivo footnote white/60. Padding 52px top, 40px bottom.

Do not invent a second logo treatment. Do not set the wordmark in IBM Plex Serif. Do not recolour the pinwheel to a single ink.

**Landing CTA sizing.** `globals.css` upsizes every `btn-*` inside `#main` (unlayered rules, so they beat any Tailwind utility): 16.1/23 with 15×23 padding, and `btn-accent` to 16.675 with 16.1×27.6. Below 384px they step back down so the longest label stays on one line. Two consequences: size a page button by editing those rules, not by adding utilities that will be silently dropped; and the header's buttons sit outside `#main` on purpose and keep their base size.

## Grid and alignment

Desktop canvas is 1440px. The page gutter (`shell` utility) is 24px below md and 48px from md up. Copy columns are 620, 720, or 760px (`--container-copy-narrow`, `--container-copy`, `--container-copy-wide`). Do not let body text run wider than 760px.

Align to a shared edge or a deliberate split. Equivalent peers share type role, padding, and rule position. Chapter cells share a left hairline and an 18px inset. Do not align peers with `gap` alone.

Section band padding is fluid and uneven on purpose. Each band carries its own clamp from `globals.css`; the maximum is the 1440-canvas figure, the minimum is what that becomes on a 375px phone, where 88px of air is most of a screen:

| Band utility | Padding-block | Used for |
|---|---|---|
| `band-hero` | clamp 56→84px top, 48→76px bottom | Hero |
| `band-index` | clamp 32→46px | Thin index bands (chapters, careers) |
| `band-section` / `band-section-top` | clamp 56→88px | Full sections (courses) |
| `band-community` | clamp 48→72px | Community |
| `band-research` | clamp 64→112px | The inverse research band |
| `band-close` | clamp 48→72px | The get-involved close |

Do not normalise these to one stack gap, and do not hand-set `pt`/`pb` where a band utility exists. The chapters band is a thin index. Courses is a chapter. Community is a photograph with a caption in type.

## Typography and rhythm

Load IBM Plex Serif (normal and italic, weights 300 to 700) and Archivo via `next/font`; exposed as `--font-plex-serif` / `--font-archivo`, mapped to `--font-serif` / `--font-sans`. Fallbacks: `Georgia, serif` and `system-ui, sans-serif`. No mono face is loaded.

Use only the published roles. Do not invent a 32px headline because the string is short.

Reading sizes are fixed: body at 16.5 is already right on a phone, and scaling it with the viewport only makes it wrong at one end. The display roles are fluid ramps, not px values with a jump at one breakpoint: each clamp is written in rem (so it answers a reader's changed default font size), interpolates between a 375px phone and a 1280px laptop, then holds.

| Role | Token | Face | Weight | Size / line / tracking | Use |
|---|---|---|---|---|---|
| Display | `--text-display` | IBM Plex Serif | 400 | clamp 36→48 / 1.07 / -0.02em | One hero claim per page |
| Heading | `--text-heading` | IBM Plex Serif | 400 | clamp 28.5→34.5 / 1.14 / -0.012em | Section turns |
| Heading SM | `--text-heading-sm` | IBM Plex Serif | 400 | clamp 24→28.5 / 1.14 / -0.012em | Quieter turns: community, careers, research subsections, step titles |
| Closing | `--text-closing` | IBM Plex Serif | 400 | clamp 27→31.5 / 1.1 / -0.014em | The get-involved claim only |
| Title | `--text-title` | IBM Plex Serif | 400 | 21 / 26 | City names, offer titles |
| Quote | `--text-title` | IBM Plex Serif | 300 | 21 / 31 | Pull quotes |
| Title SM | `--text-title-sm` | IBM Plex Serif | 400 | 19 / 24 | Career track titles, supervisor names, publication card titles. Course tab titles are 20/24, same role. |
| Kicker | `--text-kicker` | IBM Plex Serif italic | 400 | 17 / 24 | Section names. Never uppercase |
| Kicker SM | `--text-kicker-sm` | IBM Plex Serif italic | 400 | 15 / 20 | Announcement line, photo caption bars, outline labels, footer column titles, quote roles |
| Body | `--text-body` | Archivo | 400 | 16.5 / 27 | Reading |
| UI | `--text-ui` | Archivo | 400 | 14.5 / 20 | Accent CTA label (base), outline rows |
| Label | `--text-label` | Archivo | 400 | 14 / 20 | Nav, ghosts, footer links, inline text links |
| Caption | `--text-caption` | Archivo | 400 | 13.5 / 18 | Header buttons, tab taglines, meta |
| Footnote | `--text-footnote` | Archivo | 400 | 13 / 18 | Legal, portrait roles, venue labels |
| Index | `--text-index` | Archivo | 400 | 11 / 14 / 0.1em | `01` `02` `03` (course tabs set `tracking-normal`) |

The hero kicker treatment (organisation name beside a 7×7 orange square) remains available as a special case of the kicker; the shipped landing currently runs no kicker in its hero at all. Inverse step numerals are a different device: serif, `text-heading-sm`, `tabular-nums`, white at 40%, in a 40px column beside the step title.

**The Square Kicker Rule.** A section kicker is IBM Plex Serif italic, ink at 55 to 65%, never tracked, never uppercase, never a pill. On white, it may be led by a 7×7 orange square (hero only). On inverse, drop the square and use white at 50 to 65%.

**The Kicker Budget.** The landing runs three kickers across eight bands, and that is the ceiling. If the heading already says what the band is, the band gets no kicker.

**The One Display Rule.** `--text-display` appears once. Section turns use `--text-heading`; quieter turns use `--text-heading-sm`. Do not scale a heading up because the section is important.

**The Index Rule (was the Mono Rule).** An index is two digits doing wayfinding, set in Archivo at `--text-index`, or as the serif numeral device on inverse steps. If an index is carrying a sentence, you have the wrong role. Never load a mono face for it.

Build vertical rhythm from relationships, not a universal stack:

- Kicker → heading: tight (about 16 to 22px in a copy column).
- Heading → first paragraph: close (10 to 22px; the landing uses `mt-2.5` under a centered courses heading, `gap-6` in the hero stack).
- Paragraph → CTA: 4px extra, then the button.
- Group → new section: the band clamps above.

Headings are sentence case. They state a claim or a reader action (`Your AI Safety career starts here.`, `The community is how SAIN works.`, `Start with a free course`, `The next decade is being decided now`). They do not name the section type (`Our mission`, `What we offer`). A proper noun may be the heading when the name is the message (`The SAIN Research Hub`).

## Color, surfaces, and boundaries

Design in navy, orange, white, and paper. Use colour when it is identity, action, or state. Pair it with a non-colour cue (underline, weight, position).

**The Two Inks Rule.** On light grounds, all text is navy at an opacity (the implementation writes `text-navy/72`, `/65`, `/74` and so on). Do not introduce grey. On inverse grounds, all text is white at an opacity. Do not introduce a second tint.

**The Orange Ink Rule.** `#FF6025` on white is 3.02:1, fine for a 26px stroke icon, not for a numeral or a label. Orange that is a **letterform on a light ground** uses `--color-orange-ink` `#C13F10` (5.27:1 on white, 4.84:1 on cream): course outline numbers, active tab indices, venue labels on light cards. Orange that is a **surface or a large glyph** stays `#FF6025` everywhere: button fills, the announcement bar, the tab underline, funnel terminus, chart accents, 26px stroke icons. On inverse, orange text is fine as `#FF6025`.

**The Orange Budget.** Orange is allowed as: the announcement field, the 7×7 kicker square, accent fill buttons, the active 3px tab underline, indices when active (as orange-ink on light), list numbers in a course outline (orange-ink), 26px stroke icons on career rows, venue labels on publication cards (orange-ink on light), the last funnel band, the last trail stop, the rising part of the trajectory illustration, the hover rule under a supervisor's name, and the A in the wordmark. It is not allowed as a background wash, a gradient, a glow, or a decorative blob.

The page is one continuous canvas with two alternate grounds (paper, inverse). Earn a surface. Prefer spacing and a 1px hairline before a box. The one boxed exception the system has earned: publication cards, which are cream objects sitting on inverse navy.

Hard reject decorative gradients, gradient text, glass cards, blobs, grid backgrounds as ornament, and coloured side rails. The hero fades from white into paper in its last 5% (`linear-gradient(in oklab …)`). That is a seam, not a sky.

Selection colour is orange on white.

## Ornament

The system now has one ornament vocabulary: **orbital linework**. Faint 1px navy circles (and, in the hero, a small four-point sparkle), continuing the geometry of the hero illustration.

- Hero: `hero-orbits.svg` top-left at 0.07 opacity (0.12 from md), masked to fade out rightward; a mirrored orbit-and-sparkle SVG bottom-right at 0.06 to 0.09.
- Sections: the `SectionOrbits` component, two concentric circles bleeding off the left edge at 0.025 opacity (0.035 from md), placed with `-z-10` inside a `relative isolate overflow-hidden` section.

Rules: ornament is navy linework only, at or below 0.12 opacity in the hero and 0.035 in sections; it bleeds off an edge rather than floating; it never sits behind body text at a strength that competes with reading; it is `aria-hidden` and `pointer-events-none`. At most one ornament per band, and not on inverse or cream bands (the landing keeps it to white grounds). Anything louder, or any second vocabulary (dots, grids, blobs, meshes), is rejected.

## Photography and diagrams

Photographs are evidence. They are people in rooms that happened: lectures, certificates, hackathons, mingling. Never stock. Never generated faces. Never illustration of "AI".

Treatments on the landing:

- **Prints.** White 8px mat (`p-2` on white), navy-tinted shadow `0 7px 22px #021C4D1F`. On the xl scatter, tilts between −5° and 5° with slight overlaps and one print scaled to 1.1 as the anchor; below xl the prints straighten to ±1.5° and square their crops in a snap scroll strip that bleeds to both screen edges (the next print showing past the edge is the affordance; there are no dots). Strip arrows are square white chips, faint at rest, shown only for fine pointers below xl. This is a table of photographs, not a gallery component.
- **Photo-backed index cells.** The chapters band keeps each chapter's own hero photograph behind its cell at 0.3 opacity, masked to fade in from the left; hover or focus-within raises it to full under a navy scrim at 0.78 while the cell's text flips to cream. The photograph is the destination previewed, not decoration.
- **Caption bar.** On a course image, a navy bar at 88% (`bg-navy/88`) with IBM Plex Serif italic kicker-sm white. `Cohort graduation · SAIN Utrecht`.
- **Multiply in the funnel (on /about).** Photo at 10 to 14% opacity, `mix-blend-mode: multiply` (luminosity on the orange terminus), slight grayscale and contrast. The photo is texture inside a diagram, not a hero crop.

Serve photographs as plain `<img>` with hand-built `srcSet`/`sizes` from the rungs `scripts/generate-responsive-images.mjs` writes (`output: "export"` ships next/image unoptimized). Give every image real `width`/`height` or an absolute fill; lazy-load below the fold.

Diagrams must encode a claim. The trajectory rises because the underlying quantity rises, and the tether is SAIN's argument that people can act on it. The funnel narrows because the path narrows. Bespoke illustrations (hero trajectory, research workbench, publication plates) are navy-and-cream linework with orange reserved for the point being made. If you find yourself drawing a network of dots "to feel like community", stop and use photographs.

## Motion

The system is quiet, not still. Motion marks arrival, state, and touch; nothing moves on its own for decoration. Every device below respects `prefers-reduced-motion` (globals collapses all animation to 0.01ms), and pointer-dependent effects are gated on `(hover: hover) and (pointer: fine)` while keyboard equivalents stay outside that gate.

Shipped vocabulary:

- **Reveal.** Sections fade up 16px over 0.5s `cubic-bezier(0.16, 1, 0.3, 1)`. The rest state is visible: the prerendered HTML hides nothing, the hero animates from pure CSS, and everything else is armed by script only while still below the fold, so no reader ever has content hidden and played back at them. Small stagger via `delay` (0.05 to 0.08s). Do not arm every block; the landing reveals bands, not paragraphs.
- **Buttons.** Hover and focus-visible lift `translateY(-2px)` plus the colour change; active presses `scale(0.98)`. 0.3s on the same bezier. The keyboard gets the lift too (it sits outside the pointer gate); reduced motion keeps colour and drops transforms.
- **Course tabs.** The 3px orange underline is a shared-layout element sliding between tabs (0.3s); panels crossfade text in only (0.2s) while the photograph cross-dissolves (0.3s linear).
- **Hover reveals.** Chapter-cell photographs rise to full opacity under the navy scrim; community prints scale their image 1.06 inside a static mat; supervisor portraits zoom 1.04 inside a still frame while an orange rule draws under the name. The frame holds; the content moves.
- **Illustration drift.** The research illustration translates ±12px against scroll via a motion value. That is the ceiling for scroll-linked movement: a drift on one illustration, never a parallax scene.
- Publication chips may marquee slowly on inverse, two rows in opposite directions, paused on hover, off under reduced motion. The rest state is static.

Forbidden: auto-playing hero video, parallax scenes, typed headlines, bounce, scroll-jacking, `window.addEventListener("scroll")`, staggered fade-up on every block, and any motion whose purpose you cannot state in one sentence.

Focus rings: 2px navy at 3px offset on light; white on orange or inverse grounds (already global).

## Icons

Phosphor (`@phosphor-icons/react`, import from `/dist/ssr`) is the icon system, across the board. Never hand-draw an SVG icon; if a glyph is missing, compose from Phosphor primitives. Shipped usage: `ArrowRight` 16 regular for onward links (at 16/regular the shaft is exactly 1px; smaller or lighter and it dissolves on fractional-DPR screens), `ArrowUpRight` 16 for external "Read paper", `CaretDown`/`CaretLeft`/`CaretRight` bold at 11 to 18 for disclosure and strip controls, `List`/`X` light 18 in the mobile toggle, and 26px `weight="light"` glyphs for offer/career rows (white at 45% on inverse; the orange 26px stroke icon remains the career-row treatment on light). One family, no coloured icon tiles.

Bespoke **illustrations** (the trajectory, the research workbench, publication plates, orbits, the funnel) are not icons. They stay hand-drawn linework, because they carry claims no icon set stocks.

## Voice

Write like the landing.

Short civic claims. Then a paragraph that names the path. Then a free CTA.

Good: `The goal is simple: help students and young professionals make a first real contribution.`

Good: `That network is not an extra. It is a central part of the organisation.`

Bad: `Empowering the next generation of AI safety leaders.`

Bad: uppercase eyebrows, `Get started`, `Unlock your potential`.

CTAs name the action and, when true, that it is free. Shipped labels: `Join the community`, `Join a free course`, `Start with a free course`, `Volunteer`, `See open positions`, `Become a supervisor`, `Read the research handbook`, `View all publications`, `View chapter`, `Read paper`, `Learn more`, `Read more`. One label per destination: the hero and the community band both say `Join the community` on purpose, so the second ask reads as the same door.

Never use an em dash anywhere in copy. Use a hyphen, a comma, or two sentences.

## Components

Buttons are square. Archivo. No shadow. No icon unless the landing uses one (onward text links carry `ArrowRight` 16). Base sizes below; remember the `#main` upsizing documented under Authorship shell.

**Accent fill** (`Join the community`, `Start with a free course`)

```
background: var(--color-accent);
color: #fff;
font: 400 14.5px/20px var(--font-sans);
padding: 14px 24px;
border: 0; border-radius: 0;
```

Hover: `background: var(--color-accent-hover)` plus the lift. On inverse, the same fill. Do not invert an accent button to navy on hover. Orange is the identity of joining.

**Ink fill** (`Join a free course` in the header)

```
background: var(--color-ink); color: #fff;
font: 400 13.5px/18px var(--font-sans);
padding: 11px 18px;
```

Hover: `background: var(--color-accent)`.

**Ghost on light** (`Volunteer` in the header)

```
transparent; color: var(--color-ink);
border: 1px solid rgb(2 28 77 / 20%);
padding: 10px 16px; font: 400 13.5px/18px var(--font-sans);
```

Hover: fill ink, text white.

**Outline ink** (`Become a supervisor`, `See open positions`)

```
border: 1px solid var(--color-ink); color: var(--color-ink);
padding: 13px 20px; font: 400 14px/20px var(--font-sans);
```

Hover: fill ink, text white.

**Ghost on inverse** (`Volunteer` in the close)

```
border: 1px solid rgb(255 255 255 / 32%); color: #fff;
padding: 14px 22px; font: 400 14px/20px var(--font-sans);
```

Hover: border to full white.

**Inline text link.** Archivo label size, underline at ink/20 to ink/25 (white/35 on inverse) with 4px offset, deepening to full on hover; `ArrowRight` 16 regular after the label when it travels onward.

**Chapter cell.** Relative isolate, `border-left: 1px solid navy/14`, padding 20px block, 18px left inset. City in IBM Plex Serif 21/26 ink; `View chapter` link row in Archivo 14/20 with the arrow. The chapter's photograph absolutely fills the cell behind the text (see Photography); the whole cell is the hit target via an `after:absolute after:inset-0` on the link.

**Course tabs.** A disclosure group, not a tablist: below md the markup interleaves header/panel pairs (one may be closed to nothing); from md the grid lifts headers into a 3-up strip over one shared panel cell, where one is always open. Headers min-height 88px, inline padding 24px; active: white ground, 3px orange underline (sliding), index in orange-ink, title serif 20/24 ink; inactive: `border-left: navy/10` between tabs, index navy/65, title navy/72, cream on hover. Arrow keys move between headers.

**Course outline row.** `border-top: 1px solid navy/10`, padding 7px block, gap 12px. Number in Archivo 12px orange-ink, 22px column. Text Archivo 14.5/20 ink.

**Quote.** IBM Plex Serif italic kicker at navy/65 for the context line. IBM Plex Serif 300 21/31 for the quote. Attribution: 1px navy/14 top rule, Archivo 500 14/20 name, IBM Plex Serif italic kicker-sm navy/65 for the role.

**Publication card (featured, on inverse).** Cream card, subgrid rows: full-width illustration plate on `navy/4` (deepening on hover), venue label footnote orange-ink, serif title-sm title underlining on hover, kicker-sm summary at navy/75, `Read paper` label with `ArrowUpRight` leaning the way it sends you.

**Publication chip (lists).** `pub-chip`: padding 14×18, gap 12px; on light, cream fill with `navy/16` border; inside `.research-publications` on inverse, white/4 fill with white/18 border. Venue Archivo 500 13/18 accent (orange-ink on light). Title IBM Plex Serif 15/20.

**Offer strip (inverse).** A `dl` under a white/15 top rule; four columns at lg with subgrid rows so descriptions start level; white/10 hairlines between; 26px light Phosphor icon at white/45; title serif 21/26 white; description kicker-sm-size sans white/75. No cards, no orange icons.

**Step list (inverse).** Serif numeral device (see Typography), 1px white/8 spine `left-[19px]` between steps, `pb-12` to `pb-16` per step, body at white/75, onward text links per component above.

**Supervisor portrait.** 140px square tile, 1px white/20 border brightening to white/50; portrait zooms 1.04 inside; serif title-sm name with the orange hover rule; footnote white/70 role. Left-aligned captions, wrapping flex row.

**Career row.** Full width, padding 18×22, gap 24px, `border-top: 1px solid navy/10`. 26px orange stroke icon (Phosphor light, 1.4-ish stroke). Do not put the icon in a coloured tile.

**Funnel (on /about).** Widths 432, 356, 292, 240, 196. Height 86. Trapezoid SVG stroke navy at about 30 to 34%. Fills navy at about 3.5 to 4.5% until the last band, which is solid accent. Origin is a 7px accent dot and an accent arrow. Terminus is a 1×10 strong-hairline stem and a 7px accent dot. Container `filter: drop-shadow(0 2px 16px #00000033)`. Labels IBM Plex Serif 16 → 13px, white on the last band.

**Trail (inverse).** 520px wide. 1px spine white at 20%. Stops alternate left and right. Cards 240×92, radius 3px, fill white/8, luminosity photo at 22%. Last card and last dot are accent.

**Nav.** No hamburger on desktop. Do not add a filled active pill.

## Published token API

Use these names. In the Next app they live in `globals.css` under `@theme` (Tailwind: `text-display`, `text-heading-sm`, `bg-navy`, `text-orange-ink`, and so on); the plain-CSS mirror is `design/sain-brand.css`. Do not invent a parallel `--sain-*` colour, and do not introduce a new hex for a role that already exists.

```css
:root {
  --color-navy: #021C4D;        /* ink, and the inverse ground */
  --color-orange: #FF6025;      /* accent surfaces and large glyphs */
  --color-orange-hover: #E65620;
  --color-orange-ink: #C13F10;  /* orange letterforms on light grounds (AA) */
  --color-cream: #F7F5F2;       /* paper ground */
  /* On-ground text is navy or white at an opacity, written inline
     (text-navy/72, text-white/75); there is no grey scale. */

  --font-serif: "IBM Plex Serif", Georgia, serif;
  --font-sans: "Archivo", system-ui, sans-serif;
  /* No mono face. */

  /* Fixed reading roles: size / line-height */
  --text-index: 11px / 14px;      /* +0.1em tracking */
  --text-footnote: 13px / 18px;
  --text-caption: 13.5px / 18px;
  --text-label: 14px / 20px;
  --text-ui: 14.5px / 20px;
  --text-kicker-sm: 15px / 20px;
  --text-body: 16.5px / 27px;
  --text-kicker: 17px / 24px;
  --text-title-sm: 19px / 24px;
  --text-title: 21px / 26px;

  /* Fluid display roles: 375px → 1280px, then hold */
  --text-heading-sm: clamp(1.5rem, 0.5vw + 1.381rem, 1.781rem);    /* 24→28.5, lh 1.14, -0.012em */
  --text-closing:    clamp(1.6875rem, 0.5vw + 1.57rem, 1.969rem);  /* 27→31.5, lh 1.1,  -0.014em */
  --text-heading:    clamp(1.781rem, 0.66vw + 1.625rem, 2.156rem); /* 28.5→34.5, lh 1.14, -0.012em */
  --text-display:    clamp(2.25rem, 1.33vw + 1.94rem, 3rem);       /* 36→48, lh 1.07, -0.02em */

  --container-page: 1440px;
  --container-copy-narrow: 620px;
  --container-copy: 720px;
  --container-copy-wide: 760px;

  --radius-none: 0px;
  --radius-hair: 3px;
}
```

Shared utilities that already exist in `globals.css`, use them instead of restating values: `shell` (gutter + 1440 cap), the `band-*` clamps, `kicker`, `btn-accent`, `btn-ink`, `btn-ghost`, `btn-outline-ink`, `btn-ghost-inverse`, `pub-chip`, `scroll-strip`. Legacy utilities (`section-container`, `heading-xl`, `card`, `btn-primary`…) exist only so unredesigned pages compile; never use them in new work.

## Page pattern (the landing)

The landing as shipped, for orientation and for what each band's ground means:

1. Announcement (conditional, orange) + sticky header
2. Hero, white fading into paper: display claim + body + one accent CTA left, trajectory illustration right
3. Local communities, cream: thin index band, kicker as the band's h2, three photo-backed chapter cells
4. Courses, white with orbit ornament: centered heading and intro, open-application line, course tabs
5. Community, white with orbit ornament: prints strip, then heading-sm + body + hairline list + accent CTA
6. Research hub, inverse navy: heading + workbench illustration, offer strip, three steps (handbook, supervisors, featured publications), closing ask with accent CTA
7. Careers, cream: heading-sm claim, paragraph, track names on one rule, quote alongside
8. Get involved, inverse: closing claim + invitation line left, accent CTA + ghost CTA right
9. Footer, inverse

The mission argument and the funnel diagram live on /about, not the landing.

On inner pages, keep the shell (announcement, header, footer) and one inverse close if there is a real action. A hero that establishes the page, then bands that each answer one question, then the close. Do not paste the funnel onto a legal page, and do not give an inner page more than one display heading.

## Responsive behaviour

Desktop is 1440. The type ramp and band clamps do the scaling continuously; there is no breakpoint where the system jumps. Below md, stack every split, gutter 24px. The prints become the snap strip; the scatter waits for xl. Course tabs interleave into disclosure rows below md. Photo cells and cities never hide. Buttons step down below 384px so no label wraps. Test at 375, 768, 1024, 1440.

## Accessibility

One `h1`. Ordered headings. Skip link (already in the layout). Native buttons and links. White on `#FF6025` is 3.02:1: acceptable for the large accent CTA and large glyphs, so keep an eye on any small type placed on orange. Orange text on light grounds is `--color-orange-ink`. Do not set kicker-tone text below 13px. Never let colour be the only sign of state: the active tab has the white fill, the underline, and the orange-ink index; the active nav item has the ink underline. Hover cues repeat on `focus-visible`; pointer-gated reveals repeat on `focus-within`. `prefers-reduced-motion` collapses everything (already global); interactive reveals still end in their readable state.

## Reject these

If you are about to ship any of the following, stop and use the landing instead:

- Inter, Geist, Geist Mono, system-ui as the display face, or Archivo Black headlines.
- Spectral (v1). Any mono face, including IBM Plex Mono (retired). Uppercase kickers (v1/v2).
- Rounded pills, 8px cards, soft grey `#f5f5f5`, or a purple/teal "AI" accent.
- A centered hero with a badge, a gradient mesh, and two buttons of equal weight.
- Icon tiles in coloured squares. Metric boxes with a big number as the section.
- All-caps overlines. Tracked eyebrows. `01 - The mission` as a kicker.
- Grey body text. Black `#000` ink. Orange-on-cream as the page ground.
- Raw `#FF6025` numerals or labels on white or cream (use `--color-orange-ink`).
- Nested cards. Glass. Glow. Gradient text. Em dashes in copy.
- Hand-drawn SVG icons, or a second icon family beside Phosphor.
- Stock photography, generated people, or abstract 3D "neural" art.
- Dark mode as the default marketing surface.
- Copy that could run on any AI startup (`Build the future`, `Join the movement` without SAIN, `Unlock`).

SAIN restraint is civic ink, one Dutch orange, a newspaper serif, and evidence in the geometry. It is not beige minimalism and it is not a lab dashboard.
