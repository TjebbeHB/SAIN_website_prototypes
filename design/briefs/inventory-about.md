# Content Inventory — About / Team / Documents cluster

Scope: `src/app/about/page.tsx`, `src/app/about/[document]/page.tsx`, `src/app/team/page.tsx`, `src/data/leadership.ts`, `src/data/sainAmsTeam.ts`, `src/data/aisigTeam.ts`, `src/data/sainDocuments.ts`, `src/components/TalentFunnel.tsx`, `src/components/MarkdownDocument.tsx`, `docs/theory_of_change.md`, `docs/vision.md`, `docs/code_of_conduct.md`.

---

## 1. `src/app/team/page.tsx`

One line of logic, no markup: `redirect("/about#team")`. `/team` is a dead alias — nothing to inventory beyond the redirect target. Anything currently linking to `/team` should probably link straight to `/about#team`.

---

## 2. `src/app/about/page.tsx` — the About page

Client component (`"use client"`). Imports: `FadeIn`, `ScrollCue`, `TalentFunnel`, `leadership` (from `src/data/leadership.ts`), `sainDocuments` (from `src/data/sainDocuments.ts`), and Phosphor icons `ArrowRight`, `Check` (already Phosphor — no hand-drawn SVGs at the page level; TalentFunnel does have hand-drawn SVG, see §7).

Sections in DOM order:

### 2.1 Hero (`id="mission"`)
- Full-height white section with a faint dotted-grid background (`#021c4d` at 4% opacity, 40px grid) and a bottom hairline gradient.
- Single centered mission statement (bold, xl/2xl):
  > "Our mission is to raise awareness of the full spectrum of existing and potential harms from AI, inform mitigation priorities through ongoing discourse, and support the realization of effective solutions."
  - This is **word-for-word the same mission sentence** as the opening of `docs/vision.md` (bolded lead line there), so the two files should stay in sync if either is edited.
- `<ScrollCue href="#pipeline" />` — scroll affordance pointing to the next section.

### 2.2 "Pipeline" band (`id="pipeline"`, comment calls it "mission band")
- Two-column layout: text (left) + `<TalentFunnel />` (right, capped `max-w-[436px]`).
- Heading: "How SAIN is upskilling the next wave of AI Safety experts in the Netherlands."
- Body copy (two paragraphs):
  1. "Learn about AI Safety from experts working at the frontier. SAIN's courses, research hub, and community give you a clear way in, whether you're curious or aiming for a career."
  2. "The goal is simple: help students and young professionals make a first real contribution. Then we connect the strongest people onward to organisations, programmes, and jobs. That's the SAIN Talent Pipeline."
