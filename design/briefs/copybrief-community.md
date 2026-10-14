# /community copy brief

One page consolidating the three chapters into a single Communities page. Route: `/community` (primary nav item "Community"). Chapter sub-pages stay at `/chapters/utrecht`, `/chapters/groningen`, `/chapters/amsterdam`. This page's job is motivation: make walking into an event this month feel easy, warm, and already underway. It does not teach what AI safety is; the site deliberately assumes field knowledge.

## Avatar

**Sanne, 23, MSc student in Utrecht.** She found SAIN through the landing page or a friend. She already knows roughly what AI safety is and does not need it explained. She is deciding one thing: whether to actually show up to something this month, alone, in a room where she knows nobody. Her private objections are "I don't know anyone there", "I don't know if I'm technical enough", and "I don't know when or where anything actually happens". She will bounce if the page reads like an org chart, if the events feel hypothetical (no dates, no photographs), or if she has to click through three chapter pages to find out what is on. She will act if she sees real rooms, real dates, and one obvious door.

A secondary reader shares the page without conflicting with her: the person whose city has no chapter. They get one clearly separated section at the end and nothing else changes for Sanne.

## Premises

In order, what the page must establish and why:

1. **The community meets constantly, and it is real.** Weekly discussion groups, courses, hackathons, talks, and the evenings after. WHY: the whole decision is "is this alive enough to be worth my evening"; evidence beats persuasion, so texture and photographs carry this, not adjectives.
2. **Showing up is the whole entry requirement.** Events are walk-in; the courses are free; no background is requested. WHY: this answers her strongest bounce reason ("am I qualified"). It is also literally true per chapter copy ("No previous background requested").
3. **There are three chapters, and they are peers.** Utrecht, Groningen, Amsterdam, each with its own character and its own page. WHY: she needs to find her city fast, and the org needs the chapters to read as one community, not three separate clubs.
4. **When and where is answerable right now.** Each chapter keeps a live Luma calendar; the only fixed dates the site owns are the course application deadlines, so those get first-class treatment. WHY: "I'll check later" is where intent dies. The page must convert intent to a date.
5. **Joining is one form, one door.** The same onboarding form as the landing, same button label. WHY: one label per destination; a second differently-worded ask reads as a new commitment.
6. **If your city is missing, you can found the chapter.** SAIN provides the kit; the founder provides the city. WHY: the page is the natural landing spot for that reader, and founding is the highest-leverage ask SAIN can make of them.

## Page plan

Six bands plus the shared shell (announcement, header, footer). One h1, one display role, two kickers total (budget respected: 2 kickers across 6 bands).

---

### 1. Hero

**(a) Question answered:** Am I on the right page, and is this thing alive?
**(b) Ground:** white (fading into paper in the last 5%, as on the landing).

**(c) Copy**

- H1 (display): `The community meets every week.`
- Subheading (body, max 620px): `SAIN runs three local chapters, in Utrecht, Groningen and Amsterdam. Discussion groups, free courses, hackathons, talks, and the evenings after. This page shows what is on and where to walk in.`
- CTA (accent fill): `Join the community` → `https://sainonboard.fillout.com/new` (opens in a new tab; keep the sr-only suffix). Same label and destination as the landing hero, on purpose.

**(d) Geometry note:** Copy column against a flexible right column inside the 1440 shell, like the landing hero. If the right column carries anything, it is a photo print or two (people in rooms), not a diagram; this page's claim is proven by photographs, not geometry. Orbit ornament allowed here (white ground only).

---

### 2. A normal month here

