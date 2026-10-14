# Content Inventory: Research Hub

Files covered:
- `src/app/research/page.tsx`
- `src/app/research/handbook/page.tsx`
- `src/data/research.ts`
- `docs/research_hub_handbook.md`
- `src/components/landing/ResearchPeople.tsx`
- `src/components/landing/FeaturedPublications.tsx`

---

## 1. `src/data/research.ts` — shared data source

Single source of truth for both `/research` and the landing page components. Exports:

### `publications: Publication[]` (12 entries, in this exact order)

| # | Title | Venue | Authors | Link | `chipTitle` | `featured`? |
|---|---|---|---|---|---|---|
| 1 | The Anatomy of Alignment: Decomposing Preference Optimization by Steering Sparse Features | NeurIPS 2025 Spotlight | Jeremias Ferrao, Matthijs van der Lende, Ilija Lichkovski | https://arxiv.org/abs/2509.12934 | The Anatomy of Alignment | Yes — illustration `alignment`, venueLabel "NeurIPS 2025 workshop · Spotlight", summary: "A transparent view of preference optimisation reveals how models can learn to favour style and formatting over honesty." |
| 2 | Self-Ablating Transformers: More Interpretability, Less Sparsity | ICLR 2025 | Jeremias Ferrao | https://openreview.net/pdf?id=QcmEb490bK | Self-Ablating Transformers | Yes — illustration `ablation`, venueLabel "ICLR 2025 · Building Trust Workshop", summary: "Training small language models to select their active components produces more specialised, interpretable circuits without sacrificing language modelling performance." |
| 3 | EU-Agent-Bench: Measuring Illegal Behavior of LLM Agents Under EU Law | NeurIPS 2025 | Ilija Lichkovski, Alexander Müller, Mariam Ibrahim, Tiwai Mhundwa | https://arxiv.org/abs/2510.21524 | EU-Agent-Bench | Yes — illustration `eu-agents`, venueLabel "NeurIPS 2025 · Regulatable ML Workshop", summary: "A benchmark tests whether AI agents take unlawful actions under EU law, even when the user's request is benign." |
| 4 | Contextual Sparsity as a Tool for Mechanistic Understanding of Retrieval in Hybrid Foundation Models | ICLR 2025 | Davide Zani, Felix Michalak, Steven Abreu | https://openreview.net/pdf?id=TGWzg86kYv | Contextual Sparsity | No |
| 5 | Steering Large Language Models using Conceptors | NeurIPS 2024 | Joris Postmus, Steven Abreu | https://jorispos.github.io/conceptor_steering/ | Steering LLMs using Conceptors | No |
| 6 | AutoSteer: Weight-Preserving Reinforcement Learning for Interpretable Model Control | 1st Place, Apart Research Hackathon | Jeremias Ferrao | https://www.apartresearch.com/project/autosteer-weight-preserving-reinforcement-learning-for-interpretable-model-control | AutoSteer | No |
| 7 | Local Learning Coefficients Predict Developmental Milestones During GRPO | 3rd Place, Apart Research Hackathon | Jeremias Ferrao, Ilija Lichkovski | https://apartresearch.com/project/local-learning-coefficients-predict-developmental-milestones-during-group-relative-policy-optimization-2te2 | Local Learning Coefficients | No |
| 8 | Collective Deliberation for Safer CBRN Decisions: A Multi-Agent LLM Debate Pipeline | 4th Place, Apart Research Hackathon | Alexander Müller, Arsenijs Golicins, Galina Lesnic | https://apartresearch.com/project/collective-deliberation-for-safer-cbrn-decisions-a-multi-agent-llm-debate-pipeline-3w8q | Collective Deliberation | No |
| 9 | Sandbagging LLMs using Activation Steering | Apart Research | Jeremias Ferrao, Davide Zani | https://www.apartresearch.com/project/sandbagging-llms-using-activation-steering | Sandbagging LLMs using Activation Steering | No |
| 10 | Cybersecurity Persistence Benchmark | Apart Research | Davide Zani, Felix Michalak, Jeremias Ferrao | https://www.apartresearch.com/project/cybersecurity-persistence-benchmark | Cybersecurity Persistence Benchmark | No |
| 11 | Playing with Perception: Fooling Traffic Sign Classifiers via Copy-Paste Manipulation | Research Project | Davide Zani, Alexandru Dimofte | https://drive.google.com/file/d/1JvhstWaLIHB9QPI-cg5S-1ASexhmqLSN/view | Playing with Perception | No |
| 12 | AI Misinformation and Threats to Democratic Rights | Apart Research | Davide Zani, Mariam Ibrahim, Tiwai Mhundwa, Felix Michalak, Andrei Avram | https://www.apartresearch.com/project/ai-misinformation-and-threats-to-democratic-rights | AI Misinformation and Democratic Rights | No |

