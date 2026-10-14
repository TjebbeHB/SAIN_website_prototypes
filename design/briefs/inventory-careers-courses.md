# SAIN Content Inventory — Careers & Courses cluster

Files covered:
- `src/app/open-positions/page.tsx`
- `src/data/openPositions.ts`
- `src/app/get-involved/page.tsx`
- `src/app/contact/page.tsx` (+ `src/data/siteContact.ts`, its data source — read for facts)
- `src/components/CoursePopup.tsx`
- `src/data/courseApplications.ts`
- `src/components/landing/CourseTabs.tsx`
- `src/components/Footer.tsx`

All facts below are copied verbatim from source. Where the page branches on data-driven state (e.g. "if hasOpenPositions"), both branches are documented.

---

## 1. `src/app/open-positions/page.tsx` + `src/data/openPositions.ts`

This page has **two entirely different renders** driven by the boolean `hasOpenPositions` (`= recruitingChapters.length > 0 || isNationalRecruiting`, computed in `openPositions.ts`). Right now (per current data) it renders the **full "Open Positions" version** because Amsterdam, Utrecht, and the national Research Operations Lead role are all open.

### Branch A — `hasOpenPositions === false`: `StandingApplication` component
Shown instead of the whole page when every chapter and the national posting are closed. Route stays live (doesn't 404) as a standing open-application page.

1. **Hero**
   - Metadata (this branch): title "Join SAIN", description "Interested in volunteering with Safe AI Netherlands? There is always an open application — get in touch."
   - Eyebrow: "Join SAIN"
   - H1: "There is always an open application"
   - Body: "SAIN is a volunteer organisation. Our chapters in Amsterdam, Utrecht, and Groningen are powered by people who care about the development and integration of AI going well in the Netherlands and abroad. We do not always list specific roles, but if you are genuinely interested in contributing, we would love to hear from you."
   - CTA: "Email info@safeainetherlands.org" → `mailto:info@safeainetherlands.org?subject=Joining SAIN`
   - CTA: "Browse ways to get involved" → `/get-involved`
2. **How to apply card**
   - H2: "How to apply"
   - Body: "Send us an email with a short introduction, your CV, and a brief motivation letter. Tell us which chapter you are interested in (Amsterdam, Utrecht, or Groningen) and what draws you to SAIN. We will get back to you as soon as we can."
   - CTA: "Get in touch" → same mailto as above

### Branch B — `hasOpenPositions === true`: full Open Positions page (current live state)
Metadata (this branch): title "Open Positions", description "Volunteer roles open across SAIN's chapters. Apply with your CV and a short motivation letter."

**Section order:**

1. **Hero**
   - Eyebrow: "Open Positions"; H1: "Join SAIN"
   - Body: "SAIN is a volunteer organisation. Our chapters in Amsterdam, Utrecht, and Groningen are powered by people who care about the development and integration of AI going well in the Netherlands and abroad. These are the roles we are currently hiring for."
   - Callout banner (Briefcase icon): label = `APPLICATION_REVIEW.label` = "Rolling applications"; sentence = "Applications are reviewed on a rolling basis, so apply whenever you are ready."
   - Pill nav: national posting anchor "SAIN Netherlands" (`#national`, shown only if national recruiting), then one pill per recruiting chapter (currently: "SAIN Amsterdam" → `#chapter-amsterdam`, "SAIN Utrecht" → `#chapter-utrecht`), then "How to apply" → `#how-to-apply`. Groningen has no pill (closed, no postings).
2. **"How to apply" section** (`id="how-to-apply"`)
   - Left column: eyebrow "How to apply"; H2 "One application, any chapter, any role"; body: "All chapter applications go through the same short form. You will pick the chapter and the role, attach your CV, and write a short motivation letter (one page is plenty). Your application is sent to the SAIN national inbox and the chapter you applied to."
     - Conditional sentence (shown, national recruiting): links "SAIN Netherlands" (`#national`) + " roles are not tied to a chapter and have their own form and application process."
     - Checklist: "Name and email", "Chapter (Amsterdam, Utrecht, Groningen)", "Role(s) you are applying for", "CV (PDF)", "Short motivation letter (PDF or text)", "Optional: LinkedIn or portfolio link"
     - CTA: "Open application form" → `buildApplicationUrl()` (see Google Form details below)
     - CTA: "Or get in touch first" → `/contact`
   - Right column card: eyebrow "Timeline"; H3 "What happens next"; sub: "Applications are reviewed on a rolling basis." Then `APPLICATION_TIMELINE` steps, numbered 1–5:
     1. **Applications open** — "Submit your application whenever you are ready. There is no closing date."
     2. **Rolling review** — "We read applications as they arrive rather than all at once, so applying earlier means hearing back earlier."
     3. **First-round response** — "Within 2 to 3 weeks of applying. Strong candidates are invited to a short intro call with the chapter lead for that team."
     4. **Trial conversation** — "A 30 to 45 minute call to discuss the role, your motivation, and a small task or scenario relevant to the team."
     5. **Onboarding** — "If the previous steps go well, the standard onboarding cycle starts right after. Joining SAIN's team at other dates is possible."
3. **National positions section** (`id="national"`, shown because `isNationalRecruiting` is true)
   - Eyebrow: "Organisation-wide"; H2 = `nationalPosting.name` = "SAIN Netherlands"
   - Blurb: "Some roles belong to SAIN as a whole rather than to a single chapter. Unlike our volunteer positions, these are paid staff roles on the small national team: they work across Amsterdam, Utrecht, and Groningen and report into the national leadership. Each has its own application form and hiring process."
   - Contact button: `nationalPosting.inboxEmail` = **info@safeainetherlands.org** → `mailto:info@safeainetherlands.org?subject=National open positions at SAIN`
   - Role card(s): **Research Operations Lead** only (see Role catalogue below). Apply URL is role-specific (Airtable form), not the shared Google Form.
4. **Chapter sections**, one `<section id="chapter-{slug-lowercased}">` per chapter in `chapterPositions` order (Amsterdam, Utrecht, Groningen):

   **SAIN Amsterdam** — status: open, recruiting
   - Eyebrow: "Now recruiting"; H2: "SAIN Amsterdam"
   - Blurb: "SAIN Amsterdam is building its core team. Co-Directors Ana and Andreea are looking for team leads and team members across all teams. If you want to help shape a chapter from the ground up, this is the moment."
   - CTA: "Apply for SAIN Amsterdam" → `buildApplicationUrl({chapter: "Amsterdam"})`
   - Contact: `infoams@safeainetherlands.org` → `mailto:infoams@safeainetherlands.org?subject=Open positions Amsterdam`
   - Open roles (grouped by team, in `TEAM_ORDER`): Events Lead (Events team), Photographer (Communications team), Community Manager (Community team)
   - Plus a standing "Other → Open application" card (see below)

   **SAIN Utrecht** — status: open, recruiting
   - Eyebrow: "Now recruiting"; H2: "SAIN Utrecht"
   - Blurb: "SAIN Utrecht is building its core team. Director Riccardo and the current team leads are looking for hands-on contributors who want to grow the chapter."
   - CTA: "Apply for SAIN Utrecht" → `buildApplicationUrl({chapter: "Utrecht"})`
   - Contact: `infoutr@safeainetherlands.org` → `mailto:infoutr@safeainetherlands.org?subject=Open positions Utrecht`
   - Open roles: Education Lead, Education Course Facilitator (both Education team)
   - Plus standing "Other → Open application" card

   **SAIN Groningen** — status: closed, `postings: []`
   - Eyebrow: "Currently at capacity"; H2: "SAIN Groningen"
   - Blurb: "A few targeted openings in Groningen for people who want to plug into an established, ambitious chapter. We are selectively hiring to strengthen Communications and to support the national Research Hub." (Note: text implies open roles exist, but `postings` array is empty and `status` is "closed" — see Critique.)
   - Contact only (no apply CTA, no closedNote defined so nothing else renders): `infogro@safeainetherlands.org` → `mailto:infogro@safeainetherlands.org?subject=Future openings at SAIN Groningen`

   **"Other" open-application card** (appears at the bottom of each *recruiting* chapter's section, i.e. Amsterdam and Utrecht):
   - H4: "Open application"; sub: "Don't see a role that fits? Apply anyway."
   - Body: "Interested in AI safety and excited about joining SAIN {chapterSlug}, but none of the roles above quite suit you? We highly recommend applying regardless. Tell us about yourself and what draws you to SAIN in your motivation letter, and we'll figure out together what works well for you."
   - CTA: "Apply" → `buildApplicationUrl({chapter: chapterSlug})`

5. **Final CTA** (dark navy band)
   - Eyebrow: "Ready to apply?"; H2: "One form. Any chapter. Any role."
   - Body: "Send us your CV and a short motivation letter. We will get back to you within two to three weeks." (Note: says "two to three weeks" here vs. timeline step 3 above says "Within 2 to 3 weeks" — consistent, just formatted differently as words vs. digits.)
   - Sub-line: "Applications reviewed on a rolling basis"
   - CTA: "Open application form" → `buildApplicationUrl()`
   - CTA: "Contact a chapter directly" → `/contact`

### Role card anatomy (`RoleCard` component, used throughout)
Each is a `<details>` accordion showing: title, optional employment badge (e.g. "Paid - Full-time"), optional commitment badge (e.g. "Part-time"), optional "Specialisation of {X}" pill, time commitment + reports-to line, employment location (paid roles only), mission statement, optional note. Expanded: key responsibilities (bulleted), "you may be a good fit if you" (bulleted, volunteer-style roles only), "strong candidates may also have" (bulleted), preferred background (field/level/experience/soft skills as a definition list — volunteer roles), "what we offer" (salary/contract/start date + benefits list — paid roles only), key collaborations (prose), optional numbered application-process steps (paid roles only), and an "Apply for this role" button. Button text under the CTA reads either nothing (if `applyUrlOverride` set, i.e. national roles), "Pre-fills the form's "{specialisationOf}" option. Mention "{role.title}" in your motivation letter." (for specialisation roles), or "Opens the application form, pre-filled with this role." (default).

### Google Form / application infrastructure (`openPositions.ts`)
- **Shared chapter form** (`APPLICATION_FORM_URL`): `https://docs.google.com/forms/d/e/1FAIpQLSfp_XJWTbIUzf7szLlq4pe_RXUYxeK8B1SzKt5TUwkREmINtA/viewform`
  - Code comment notes: form fields should be Name, Email, Chapter (Amsterdam/Utrecht — comment doesn't mention Groningen), Role(s), CV upload, Motivation letter upload/text, LinkedIn (optional), availability.
  - Comment notes email routing needs a Google Apps Script trigger emailing `info@safeainetherlands.org` plus the relevant chapter inbox (`infoams@` or `infoutr@` — again Groningen not mentioned) based on the "Chapter" answer, described as "left as an action item for whoever sets up the form" — i.e. **this automation may not exist yet**.
  - Pre-fill entry IDs (`FORM_PREFILL`): `chapterEntryId: "entry.2132087508"`, `roleEntryId: "entry.542644840"`. Comment flags these are placeholders "until the form exists" and says the URL currently "links to the contact page" — but the literal `APPLICATION_FORM_URL` value is a real Google Forms URL, not a contact-page link, so this comment may be stale (see Critique).
- **National Research Operations Lead form** (separate, Airtable): `RESEARCH_OPERATIONS_LEAD_APPLICATION_FORM_URL` = `https://airtable.com/appMwcwhDIpVSvLrz/pagfucm2gVY91sjPg/form`. Explicitly "for the Research Operations Lead and nothing else."
- `buildApplicationUrl({chapter, role})`: builds the shared form URL with `usp=pp_url` plus pre-fill params for chapter/role.
- `COMMS_TEAM_FORM_VALUE` = `"Communications Team member (general or Web Designer, Content Creator, Graphic Designer, Photographer)"` — the single form option that Web Designer, Content Creator, Graphic Designer, and Photographer all pre-fill into, since they're modeled as specialisations of "Communications Team Member."

### Role catalogue (`ROLES`, 14 total)
Teams and order: Chapter Leadership (`directors`), Education, Events, Communications, Community, Outreach, Research.

| Role id | Title | Team | Scope | Reports to | Time commitment | Paid? |
|---|---|---|---|---|---|---|
| education-lead | Education Lead | Education | chapter | Chapter (Co-)Director | 6–10 hrs/wk + iteration peaks | No |
| education-course-facilitator | Education Course Facilitator | Education | chapter | Education Lead | ~4 hrs/wk during iterations (one 2-hr session + prep) | No |
| education-discussion-lead | Education Discussion Lead | Education | chapter | Education Lead | ~3 hrs/wk during running block (1-hr session + ~2 hrs prep/curation/moderation) | No |
| events-lead | Events Lead | Events | chapter | Chapter (Co-)Director | 6–10 hrs/wk (badge: "Part-time") | No |
| events-team-member | Events Team Member | Events | chapter | Events Lead | 3–5 hrs/wk | No |
| communications-lead | Communications Lead | Communications | chapter | Chapter (Co-)Director | 6–10 hrs/wk | No |
| communications-team-member | Communications Team Member | Communications | chapter | Communications Lead | 3–5 hrs/wk | No |
| web-designer | Web Designer | Communications | chapter | Communications Lead | 3–5 hrs/wk | No — specialisation of Communications Team Member |
| content-creator | Content Creator | Communications | chapter | Communications Lead | 3–5 hrs/wk | No — specialisation of Communications Team Member |
| graphic-designer | Graphic Designer | Communications | chapter | Communications Lead | 3–5 hrs/wk | No — specialisation of Communications Team Member |
| photographer | Photographer | Communications | chapter | Communications Lead | 3–5 hrs/wk | No — specialisation of Communications Team Member |
| community-manager | Community Manager | Community | chapter | Chapter (Co-)Director | 4–6 hrs/wk | No |
| on-campus-ambassador | On-Campus Ambassador | Outreach | chapter | Events Lead | 3–5 hrs/wk | No |
| research-operations-lead | **Research Operations Lead** | Research | **national** | Director | **Full-time, 40 hrs/wk, 5-day week** | **Yes** |
| research-operations | Research Operations | Research | national | Research Operations Lead | 2–8 hrs/wk depending on load | No |

Full mission/responsibility text for every role is verbatim in `openPositions.ts` lines 178–659 — copywriter should pull directly from there rather than re-summarizing; highlights below are the ones with unique structure or hard numbers.

**Research Operations Lead — full paid-role detail (the one role with `employment` + `applicationProcess`):**
- Mission (verbatim): "The SAIN Research Hub already exists: supervisors, projects, and a first cohort of researchers. Your job is to make it flourish end to end and build it into the place where Dutch AI safety research talent gets matched, mentored, and published, with output credible enough that researchers and policymakers cite it. You lead the volunteer Research Operations teams in each chapter city and are responsible for the Hub's results. You report directly to the Director and have a budget for the Hub's operations. We are just starting up, so you will be part of the small national team working at SAIN. This role is heavy on project management rather than research insight."
- Responsibilities (5 listed; two lines are commented out in source — "Run the supervised research programme..." and "Run the open collaboration programme..." — meaning they exist in the code but are NOT rendered on the live page):
  1. Set and hold the strategic direction of the Research Hub together with leadership and the Advisory Board.
  2. Proactively recruit supervisors and source projects.
  3. Run the application process; match researchers to supervisors and projects.
  4. Monitor active projects, unblock problems as they arise, and intervene when something stalls.
  5. Recruit, onboard, and manage the volunteer Research Operations teams in each chapter city; maintain continuity across academic-year turnover.
  6. Work with Communications to publish and promote the Hub's output; maintain the Research Hub Handbook; track and report Hub metrics.
- Good fit if: managed a team/volunteers/junior researchers; familiar with AI safety (technical + governance/policy); comfortable with senior people in academia/industry/government; enjoy start-up settings.
- Also strong: published AI safety research; familiarity with Dutch academic/policy landscape; professional working proficiency in Dutch.
- Collaborations: "Director, Advisory Board, technical advisors, chapter Research Operations volunteers, supervisors, researchers, Communications."
- Employment terms: badge "Paid - Full-time"; location "Amsterdam, hybrid with a minimum of 3 days in office, plus regular travel to SAIN chapter cities within the Netherlands"; **salary €50k–€60k gross per year**; contract "1-year contract, 40h, 5-day week"; start date "As soon as possible"; benefits: 8% holiday allowance; Unlimited holidays; Travel allowance + conference attendance opportunities (national/international); Hybrid working (min. 3 days in office); A budget for the Research Hub's operations.
- Application process (overrides the site-wide timeline on this card only):
  1. Initial screener — 30-min conversation with a member of leadership.
  2. Work test — ~2-hr take-home assignment mirroring the real job; advancing triggers a request to contact references.
  3. Final conversation — 45–60 min with the Director and one technical advisor, discussing the work test.
  4. Work trial — paid 2-day work trial in Amsterdam or remote.
- Apply URL: the separate Airtable form (above), not the shared Google Form.

### Chapters data (`chapterPositions`)
- **Amsterdam**: slug "Amsterdam", inbox `infoams@safeainetherlands.org`, status open, 3 postings (Events Lead, Photographer, Community Manager).
- **Utrecht**: slug "Utrecht", inbox `infoutr@safeainetherlands.org`, status open, 2 postings (Education Lead, Education Course Facilitator).
- **Groningen**: slug "Groningen", inbox `infogro@safeainetherlands.org`, status closed, 0 postings, no `closedNote` set.

### National posting data
- `nationalPosting`: slug "national", name "SAIN Netherlands", inbox `info@safeainetherlands.org`, status open, 1 posting (Research Operations Lead, applyUrl = Airtable form).
- Helper `isNationalRoleOpen(roleId)` — used elsewhere on the site (e.g. `/research`) to decide whether to show a Research Hub hiring banner; not used in the files reviewed here but worth flagging to whoever owns `/research`.

### Review policy / timeline constants
- `APPLICATION_REVIEW`: label "Rolling applications"; phrase "on a rolling basis"; sentence "Applications are reviewed on a rolling basis, so apply whenever you are ready."
- `APPLICATION_TIMELINE`: the 5 steps listed under section 2 above.

### CTAs and destinations — full list for this page
| CTA text | Destination |
|---|---|
| Email info@safeainetherlands.org | `mailto:info@safeainetherlands.org?subject=Joining SAIN` |
| Browse ways to get involved | `/get-involved` |
| Get in touch | `mailto:info@safeainetherlands.org?subject=Joining SAIN` |
| Open application form (×2 instances) | `buildApplicationUrl()` — Google Form |
| Or get in touch first | `/contact` |
| Contact a chapter directly | `/contact` |
| Apply for SAIN Amsterdam | `buildApplicationUrl({chapter:"Amsterdam"})` |
| infoams@safeainetherlands.org | `mailto:infoams@safeainetherlands.org?subject=Open positions Amsterdam` |
| Apply for SAIN Utrecht | `buildApplicationUrl({chapter:"Utrecht"})` |
| infoutr@safeainetherlands.org | `mailto:infoutr@safeainetherlands.org?subject=Open positions Utrecht` |
| infogro@safeainetherlands.org | `mailto:infogro@safeainetherlands.org?subject=Future openings at SAIN Groningen` |
| Apply (Other/open-application card, ×2 chapters) | `buildApplicationUrl({chapter: chapterSlug})` |
| info@safeainetherlands.org (national) | `mailto:info@safeainetherlands.org?subject=National open positions at SAIN` |
| Apply for this role (per role card) | role-specific pre-filled URL or override (Airtable for Research Ops Lead) |
| Pill nav anchors | `#national`, `#chapter-amsterdam`, `#chapter-utrecht`, `#how-to-apply` |

### Images / assets
- Both hero sections use an inline CSS radial-dot pattern background (`#021c4d` dots at 4% opacity), not an image file — no asset dependency.
- Icons used (Phosphor, already Phosphor — no hand-drawn SVG to convert): `Briefcase`, `Check`, `Plus`.

### Hand-drawn SVG → Phosphor candidates
None found — this page already uses `@phosphor-icons/react`.

### Critique
- **Groningen's copy contradicts its data.** The blurb says "A few targeted openings in Groningen... We are selectively hiring to strengthen Communications and to support the national Research Hub," but `postings: []` and `status: "closed"` mean zero roles render and no apply button shows — a visitor reads "we're hiring" and then sees nothing to apply for. Either add postings or rewrite the blurb to match "closed."
- **Stale/contradictory code comments around the Google Form.** The comment above `APPLICATION_FORM_URL` says the URL "is a placeholder that links to the contact page so the page is never broken" — but the actual value is a real, filled-in Google Forms link, not a contact-page redirect. Comment also says pre-fill entry IDs are placeholders "to replace once the form is created," implying the form may not really be live/wired up yet, and that email routing (Apps Script) is an unfinished action item. A copywriter/designer should confirm with engineering whether submissions are actually reaching anyone before shipping this as production copy.
- **Two different phrasings of the same wait time**: "Within 2 to 3 weeks" (timeline step 3) vs. "within two to three weeks" (final CTA band) — harmless but an easy consistency fix.
- **National vs. chapter framing is a lot to hold in one page.** "One application, any chapter, any role" (the how-to-apply headline) is immediately contradicted by the very next paragraph explaining that national roles use a completely different form/process. This could confuse a reader skimming just the headline.
- **Two Communications Team specializations naming pattern** ("Web Designer," "Content Creator," etc. billed as separate roles that quietly funnel into one Google Form option) is an internal modeling choice that only surfaces to the applicant as a small footnote under the Apply button ("Pre-fills the form's 'Communications Team Member' option..."). Slightly indirect but currently explained; worth double-checking a user notices it.
- **"Reports to" phrasing** like "Chapter (Co-)Director" is internal org-chart shorthand that a first-time visitor (esp. non-Dutch-org-familiar) may not parse instantly — minor jargon flag.
- Standing-application branch (no open roles) duplicates the "Amsterdam, Utrecht, or Groningen" chapter list even though Groningen is effectively closed at the time of writing — same tension as above, just in the other branch.

---

## 2. `src/app/get-involved/page.tsx`

Depends on `src/data/openPositions.ts` (`hasOpenPositions`), `src/data/siteContact.ts` (`COMMUNITY_JOIN_URL`), and `src/data/courseApplications.ts` (`COURSE_APPLICATION_URL`, `courseApplications`, `openCourseApplications`).

**Section order:**

1. **Hero**
   - Eyebrow: "Get Involved"; H1: "There's a place for you in SAIN"
   - Body: "Whether you're a researcher, student, policymaker, or concerned citizen, AI Safety needs diverse perspectives. Join us in building a safer future with AI."
   - CTA (conditional on `hasOpenPositions`): "See open positions" → `/open-positions`, OR (if false) "Join the team" → `mailto:info@safeainetherlands.org?subject=Joining SAIN`
   - CTA: "Browse our activities" → `#activities`
2. **Open positions pointer** (`id="open-positions"` or `id="join-team"` depending on state)
   - Currently rendered (hasOpenPositions = true): eyebrow "Join the team"; H2 "Open positions across SAIN"; body: "SAIN Amsterdam is building its founding team and SAIN Utrecht is hiring across most of its teams. Volunteer roles, three to ten hours per week. One short application form: name, CV, and a motivation letter."; CTA "See all open positions" → `/open-positions`.
   - Alternate (hasOpenPositions = false): H2 "There is always an open application"; body: "SAIN is run by volunteers across Amsterdam, Utrecht, and Groningen. We do not always list specific roles, but if you are genuinely interested in contributing, send us your CV and a short motivation letter."; CTA "Email info@safeainetherlands.org" → `mailto:info@safeainetherlands.org?subject=Joining SAIN`.
3. **Activities** (`id="activities"`) — eyebrow "What We Do"; H2 "Activities across our chapters". Three activity cards, each with icon, title, subtitle, description, a details checklist, and a right-hand "Available in" city list with status dots:

   **a. Courses** (`id="courses"`, icon `GraduationCap`)
   - Subtitle: "AI Safety, Ethics, and Society"
   - Description: "We facilitate a curriculum based on the Center for AI Safety course in two tracks: Technical and Governance. The courses are free and run in 6-week blocks with weekly readings and on-site discussion sessions, covering everything from mechanistic interpretability to AI policy."
   - Details: "Technical and Governance tracks"; "6 weeks per block, 3-4 cohorts per year"; "2h readings + 2h discussion per week"; "Certificate upon completion"
   - Cities: Groningen (`/chapters/groningen`), Amsterdam (`/chapters/amsterdam`), Utrecht (`/chapters/utrecht`) — `tracksApplications: true`, so each city's dot/label comes from `courseApplications.ts` (see status logic below): currently Groningen "Applications open" (green), Amsterdam "Applications closed" (red), Utrecht "Applications open" (green).
   - Conditional CTA: if `openCourseApplications.length > 0` (true today) → "Sign up" button → `COURSE_APPLICATION_URL` = `https://sainonboard.fillout.com/t/4fQyZTbTCAus`. Else: text "Applications are currently closed but sign ups for the next cohort will re-open soon."

   **b. Discussion Groups** (`id="discussion-groups"`, icon `UsersThree`)
   - Subtitle: "Weekly deep-dives into AI Safety topics"
   - Description: "Focused groups meeting weekly to discuss, learn, and collaborate on specific AI Safety topics. Each group has at least one experienced mentor guiding the conversation. Topics range from mechanistic interpretability to AI governance and neuroscience-inspired alignment."
   - Details: "~2 hours per week"; "Mentored by experienced researchers"; "Topics: Interpretability, Governance, Neuralignment, and more"; "Open to all levels of experience"
   - Cities: Groningen/Amsterdam/Utrecht, no `tracksApplications` — all show green "Running" dot (no application cycle).
   - No sign-up CTA block (not `tracksApplications`).

   **c. Events** (`id="events"`, icon `CalendarBlank`)
   - Subtitle: "Hackathons, talks, and community meetups"
   - Description: "From research hackathons with Apart Research to expert talks, pub quizzes, and AI Safety Chats, our chapters host regular events that bring the community together and create real impact."
   - Details: "Research hackathons (with global placement track record)"; "Expert speaker events and seminars"; "Social events: pub quizzes, AI Safety Chats"; "TEDx presentations and conference talks"
   - Cities: same three, all "Running" (green dot).

   Below the three cards: CTA "Join the community" → `COMMUNITY_JOIN_URL` = `https://sainonboard.fillout.com/new`; caption "Choose the chapter and the activities you want to take part in".

4. **Research Hub pointer** (`id="research-hub"`, icon `Flask`)
   - Eyebrow: "Research"; H2: "SAIN Research Hub"
   - Body: "Join the SAIN Research Hub and get matched with PhD+ supervisors for impactful AI Safety projects across interpretability, evaluation, governance, and more. Open to members from all chapters."
   - CTA: "Explore the Research Hub" → `/research`
5. **Start a Chapter** (`id="start-chapter"`)
   - Eyebrow: "Start a Chapter"; H2: "Bring SAIN to your city"
   - Body: "Starting a local SAIN chapter is one of the best ways multiply your impact when it comes to AI safety. We provide everything you need to get started." (Grammar note: "one of the best ways multiply your impact" is missing "to" — likely a typo, "to multiply.")
   - "What SAIN provides to new chapters" checklist: "The SAIN brand and national recognition"; "Operational playbooks and handbooks"; "Course curriculum and facilitation guides"; "Google Workspace and digital infrastructure"; "One-on-one mentorship from experienced organizers"; "Outreach templates and media support"; "No need for separate legal entity registration"; "Connection to the national network"
   - "How to get started" numbered steps: 1) "Reach out to us expressing your interest in starting a chapter"; 2) "SAIN's board guides you through the founding process"; 3) "Set up your local communication channels (WhatsApp, Slack, etc.)"; 4) "Launch your chapter page on the SAIN website"; 5) "Do initial outreach in your city"; 6) "Run your first meetup or event"; 7) "Consider running the AI Safety, Ethics, and Society course"
   - CTA: "Express Interest" → `mailto:info@safeainetherlands.org?subject=Starting a SAIN chapter`
