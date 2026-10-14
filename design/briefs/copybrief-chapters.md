# Chapter pages copy brief (/chapters/utrecht, /chapters/groningen, /chapters/amsterdam)

One template, three fact sheets. Today the three pages are three hand-grown designs; this brief replaces all three with one shared section order and shared copy patterns, filled per city. Everything true of SAIN generally (mission, national newsletter, national contacts, what a chapter is) moves off these pages to /community, /about, or /contact. A chapter page is thin and local: it answers "can I show up in this city this week, and who will be in the room".

## Avatar

**Sanne, 22, MSc student in the chapter's own city.** She heard about SAIN at an introduction week stand or from a coursemate, clicked through from /community or the landing's chapter cell, and is deciding whether to show up this week. She already knows roughly what AI safety is (the landing assumes field knowledge; this page does too), and she knows SAIN exists. She is deciding three things: is something actually on soon, is it really free and open to someone like her, and will there be real people there rather than a dead Discord. She bounces on: a wall of programme prose before a date, national boilerplate she already read on /community, four hero buttons of equal weight, an acronym soup (AISIG, BERI, ARENA, AGISF) with no gloss, or any sign the page is stale (a deadline that already passed, "coming soon" energy).

## Premises

In order, what the page must establish and why:

1. **You are in the right city, and things run here.** (Hero. She navigated by city; the first glance must confirm the city and name the concrete things that run: course, discussion groups, events, research. Otherwise she cannot tell this chapter apart from the others or from the national page.)
2. **Something is on soon, and the calendar is live.** (The Luma embed is the only truthful source of upcoming events in the codebase; the page must lean on it rather than restate it. "Live calendar" also signals the chapter is alive.)
3. **The course is real, free, and has a current application state.** (The single strongest structured offer per city. The state must be honest: open with deadlines, or closed with the reopening note. An out-of-date deadline destroys premise 2.)
4. **Real, named people run this.** (A volunteer chapter's credibility is its roster. Names and roles from the data files, nothing invented.)
5. **This already happened here.** (Photographs of rooms that happened, past event rows, and, where it exists, published research. Evidence, not promises; this is what separates a chapter from a landing page mock.)
6. **The only step is showing up, and here is the one door.** (One join channel, the shared onboarding form, asked for once in the hero and once in the close, with the same label both times so it reads as the same door.)

## CTA labels used on these pages (one label per destination, site-wide)

| Label | Destination | Style |
|---|---|---|
| Join the community | https://sainonboard.fillout.com/new | Accent fill (hero and close) |
| Apply to the free course | https://sainonboard.fillout.com/t/4fQyZTbTCAus | Accent fill (course band, only while `open === true`) |
| Volunteer | /get-involved | Ghost on inverse (close) |
| See open positions | /open-positions#chapter-{city} | Outline ink (team band, only while `isChapterRecruiting` is true) |
| Browse the events archive | /chapters/groningen/events | Outline ink (Groningen only) |
| Visit the Research hub | /research | Inline text link with ArrowRight |
| See the full calendar on Luma | per-city Luma public URL | Inline text link with ArrowUpRight (external) |
| Read paper | per-paper external URL | Inline label on publication chips (existing site label) |

"Join the community" and "Volunteer" reuse the landing's labels for the same destinations. "Apply to the free course" is new site-wide vocabulary for the shared Fillout application form (one form, all chapters); it replaces the current "Sign up" and "Register for courses". Do not add Substack or Linktree buttons; see kill list.

## Page plan (the template)

Six bands plus shell. Grounds alternate: white, cream, white, cream, white, inverse navy. One h1, one display role, one kicker on the whole page (team band). All state-dependent copy (deadlines, closed notes, recruiting) renders from `src/data/courseApplications.ts` and `src/data/openPositions.ts`, never hard-coded.

### 1. Hero

(a) Question: am I in the right city, and does anything actually run here?
(b) Ground: white, fading into paper at the seam.

(c) Copy:

- No kicker (the landing hero runs none).
- H1 (display): **SAIN {City}** (the proper noun is the message).
- Subheading (body, one to two sentences, per city below).
- CTA: **Join the community** (accent fill).
- Inline text link beside it: **See what's on this week** → #events (ArrowRight).

Per-city subheadings:

- **Utrecht:** "A free AI safety course, two discussion groups, and a growing research track at Utrecht University. Run by volunteers, open to anyone in the city."
- **Groningen:** "Free courses, hackathons, and published research, running in Groningen since 2023. It began as the AI Safety Initiative Groningen (AISIG) and continues as SAIN Groningen."
- **Amsterdam:** "Free courses and a weekly discussion group across UvA, VU Amsterdam, and the city's tech scene, supported by ELLIS Unit Amsterdam."

Amsterdam only: below the CTA row, a quiet "Supported by" lockup with the ELLIS logo (`/logos/ellis.svg`) linking to https://ivi.fnwi.uva.nl/ellis/, at footnote size. No other chapter gets a partner lockup.

(d) Geometry: the landing's split hero, copy column left; on the right, the chapter's own hero photograph as a single photo print on a white mat with a navy-tinted shadow and a kicker-sm caption bar naming the room (this is the "community as fact" print treatment standing in for an illustration; the photo is evidence the chapter exists).

### 2. Show up this week

(a) Question: when can I show up, and where do I see details?
(b) Ground: cream (this band behaves like a schedule).

(c) Copy:

- Heading (heading role): **Show up this week**
- Body (one paragraph): "Everything on the calendar is free and open. You do not need to be a member, and you do not need to have taken the course. Details and registration are on the chapter's Luma calendar below."
- The chapter's Luma calendar embed (`https://luma.com/embed/calendar/{LUMA_CALENDAR_ID}/events?lt=light`).
- Inline text link under the embed: **See the full calendar on Luma** → per-city public URL (ArrowUpRight, external).
- Footnote: "Questions about an event: {events email}" as a mailto.

(d) Geometry: a timetable pinned to the page, not a widget: the iframe sits inside a 1px navy/14 hairline frame at copy width, caption line below in kicker-sm; no card, no shadow.

### 3. The course

(a) Question: what is the course here, and can I apply right now?
(b) Ground: white, with the section orbit ornament (mirrors the landing's courses band).

(c) Copy, per city:

**Utrecht.** Heading: **Two free courses run in Utrecht**

Application state (renders from data; currently open): "Applications for the autumn cohort are open. Participants apply by 18 September; facilitators by 15 September." Then the CTA: **Apply to the free course**. One form covers both courses and both roles.

Two disclosure tabs:

Tab 1, title "AI Safety Fundamentals". Body: "AI Safety Fundamentals has run three times in Utrecht, reaching more than 100 participants: BSc and MSc students, researchers, engineers, and public-sector staff. Four weeks, one hour of reading and a one-hour lecture a week, at Utrecht University in the city centre. In week four you choose a technical or a governance path. You get a certificate for attending all sessions; no previous background is needed." Outline rows: 1 Introduction. 2 Types of risks and incidents. 3 Why AI safety is difficult. 4 Path specialisation: technical (robustness and jailbreaking, scalable oversight, alignment, evaluations, cybersecurity, agents) or governance (regulations, the EU AI Act, accountability, international actors).

Tab 2, title "Technical AI safety (ARENA)". Body: "The technical course teaches from ARENA, an open technical AI safety curriculum; SAIN Utrecht is the first SAIN chapter to teach from it. Four weeks of weekly lectures (about 90 minutes) plus hands-on notebooks, in person at Utrecht University and streamed online. Prerequisites: Python, plus linear algebra and probability. You get the certificate by completing the notebooks and attending in person." Outline rows: 1 Transformers and mechanistic interpretability (opening a model up to study what its internals compute). 2 Probing and representations. 3 PPO and RLHF (the techniques used to train models from human feedback). 4 RLHF, GRPO and reward hacking.

Footnote under both tabs: "These courses are independently run by SAIN Utrecht and are not affiliated with Utrecht University. Questions: eduutr@safeainetherlands.org."

Tail paragraph (discussion groups): "Between cohorts, two discussion groups keep meeting: one on technical AI safety, currently a mechanistic interpretability reading group, and one on AI governance and policy."

Research pointer: "The chapter is building a research track: red-teaming language models, safety evaluation, interpretability, and agent behaviour. The Research Hub launches in October 2026." Inline link: **Visit the Research hub** → /research.

**Groningen.** Heading: **One free course, two tracks**

Application state (renders from data; currently open, but see Open facts, the stored deadlines look stale): "Applications are open. Participants apply by 11 September; facilitators by 10 September." CTA: **Apply to the free course**.

Body: "We facilitate the Center for AI Safety course 'AI Safety, Ethics, and Society' in two cohorts, one technical and one governance. Six weeks per block, about two hours of reading and two hours of discussion a week, on site in Groningen, with a certificate on completion. Selection is application-based. We run three to four cohorts a year, reaching around 60 people annually." Two track columns split by a hairline: "Technical track: mechanistic interpretability, adversarial attacks, complex systems." / "Governance track: case studies and the regulatory, legal, and societal challenges of advanced AI."

Footnote: "The course is independently run by SAIN Groningen and is not affiliated with the University of Groningen. Questions: edugro@safeainetherlands.org."

Tail paragraph: "Two discussion groups meet through the year, each with at least one experienced mentor: technical AI alignment (scalable oversight, evaluation and red-teaming, preference learning, robustness, deployment risks) and AI governance and privacy (policies, regulations, accountability, transparency and fairness)."

**Amsterdam.** Heading: **Two free courses return in October**

Application state (renders from data; currently closed): "Applications are closed. Sign ups for the next cohort will open in October. Join the community and you will hear when they open." (The sentence's "Join the community" is an inline link to the onboarding form; no accent CTA while closed.)

Body: "We run two courses built on BlueDot's curriculum: Technical AI Safety and Frontier AI Governance, both on site in Amsterdam. Six weeks, about two hours of reading and two hours of discussion a week, with a certificate on completion; selection is application-based. The last iteration reached more than 70 people: students, PhDs, engineers, policymakers, and consultants. Facilitators include PhDs, risk-management consultants, and an ELLIS assistant professor."

Footnote: "The courses are independently run by SAIN Amsterdam and are not affiliated with UvA or VU. Questions: eduams@safeainetherlands.org."

Tail paragraph: "A weekly discussion group on technical AI safety reads and discusses current research; about two hours a session, guided by experienced mentors."

Research pointer: "Members also run research projects, currently including work on failure modes of multi-agent debate." Inline link: **Visit the Research hub** → /research.

(d) Geometry: a programme with tracks: the landing's disclosure tabs for Utrecht and (as two track columns on one hairline, no tabs needed) Groningen and Amsterdam; course outline rows with orange-ink numbers; details (duration, workload, venue, certificate) as a hairline definition list, never a details "card".

### 4. The team

(a) Question: who runs this, and could I be one of them?
(b) Ground: cream.

(c) Copy:

- Kicker (the page's one kicker, serif italic): *Run by volunteers*
- Heading (heading-sm): **The people you will meet**
- Body, per city:
  - **Utrecht:** "SAIN Utrecht is directed by Riccardo Campanella. The team is growing across four areas: education, events, communication, and research. The chapter's work is funded by BERI, with mentorship from Pathfinder."
  - **Groningen:** "SAIN Groningen is directed by Tarteel Mohamed, with work organised across four teams: education, research, events, and PR; a structure other chapters are adopting as they spin up. The chapter grew out of the AI Safety Initiative Groningen (AISIG), running since 2023."
  - **Amsterdam:** "SAIN Amsterdam is co-directed by Ana Paula Castillo Rodriguez and Andreea Chivu, with a team covering research, education, events, and PR. Formerly AI Safety Amsterdam (AISA), the chapter draws people from BSc students to professionals at companies like Deloitte and Shell, and from independent researchers to ELLIS assistant professors."
- Roster: real names and roles from the data files (full lists in the facts sheets below). Utrecht names link to LinkedIn (URLs exist in the page data); Groningen and Amsterdam names render unlinked until profile URLs exist.
- Recruiting line (conditional on `isChapterRecruiting`): "The chapter is recruiting. Applications are reviewed on a rolling basis, so apply whenever you are ready." CTA: **See open positions** → /open-positions#chapter-{city}.

(d) Geometry: people in a role: square portraits at 140px with serif names and sans roles where portrait photos exist; until they do, name rows on 1px hairlines sharing one left edge (never circles, never avatar placeholders).

### 5. This already happened here

(a) Question: is this chapter real, or a landing page?
(b) Ground: white.

(c) Copy, per city:

**Utrecht.** Heading: **This already happened in Utrecht**
Body: "This academic year the chapter ran the Win4AISafety open research summer challenge, a full technical course with a closing dinner, discussion groups including a Europe 2031 scenario session, and research talks, including an Anthropic researcher speaking to more than 60 people."
Prints (each with a kicker-sm caption bar):
- `/photos/events/utrecht/aisfundamentals-graduation-ceremony.jpeg`, caption "Programme graduation · SAIN Utrecht"
- `/photos/events/utrecht/win4AISafety_congrats_the_winners.jpg`, caption "Win4AISafety winners · SAIN Utrecht", with an inline link below the strip: "See the submissions on Devpost" → https://win4aisafety-sain-utrecht.devpost.com/project-gallery (ArrowUpRight)
- `/photos/events/utrecht/discussion-eu2031.jpeg`, caption "Europe 2031 scenario discussion"
- one of `/photos/events/utrecht/technical-week-1.jpeg` … `technical-week-4.jpeg`, caption "Technical course, week {n}"
Past events list: rows from `lumaPastEventsUtrecht.json`, filtered to the current academic year, date in en-GB short-month format; footnote "Recaps on LinkedIn" → https://www.linkedin.com/company/sain-utrecht/posts/. Empty state: "No past events in this list yet for the current academic year."
One publication chip: venue label "arXiv", title "Are LLM Belief Updates Consistent with Bayes' Theorem?" → https://arxiv.org/abs/2507.17951, footnote "Members of SAIN Utrecht contributed to this research." **Read paper** label.

**Groningen.** Heading: **29 events and counting**
Body: "Since October 2023 the chapter has run 29 events: hackathons, course graduations, research talks, pub quizzes, and socials; first as AISIG and, since 30 April 2026, as SAIN Groningen. Members' research has been published at venues including NeurIPS and ICLR."
Prints: three to four photographs from `/photos/events/archive/` (designer picks visually strongest; captions from the archive titles, e.g. "AI Control Hackathon · March 2026", "AI Safety, Ethics and Society graduation · April 2026").
CTA (outline ink): **Browse the events archive** → /chapters/groningen/events.
Publication chips (four):
- NeurIPS 2024 · "Steering LLMs using Conceptors" · Joris Postmus, Steven Abreu → https://jorispos.github.io/conceptor_steering/
- ICLR 2025 · "Self-Ablating Transformers" · Jeremias Ferrao → https://openreview.net/pdf?id=QcmEb490bK
- NeurIPS 2025 Spotlight · "The Anatomy of Alignment" · Jeremias Ferrao, Matthijs van der Lende, Ilija Lichkovski → https://arxiv.org/abs/2509.12934
- NeurIPS 2025 · "EU-Agent-Bench" · Ilija Lichkovski, Alexander Müller, Mariam Ibrahim, Tiwai Mhundwa → https://arxiv.org/abs/2510.21524
Inline link after the chips: **Visit the Research hub** → /research.

**Amsterdam.** Heading: **This already happened in Amsterdam**
Body: "The chapter has delivered courses to more than 70 participants, run a season of weekly discussion groups, and presented at the AI020 Conference and TEDxUniversiteit van Amsterdam."
Past events list: rows from `lumaPastEventsAmsterdam.json`, same filter, format and empty state as Utrecht.
No prints yet (no Amsterdam event photographs exist in the repo; see Open facts). The past-events rows carry the band alone until photographs exist; do not substitute stock or city skyline imagery.

(d) Geometry: community as fact: photo prints on white 8px mats with navy-tinted shadows (snap strip below xl, gentle scatter at xl); past events as hairline rows with a CaretRight; publications as pub-chips on light (cream fill, orange-ink venue).

### 6. The close

(a) Question: what do I do now?
(b) Ground: inverse navy.

(c) Copy:

- Closing claim (closing role): **Everything SAIN runs in {city} is free. The only step is showing up.**
- Invitation line (body, white/75): "Fill in the onboarding form and the chapter will find you a first session."
- CTAs: **Join the community** (accent fill) and **Volunteer** (ghost on inverse).
- Contact row (footnote, white/60, mailtos): "Events: {events email} · Courses: {edu email} · Everything else: {info email}" and, after a separator, "All {city} links" → the chapter's Linktree.

(d) Geometry: the close: inverse banner, claim left, accent CTA and ghost CTA right; contact row as a single footnote line under the banner's hairline.

## Per-city facts sheet

### Utrecht
- Route: /chapters/utrecht. Hero photo: `/photos/cities/utrecht-hero.jpg`.
- Luma calendar ID for the embed: `cal-2gYun0D26BriJ5z` (mismatch with fetch script, see Open facts). Public calendar URL: https://lu.ma/sain-utrecht-events (do not display the stale "lu.ma/bsv03bzb" text).
- Course application: OPEN. Participants 18 September, facilitators 15 September (from `courseApplications.ts`; render from data).
- Courses: AI Safety Fundamentals (3 editions run, 100+ participants, 4 weeks, Utrecht University city centre) and Technical AI safety from ARENA materials (first SAIN chapter to teach from ARENA; in person + streamed).
- Team (7, all with LinkedIn URLs in page data): Riccardo Campanella, Director; Luca "Dug" Dughera, Event Lead; Carolien Tran, Discussion Group Lead; Elena Clacova, Communication Lead; Cem Kaya, Research Operations; Dimitra Tsolka, Facilitator; Max Schaffelder, Advisor.
- Photos: graduation, Win4AISafety winners, Europe 2031 discussion, technical weeks 1-4 (paths in section 5 above).
- Research: Research Hub launch October 2026; arXiv:2507.17951 chip.
- Emails: eventsutr@, eduutr@, infoutr@ (all @safeainetherlands.org). Linktree: https://linktr.ee/sainutrecht.
- Credibility line: funded by BERI, mentorship from Pathfinder; community of 240+ members; Anthropic researcher talk with 60+ attendees.

### Groningen
- Route: /chapters/groningen. Hero photo: `/photos/cities/groningen-hero.jpg` (the hero video dies; see kill list).
- Luma calendar ID: `cal-jjqTmBdWcqoyEUF`. Public calendar URL: https://luma.com/user/SAINGroningen.
- Course application: OPEN in data, but deadlines (participants 11 September, facilitators 10 September) precede today, 13 September 2026. Confirm and update `courseApplications.ts` before shipping; render from data either way.
- Course: CAIS "AI Safety, Ethics, and Society", two cohorts (technical, governance), 6 weeks per block, 3-4 cohorts a year, ~60 people annually.
- Team (from `aisigTeam.ts`; note it is the former AISIG roster and contains Tarteel Mohamed twice, see Open facts): Tarteel Mohamed, Director; Ilija Lichkovski, Research Lead; Imaan Kanji Lalji, Public Relations Lead; Tiwai Mhundwa, Education Lead; Hanadi Al-Samarrai, Events Lead & AI Governance Facilitator; Steven Abreu, Research; Alice Dauphin, Research & Public Outreach; Guillaume Pourcel, Research; Iulia Bugan, Governance & Privacy Lead; Jeremias Ferrao, Technical Alignment Lead; Cansu Kutay and Sophia Lopotaru, AI Technical Facilitators; Nabiha Duaa, Hristo Karagyozov, Jesse Kerkhof, Events; Joris Postmus, Davide Zani, Mariam Ibrahim, Advisory Board.
- Archive: 29 events, Oct 2023 to Apr 2026, at /chapters/groningen/events; AISIG-to-SAIN cutover 30 April 2026. Photos `/photos/events/archive/archive-01` through `-29`.
- Publications: the four chips listed in section 5.
- Emails: eventsgro@, edugro@, infogro@. Linktree: https://linktr.ee/saingroningen.

### Amsterdam
- Route: /chapters/amsterdam. Hero photo: `/photos/cities/amsterdam-hero.jpg`.
- Luma calendar ID: `cal-WD5xl5IYLpY7xNm` (matches fetch script). Public calendar URL: https://luma.com/user/SAIN_Amsterdam.
- Course application: CLOSED. Closed note: "Sign ups for the next cohort will open in October." (from `courseApplications.ts`).
- Courses: two BlueDot-curriculum courses, Technical AI Safety and Frontier AI Governance, 6 weeks, on site; 70+ participants last iteration.
- Team (from `sainAmsTeam.ts`): Andreea Ioana Chivu and Ana Paula Castillo Rodriguez, Co-Directors; Satchit Chatterji, Research Operation Lead; Michele Vannucci, Research Operation (Vrije University); Prabhnoor Kohli, Education Lead; Elina Kramers, Communications Lead; Duje Vukovac, Fiona Melzer, Luan Fletcher, Monika Stewart, Discussion Group Facilitators; Henning Bartsch, Leonard Bereska, Zoe Tzifa-Kratira, Advisory Board.
- Partner: ELLIS Unit Amsterdam, logo `/logos/ellis.svg`, link https://ivi.fnwi.uva.nl/ellis/. One-line description if needed near the lockup: "Part of the European Laboratory for Learning and Intelligent Systems; ELLIS shares SAIN Amsterdam's work through its network."
- Past events: 12 rows in `lumaPastEventsAmsterdam.json`. No event photographs in the repo.
- Emails: eventsams@, eduams@, infoams@. Linktree: https://linktr.ee/sainamsterdam.

## What survives, moves, or dies, per city

**Utrecht**
- Survives: both courses with outlines and application state; the Luma embed; past-events list; 7-person team; all four photo subjects; Win4AISafety (folded into the evidence band, no longer an orphan promo section); the arXiv paper; BERI/Pathfinder credit (one footnote-weight line); 240+ members and Anthropic-talk facts (evidence-band body).
- Moves: the national Substack CTA and any "what SAIN is" framing → /community and the footer; the 7-role email grid → /contact (page keeps events, edu, info); "Where AI safety meets diverse expertise" About prose → distilled into the hero subheading and team body.
- Dies: the pill in-page nav; the hero photo-with-gradient-overlay treatment; the "lu.ma/bsv03bzb" display text; the "Sign up" label; the highlights checklist as a widget, and permanently its internal KPIs (LinkedIn engagement ~9%, "doubling to 15 members").

**Groningen**
- Survives: hero photo; the Luma embed; CAIS course with tracks and application state; discussion groups; the archive page and its "Browse the events archive" door; the four publications as chips; Tarteel Mohamed's directorship; AISIG lineage (one sentence, spelled out); the four-team structure.
- Moves: nothing national-only found beyond Substack/role-grid (same moves as Utrecht).
- Dies: the hero background video (autoplaying hero video is forbidden by the motion system); "one of the most active AI Safety communities in Europe" (unverifiable superlative, replaced by the countable claim: 29 events, NeurIPS, ICLR); "The discussion groups" eyebrow; the divergent orange-bar hiring treatment (replaced by the template's recruiting line).

**Amsterdam**
- Survives: hero photo; ELLIS lockup and partner line; the Luma embed and past-events list; both BlueDot courses with the honest closed state surfaced in the course band heading; the discussion group; the team; AI020 and TEDxUvA facts; Deloitte/Shell diversity clause.
- Moves: same as above (Substack, role grid).
- Dies: the disappearing hero "Register for courses" CTA (the hero never carries the course CTA; the course band carries the state); the lone "Investigating failure modes of Multi-Agent Debate" card with no description (becomes one sentence in the research pointer); the second About restatement of the community.

**Shared kills across all three:** see Kill list.

## Facts ledger

| Fact | Source |
|---|---|
| Join form https://sainonboard.fillout.com/new; course form https://sainonboard.fillout.com/t/4fQyZTbTCAus | inventory-community.md §1; src/data/courseApplications.ts |
| Application states and deadlines (Utrecht open 18/15 Sept; Groningen open 11/10 Sept; Amsterdam closed, October note) | src/data/courseApplications.ts |
| Luma calendar IDs and public URLs, all three cities | inventory-community.md §2, §3, §6 |
| Utrecht course facts (3 editions, 100+, 4 weeks, venue, certificate, outlines, ARENA, prerequisites) | inventory-community.md §2 |
| Utrecht team of 7 with roles and LinkedIn URLs | inventory-community.md §2 |
| Utrecht photos and Win4AISafety Devpost URL | inventory-community.md §2 |
| Utrecht research (hub launch Oct 2026; arXiv:2507.17951) | inventory-community.md §2 |
| BERI funding, Pathfinder mentorship, 240+ members, Anthropic talk 60+ | inventory-community.md §2 (highlights) |
| Groningen course facts (CAIS course, 6 weeks, 3-4 cohorts, ~60/yr, tracks, mentors) | inventory-community.md §3 |
| Groningen 4 publications with venues, authors, URLs | inventory-community.md §3 |
| AISIG lineage, since 2023, four-team structure, Tarteel Mohamed director | inventory-community.md §3 |
| Archive: 29 events Oct 2023-Apr 2026; cutover 30 April 2026; photo paths | inventory-community.md §4 |
| Groningen roster | src/data/aisigTeam.ts |
| Amsterdam course facts (BlueDot, two courses, 6 weeks, 70+, facilitator mix) | inventory-community.md §6 |
| Amsterdam roster | src/data/sainAmsTeam.ts |
| ELLIS lockup, URL, description; AI020; TEDxUvA; Deloitte/Shell | inventory-community.md §6 |
| Chapter role emails, Linktrees, Substack URL | inventory-community.md §1-§3, §6, §8 |
| Recruiting phrase "on a rolling basis" and /open-positions anchors | inventory-community.md §1 |
| Past-events JSON shapes, academic-year filter, en-GB date format | inventory-community.md §1, §5 |

## Open facts

- **Groningen deadlines look stale.** `courseApplications.ts` says open with deadlines of 10 and 11 September; today is 13 September 2026. Confirm with the chapter and update the data file; the page copy must render from the file either way.
- **Utrecht Luma calendar ID mismatch.** Page embed uses `cal-2gYun0D26BriJ5z`; the fetch script uses `cal-SEgERCbTEKinGaJ`. Resolve with the Utrecht Luma owner before shipping; the template uses one ID for both embed and past-events fetch.
- **Team portrait photographs.** None inventoried for any chapter. The template's portrait treatment waits for real photographs; ship name rows until then.
- **Amsterdam event photographs.** None in the repo; the evidence band runs on past-event rows and named venues (AI020, TEDxUvA) until photographs arrive.
- **Groningen roster currency.** `aisigTeam.ts` is described as the former AISIG site's roster and lists Tarteel Mohamed twice with different titles. Confirm the current roster and de-duplicate.
- **Groningen/Amsterdam team profile links.** Only Utrecht has LinkedIn URLs; the others render unlinked names until URLs are supplied.
- **Full names of BERI and Pathfinder.** The inventory carries only the short names; do not expand the acronyms until verified.
- **Discussion group days, times, and rooms.** Not in the repo for any city (Amsterdam has "weekly, ~2 hours" only). The copy points to the Luma calendar instead of naming a weekday.
- **Landing "Join the community" destination.** Assumed to be the same onboarding form; verify in `src/components/landing/*` before implementation so the one-label-one-destination rule holds.
- **Utrecht past-events JSON mixes Luma and LinkedIn URLs.** Acceptable for now (rows link wherever the recap lives), but confirm it is intentional and add a code comment.

## Kill list

Must not survive on any chapter page:

- The in-page pill nav (#events / #programs / #about / #join). Six bands in a fixed order replace it.
- Hero photo-with-navy-gradient-overlay and the "SAIN / {City}" breadcrumb. The system hero is a white split with a photo print.
- The Groningen hero background video (autoplaying hero video is on the design system's forbidden list).
- Three-to-four hero buttons of equal weight. One accent CTA in the hero.
- "Join our community" (becomes the site label "Join the community"); "Sign up" and "Register for courses" (become "Apply to the free course"); "See open roles" (becomes "See open positions").
- "National newsletter (Substack)" and "All {city} links (Linktree)" as buttons. Substack moves to /community and the footer; Linktree survives only as a footnote link in the close.
- The "Chapter highlights" checklist widget, and permanently: "LinkedIn engagement rate of ~9% (well above 2% benchmark)" and "Growing team with focus on doubling to 15 members across 4 teams" (internal KPIs, not reader evidence).
- "One of the most active AI Safety communities in Europe" (unverifiable superlative; the countable record replaces it).
- The GraduationCap recruiting banner card and Groningen's divergent orange bar (one recruiting sentence plus "See open positions" in the team band, same treatment in all cities).
- The 7-role email grid on every chapter page (three local inboxes stay; cm/research/substack/pr roles move to /contact).
- Unglossed internal jargon on first use: AISIG, AISA, ARENA, BlueDot, AGISF (AGISF disappears entirely; the others get the one-line glosses written above).
- Duplicate "Courses" eyebrows and the "The discussion groups" label; section headings state claims, never section types ("What we run in Utrecht", "Join & contact", "Past & upcoming events" all die).
- Amsterdam's conditional hero course CTA that silently disappears when applications close.
- Amsterdam's one-line "Multi-Agent Debate" project card (a card with no content; becomes a sentence).
- The stale "lu.ma/bsv03bzb" display text on Utrecht.
- ChapterPlaceholder's hard-coded "Visit SAIN Groningen" close (if the placeholder is kept for future cities, it must point to /community, and its "Get Involved in {city}" / "Learn About Starting a Chapter" title-case labels must be re-set in sentence case).
- Archive-page event blurbs left in future tense ("Join us...", "Looking forward to...") presented as historical record; out of this brief's template scope but flagged for the archive page's own pass.
- Any em dash or en dash in copy; hyphens, commas, or two sentences instead.
