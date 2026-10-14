import type { ReactNode } from "react";
import type { Metadata } from "next";
import Link from "next/link";

import HandbookToc, { type TocItem } from "@/components/handbook/HandbookToc";
import Reveal from "@/components/landing/Reveal";
import {
  Bullets,
  Callout,
  InLink,
  NumberedSteps,
  OutLink,
  OutlineList,
  P,
  Rail,
  SubTitle,
  Turn,
} from "@/components/handbook/prose";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import {
  RESEARCH_EMAIL,
  RESEARCH_INTEREST_FORM_URL,
  SUPERVISOR_INTEREST_FORM_URL,
} from "@/data/research";

export const metadata: Metadata = {
  title: "Project Hub handbook",
  description:
    "How research through SAIN works, from first application to published output: eligibility, time commitment, standards, and the escalation path.",
  alternates: { canonical: "/research/handbook" },
};

/* The handbook is a document, not a marketing page.

   One reading column at --container-copy, white ground, hairlines for
   structure, no photo bands and no orbit ornament competing with the text. The
   only two grounds that are not white are the cream imprint band at the top,
   which is where a printed programme carries its version and its authors, and
   the one inverse close, which the page has earned because it ends in a real
   action.

   The source document (docs/research_hub_handbook.md, v1.0) stays the
   canonical record. This page is the same policy reordered into the reader's
   journey: every rule, number, form and deadline from v1.0 appears here
   exactly once, which is why the cross-references below are links rather than
   repetitions. */

const ONBOARDING_FORM_URL = "https://sainonboard.fillout.com/new";
/* Responder paths, not editor paths. The source document recorded these two
   forms by their document ids, which Google resolves to the editor: a
   researcher without edit rights lands on "You need permission", and the
   page's headline weekly obligation stops working. /viewform is the path a
   respondent gets. Both still need one signed-out check by the team, and if
   either form is not shared with responders the callout should route through
   research@safeainetherlands.org instead of linking a form that 403s. */
const WEEKLY_CHECKIN_URL =
  "https://docs.google.com/forms/d/1Uu4JrMh9j6iNa4seeIyqPnkCtikFXPgT8-pUPnwzVVE/viewform";
const BIWEEKLY_CHECKIN_URL =
  "https://docs.google.com/forms/d/1bBQ8jstIOWAFzOuskhLMv9lnGvcU87ZTtSSKo8mni9o/viewform";
const SUBSTACK_URL = "https://aisig.substack.com/";
/* The archive is the publications list on /research, so this stays on the
   site: an internal route and a real element id, not a text fragment that no
   longer matches and sends a reader off a preview build to production. */
const PROJECT_ARCHIVE_URL = "/research#publications";

/* The handbook follows the life of a project, so the contents does too. These
   ids are the page's stable deep links; the sticky rail at xl reads the same
   list. */
const contents: TocItem[] = [
  { id: "purpose", title: "What the Project Hub is for" },
  { id: "before-you-apply", title: "Before you apply" },
  { id: "getting-started", title: "From application to running project" },
  { id: "during-the-project", title: "During the project" },
  { id: "publishing", title: "Finishing and publishing" },
  { id: "escalation", title: "If something goes wrong" },
  { id: "supervisors", title: "If you supervise" },
];

const technicalTopics = [
  "Mechanistic interpretability",
  "Representation learning and feature sparsity for safer control",
  "Steering and controllability of LLMs and other foundation models",
  "Adversarial robustness and red-teaming of models",
  "Detection and mitigation of deceptive or misaligned behaviours",
  "Scalable oversight, debate, constitutional AI, and related methods",
  "Robustness of RL agents and multi-agent systems",
  "Safety benchmarks and evaluation metrics",
  "Agent foundations",
  "Neuroscience-inspired alignment",
];

const societalTopics = [
  "AI governance, regulation, and standards, with emphasis on the EU and Dutch context",
  "AI and democratic processes: misinformation, polarisation, information integrity",
  "AI and labour: job displacement, economic and social impacts",
  "Privacy, surveillance, and data protection in AI deployment",
  "Risk assessment for high-stakes domains such as CBRN, cybersecurity, and critical infrastructure",
];

const metaTopics = [
  "Research methodology and evaluation in AI safety",
  "Benchmarking AI systems' persistence, persuasion, or autonomy",
  "Forecasting and scenario analysis for transformative AI",
  "Epistemics, information hazards, and responsible communication in AI safety",
];