6. **Donate** — **disabled in code** (`{false && (...)}`), fully written but never rendered: eyebrow "Support Our Work"; H2 "Help us build the Netherlands' AI Safety ecosystem"; body about donations funding courses/research compute/events/infrastructure; CTAs "Donate Now" → `mailto:donate@safeainetherlands.org?subject=Donation to SAIN` and "Discuss Funding" → `mailto:info@safeainetherlands.org?subject=Funding SAIN`. Comment: "Donate disabled until SAIN has a donation flow ready." **Flag for designer/copywriter: this section exists complete but invisible — don't assume the donate flow is live anywhere else on the site without checking.**
7. **Newsletter**
   - Eyebrow: "Stay Updated"; H2: "Subscribe to our newsletter"
   - Body: "Weekly articles on AI Safety from a range of perspectives. Research updates, event announcements, and more."
   - CTA: "Subscribe on Substack" → `https://safeainetherlands.substack.com/`

### Data dependency: `cityStatus()` logic
For an activity with `tracksApplications: true` (Courses only), each city's dot/label is looked up in `courseApplications` by chapter name:
- No entry found → grey fallback wouldn't apply here since all three chapters have entries; general rule is "Running" (green) if no entry.
- Entry with `open: true` → green dot, "Applications open"
- Entry with `open: false` → red dot, "Applications closed"
For non-`tracksApplications` activities (Discussion Groups, Events), every city always shows green "Running" regardless of `courseApplications` data.

