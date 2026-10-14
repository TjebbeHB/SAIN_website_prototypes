# Courses and Volunteer copy brief

Two slim pages, one brief. Page A is `/courses` (new; the header's ink-fill button `Join a free course` lands here). Page B is `/get-involved`, which becomes the volunteer page (the header's ghost button `Volunteer` lands here). The courses content currently on `/get-involved` moves to `/courses`; the start-a-chapter content moves to `/community`.

Shared rules for both pages: British spelling, sentence case headings, no em dashes or en dashes anywhere (hyphens, commas, or two sentences), one h1 per page, one CTA label per destination site-wide, the landing's labels reused for the same destinations (`Join the community`, `Start with a free course`, `Volunteer`, `See open positions`).

---

# PAGE A: /courses copy brief

## Avatar

**Femke, 22, MSc student in Utrecht.** She saw the landing's courses section (or a friend forwarded the popup) and clicked `Join a free course` in the header. She already accepts that AI safety is worth her time; do not re-pitch it. She knows the three track names from the landing tabs. What she is deciding: *which track, which city, and whether she can still make the deadline.* She will bounce if the page re-explains AI safety, if she cannot find her city's deadline in one scroll, or if the track names or claims differ from what the landing just told her.

## Premises

1. **You are on the joining page.** The header button said "Join a free course"; the h1 must say the same thing, so there is zero doubt she landed right. WHY: the landing's `#courses` section stays canonical for browsing; this page exists to convert, and a browsing-flavoured hero would make it a duplicate.
2. **Everything here is free and in person.** WHY: it is the top-priority supplied fact (design.md priority order, item 1) and the reason the ask is small.
3. **There are three tracks, the same three the landing showed.** WHY: consistency between the landing tabs and this page is the trust signal; any drift reads as two organisations.
4. **What you join, and how it runs, depends on the chapter.** WHY: the honest structure (ARENA in Utrecht, CAIS-based in Groningen, BlueDot in Amsterdam, different lengths) prevents the false "one uniform 6-week course" story that the old /get-involved card told.
5. **These chapters are open right now, with these deadlines.** WHY: this is the conversion moment; it must render from `courseApplications.ts`, never from hardcoded copy, so open here always equals open on the chapter page.
6. **Applying is small, and there is a path if you are not ready.** WHY: comms principles say end every section with what the reader should do; the not-ready reader gets `Join the community` instead of nothing.

## Page plan

### A1. Hero

