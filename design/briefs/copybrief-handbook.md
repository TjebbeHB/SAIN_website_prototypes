# /research/handbook copy brief

This is a document page, not a marketing page. Shell (announcement, header, footer) plus one calm reading column at `--container-copy` (720px), white ground, hairlines for structure, no photo bands, no orbit ornament fighting the text. One slim inverse close because the page carries a real action (apply). Everything else is reading.

The copy below is the full edited handbook. It preserves every rule, number, form, and deadline from `docs/research_hub_handbook.md` v1.0. It reorders the document into the reader's journey, retitles sections to claims, merges duplicated material, and fixes grammar. Every substantive edit is listed in the edits ledger so a maintainer can verify no policy changed meaning.

## Avatar

**Lena, 24, MSc AI student in Groningen.** She attended one SAIN event, read the /research page, and clicked "Read the research handbook" before deciding whether to apply for supervised research matching. She already knows what AI safety is and roughly what the hub offers. She is deciding three things: whether she is eligible, how many hours a week this will cost her alongside her thesis, and what she is committing to if she starts. She will bounce if the page reads as internal admin she has to wade through (GitHub repo procedure, supervisor form cadence) before finding her own answers, or if she cannot find the time commitment and the contact address within one scroll. A second, quieter reader is a prospective supervisor scanning the same page for reputability: they need to see that the process is real, that expectations are written down, and where their own section is.

## Premises

1. **This is the rulebook for the hub, and it is short enough to actually read.** WHY: the current page is a pasted Word document; the reader's first judgement is "do I have to read all of this?". A TL;DR callout and a journey-shaped table of contents answer that in the first viewport.
2. **You are probably eligible, and you can apply today.** WHY: eligibility (any level, remote fine, no affiliation needed) and the rolling basis are the two facts that unblock an application; they are currently buried mid-document.
3. **The commitment is explicit: agreed hours, a weekly rhythm, Sunday check-ins.** WHY: Lena's real question is cost. Pull-out callouts make time commitment and deadlines findable without reading linearly.
4. **The work is voluntary and educational; SAIN supports it but does not pay for it.** WHY: stating this early is honest and prevents a mismatched application; it also matches the site-wide "free" framing without overclaiming.
5. **Standards are real: integrity, dual-use caution, and a written escalation path.** WHY: this is what makes the hub credible to supervisors and safe for researchers; it is the audit path of the page.
6. **There is one door: research@safeainetherlands.org.** WHY: the original repeats the address eight times because it is the answer to most questions; a callout makes it one findable fact instead of eight scattered ones.

## Page plan

Anchor ids are given per section so the table of contents and any deep links are stable. All body copy is Archivo body role; headings are serif per the type ramp. Kicker budget: one kicker on the whole page (the hero). No em dashes appear anywhere below; keep it that way.

---

### 1. Hero

(a) Question: am I on the reference document for the Research Hub?
(b) Ground: cream (a thin `band-index`-weight band; this is the printed programme, not a marketing hero).
(c) Copy:

- Breadcrumb (label role): `Research hub` (links to /research) ` / Handbook`
- Kicker (serif italic, navy/60): `Research Hub`
- H1 (display, the only display on the page): `The SAIN Research Hub handbook`
- Subheading (body, navy/72): `How research through SAIN works, from first application to published output. It sets out what researchers, supervisors, and the Research Team can expect from each other.`
- Colophon (footnote, navy/60): `Version 1.0 · 29 April 2026 · research@safeainetherlands.org`
- Colophon line 2 (footnote, navy/60): `Written by Alexander Müller (Director), Thomas Brcic (Former SAIN Groningen Co-Director), and Ilija Lichkovski (Research Lead).`

(d) Geometry: thin index band; copy column only, no illustration. The colophon sits under a 1px navy/10 rule, the way a printed document carries its imprint.

---

### 2. The short version (callout) + table of contents

(a) Question: what do I need to know if I read nothing else, and where is my section?
(b) Ground: white. The callout is a cream aside inside the reading column, 1px navy/14 hairline, no shadow, square corners.
(c) Copy:

**Callout, labelled with a kicker-sm serif italic line:** `The short version`

- `Anyone with sufficient background can take part: Bachelor's, Master's, or PhD students, industry researchers, and people with no formal affiliation. Remote participation works.`
- `Applications are rolling. Apply at any time; for supervised research matching we reply within a working week.`
- `Participation is voluntary and educational. SAIN does not pay stipends or salaries, but supports projects with compute and, within reason, conference and travel costs.`
- `One address for everything: research@safeainetherlands.org.`