### CTAs and destinations — full list for this page
| CTA text | Destination |
|---|---|
| See open positions / Join the team | `/open-positions` or `mailto:info@safeainetherlands.org?subject=Joining SAIN` (conditional) |
| Browse our activities | `#activities` |
| See all open positions / Email info@... | `/open-positions` or mailto (conditional) |
| Sign up (Courses) | `COURSE_APPLICATION_URL` = `https://sainonboard.fillout.com/t/4fQyZTbTCAus` |
| City rows (all 3 activities × 3 cities) | `/chapters/groningen`, `/chapters/amsterdam`, `/chapters/utrecht` |
| Join the community | `COMMUNITY_JOIN_URL` = `https://sainonboard.fillout.com/new` |
| Explore the Research Hub | `/research` |
| Express Interest | `mailto:info@safeainetherlands.org?subject=Starting a SAIN chapter` |
| Donate Now (dead code, not rendered) | `mailto:donate@safeainetherlands.org?subject=Donation to SAIN` |
| Discuss Funding (dead code, not rendered) | `mailto:info@safeainetherlands.org?subject=Funding SAIN` |
| Subscribe on Substack | `https://safeainetherlands.substack.com/` |

### Images / assets
Same inline dot-pattern hero background as other pages (no image file). No photos on this page. Icons (Phosphor, already correct format): `CalendarBlank`, `CaretRight`, `Check`, `Flask`, `GraduationCap`, `UsersThree`.