(a) Question: am I in the right place to actually join?
(b) Ground: white, fading into paper in the last 5% (the landing's seam).
(c) Copy:

- **H1 (display):** `Join a free course`
- **Subheading (body, max 620px):** `Every programme is free and taught in person. Pick a track, pick your city, and apply. What you join, and how it runs, depends on the chapter.`
- **Live line (caption, rendered only while `openCourseApplications.length > 0`, city list from `formatCityList(openCourseApplications)`):** `You can apply now in Groningen or Utrecht.`
- **CTA (accent):** `Apply in your city` → `#apply`

(d) Geometry: copy column against open space; no illustration needed on a conversion page this slim. At most one orbit ornament bleeding off an edge; nothing behind the text.

### A2. The three tracks

(a) Question: which track is mine?
(b) Ground: white (this is the landing's courses chapter, same ground, optional `SectionOrbits`).
(c) Copy:

- **Heading (heading role):** `Pick a track`
- **Intro (body, centred, max 640px):** `Three tracks, the same ones on every chapter's calendar. Each panel names what runs in each city.`
- **Component: reuse `CourseTabs` as-is.** Track names, taglines, summaries, outlines, city rows, photos and captions are already canonical and must not be rewritten here. For reference, the three headers are:
  - `01 AI Safety Fundamentals` - tagline `First principles. Drop in any week.`
  - `02 Technical Alignment` - tagline `ARENA, CAIS or BlueDot, by city.`
  - `03 Governance & Policy` - tagline `Course or discussion group, by city.`
- **One "who it suits" line under each tab header or in each panel (new copy, traceable to the existing summaries):**
  - Fundamentals: `For newcomers. Taught so you can drop in for any theme, no background needed.`
  - Technical Alignment: `For people who want to build: interpretability, RLHF, and the alignment pipeline, hands-on.`
  - Governance & Policy: `For people headed toward policy: the EU AI Act, audits, and Dutch implementation.`
- City rows keep linking to `courseApplicationFor(city).href` (the `/chapters/{city}#programs` anchors) so routing stays synced to `courseApplications.ts`.

(d) Geometry: a programme with tracks, so the 3-up square disclosure tabs with the sliding 3px orange underline; do not rebuild it, mount the shared component.

### A3. How cohorts run

(a) Question: what does joining actually cost me, in time and format?
(b) Ground: cream (this behaves like a schedule; paper is the printed programme).
(c) Copy:

- **Heading (heading-sm):** `How cohorts run`
- **List (course-outline rows or hairline list, each item one row):**
  1. `Cohorts run per chapter. Groningen and Amsterdam teach in six-week blocks, three to four times a year. Utrecht's ARENA block runs four weeks.`
  2. `The six-week courses pair weekly readings with an on-site discussion session.`
  3. `AI Safety Fundamentals in Utrecht is weekly and modular. Drop in for any theme, about 60 minutes.`
  4. `Some programmes are application-based and close per cohort. The Amsterdam BlueDot tracks are an example.`
  5. `One form covers participants and facilitators. Facilitator deadlines close a few days earlier.`
- **Closing line (body):** `Not sure which chapter fits? Each city's page lists its own programmes in detail.` with inline text links `Utrecht`, `Groningen`, `Amsterdam` → `/chapters/utrecht`, `/chapters/groningen`, `/chapters/amsterdam` (ArrowRight 16 on each).

(d) Geometry: a thin index band; hairline rows, not cards; numbered rows may use orange-ink numerals per the course-outline row component.

### A4. Apply, the close

(a) Question: is my city open, what is the deadline, and where do I click?
(b) Ground: inverse navy. This is the page's one earned inverse band: it asks for the decision.
(c) Copy:

- Anchor: `id="apply"`.
- **Heading (closing role):** `Apply in your city`
- **Line under the heading (body, white/78):** `Applications open and close per chapter. This list is live: open here means open on the chapter's page.`
- **Three chapter rows, rendered from `courseApplications.ts` (never hardcoded):**
  - **Groningen** - state line: `Applications open.` deadline line: `Apply by 11 September (10 September to facilitate).` CTA (accent): `Apply in Groningen` → `/chapters/groningen#programs`
  - **Utrecht** - state line: `Applications open.` deadline line: `Apply by 18 September (15 September to facilitate).` CTA (accent): `Apply in Utrecht` → `/chapters/utrecht#programs`
  - **Amsterdam** - state line: `Applications closed.` note (the `closedNote` field, verbatim): `Sign ups for the next cohort will open in October.` Inline text link: `View chapter` → `/chapters/amsterdam`
  - Implementation note: when a chapter's `open` flips, its row flips with it; when all close, the band swaps its rows for the single line `Applications are currently closed. Sign ups for the next cohort will open soon.` (adapted from the existing closed-state copy) plus the ghost CTA below.
- **What happens after (kicker-sm or body, one short block under the rows):** `Your chapter's page walks you through its form. Questions before you apply are welcome.` CTA (inline text link): `Or get in touch first` → `/contact`
- **Ghost CTA (inverse), for the not-ready reader:** `Join the community` → `https://sainonboard.fillout.com/new`

(d) Geometry: the close, as a banner variant: claim left, actions right; the chapter rows sit as hairline-separated peers (white/10 rules), orange reserved for the open chapters' apply buttons. Only one accent CTA per open chapter, nothing else orange in the band.

---

# PAGE B: /get-involved copy brief (the volunteer page)

## Avatar

**Daan, 26, works in Amsterdam, has evenings free.** He clicked the ghost `Volunteer` button, or the landing close's `Volunteer`. He is not (yet) applying for a course; he wants to give time and skills and get something real back: experience, people, a track record. He may or may not have deep AI-safety knowledge. What he is deciding: *is there work here I could actually do, how many hours, and what do I get out of it?* He will bounce if the page reads like a donations appeal, if the roles are vague ("help out!"), or if the path in looks bureaucratic.

## Premises

1. **SAIN runs on volunteers, and that is why everything is free.** WHY: it converts "volunteering" from charity into the mechanism that makes the whole offer work; every scale claim carries its mechanism.
2. **The work is concrete: six kinds of it, with real hours.** WHY: named teams with hour ranges make the ask evaluable in one scan; vagueness is the bounce trigger.
3. **Volunteering pays back in experience, network, and a track record.** WHY: comms principles say frame the field as good work worth doing, not only duty; this is the careers-adjacent motivation, evidenced by the one real quote we have.
4. **The path in is one short form and a rolling review.** WHY: the reader must leave knowing the exact next step and roughly when they will hear back.
5. **Founding a chapter is a different path, and it lives on /community.** WHY: one avatar per page; the founder reader gets pointed onward, not a duplicated section.

## Page plan

### B1. Hero

(a) Question: is this where I offer my time?
(b) Ground: white fading into paper.
(c) Copy:

- **H1 (display):** `SAIN runs on volunteers`
- **Subheading (body, max 620px):** `Every programme is free because people give a few hours a week to run it. Our chapters in Amsterdam, Utrecht, and Groningen are powered by people who care about the development and integration of AI going well in the Netherlands and abroad. This page is the work, what you get from it, and the way in.`
- **CTA (accent):** `See open positions` → `/open-positions`

(d) Geometry: copy column against open space; if any image is used it must be a real photograph of volunteers in a room that happened (a community print), never illustration of "AI".

### B2. The kinds of work

(a) Question: what would I actually do?
(b) Ground: white.
(c) Copy:

- **Kicker (serif italic, the page's one kicker):** `The work`
- **Heading (heading role):** `Six teams, three to ten hours a week`
- **Intro (body):** `Every chapter runs the same teams. Leads carry a team and report to the chapter's director; team members carry a slice of it. Most roles are three to five hours a week, leads six to ten.`
- **Six rows (career-row geometry, 26px orange stroke Phosphor icon per row, title serif 21/26, description sans):**
  1. **Education** - `Run course cohorts and discussion groups. Facilitate weekly sessions, support participants, and keep quality high across iterations.` - `3 to 10 hours a week`
  2. **Events** - `Plan and deliver the chapter's calendar. Hackathons, expert talks, socials, and the logistics behind them.` - `3 to 10 hours a week`
  3. **Communications** - `Writing, design, photography, video and the website. Make the chapter's work visible and on-brand.` - `3 to 10 hours a week`
  4. **Community** - `Welcome new members, be the first point of contact, and help people find their way into deeper involvement.` - `4 to 6 hours a week`
  5. **Outreach** - `Be SAIN's face on campus. Tabling, flyers, and inviting students to upcoming events.` - `3 to 5 hours a week`
  6. **Research operations** - `Keep the Research Hub running day to day. Onboard researchers and supervisors, track projects, and unblock problems.` - `2 to 8 hours a week`
- **Row for the exception (footnote under the list, not a seventh row):** `SAIN also hires a small number of paid national staff when a role needs it. Those roles are listed with the open positions.` (Currently: the Research Operations Lead.)
- **CTA under the list (outline ink):** `See open positions` → `/open-positions`

(d) Geometry: people in a role, so career rows on 1px navy/10 top rules with the orange 26px stroke icon; no icon tiles, no cards.

### B3. What a volunteer gets

(a) Question: what do I get back for those hours?
(b) Ground: cream.
(c) Copy, split layout with the quote alongside (the landing's careers band geometry):

- **Heading (heading-sm):** `You leave with work you can point to`
- **Body:** `Volunteer roles at SAIN carry real ownership early. Leads report straight to chapter directors, and team members run cohorts, events and channels that actually happen. You work alongside people across Utrecht, Groningen and Amsterdam who are moving into the field themselves, and many of the introductions that matter later start here.`
- **Hairline list (three items, navy hairline dashes, not orange dots):**
  - `Experience with real responsibility, not shadowing`
  - `A network across three chapter cities`
  - `A track record in the field: cohorts taught, events run, work published`
- **Quote (alongside, quote component):**
  - Context line (kicker): `Internship · Existential Risk Observatory`
  - Quote (serif 300): `"Without this community I almost certainly wouldn't be where I am."`
  - Attribution: `Stefano Zuffi`, role line: `Mapping research on AI alignment techniques and government interventions`

(d) Geometry: heading-sm claim plus paragraph left, the quote alongside on the split, exactly as the landing's careers band; the quote is the evidence, so no second photo.

### B4. The path in

(a) Question: how do I start, and when do I hear back?
(b) Ground: white.
(c) Copy:

- **Heading (heading-sm):** `One short application, reviewed as it arrives`
- **Intro (body):** `All chapter applications go through the same short form: name, CV, and a one-page motivation letter. Applications are reviewed on a rolling basis, so apply whenever you are ready.`
- **Numbered steps (four, condensed from the site's application timeline):**
  1. `Apply. Pick the chapter and the role, attach your CV, and write a short motivation letter. One page is plenty.`
  2. `Hear back. We read applications as they arrive. First response within 2 to 3 weeks.`
  3. `Talk. A 30 to 45 minute call about the role, your motivation, and a small task or scenario relevant to the team.`
  4. `Start. If that goes well, onboarding begins with the next cycle, and joining at other dates is possible.`
- **Open-application line (body, after the steps):** `No role that fits? Apply anyway. Tell us what you want to do in your motivation letter, and we will figure out together what works well for you.`
- **CTA (accent):** `See open positions` → `/open-positions`
- **Secondary (inline text link):** `Or get in touch first` → `/contact`

(d) Geometry: a stepped journey; on a light ground use numbered outline rows (orange-ink numerals) rather than the inverse serif-numeral device, since this band is white.

### B5. Founders, pointed onward

(a) Question: I want SAIN in my city, is that here?
(b) Ground: cream, thin index band.
(c) Copy:

- **Heading (title role, quiet):** `Want SAIN in your city?`
- **Body (one sentence):** `Founding a chapter is its own path, with its own playbooks and mentorship, and it lives with the community.`
- **CTA (inline text link with ArrowRight):** `Learn more` → the "Founding a chapter." section on `/community` (use the anchor id the /community implementation defines; if that page keeps the legacy id, `/community#start-chapter`).

(d) Geometry: a thin index band, kicker-weight, one rule, one link; this must read as a signpost, not a section competing with the volunteer story.

### B6. The close

(a) Question: so do I do this?
(b) Ground: inverse navy.
(c) Copy:

- **Heading (closing role):** `Every free programme has volunteers behind it`
- **Line (body, white/78):** `A few hours a week, a team in your city, and applications reviewed on a rolling basis. The next cohort of courses, events and research support gets run by whoever joins now.`
- **CTA (accent):** `See open positions` → `/open-positions`
- **CTA (ghost inverse):** `Or get in touch first` → `/contact`

(d) Geometry: the close as a banner, claim left, the two ways to act right; no kicker, no third element.

## Anchor and link migration (must ship with these pages)

`/get-involved#courses` and `/get-involved#start-chapter` are linked from elsewhere. Update in the same change:

| File and line | Current | New |
|---|---|---|
| `src/components/Navbar.tsx:37` (nav data) | `/get-involved#courses` | `/courses` |
| `src/components/Navbar.tsx:239` (header ink button) | `/get-involved#courses` | `/courses` |
| `src/components/Navbar.tsx:347` (mobile sheet) | `/get-involved#courses` | `/courses` |
| `src/components/Navbar.tsx:27` | `/get-involved#start-chapter` | the /community founding-a-chapter anchor |
| `src/components/Footer.tsx:24` (Courses) | `/get-involved#courses` | `/courses` |
| `src/components/Footer.tsx:25` (Discussion groups) | `/get-involved#discussion-groups` | `/community` (coordinate the exact anchor with the community brief; this content no longer lives on /get-involved) |
| `src/components/Footer.tsx:26` (Events) | `/get-involved#events` | `/community` (same coordination) |
| `src/components/ChapterPlaceholder.tsx:127` | `/get-involved#start-chapter` | the /community founding-a-chapter anchor |
| `src/app/about/page.tsx:452` | `/get-involved#start-chapter` | the /community founding-a-chapter anchor |
| `src/app/open-positions/page.tsx` ("Browse ways to get involved" → `/get-involved`) | keep destination; relabel to `Volunteer` so the site keeps one label per destination | |

Also: the landing close's `Volunteer` → `/get-involved` already points at the right page and needs no change. `CoursePopup` routes to chapter `#programs` anchors and is unaffected.

## Facts ledger

| Fact | Source |
|---|---|
| Header buttons: `Join a free course` → /courses (ink), `Volunteer` → /get-involved (ghost); site structure and routes | `design/design.md` (Site structure) |
| Every programme is free and taught in person; "What you join, and how it runs, depends on the chapter."; open-application line rendered from `openCourseApplications` + `formatCityList` | `src/app/page.tsx` (courses section) |
| Track names, taglines, summaries, outlines, city rows, photo captions; Utrecht ARENA 4 weeks; Groningen CAIS-based 6 weeks, 3-4 cohorts a year; Amsterdam BlueDot 6 weeks, on-site, application-based; Fundamentals weekly, modular, ~60 min, "taught so newcomers can drop in" | `src/components/landing/CourseTabs.tsx` via inventory-careers-courses.md §5 |
| Six-week blocks with weekly readings and on-site discussion sessions | `src/app/get-involved/page.tsx` courses card via inventory §2 |
| Groningen open, apply by 11 September (10 September to facilitate); Utrecht open, apply by 18 September (15 September to facilitate); Amsterdam closed, "Sign ups for the next cohort will open in October."; per-chapter `#programs` hrefs; shared Fillout form covers participants and facilitators | `src/data/courseApplications.ts` via inventory §4 |
| "Applications are currently closed but sign ups for the next cohort will re-open soon." (all-closed state, adapted) | `src/app/get-involved/page.tsx` via inventory §2 |
| Community join URL `https://sainonboard.fillout.com/new`; label `Join the community` | `src/data/siteContact.ts` + landing |
| "Our chapters in Amsterdam, Utrecht, and Groningen are powered by people who care about the development and integration of AI going well in the Netherlands and abroad." | `src/app/open-positions/page.tsx` hero via inventory §1 |
| Teams and hour ranges: Education lead 6-10, facilitator ~4, discussion lead ~3; Events lead 6-10, member 3-5; Communications lead 6-10, member 3-5; Community Manager 4-6; On-Campus Ambassador 3-5; Research Operations 2-8; leads report to Chapter (Co-)Director | `src/data/openPositions.ts` role catalogue via inventory §1 |
| Team mission one-liners (rows B2.1-6) | condensed from `src/data/openPositions.ts` mission fields, lines 185-643 |
| Paid national staff exception (Research Operations Lead, paid, full-time, national) | `src/data/openPositions.ts` via inventory §1 |
| Application form fields (name, CV, short motivation letter, one page is plenty); rolling review sentence; first response within 2 to 3 weeks; 30-45 min trial conversation with a small task or scenario; onboarding cycle, joining at other dates possible | `APPLICATION_REVIEW` + `APPLICATION_TIMELINE` + how-to-apply copy, `src/app/open-positions/page.tsx` via inventory §1 |
| "We highly recommend applying regardless... we'll figure out together what works well for you." (open-application card, adapted) | `src/app/open-positions/page.tsx` via inventory §1 |
| Stefano Zuffi quote, context and role lines | `src/app/page.tsx` careers blockquote |
| "Most people who end up working on AI Safety did not plan for it." (backdrop for B3) | `src/app/page.tsx` careers section |
| Founding support exists (playbooks, mentorship) | `src/app/get-involved/page.tsx` start-chapter checklist via inventory §2 |
| Anchor link locations | grep of `src` (Navbar 27/37/239/347, Footer 24-26, ChapterPlaceholder 127, about 452) |
| CTA labels reused: `Join the community`, `See open positions`, `Learn more`, `View chapter`, `Or get in touch first` | `design/design.md` Voice + `src/app/open-positions/page.tsx` |

## Open facts

- **Groningen's deadline has passed.** Today is 13 September 2026; `courseApplications.ts` still says open with an 11 September deadline. Engineering or content must update the data before /courses ships; the page design assumes it renders live state and will be correct once the data is.
- **Certificates.** The old /get-involved card claims "Certificate upon completion" and Utrecht ARENA mentions a "notebook certificate". Not verified as a blanket claim across all tracks, so the brief omits it. If confirmed per track, it belongs in A3's list.
- **"2h readings + 2h discussion per week"** (old card): conflicts with the per-track structure in CourseTabs; omitted. Confirm per programme before reintroducing hard hour counts.
- **What happens after a course application** (confirmation email, cohort start dates, selection criteria): not documented anywhere in the repo. A4 stays thin on purpose; add a real timeline only when one exists.
- **The /community founding-a-chapter anchor id**: owned by the community brief; B5 and the four `#start-chapter` links need the final id.
- **Whether the shared Google Form's email routing and pre-fill wiring is live** (stale code comments in `openPositions.ts`): confirm with engineering before B4's promise "first response within 2 to 3 weeks" ships; the promise is only as good as the inbox behind it.
- **The Fundamentals "more than 100 students" stat** stays in `CourseTabs` (canonical); if the component is touched, re-verify the number first.

## Kill list

Copy and patterns from the current `/get-involved` (and the old course story) that must NOT survive:

- **The one-course fiction:** "a curriculum based on the Center for AI Safety course in two tracks: Technical and Governance... 6-week blocks" as a uniform description. The landing's three-track, per-city story is canonical.
- **"Sign up" as a CTA label** going straight to the Fillout form, bypassing the chapter pages. One clickpath: chapter `#programs` anchors, as `CoursePopup` and `CourseTabs` already do.
- **Hero copy "Whether you're a researcher, student, policymaker, or concerned citizen, AI Safety needs diverse perspectives. Join us in building a safer future with AI."** Generic-nonprofit register; "building a safer future" could run on any AI startup.
- **"one of the best ways multiply your impact"** (typo and EA-internal "multiply your impact" framing).
- **Eyebrows "Get Involved", "What We Do", "Join the team", "Start a Chapter", "Stay Updated"** in tracked-uppercase style, and any heading that names the section type ("Activities across our chapters").
- **The status-dot city grid** (green/red dots): on /courses the live states are written out as rows with deadlines and notes; a red dot with no explanation is exactly the pattern that hid Amsterdam's October reopening.
- **The dead Donate section** (`{false && ...}`): do not resurrect on either page; delete or leave to a separate decision.
- **Duplicated Research Hub and start-a-chapter sections** on the volunteer page: each gets one signpost at most (B5 for chapters; research operations appears only as a volunteer team row, with /research reachable via nav).
- **"Express Interest"** as a CTA label (title case, vague); the founders pointer uses `Learn more`.
- **Any restating of the AI-safety pitch on /courses**: no stakes paragraph, no mission recap; the reader arrived converted.
- **Em dashes and en dashes** in any inherited copy (several current strings use them); rewrite with hyphens, commas, or two sentences.
- **Internal shorthand surfacing:** "Chapter (Co-)Director" org-chart phrasing in reader-facing copy (write "the chapter's director"); role-email prefixes like `edugro@` presented without their plain-language label.
