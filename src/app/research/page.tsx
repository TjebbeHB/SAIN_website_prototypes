import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

import Reveal from "@/components/landing/Reveal";
import FittingTheCurve from "@/components/research/FittingTheCurve";
import FeaturedPublications from "@/components/research/FeaturedPublications";
import SectionOrbits from "@/components/research/SectionOrbits";
import SupervisorRow from "@/components/research/SupervisorRow";
import {
  publications,
  supervisors,
  RESEARCH_EMAIL,
  RESEARCH_INTEREST_FORM_URL,
  SUPERVISOR_INTEREST_FORM_URL,
} from "@/data/research";

export const metadata: Metadata = {
  title: "Research hub",
  description:
    "The SAIN Research Hub matches you with an experienced supervisor, arranges compute, and takes a project from open question to published finding. Voluntary, remote-friendly, and open for applications at any time.",
};

const RESEARCHER_MAILTO = `mailto:${RESEARCH_EMAIL}?subject=${encodeURIComponent(
  "Research Hub: joining as a researcher",
)}`;

/* Counted from the data file rather than typed. The old hero carried "6+ Active
   Projects  ·  20+ Researchers  ·  12+ Publications", and two of the three
   traced to nothing while the third contradicted the exact twelve papers this
   page lists. A number on this page has to be checkable by the reader, because
   the reader is the sort who checks. */
const factLine = [
  `${publications.length} publications`,
  `${supervisors.length} supervisors`,
  "rolling applications",
];

/* The three doors into a project. All three are normal, so all three are set
   the same way: no track is styled as the real one. */
const projectRoutes = [
  {
    lead: "Work from a supervisor's agenda.",
    body: "Every SAIN supervisor keeps a public research agenda, a document of open questions they want help investigating. Read the agendas below and pick a question that fits your background.",
  },
  {
    lead: "Join an open collaboration.",
    body: "Some projects run without formal supervision. One researcher leads, usually the person who designed the project, and SAIN connects collaborators and supports the work.",
  },
  {
    lead: "Bring your own idea.",
    body: "Write a short proposal: the question, why it matters, how you would test it, and what you need. SAIN's research team reviews it, and can help you shape it if it is not fully formed yet.",
  },
];

const eligibility = [
  "Students at Bachelor, Master, or PhD level",
  "Researchers working in industry",
  "People with no formal affiliation",
];

function InverseLink({ href, children, external = false }: {
  href: string;
  children: ReactNode;
  external?: boolean;
}) {
  const className =
    "inline-flex items-center gap-3 text-label leading-6 text-white/80 underline decoration-white/35 underline-offset-4 hover:text-white focus-visible:text-white";
  const content = (
    <>
      {children}
      <ArrowRight size={16} weight="regular" aria-hidden="true" />
    </>
  );
  return external ? (
    <a href={href} className={className}>
      {content}
    </a>
  ) : (
    <Link href={href} className={className}>
      {content}
    </Link>
  );
}

/* One step of the spine. The numeral is the page's own serif at the heading's
   size, so its baseline lands on the title's without a nudge, and a 1px white
   spine carries the eye from one step to the next. Same device as the landing's
   research band, because it is the same journey told at length. */
function Step({ step, id, title, children }: {
  step: string;
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <li
      id={id}
      className="relative scroll-mt-36 pb-12 before:absolute before:bottom-0 before:left-[19px] before:top-11 before:w-px before:bg-white/[0.08] last:pb-0 last:before:hidden md:pb-16"
    >
      <div className="grid grid-cols-[40px_minmax(0,1fr)] gap-x-4">
        <span aria-hidden="true" className="font-serif text-heading-sm tabular-nums text-white/40">
          {step}
        </span>
        <div className="min-w-0">
          <h3 className="font-serif text-heading-sm">{title}</h3>
          {children}
        </div>
      </div>
    </li>
  );
}