**Table of contents.** Heading (heading-sm): `Find the part that applies to you`
Intro line (body): `The handbook follows the life of a project. Start where you are.`

1. `What the Research Hub is for` → #purpose
2. `Before you apply` → #before-you-apply
3. `From application to running project` → #getting-started
4. `During the project` → #during-the-project
5. `Finishing and publishing` → #publishing
6. `If something goes wrong` → #escalation
7. `If you supervise` → #supervisors

(d) Geometry: the TOC is a numbered hairline list (1px navy/10 rules between rows, index numerals in Archivo at the index role, orange-ink when hovered/active). At xl the designer may additionally float a quiet sticky mini-TOC in the left margin outside the copy column; it must stay label-size navy/60 links, no card, no fill.

---

### 3. What the Research Hub is for (#purpose)

(a) Question: what is this hub, and would my topic count?
(b) Ground: white.
(c) Copy:

H2 (heading): `What the Research Hub is for`

Body: `SAIN exists to raise awareness of the full spectrum of existing and potential harms from AI, contribute to shaping mitigation priorities through ongoing discourse, and support the realisation of effective solutions. The Research Hub is where that turns into research: a platform where supervisors, collaborators, and students connect to advance AI safety work on a global and interdisciplinary scale.`

Body: `This handbook applies to researchers and students working under the hub, supervisors affiliated with SAIN, collaborators and visiting researchers on open projects, and anyone outside SAIN who wants to understand how the hub runs.`

H3 (heading-sm): `Almost any topic counts, if it reduces AI-related risk`

Body: `We welcome any project that meaningfully contributes to AI safety: technical, governance, or conceptual. If you are unsure whether a topic counts, the default answer is yes, provided you can articulate a plausible pathway from your work to reducing AI-related risk. We mean risk broadly: risk to lives, to equality, to rights. To make the scope concrete, the hub especially encourages work in the following areas, without being limited to them.`

List heading (title-sm): `Technical alignment and interpretability`
- `Mechanistic interpretability`
- `Representation learning and feature sparsity for safer control`
- `Steering and controllability of LLMs and other foundation models`
- `Adversarial robustness and red-teaming of models`
- `Detection and mitigation of deceptive or misaligned behaviours`
- `Scalable oversight, debate, constitutional AI, and related methods`
- `Robustness of RL agents and multi-agent systems`
- `Safety benchmarks and evaluation metrics`
- `Agent foundations`
- `Neuroscience-inspired alignment`

List heading (title-sm): `Societal impacts, governance, and policy`
- `AI governance, regulation, and standards, with emphasis on the EU and Dutch context`
- `AI and democratic processes: misinformation, polarisation, information integrity`
- `AI and labour: job displacement, economic and social impacts`
- `Privacy, surveillance, and data protection in AI deployment`
- `Risk assessment for high-stakes domains such as CBRN, cybersecurity, and critical infrastructure`

List heading (title-sm): `Meta and foundational topics`
- `Research methodology and evaluation in AI safety`
- `Benchmarking AI systems' persistence, persuasion, or autonomy`
- `Forecasting and scenario analysis for transformative AI`
- `Epistemics, information hazards, and responsible communication in AI safety`

H3 (heading-sm): `Four principles hold on every project`

1. `Intellectual honesty. Always communicate accurately what is known, unknown, and uncertain.`
2. `Proactively consider near-term and long-term harms, as well as dual-use concerns: ways the same work could both protect and cause harm. Section 4 covers this in depth.`
3. `Maintain a supportive environment across disciplines and seniority levels. There is zero room for harmful authority.`
4. `Feedback, critique, and review are essential tools, not personal attacks. When receiving feedback, remember it is aimed at the work. When giving it, attack the ideas, not the person.`

Body: `Be extra wary of these principles when deadlines approach. Everyone is fallible, and when compromising on a principle is the difference between publishing and not publishing, holding the principle matters more than the publication.`

(d) Geometry: plain reading column. The three topic lists are the schedule-like material on this page; set them as three stacked hairline lists (title-sm heading over a bulleted list), never as a card grid. The four principles are a numbered list with orange-ink numerals in the course-outline-row treatment.

---

### 4. Before you apply (#before-you-apply)

(a) Question: which of the two routes is mine, am I eligible, and when can I apply?
(b) Ground: white.
(c) Copy:

H2 (heading): `Before you apply`

H3 (heading-sm): `There are two ways to do research through SAIN`

Body: `The hub currently runs in two modes. Everything later in this handbook applies to both unless it says otherwise.`