### Hand-drawn SVG → Phosphor candidates
None — already Phosphor icons throughout.

### Critique
- Typo: "one of the best ways multiply your impact" (missing "to").
- The Donate section is fully built and copy-complete but switched off via `{false && (...)}` — easy to forget it exists; a designer skimming rendered pages won't see it, but a copywriter grepping the file will find donation email copy that isn't live. Worth a decision: finish the donation flow, or delete the dead code to avoid confusion.
- Course-track copy here ("two tracks: Technical and Governance," "6-week blocks," "Center for AI Safety course") is a simplified, singular story, but `CourseTabs.tsx` (landing page) describes three quite different, city-specific curricula (ARENA in Utrecht, BlueDot in Amsterdam, CAIS course in Groningen) that don't all match "Center for AI Safety" or "6 weeks" uniformly — see courses cross-check in section 6 below. A reader who visits both pages could reasonably notice the mismatch.
- "Applications closed" for Amsterdam (red dot) with no explanation on this page of when it reopens is only clarified in the underlying data comment ("Sign ups for the next cohort will open in October") — not exposed to the visitor at all on `/get-involved`; the popup elsewhere doesn't mention Amsterdam being closed either. Consider surfacing the reopen timing.
- Section anchors `#courses`, `#discussion-groups`, `#events` are used by Footer's "Programmes" column (see section 8) — confirmed consistent, good.