export default function ResearchPage() {
  return (
    <>
      {/* Hero. The claim on the left, the argument of the page drawn on the
          right: a scatter, two people fitting a line through it, and the line
          leaving the plot as a printed page. White fades into paper in the last
          5%, a seam rather than a sky. */}
      <section
        aria-labelledby="research-hero-heading"
        className="relative isolate overflow-hidden"
        style={{
          backgroundImage:
            "linear-gradient(in oklab 180deg, var(--color-page) 0%, var(--color-page) 95%, var(--color-cream) 100%)",
        }}
      >
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
          <div
            className="absolute -left-8 -top-20 h-[400px] w-[200px] opacity-[0.07] md:-left-4 md:-top-12 md:h-[440px] md:w-[260px] md:opacity-[0.12]"
            style={{
              backgroundImage: "url('/illustrations/hero-orbits.svg')",
              backgroundSize: "260px 440px",
              backgroundRepeat: "no-repeat",
              maskImage: "linear-gradient(to right, black 15%, transparent 100%)",
            }}
          />
          <svg
            className="absolute -bottom-10 -right-10 h-[190px] w-[190px] -scale-x-100 text-navy opacity-[0.06] md:h-[230px] md:w-[230px] md:opacity-[0.09]"
            viewBox="0 0 230 230"
            fill="none"
          >
            <g stroke="currentColor" strokeWidth="1">
              <circle cx="0" cy="230" r="85" />
              <circle cx="0" cy="230" r="119" />
              <circle cx="0" cy="230" r="153" />
            </g>
            <path d="M167 80 Q168 87 174 88 Q168 89 167 96 Q166 89 160 88 Q166 87 167 80Z" fill="currentColor" />
          </svg>
        </div>

        <div className="shell band-hero grid min-h-[60dvh] items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,360px)] xl:grid-cols-[minmax(0,700px)_minmax(0,1fr)]">
          <Reveal hero className="flex min-w-0 flex-col gap-6">
            <h1 id="research-hero-heading" className="font-serif text-display text-navy">
              Make a first real contribution to AI Safety research
            </h1>
            <p className="max-w-[620px] font-sans text-body text-navy/72">
              The SAIN Research Hub matches you with an experienced supervisor, arranges compute,
              and takes a project from open question to published finding. It is voluntary,
              remote-friendly, and open for applications at any time.
            </p>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4 pt-1">
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
              <Link
                href="/research/handbook"
                className="inline-flex items-center gap-2 font-sans text-label text-navy underline decoration-navy/25 underline-offset-4 hover:decoration-navy focus-visible:decoration-navy"
              >
                Read the research handbook
                <ArrowRight size={16} weight="regular" aria-hidden="true" />
              </Link>
            </div>

            {/* The quiet version of a stat row: three checkable facts on a
                hairline, two of them counted straight off this page. The
                separators are drawn rather than typed, so a screen reader reads
                three facts and not two middots. */}
            <ul
              role="list"
              className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-navy/14 pt-4"
            >
              {factLine.map((fact, i) => (
                <li key={fact} className="flex items-center gap-3">
                  {i > 0 ? <span aria-hidden="true" className="text-navy/25">·</span> : null}
                  <span className="font-sans text-footnote text-navy/65">{fact}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal hero delay={0.08} className="flex min-w-0 items-center justify-center lg:justify-end">
            <FittingTheCurve />
          </Reveal>
        </div>
      </section>

      {/* Eligibility, on paper: this band is the terms page of a printed
          programme, so it runs on cream and stays a column plus a short list. */}
      <section
        aria-labelledby="eligibility-heading"
        className="border-t border-navy/10 bg-cream"
      >
        <div className="shell band-section flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-16">
          <h2
            id="eligibility-heading"
            className="max-w-[420px] font-serif text-heading-sm text-navy lg:w-[360px] lg:shrink-0"
          >
            You do not need a university post to do this work
          </h2>

          <div className="flex min-w-0 max-w-[720px] flex-col gap-5">
            <p className="font-sans text-body text-navy/74">
              SAIN&rsquo;s offer is one line: bring your expertise to AI Safety, and the community,
              supervision, and support are here to take it further. The rest of this page is the
              mechanism behind that line: how a project is chosen, what support looks like week to
              week, and where the work ends up.
            </p>

            <div>
              <p className="font-sans text-body text-navy/74">
                The hub is open to anyone with sufficient background:
              </p>
              {/* The landing's dash list rather than hairline rows: three
                  short items do not need a table, and the rules were reading
                  as a form inside a reading column. */}
              <ul role="list" className="mt-4 flex flex-col gap-2.5">
                {eligibility.map((item) => (
                  <li key={item} className="flex items-center gap-3 font-sans text-kicker-sm leading-[22px] text-navy">
                    <span className="h-px w-4 shrink-0 bg-navy/30" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <p className="font-sans text-body text-navy/74">
              Remote participation works. Applications are rolling, so you can apply whenever you
              are ready, and for supervised projects you hear back within a working week.
            </p>
            <p className="font-sans text-body text-navy/74">
              One thing the hub is not: a job. SAIN does not pay stipends or salaries;
              participation is voluntary and educational. What SAIN does provide is supervision,
              compute, coordination, and, within reason, help with conference travel.
            </p>
          </div>
        </div>
      </section>

      {/* The process. Inverse is earned here because the band ends in the
          page's proof: the three steps run into the papers they produced. */}
      <section id="process" aria-labelledby="process-heading" className="scroll-mt-36 bg-inverse text-white">
        <div className="shell band-research">
          <Reveal className="max-w-[760px]">
            <h2 id="process-heading" className="font-serif text-heading">
              From open question to published finding
            </h2>
            <p className="mt-4 text-body text-white/75">
              Every project in the hub moves through the same three steps. The handbook spells each
              one out in full; this is the shape of it.
            </p>
          </Reveal>

          <Reveal delay={0.05}>
          <ol role="list" aria-label="The three steps of a project" className="mt-12 md:mt-16">
            <Step step="01" id="choose" title="Choose a research project">
              <p className="mt-5 max-w-[760px] text-body text-white/75">
                There are three ways in, and all three are normal.
              </p>

              <ol role="list" className="mt-6 max-w-[760px]">
                {projectRoutes.map((route, i) => (
                  <li key={route.lead} className="flex gap-3 border-t border-white/10 py-3.5">
                    <span
                      aria-hidden="true"
                      className="w-[22px] shrink-0 pt-1 font-sans text-footnote text-orange"
                    >
                      {i + 1}
                    </span>
                    <p className="min-w-0 text-body text-white/75">
                      <span className="font-serif text-title-sm text-white">{route.lead}</span>{" "}
                      {route.body}
                    </p>
                  </li>
                ))}
              </ol>

              <p className="mt-7 max-w-[760px] text-body text-white/75">
                The scope is broad on purpose: technical alignment and interpretability, governance
                and policy with an EU and Dutch emphasis, and foundational questions about how the
                field measures progress. If you are unsure whether a topic counts as AI Safety, the
                default answer is yes, provided you can articulate a plausible pathway from the work
                to reducing AI-related risk.
              </p>

              <div className="mt-6">
                <InverseLink href="/research/handbook">Read the research handbook</InverseLink>
              </div>
            </Step>

            <Step step="02" id="support" title="Work with support">
              <div className="mt-5 flex max-w-[760px] flex-col gap-4">
                <p className="text-body text-white/75">
                  Fill in the interest form and, for supervised projects, you hear back within a
                  working week. If there is a fit, a supervisor is formally assigned and the project
                  gets its own channel in the community.
                </p>
                <p className="text-body text-white/75">
                  Supervision is a working relationship, not a lecture. You drive the day-to-day
                  research; your supervisor helps scope the project realistically, reviews
                  experiments and drafts, and steps in when a direction stops being productive.
                  Meetings run weekly or biweekly, and you agree your commitment per project up
                  front, whether that is five to ten hours a week alongside a degree or something
                  closer to full time.
                </p>
                <p className="text-body text-white/75">
                  Supervisors are usually researchers at PhD level or more senior, with exceptions.
                  Compute is arranged per project at the start, and computationally inexpensive
                  projects are encouraged. Remote participation works throughout.
                </p>
              </div>

              <div className="mt-6">
                <InverseLink href="#supervisors">Meet the supervisors</InverseLink>
              </div>
            </Step>

            <Step step="03" id="publish" title="Publish your findings">
              <div className="mt-5 flex max-w-[760px] flex-col gap-4">
                <p className="text-body text-white/75">
                  A project is complete when its main question is adequately answered, including
                  when the answer is negative, and the result is published in a presentable form: a
                  workshop paper, a policy brief, or a blog post on SAIN&rsquo;s Substack or
                  LessWrong. You get feedback on drafts, and SAIN may help with conference travel
                  within reason.
                </p>
                <p className="text-body text-white/75">
                  That is not hypothetical. Work from this community has been accepted at workshops
                  at NeurIPS and ICLR, which is where most first contributions in this field land.
                </p>
              </div>

              <FeaturedPublications />

              {/* The full record. The landing and the handbook both deep-link
                  to #publications, so the id belongs on the list itself. */}
              <ul
                role="list"
                id="publications"
                aria-label="All publications from the SAIN community"
                className="research-publications mt-10 grid scroll-mt-36 gap-3 sm:grid-cols-2 xl:grid-cols-3"
              >
                {publications.map((paper) => (
                  <li key={paper.link} className="flex">
                    <a
                      href={paper.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pub-chip w-full"
                    >
                      <span className="w-[118px] shrink-0 font-sans text-footnote font-medium text-orange md:w-[136px]">
                        {paper.venueShort}
                      </span>
                      <span className="min-w-0 font-serif text-kicker-sm text-white">
                        {paper.chipTitle}
                        <ArrowUpRight
                          size={14}
                          weight="regular"
                          aria-hidden="true"
                          className="ml-1 inline-block shrink-0 align-[-2px] text-white/70"
                        />
                        <span className="sr-only"> (opens in a new tab)</span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </Step>
          </ol>
          </Reveal>
        </div>
      </section>

      {/* The people. White ground, one orbit, portraits you can click through
          to the agenda each person actually wrote. */}
      <section
        id="supervisors"
        aria-labelledby="supervisors-heading"
        className="relative isolate scroll-mt-36 overflow-hidden bg-page"
      >
        <SectionOrbits className="-left-20 top-10 h-[400px] w-[300px] md:-left-12" />
        <div className="shell band-section">
          <Reveal className="flex flex-col gap-10">
            <div className="flex flex-col gap-4">
              <h2 id="supervisors-heading" className="max-w-[620px] font-serif text-heading-sm text-navy">
                The people you would work with
              </h2>
              <p className="max-w-[720px] font-sans text-body text-navy/74">
                Every supervisor keeps a public research agenda. Read it before you apply: the
                strongest expressions of interest respond to a question a supervisor has already
                posed.
              </p>
            </div>

            <SupervisorRow />

            {/* The page's one supervisor moment, placed where the reader has
                just finished checking the other supervisors. One column under a
                hairline: heading, paragraph, and the button directly under the
                sentence that argues for it. The eligibility band already runs
                the heading-left, copy-right split, and the page uses it once. */}
            <div className="flex max-w-[720px] flex-col items-start gap-5 border-t border-navy/14 pt-8">
              <h3 className="font-serif text-title text-navy">Supervise the next project</h3>
              <p className="font-sans text-body text-navy/74">
                If you are an experienced researcher, usually at PhD level or above, and the
                papers above look like work you could have guided, more supervisors means more
                projects. Supervision is remote-friendly, meetings run at a cadence you agree per
                project, and the research team handles the coordination around you. Fill in the
                supervisor form and we will follow up with next steps.
              </p>
              <a
                href={SUPERVISOR_INTEREST_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-ink mt-1 gap-2"
              >
                Become a supervisor
                <ArrowUpRight size={16} weight="regular" aria-hidden="true" />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* The close. The claim on the left, the two ways to act on the right,
          and the handbook as a quiet footnote rather than a third button. */}
      <section id="apply" aria-labelledby="apply-heading" className="scroll-mt-36 bg-inverse">
        <div className="shell band-close grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-16">
          <div className="min-w-0">
            <h2 id="apply-heading" className="max-w-[620px] font-serif text-closing text-white">
              Apply whenever you are ready
            </h2>
            <p className="mt-4 max-w-[560px] font-sans text-body text-white/78">
              Applications are rolling, and for supervised projects you hear back within a working
              week. Fill in the interest form, or email the research team if you are not sure where
              you fit and we will help route you.
            </p>
          </div>

          <div className="flex flex-col gap-5 lg:shrink-0">
            <div className="flex flex-wrap gap-3">
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
              <a href={RESEARCHER_MAILTO} className="btn-ghost-inverse">
                Email the research team
              </a>
            </div>
            <p className="max-w-[420px] font-sans text-footnote leading-[19px] text-white/60">
              The full process, expectations, and norms are written down.{" "}
              <Link
                href="/research/handbook"
                className="text-white/80 underline decoration-white/35 underline-offset-4 hover:text-white focus-visible:text-white"
              >
                Read the research handbook
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