const proposalElements = [
  "Title, problem statement, and motivation",
  "Background and related work",
  "Research questions and hypotheses",
  "Proposed methodology",
  "Safety and risk considerations: dual-use, misuse, and infohazards, meaning information that could cause harm if widely shared",
  "Needed resources: potential datasets, compute estimates, and how many collaborators for how much time",
  "Timeline and milestones",
  "Expected outputs",
];

/* A chapter of the document: an h2 turn under the rule that separates it.

   The numeral above the heading is the index role doing wayfinding, the same
   two digits the contents list and the rail carry. It exists because the
   document cross-references itself by number, and a reader who has scrolled
   past a heading needs a visible referent to know they are in section 4. It is
   not a kicker: Poppins at the index role, never serif, never a sentence. */
function Chapter({
  id,
  index,
  title,
  children,
}: {
  id: string;
  index: number;
  title: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="scroll-mt-32 border-t border-navy/10 pt-10"
    >
      <p
        aria-hidden="true"
        className="font-sans text-index tabular-nums text-navy/50"
      >
        {String(index).padStart(2, "0")}
      </p>
      <h2
        id={`${id}-heading`}
        className="mt-2 font-serif text-heading text-navy"
      >
        {title}
      </h2>
      <div className="mt-6 flex flex-col gap-6">{children}</div>
    </section>
  );
}

/** One of the three scope buckets: a title-sm heading over its own hairline. */
function TopicList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="border-t border-navy/10 pt-4">
      <SubTitle>{title}</SubTitle>
      <div className="mt-3">
        <Bullets items={items} />
      </div>
    </div>
  );
}