---

## 3. `src/app/contact/page.tsx` (+ `src/data/siteContact.ts`)

**Section order:**

1. **Hero** — Eyebrow "Contact"; H1 "Get in touch"; body: "National addresses, chapter teams, named leads, and links to each city's Join & contact section."
2. **National functional emails** (`id="national-emails"`) — Eyebrow "National"; H2 "Functional email addresses"; sub "Use these when you know the topic but not which person should read it." Five cards, each `mailto:{email}`:
   1. **Formal** — "General formal inquiries" — `info@safeainetherlands.org`
   2. **Media & outreach** — "Press, public outreach, and partnerships" — `pr@safeainetherlands.org`
   3. **Research** — "Research Hub, supervisors, and collaborations" — `research@safeainetherlands.org`
   4. **Substack** — "Writing, editing, and newsletter work" — `substack@safeainetherlands.org`
   5. **Conduct** — "Code of Conduct breaches or general concerns" — `conduct@safeainetherlands.org`
3. **Leadership / named contacts** — Eyebrow "Leadership"; H2 "Named contacts"; sub "National, chapter, and personal addresses where we list more than one inbox for someone." Five people (each links `mailto:` per row, plus optional LinkedIn/website link labeled "Website / profile"):
   1. **Alexander Müller** — Director SAIN — National formal: `info@safeainetherlands.org`; Personal: `alexander@safeainetherlands.org` — LinkedIn: `https://alexanderakm.github.io/` (note: this is a personal site, not a linkedin.com URL, despite the "Website / profile" label matching that better than "LinkedIn")
   2. **Tarteel Mohamed** — Director SAIN Groningen — Personal: `tarteel@safeainetherlands.org`; Groningen chapter: `infogro@safeainetherlands.org` — LinkedIn: `https://www.linkedin.com/in/tarteel-mohamed-8918aa2a7/`
   3. **Ana Paula Castillo Rodriguez** — Co-Director SAIN Amsterdam — Amsterdam chapter: `infoams@safeainetherlands.org`; Personal: `ana@safeainetherlands.org` — LinkedIn: `https://www.linkedin.com/in/ana-paula-casrod/`
   4. **Andreea Chivu** — Co-Director SAIN Amsterdam — Amsterdam chapter: `infoams@safeainetherlands.org`; Personal: `andreea@safeainetherlands.org` — LinkedIn: `https://www.linkedin.com/in/andreea-chivu-0924911a6/`
   5. **Riccardo Campanella** — Director SAIN Utrecht — Utrecht chapter: `infoutr@safeainetherlands.org`; Personal: `riccardo@safeainetherlands.org` — LinkedIn: `https://www.linkedin.com/in/riccardo-campanella/`
4. **Chapter role emails** — Eyebrow "Chapters"; H2 "Role emails by city"; sub "Same breakdown as each chapter's Join & contact section: formal collaboration, community, education, events, outreach, and more." Three blocks, each with a "Join & contact on chapter page →" link and a table of role→email:

   **SAIN Groningen** (`/chapters/groningen#join`)
   - Formal collaboration: `infogro@safeainetherlands.org`
   - Community Manager: `cmgro@safeainetherlands.org`
   - Education: `edugro@safeainetherlands.org`
   - Research: `research@safeainetherlands.org`
   - Events: `eventsgro@safeainetherlands.org`
   - Substack: `substack@safeainetherlands.org`
   - Public Outreach: `prgro@safeainetherlands.org`

   **SAIN Amsterdam** (`/chapters/amsterdam#join`)
   - Formal collaboration: `infoams@safeainetherlands.org`
   - Community Manager: `cmams@safeainetherlands.org`
   - Education: `eduams@safeainetherlands.org`
   - Research: `research@safeainetherlands.org`
   - Events: `eventsams@safeainetherlands.org`
   - Substack: `substack@safeainetherlands.org`
   - Public Outreach: `prams@safeainetherlands.org`

   **SAIN Utrecht** (`/chapters/utrecht#join`)
   - Formal collaboration: `infoutr@safeainetherlands.org`
   - Community Manager: `cmutr@safeainetherlands.org`
   - Education: `eduutr@safeainetherlands.org`
   - Research: `research@safeainetherlands.org`
   - Events: `eventsutr@safeainetherlands.org`
   - Substack: `substack@safeainetherlands.org`
   - Public Outreach: `prutr@safeainetherlands.org`

   Below the three blocks: three pill buttons, "SAIN Groningen" / "SAIN Amsterdam" / "SAIN Utrecht", linking to the same `#join` anchors as above.