Numbered pair (title-sm titles, body descriptions):

1. `Supervised research matching.` `Students and early-career researchers apply for a guided project with mentorship from one of SAIN's supervisors. SAIN provides logistical and financial support, such as compute, and projects aim to evolve into publishable research. Supervisors are experienced researchers with an interest or track record in AI safety, usually at PhD level or more senior (we write this as PhD+ below), though exceptions are possible. We welcome supervisors from any discipline.`
2. `Open collaboration.` `Not all research needs formal supervision. SAIN connects researchers directly and provides support, such as compute, so you can focus on the work. If you have a research proposal, submit it via the form on our website. If you want to join an existing project, reach out to that project's contact person. Nobody plays the supervisor role on these projects, but one person leads, usually whoever designed the project.`

H3 (heading-sm): `Anyone with sufficient background is eligible`

- `Both modes are open to anyone with sufficient background: Bachelor's, Master's, and PhD students, researchers from industry, and people with no formal affiliation.`
- `Remote participation works.`
- `To become a supervisor, we mostly ask that you are PhD+, though in exceptional cases this can differ.`

H3 (heading-sm): `You can apply at any time`

- `The hub works on a rolling basis. Apply whenever you are ready; if there is an opportunity and you are a good fit, you will be accepted.`
- `For supervised research matching, we get back to you within a working week.`
- `For starting an open collaboration, we appreciate a fully fleshed-out proposal before you contact us, but if necessary we can help shape it.`

**Callout (cream aside, kicker-sm label):** `Time commitment`
`Hours are agreed per project before it starts, together with the meeting cadence. Projects range from roughly 5 to 10 hours per week to near full-time. Say what you can give; the scope is set to match.`

(d) Geometry: the two modes are peers and must read as one decision, not two cards: two numbered blocks sharing a left hairline, serif numerals doing the wayfinding. The callout sits directly after the eligibility list, right-of-mind where Lena is doing the maths.

---

### 5. From application to running project (#getting-started)

(a) Question: what happens between my first form and my first working week?
(b) Ground: white.
(c) Copy:

H2 (heading): `From application to running project`

H3 (heading-sm): `Onboarding starts with one form`

Body: `Every new researcher gets a rough overview of current projects, groups, and supervisors, an explanation of this handbook and where it lives, and, if relevant, access to compute or other support. Join our Discord by filling in the onboarding form; the invite and the information above follow from there.`
Inline link (label + ArrowUpRight): `Fill in the onboarding form` → https://sainonboard.fillout.com/new (new tab)

H3 (heading-sm): `Open collaborations begin with a research proposal`

Body: `Before a project is approved as a Research Hub open collaboration, the researcher completes a research proposal. The full structure below is only needed when the goal is a full paper and collaboration; for other outputs, drop what you think is unnecessary. A mechanistic interpretability tool, for example, does not need a title and abstract.`

- `Title, problem statement, and motivation`
- `Background and related work`
- `Research questions and hypotheses`
- `Proposed methodology`
- `Safety and risk considerations: dual-use, misuse, and infohazards, meaning information that could cause harm if widely shared`
- `Needed resources: potential datasets, compute estimates, and how many collaborators for how much time`
- `Timeline and milestones`
- `Expected outputs`

Body: `SAIN's Research Team reviews the proposal and either approves it as a Research Hub project, with or without revisions, or declines it.`

H3 (heading-sm): `Supervised matching begins with an expression of interest`

Body: `For supervised research matching, or to join an existing open collaboration, fill in the expression of interest form or email research@safeainetherlands.org.`
Inline link (label + ArrowUpRight): `Fill in the research form` → https://docs.google.com/forms/d/e/1FAIpQLSedM6m7WjjFmztnBvzsSoFkpi9X7LvMiUv2MtyGNisPXPZNNw/viewform (new tab; see Open facts, this URL must be reconciled with the forms.gle link used on /research before ship)

H3 (heading-sm): `What happens once you are approved`

- `You are brought into contact with the relevant people. For supervised matching, a supervisor is formally assigned and a project channel is created in the Discord. For joining an existing open project, you are officially added to the project and its Discord channel. For a new open project, we add it to our website, add you to the Discord, and promote the project so others can join.`
- `Expectations around time commitment (for example 5 to 10 hours per week versus near full-time) and meeting cadence are set. We encourage communication through the Discord, which you join via the onboarding form; other channels can be agreed if preferred.`
- `The project is registered internally and kept up to date as it progresses.`
- `Where applicable, the Research Team sets up a GitHub repository under the SAIN organisation and gives project members access.`