Note: publications #1–3 have `venueShort` values used only on landing chips (not otherwise different from `venue` except #1–3 don't have a differing venueShort — actually check: venueShort equals venue for #1–3, and for #6–9 venueShort is a shortened form, e.g. "1st, Apart Research" vs full "1st Place, Apart Research Hackathon").

### `supervisors: Supervisor[]` (5 entries, in this exact order)

| # | Name | Position (full) | Position (short, used on landing/card) | Image (card, 800px) | Image (landing circle, 312px) | Agenda link (Google Doc) |
|---|---|---|---|---|---|---|
| 1 | Steven Abreu | Research Scientist, MakerMaker | Research Scientist, MakerMaker | /photos/supervisors/steven-800.webp | /photos/supervisors/steven-312.webp | https://docs.google.com/document/d/1UIGpTGYUk9nGvH1H5l5oHclRfNT4pCJ7ArQoIIdDNT4/edit?usp=sharing |
| 2 | Fatih Turkmen | Associate Professor of Computer Science, University of Groningen | Associate Professor, University of Groningen | /photos/supervisors/Fatih_3.png | /photos/supervisors/Fatih_3-312.png | https://docs.google.com/document/d/15UNTtMQYEfO0WQjNKC3QyXHdYW1S2TtITbU94ZltZOc/edit?usp=sharing |
| 3 | Jobst Heitzig | Working Group Leader, Senior Scientist, Potsdam Institute for Climate Impact Research | Senior Scientist, Potsdam Institute | /photos/supervisors/Jobst.png | /photos/supervisors/Jobst-312.png | https://docs.google.com/document/d/1jGBETx0wVUSAZhk4RK6Rett4FVRwTgdUna7Wi2aMg_k/edit?usp=sharing |
| 4 | Guillaume Pourcel | PhD AI Candidate, University of Groningen | PhD AI Candidate, University of Groningen | /photos/supervisors/Guillame.jpg | /photos/supervisors/Guillame-312.jpg | https://docs.google.com/document/d/1kr-lo1Qr_k7Yq3C1eoPg9gwFKlJ9PflTWqGrexA8Nxc/edit?usp=sharing |
| 5 | Ana Lucic | Assistant professor, University of Amsterdam | Assistant professor, University of Amsterdam | /photos/supervisors/Ana_Lucic-800.png | /photos/supervisors/Ana_Lucic-312.png | https://docs.google.com/document/d/1IhPnQWQEN6ykshxW9B6xWehtfPwSl0B4T5HzrKyMnn8/edit?usp=sharing |

Note: each supervisor "card"/tile links out directly to their personal Google Doc research agenda (opens in new tab) — there is no supervisor bio page on the site itself.

### Constants
- `RESEARCH_EMAIL = "research@safeainetherlands.org"`
- `RESEARCH_INTEREST_FORM_URL = "https://forms.gle/na3wbBR4V1YVHAnFA"`

---

## 2. `src/app/research/page.tsx` — `/research` page

Client component (`"use client"`). Imports `ROLES`, `isNationalRoleOpen`, `nationalPosting` from `@/data/openPositions`, plus `publications`, `supervisors`, `RESEARCH_EMAIL`, `RESEARCH_INTEREST_FORM_URL` from `@/data/research`. Icons: Phosphor `Cpu`, `FileText`, `GlobeHemisphereWest`, `UsersThree`.

### Sections in order

**1. Hero** (white bg, faint navy dot-grid background pattern)
- Eyebrow: "Research Hub"
- H1: "Advancing AI Safety research in the Netherlands"
- Body: "The SAIN Research Hub connects talented researchers with experienced supervisors, providing mentorship, compute, and community to produce impactful AI Safety research."
- CTAs: "Read Research Hub Handbook" → `/research/handbook` (primary button); "View supervisors" → `#supervisors` (outline button)
- Stat row: **6+** Active Projects · **20+** Researchers · **12+** Publications
  - CRITIQUE: "12+" publications is inconsistent with the data file, which lists exactly 12 (not "12+"); minor but worth reconciling with copywriter.

