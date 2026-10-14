# /open-positions copy brief

Careers page, reached from the announcement bar and the footer only, never the nav. The page has two renders driven by `hasOpenPositions` in `src/data/openPositions.ts`: **Mode B** (roles are open, the current live state) and **Mode A** (nothing listed, standing application). Both are specified below. The page stays data-driven: role cards, counts, chapter status, badges, salaries, and apply URLs all come from `openPositions.ts`. This brief writes the frame copy and the templating rules; it does not fork the role data into prose.

Site-wide CTA discipline on this page: one label per destination.

| Label | Destination |
|---|---|
| `Open application form` | `buildApplicationUrl()` (shared Google Form) |
| `Apply for SAIN Amsterdam` | `buildApplicationUrl({chapter: "Amsterdam"})` |
| `Apply for SAIN Utrecht` | `buildApplicationUrl({chapter: "Utrecht"})` |
| `Apply for this role` | role card's pre-filled URL, or its `applyUrlOverride` (Airtable, Research Operations Lead) |
| `Contact a chapter` | `/contact` |
| `Volunteer` | `/get-involved` (landing's label, reused) |
| `Email info@safeainetherlands.org` | `mailto:info@safeainetherlands.org?subject=Joining SAIN` (Mode A only) |
| Chapter inbox addresses | inline text links, label is the address itself, existing mailto subjects kept |

## Avatar

**Emma, 24, MSc student in Utrecht.** She clicked "We are hiring" in the orange announcement bar. She has been to one or two SAIN events, knows roughly what AI safety is, and is deciding whether to give it real hours this year. She wants four answers within ten seconds of landing: what roles exist, in which city, paid or volunteer, and how to apply. She will bounce if the page opens with mission prose before roles, if she cannot find her city, or if it is unclear whether "hiring" means a job or a favour. She will also bounce, later and quietly, if a volunteer role is dressed up as more than it is; honesty about hours and pay is what makes her trust the rest.

## Premises

1. **You are on the hiring page, and roles are open right now.** Why: she clicked "We are hiring"; the first glance must confirm the click paid off, or she leaves.
2. **The roles live in specific cities, and here is where yours is.** Why: her real question is "is there something for me in my city"; the page must answer it before she scrolls twice.
3. **Chapter roles are volunteer roles, three to ten hours a week, and one national role is paid full-time.** Why: the paid/volunteer line is the page's biggest honesty obligation; blurring it burns trust and wastes applicants' time on both sides.
4. **A volunteer role here is a working role and a career step in the field, not a favour to SAIN.** Why: this is how SAIN actually means it (the organisation exists to build people's skills and connect them onward, per design.md); stating the mechanism makes the unpaid ask credible instead of apologetic.
5. **Applying is one short form, reviewed on a rolling basis.** Why: the reason candidates give for not starting is friction and uncertainty; naming the form's contents and the response time removes both.
6. **The national paid role has its own separate process.** Why: the current page claims "one application, any chapter, any role" and then contradicts itself; the reader must never hold two conflicting instructions.

## Page plan

### Mode B: roles are open (current live state)

Page metadata: title "Open positions", description "Volunteer roles open at SAIN's chapters, and one paid role on the national team. Apply with your CV and a short motivation letter."

---

**B1. Hero.** Question it answers: did "We are hiring" mean it, and what is on offer?
Ground: white.

- No kicker (landing hero precedent).
- H1 (display, the page's one display heading): `SAIN is hiring.`
- Subheading (body role, one short paragraph): `Six roles are open right now: five volunteer roles at the Amsterdam and Utrecht chapters, and one paid full-time role on the national team. Applications are reviewed on a rolling basis, so apply whenever you are ready.`
  - Templating rule for the designer: the counts and cities are derived from `openPositions.ts` (`chapterPositions` postings plus `nationalPosting`). Render as "{v} volunteer roles at the {recruiting chapter names} chapter(s), and {p} paid full-time role(s) on the national team." Drop the national clause entirely when `isNationalRecruiting` is false. The rolling sentence is `APPLICATION_REVIEW.sentence` verbatim.
- One accent CTA: `Open application form` → `buildApplicationUrl()`.

Designer note: copy column against open space; the index band (B2) must be visible or cresting in the first viewport, because it does the wayfinding the hero deliberately does not. Ornament allowed here (white ground) per the orbital rules; no dot-pattern background.

---

**B2. Where the roles are.** Question: is there something in my city, and what kind of work?
Ground: cream, thin index band (`band-index`).

- Kicker as the band's h2 (the chapters-band device; this is the page's only kicker): `Open roles, by city`
- Index rows, one per hiring unit, each row an anchor link. City name in title role, role titles and status in label/caption role:
  - `SAIN Amsterdam` · `Events Lead · Photographer · Community Manager` → `#chapter-amsterdam`
  - `SAIN Utrecht` · `Education Lead · Education Course Facilitator` → `#chapter-utrecht`
  - `SAIN Netherlands` · `Research Operations Lead · paid, full-time` → `#national`
  - `SAIN Groningen` · `At capacity, no open roles` → `#chapter-groningen`
  - `How to apply` → `#how-to-apply`
- Data rule: rows and role titles render from `chapterPositions` and `nationalPosting`; a chapter with `status: "closed"` gets the "At capacity" line, never a fabricated role list.

Designer note: this is the "cities as peers" thin index geometry, hairline rows with a shared left edge; no photo backing needed here, the material is a schedule, not a place.

---

**B3. What a volunteer role here is.** Question: is this a favour to SAIN or a step for me?
Ground: white, short band.

- Heading (heading-sm): `A volunteer role here is a working role`
- Body: `Every chapter role is unpaid, and takes three to ten hours a week alongside your studies or job. In return, the responsibility is real: you run a course, a chapter's events, or its communications, and the chapter depends on you doing it. SAIN exists to help people build the skills and track record to work on AI safety at labs, institutes, and ministries. The people who run SAIN are on that same path, and a role here is a serious first line on that CV.`
- Second paragraph: `One role is different. The Research Operations Lead is a paid, full-time position on the small national team, listed with its salary and terms below.`

Designer note: copy column only, no illustration; the claim is carried by type. This band is the page's honesty hinge, keep it quiet and unboxed.

---

**B4. SAIN Amsterdam.** Question: what does Amsterdam need, and who am I working with?
Ground: cream (`band-section`), `id="chapter-amsterdam"`.

- Heading (heading): `SAIN Amsterdam is building its core team`
- Body (from `chapterPositions` blurb, kept): `Co-Directors Ana and Andreea are looking for team leads and team members across all teams. If you want to help shape a chapter from the ground up, this is the moment.`
- Role cards, data-driven, grouped by team in `TEAM_ORDER`: Events Lead, Photographer, Community Manager. Card contents (title, badges, time commitment, reports-to, mission, responsibilities, fit lists, background) render verbatim from `ROLES` in `openPositions.ts`.
- Per-card CTA: `Apply for this role` (pre-filled URL). Footnote line under the button, default roles: `Opens the application form, pre-filled with this role.` Specialisation roles (Photographer): `Applies through the form's "{specialisationOf}" option. Mention "{role.title}" in your motivation letter.`
- Open-application card at the bottom of the section:
  - Card heading (title-sm): `No role that fits? Apply anyway.`
  - Body: `If you want to join SAIN Amsterdam and none of the roles above quite suits you, we still want to hear from you. Tell us about yourself and what draws you to SAIN in your motivation letter, and we will work out together where you fit.`
  - CTA: `Apply for SAIN Amsterdam` → `buildApplicationUrl({chapter: "Amsterdam"})`
- Section CTA row: `Apply for SAIN Amsterdam` (outline ink) plus inline text link `Questions first? infoams@safeainetherlands.org` → existing mailto with subject "Open positions Amsterdam". (Same label as the card's CTA on purpose: same destination, same door.)

Designer note: career-row geometry, full-width rows on hairlines with the 26px orange stroke icon; role detail stays a disclosure, not a card grid. The reports-to line should render the human phrasing "Reports to the chapter director" style rather than raw "Chapter (Co-)Director" shorthand where the data allows.

---

**B5. SAIN Utrecht.** Question: same, for Utrecht.
Ground: cream, continues the schedule, `id="chapter-utrecht"`.

- Heading (heading): `SAIN Utrecht is growing its team`
- Body (blurb, kept): `Director Riccardo and the current team leads are looking for hands-on contributors who want to grow the chapter.`
- Role cards, data-driven: Education Lead, Education Course Facilitator. Same card anatomy and footnotes as B4.
- Open-application card, identical structure to B4 with `SAIN Utrecht` and CTA `Apply for SAIN Utrecht` → `buildApplicationUrl({chapter: "Utrecht"})`.
- Section CTA row: `Apply for SAIN Utrecht` (outline ink) plus inline text link `Questions first? infoutr@safeainetherlands.org` → existing mailto with subject "Open positions Utrecht".

Designer note: exact peer of B4; shared rule positions and type roles so the two cities read as equals.

---

**B6. SAIN Groningen.** Question: why is my city not listed?
Ground: cream, thin row, `id="chapter-groningen"`.

- Heading (heading-sm): `SAIN Groningen is at capacity`
- Body: `The Groningen team is full right now, and we are not listing roles there. If you want to be considered when something opens, write to` [`infogro@safeainetherlands.org`](mailto with subject "Future openings at SAIN Groningen") `and tell us what you would like to do.`
- Data rule: this copy is the `status: "closed"` render. If Groningen postings are ever added to the data, the section flips to the B4/B5 structure automatically; the current blurb claiming selective hiring is replaced (see Kill list).

Designer note: one hairline row, no card, no CTA button; the email is an inline text link. Closed is a fact, not a section.

---

**B7. The paid role.** Question: what is the paid job, and how is it different?
Ground: white, `id="national"`.

- Heading (heading): `One paid role on the national team`
- Body: `Most of SAIN runs on volunteers. The Research Operations Lead is the exception: a paid, full-time staff role that works across Amsterdam, Utrecht, and Groningen and reports to the Director. It has its own application form and hiring process, separate from the chapter form below.`
- Role card, data-driven from `ROLES.research-operations-lead`: mission, responsibilities, fit lists, employment terms (salary €50,000 to €60,000 gross per year, 1-year contract, 40h, 5-day week, Amsterdam hybrid with a minimum of 3 days in office, start date as soon as possible, benefits list), and its four-step application process, all verbatim from the data.
- Card CTA: `Apply for this role` → Airtable form (`applyUrlOverride`).
- Inline text link: `Questions about this role? info@safeainetherlands.org` → existing mailto with subject "National open positions at SAIN".

Designer note: the "Paid - Full-time" badge and the salary line are the honesty signals; give them the same weight the volunteer hours get in B4/B5, no more. This is one substantial card on white, not a band of peers.

---

**B8. How to apply.** Question: what exactly do I send, and what happens then?
Ground: white, `id="how-to-apply"`.

- Heading (heading): `One short form for every chapter role`
- Body: `Chapter applications go through the same form, whichever city and role you choose. You pick the chapter and the role, attach your CV, and write a short motivation letter; one page is plenty. Your application goes to the SAIN national inbox and to the chapter you applied to. The Research Operations Lead has its own form, linked on the role above.`
- List heading (title-sm): `What the form asks for`
  - `Name and email`
  - `Chapter (Amsterdam, Utrecht, Groningen)`
  - `Role(s) you are applying for`
  - `CV (PDF)`
  - `Short motivation letter (PDF or text)`
  - `Optional: LinkedIn or portfolio link`
- List heading (title-sm): `What happens after you apply` (from `APPLICATION_TIMELINE`, wait time standardised to words):
  1. `Applications open` - `Submit your application whenever you are ready. There is no closing date.`
  2. `Rolling review` - `We read applications as they arrive rather than all at once, so applying earlier means hearing back earlier.`
  3. `First-round response` - `Within two to three weeks of applying. Strong candidates are invited to a short intro call with the chapter lead for that team.`
  4. `Trial conversation` - `A 30 to 45 minute call to discuss the role, your motivation, and a small task or scenario relevant to the team.`
  5. `Onboarding` - `If the previous steps go well, the standard onboarding cycle starts right after. Joining SAIN's team at other dates is possible.`
- CTA row: `Open application form` (accent) → `buildApplicationUrl()`; `Contact a chapter` (outline ink) → `/contact`.

Designer note: the checklist takes the course-outline-row geometry (orange-ink numbers, hairline tops); the five steps are a stepped-journey list. Two columns at desktop, checklist beside timeline, is the natural split.

---

**B9. Close.** Question: what do I do now?
Ground: inverse navy (`band-close`).

- Closing claim (closing role): `SAIN runs on people who decided to show up.`
- Invitation line (body, white/75): `Send your CV and a short motivation letter. We respond within two to three weeks, whenever you apply.`
- CTAs right: `Open application form` (accent) → `buildApplicationUrl()`; `Contact a chapter` (ghost on inverse) → `/contact`.

Designer note: the landing's close-banner geometry, claim left, two CTAs right; nothing else in the band.

---

### Mode A: standing application (`hasOpenPositions === false`)

Page metadata: title "Join SAIN", description "Interested in volunteering with Safe AI Netherlands? There is always an open application. Get in touch."

**A1. Hero.** Question: I heard SAIN takes volunteers; is that still true with nothing listed?
Ground: white.

- H1 (display): `There is always an open application`
- Subheading (body): `SAIN is a volunteer organisation, run by people in Amsterdam, Utrecht, and Groningen who care about the development and integration of AI going well in the Netherlands and abroad. We are not listing specific roles right now, but if you genuinely want to contribute, we want to hear from you.`
- CTAs: `Email info@safeainetherlands.org` (accent) → `mailto:info@safeainetherlands.org?subject=Joining SAIN`; `Volunteer` (ghost) → `/get-involved`.

**A2. How to apply.** Question: what do I send?
Ground: cream, thin band.

- Heading (heading-sm): `Send us three things`
- Numbered list (course-outline-row geometry):
  1. `A short introduction: who you are and what you would like to do.`
  2. `Your CV.`
  3. `A brief motivation letter that names the chapter you are interested in and what draws you to SAIN.`
- Body, after the list: `We read everything that comes in and will get back to you as soon as we can.`
- CTA: `Email info@safeainetherlands.org` → same mailto.

**A3. Close.** Ground: inverse navy (`band-close`).

- Closing claim: `No listed role does not mean no room.`
- Invitation line: `The chapters grow around the people who turn up. Tell us what you want to work on.`
- CTAs: `Email info@safeainetherlands.org` (accent); `Volunteer` (ghost) → `/get-involved`.

Designer note for Mode A: three bands and the shell, nothing more; the page is a door left open, not a brochure.

## Facts ledger

| Fact | Source |
|---|---|
| Two renders driven by `hasOpenPositions`; current state is the full page | inventory-careers-courses.md §1 (`openPositions.ts`) |
| Amsterdam open roles: Events Lead, Photographer, Community Manager | inventory §1, `chapterPositions` |
| Utrecht open roles: Education Lead, Education Course Facilitator | inventory §1, `chapterPositions` |
| Groningen `status: "closed"`, zero postings | inventory §1, `chapterPositions` |
| National posting: Research Operations Lead, paid, full-time, reports to Director | inventory §1, role catalogue |
| Salary €50k-€60k gross/year, 1-year contract, 40h/5-day week, Amsterdam hybrid min. 3 days office, travel to chapter cities, start ASAP, 8% holiday allowance, unlimited holidays, travel allowance and conference attendance, Hub budget | inventory §1, employment terms |
| Research Operations Lead four-step process (screener, ~2h work test, final conversation, paid 2-day work trial) | inventory §1, applicationProcess |
| Volunteer roles run 3-10 hrs/week (range across the catalogue) | inventory §1, role table |
| Rolling review: `APPLICATION_REVIEW` label and sentence; five `APPLICATION_TIMELINE` steps; first response within 2-3 weeks | inventory §1 |
| Form checklist items (name, email, chapter, roles, CV PDF, motivation letter, optional LinkedIn) | inventory §1, how-to-apply checklist |
| Shared Google Form URL and `buildApplicationUrl()` pre-fill behaviour | inventory §1, application infrastructure |
| Airtable form is for the Research Operations Lead and nothing else | inventory §1 |
| Chapter inboxes and mailto subjects (infoams@, infoutr@, infogro@, info@) | inventory §1, CTA table |
| Amsterdam blurb (Co-Directors Ana and Andreea); Utrecht blurb (Director Riccardo) | inventory §1, chapter sections |
| Chapter applications route to national inbox plus the chapter | inventory §1, how-to-apply body |
| Standing-application copy basis (Mode A hero and email instructions) | inventory §1, Branch A |
| SAIN's mission: upskill people, connect them onward to labs, institutes, ministries; programmes free; volunteer-run | design/design.md, "SAIN, and the job of a page" |
| CTA labels `Volunteer`, `See open positions`; one label per destination | design/design.md, Voice |
| Careers ground is cream; careers reached from announcement bar and footer only | design/design.md, surfaces and Site structure |
| Canonical chapter order on this page: Amsterdam, Utrecht, Groningen | inventory §1, `chapterPositions` array order |

## Open facts

- **Is the shared Google Form live and routed?** Code comments in `openPositions.ts` flag the pre-fill entry IDs as placeholders and the email routing as "an action item for whoever sets up the form", while the URL itself looks real. The copy above works either way, but engineering must confirm submissions reach a human before this ships; if the form is dead, Mode B's apply CTAs should temporarily point at the chapter mailtos.
- **Does Groningen actually have targeted openings?** The old blurb claimed selective hiring for Communications and the Research Hub, but the data says closed with zero postings. This brief writes the closed truth. If the hiring claim is real, the fix is adding postings to the data, not reviving the blurb.
- **Announcement bar wording** ("We are hiring" vs something else) was not in the inventory; the hero works regardless, but the H1 `SAIN is hiring.` deliberately echoes that phrasing and should be checked against the live bar.
- **Volunteer alumni outcomes** (who went on to what) would strengthen B3, but no verified examples exist in the inventory; the section stands on the mission statement instead.
- **Whether the national team is "small"**: stated in the national blurb and the Research Operations Lead mission in the data, so it is used, but only in that section.

## Kill list

- **Uppercase eyebrows**: "Open Positions", "Now recruiting", "Currently at capacity", "Organisation-wide", "How to apply", "Ready to apply?", "Timeline". The system has no tracked eyebrows; kickers are serif italic, and this page carries exactly one.
- **"One application, any chapter, any role" / "One form. Any chapter. Any role."** - contradicted two sentences later by the national process; replaced with "One short form for every chapter role".
- **The Groningen blurb** ("A few targeted openings... We are selectively hiring...") - contradicts `postings: []` and `status: "closed"`; a reader is told "we are hiring" and then shown nothing to apply for.
- **"Join SAIN" as the H1 under an "Open Positions" eyebrow** - the heading names nothing; the new H1 states the claim.
- **The rounded pill anchor nav** - pills are a category error in this system; the index band (B2) does that job on hairlines.
- **The Briefcase callout banner for "Rolling applications"** - the sentence moves into the hero subheading; no icon tile, no box.
- **The inline dot-pattern hero background** - not in the ornament vocabulary; white ground with orbital linework only, per design.md.
- **Two labels for `/contact`** ("Or get in touch first", "Contact a chapter directly") - collapsed to one: `Contact a chapter`.
- **Mixed digits and words for the wait time** ("Within 2 to 3 weeks" vs "within two to three weeks") - standardised to words everywhere.
- **"Chapter (Co-)Director" org-chart shorthand surfacing raw in reports-to lines** - render as plain language where the data allows.
- **Any em dash or en dash in copy** - the source data's "Paid - Full-time" hyphen form is the ceiling; nothing new may introduce dashes as separators.
- **Any invented urgency** ("apply before spots fill") or any framing of volunteering as charity to SAIN - the page's stance is: real work, real hours, honestly unpaid, and a real step into the field.