5. **Socials** — Eyebrow "Stay connected"; H2 "Find us online". Two cards:
   - **Substack** — "Weekly articles on AI Safety" → `https://safeainetherlands.substack.com/`
   - **LinkedIn** — "Follow us for updates" → `https://www.linkedin.com/company/safe-ai-netherlands/`
6. **Postal address** — Eyebrow "Postal address"; H2 "Stichting Safe AI Netherlands"; address:
   > Hereplein 4
   > 9711 GA Groningen
   > The Netherlands

### Every email address referenced on this page (deduplicated)
`info@safeainetherlands.org`, `pr@safeainetherlands.org`, `research@safeainetherlands.org`, `substack@safeainetherlands.org`, `conduct@safeainetherlands.org`, `alexander@safeainetherlands.org`, `tarteel@safeainetherlands.org`, `infogro@safeainetherlands.org`, `ana@safeainetherlands.org`, `infoams@safeainetherlands.org`, `andreea@safeainetherlands.org`, `riccardo@safeainetherlands.org`, `infoutr@safeainetherlands.org`, `cmgro@safeainetherlands.org`, `edugro@safeainetherlands.org`, `eventsgro@safeainetherlands.org`, `prgro@safeainetherlands.org`, `cmams@safeainetherlands.org`, `eduams@safeainetherlands.org`, `eventsams@safeainetherlands.org`, `prams@safeainetherlands.org`, `cmutr@safeainetherlands.org`, `eduutr@safeainetherlands.org`, `eventsutr@safeainetherlands.org`, `prutr@safeainetherlands.org`

### Names on this page (exact spelling)
Alexander Müller, Tarteel Mohamed, Ana Paula Castillo Rodriguez, Andreea Chivu, Riccardo Campanella.

### Images / assets
Same inline dot-pattern hero background; no photos, no logos on this page itself.

### Hand-drawn SVG → Phosphor candidates
None found in `contact/page.tsx` — no custom icon markup, only text/links.

### Critique
- **Alexander Müller's link is labeled "Website / profile"** in the UI but is functionally different in kind from the other four leads' links, which are all real `linkedin.com/in/...` URLs — his is a personal GitHub Pages site (`alexanderakm.github.io`). Not wrong, but inconsistent: every other card's "profile" link is a LinkedIn company/person page.
- **Email volume is large and role-shorthand-heavy.** Prefixes like `cmgro@`, `edugro@`, `prgro@` (Community Manager / Education / Public Outreach + city code) are internally logical but opaque to an external visitor scanning the page — the labels ("Community Manager," "Education," etc.) do carry the meaning so this is mitigated, but the *pattern itself* (job-function + 2–3 letter city code) is an internal naming convention bleeding into a public-facing page.
- Chapter order on this page is Groningen, Amsterdam, Utrecht (`chapterRoleEmails` and `chapterContactLinks` both list Groningen first), which differs from other places on the site that list Amsterdam first (e.g. `get-involved`'s copy: "Amsterdam is building its founding team and... Utrecht is hiring...", or `openPositions.ts`'s `chapterPositions` array order: Amsterdam, Utrecht, Groningen). Minor inconsistency in chapter ordering across the site — not necessarily wrong, but worth a single canonical order decision.
- No phone number anywhere on the page — email/social only, plus a postal address. That's presumably intentional for a volunteer-run org, but flag it in case the redesign wants a "no phone, and that's fine" note for the copywriter.

---

## 4. `src/components/CoursePopup.tsx` (+ shared data from `src/data/courseApplications.ts`)

A site-wide modal popup (rendered via `createPortal` to `document.body`), gated entirely by `openCourseApplications.length > 0` (currently true — Groningen and Utrecht are open).

### Behavior
- **Master switch**: `SHOW_COURSE_POPUP = openCourseApplications.length > 0`. If false, hides the popup everywhere.
- **Dismissal**: stored in `localStorage` under key `sain:course-popup-dismissed:${COURSE_POPUP_VERSION}`. Current version string: **`"2026-09-utrecht-groningen"`**. Bumping this string in `courseApplications.ts` re-shows the popup to everyone who previously dismissed it — this is the mechanism for "new cohort, show the popup again."
- **Open delay**: 1500ms (`OPEN_DELAY_MS`) after page load, if not previously dismissed for this version.
- Standard modal a11y: focus trap, Escape to close, scroll lock, restores focus to previously-focused element on close, `role="dialog"`, `aria-modal`.