**(a) Question answered:** What actually happens if I show up? What does the rhythm feel like?
**(b) Ground:** white (continuous with the hero canvas, separated by a shell-width hairline like the landing's community band).

**(c) Copy**

- Heading (heading-sm): `Most weeks there is a room to sit in.`
- Body paragraph 1: `Every chapter runs a weekly discussion group: about two hours, a reading and a conversation, with at least one experienced mentor at the table. That is the baseline. You can come once, say little, and decide afterwards.`
- Body paragraph 2: `Around the weekly rhythm sit the bigger moments. This spring Groningen ran an AI control hackathon over a March weekend, hosted talks by Fatih Turkmen and Tekla Emborg, and took the stage at TEDxBroerstraat. Utrecht closed its technical course with a dinner in June and announced the winners of Win4AISafety, its open research summer challenge. Amsterdam's discussion group kept meeting through the summer, from eval methods to the AI Safety Index.`
- Body paragraph 3: `And then the evenings after: pub quizzes, intro socials at the start of the year, and graduation ceremonies when a course cohort finishes. Groningen keeps a full archive of everything back to 2023.` The words `a full archive` are an inline text link → `/chapters/groningen/events` (ArrowRight 16 after the label).
- Photo prints (this band's evidence; white 8px mats, navy-tinted shadows, snap strip below xl, tilted scatter at xl). Pull five from the real sets, with kicker-sm caption bars:
  1. `/photos/events/control-hackathon.png`, caption `AI control hackathon · SAIN Groningen`
  2. `/photos/events/tedx-broerstraat.webp`, caption `TEDxBroerstraat · SAIN Groningen`
  3. `/photos/events/utrecht/aisfundamentals-graduation-ceremony.jpeg`, caption `Course graduation · SAIN Utrecht`
  4. `/photos/events/pub-quiz.jpg`, caption `Pub quiz · SAIN Groningen`
  5. `/photos/events/utrecht/discussion-eu2031.jpeg`, caption `Europe 2031 scenario discussion · SAIN Utrecht`
  Alternates if any crop fails: `/photos/events/fatih-turkmen-talk.png`, `/photos/events/tekla-emborg-talk.jpeg`, `/photos/events/utrecht/technical-week-1.jpeg` through `technical-week-4.jpeg`, `/photos/events/utrecht/win4AISafety_congrats_the_winners.jpg`, `/photos/events/forecasting-hackathon.png`, `/photos/events/defence-hackathon.png`, `/photos/events/graduation-ceremony.jpeg`, `/photos/events/course-graduation.jpeg`, and the 29-image Groningen archive set `/photos/events/archive/archive-01` to `archive-29`. Do not reuse the landing's five `/landing/print-*.jpg` prints here; this page earns its own evidence.

**(d) Geometry note:** "Community as fact" geometry: photo prints on white mats (snap strip below xl, scatter at xl), copy column beside or below. The prints are the argument; captions do the naming.

---

### 3. Three chapters, one door each

**(a) Question answered:** Which room is mine, and where do I learn more?
**(b) Ground:** cream (a thin index band; this behaves like a directory).

**(c) Copy**

- Kicker (serif italic, navy/65, no square, doubles as the band's h2 like the landing's chapters band): `Local communities` (kicker 1 of 2).
- Three photo-backed chapter cells (left hairline, 18px inset, city name in serif title, photograph behind at 0.3 opacity rising on hover under the navy scrim). Each cell: city, two factual lines, link.

  **Utrecht**
  - Line 1: `A multidisciplinary community of 240+ members at Utrecht University and beyond.`
  - Line 2: `Runs AI Safety Fundamentals and the first ARENA-based technical track in SAIN.`
  - Link: `View chapter` → `/chapters/utrecht`
  - Cell photo: `/photos/cities/utrecht-index.webp`

  **Groningen**
  - Line 1: `Active since 2023, first as AISIG, the AI Safety Initiative Groningen. One of the most active AI safety communities in Europe.`
  - Line 2: `Members have published at venues including NeurIPS and ICLR.`
  - Link: `View chapter` → `/chapters/groningen`
  - Cell photo: `/photos/cities/groningen-index.webp`

  **Amsterdam**
  - Line 1: `A diverse community across UvA, VU Amsterdam and the city's tech ecosystem, from BSc students to working professionals.`
  - Line 2: `Supported by the ELLIS Unit Amsterdam.`
  - Link: `View chapter` → `/chapters/amsterdam`
  - Cell photo: `/photos/cities/amsterdam-index.webp`

- The chapter pages carry each city's own join links and contact grid; this page does not repeat the per-chapter email tables or Linktrees. One national door: the `Join the community` form covers all three chapters (the form asks which chapter and which activities).

**(d) Geometry note:** "Cities as peers" geometry, exactly the landing's chapter cells but with room for the second line: three photo-backed cells under an italic kicker, left hairlines, whole cell as hit target. No cards, no shadows.

---

### 4. The calendar

**(a) Question answered:** What is on, and what has a deadline?
**(b) Ground:** white, with an orbit ornament if the band wants one (white grounds only).

Honest constraint, stated for the designer: there is no machine-readable feed of upcoming events. Upcoming events exist only inside each chapter's live Luma calendar (iframe embeds). So this band presents the three Luma calendars as one experience: a 3-up tab strip (the "programme with tracks" geometry) where each tab is a city and the shared panel is that city's Luma calendar embed. The only dated items the site itself owns are the course application deadlines from `courseApplications.ts`, so they render as first-class hairline rows above the calendars, always from that file, never hand-copied into markup.

**(c) Copy**

- Kicker: `This month` (kicker 2 of 2).
- Heading (heading): `Pick a city, pick a date.`
- Intro (body): `Each chapter keeps its calendar on Luma, and the embeds below are live. Events are walk-in unless the event page says otherwise. Course applications are the one thing with a deadline.`

- **Deadline rows** (hairline rows, `border-top: navy/10`, rendered from `courseApplications.ts` so they can never go stale against the chapter pages):
  - Row: `Groningen · AI Safety, Ethics, and Society` / `Participants by 11 September · Facilitators by 10 September` / CTA `Sign up` → `https://sainonboard.fillout.com/t/4fQyZTbTCAus`
  - Row: `Utrecht · AI Safety Fundamentals` / `Participants by 18 September · Facilitators by 15 September` / CTA `Sign up` → `https://sainonboard.fillout.com/t/4fQyZTbTCAus`
  - Row: `Amsterdam · Technical AI Safety & Frontier AI Governance` / `Applications are closed. Sign ups for the next cohort will open in October.` / inline link `View chapter` → `/chapters/amsterdam`
  - Rows for chapters with `open: false` show the `closedNote`; rows with `open: true` show the two deadlines and the `Sign up` CTA. The `Sign up` label matches the chapter pages' existing label for this same Fillout form (one label per destination).
- **Calendar tabs** (3-up square disclosure tabs, active tab white with the sliding 3px orange underline; below md they interleave into disclosure rows):
  - Tab `Utrecht` → panel: Luma iframe `https://luma.com/embed/calendar/cal-2gYun0D26BriJ5z/events?lt=light`; under it an inline text link `See the full Utrecht calendar on Luma` → `https://lu.ma/sain-utrecht-events` (ArrowUpRight 16, external).
  - Tab `Groningen` → panel: Luma iframe `https://luma.com/embed/calendar/cal-jjqTmBdWcqoyEUF/events?lt=light`; link `See the full Groningen calendar on Luma` → `https://luma.com/user/SAINGroningen`.
  - Tab `Amsterdam` → panel: Luma iframe `https://luma.com/embed/calendar/cal-WD5xl5IYLpY7xNm/events?lt=light`; link `See the full Amsterdam calendar on Luma` → `https://luma.com/user/SAIN_Amsterdam`.
- Closing line under the band (caption, navy/65): `Questions about an event? Every chapter lists its events contact on its own page.`

**(d) Geometry note:** "A programme with tracks" geometry repurposed: 3-up square tabs over one shared panel cell holding the live iframe; deadline rows use the course-outline-row treatment (hairline rows, dates in Archivo, orange only on the Sign up CTA). Give the iframe a fixed generous height and its own `overflow` so the page body never scrolls horizontally.

---

### 5. Founding a chapter.

**(a) Question answered:** My city is not listed. What now?
**(b) Ground:** cream (it behaves like a programme sheet: an offer list and a step list).

**(c) Copy**

- Heading (heading-sm), exactly: `Founding a chapter.`
- Body paragraph 1: `No chapter in your city yet? The three that exist all started the same way: a few people who wanted a local AI safety community and were willing to host the first meetup. SAIN's board guides founders through the whole process, and no separate legal entity is needed; new chapters operate under the national stichting.`
- Sub-block A, label (kicker-sm, serif italic): `What SAIN provides`
  - `The SAIN brand and national recognition`
  - `Operational playbooks and handbooks`
  - `Course curriculum and facilitation guides`
  - `Google Workspace and digital infrastructure`
  - `One-on-one mentorship from experienced organisers`
  - `Outreach templates and media support`
  - `Connection to the national network`
- Sub-block B, label (kicker-sm, serif italic): `What a founder does`
  1. `Write to us about your city.`
  2. `Work through the founding process with SAIN's board.`
  3. `Set up your local channels and your chapter page on this site.`
  4. `Do the first outreach and run the first meetup.`
  5. `When you are ready, run a first course; the curriculum and guides are part of the kit.`
- CTA (outline ink): `Propose a chapter` → `mailto:info@safeainetherlands.org?subject=Starting a SAIN chapter`
- Footnote line (footnote, navy/65): `There is no form for this yet; a plain email with your city and a few lines about you is exactly right.`

**(d) Geometry note:** Two-column split on cream: the founder's offer as a hairline checklist left, the numbered founder steps right (Archivo numbers at the index role in orange-ink, as in a course outline). No cards; hairlines and the two labels organise it.

---

### 6. Close

**(a) Question answered:** So what do I do right now?
**(b) Ground:** inverse navy (the earned close: the page is asking for a decision).

**(c) Copy**

- Closing claim (closing role, left): `Nobody in these photographs knew anyone the first time either.`
- Invitation line (body, white/75): `Come to one session in the city nearest you. If you want to do more than attend, every chapter has volunteer work waiting.`
- CTA (accent fill): `Join the community` → `https://sainonboard.fillout.com/new`
- CTA (ghost on inverse): `Volunteer` → `/get-involved`

**(d) Geometry note:** "The close" geometry: inverse banner, claim left, one accent CTA and one ghost CTA right. Same labels as the landing's close so both asks read as the same doors.

---

## Facts ledger

| Fact used | Source |
|---|---|
| Three chapters: Utrecht, Groningen, Amsterdam; routes `/chapters/<city>` | design.md Site structure; inventory-community.md §1 |
| `Join the community` label + `https://sainonboard.fillout.com/new` (COMMUNITY_JOIN_URL, one shared onboarding form for all chapters; form asks chapter + activities) | inventory-community.md §1, §8; inventory-careers-courses.md §2 ("Choose the chapter and the activities you want to take part in") |
| Weekly discussion groups, ~2 hours, at least one experienced mentor, all levels | inventory-careers-courses.md §2 (Discussion Groups card); inventory-community.md §3 (Groningen: "Each group has at least one experienced mentor") |
| Courses are free; "No previous background requested" | design.md (every programme is free); inventory-community.md §2 (Utrecht course details: Audience) |
| AI Control Hackathon, Fri Mar 20 - Sun Mar 22, 2026, Groningen | inventory-community.md §4, archive item 3 |
| AI Safety Talk by Fatih Turkmen, Apr 13, 2026 | inventory-community.md §4, item 2 |
| AI Safety Talk with Tekla Emborg, Feb 11, 2026 | inventory-community.md §4, item 6 |
| TedXBroerstraat, Feb 27, 2026 | inventory-community.md §4, item 5 |
| Utrecht "Technical AI Safety - Closing Dinner", Jun 10, 2026 | inventory-community.md §5 (lumaPastEventsUtrecht.json) |
| Win4AISafety - Open Research Summer Challenge, winners announced (photo exists) | inventory-community.md §2 |
| Amsterdam discussion groups through summer 2026: "Eval Differential" (Jul 8), "Super Co-Alignment" (Jul 15), "AI Safety Index" (Aug 26) | inventory-community.md §5 (lumaPastEventsAmsterdam.json) |
| Pub quizzes, intro socials, graduation ceremonies, barbecue social exist as real event types | inventory-community.md §4 (archive items 10, 13, 22, 27; graduations items 1, 4, 8) |
| Groningen events archive back to 2023 at `/chapters/groningen/events`; 29 events; AISIG era before 30 April 2026 | inventory-community.md §4 |
| Utrecht: multidisciplinary community at Utrecht University and beyond; 240+ members; first SAIN chapter teaching from ARENA materials; runs AI Safety Fundamentals | inventory-community.md §2 (hero subhead, highlights, ARENA block) |
| Groningen: successor of AISIG (AI Safety Initiative Groningen); since 2023; "one of the most active AI Safety communities in Europe"; research published at NeurIPS and ICLR | inventory-community.md §3 (About) |
| Amsterdam: community across UvA, VU Amsterdam and the broader Amsterdam tech ecosystem; BSc students to professionals; supported by ELLIS Unit Amsterdam | inventory-community.md §6 (hero subhead, About, Partners) |
| Luma calendar embed URLs and IDs: Utrecht `cal-2gYun0D26BriJ5z`, Groningen `cal-jjqTmBdWcqoyEUF`, Amsterdam `cal-WD5xl5IYLpY7xNm`; embed pattern `https://luma.com/embed/calendar/<ID>/events?lt=light` | inventory-community.md §1, §2, §3, §6 |
| Public Luma pages: `https://lu.ma/sain-utrecht-events`, `https://luma.com/user/SAINGroningen`, `https://luma.com/user/SAIN_Amsterdam` | inventory-community.md §2, §3, §6 |
| No machine-readable upcoming-events feed; upcoming = live Luma iframe only | inventory-community.md §10 point 2 |
| Course deadlines: Groningen participants 11 September / facilitators 10 September; Utrecht participants 18 September / facilitators 15 September; Amsterdam closed, "Sign ups for the next cohort will open in October." | inventory-careers-courses.md §4 (courseApplications.ts) |
| Course names per chapter: Groningen "AI Safety, Ethics, and Society"; Utrecht "AI Safety Fundamentals"; Amsterdam "Technical AI Safety & Frontier AI Governance" (2 BlueDot courses) | inventory-community.md §2, §3, §6 |
| `Sign up` CTA + `https://sainonboard.fillout.com/t/4fQyZTbTCAus` (shared participant/facilitator form) | inventory-community.md §1; inventory-careers-courses.md §4 |
| Founding-a-chapter provisions list and get-started steps; no dedicated form; `mailto:info@safeainetherlands.org?subject=Starting a SAIN chapter` | inventory-careers-courses.md §2 (Start a Chapter section) |
| "No need for separate legal entity registration" | inventory-careers-courses.md §2 (provides checklist) |
| `Volunteer` label → `/get-involved` | design.md (header/close CTAs) |
| Photo assets named in section 2 and chapter cell photos (`/photos/events/*`, `/photos/events/utrecht/*`, `/photos/events/archive/archive-01..29`, `/photos/cities/*-index.webp`) | repo `public/photos` listing (verified on disk) |
| Landing prints set `/landing/print-rooftop|lecture|hackathon|circle|indoor.jpg` (excluded from reuse here) | `src/components/landing/CommunityPrints.tsx` |

## Open facts

- **Deadline freshness.** Today is 13 September; Groningen's deadlines (10 and 11 September) have already passed while `courseApplications.ts` still marks Groningen `open: true`, and Utrecht's facilitator deadline (15 September) is two days out. The deadline rows must render from `courseApplications.ts` at build time, and someone should update that file before this page ships. The copy above shows the current data verbatim; the page must degrade gracefully to the `closedNote` state.
- **Utrecht Luma calendar ID mismatch.** The Utrecht page embeds `cal-2gYun0D26BriJ5z` while the fetch script uses `cal-SEgERCbTEKinGaJ`. This brief uses the page's embed ID; engineering should confirm which calendar is canonical before wiring the tab.
- **Member counts** exist only for Utrecht (240+). No verified figures for Groningen or Amsterdam, so the chapter cells carry no numbers for those two rather than invented ones.
- **Founding-a-chapter form**: none exists; the CTA is the mailto that `/get-involved` already uses. If a Fillout form is ever created, swap the destination, keep the label.
- **Luma embed theming**: the `?lt=light` embeds are Luma's own UI and will not match the SAIN system; the designer should frame each iframe with SAIN's own tab and caption chrome and accept the interior as third-party.
- **Groningen "hackathons with Apart Research" and "global placement track record"** (from `/get-involved`) were not traceable to a primary source in the inventories, so they are omitted.
- **Whether events are strictly walk-in**: discussion groups and socials read as open; some events (hackathons) may require registration via Luma. The calendar intro hedges with "unless the event page says otherwise" rather than promising.

## Kill list

Patterns and copy from the current pages that must not survive on /community:

- **"Join our community"** (chapter pages) - the label is `Join the community`, one label per destination, matching the landing.
- **The displayed link text "lu.ma/bsv03bzb"** (Utrecht) - it does not match the href it decorates; never surface raw Luma slugs as copy.
- **Three equal-weight hero CTAs** (Join / Substack / Linktree on every chapter hero) - one accent CTA in the hero. Linktree links stay on chapter pages if anywhere; the Substack ask lives in the footer/newsletter surfaces, not this hero.
- **"LinkedIn engagement rate of ~9% (well above 2% benchmark)"** and "Growing team with focus on doubling to 15 members across 4 teams" - internal KPIs, not reader evidence.
- **Unexplained internal acronyms**: AISIG and AISA appear only glossed (AISIG is spelled out in the Groningen cell); BERI, Pathfinder, BlueDot, ARENA curricula internals, GRPO/PPO/RLHF stay on the chapter and course pages where they have room to be explained.
- **The per-chapter 7-role email grids** (21 mailto links) - they belong to the chapter pages and /contact, not the consolidated page.
- **Title-case CTAs and headings**: "Get Involved in {city}", "Express Interest", "Coming Soon", "Learn About Starting a Chapter" - sentence case throughout; the founding CTA here is `Propose a chapter`.
- **ChapterPlaceholder's hard-coded "Visit SAIN Groningen"** - three live chapters exist; never single out one as "the" example.
- **"one of the best ways multiply your impact"** (get-involved typo) - do not carry the sentence over; the founding section rewrites it.
- **Duplicated "upcoming vs past events" split per city on this page** - past events are evidence (section 2's photographs and the archive link), not a second calendar; only the live Luma embeds claim "upcoming".
- **The in-page pill nav (`#events / #programs / #about / #join`)** - chapter-page furniture; this page's six bands read top to bottom.
- **Dot-pattern hero backgrounds, icon tiles, "Running" status dots** - legacy utility styling; the new system uses hairlines, prints, and the tab underline.