- Code comment explicitly documents intent: this band was **moved here from the landing page**, the funnel and its explanatory copy "only ever worked as one thing," and every band of the funnel links back to a landing-page section for that step (see §7 for the actual hrefs, which point to `/#courses`, `/#community`, `/#research`, `/#careers` — i.e. sections on the **home page**, not this page, despite living inside the About page's DOM).
- **Naming inconsistency to flag**: the page calls it "the SAIN Talent Pipeline" in body copy, while the component/comments call it "the SAIN Funnel," and `docs/vision.md` also calls it "The SAIN Funnel." Copywriter should pick one name.

### 2.3 Leadership (`id="team"`)
- Heading: "Leadership".
- Grid of cards (2 cols sm, 5 cols lg) sourced from `leadership` array (`src/data/leadership.ts`, 5 people — see §5). Each card: photo (4:5 aspect, `next/image`, `priority` loading), name, role (orange text). Whole card is a link to the person's `linkedin` URL, opens in new tab.
- This is the section `/team` redirects to.

### 2.4 Advisory Board (`id="advisory-board"`)
- Heading: "Advisory Board".
- Three named sub-groups, each rendered as its own row of cards: **Technical AI Safety** (3 people), **AI Governance & Policy** (4 people), **Strategy & Operations** (3 people). Full list, exact names/affiliations/links/images below (§2.4.1). This data is **hard-coded inline in the page component**, not in a `src/data` file — flag for consolidation with the other roster files.
- Each card: photo (or, if no image, a navy-gradient circle-avatar fallback with the person's initials), name, affiliation, link to an external bio/LinkedIn/personal site.

#### 2.4.1 Advisory Board — exact data

**Technical AI Safety**
| Name | Affiliation | Link | Image |
|---|---|---|---|
| Teun van der Weij | Research Scientist, Apollo Research; Co-founder, ENAIS | https://teunvanderweij.com/ | /photos/advisory_board/Teun.jpg |
| Jesse Hoogland | Co-founder & Director, Resolution | https://www.jessehoogland.com/ | /photos/advisory_board/Jesse.jpg |
| Nandi Schoots | FLI Postdoctoral Fellow, University of Oxford | https://nandischoots.com/ | /photos/advisory_board/nandi.jpg |

**AI Governance & Policy**
| Name | Affiliation | Link | Image |
|---|---|---|---|
| Jelle Donders | Strategic Advisor AI, Dutch Government | https://www.linkedin.com/in/jelle-donders/ | /photos/advisory_board/Jelle.jpeg |
| Lisa Gotoh | Senior Policy Officer AI, Dutch Ministry of Foreign Affairs | https://www.linkedin.com/in/lisa-gotoh/ | /photos/advisory_board/lisa_gotoh_revised.jpeg |
| Robert Praas | Data Scientist, CEPS | https://www.ceps.eu/ceps-staff/robert-praas/ | /photos/advisory_board/Robert_Praasjpeg.jpeg |
| Charbel-Raphaël Segerie | Executive Director, CeSIA | https://crsegerie.com/ | /photos/advisory_board/charbel.png |

**Strategy & Operations**
| Name | Affiliation | Link | Image |
|---|---|---|---|
| Richard Rushby | Director, The Entrepreneurial Ecosystem | https://www.linkedin.com/in/richardrushby/ | /photos/advisory_board/Richard.png |
| Jesselit Jimenez | Global Director Strategy & Transformation | https://www.linkedin.com/in/jesselit-jimenez-65b0b891/ | /photos/advisory_board/Video_Jesselit_039_close-up.jpg |
| Stephen Corlett | Brand Marketing Leader and Consultant | https://www.linkedin.com/in/stephen-corlett-8b361731/ | /photos/advisory_board/Stephen_Corlett.jpg |

*Filename note*: `Robert_Praasjpeg.jpeg` — the literal string "jpeg" appears twice in the filename (once mid-name, once as the real extension). Worth confirming this isn't a typo'd asset before the redesign re-uses it.

### 2.5 Timeline — "Our Journey" (`id="our-journey"`)
- Eyebrow: "Our Journey". Heading: "From AISIG to SAIN".
- Four vertical timeline entries, exact text:

| Year | Title | Description |
|---|---|---|
| 2023 | AISIG Founded | "The AI Safety Initiative Groningen (AISIG) was established as a student-led group dedicated to AI Safety education and awareness." |
| 2024 | Rapid Growth | "AISIG expanded beyond students to include professionals, ran multiple course cohorts, and hosted hackathons with Apart Research." |
| 2025 | National Recognition | "With publications at NeurIPS, ICLR, and other top venues, AISIG became a frontrunner among student-led AI Safety groups in Europe. The breadth expanded to focusing on both students and professionals. Launched the Research Hub." |
| 2026 | SAIN Launched | "From the successes of AISIG, AI Netherlands (SAIN) gets founded, establishing a national initiative with chapters in multiple Dutch cities and a unified infrastructure." |

- Note the 2026 row's grammar/naming slip: "AI Netherlands (SAIN)" — missing "Safe" (should read "Safe AI Netherlands (SAIN)"). Flag for copy fix.
- This timeline data is inline in the page (`const timeline = [...]`), not in `src/data`.

### 2.6 Foundational Documents (`id="foundational-documents"`)
- Eyebrow: "Foundational Documents". Heading: "The shared framework behind SAIN".
- Three cards generated from `sainDocuments` (see §6): each shows `eyebrow`, `title`, `description`, and a "Read document" CTA with an `ArrowRight` icon, linking to `/about/{slug}`.
- Sub-block, "Contact" (still inside this section, after a divider):
  - Eyebrow: "Contact". Heading: "Emails and chapter contacts".
  - Body: "National role addresses, chapter teams, and leadership inboxes live on one page so we keep details accurate and avoid repeating long lists here."
  - CTA: "Contact & emails" → `/contact`.

### 2.7 Structure — "How We Work" (dark navy section, `bg-navy-950`)
- Eyebrow: "How We Work". Heading: "National infrastructure, local impact".
- Intro: "SAIN operates as a national umbrella with local chapters. Each chapter operates autonomously while benefiting from shared resources, branding, and legal infrastructure."
- Three columns, each a checklist (icon: Phosphor `Check`):
  1. **National Level** — Research Hub & fellowship program; Substack & national media; Shared Google Workspace & infrastructure; Legal entity & financial administration; Advisory board & partnerships.
  2. **Chapter Level** — Local courses & discussion groups; Regional events & hackathons; City-specific outreach; Local team & leadership; Community building.
  3. **What Chapters Get** — SAIN brand & authority; Operational playbooks & templates; Centralized digital infrastructure; Mentorship from experienced organizers; No need for separate legal registration.
- CTAs: "Get Involved" (`btn-primary`) → `/get-involved`; "Start a Chapter" (`btn-secondary`) → `/get-involved#start-chapter`.

### Full CTA/link inventory for this page
| CTA / link text | Destination |
|---|---|
| ScrollCue (hero) | `#pipeline` (same page) |
| Every talent-funnel band (inside `<TalentFunnel />`) | `/#courses`, `/#community`, `/#research`, `/#careers`, `/#careers` (home page anchors — see §7) |
| Leadership cards (5) | each person's `linkedin` field (external) |
| Advisory board cards (10) | each person's `link` field (external) |
| "Read document" (×3) | `/about/vision`, `/about/theory-of-change`, `/about/code-of-conduct` |
| "Contact & emails" | `/contact` |
| "Get Involved" | `/get-involved` |
| "Start a Chapter" | `/get-involved#start-chapter` |

### Images used directly by this page
- 5 leadership photos (`/photos/team/...`, from `leadership.ts`, see §5)
- 10 advisory-board photos (`/photos/advisory_board/...`, listed in §2.4.1)
- No hero image (pattern background is generated CSS, not an image asset)

---

## 3. `src/app/about/[document]/page.tsx` — dynamic document page

Server component. Route: `/about/[document]` where `document` is a slug from `sainDocuments`.

- `generateStaticParams()` pre-renders one route per entry in `sainDocuments` (currently `vision`, `theory-of-change`, `code-of-conduct`).
- `generateMetadata()` sets `<title>`/`<description>` from the matching document's `title`/`description`; returns `{}` (no metadata) if slug not found.
- Main component: reads the raw markdown file straight off disk at request/build time via `readFile(path.join(process.cwd(), "docs", document.fileName), "utf8")` — i.e. it reads directly from the `docs/` folder in the repo root, not from a CMS or database. **Any edit to the markdown files in `docs/` immediately changes site content** with no other step.
- Calls Next's `notFound()` (404) if the slug doesn't match any entry in `sainDocuments`.
- Layout: breadcrumb ("About / {document.title}") → eyebrow → `<h1>` title → description paragraph, then the rendered markdown body via `<MarkdownDocument markdown={markdown} />`.
- No images, no other CTAs beyond the breadcrumb "About" link (→ `/about`).

---

## 4. `src/components/MarkdownDocument.tsx` — the markdown renderer

Not a real markdown library — a **hand-rolled, regex-based mini-parser** built specifically for this project's three docs. Supports:
- Headings `#`–`######` (h1 gets its own huge size; h2/h3 share a smaller style; h4+ all render as the h3 style — levels below 3 are not visually distinguished)
- Paragraphs (soft-wrapped lines merged into one block)
- Unordered lists (`*`/`-`) and ordered lists (`1.`)
- Tables (pipe syntax with a `---` separator row)
- Horizontal rules (`---`)
- Inline formatting: `**bold**`, `*italic*`, and `[label](url)` links — links starting with `http` or `mailto:` render as `<a target="_blank">`, everything else as a Next `<Link>`.
- Strips backslash-escaped punctuation (e.g. `\.`) and trailing double-spaces (typical Google-Docs-export artifacts).

Does **not** support: nested lists, blockquotes, code blocks/inline code, images, footnotes, or the `{#anchor-id}` heading-attribute syntax as an actual anchor (the parser's heading regex strips `{#the-sain-funnel}`-style suffixes from the *displayed text* but does not create a real `id` on the heading element — so `docs/vision.md`'s in-page anchor `## The SAIN Funnel {#the-sain-funnel}` and the link to `/about/vision#the-sain-funnel` elsewhere in the docs will **not actually jump to that heading** on the rendered page). This is a functional bug worth flagging to engineering, not just copy.

---

## 5. `src/data/leadership.ts`

Array of 5 people (`as const`), each `{ name, role, linkedin, image }`. Used only by `about/page.tsx` (Leadership section) — **not** used anywhere else, and not the same data as `sainAmsTeam.ts`/`aisigTeam.ts` (see §6/§7 crossover note).

| Name | Role | LinkedIn/link | Image |
|---|---|---|---|
| Alexander Müller | Director SAIN | https://alexanderakm.github.io/ | /photos/team/Alexander.jpg |
| Tarteel Mohamed | Director SAIN Groningen | https://www.linkedin.com/in/tarteel-mohamed-8918aa2a7/ | /photos/team/Tarteel_Mohamed.jpg |
| Ana Paula Castillo Rodriguez | Co-Director SAIN Amsterdam | https://www.linkedin.com/in/ana-paula-casrod/ | /photos/team/Ana_resized.jpeg |
| Andreea Chivu | Co-Director SAIN Amsterdam | https://www.linkedin.com/in/andreea-chivu-0924911a6/ | /photos/team/Andreea_resized.jpeg |
| Riccardo Campanella | Director SAIN Utrecht | https://www.linkedin.com/in/riccardo-campanella/ | /photos/team/Riccardo_resized.jpeg |

Note: Alexander Müller's link is a personal GitHub Pages site (`alexanderakm.github.io`), not LinkedIn like everyone else — inconsistent link type under a field literally named `linkedin`.

---

## 6. `src/data/sainDocuments.ts`

Array of 3 entries (`as const`) plus a `getSainDocument(slug)` lookup helper. Drives both the About-page "Foundational Documents" cards and the dynamic `/about/[document]` route (title/description/metadata + which file to read from `docs/`).

| slug | title | eyebrow | description | fileName |
|---|---|---|---|---|
| vision | Vision | Where SAIN is going | "SAIN's mission, national role, strategic pillars, and long-term ambition for AI safety in the Netherlands." | vision.md |
| theory-of-change | Theory of Change | How change happens | "The causal logic behind SAIN's work: inputs, activities, outputs, outcomes, and scaling dynamics." | theory_of_change.md |
| code-of-conduct | Code of Conduct | How we work together | "Behavioral standards for SAIN participants and operational standards for chapters under the SAIN brand." | code_of_conduct.md |

---

## 7. `src/data/sainAmsTeam.ts` and `src/data/aisigTeam.ts`

**Not used by any file in this assignment.** Both are consumed by `src/app/chapters/amsterdam/page.tsx` and `src/app/chapters/groningen/page.tsx` respectively (confirmed via search) — they are chapter-page rosters, unrelated to the national Leadership/Advisory Board data on `/about`. Listed here for completeness since they were assigned, and flagged because **the site now has three separate, hand-maintained people-rosters** (`leadership.ts`, `sainAmsTeam.ts`, `aisigTeam.ts`, plus the inline advisory-board array in `about/page.tsx`) with no shared schema — a copywriter/designer should know duplicate-looking names (e.g. "Tarteel Mohamed", "Ana Paula Castillo Rodriguez", "Andreea Chivu") are intentionally repeated across national and chapter listings, not an error.

### 7.1 `sainAmsTeam` (13 entries) — SAIN Amsterdam organiser roster, `{name, title}` only, no photos/links
Andreea Ioana Chivu (Co-Director), Ana Paula Castillo Rodriguez (Co-Director), Satchit Chatterji (Research Operation Lead), Michele Vannucci (Research Operation (Vrije University)), Prabhnoor Kohli (Education Lead), Elina Kramers (Communications Lead), Duje Vukovac (Discussion Group Facilitator), Fiona Melzer (Discussion Group Facilitator), Luan Fletcher (Discussion Group Facilitator), Monika Stewart (Discussion Group Facilitator), Henning Bartsch (Advisory Board), Leonard Bereska (Advisory Board), Zoe Tzifa-Kratira (Advisory Board).

### 7.2 `aisigTeam` (18 entries) — AISIG (Groningen) organiser roster, `{name, title}` only
Tarteel Mohamed (Director), Ilija Lichkovski (Research Lead), Imaan Kanji Lalji (Public Relations Lead), Tiwai Mhundwa (Education Lead), Hanadi Al-Samarrai (Events Lead & AI Governance Facilitator), Tarteel Mohamed (Community Manager & Public Relations) — **note: "Tarteel Mohamed" appears twice in this list with two different titles**, likely meant as one person holding two roles but rendered as if two rows — flag for the copywriter to merge or clarify. Steven Abreu (Research), Alice Dauphin (Research & Public Outreach), Guillaume Pourcel (Research), Iulia Bugan (Governance & Privacy Lead), Jeremias Ferrao (Technical Alignment Lead), Cansu Kutay (AI Technical Facilitator), Sophia Lopotaru (AI Technical Facilitator), Nabiha Duaa (Events), Hristo Karagyozov (Events), Jesse Kerkhof (Events), Joris Postmus (Advisory Board), Davide Zani (Advisory Board), Mariam Ibrahim (Advisory Board).

---

## 8. `src/components/TalentFunnel.tsx` — the funnel diagram

Client component rendering a hand-built SVG/HTML funnel ("SAIN Talent Pipeline" / "SAIN Funnel") — five tapering trapezoid "bands," each a clickable link, plus a small hand-drawn origin arrow (SVG `<line>`+`<polygon>`) above the funnel and a terminus dot/stem below it.

Renders in two tones via a `tone` prop: `"paper"` (light background, default) and `"inverse"` (dark background) — used respectively on the About page and reportedly on the landing page's closing band (per the file's own header comment).

### 8.1 The five bands — exact label text and destination

| # | Label (visible text) | Links to | Photo |
|---|---|---|---|
| 1 | "Start with a free course" | `/#courses` | /landing/funnel-01.jpg |
| 2 | "Participate in SAIN's community" | `/#community` | /landing/funnel-02.jpg |
| 3 | "Contribute and collaborate on research or projects" | `/#research` | /landing/funnel-03.jpg |
| 4 | "Undertake a fellowship or internship in AI Safety" | `/#careers` | /landing/funnel-04.jpg |
| 5 | "Work full-time in AI Safety" | `/#careers` | /landing/funnel-05.jpg |

Note: bands 4 and 5 both link to the same `/#careers` anchor on the home page — two different funnel steps collapse onto one destination section. Worth flagging to the designer/copywriter in case the home page's `#careers` section should be split, or the labels should be merged.

Each band's photo has 4 responsive widths (320/640/768/1040px), generated by an `npm run images` script (`scripts/generate-responsive-images.mjs`) into filenames like `funnel-01-320.jpg`. The component's own comment warns these widths must stay in sync between the two files.

### 8.2 Design intent (from the file's own extensive comments)
- Every band's href points back to a section on the **landing/home page** (`/#courses` etc.), not to on-page anchors — so this component, though it lives inside the About page's DOM, is actually a navigation device pointing elsewhere.
- Bands narrow progressively (432 → 356 → 292 → 240 → 196px at the top edge) to visually represent the funnel narrowing from "open to anyone" (a course) to "not open to everyone" (a full-time role).
- The final band is solid orange (`#FF6025`) — the "destination" — while the other four are near-transparent navy/white washes over photographs (photos are decorative texture, described explicitly as "not hero crops").
- The whole outline is drawn as a single continuous SVG path (not five separate shapes) specifically so band-to-band seams don't double up rules — documented as a deliberate fix for an earlier visual bug.
- Underlines on the labels are visible at rest, not just on hover — the comment explains this was a deliberate change because a hover-only affordance "taught the reader nothing" when five bands look alike.

### 8.3 Hand-drawn SVG inventory (candidates for Phosphor icon replacement)
- **Origin marker**: a small `<svg>` with a `<line>` and a `<polygon>` forming a downward arrow, above the first band (lines ~176–179). Currently custom-drawn at 9×16px in orange (`#FF6025`). Could become a Phosphor `ArrowDown` or `CaretDown` icon, though the current one is intentionally minimal/thin and may not need replacing.
- **Band fill polygons and the single continuous outline path** (the trapezoid shapes and connecting silhouette) are structural/generative — these are not decorative icons, they're the diagram itself, so they should stay hand-drawn SVG rather than become Phosphor icons.
- No other icon-like SVGs in this file; the small circular "dots" at top and bottom of the funnel are plain CSS (`<span>` with `rounded-full`), not SVG.

---

## 9. `docs/vision.md` — "Vision of Safe AI Netherlands"

Rendered at `/about/vision` via `MarkdownDocument`. Sections in order: Mission, The Challenge, Who We Are, Our Vision, Strategic Framework: Four Pillars, The SAIN Funnel (`{#the-sain-funnel}` anchor — see §4 bug note), A Journey Through the Funnel (narrative example), A National Ecosystem, Looking Ahead.

Key facts:
- Canonical mission statement (bold, opening line) is **identical wording** to the About page hero copy (§2.1).
- External link: `https://safeainetherlands.org/` (the mission line links the org name to its own live site — note this is the org's actual production domain, referenced from within its own redesign repo).
- Also links to a very specific external anchor: `https://safeainetherlands.org/about#:~:text=Director%20SAIN%20Utrecht-,Advisory%20Board,-Technical%20AI%20Safety` — a text-fragment deep link into the *current live* site's advisory board section. This will break/become irrelevant once the redesign replaces that page.
- Chapters named: **SAIN Groningen, SAIN Amsterdam, SAIN Utrecht** ("and more to come").
- Governance: board = national director + chapter directors of Groningen, Amsterdam, Utrecht, plus an Advisory Board of experts.
- Origin story figures: grew out of **AISIG** (AI Safety Initiative Groningen); **100+ course graduates across 9+ cohorts**; publications at **NeurIPS, ICLR**.
- Four Pillars: **Research** (national AI Safety Research Hub, PhD+ supervisors), **Education** (standardized "AI Safety, Ethics, and Society" course, Technical + Governance tracks; links to `https://safeainetherlands.org/get-involved#:~:text=WHAT%20WE%20DO,across%20our%20chapters` — another live-site text-fragment link), **Events** (national + local), **Public Relations** (LinkedIn, Instagram, Substack).
- **The SAIN Funnel table** — 6 levels, exact text:

| Level | Description | Examples |
|---|---|---|
| 0 | No engagement | Has not encountered AI safety |
| 1 | Initial engagement | Attends a SAIN event, reads a Substack post, sees content on social media |
| 2 | Foundational learning | Completes a SAIN course, joins a discussion group |
| 3 | Active contribution | Joins a Research Hub project, participates in a campaign, joins a chapter team |
| 4 | Structured development | Undertakes a full-time, paid fellowship or internship in AI safety |
| 5 | Professional impact | Works full-time in AI safety — policy, research, industry, or civil society; leads a SAIN research project |

  Note: this maps roughly but not 1:1 onto the 5 `TalentFunnel.tsx` component bands (component has 5 bands for a 6-level 0–5 scale, since level 0 is "no engagement" and isn't itself a funnel band).
- Two "critical transitions" called out: Level 0→1 and Level 2→3.
- Narrative example (named persona): **"Maayke," a 22-year-old law student in Groningen**, references Yuval Noah Harari's *Nexus*, and **"DG CNECT"** (the European Commission department for digital policy) and the **EU AI Act** — this persona/example is unique to this doc and not referenced anywhere else in the inventoried files.
- Explicit scope statement: SAIN focuses on funnel levels 0–3, provides only minor support for levels 4–5 (referral letters, connections) — this is presented as an important transparency point, not an oversight.
- Cross-links to `/about/theory-of-change` and `/about/code-of-conduct` (both functioning internal Next `<Link>`s per the renderer).

---

## 10. `docs/theory_of_change.md` — "Theory of Change"

Rendered at `/about/theory-of-change`. Sections: 1. The Problem, 2. Our Theory, 3. The Logic Model (Inputs / Activities / Outputs / Outcomes / Impact — note the doc's own heading numbering skips from "3" to "5" for Evidence and Validation, i.e. there is no numbered "4" section heading in the source — likely "Impact" or a missing section was meant to be "4," worth flagging as a numbering slip), 5. Evidence and Validation, 6. Scaling Logic.

Key facts:
- **The Problem** — four named gaps: coordination gap, skill gap, awareness gap, institutional gap (each with 1-2 sentence descriptions).
- **Our Theory** — core thesis built on "human capital" + "unified organizational infrastructure."
- **Inputs table**: Proven operational model (AISIG blueprint, 4-team structure: Education, Research, Events, PR), Legal entity (Dutch foundation/*stichting*), National brand, Funding, Human capital (Director, chapter co-directors, team leads, volunteer teams, Advisory Board), Academic partnerships, International network (names **Georgia Tech, Berkeley** explicitly).
- **Activities** by pillar: Education, Research (references **MATS** as the fellowship model), Events, Public Relations, Ecosystem Growth.
- **Outputs table** — "Currently" vs. "Target (July 2027)":

| Output | Currently | Target (July 2027) |
|---|---|---|
| Course graduates per year | ~60 | 250+ |
| Active research projects | 6 | 25+ supervised, many open collaborations |
| Peer-reviewed publications | 6 | Growing annual count |
| Events hosted per year | 1 a month locally | 1 a month per local chapter and 2 national ones |
| Active chapters | 3 (Groningen, Amsterdam, Utrecht) | Strong core chapters (Groningen, Amsterdam, Utrecht) + adoption/start of 3 new local chapters |
| People reached | Hundreds directly, tens of thousands via content | Thousands directly, hundreds of thousands via content |

- **Outcomes** (5 numbered): functioning talent pipeline; credible research contribution; increased public awareness; self-sustaining national community; institutional partnerships.
- **Impact** statement (bold, single sentence): "The development and integration of AI in the Netherlands—and, through the people and knowledge SAIN produces, internationally—is purposeful, just, and safe for all of humanity."
- **Evidence and Validation** — proof points: 100+ graduates / 9+ cohorts in Groningen; 70+ participants in Amsterdam's first iteration; curriculum "based on Dan Hendrycks' material"; publications at **NeurIPS (including a spotlight) and ICLR**; ~20 people across 6+ active research projects, 4+ PhD-level supervisors; invited to speak at **TEDx, EAGx Amsterdam, AiGrunn, Samenwerking Noord**; municipal consulting partnership with **municipality Westerkwartier**; international connections to **Georgia Tech, Berkeley**.
- **Scaling Logic** — a stated feedback-loop cycle (more chapters → bigger footprint → stronger brand → more members → more researchers → more publications → more credibility → more funding → more paid roles → better retention → more impact → more chapters). Also a concrete cost figure: registering a foundation independently would cost **€500–1,000+**.
- Cross-links to `/about/vision` (×2).

---

## 11. `docs/code_of_conduct.md` — "Code of Conduct"

Rendered at `/about/code-of-conduct`. Two parts: **Part I: Member and Participant Standards**, **Part II: Chapter Standards**.

### Part I sections
1. Our Values — Respect, Intellectual honesty, Inclusivity, Collaboration, Safety.
2. Scope — applies to all SAIN events (national/local, in-person/online), all SAIN digital spaces (**WhatsApp, Slack, Discord, email lists, social media**), all SAIN-branded activities, all individuals acting in a SAIN capacity.
3. Expected Behavior — six bullet norms.
4. Unacceptable Behavior — six named categories: Harassment, Discrimination, Bullying, Misrepresentation, Academic dishonesty, Retaliation.
5. Reporting and Enforcement:
   - Local chapter leadership for chapter-specific issues.
   - **SAIN national contact: conduct@safeainetherlands.org** — this is the one email address in the whole inventoried set of files.
   - Process: (1) acknowledgment within **1 week**; (2) severity assessment; (3) investigation; (4) resolution (private conversation up to permanent removal).
6. Commitment to Intellectual Diversity, plus a subsection "Organizational Neutrality and Individual Expression" — explicitly states SAIN is "conveyor and enabler of discussion," not an advocate, gives examples (linking to a **PauseAI** event, an **Anthropic** talk, an AI governance workshop, all "without this constituting an endorsement"), and gives the exact phrasing guidance: frame personal opinions as "SAIN member X believes..." not "SAIN believes...".

### Part II sections
1. Becoming a SAIN Chapter — requirements (3+ founding members incl. a chapter lead; mission commitment; agreement to Code; chapter proposal; onboarding) and what national provides (brand use, fiscal sponsorship via SAIN's legal entity, Google Workspace/shared infra, operational playbooks, mentorship, Research Hub access, website listing).
2. Brand and Identity — exact naming rule: **"SAIN [City]"** format, example "SAIN Groningen," "No dashes, no alternative formats."
3. Minimum Activity Standards table:

| Area | Minimum Standard |
|---|---|
| Education | At least one course cycle (Technical or Governance track) per year |
| Events | At least one event quarterly (4/year) |
| Team | Active team with at least a chapter lead + two additional members |
| National coordination | Participate in national meetings at least quarterly |
| Reporting | Brief activity report to SAIN national every half year |

  Newly founded chapters get a **grace period of half a year**. Below-standard process: outreach → remediation plan → orderly wind-down if needed (support before sanctions).
4. Governance Requirements — chapter lead(s) sit on a "national council"; chapter directors expected to stay active **at least one year**, team leads **at least half a year** ("differs case by case"). Leadership held to a higher conduct standard.
5. Financial Obligations — SAIN's *stichting* is fiscal sponsor for all chapters; funds earmarked per chapter; chapter lead decides spend within approved budget; national signs off/handles accounting; unfunded/volunteer chapters have **no financial obligations, no membership fees, no brand licensing fees, no revenue-sharing**.
6. Autonomy and Flexibility — "local freedom, national coherence" principle; lists what's flexible vs. what must stay consistent.
7. Grounds for Disaffiliation — named grounds (persistent non-compliance, brand/reputation damage, unaddressed Part I violations by leadership, financial misuse, mission-incompatible operation). Process: written notice with **at least 30 days** to respond → chapter response/remediation proposal → board's final decision → consequences (brand use ends, funds handled per grant terms, website listing removed) → appeal path to the Advisory Board (non-binding recommendation, board has final authority). Voluntary departure path also described (collaborative, same unwinding rules).
- Adoption/Amendments footer: adopted by the SAIN board; amendments proposed via Chapter Council or directly to national; board decides after consulting Chapter Council.
- Closing line cross-links to `/about/vision` and `/about/theory-of-change`.

---

## 12. Cross-cutting critique (honest assessment for copywriter + designer)

1. **Naming drift for the same concept.** "SAIN Talent Pipeline" (About page body copy) vs. "SAIN Funnel" (component comments, `docs/vision.md` heading, `docs/theory_of_change.md`). Pick one term and use it everywhere, including the anchor id (`#the-sain-funnel`) and the component name (`TalentFunnel`).
2. **A broken in-page anchor.** `docs/vision.md`'s "The SAIN Funnel" heading declares `{#the-sain-funnel}` and is linked to elsewhere as `/about/vision#the-sain-funnel`, but `MarkdownDocument.tsx`'s parser strips that syntax from the display text without ever setting a real `id` attribute — so the anchor link doesn't actually scroll to the heading. This is a functional gap for engineering, not copy.
3. **Two links to two live production URLs from inside the redesign's own docs**, including a Chrome text-fragment (`#:~:text=...`) deep link into the *current* live site's Advisory Board section and another into its "Get Involved" page. Both will silently rot or point to stale content the moment the redesign replaces those pages — flag before launch.
4. **Duplicate name with two titles rendered as two rows.** `aisigTeam.ts` lists "Tarteel Mohamed" twice back-to-back with different roles (Director; Community Manager & Public Relations) — almost certainly one person, but the data models it as two entries with no way to tell at a glance.
5. **Four separate, hand-maintained "who's who" data sources** with no shared shape: `leadership.ts` (photo+linkedin+role), the inline advisory-board array in `about/page.tsx` (photo+link+affiliation, grouped by category), `sainAmsTeam.ts` and `aisigTeam.ts` (name+title only, no photos, used on chapter pages). A copywriter/designer should not assume these reconcile automatically — e.g. Tarteel Mohamed and Ana Paula Castillo Rodriguez appear in both national (`leadership.ts`) and chapter (`aisigTeam.ts`/`sainAmsTeam.ts`) lists, which is intentional (they hold both roles) but not obvious from the code.
6. **Timeline copy error.** The 2026 "SAIN Launched" row reads "AI Netherlands (SAIN) gets founded" — missing "Safe" before "AI Netherlands." Small but visible, on a page section about the org's own founding.
7. **Funnel bands 4 and 5 share one destination** (`/#careers` on the home page) despite being two distinct labeled steps ("Undertake a fellowship or internship" vs. "Work full-time in AI Safety") — worth confirming with design whether the home page's careers section actually distinguishes these two states, or whether the labels should be merged/re-scoped.
8. **Advisory Board is not in `src/data`.** Unlike leadership and documents, the 10-person, 3-category advisory board array lives inline inside `about/page.tsx` — makes it easy to miss when auditing "all team data," and harder to reuse elsewhere (e.g. if a future chapter page wants to show advisors).
9. **Doc heading numbering slip.** `docs/theory_of_change.md` jumps from section "3. The Logic Model" straight to "5. Evidence and Validation" with no "4" — likely a leftover from a restructure. Harmless to readers (headings render fine) but signals the doc hasn't been proofread top-to-bottom recently.
10. **Heavy internal jargon, undefined on first use, throughout the three `docs/*.md` files**: "stichting" (used without inline translation the first time in `vision.md`, though translated as "Dutch foundation" on second use in `theory_of_change.md`), "MATS" (never expanded — Machine Learning Alignment Theory Scholars), "DG CNECT" (expanded inline, good), "4-team model" / "4-team structure" (Education/Research/Events/PR — only enumerated once, in `theory_of_change.md`'s Inputs table; readers who land directly on `vision.md` or `code_of_conduct.md`, both of which assume the reader knows what "the 4-team model" is, won't know), "Chapter Council" (introduced with no definition of who's on it beyond "chapter leads," referenced multiple times in `code_of_conduct.md`), "fiscal sponsorship" (used correctly but assumes nonprofit-sector familiarity). None of this is necessarily wrong for the intended audience (per the user's own note that AI-safety field knowledge is deliberately assumed on the landing page), but organizational/legal jargon like *stichting*, Chapter Council, and the 4-team model is a different kind of assumed knowledge (Dutch nonprofit + SAIN-internal structure, not AI safety) and is worth a copywriter's judgment call on whether it needs a one-line gloss.
11. **The `MarkdownDocument` renderer is a hand-rolled parser with real gaps**: no blockquotes, no code blocks/inline code, no images, no nested lists. None of the three current docs seem to need these, but if a future document draft uses any of them, they will render as broken/garbled paragraph text with no warning — worth a heads-up to whoever writes future foundational documents.
12. **Filename oddity**: `/photos/advisory_board/Robert_Praasjpeg.jpeg` has "jpeg" baked into the filename itself, not just the extension — cosmetic, but worth fixing when photos are re-touched for the redesign.
13. **`/team` is a bare redirect** to `/about#team` — fine functionally, but means the site has two mental "URLs" for the same content; the redesign should decide whether `/team` should keep existing at all, or whether any lingering external links/bookmarks to it need updating instead of relying on the redirect indefinitely.