(d) Geometry: this is the stepped-journey material, but on a light document page: keep the inverse step-list device out, and instead let the three heading-sm turns carry the sequence, with the proposal elements as a single hairline checklist (course-outline rows, orange-ink numerals suit the checklist reading).

---

### 6. During the project (#during-the-project)

(a) Question: what does a normal week look like, and what am I responsible for?
(b) Ground: white.
(c) Copy:

H2 (heading): `During the project`

H3 (heading-sm): `Researchers drive the work; supervisors steer it`

Body: `Three roles keep a project moving, and each owes the others something concrete.`

Sub-block (title-sm): `Researchers and students are expected to`
- `Take primary responsibility for the day-to-day progress of the project.`
- `Show up to supervisor meetings prepared, with a clear agenda, results, or specific questions.`
- `Fill in the weekly check-in form.`
- `Communicate early about blockers or personal constraints.`
- `Follow SAIN's core principles (section 1).`

Sub-block (title-sm): `Supervisors are expected to`
- `Provide regular guidance and mentorship, and high-level project direction, stepping in where needed.`
- `Help ensure the project is well-scoped and realistic.`
- `Meet at the agreed frequency, usually weekly or biweekly, and show up prepared.`
- `Give timely feedback on drafts and research directions.`
- `Watch out for projects stuck in unproductive directions, and for researcher wellbeing issues such as stress or burnout.`
- `Raise concerns with the Research Lead or team where appropriate.`

Sub-block (title-sm): `The Research Team is responsible for`
- `Maintaining up-to-date documentation, including this handbook.`
- `Onboarding new researchers and supervisors.`
- `Keeping track of Research Hub projects and outputs.`
- `Acting as the contact point, via research@safeainetherlands.org or the Discord.`
- `Project management, unblocking, and research support sit here too; direct your questions to the Research Team first.`

H3 (heading-sm): `The rhythm is weekly`

Body: `During a project, the standard pattern is:`
- `Weekly or biweekly meetings: discuss recent progress and blockers, refine direction and scope, review experiments, results, and drafts.`
- `Weekly check-ins: a short form noting what was tried, progress, and next steps. It keeps accountability light and lets the team see how projects are going.`
- `Contact with the Research Team whenever necessary, via research@safeainetherlands.org or the Discord.`

**Callout (cream aside, kicker-sm label):** `Deadlines`
- `Researchers: fill in the weekly check-in form every Sunday.` Inline link: `Weekly check-in form` → https://docs.google.com/forms/d/1Uu4JrMh9j6iNa4seeIyqPnkCtikFXPgT8-pUPnwzVVE/ (new tab)
- `Supervisors: fill in the bi-weekly check-in form every second Sunday.` Inline link: `Bi-weekly check-in form` → https://docs.google.com/forms/d/1bBQ8jstIOWAFzOuskhLMv9lnGvcU87ZTtSSKo8mni9o/edit (new tab)

H3 (heading-sm): `Communicate early, precisely, and kindly`

- `Use the agreed channels, ideally the Discord, for project communication.`
- `Respond within a reasonable timeframe: 2 to 3 working days for non-urgent matters.`
- `Meetings are the supervised researcher's responsibility: have a simple agenda, start with a brief update since last time (the weekly check-in helps you keep track), and end with concrete next steps.`
- `Be explicit about availability: travel, family time, exam periods.`
- `Default to kind, precise, and honest communication.`

H3 (heading-sm): `Agree milestones up front`

Body: `Each project should specify intermediate milestones. As an example, not a fixed rule:`
- `Weeks 1 to 3: getting to know each other and the project, literature review.`
- `Weeks 4 to 8: first experimental proof of concept.`
- `Weeks 8 to 10: internal discussion of initial results and what to improve.`
- `Weeks 10 to 12: implementing improvements, new results.`
- `Weeks 12 to 14: writing up the final report and submission.`

H3 (heading-sm): `SAIN supports the work but does not pay for it`

Body: `This applies mostly to technical projects.`
- `SAIN does not provide stipends or salaries. Participation is voluntary and educational.`
- `If funding for conference trips, workshop registrations, or travel is needed, we may be able to help within reason.`
- `Once a project is specified, the Research Team strives to give it easy access to compute and other resources. How much compute SAIN can help with depends on the project and is agreed at the start.`
- `We encourage computationally inexpensive projects wherever possible.`

H3 (heading-sm): `Integrity, AI tools, and dual-use`