### Content (current live copy)
- Eyebrow: "Applications open"
- H2 (title): "Join free, in-person AI Safety courses this September!"
- Body: "Apply today to SAIN's 6-week courses in {cityList}. Learn fundamental concepts in AI safety and governance through discussion-based sessions with others interested in the field. Interested? Choose your local city to learn more & apply!"
  - `cityList` = `formatCityList(openCourseApplications)` → currently renders as **"Groningen or Utrecht"** (formatted via the shared "A, B or C" helper; with exactly 2 items it's "A or B").
- Deadline list, one line per open chapter:
  - **Groningen** — "apply by 11 September (10 September to facilitate)"
  - **Utrecht** — "apply by 18 September (15 September to facilitate)"
- CTA buttons, one per open chapter, each a `Link`:
  - "Groningen" → `/chapters/groningen#programs`
  - "Utrecht" → `/chapters/utrecht#programs`
- Dismiss link: "Maybe later" (closes without navigating)
- Close (X) icon button, top-right, `aria-label="Close"`

### `courseApplications.ts` — full data (shared source of truth, also used by chapter pages not in this review scope)
- `COURSE_APPLICATION_URL` = `https://sainonboard.fillout.com/t/4fQyZTbTCAus` (shared intake form for participants **and** facilitators, all chapters) — used on `/get-involved`'s Courses "Sign up" CTA, not directly in the popup (popup instead links per-chapter to `#programs` anchors on each chapter page).
- `COURSE_POPUP_VERSION` = `"2026-09-utrecht-groningen"`
- Per-chapter application state:
  - **Amsterdam**: `open: false`; `closedNote`: "Sign ups for the next cohort will open in October."; anchor `/chapters/amsterdam#programs`
  - **Groningen**: `open: true`; deadlines: participants "11 September", facilitators "10 September"; anchor `/chapters/groningen#programs`
  - **Utrecht**: `open: true`; deadlines: participants "18 September", facilitators "15 September"; anchor `/chapters/utrecht#programs`
- `openCourseApplications` = filtered list of chapters with `open: true` → currently [Groningen, Utrecht].
- `formatCityList()` helper: 0–1 names → joined as-is; 2+ → "A, B or C" pattern (Oxford-comma-free, no comma before "or" when only 2 items).

### Images / assets
No images in the popup itself — text and buttons only.

### Hand-drawn SVG → Phosphor candidates
None — uses Phosphor's `X` icon already for the close button.

### Critique
- **Amsterdam is open but conspicuously absent from the popup** (it's closed) with no in-popup mention of when it reopens ("October," per the data, is never surfaced to the visitor in this component) — an Amsterdam-based visitor gets no popup guidance at all. Consider a soft mention.
- **Version string doubles as a content descriptor** (`"2026-09-utrecht-groningen"`) — functional but very internal/engineer-facing; if a non-technical content editor is asked to "bump the version," the string format itself isn't obviously documented outside the code comment. Not a copy issue, just a handoff/process risk.
- Popup title says "this September" — correct today (2026-09-13) but this is a hardcoded, date-sensitive claim that will go stale the moment October arrives; there's no mechanism tying the headline text to the actual deadline dates other than manual editing alongside the version bump.
- The popup CTA buttons route to `#programs` anchors on the chapter pages (not directly to the shared Fillout intake form `COURSE_APPLICATION_URL`), while `/get-involved`'s "Sign up" button goes straight to the Fillout form — two different clickpaths to the same underlying application, worth confirming this is intentional (chapter page probably has its own framing before the same or a per-chapter form).

---

## 5. `src/components/landing/CourseTabs.tsx`

Landing-page component: three course tracks, presented as tabs (desktop) / stacked accordion headers (mobile, via `useCompact()` matching `max-width: 767.98px`). Not a page in its own right — lives on the home/landing page. Depends on `courseApplicationFor()` from `courseApplications.ts` to resolve each city link.

### The three course tracks (verbatim facts)

**Track 01 — AI Safety Fundamentals**
- Tagline: "First principles. Drop in any week."
- Summary: "A weekly series on risks, technical safety and governance, taught so newcomers can drop in. Three editions in Utrecht have reached more than 100 students, researchers, engineers and public-sector people."
- Outline ("Weekly themes"), 6 items:
  1. Introduction — capabilities, risks, and solution families
  2. Risks and incidents — social harms, misuse, loss of control
  3. Technical AI Safety — oversight, evaluations, interpretability
  4. Regulation and governance — EU AI Act, audits, GPAI duties
  5. Why safety is hard — incentives, funding gaps, race dynamics
  6. Pathways — thesis, fellowship, then a full-time role
- Cities: **Utrecht only** — "Weekly, modular. Drop in for any theme. ~60 min."
- Photo: `/landing/course-fundamentals.jpg` (responsive widths 640/960/1280/1920), alt "SAIN Utrecht cohort at graduation", caption "Cohort graduation · SAIN Utrecht"

**Track 02 — Technical Alignment**
- Tagline: "ARENA, CAIS or BlueDot, by city."
- Summary: "Each chapter runs a technical track, with a different curriculum. Utrecht teaches from ARENA. Groningen uses the Center for AI Safety course. Amsterdam uses BlueDot."
- Outline ("Utrecht ARENA"), 4 items:
  1. Transformers and mechanistic interpretability
  2. Probing and representations — linear probes, SAEs
  3. PPO and RLHF — the alignment pipeline
  4. GRPO and reward hacking — seeing failure modes
- Cities (3):
  - Utrecht — "ARENA. 4 weeks. Streamed lectures; notebook certificate."
  - Groningen — "Technical track of AI Safety, Ethics, and Society. 6 weeks, 3–4 cohorts a year."
  - Amsterdam — "BlueDot Technical AI Safety. 6 weeks, on-site, application-based."
- Photo: `/landing/course-technical.jpg` (640/960/1280/1920), alt "Technical alignment workshop in progress", caption "Week 1 · Transformers and interpretability"

**Track 03 — Governance & Policy**
- Tagline: "Course or discussion group, by city."
- Summary: "Amsterdam runs BlueDot Frontier AI Governance. Groningen runs the governance track of AI Safety, Ethics, and Society. Utrecht hosts a weekly AI Governance & Policy discussion group. Facilitators include researchers, risk consultants, and public-sector people."
- Outline ("Six-week courses (Groningen and Amsterdam)"), 6 items:
  1. The EU AI Act — duties across the lifecycle
  2. Dutch implementation — ministries, regulators, standards
  3. Accountability — audits, evidence, GPAI obligations
  4. Risk management — NIST and frontier evaluation
  5. Case studies — accidents, misuse, institutional lag
  6. Pathways — policy fellowships, ministries, standards bodies
- Cities (3):
  - Utrecht — "Weekly AI Governance & Policy discussion group."
  - Groningen — "Governance track of AI Safety, Ethics, and Society. On-site."
  - Amsterdam — "BlueDot Frontier AI Governance. On-site, application-based."
- Photo: `/landing/course-policy.jpg` (**only one width: 640** — the other two tracks have 4 responsive widths, this one has just 1; likely a missing-asset gap, see Critique), alt "Governance and policy discussion group around a table", caption "Discussion group · Utrecht"

### Interaction notes (for designer context, not content per se)
- Desktop (≥768px, `md:`): three-column grid, headers in row 1, one shared panel cell in row 2; active tab has a 3px orange bottom border that slides between tabs (`layoutId="course-tab-indicator"`), text swaps with a fast fade-in (~40ms to 60% opacity), photo cross-dissolves (300ms linear).
- Mobile (<768px): stacked list; each header is its own accordion trigger; clicking the open one again closes it entirely (all three collapsed) — deliberately different from desktop where one is always open.
- Arrow-Left/Right on a focused header moves between headers only (this was deliberately isolated from the open panel's own links, per an inline comment about a past bug).
- City rows within a panel are the actual link (not a panel-wide CTA), because a track can mean a different program in each city; each links to `courseApplicationFor(city).href`, i.e. sourced from `courseApplications.ts`'s per-chapter `href` fields (`/chapters/{city}#programs`), keeping this component's routing in sync with `courseApplications.ts` (would break, not silently drift, if a chapter were ever removed from that file, since `courseApplicationFor` throws if not found).

### Images / assets used
- `/landing/course-fundamentals.jpg` (+ `-640`, `-960`, `-1280`, `-1920` responsive rungs)
- `/landing/course-technical.jpg` (+ same 4 rungs)
- `/landing/course-policy.jpg` (+ only a `-640` rung — no 960/1280/1920 versions referenced)

### Hand-drawn SVG → Phosphor candidates
None — already uses Phosphor's `CaretDown` and `ArrowRight`. Note: there's an unusually long inline code comment (lines ~365–389) explaining exact pixel-level rendering reasoning for the `ArrowRight` icon sizing/weight (why 16px regular rather than 12px light, sub-pixel rounding, etc.) — purely an implementation note, not user-facing content, but useful context if a designer wants to resize this icon: doing so risks reintroducing the sub-pixel rendering bug the comment describes.

### Critique
- **Governance & Policy track's photo has only one responsive width (640) vs. four for the other two tracks** — likely means this photo asset is lower-resolution or was added later without running the full responsive-image pipeline (`scripts/generate-responsive-images.mjs`, referenced in the type comment). On a large/xl viewport this image will upscale a 640px-wide source, which will look soft compared to its siblings. Flag for design/asset regeneration.
- **This component's course-track story genuinely differs from `/get-involved`'s "Courses" activity card.** `/get-involved` says "We facilitate a curriculum based on the Center for AI Safety course in two tracks: Technical and Governance... 6-week blocks" — as if it's one uniform course. `CourseTabs` instead describes three distinct programs (a weekly "Fundamentals" series unique to Utrecht, plus city-specific technical/governance curricula — ARENA in Utrecht, BlueDot in Amsterdam, CAIS-based in Groningen — that vary in length: Utrecht's ARENA technical track is 4 weeks, not 6). A reader who reads both pages will find inconsistent claims about how many tracks exist and how long they run. This is the most significant cross-page content conflict found in this review and should be resolved editorially (decide the single true story, or explicitly frame `/get-involved`'s copy as a simplified/aggregate summary).
- The "Fundamentals" track's claim "Three editions in Utrecht have reached more than 100 students, researchers, engineers and public-sector people" is a specific, unsourced stat — worth double-checking it's still current before the redesign ships, since stats like this age quickly.

---

## 6. `src/components/Footer.tsx`

Depends on `COMMUNITY_JOIN_URL` from `siteContact.ts`.

### Structure
Four zones: brand block, three link columns, bottom legal bar.

1. **Brand block**
   - Logo: `/landing/logo-light-113.png` (1x), `/landing/logo-light-226.png` (2x), `/landing/logo-light-339.png` (3x srcset); alt "Safe AI Netherlands"; rendered at 113×48 (h-12, `width={113} height={48}`)
   - Tagline line: "Stichting Safe AI Netherlands"
   - Email: `info@safeainetherlands.org` → `mailto:info@safeainetherlands.org`

2. **Column: "Community"**
   - Chapters → `/#chapters`
   - Groningen → `/chapters/groningen`
   - Amsterdam → `/chapters/amsterdam`
   - Utrecht → `/chapters/utrecht`
   - Join the community → `COMMUNITY_JOIN_URL` = `https://sainonboard.fillout.com/new` (external, opens new tab, has sr-only "(opens in a new tab)" suffix)

3. **Column: "Programmes"**
   - Courses → `/get-involved#courses`
   - Discussion groups → `/get-involved#discussion-groups`
   - Events → `/get-involved#events`
   - Research hub → `/research`
   - Research handbook → `/research/handbook`

4. **Column: "Organisation"**
   - About → `/about`
   - Team → `/team`
   - Open positions → `/open-positions`
   - Contact → `/contact`
   - Newsletter → `https://safeainetherlands.substack.com/` (external)

5. **Bottom bar**
   - Copyright: "© {current year} Safe AI Netherlands" (year computed live via `new Date().getFullYear()`)
   - Document links: Vision → `/about/vision`; Theory of Change → `/about/theory-of-change`; Code of Conduct → `/about/code-of-conduct`
   - Cities line: "Utrecht · Groningen · Amsterdam" (note: this order — Utrecht, Groningen, Amsterdam — differs yet again from the other two orderings seen elsewhere on the site; see cross-file critique below)

### Images / assets
- `/landing/logo-light-113.png`, `/landing/logo-light-226.png`, `/landing/logo-light-339.png` (same logo, 3 pixel densities)

### Hand-drawn SVG → Phosphor candidates
None — no icons used in the Footer at all (pure text/links).

### Critique
- **Footer's "Community" column omits Groningen's course/discussion-group anchors and any course-application link** — it links to chapter pages generally, not e.g. `/chapters/groningen#programs`, so it's consistent in scope (general chapter links only), just noting for completeness.
- **Chapter ordering is inconsistent site-wide.** This review found three different orderings across the files inspected:
  - Footer bottom bar: Utrecht · Groningen · Amsterdam
  - Contact page (`chapterRoleEmails`, `chapterContactLinks`): Groningen, Amsterdam, Utrecht
  - Open Positions (`chapterPositions`): Amsterdam, Utrecht, Groningen
  None is "wrong," but a copywriter standardizing tone/order across the site should pick one canonical chapter order and apply it everywhere, since three different orders across four pages reads as unintentional.
- Footer links to `/research/handbook` and `/team` and `/about/vision` etc. — none of these were in the assigned file set, so their existence/content is unverified in this pass; flag to confirm they exist before the redesign assumes this nav structure is final.

---

## Cross-cutting facts index (for quick copywriter/designer reference)

### All distinct email addresses found across this file set
`info@safeainetherlands.org`, `pr@safeainetherlands.org`, `research@safeainetherlands.org`, `substack@safeainetherlands.org`, `conduct@safeainetherlands.org`, `alexander@safeainetherlands.org`, `tarteel@safeainetherlands.org`, `infogro@safeainetherlands.org`, `ana@safeainetherlands.org`, `infoams@safeainetherlands.org`, `andreea@safeainetherlands.org`, `riccardo@safeainetherlands.org`, `infoutr@safeainetherlands.org`, `cmgro@safeainetherlands.org`, `edugro@safeainetherlands.org`, `eventsgro@safeainetherlands.org`, `prgro@safeainetherlands.org`, `cmams@safeainetherlands.org`, `eduams@safeainetherlands.org`, `eventsams@safeainetherlands.org`, `prams@safeainetherlands.org`, `cmutr@safeainetherlands.org`, `eduutr@safeainetherlands.org`, `eventsutr@safeainetherlands.org`, `prutr@safeainetherlands.org`, `donate@safeainetherlands.org` (dead code only, never rendered)

### All named people found
Alexander Müller (Director SAIN), Tarteel Mohamed (Director SAIN Groningen), Ana Paula Castillo Rodriguez (Co-Director SAIN Amsterdam), Andreea Chivu (Co-Director SAIN Amsterdam), Riccardo Campanella (Director SAIN Utrecht) — plus first-name-only mentions in `openPositions.ts` blurbs: "Co-Directors Ana and Andreea" (Amsterdam) and "Director Riccardo" (Utrecht), matching Ana Paula Castillo Rodriguez / Andreea Chivu / Riccardo Campanella above.

### All external form/tool URLs found
- Chapter open-positions Google Form: `https://docs.google.com/forms/d/e/1FAIpQLSfp_XJWTbIUzf7szLlq4pe_RXUYxeK8B1SzKt5TUwkREmINtA/viewform`
- Research Operations Lead application (Airtable): `https://airtable.com/appMwcwhDIpVSvLrz/pagfucm2gVY91sjPg/form`
- Course application intake (Fillout, shared): `https://sainonboard.fillout.com/t/4fQyZTbTCAus`
- Community join form (Fillout): `https://sainonboard.fillout.com/new`
- Substack: `https://safeainetherlands.substack.com/`
- Company LinkedIn: `https://www.linkedin.com/company/safe-ai-netherlands/`

### Postal address
Stichting Safe AI Netherlands, Hereplein 4, 9711 GA Groningen, The Netherlands

### The one hard salary/comp figure on the site (within this file set)
Research Operations Lead: €50k–€60k gross/year, 1-year contract, 40h/5-day week, Amsterdam hybrid (min. 3 days office + travel), start date ASAP, 8% holiday allowance, unlimited holidays.

### Biggest cross-page inconsistencies found (ranked)
1. **Course structure conflict**: `/get-involved` describes one 2-track, 6-week course; `CourseTabs` (landing page) describes three distinct tracks of varying length across three cities with different providers (ARENA/BlueDot/CAIS).
2. **Chapter display order** differs across Footer, Contact, and Open Positions (three different orderings).
3. **Groningen open-positions copy vs. data**: blurb implies active hiring; data shows zero postings and `status: "closed"`.
4. **Amsterdam course applications are closed** but this isn't surfaced on `/get-involved` (just a red dot with no explanation) nor in the `CoursePopup` (Amsterdam simply isn't mentioned).
5. Stale/contradictory code comments in `openPositions.ts` suggesting the shared Google Form's pre-fill wiring and email-routing automation may be incomplete — should be verified with engineering before treating this as a finished, trustworthy application pipeline in copy.

### Assets referenced across this file set
- `/landing/course-fundamentals.jpg`, `-640/960/1280/1920` rungs
- `/landing/course-technical.jpg`, `-640/960/1280/1920` rungs
- `/landing/course-policy.jpg`, `-640` rung only (missing larger rungs — flag for regeneration)
- `/landing/logo-light-113.png`, `-226.png`, `-339.png`

### Hand-drawn SVG audit result
Across all 8 files reviewed, **no hand-rolled/hand-drawn SVG icons were found**. Every icon in this cluster already comes from `@phosphor-icons/react/dist/ssr` (`Briefcase`, `Check`, `Plus`, `CalendarBlank`, `CaretRight`, `Flask`, `GraduationCap`, `UsersThree`, `X`, `CaretDown`, `ArrowRight`). Nothing to convert in this batch.
