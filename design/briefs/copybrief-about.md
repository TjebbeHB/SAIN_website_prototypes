# About copy brief

Page: `/about`. One h1. One display role. British spelling throughout. No em dashes, no en-dash separators, hyphens only. All headings sentence case; they state claims or reader actions, never section types. Kickers are IBM Plex Serif italic, never uppercase. Reused CTA labels: `Start with a free course` (/courses), `Join the community` (/community), `Volunteer` (/get-involved).

## Avatar

**Hanneke, 48, senior policy officer at a Dutch ministry.** A colleague mentioned SAIN after an AI-governance workshop; she opens /about to decide one thing: is this a serious institutional counterpart worth a meeting, a recommendation, or a referral of a junior colleague? (She stands in for the whole outsider class: a student's parent checking whether the free course is legitimate, a potential donor, a university partner.) She knows the EU AI Act exists and that AI policy is understaffed; she does not know AI-safety field vocabulary ("alignment", "MATS", "field-building") and must never hit it undefined. She will bounce on: startup hype, doom aesthetics or robot imagery, race framing ("the Netherlands can't fall behind"), student-club informality, internal jargon (Google Workspace, playbooks, fiscal sponsorship unexplained), and any statistic or superlative she cannot see the source of. She will stay for: a clear mission, named humans with real affiliations, real dates, published documents, and honest statements of what SAIN does not do.

## Premises

In order. Each must land before the next can.

1. **SAIN has one clear mission, stated plainly.** Why: the page exists to establish identity in one glance; an outsider who cannot repeat the mission after the first viewport will not carry SAIN into a meeting.
2. **The harms are real, ranged, and stated with mechanism, not volume.** Why: per comms principles, a bare scale claim gets misread as either hype or a race; the mechanism (harms already here, control gets harder as capability grows, failure harms the builders too) is what makes caution the correct reading.
3. **SAIN's method is people, not campaigns.** Why: this is the theory of change in one idea (human capital), and it is what makes the funnel legible rather than corporate.
4. **The path is a narrowing pipeline, open at the wide end, honest about the narrow end.** Why: the funnel is the page's central diagram; the reader must understand both why it narrows and that leaving early is a valued outcome, or the diagram reads as attrition.
5. **This is proven, not proposed.** Why: real dates (2023-2026), real graduate counts, real venues (NeurIPS, ICLR) convert inspiration into credibility for a ministry reader.
6. **Named, accountable humans run and advise it.** Why: a stichting with a board, chapter directors, and a ten-person advisory board with checkable affiliations is what "serious counterpart" means to Hanneke.
7. **The rules are written down and public.** Why: Vision, Theory of Change, and Code of Conduct as readable documents are institutional proof no paragraph of self-description can match.
8. **There are exactly two ways to act, and both are free.** Why: the page must end in action, and the labels must match the rest of the site so the doors read as the same doors.

## Page plan

Eight bands. The three highly-visual ones, for the designer: **band 1 (the mission moment)**, **band 3 (the funnel)**, **band 5 (the portraits)**. Everything else is quiet type on hairlines.

---

### 1. Hero: the mission moment

**(a) Question answered:** what is this organisation for?
**(b) Ground:** white, fading into paper at the bottom seam.
**(c) Copy:**

Kicker (the hero special case: 7×7 orange square + serif italic): `Safe AI Netherlands`

h1, display role, full width, set as three stacked clauses (the mission is the design; each clause its own line):

> Raise awareness of the harms from AI.
> Shape the priorities for mitigating them.
> Support the solutions that work.

Subheading (body role, max two sentences, in the copy column below the claim):

> That is the mission of Stichting Safe AI Netherlands, across the full spectrum of harm: from deepfakes and misinformation today to the loss of meaningful human control over increasingly capable systems. This page shows the means: a free path from a first course to full-time work on AI safety, and the people who run it.

No CTA in the hero. The page has to earn the ask first; the close carries it.

**(d) Designer note:** this is the full-width "one hero claim" at display scale with open space amplifying it, orbital linework ornament only; three clauses as three lines is the composition, not a paragraph centred in a void. No photograph, no dotted grid (rejected ornament), no second heading competing in the viewport.

---

### 2. Why the mission needs an organisation

**(a) Question answered:** why does this matter, and why here?
**(b) Ground:** white (continuation), section orbit ornament allowed.
**(c) Copy:**

Heading (heading role): `The Netherlands has the talent. It lacked the path.`

Body (three short paragraphs, copy column):

> Some harms from AI are already routine: deepfakes, misinformation, systems tuned to hold attention at the cost of mental health. Others grow with the systems themselves. The more capability and autonomy we hand to AI, the harder it becomes to keep meaningful human control, and a system that fails does not check who built it. The harm lands on the people and institutions that deployed it as much as on anyone else.

> Nobody can say how fast this goes, and we will not pretend to. The honest position is that readiness is not something the Netherlands has by default. It is something people build.

> This country has world-class universities, a strong tech sector, and institutions like ASML. What it lacked was a unified civil-society voice on AI safety, and a clear route for a talented person to get from curiosity to meaningful contribution. SAIN was created to close that gap. Our answer is not a campaign but human capital: people who understand the risks, have the skills to address them, and sit where they can act.

**(d) Designer note:** pure reading band, one copy column, hairline discipline; no metric boxes, no icon tiles. The paragraphs are the object.

---

### 3. The talent pipeline (the funnel lives here)

**(a) Question answered:** how does SAIN actually produce those people?
**(b) Ground:** cream (paper), the printed-programme ground; the funnel carries its drop shadow.
**(c) Copy:**

Heading (heading role): `Anyone can start. The path narrows on purpose.`

Body, left of the funnel (the diagram draws the five steps; the prose must not recap them one by one):

> The drawing beside this text is the whole organisation. The wide end is a free course anyone can join, no technical background required. The narrow end is full-time work on AI safety, in policy, research, industry or civil society. Between them sit the community, the Research Hub, and fellowships. We call it the SAIN talent pipeline.

> We are open about where our effort goes. SAIN builds the wide end: getting people in, teaching foundations, and scaffolding a first real contribution such as a supervised research project. At the narrow end we mainly connect and refer, with introductions and referral letters.

> Leaving the pipeline early is not failure. Someone who finishes one course and returns to law, medicine or public administration carries that literacy into their field, and a society that understands AI risk is itself an outcome we want.

Evidence line (one short paragraph, directly under the body, before the CTA):

> So far the pipeline has produced more than 100 course graduates across nine-plus cohorts, currently around 60 a year, and peer-reviewed research at NeurIPS and ICLR. The aim for mid-2027 is 250 or more graduates a year, reached by running the same standardised course in more cities, not by diluting it.

CTA: `Start with a free course` → `/courses` (accent fill).

**(d) Designer note:** split composition per the geometry table's "narrowing path": copy column left, trapezoid funnel right (widths 432→196, last band solid orange, multiply photos, drop shadow). The existing `TalentFunnel` component's five band labels stay as shipped; its bands link to landing anchors (`/#courses` etc.), keep that. This is a highly-visual band.

---

### 4. The record: AISIG to SAIN

**(a) Question answered:** is this proven or proposed?
**(b) Ground:** white, thin index band rhythm.
**(c) Copy:**

Heading (heading-sm role): `From one student group to a national foundation in three years.`

Four dated entries (year as the wayfinding numeral, then title and one sentence each):

- **2023** - `AISIG founded.` The AI Safety Initiative Groningen starts as a student-led group teaching AI safety.
- **2024** - `Beyond students.` AISIG opens to professionals, runs multiple course cohorts, and hosts hackathons with Apart Research.
- **2025** - `Research at top venues.` Publications at NeurIPS and ICLR; the Research Hub launches, matching emerging researchers with PhD-level supervisors.
- **2026** - `Safe AI Netherlands.` The model becomes a national foundation, with chapters in Groningen, Amsterdam and Utrecht and one shared infrastructure.

**(d) Designer note:** a stepped journey told as a thin index: years as serif numerals in a fixed column beside the titles, one 1px hairline spine or top rules between rows; four rows, no cards, no icons. Compact; this band must not sprawl.

---

### 5. The people running it

**(a) Question answered:** who is accountable?
**(b) Ground:** white.
**(c) Copy:**

Kicker: `The people behind it`

Heading (heading role): `A small board, close to the work.`

Body (one paragraph):

> SAIN is governed by a board of directors: the national director and the chapter directors of Groningen, Amsterdam and Utrecht. The board takes the legal and strategic decisions; the chapters run the courses, events and communities.

Five portraits (name, role; each links to the person's page as in `leadership.ts`):

1. Alexander Müller, Director SAIN - https://alexanderakm.github.io/
2. Tarteel Mohamed, Director SAIN Groningen - LinkedIn per leadership.ts
3. Ana Paula Castillo Rodriguez, Co-Director SAIN Amsterdam - LinkedIn per leadership.ts
4. Andreea Chivu, Co-Director SAIN Amsterdam - LinkedIn per leadership.ts
5. Riccardo Campanella, Director SAIN Utrecht - LinkedIn per leadership.ts

Subsection, heading-sm: `Advised by people already in the field.`

Body line (one sentence):

> An advisory board of experts in the Dutch AI safety landscape provides strategic guidance.

Three labelled groups (group label in kicker-sm tone, sentence case), portraits with name and affiliation, each linking out per the existing data:

**Technical AI safety**
- Teun van der Weij, Research Scientist, Apollo Research; Co-founder, ENAIS
- Jesse Hoogland, Co-founder and Director, Resolution
- Nandi Schoots, FLI Postdoctoral Fellow, University of Oxford

**AI governance and policy**
- Jelle Donders, Strategic Advisor AI, Dutch Government
- Lisa Gotoh, Senior Policy Officer AI, Dutch Ministry of Foreign Affairs
- Robert Praas, Data Scientist, CEPS
- Charbel-Raphaël Segerie, Executive Director, CeSIA

**Strategy and operations**
- Richard Rushby, Director, The Entrepreneurial Ecosystem
- Jesselit Jimenez, Global Director Strategy and Transformation
- Stephen Corlett, Brand Marketing Leader and Consultant

**(d) Designer note:** "people in a role" geometry: square portraits, serif name with the orange hover rule, sans role in footnote tone; never circles, never initial-avatars (every listed person has a photo asset). Leadership portraits at full scale; advisory portraits may run smaller in wrapped rows under their group labels. Keep `id="team"` on this band, `/team` redirects here. Highly-visual band.

---

### 6. How we work, written down

**(a) Question answered:** what kind of institution is this, and where are its rules?
**(b) Ground:** white; document cards use the light pub-chip treatment (cream on white).
**(c) Copy:**

Kicker: `The foundational documents`

Heading (heading role): `The rules we hold ourselves to are public.`

Body (one paragraph):

> SAIN is a Dutch foundation, a stichting, the standard nonprofit legal form. The foundation holds the brand, the legal entity and the finances, so a local chapter never has to build those from scratch; chapters run their own courses, events and communities. Every programme is free. Three documents define how the whole thing works, and anyone can read them.

Three document cards (eyebrow, title, description from `sainDocuments.ts`; CTA `Read document` on each):

1. Eyebrow `Where SAIN is going` - **Vision** - "SAIN's mission, national role, strategic pillars, and long-term ambition for AI safety in the Netherlands." → `/about/vision`
2. Eyebrow `How change happens` - **Theory of Change** - "The causal logic behind SAIN's work: inputs, activities, outputs, outcomes, and scaling dynamics." → `/about/theory-of-change`
3. Eyebrow `How we work together` - **Code of Conduct** - "Behavioural standards for SAIN participants and operational standards for chapters under the SAIN brand." → `/about/code-of-conduct`

Two quiet follow-on rows under a hairline:

> Role addresses and chapter contacts live on one page, so they stay accurate.
> Inline text link: `Contact SAIN` → `/contact` (make this the site-wide label for /contact).

> Want to bring SAIN to your city? Chapters adopt the brand, the legal umbrella and ready-made curricula instead of starting from scratch.
> Inline text link: `Start a chapter` → `/get-involved#start-chapter`.

**(d) Designer note:** the material is "work already published": three peer document cards sharing type role, padding and rule position; the contact and chapter lines are hairline rows, not boxes. No checklists, no three-column ops matrix.

---

### 7. The close

**(a) Question answered:** what should I do now?
**(b) Ground:** inverse navy banner.
**(c) Copy:**

Closing claim (closing role, left):

> The work is already happening. Join it, or help run it.

Invitation line (body, white at 75%):

> Every programme is free, and all of it runs on people who show up.

CTAs (right): `Join the community` → `/community` (accent fill) and `Volunteer` → `/get-involved` (ghost on inverse).

**(d) Designer note:** the close geometry exactly: inverse banner, claim left, one accent CTA and one ghost CTA right. Nothing else enters this band.

---

### 8. Footer

Standard shell footer; no page-specific copy. (Announcement bar and header inherited unchanged.)

## Facts ledger

| Fact used | Source |
|---|---|
| Mission wording (raise awareness of full spectrum of existing and potential harms; shape mitigation priorities through discourse; support realisation of effective solutions) | docs/vision.md, Mission; inventory-about.md §2.1 |
| Harm range: deepfakes, misinformation, algorithmic manipulation of mental health, loss of meaningful human control over increasingly capable systems | docs/vision.md, Mission |
| NL has world-class universities, tech sector, ASML; lacked unified civil-society voice; no clear path from curiosity to contribution | docs/vision.md, The Challenge |
| Skill gap / "interested individual to impactful professional" pipeline underdeveloped | docs/theory_of_change.md §1 |
| Human capital thesis (people who understand risks, have skills, occupy positions to act) | docs/theory_of_change.md §2 |
| Stichting; foundation holds legal, financial, brand infrastructure; chapters run local activities; chapters never start from scratch (foundation registration otherwise €500-1,000+, not quoted on page) | docs/vision.md, A National Ecosystem; docs/theory_of_change.md §6 |
| Every programme is free | design/design.md (protected claim) |
| Pipeline steps: free course, community, research/projects, fellowship or internship, full-time work; SAIN focuses on early levels, minor support (referral letters, connections) at levels 4-5; early exit valuable (AI-literate society as outcome) | docs/vision.md, The SAIN Funnel; TalentFunnel bands per inventory §8.1 |
| 100+ graduates, 9+ cohorts; ~60 graduates/year now; 250+ target July 2027; publications at NeurIPS and ICLR; standardised national curriculum; scaling via new chapters | docs/theory_of_change.md §3 Outputs, §5; docs/vision.md, Who We Are |
| Timeline 2023 AISIG founded (student-led, Groningen); 2024 professionals + cohorts + hackathons with Apart Research; 2025 NeurIPS/ICLR publications + Research Hub launch; 2026 SAIN founded, chapters in Dutch cities | inventory-about.md §2.5 (current page timeline data) |
| Research Hub matches emerging researchers with PhD-level supervisors | docs/vision.md, Strategic Framework: Research |
| Board = national director + chapter directors of Groningen, Amsterdam, Utrecht; advisory board of experts provides strategic guidance | docs/vision.md, Who We Are |
| Leadership: 5 names, roles, links, photos | src/data/leadership.ts via inventory §5 |
| Advisory board: 10 names, affiliations, links, photos, 3 groups | inventory §2.4.1 (inline array in about/page.tsx) |
| Document titles, eyebrows, descriptions, slugs | src/data/sainDocuments.ts via inventory §6 |
| Contact page consolidates role addresses and chapter contacts | inventory §2.6 (current page copy) |
| CTA labels and destinations (Start with a free course /courses, Join the community /community, Volunteer /get-involved) | design/design.md, Voice |
| Mechanism framing (harms the builders too; no race framing; "not ready" humility; scale claims carry mechanism) | comms-principles.md Part 1 (argumentation guidance, not a factual claim) |

## Open facts

The page works without all of these; none may be invented.

- **A donation route.** No donate page, IBAN, ANBI status or KvK number appears anywhere in the inventoried files, so the donor avatar gets no donate CTA. If SAIN wants one here, it needs a verified destination first.
- **KvK registration number.** Would strengthen the stichting paragraph for a ministry reader; not in any source file.
- **Exact founding/registration dates** (day or month) for AISIG and the SAIN stichting; only years are sourced.
- **Which publication was the NeurIPS spotlight**, and any paper titles; the theory of change says "including a spotlight" but names nothing, so the page says only "NeurIPS and ICLR".
- **Speaking and partnership record** (TEDx, EAGx Amsterdam, AiGrunn, Samenwerking Noord, municipality Westerkwartier) is sourced in theory_of_change.md §5 and available if the designer needs one more evidence row, but the brief omits it to keep the page from becoming a records cabinet.
- **Description of what Resolution and CeSIA are**; affiliations are printed as given, without gloss.
- **Correct link type for Alexander Müller** (personal site, not LinkedIn, under a field named `linkedin`); confirm intended destination.
- **The asset `/photos/advisory_board/Robert_Praasjpeg.jpeg`** has "jpeg" inside the basename; confirm it is the right file before regenerating rungs.

## Kill list

Must not survive into the new page:

- **The hero as a centred bold paragraph on a dotted-grid background.** Grid backgrounds as ornament are hard-rejected by design.md; the mission becomes the designed moment instead.
- **Section-type headings and eyebrows:** "Our Journey", "Foundational Documents", "Contact", "How We Work", "Leadership", "Advisory Board" as headings, and any uppercase/tracked eyebrow treatment.
- **"National infrastructure, local impact"** and the entire three-column checklist (Shared Google Workspace and infrastructure, Legal entity and financial administration, Operational playbooks and templates, Centralized digital infrastructure, No need for separate legal registration). This is internal ops documentation; it lives in the Code of Conduct, which the page now links to.
- **"How SAIN is upskilling the next wave of AI Safety experts"** - "upskilling the next wave" is pipeline bureaucratese; replaced by the story in band 3.
- **The name "SAIN Funnel" in page copy.** One public name: the SAIN talent pipeline. (Component name `TalentFunnel` may stay in code.)
- **"AI Netherlands (SAIN) gets founded"** - the 2026 timeline typo; it is Safe AI Netherlands.
- **"AISIG became a frontrunner among student-led AI Safety groups in Europe"** - unverifiable self-ranking; the venues carry the claim instead.
- **"National Recognition" and "Rapid Growth"** as timeline titles (label-speak; replaced with claim titles).
- **Circle initial-avatar fallbacks** on advisory cards; the system forbids circles and every listed person has a photo.
- **Title-case CTA labels** "Get Involved", "Start a Chapter", "Contact & emails"; replaced by sentence-case site labels.
- **American spellings** on-page: "realization" renders as "realisation" (flag: keep docs/vision.md and the page hero in sync when either is edited).
- **Prose that recaps the funnel band-by-band** after the diagram has drawn it (design.md explicitly forbids the recap).
- **Em dashes** anywhere, including text quoted from docs/*.md (rewrite with hyphen, comma, or two sentences).
- **Any race or "keep up" framing** in the stakes band (nothing like "the Netherlands can't be left behind"), and any confident timeline for AI progress.