Sub-block (title-sm): `Integrity`
- `Cite sources properly, after making sure you know what they actually say, and avoid plagiarism.`
- `Be honest about experimental results, limitations, and negative findings.`
- `Keep enough documentation that others could roughly reproduce your work.`

Sub-block (title-sm): `Responsible use of AI tools`
- `We are not against using AI tools such as LLMs for coding or writing. Where a researcher has considered it carefully and it clearly helps, we encourage it. However:`
- `Always check outputs carefully. Do not uncritically trust generated content.`
- `Avoid feeding sensitive or confidential data into tools unless you are confident they handle data responsibly.`
- `Where relevant, disclose your use of AI tools.`

Sub-block (title-sm): `Dual-use and infohazards`
Body: `Work on AI safety can have paradoxical effects: it can make AI systems, the AI ecosystem, or people inside it less safe. These effects can play out in complex ways that are impossible to fully foresee. At minimum, spend some time thinking about whether your work could significantly increase capabilities or misuse risk if widely shared.`
- `If in doubt, discuss it with your supervisor and/or SAIN's Research Lead before public dissemination.`
- `Possible mitigations: redacting sensitive details, internal-only or restricted-access reports, or delaying publication until the risks are better understood.`

H3 (heading-sm): `Understanding matters more than publishing`

Body: `The Research Hub should be a place where personal wellbeing is taken seriously and support is there for anyone who needs it. AI safety research, like any research, can be intellectually and emotionally demanding, especially under the publish-or-perish pressure that is unfortunately far too common.`
- `Be honest about workload and stress levels with your supervisor, and supervisors with their researchers.`
- `Take regular breaks and keep boundaries between work and rest.`
- `Remember that what matters most is gaining a better understanding of AI safety, not whether one publishes.`
- `Speak to the SAIN team if conflicts or issues arise.`

(d) Geometry: the longest chapter of the document; the heading-sm turns are the reader's handholds, so keep generous space above each. The three role sub-blocks are peers: same title-sm role, same list treatment, one shared left hairline. The deadlines callout is the single most-searched fact block on the page; it must survive skim-reading, so it sits flush after "The rhythm is weekly".

---

### 7. Finishing and publishing (#publishing)

(a) Question: when is a project done, what counts as output, and who gets credit?
(b) Ground: white.
(c) Copy:

H2 (heading): `Finishing and publishing`

H3 (heading-sm): `A project is complete when the question is answered`

- `The main research question has been adequately addressed, including negative or null results, and the work has been published somewhere in a presentable form.`
- `If relevant, infohazard and dual-use considerations have been treated appropriately.`

H3 (heading-sm): `Final deliverables can take several forms`

Body: `Each project specifies one or more final deliverables. For instance:`
- `A research paper at a conference, journal, or workshop.`
- `A blog post on SAIN's Substack and/or LessWrong.` Inline link: `SAIN's Substack` → https://aisig.substack.com/ (new tab)
- `A policy brief.`

H3 (heading-sm): `Authorship reflects contribution`

- `Authorship should reflect substantial intellectual and implementation contributions.`
- `Author order is handled internally within the project team.`
- `SAIN and the Research Hub should be acknowledged in publications.`
- `SAIN may promote your work as enabled by the Research Hub.`

H3 (heading-sm): `After the project`

- `Output and other relevant resources, such as data, code, notes, and drafts, are stored in SAIN's project archive.` Inline link: `SAIN's project archive` → https://safeainetherlands.org/research#:~:text=Research%20from%20our%20community
- `Write a short note on what went well and what could have gone better, ideally shared with the SAIN community.`
- `The project may be extended as a follow-up.`

(d) Geometry: plain reading column, hairline lists. No publication cards here; the published work itself lives on /research, and this section links to it once.

---

### 8. If something goes wrong (#escalation)

(a) Question: who do I tell, in what order, and what can happen?
(b) Ground: white.
(c) Copy:

H2 (heading): `If something goes wrong`

Body: `We hope you never need this section, but it matters that the path is written down before anyone needs it.`

H3 (heading-sm): `When to notify someone`

- `A supervisor or researcher relationship breaks down, for example through persistent unavailability or unresolved conflict.`
- `There is suspected misconduct, such as data falsification, harassment including sexual harassment, or plagiarism.`
- `There are serious concerns about whether the project's direction is still aligned with AI safety.`
- `Project scope, expectations, or time commitments have become misaligned.`

H3 (heading-sm): `The path runs from direct to leadership`

1. `Researcher and supervisor: try to resolve it directly first.`
2. `SAIN's Research Lead, or anyone in the Research Team.`
3. `SAIN's Co-Directors, if the conflict involves the Research Lead or the Research Team.`