**2. "We're hiring" banner (conditional)**
- Only renders if `isNationalRoleOpen("research-operations-lead")` is true (checked against `openPositions` data at build/render time — not a fact to hardcode, it's a live toggle).
- Role title pulled live from `ROLES["research-operations-lead"].title` = **"Research Operations Lead"**
- Copy: "A paid, full-time role leading the Research Hub across every SAIN chapter. Make it flourish end to end and build it into the place where Dutch AI safety research talent gets matched, mentored, and published."
- CTA: "See position" → `/open-positions#research-operations-lead` (the `nationalPosting.slug`)
- From `openPositions.ts` (referenced, not one of the assigned files, but load-bearing fact): role id `research-operations-lead`, team `research`, scope `national`, reports to `Director`, time commitment "Full-time (1.0 FTE), 40 hours per week, 5 day week".

**3. "How It Works"** (id="how-it-works", white bg)
- Eyebrow: "How It Works"
- H2: "A structured path to AI Safety research"
- Subhead: "Whether you're a student looking for your first research experience or a PhD looking to mentor the next generation, the Research Hub has a place for you."
- 4-column feature grid (hardcoded in this file, not in research.ts):
  1. **Supervised Matching** (icon: UsersThree) — "We connect talented researchers with PhD+ supervisors for structured, mentored AI Safety research projects."
  2. **Compute & Support** (icon: Cpu) — "We provide compute resources and logistical support for open collaborations and research projects."
  3. **National Network** (icon: GlobeHemisphereWest) — "Access the full SAIN network: researchers, advisors, and practitioners across all Dutch chapters."
  4. **Publication Track** (icon: FileText) — "Our community has published at NeurIPS, ICLR, and other top venues. We help you build a strong AI Safety research track record."

**4. "Supervisors"** (id="supervisors", slate-50 bg)
- Eyebrow: "Supervisors"
- H2: "Research guidance from experienced mentors"
- Subhead: "Research Hub participants can work with supervisors across technical AI safety, governance, complex systems, and related fields."
- 4-column card grid of all 5 `supervisors` (name, position, 4:5 image, whole card links to `supervisor.agenda` in new tab; sr-only text "Research agenda (opens in a new tab)")
- Below the grid, two side-by-side panels (white cards, border):
  - **"Join as a researcher"** — copy: "If you want to be supervised or join an open collaboration project, fill in the expression of interest form. If you are unsure where you fit, email us and we'll help route you." CTAs: "Fill in the research form" → `RESEARCH_INTEREST_FORM_URL` (https://forms.gle/na3wbBR4V1YVHAnFA), new tab; "Email research team" → `mailto:research@safeainetherlands.org?subject=Research%20Hub%3A%20joining%20as%20a%20researcher`
  - **"Become a supervisor"** — copy: "If you are interested in supervising AI Safety research projects through SAIN, email the Research Hub and we'll follow up with next steps." CTA: "Become a supervisor" → `mailto:research@safeainetherlands.org?subject=Research%20Hub%3A%20becoming%20a%20supervisor`

**5. "Publications"** (id="publications", white bg; comment notes landing's inverse band deep-links here on mobile rather than duplicating the full list)
- Eyebrow: "Publications"
- H2: "Research from our community"
- Subhead: "Our researchers publish at top venues including NeurIPS, ICLR, and compete in international AI Safety hackathons."
- 2-column grid of all 12 `publications` — each card: venue chip, title, authors; whole card links to `paper.link` in new tab.

**6. Bottom CTA band** (navy-950 bg)
- H2: "Contribute to AI Safety research"
- Body: "Whether you want to join a supervised project, contribute to an open collaboration, or supervise AI Safety research, here are the clearest next steps."
- Two panels, **identical content and links to the Supervisors section's two panels above** ("Join as a researcher" / "Become a supervisor", same mailto/form links) — just restyled for dark background (white/5 cards, btn-secondary variant for email CTA).
  - CRITIQUE: This is a near-verbatim duplicate of the panel pair already shown in the Supervisors section a few hundred pixels up the same page. Nothing new is said; a reader who scrolled past Supervisors sees the exact same two offers again at the bottom. Worth collapsing into one CTA moment, or differentiating the copy/framing between the two appearances.

### Other critique points for `/research`
- The stat "12+ Publications" undercounts precisely (there are exactly 12 in the data) — either the "+" is wrong or the dataset is stale; the "6+ Active Projects" and "20+ Researchers" stats have no equivalent backing data file in this inventory — they can't be verified against any listed source and read as unsourced/asserted numbers. Flag for the copywriter to confirm real current counts.
- "PhD+" (used both here and in the handbook) is internal shorthand for "PhD or more senior" — reads as jargon to an outside applicant; should probably be spelled out at least once on the page.
- The hiring banner's visibility is entirely conditional on data in `openPositions.ts` (a file not included in this inventory) — a designer building static mockups needs to design both the with-banner and without-banner states.
- "Open collaboration" vs "Supervised Research/Matching" (the two programme modes, per the handbook) are never named as a clean pair anywhere on this page — the page talks about "supervised project" and "open collaboration" in prose but never introduces them as the two formal tracks the handbook defines. A visitor arriving at `/research` without reading the handbook won't learn there are exactly two structured programme modes.

---

## 3. `src/app/research/handbook/page.tsx` — `/research/handbook` page

Server component. Reads `docs/research_hub_handbook.md` from disk at request time via `fs/promises.readFile` and renders it through `<MarkdownDocument markdown={markdown} />`. Metadata: title "Research Hub Handbook", description "The SAIN Research Hub handbook for participants, supervisors, and collaborators."

### Sections
1. **Breadcrumb + hero band** (slate-50 bg): breadcrumb "Research Hub / Handbook" (Research Hub links to `/research`); eyebrow "Handbook"; H1 "SAIN Research Hub Handbook"; subhead "A clear reference for how the Research Hub works, who it is for, and what participants and supervisors can expect."
2. **Body** (white bg): the full rendered Markdown of `docs/research_hub_handbook.md`, inside a max-w-3xl column.

No other CTAs, images, or data imports on this page — it is purely a chrome wrapper around the markdown file's content.

CRITIQUE: This page has no on-page navigation/TOC even though the handbook markdown is long (roughly 300 lines, ~15 major sections) — a reader has to scroll through everything linearly with no jump links or sticky section nav. Worth flagging to the designer since the doc covers very different audiences (researchers vs. supervisors vs. outsiders) who each want different sections.

---

## 4. `docs/research_hub_handbook.md` — the handbook content itself

Rendered verbatim into `/research/handbook`. This is the single largest and densest content asset in the group. Structure, in order:

### Front matter
- Title: "SAIN Research Hub Handbook"
- **Version: 1.0**
- **Date: 29/04/2026** (note: this is in the future relative to today's date 2026-09-13 is actually in the past relative to this — the doc date 29/04/2026 predates today 2026-09-13, so it's a stale/past version date, not literally "future"; flag to confirm whether this handbook version is current)
- Contact: research@safeainetherlands.org
- Authored by: **Alexander Müller** (Director), **Thomas Brcic** (Former SAIN Groningen Co-Director), **Ilija Lichkovski** (Research Lead)

### Section: "Purpose, Principles, and Scope"
- **Who this handbook is for**: Researchers and students working under SAIN's Research Hub; Supervisors affiliated with SAIN; Collaborators and visiting researchers under open projects; Outsiders interested in SAIN's Research Hub.
- **Mission and Research Scope**: SAIN's mission statement verbatim: "raise awareness of the full spectrum of existing and potential harms from AI, contribute to shaping mitigation priorities through ongoing discourse, and support the realization of effective solutions." Lists three broad topic buckets with sub-bullets (verbatim, not paraphrased below):
  - **Technical alignment & interpretability**: Mechanistic interpretability; Representation learning & feature sparsity for safer control; Steering and controllability of LLMs and other foundation models; Adversarial robustness and red-teaming of models; Detection and mitigation of deceptive or misaligned behaviors; Scalable oversight, debate, constitutional AI, and related methods; Robustness of RL agents and multi-agent systems; Safety benchmarks and evaluation metrics; Agent Foundations; Neuroscience-inspired alignment.
  - **Societal impacts, governance & policy**: AI governance, regulation, and standards (with emphasis on EU/Dutch context); AI and democratic processes (misinformation, polarization, information integrity); AI and labor, job displacement, economic and social impacts; Privacy, surveillance, and data protection in AI deployment; Risk assessment for high-stakes domains (e.g. CBRN, cybersecurity, critical infrastructure).
  - **Meta and foundational topics**: Research methodology and evaluation in AI safety; Benchmarking AI systems' persistence, persuasion, or autonomy; Forecasting and scenario analysis for transformative AI; Epistemics, information hazards, and responsible communication in AI safety.
  - Default answer to "does this count as AI safety?" is **yes**, if a plausible pathway to reducing AI-related risk can be articulated (risk defined broadly: lives, equality, rights, etc.)
- **Core principles** (4, numbered): (1) intellectual honesty — accurately communicate known/unknown/uncertain; (2) proactively consider near- and long-term harms and dual-use concerns; (3) maintain a supportive cross-disciplinary environment, "zero room for harmful authority"; (4) feedback/critique/review are essential — not personal attacks, attack ideas not people. Extra caution urged near deadlines.

### Section: "Structure of the SAIN Research Hub"
- **Program Modes** (exactly 2):
  1. **Supervised Research Matching** — students/early-career researchers apply for guided projects mentored by a SAIN supervisor; SAIN gives logistical/financial support (e.g. compute); aims at publishable research; supervisors typically PhD+ (exceptions possible), any discipline welcome.
  2. **Open Collaboration Opportunities** — no formal supervision required; SAIN connects researchers directly and supports (e.g. compute); researcher submits proposal via the website form, or reaches out to the project's contact person to join an existing one; one person leads (usually the original designer) but nobody is formally "supervisor."
- **Eligibility**: anyone with sufficient background (students at Bachelor/Master/PhD level, industry researchers, even unaffiliated people); remote participation fine; supervisors must generally be PhD+ (exceptions possible).
- **Application Requirements and Criteria**: rolling basis, apply any time; Supervised Research Matching gets a response within a working week; Open Collaboration proposals should ideally be fully fleshed out, but SAIN can help shape them if needed.
- **Roles and Responsibilities** (brief preview, detailed later): Researchers/students drive day-to-day research; Supervisors provide guidance/direction, step in as needed; Research Lead and Research Operations handle project management/unblocking — primary contact research@safeainetherlands.org.

### Section: "Research Lifecycle at SAIN"
- **Onboarding**: new researchers get an overview of projects/groups/supervisors, an explanation of the handbook, access to compute/support if relevant; should join Discord via the **onboarding form**: https://sainonboard.fillout.com/new
- **Research Proposal Stage**: required before a project is approved as an Open Collaboration Research Hub project (only if aiming for a full paper/collaboration — trim what's unneeded otherwise). Required proposal elements: Title/problem statement/motivation; Background & related work; Research questions and hypotheses; Proposed methodology; Safety & risk considerations (dual-use, misuse, infohazards); Needed resources (datasets, compute estimate, collaborator count/time); Timeline & milestones; Expected outputs. Reviewed by SAIN's Research Team, who approve (with/without revisions) or decline.
  - For Supervised Research Matching or joining an open collaboration: use the **Supervised Research – Expression of Interest** form: https://docs.google.com/forms/d/e/1FAIpQLSedM6m7WjjFmztnBvzsSoFkpi9X7LvMiUv2MtyGNisPXPZNNw/viewform — or email research@safeainetherlands.org.
  - CRITIQUE: This Google Form URL differs from the `RESEARCH_INTEREST_FORM_URL` constant used on the live `/research` page (`https://forms.gle/na3wbBR4V1YVHAnFA`). Need to confirm with the team whether these are the same form (short link vs. long link) or two different forms — a discrepancy here would silently misdirect applicants.
- **Assignment & Setup**: brought into contact with relevant people — supervised matching gets a formally assigned supervisor + new Discord project; joining an existing open project adds you to it + Discord; a brand-new open project gets added to the website, project owner added to Discord, then opened for others to join. Time commitment (e.g., 5-10h/week vs. near full-time) and meeting cadence set. Discord encouraged (same onboarding form link). Project registered/updated internally. SAIN Research Team sets up a GitHub repo (if applicable) under the SAIN GitHub org with member access.
- **Execution Phase**: weekly/biweekly meetings (progress/blockers, refine scope, review experiments/drafts); weekly/biweekly progress forms (accountability/tracking — form itself not linked here, but see "For Supervisors" section below for the actual form links); contact with Research Team via research@safeainetherlands.org or the Discord channel (same onboarding link used for "Discord channel" text, which is slightly confusing — see critique).
- **Completion Phase**: project is "complete" when the main research question is adequately addressed (including negative/null results) and published in some presentable form; infohazard/dual-use considerations treated appropriately if relevant.
- **Post-Project**: output and resources (data, code, notes, drafts) stored in **SAIN's project archive**, linked as: https://safeainetherlands.org/research#:~:text=Research%20from%20our%20community (i.e., a text-fragment deep link straight to the Publications section of the live `/research` page — this doc treats that page section as "the archive"). Short retro note shared with the community, encouraged. Project may be extended as a follow-up.
- **For Supervisors** (explicit sub-procedure): proposal prepared as above; researchers assigned to supervisors/projects; supervisor sends the proposal + researcher list (contact details, Discord username, GitHub username if applicable, as a minimum) to research@safeainetherlands.org; GitHub repo created in SAIN org with collaborator access if applicable; **every Sunday**, researchers fill in the **weekly check-in form**: https://docs.google.com/forms/d/1Uu4JrMh9j6iNa4seeIyqPnkCtikFXPgT8-pUPnwzVVE/; **every two Sundays**, supervisor fills in the **bi-weekly check-in form**: https://docs.google.com/forms/d/1bBQ8jstIOWAFzOuskhLMv9lnGvcU87ZTtSSKo8mni9o/edit

### Section: "Expectations and Standards"
- **Researchers** expected to: own day-to-day progress; come prepared to supervisor meetings (agenda, results, questions); fill in the weekly progress log; communicate early about blockers/constraints; follow SAIN's Core Principles.
- **Supervisors** expected to: give regular guidance/mentorship; help scope realistically; meet at agreed frequency (usually weekly/biweekly) prepared; give timely feedback; watch for projects stuck in unproductive directions and researcher wellbeing issues (stress/burnout); raise concerns to the Research Lead/team.
- **The Research Team** responsible for: maintaining documentation/this handbook; onboarding researchers/supervisors; tracking Research Hub projects/outputs; acting as contact point (research@safeainetherlands.org or Discord channel).

### Section: "Deliverables and Milestones"
- **Intermediate milestones** — an illustrative example timeline (explicitly "for example," not a fixed rule): Week 1-3 orientation/lit review; Week 4-8 first experimental proof of concept; Week 8-10 internal discussion/initial results; Week 10-12 implement improvements/new results; Week 12-14 write up final report/submission.
- **Final deliverables** — one or more of: conference/journal/workshop paper; blog post at **SAIN's Substack** (https://aisig.substack.com/) and/or LessWrong; policy brief.
- **Authorship and Credit**: authorship reflects substantial intellectual/implementation contribution; order handled internally by the project team; SAIN and the Research Hub must be acknowledged in publications; SAIN may promote the work as enabled by the Research Hub.

### Section: "Funding, Support, and Constraints" (mostly applies to technical projects)
- **Financial support**: SAIN does not provide stipends/salaries — purely voluntary/educational; may help with funding for conference trips/workshop registration/travel "within reason."
- **Compute & Resources**: Research Team strives to give easy access to compute/resources once a project is specified; amount depends on the project, specified at project start; researchers encouraged to prioritize computationally inexpensive projects.

### Section: "Communication Norms"
- Use agreed channels, ideally the **Discord channel** (same onboarding-form link: https://sainonboard.fillout.com/new)
- Respond within a reasonable timeframe (e.g., 2-3 working days for non-urgent matters)
- Meetings (supervised researcher's responsibility): simple agenda; start with a brief update since last time (weekly log helps); end with concrete next steps.
- Be explicit about availability (travel, family time, exam periods, etc.)
- Default to kind, precise, honest communication.

### Section: "Research Integrity, Safety, and Ethics"
- **Integrity**: cite sources properly, avoid plagiarism; be honest about results/limitations/negative findings; keep sufficient documentation for rough reproducibility.
- **Responsible Use of AI Tools**: SAIN is not against LLM use in coding/writing, even encourages it when a researcher has considered it carefully; but: always check outputs carefully, don't uncritically trust generated content; avoid feeding sensitive/confidential data into untrusted tools; disclose AI tool use where relevant.
- **Dual-Use and Infohazards**: work on AI safety can paradoxically reduce safety; be aware research could increase capabilities/misuse risk if widely shared; discuss doubts with supervisor and/or Research Lead before public dissemination; possible mitigations: redacting sensitive details, internal-only/restricted-access reports, delaying publication.

### Section: "Wellbeing and Support"
- SAIN wants personal wellbeing taken seriously with support available.
- AI safety research can be intellectually/emotionally demanding, notes the "publish or perish" pressure as "unfortunately much too common."
- Researchers encouraged to: be honest about workload/stress with supervisors (and vice versa); take breaks, keep work/rest boundaries; remember understanding matters more than publishing; speak to the SAIN team if conflicts/issues arise.

### Section: "Escalation, Conflict Resolution, and Sanctions"
- **When to notify someone**: supervisor/researcher relationship breakdown (persistent unavailability, unresolved conflict); suspected misconduct (data falsification, sexual harassment, plagiarism); serious concerns the project direction no longer aligns with AI safety; scope/expectations/time commitment misaligned.
- **Notification path**: Researcher ↔ Supervisor first (try to resolve directly) → SAIN's Research Lead (or anyone on the Research Team) → SAIN Co-Directors (if conflict involves the Research Lead/Research Team). Can skip levels straight to SAIN leadership if unsafe or facing harassment.
- **Possible sanctions/remedies**: clarify expectations/adjust milestones; reassign supervisor or researcher to another project; re-scope or pause the project; removal from the Research Hub or from SAIN roles in severe cases.

### All URLs / emails appearing in the handbook (deduplicated, exact)
- research@safeainetherlands.org (repeated many times)
- https://sainonboard.fillout.com/new (onboarding form; also referred to as "Discord channel" link in 3+ places — same URL every time, see critique)
- https://safeainetherlands.org/research#:~:text=Research%20from%20our%20community (project archive = live Publications section)
- https://docs.google.com/forms/d/e/1FAIpQLSedM6m7WjjFmztnBvzsSoFkpi9X7LvMiUv2MtyGNisPXPZNNw/viewform (Supervised Research – Expression of Interest — DIFFERS from the site's `RESEARCH_INTEREST_FORM_URL`)
- https://docs.google.com/forms/d/1Uu4JrMh9j6iNa4seeIyqPnkCtikFXPgT8-pUPnwzVVE/ (weekly check-in form, researchers, due Sundays)
- https://docs.google.com/forms/d/1bBQ8jstIOWAFzOuskhLMv9lnGvcU87ZTtSSKo8mni9o/edit (bi-weekly check-in form, supervisors, due every other Sunday)
- https://aisig.substack.com/ (SAIN's Substack, for blog-post deliverables)

### Critique of the handbook document
- **The onboarding-form link is overloaded**: `https://sainonboard.fillout.com/new` is presented as (a) "our onboarding form," (b) "our Discord channel," and (c) "the Discord channel" in different places, even though a Fillout form URL cannot literally be a Discord invite. This is confusing for anyone skimming for the actual Discord invite link and should be clarified/fixed with the team before publishing to a general audience.
- **Two different "expression of interest" URLs exist** for what appears to be the same action (a long Google Forms URL in the handbook vs. the `forms.gle` short link used live on `/research`) — needs verification; if they really are different forms this is a process bug, not just a copy issue.
- **Internal jargon/shorthand** an outside reader will trip on: "PhD+" (used repeatedly, never defined as "PhD-level and above, with exceptions"); "infohazard"/"dual-use" (defined loosely in one clause, "explained more in-depth below," but the promised explanation is thin — a short glossary callout would help); "GRPO" (Group Relative Policy Optimization) appears unexpanded in a section title reference; internal team titles ("Research Operations," "Co-Directors," "Advisory Board") assumed known.
- **Version metadata reads oddly**: "Version: 1.0" dated 29/04/2026, authored by three named individuals including a "Former" co-director — worth checking this is the currently intended live version before publishing, since a "Former" title sitting in an "Authored by" byline can read as stale.
- **Document is long and undifferentiated for its three stated audiences** (researchers, supervisors, outsiders) — nothing marks which sections apply to which audience beyond "For Supervisors," so an outsider has to read supervisor-specific admin detail (GitHub repo setup, check-in form cadence) to reach anything relevant to them.
- **Repeats several facts also stated on the live `/research` page** (mission-adjacent framing, contact email, "supervised" vs "open collaboration" language) with slightly different wording each time — a copywriter reconciling both should pick one canonical phrasing for shared concepts (e.g., what exactly the two "modes" are called) so the site and handbook use identical terms.

---

## 5. `src/components/landing/ResearchPeople.tsx` — landing page component

Renders the same 5 `supervisors` from `research.ts`, styled for the landing page's dark/navy-adjacent context, left-aligned in a wrapping row of 140px square tiles (not the rounded circles/cards seen on `/research`).

- Each tile: 312px small image (`person.imageSmall`), name (serif, with an orange underline rule that draws in on hover/focus), `positionShort` text, whole tile links to `person.agenda` in a new tab.
- Sr-only text: "Research agenda (opens in a new tab)"
- Extensive code comments document the design rationale (squares vs. circles matching the page's square-based system; fixed 140px tiles vs. stretched grid columns for retina-quality images at this size; hover/focus parity; `motion-safe`/`hover: hover` media gating) — these are dev/design notes, not user-facing content, but useful context for a designer maintaining consistency.
- No unique facts beyond what's in `research.ts` — this is a pure reuse of the supervisor list in a different visual treatment.

CRITIQUE: none of the supervisor's institution/role is described in more depth than `positionShort`; a visitor on the landing page who wants more context has no way to get it except clicking through to the agenda Google Doc (which is a work-in-progress doc, not a bio) — there's no supervisor bio page anywhere in the assigned files.

---

## 6. `src/components/landing/FeaturedPublications.tsx` — landing page component

Pulls only the `publications` entries that carry a `featured` object — exactly the first 3 of the 12 in `research.ts` (Anatomy of Alignment / Self-Ablating Transformers / EU-Agent-Bench). Renders them as three cream cards on a navy band.

Per card:
- An SVG illustration, sourced from `/landing/research/{illustration}.svg` where `illustration` is one of `alignment`, `ablation`, `eu-agents` (three distinct static SVG assets, one per featured paper).
- `venueLabel` (e.g. "NeurIPS 2025 workshop · Spotlight")
- The paper's **full** `title` (explicitly not the short `chipTitle` — code comment explains this was fixed because `chipTitle` gave the same paper two different names across pages, and the full title used to live only in an inaccessible `title=` tooltip attribute)
- `summary` (the plain-language one-line takeaway, written specifically for a lay landing-page reader)
- "Read paper" link with an arrow icon → `paper.link`, opens in new tab, `aria-label` includes full title + "(opens in a new tab)"

Design notes in comments: 5-row CSS subgrid keeps plate/venue/title/summary/link aligned across the three cards regardless of copy length; hover raises the plate tint, underlines the title, and nudges the arrow (motion-safe gated); the illustration's tint plate now runs full width of the card (previously double-inset, a since-fixed bug per the comment).

### Assets referenced (hand-drawn SVGs, not Phosphor icons)
- `/landing/research/alignment.svg`
- `/landing/research/ablation.svg`
- `/landing/research/eu-agents.svg`

These three are bespoke illustrative SVGs (one per featured paper), not simple icons — they are illustrations standing in for each paper's concept, not candidates for a Phosphor icon swap. The only Phosphor icon in this component is `ArrowUpRight` (already a proper icon component, not hand-drawn markup).

CRITIQUE: The featured selection is hardcoded to "whichever publications have a `featured` block," which today happens to be the 3 most recent/highest-profile papers — but there's no explicit ordering rule or cap enforced in code (e.g., if a 4th paper is given a `featured` object, the grid layout assumes exactly 3 for its subgrid math). Flag to whoever adds future publications that this must stay curated to 3 or the layout should be revisited.

---

## Phosphor-icon inventory (already-phosphor, no hand-drawn-SVG-to-icon migration needed here)
- `/research/page.tsx`: `Cpu`, `FileText`, `GlobeHemisphereWest`, `UsersThree` (all `@phosphor-icons/react`, used at `weight="light"`)
- `FeaturedPublications.tsx`: `ArrowUpRight` (Phosphor)
- The only non-icon, hand-drawn/bespoke SVG assets in this file group are the three publication illustrations listed above (`alignment.svg`, `ablation.svg`, `eu-agents.svg`) — these are content illustrations, not UI icons, so they should NOT be swapped for Phosphor icons; they need to stay as custom art.

## Images inventory (photographs, not icons)
- 5 supervisor portraits, each in two sizes (800px card / 312px landing circle-tile): Steven Abreu, Fatih Turkmen, Jobst Heitzig, Guillaume Pourcel, Ana Lucic — file paths listed in the supervisors table above. Formats are inconsistent (.webp, .png, .jpg mixed) — worth normalizing format across the set for the redesign.

## Cross-file consistency issues to flag to the copywriter
1. **Two different "research interest" form URLs** exist across the site: `RESEARCH_INTEREST_FORM_URL` (`https://forms.gle/na3wbBR4V1YVHAnFA`, used live on `/research`) vs. the handbook's "Supervised Research – Expression of Interest" Google Form (`https://docs.google.com/forms/d/e/1FAIpQLSedM6m7WjjFmztnBvzsSoFkpi9X7LvMiUv2MtyGNisPXPZNNw/viewform`). Needs confirmation these are the same destination.
2. **Stat "12+ Publications"** on `/research` hero vs. exactly 12 publications in the data file — either drop the "+" or confirm more exist that aren't yet in `research.ts`.
3. **Duplicate CTA panel pair** ("Join as a researcher" / "Become a supervisor") appears twice, verbatim, on the same `/research` page — once mid-page under Supervisors, once at the bottom in the closing CTA band.
4. **The two programme "modes"** (Supervised Research Matching / Open Collaboration) are formally named and defined only in the handbook — the live `/research` page never introduces them as a named pair, just references the underlying actions ("supervised project," "open collaboration") in prose.
5. **"PhD+" jargon** used on both the live page and handbook, never spelled out.
6. **The onboarding-form URL doing triple duty** as "onboarding form" / "Discord channel" / "the Discord channel" in the handbook is a likely error or at least confusing wording that should be resolved with the team, since it isn't a Discord invite link at face value.