export default function ResearchHubHandbookPage() {
  return (
    <>
      {/* The imprint band. Cream, thin, and no illustration: this is the
          printed programme's title page, and what a reader needs from it is
          the claim, the premise, and who wrote it when. */}
      <section
        aria-labelledby="handbook-heading"
        className="border-b border-navy/10 bg-cream"
      >
        <div className="shell band-index">
          <div className="max-w-copy-wide">
            <nav aria-label="Breadcrumb" className="font-sans text-label text-navy/65">
              <Link
                href="/research"
                className="text-navy underline decoration-navy/25 underline-offset-4 hover:decoration-navy focus-visible:decoration-navy"
              >
                Project hub
              </Link>
              <span aria-hidden="true" className="px-2 text-navy/35">
                /
              </span>
              <span aria-current="page">Handbook</span>
            </nav>

            <p className="kicker mt-6 text-kicker text-navy/60">Project Hub</p>
            <h1
              id="handbook-heading"
              className="mt-3 font-serif text-display text-navy"
            >
              The SAIN Project Hub handbook
            </h1>
            <p className="mt-5 max-w-copy font-sans text-body text-navy/72">
              How research through SAIN works, from first application to
              published output. It sets out what researchers, supervisors, and
              the Research Team can expect from each other.
            </p>

            <div className="mt-7 flex flex-col gap-1 border-t border-navy/10 pt-4 font-sans text-footnote text-navy/60">
              <p>
                Version 1.0 · 29 April 2026 ·{" "}
                <a
                  href={`mailto:${RESEARCH_EMAIL}`}
                  className="text-navy/60 underline decoration-navy/25 underline-offset-4 hover:text-navy hover:decoration-navy focus-visible:text-navy"
                >
                  {RESEARCH_EMAIL}
                </a>
              </p>
              <p>
                Written by Alexander Müller (Director), Thomas Brcic (Former
                SAIN Groningen Co-Director), and Ilija Lichkovski (Research
                Lead).
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-page">
        <div className="shell band-section">
          {/* Below xl this is one centred reading column and nothing else. At
              xl the copy column stays exactly where it was and the quiet rail
              appears in the margin beside it, which is why the side columns
              are equal fractions rather than the copy being pushed across. */}
          <div className="mx-auto grid max-w-copy xl:max-w-none xl:grid-cols-[minmax(0,1fr)_minmax(0,720px)_minmax(0,1fr)] xl:gap-10 2xl:gap-16">
            <HandbookToc items={contents} />

            <div className="flex min-w-0 flex-col gap-14">
              {/* What the reader needs if they read nothing else, then where
                  their own section is. Both are the answer to "do I have to
                  read all of this?", which is the first judgement this page
                  gets. */}
              <Reveal className="flex flex-col gap-10">
                <Callout label="The short version">
                  <Bullets
                    items={[
                      "Anyone with sufficient background can take part: Bachelor's, Master's, or PhD students, industry researchers, and people with no formal affiliation. Remote participation works.",
                      "Applications are rolling. Apply at any time; for supervised research matching we reply within a working week.",
                      "Participation is voluntary and educational. SAIN does not pay stipends or salaries, but supports projects with compute and, within reason, conference and travel costs.",
                      <>
                        One address for everything:{" "}
                        <a
                          href={`mailto:${RESEARCH_EMAIL}`}
                          className="text-navy underline decoration-navy/25 underline-offset-4 hover:decoration-navy focus-visible:decoration-navy"
                        >
                          {RESEARCH_EMAIL}
                        </a>
                        .
                      </>,
                    ]}
                  />
                </Callout>

                <nav aria-labelledby="contents-heading">
                  <h2
                    id="contents-heading"
                    className="font-serif text-heading-sm text-navy"
                  >
                    Find the part that applies to you
                  </h2>
                  <p className="mt-2.5 font-sans text-body text-navy/74">
                    The handbook follows the life of a project. Start where you
                    are.
                  </p>
                  <ol className="mt-6 flex flex-col">
                    {contents.map((item, i) => (
                      <li key={item.id} className="border-t border-navy/10 last:border-b">
                        <a
                          href={`#${item.id}`}
                          className="group flex items-baseline gap-4 py-[11px] font-sans text-ui text-navy underline decoration-transparent underline-offset-4 hover:decoration-navy focus-visible:decoration-navy"
                        >
                          <span
                            aria-hidden="true"
                            className="w-[22px] shrink-0 font-sans text-index tabular-nums text-navy/50 transition-colors group-hover:text-orange-ink group-focus-visible:text-orange-ink"
                          >
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          {item.title}
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
              </Reveal>

              {/* 1 */}
              <Chapter id="purpose" index={1} title="What the Project Hub is for">
                <P>
                  SAIN exists to raise awareness of the full spectrum of
                  existing and potential harms from AI, contribute to shaping
                  mitigation priorities through ongoing discourse, and support
                  the realisation of effective solutions. The Project Hub is
                  where that turns into research: a platform where supervisors,
                  collaborators, and students connect to advance AI safety work
                  on a global and interdisciplinary scale.
                </P>
                <P>
                  This handbook applies to researchers and students working
                  under the hub, supervisors affiliated with SAIN, collaborators
                  and visiting researchers on open projects, and anyone outside
                  SAIN who wants to understand how the hub runs.
                </P>

                <Turn>Almost any topic counts, if it reduces AI-related risk</Turn>
                <P>
                  We welcome any project that meaningfully contributes to AI
                  safety: technical, governance, or conceptual. If you are
                  unsure whether a topic counts, the default answer is yes,
                  provided you can articulate a plausible pathway from your work
                  to reducing AI-related risk. We mean risk broadly: risk to
                  lives, to equality, to rights. To make the scope concrete, the
                  hub especially encourages work in the following areas, without
                  being limited to them.
                </P>
                <div className="flex flex-col gap-7">
                  <TopicList
                    title="Technical alignment and interpretability"
                    items={technicalTopics}
                  />
                  <TopicList
                    title="Societal impacts, governance, and policy"
                    items={societalTopics}
                  />
                  <TopicList title="Meta and foundational topics" items={metaTopics} />
                </div>

                <Turn>Four principles hold on every project</Turn>
                <OutlineList
                  items={[
                    "Intellectual honesty. Always communicate accurately what is known, unknown, and uncertain.",
                    <>
                      Proactively consider near-term and long-term harms, as
                      well as dual-use concerns: ways the same work could both
                      protect and cause harm.{" "}
                      <InLink href="#during-the-project">Section 4</InLink>{" "}
                      covers this in depth.
                    </>,
                    "Maintain a supportive environment across disciplines and seniority levels. There is zero room for harmful authority.",
                    "Feedback, critique, and review are essential tools, not personal attacks. When receiving feedback, remember it is aimed at the work. When giving it, attack the ideas, not the person.",
                  ]}
                />
                <P>
                  Be extra wary of these principles when deadlines approach.
                  Everyone is fallible, and when compromising on a principle is
                  the difference between publishing and not publishing, holding
                  the principle matters more than the publication.
                </P>
              </Chapter>

              {/* 2 */}
              <Chapter id="before-you-apply" index={2} title="Before you apply">
                <Turn>There are two ways to do research through SAIN</Turn>
                <P>
                  The hub currently runs in two modes. Everything later in this
                  handbook applies to both unless it says otherwise.
                </P>
                <Rail>
                  <div>
                    <p className="flex items-baseline gap-3">
                      <span
                        aria-hidden="true"
                        className="font-serif text-title-sm tabular-nums text-navy/40"
                      >
                        1
                      </span>
                      <span className="font-serif text-title-sm text-navy">
                        Supervised research matching.
                      </span>
                    </p>
                    <p className="mt-2 font-sans text-body text-navy/74">
                      Students and early-career researchers apply for a guided
                      project with mentorship from one of SAIN&rsquo;s
                      supervisors. SAIN provides logistical and financial
                      support, such as compute, and projects aim to evolve into
                      publishable research. Supervisors are experienced
                      researchers with an interest or track record in AI safety,
                      usually at PhD level or more senior (we write this as PhD+
                      below), though exceptions are possible. We welcome
                      supervisors from any discipline.
                    </p>
                  </div>
                  <div>
                    <p className="flex items-baseline gap-3">
                      <span
                        aria-hidden="true"
                        className="font-serif text-title-sm tabular-nums text-navy/40"
                      >
                        2
                      </span>
                      <span className="font-serif text-title-sm text-navy">
                        Open collaboration.
                      </span>
                    </p>
                    <p className="mt-2 font-sans text-body text-navy/74">
                      Not all research needs formal supervision. SAIN connects
                      researchers directly and provides support, such as
                      compute, so you can focus on the work. If you have a
                      research proposal, submit it via the form on our website.
                      If you want to join an existing project, reach out to that
                      project&rsquo;s contact person. Nobody plays the supervisor
                      role on these projects, but one person leads, usually
                      whoever designed the project.
                    </p>
                  </div>
                </Rail>

                <Turn>Anyone with sufficient background is eligible</Turn>
                <Bullets
                  items={[
                    "Both modes are open to anyone with sufficient background: Bachelor's, Master's, and PhD students, researchers from industry, and people with no formal affiliation.",
                    "Remote participation works.",
                    "To become a supervisor, we mostly ask that you are PhD+, though in exceptional cases this can differ.",
                  ]}
                />

                <Turn>You can apply at any time</Turn>
                <Bullets
                  items={[
                    "The hub works on a rolling basis. Apply whenever you are ready; if there is an opportunity and you are a good fit, you will be accepted.",
                    "For supervised research matching, we get back to you within a working week.",
                    "For starting an open collaboration, we appreciate a fully fleshed-out proposal before you contact us, but if necessary we can help shape it.",
                  ]}
                />

                {/* Right where the reader is doing the maths. */}
                <Callout label="Time commitment">
                  <P>
                    Hours are agreed per project before it starts, together with
                    the meeting cadence. Projects range from roughly 5 to 10
                    hours per week to near full-time. Say what you can give; the
                    scope is set to match.
                  </P>
                </Callout>
              </Chapter>

              {/* 3 */}
              <Chapter
                id="getting-started"
                index={3}
                title="From application to running project"
              >
                <Turn>Onboarding starts with one form</Turn>
                <P>
                  Every new researcher gets a rough overview of current
                  projects, groups, and supervisors, an explanation of this
                  handbook and where it lives, and, if relevant, access to
                  compute or other support. Join our Discord by filling in the
                  onboarding form; the invite and the information above follow
                  from there.
                </P>
                <p>
                  <OutLink href={ONBOARDING_FORM_URL}>
                    Fill in the onboarding form
                  </OutLink>
                </p>

                <Turn>Open collaborations begin with a research proposal</Turn>
                <P>
                  Before a project is approved as a Project Hub open
                  collaboration, the researcher completes a research proposal.
                  The full structure below is only needed when the goal is a
                  full paper and collaboration; for other outputs, drop what you
                  think is unnecessary. A mechanistic interpretability tool, for
                  example, does not need a title and abstract.
                </P>
                <OutlineList items={proposalElements} />
                <P>
                  SAIN&rsquo;s Research Team reviews the proposal and either
                  approves it as a Project Hub project, with or without
                  revisions, or declines it.
                </P>

                <Turn>Supervised matching begins with an expression of interest</Turn>
                <P>
                  For supervised research matching, or to join an existing open
                  collaboration, fill in the expression of interest form or
                  email{" "}
                  <a
                    href={`mailto:${RESEARCH_EMAIL}`}
                    className="text-navy underline decoration-navy/25 underline-offset-4 hover:decoration-navy focus-visible:decoration-navy"
                  >
                    {RESEARCH_EMAIL}
                  </a>
                  .
                </P>
                <p>
                  <OutLink href={RESEARCH_INTEREST_FORM_URL}>
                    Register your interest
                  </OutLink>
                </p>

                <Turn>What happens once you are approved</Turn>
                <Bullets
                  items={[
                    "You are brought into contact with the relevant people. For supervised matching, a supervisor is formally assigned and a project channel is created in the Discord. For joining an existing open project, you are officially added to the project and its Discord channel. For a new open project, we add it to our website, add you to the Discord, and promote the project so others can join.",
                    "Expectations around time commitment (for example 5 to 10 hours per week versus near full-time) and meeting cadence are set. We encourage communication through the Discord, which you join via the onboarding form; other channels can be agreed if preferred.",
                    "The project is registered internally and kept up to date as it progresses.",
                    "Where applicable, the Research Team sets up a GitHub repository under the SAIN organisation and gives project members access.",
                  ]}
                />
              </Chapter>

              {/* 4 */}
              <Chapter id="during-the-project" index={4} title="During the project">
                <Turn>Researchers drive the work; supervisors steer it</Turn>
                <P>
                  Three roles keep a project moving, and each owes the others
                  something concrete.
                </P>
                <Rail>
                  <div>
                    <SubTitle>Researchers and students are expected to</SubTitle>
                    <div className="mt-3">
                      <Bullets
                        items={[
                          "Take primary responsibility for the day-to-day progress of the project.",
                          "Show up to supervisor meetings prepared, with a clear agenda, results, or specific questions.",
                          "Fill in the weekly check-in form.",
                          "Communicate early about blockers or personal constraints.",
                          <>
                            Follow SAIN&rsquo;s core principles (
                            <InLink href="#purpose">section 1</InLink>).
                          </>,
                        ]}
                      />
                    </div>
                  </div>
                  <div>
                    <SubTitle>Supervisors are expected to</SubTitle>
                    <div className="mt-3">
                      <Bullets
                        items={[
                          "Provide regular guidance and mentorship, and high-level project direction, stepping in where needed.",
                          "Help ensure the project is well-scoped and realistic.",
                          "Meet at the agreed frequency, usually weekly or biweekly, and show up prepared.",
                          "Give timely feedback on drafts and research directions.",
                          "Watch out for projects stuck in unproductive directions, and for researcher wellbeing issues such as stress or burnout.",
                          "Raise concerns with the Research Lead or team where appropriate.",
                        ]}
                      />
                    </div>
                  </div>
                  <div>
                    <SubTitle>The Research Team is responsible for</SubTitle>
                    <div className="mt-3">
                      <Bullets
                        items={[
                          "Maintaining up-to-date documentation, including this handbook.",
                          "Onboarding new researchers and supervisors.",
                          "Keeping track of Project Hub projects and outputs.",
                          <>
                            Acting as the contact point, via{" "}
                            <a
                              href={`mailto:${RESEARCH_EMAIL}`}
                              className="text-navy underline decoration-navy/25 underline-offset-4 hover:decoration-navy focus-visible:decoration-navy"
                            >
                              {RESEARCH_EMAIL}
                            </a>{" "}
                            or the Discord.
                          </>,
                          "Project management, unblocking, and research support sit here too; direct your questions to the Research Team first.",
                        ]}
                      />
                    </div>
                  </div>
                </Rail>

                <Turn>The rhythm is weekly</Turn>
                <P>During a project, the standard pattern is:</P>
                <Bullets
                  items={[
                    "Weekly or biweekly meetings: discuss recent progress and blockers, refine direction and scope, review experiments, results, and drafts.",
                    "Weekly check-ins: a short form noting what was tried, progress, and next steps. It keeps accountability light and lets the team see how projects are going.",
                    <>
                      Contact with the Research Team whenever necessary, via{" "}
                      <a
                        href={`mailto:${RESEARCH_EMAIL}`}
                        className="text-navy underline decoration-navy/25 underline-offset-4 hover:decoration-navy focus-visible:decoration-navy"
                      >
                        {RESEARCH_EMAIL}
                      </a>{" "}
                      or the Discord.
                    </>,
                  ]}
                />

                {/* The most-searched fact block on the page, flush after the
                    rhythm it belongs to so a skim-reader lands on it. */}
                <Callout label="Deadlines">
                  {/* The form is the phrase the sentence already uses, so the
                      sentence carries the link rather than trailing a label
                      that repeats it. */}
                  <div className="flex flex-col gap-3">
                    <p className="font-sans text-body text-navy/74">
                      Researchers: fill in the{" "}
                      <OutLink href={WEEKLY_CHECKIN_URL}>
                        weekly check-in form
                      </OutLink>{" "}
                      every Sunday.
                    </p>
                    <p className="font-sans text-body text-navy/74">
                      Supervisors: fill in the{" "}
                      <OutLink href={BIWEEKLY_CHECKIN_URL}>
                        bi-weekly check-in form
                      </OutLink>{" "}
                      every second Sunday.
                    </p>
                  </div>
                </Callout>

                <Turn>Communicate early, precisely, and kindly</Turn>
                <Bullets
                  items={[
                    "Use the agreed channels, ideally the Discord, for project communication.",
                    "Respond within a reasonable timeframe: 2 to 3 working days for non-urgent matters.",
                    "Meetings are the supervised researcher's responsibility: have a simple agenda, start with a brief update since last time (the weekly check-in helps you keep track), and end with concrete next steps.",
                    "Be explicit about availability: travel, family time, exam periods.",
                    "Default to kind, precise, and honest communication.",
                  ]}
                />

                <Turn>Agree milestones up front</Turn>
                <P>
                  Each project should specify intermediate milestones. As an
                  example, not a fixed rule:
                </P>
                <Bullets
                  items={[
                    "Weeks 1 to 3: getting to know each other and the project, literature review.",
                    "Weeks 4 to 8: first experimental proof of concept.",
                    "Weeks 8 to 10: internal discussion of initial results and what to improve.",
                    "Weeks 10 to 12: implementing improvements, new results.",
                    "Weeks 12 to 14: writing up the final report and submission.",
                  ]}
                />

                <Turn>SAIN supports the work but does not pay for it</Turn>
                <P>This applies mostly to technical projects.</P>
                <Bullets
                  items={[
                    "SAIN does not provide stipends or salaries. Participation is voluntary and educational.",
                    "If funding for conference trips, workshop registrations, or travel is needed, we may be able to help within reason.",
                    "Once a project is specified, the Research Team strives to give it easy access to compute and other resources. How much compute SAIN can help with depends on the project and is agreed at the start.",
                    "We encourage computationally inexpensive projects wherever possible.",
                  ]}
                />

                <Turn>Integrity, AI tools, and dual-use</Turn>
                <Rail>
                  <div>
                    <SubTitle>Integrity</SubTitle>
                    <div className="mt-3">
                      <Bullets
                        items={[
                          "Cite sources properly, after making sure you know what they actually say, and avoid plagiarism.",
                          "Be honest about experimental results, limitations, and negative findings.",
                          "Keep enough documentation that others could roughly reproduce your work.",
                        ]}
                      />
                    </div>
                  </div>
                  <div>
                    <SubTitle>Responsible use of AI tools</SubTitle>
                    {/* The lead-in is a position, not a rule, so it reads as a
                        paragraph above the three rules, the way the dual-use
                        block below already does. */}
                    <p className="mt-3 font-sans text-body text-navy/74">
                      We are not against using AI tools such as LLMs for coding
                      or writing. Where a researcher has considered it carefully
                      and it clearly helps, we encourage it. However:
                    </p>
                    <div className="mt-3">
                      <Bullets
                        items={[
                          "Always check outputs carefully. Do not uncritically trust generated content.",
                          "Avoid feeding sensitive or confidential data into tools unless you are confident they handle data responsibly.",
                          "Where relevant, disclose your use of AI tools.",
                        ]}
                      />
                    </div>
                  </div>
                  <div>
                    <SubTitle>Dual-use and infohazards</SubTitle>
                    <p className="mt-3 font-sans text-body text-navy/74">
                      Work on AI safety can have paradoxical effects: it can
                      make AI systems, the AI ecosystem, or people inside it
                      less safe. These effects can play out in complex ways that
                      are impossible to fully foresee. At minimum, spend some
                      time thinking about whether your work could significantly
                      increase capabilities or misuse risk if widely shared.
                    </p>
                    <div className="mt-3">
                      <Bullets
                        items={[
                          "If in doubt, discuss it with your supervisor and/or SAIN's Research Lead before public dissemination.",
                          "Possible mitigations: redacting sensitive details, internal-only or restricted-access reports, or delaying publication until the risks are better understood.",
                        ]}
                      />
                    </div>
                  </div>
                </Rail>

                <Turn>Understanding matters more than publishing</Turn>
                <P>
                  The Project Hub should be a place where personal wellbeing is
                  taken seriously and support is there for anyone who needs it.
                  AI safety research, like any research, can be intellectually
                  and emotionally demanding, especially under the
                  publish-or-perish pressure that is unfortunately far too
                  common.
                </P>
                <Bullets
                  items={[
                    "Be honest about workload and stress levels with your supervisor, and supervisors with their researchers.",
                    "Take regular breaks and keep boundaries between work and rest.",
                    "Remember that what matters most is gaining a better understanding of AI safety, not whether one publishes.",
                    "Speak to the SAIN team if conflicts or issues arise.",
                  ]}
                />
              </Chapter>

              {/* 5 */}
              <Chapter id="publishing" index={5} title="Finishing and publishing">
                <Turn>A project is complete when the question is answered</Turn>
                <Bullets
                  items={[
                    "The main research question has been adequately addressed, including negative or null results, and the work has been published somewhere in a presentable form.",
                    "If relevant, infohazard and dual-use considerations have been treated appropriately.",
                  ]}
                />

                <Turn>Final deliverables can take several forms</Turn>
                <P>
                  Each project specifies one or more final deliverables. For
                  instance:
                </P>
                <Bullets
                  items={[
                    "A research paper at a conference, journal, or workshop.",
                    <>
                      A blog post on{" "}
                      <OutLink href={SUBSTACK_URL}>
                        SAIN&rsquo;s Substack
                      </OutLink>{" "}
                      and/or LessWrong.
                    </>,
                    "A policy brief.",
                  ]}
                />

                <Turn>Authorship reflects contribution</Turn>
                <Bullets
                  items={[
                    "Authorship should reflect substantial intellectual and implementation contributions.",
                    "Author order is handled internally within the project team.",
                    "SAIN and the Project Hub should be acknowledged in publications.",
                    "SAIN may promote your work as enabled by the Project Hub.",
                  ]}
                />

                <Turn>After the project</Turn>
                <Bullets
                  items={[
                    <>
                      Output and other relevant resources, such as data, code,
                      notes, and drafts, are stored in{" "}
                      <InLink href={PROJECT_ARCHIVE_URL}>
                        SAIN&rsquo;s project archive
                      </InLink>
                      .
                    </>,
                    "Write a short note on what went well and what could have gone better, ideally shared with the SAIN community.",
                    "The project may be extended as a follow-up.",
                  ]}
                />
              </Chapter>

              {/* 6 */}
              <Chapter id="escalation" index={6} title="If something goes wrong">
                <P>
                  We hope you never need this section, but it matters that the
                  path is written down before anyone needs it.
                </P>

                <Turn>When to notify someone</Turn>
                <Bullets
                  items={[
                    "A supervisor or researcher relationship breaks down, for example through persistent unavailability or unresolved conflict.",
                    "There is suspected misconduct, such as data falsification, harassment including sexual harassment, or plagiarism.",
                    "There are serious concerns about whether the project's direction is still aligned with AI safety.",
                    "Project scope, expectations, or time commitments have become misaligned.",
                  ]}
                />

                <Turn>The path runs from direct to leadership</Turn>
                <NumberedSteps
                  steps={[
                    "Researcher and supervisor: try to resolve it directly first.",
                    "SAIN's Research Lead, or anyone in the Research Team.",
                    "SAIN's Co-Directors, if the conflict involves the Research Lead or the Research Team.",
                  ]}
                />

                {/* Full column width, directly after the path: the clause that
                    lets a reader ignore the path is not a footnote to it. */}
                <Callout label="You may skip levels">
                  <P>
                    If at any stage you feel unsafe, or face harassment you do
                    not feel comfortable raising with the person involved, skip
                    levels and contact SAIN leadership directly.
                  </P>
                </Callout>

                <Turn>Possible remedies and sanctions</Turn>
                <P>
                  Depending on the severity and nature of the issue, possible
                  actions include:
                </P>
                <Bullets
                  items={[
                    "Clarifying expectations and adjusting milestones.",
                    "Reassigning the supervisor or researcher to another project.",
                    "Re-scoping or pausing the project.",
                    "Removal from the Project Hub, or from SAIN roles, in severe cases.",
                  ]}
                />

                <Callout label="Who to contact">
                  <P>
                    For anything in this handbook, applications, project
                    questions, concerns:{" "}
                    <a
                      href={`mailto:${RESEARCH_EMAIL}`}
                      className="text-navy underline decoration-navy/25 underline-offset-4 hover:decoration-navy focus-visible:decoration-navy"
                    >
                      {RESEARCH_EMAIL}
                    </a>
                    . It reaches the Research Lead and Research Operations, who
                    handle project management, unblocking, and support.
                  </P>
                </Callout>
              </Chapter>

              {/* 7 */}
              <Chapter id="supervisors" index={7} title="If you supervise">
                <P>
                  Supervisor expectations are in{" "}
                  <InLink href="#during-the-project">section 4</InLink>. The
                  administrative procedure for a supervised project is:
                </P>
                <OutlineList
                  items={[
                    <>
                      The research proposal is prepared as described in{" "}
                      <InLink href="#getting-started">section 3</InLink>.
                    </>,
                    "Researchers are assigned to supervisors and projects.",
                    <>
                      The supervisor sends the research proposal, together with
                      the list of researchers on the project, to{" "}
                      <a
                        href={`mailto:${RESEARCH_EMAIL}`}
                        className="text-navy underline decoration-navy/25 underline-offset-4 hover:decoration-navy focus-visible:decoration-navy"
                      >
                        {RESEARCH_EMAIL}
                      </a>
                      . Include contact details, and each researcher&rsquo;s
                      Discord username and GitHub username where applicable, as
                      a minimum.
                    </>,
                    "If applicable, a repository is created in the SAIN GitHub organisation, and researchers and supervisors get collaborator access.",
                    <>
                      Every Sunday, researchers fill in the weekly check-in
                      form; every second Sunday, the supervisor fills in the
                      bi-weekly check-in form. Both forms are linked under
                      Deadlines in{" "}
                      <InLink href="#during-the-project">section 4</InLink>.
                    </>,
                  ]}
                />
                <P>
                  Interested in supervising AI safety research through SAIN? We
                  mostly ask that you are PhD+, exceptions possible, and we
                  welcome any discipline.
                </P>
                <div>
                  <a
                    href={SUPERVISOR_INTEREST_FORM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline-ink gap-2"
                  >
                    Become a supervisor
                    <ArrowUpRight size={16} weight="regular" aria-hidden="true" />
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </div>
              </Chapter>
            </div>
          </div>
        </div>
      </div>

      {/* The one inverse band on the page, because the document ends in a real
          action. Claim left, the two ways to act right. Nothing else: the
          handbook has already made the argument. */}
      <section aria-labelledby="handbook-close-heading" className="bg-inverse">
        <div className="shell band-close grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-16">
          <div className="min-w-0">
            <h2
              id="handbook-close-heading"
              className="max-w-[620px] font-serif text-closing text-white"
            >
              The hub is open on a rolling basis.
            </h2>
            <p className="mt-4 max-w-[560px] font-sans text-body text-white/75">
              Apply whenever you are ready. If there is an opportunity and you
              are a good fit, you will be accepted.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:shrink-0">
            <a
              href={RESEARCH_INTEREST_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-accent gap-2"
            >
              Register your interest
              <ArrowUpRight size={16} weight="regular" aria-hidden="true" />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            <a
              href={SUPERVISOR_INTEREST_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost-inverse gap-2"
            >
              Become a supervisor
              <ArrowUpRight size={16} weight="regular" aria-hidden="true" />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