**Callout (cream aside, kicker-sm label):** `You may skip levels`
`If at any stage you feel unsafe, or face harassment you do not feel comfortable raising with the person involved, skip levels and contact SAIN leadership directly.`

H3 (heading-sm): `Possible remedies and sanctions`

Body: `Depending on the severity and nature of the issue, possible actions include:`
- `Clarifying expectations and adjusting milestones.`
- `Reassigning the supervisor or researcher to another project.`
- `Re-scoping or pausing the project.`
- `Removal from the Research Hub, or from SAIN roles, in severe cases.`

**Callout (cream aside, kicker-sm label):** `Who to contact`
`For anything in this handbook, applications, project questions, concerns: research@safeainetherlands.org. It reaches the Research Lead and Research Operations, who handle project management, unblocking, and support.`

(d) Geometry: the escalation path is a genuine three-step sequence: serif numerals beside the steps (light-ground variant, navy at 40%), no spine needed at this length. The skip-levels callout must not be visually subordinate to the numbered path; place it directly after the path at full column width.

---

### 9. If you supervise (#supervisors)

(a) Question: I supervise (or want to); what is my procedure?
(b) Ground: white.
(c) Copy:

H2 (heading): `If you supervise`

Body: `Supervisor expectations are in section 4. The administrative procedure for a supervised project is:`

- `The research proposal is prepared as described in section 3.`
- `Researchers are assigned to supervisors and projects.`
- `The supervisor sends the research proposal, together with the list of researchers on the project, to research@safeainetherlands.org. Include contact details, and each researcher's Discord username and GitHub username where applicable, as a minimum.`
- `If applicable, a repository is created in the SAIN GitHub organisation, and researchers and supervisors get collaborator access.`
- `Every Sunday, researchers fill in the weekly check-in form; every second Sunday, the supervisor fills in the bi-weekly check-in form. Both forms are linked under Deadlines in section 4.`

Body: `Interested in supervising AI safety research through SAIN? We mostly ask that you are PhD+, exceptions possible, and we welcome any discipline.`
CTA (outline ink): `Become a supervisor` → mailto:research@safeainetherlands.org?subject=Research%20Hub%3A%20becoming%20a%20supervisor

(d) Geometry: a short procedural checklist in course-outline rows; the one outline-ink CTA closes the section on the left edge of the column.

---

### 10. Close

(a) Question: I have read enough; how do I start?
(b) Ground: inverse navy (`band-close` weight).
(c) Copy:

Closing claim (closing role, white): `The hub is open on a rolling basis.`
Invitation line (body, white/75): `Apply whenever you are ready. If there is an opportunity and you are a good fit, you will be accepted.`
CTAs, right side:
- Accent fill: `Fill in the research form` → the expression of interest form (same URL as section 5; must match whatever URL /research ships, see Open facts)
- Ghost on inverse: `Become a supervisor` → mailto:research@safeainetherlands.org?subject=Research%20Hub%3A%20becoming%20a%20supervisor

(d) Geometry: the standard close banner: claim left, one accent CTA and one ghost CTA right. Nothing else; the document has already made the argument.

---

## Facts ledger

Every fact above traces to `docs/research_hub_handbook.md` (v1.0, 29/04/2026) unless noted:

- Version 1.0, date 29/04/2026, authors Alexander Müller (Director), Thomas Brcic (Former SAIN Groningen Co-Director), Ilija Lichkovski (Research Lead): handbook front matter.
- Mission sentence; audience list; scope bucket lists (all items); default-yes rule and broad risk definition; four core principles and the deadline warning: handbook "Purpose, Principles, and Scope".
- Two programme modes and their definitions; eligibility (all levels, industry, no affiliation, remote, supervisors mostly PhD+ with exceptions, any discipline): handbook "Structure".
- Rolling basis; reply within a working week for supervised matching; fully fleshed-out proposal preference with help available: handbook "Application Requirements and Criteria".
- Onboarding contents and form URL https://sainonboard.fillout.com/new: handbook "Onboarding" (also inventory-research.md section 4).
- Proposal elements (8), Research Team review and approve/decline: handbook "Research Proposal Stage".
- Expression of interest form URL (long Google Forms URL) and email alternative: handbook "Research Proposal Stage"; discrepancy with `RESEARCH_INTEREST_FORM_URL` (https://forms.gle/na3wbBR4V1YVHAnFA) per inventory-research.md.
- Assignment and setup bullets, time commitment example "5-10h/week vs. near full-time", GitHub org repo setup: handbook "Assignment & Setup".
- Weekly/biweekly meetings and progress forms; contact routes: handbook "Execution Phase".
- Weekly check-in form URL (Sundays, researchers) and bi-weekly form URL (every second Sunday, supervisors): handbook "For Supervisors".
- Roles/expectations for researchers, supervisors, Research Team; Research Lead and Research Operations as primary contact: handbook "Roles and Responsibilities" + "Expectations and Standards".
- Example milestone timeline (weeks 1-14); deliverable types; Substack URL https://aisig.substack.com/; authorship and credit rules: handbook "Deliverables and Milestones".
- No stipends/salaries; travel help within reason; compute per project; prefer computationally inexpensive projects: handbook "Funding, Support, and Constraints".
- Communication norms including 2-3 working days: handbook "Communication Norms".
- Integrity, AI-tool, dual-use/infohazard content and mitigations: handbook "Research Integrity, Safety, and Ethics".
- Wellbeing content including publish-or-perish note: handbook "Wellbeing and Support".
- Escalation triggers, three-level path, skip-levels clause, sanctions list: handbook "Escalation, Conflict Resolution, and Sanctions".
- Completion criteria; project archive URL (text-fragment link to /research publications); retro note; follow-up: handbook "Completion Phase" + "Post-Project".
- research@safeainetherlands.org and mailto subject lines: handbook + `src/data/research.ts` constants per inventory-research.md.
- CTA labels "Become a supervisor", "Read the research handbook": design.md shipped label list. "Fill in the research form": current /research page per inventory-research.md.

## Open facts

- **Which expression-of-interest URL is canonical.** The handbook uses the long Google Forms URL; the live /research page uses https://forms.gle/na3wbBR4V1YVHAnFA. If they are not the same form, applicants are being split across two intakes. Confirm with the team; ship one URL in both places. The brief uses the handbook's URL as the source-faithful default.
- **A real Discord invite.** The handbook labels the Fillout onboarding form as "our Discord channel" in three places. The copy above says "join the Discord via the onboarding form", which is true to the actual URL, but if a direct invite exists the team may prefer to link it.
- **Whether v1.0 / 29-04-2026 is the current handbook version**, and whether the byline should still list a "Former" co-director. The page works with the colophon as written; update it when the team confirms.
- **Whether "the form on our website" (open collaboration proposals) is the same expression-of-interest form or a separate proposal intake.** The handbook says "submit it via the form on our website" without a URL. The copy keeps the reference generic; the designer should link whichever form the team confirms.
- **The canonical mission wording.** The handbook's mission sentence uses "realization"; the brief britishises it to "realisation" per design.md. Confirm this matches the wording /about ships, so the mission reads identically everywhere.

## Kill list

Must not survive from the current page:

- The undifferentiated wall-of-Word rendering: no TOC, no callouts, no anchors. The re-architecture above replaces it.
- "Discord channel" as the link text for the Fillout onboarding form. Always "onboarding form" or "join the Discord via the onboarding form".
- "PhD+" undefined. Defined once at first use, then usable.
- "Comprehensive guide" throat-clearing ("It functions as a comprehensive guide for expectations, processes, and norms related to...") and "Although later sections spell roles and responsibilities out in more detail, we briefly cover them here as well."
- The broken wellbeing opener ("We hope that people in the SAIN Research Hub is a place where personal wellbeing is something that is taken seriously").
- The escaped exclamation "you will be accepted\!".
- Duplicated statements of the meeting cadence, contact email, and progress-form obligation scattered across four sections; each now lives once, with cross-references.
- Any em dash or en dash as a separator (the source uses spaced hyphens in "Supervised Research - Expression of Interest"; keep hyphens only).
- US spellings: behaviors, labor, polarization, prioritize, organization.
- No invented stats, testimonials, or timelines; the page carries none and must stay that way.

## Edits ledger (every substantive edit, for maintainer verification)

Reordering and structure:
1. Document regrouped into 7 journey chapters + close; original section order was Purpose → Structure → Lifecycle → Expectations → Deliverables → Funding → Communication → Integrity → Wellbeing → Escalation. No rule was moved out of the document; the mapping is given per section above.
2. "Expectations and Standards" (researchers/supervisors/Research Team) merged with the "Roles and Responsibilities" preview into one block in section 6 ("During the project"). The preview's unique fact (Research Lead and Research Operations handle project management, unblocking, support; primary contact research@) is preserved in the Research Team sub-block and the contact callout.
3. "Deliverables and Milestones" split: intermediate milestones stay in "During the project"; final deliverables and authorship move to "Finishing and publishing". All items intact.
4. The two check-in form links moved from the "For Supervisors" sub-procedure into the Deadlines callout in section 6, because researchers are the ones who must find the weekly form; the supervisor procedure now cross-references the callout. Cadence unchanged (researchers weekly Sundays; supervisors every second Sunday).
5. "For Supervisors" becomes its own end-chapter ("If you supervise") and absorbs the become-a-supervisor ask (from /research page copy) with the shipped `Become a supervisor` mailto.
6. The skip-levels harassment clause promoted from a trailing paragraph to a callout so it cannot be missed. Wording preserved in meaning.

Retitling (original → new; all are label changes only):
7. "Purpose, Principles, and Scope" → "What the Research Hub is for"; "Mission and Research Scope" → "Almost any topic counts, if it reduces AI-related risk"; "Core principles" → "Four principles hold on every project".
8. "Structure of the SAIN Research Hub" / "Program Modes" → "Before you apply" / "There are two ways to do research through SAIN"; "Eligibility" → "Anyone with sufficient background is eligible"; "Application Requirements and Criteria" → "You can apply at any time".
9. "Research Lifecycle at SAIN" → "From application to running project"; "Research Proposal Stage" → "Open collaborations begin with a research proposal" plus "Supervised matching begins with an expression of interest"; "Assignment & Setup" → "What happens once you are approved".
10. "Execution Phase" → "The rhythm is weekly"; "Communication Norms" → "Communicate early, precisely, and kindly"; "Funding, Support, and Constraints" → "SAIN supports the work but does not pay for it"; "Wellbeing and Support" → "Understanding matters more than publishing"; "Completion Phase" → "A project is complete when the question is answered"; "Escalation, Conflict Resolution, and Sanctions" → "If something goes wrong".

Wording (meaning-preserving edits):
11. Every "Discord channel" link on https://sainonboard.fillout.com/new relabelled to the onboarding form, with "join the Discord via the onboarding form" phrasing. URL unchanged.
12. "PhD+" glossed at first use as "at PhD level or more senior (we write this as PhD+ below), though exceptions are possible". This restates the handbook's own "often PhD+, but with exceptions".
13. "dual-use concerns (explained more in-depth below)" → inline gloss "ways the same work could both protect and cause harm" plus a cross-reference; "infohazards" glossed as "information that could cause harm if widely shared". Added glosses, no policy change.
14. "Open Collaboration Opportunities" shortened to "Open collaboration" as the mode name (the handbook itself alternates); "Supervised Research Matching" kept, sentence-cased.
15. Mission sentence: "realization" → "realisation" (British spelling; see Open facts). US spellings normalised throughout (behaviours, labour, polarisation, prioritise, organisation).
16. Wellbeing opener grammar repaired: "We hope that people in the SAIN Research Hub is a place where personal wellbeing is something that is taken seriously, and that support is there for anyone that needs it" → "The Research Hub should be a place where personal wellbeing is taken seriously and support is there for anyone who needs it."
17. AI-tools data caution grammar repaired: "tools which you aren't sure of have a responsible way of dealing with data" → "unless you are confident they handle data responsibly".
18. "(sexual) harassment" → "harassment including sexual harassment".
19. Dual-use paragraph tightened: dropped "perhaps somewhat cynically" and "Please do not underestimate in what a complex manner these paradoxical effects may take place" merged into "These effects can play out in complex ways that are impossible to fully foresee." Obligation ("at the very least be aware... spend some time thinking") preserved as "At minimum, spend some time thinking about...".
20. Escalation preamble shortened: "Although we hope it will not happen, it is nonetheless important to make it clear when one should consider notifying someone..." → "We hope you never need this section, but it matters that the path is written down before anyone needs it."
21. "you will be accepted\!" → "you will be accepted." (escape artifact and exclamation removed).
22. The TL;DR callout, TOC, time-commitment callout, deadlines callout, and contact callout are new copy that only restates facts already in the handbook (eligibility, rolling basis, one-week reply, no stipends, compute/travel support, 5-10h vs near full-time, Sunday cadences, research@ address). No new claims.
23. Week ranges rewritten "Week 1-3" → "Weeks 1 to 3" etc. (no hyphen ranges that could read as dashes; values unchanged).
24. Hero subheading and section transition sentences ("Three roles keep a project moving...", "Everything later in this handbook applies to both unless it says otherwise.") are new connective tissue, no new facts.

Nothing was cut outright except throat-clearing named in the kill list; every rule, list item, URL, cadence, and number in the source appears above exactly once.
