import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

import Portrait from "@/components/about/Portrait";
import Reveal from "@/components/landing/Reveal";
import SectionOrbits from "@/components/landing/SectionOrbits";
import TalentFunnel from "@/components/TalentFunnel";
import { leadership } from "@/data/leadership";
import { sainDocuments } from "@/data/sainDocuments";

export const metadata: Metadata = {
  title: "About",
  description:
    "Stichting Safe AI Netherlands raises awareness of the harms from AI, shapes the priorities for mitigating them, and supports the solutions that work. The mission, the talent pipeline, and the people who run it.",
};

/* The advisory board is not in src/data yet, so it stays here, where the page
   that prints it can be read alongside it. Affiliations are printed exactly as
   given: no gloss on what Resolution or CeSIA are, because nothing in the
   sources says. */
const advisoryGroups = [
  {
    label: "Technical AI safety",
    members: [
      {
        name: "Teun van der Weij",
        affiliation: "Research Scientist, Apollo Research; Co-founder, ENAIS",
        link: "https://teunvanderweij.com/",
        image: "/photos/advisory_board/Teun.jpg",
      },
      {
        name: "Jesse Hoogland",
        affiliation: "Co-founder and Director, Resolution",
        link: "https://www.jessehoogland.com/",
        image: "/photos/advisory_board/Jesse.jpg",
      },
      {
        name: "Nandi Schoots",
        affiliation: "FLI Postdoctoral Fellow, University of Oxford",
        link: "https://nandischoots.com/",
        image: "/photos/advisory_board/nandi.jpg",
      },
    ],
  },
  {
    label: "AI governance and policy",
    members: [
      {
        name: "Jelle Donders",
        affiliation: "Strategic Advisor AI, Dutch Government",
        link: "https://www.linkedin.com/in/jelle-donders/",
        image: "/photos/advisory_board/Jelle.jpeg",
      },
      {
        name: "Lisa Gotoh",
        affiliation: "Senior Policy Officer AI, Dutch Ministry of Foreign Affairs",
        link: "https://www.linkedin.com/in/lisa-gotoh/",
        image: "/photos/advisory_board/lisa_gotoh_revised.jpeg",
      },
      {
        name: "Robert Praas",
        affiliation: "Data Scientist, CEPS",
        link: "https://www.ceps.eu/ceps-staff/robert-praas/",
        image: "/photos/advisory_board/Robert_Praasjpeg.jpeg",
      },
      {
        name: "Charbel-Raphaël Segerie",
        affiliation: "Executive Director, CeSIA",
        link: "https://crsegerie.com/",
        image: "/photos/advisory_board/charbel.png",
      },
    ],
  },
  {
    label: "Strategy and operations",
    members: [
      {
        name: "Richard Rushby",
        affiliation: "Director, The Entrepreneurial Ecosystem",
        link: "https://www.linkedin.com/in/richardrushby/",
        image: "/photos/advisory_board/Richard.png",
      },
      {
        name: "Jesselit Jimenez",
        affiliation: "Global Director Strategy and Transformation",
        link: "https://www.linkedin.com/in/jesselit-jimenez-65b0b891/",
        image: "/photos/advisory_board/Video_Jesselit_039_close-up.jpg",
      },
      {
        name: "Stephen Corlett",
        affiliation: "Brand Marketing Leader and Consultant",
        link: "https://www.linkedin.com/in/stephen-corlett-8b361731/",
        image: "/photos/advisory_board/Stephen_Corlett.jpg",
      },
    ],
  },
];

/* The record, as claims rather than labels. "Rapid growth" and "National
   recognition" named the shape of a year without saying what happened in it. */
const record = [
  {
    year: "2023",
    title: "AISIG founded.",
    line: "The AI Safety Initiative Groningen starts as a student-led group teaching AI safety.",
  },
  {
    year: "2024",
    title: "Beyond students.",
    line: "AISIG opens to professionals, runs multiple course cohorts, and hosts hackathons with Apart Research.",
  },
  {
    year: "2025",
    title: "Research at top venues.",
    line: "Publications at NeurIPS and ICLR; the Research Hub launches, matching emerging researchers with PhD-level supervisors.",
  },
  {
    year: "2026",
    title: "Safe AI Netherlands.",
    line: "The model becomes a national foundation, with chapters in Groningen, Amsterdam and Utrecht and one shared infrastructure.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* The mission moment. No photograph, no second heading, no CTA: the
          three clauses are the design, and the page has to earn the ask before
          it makes it. Ornament is the hero's orbital linework, the same
          vocabulary the landing opens with. */}
      <section aria-labelledby="mission-heading" className="relative isolate overflow-hidden bg-page">
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
          {/* The orbit bleeds off the right edge only. The landing hangs this
              off the bottom-right corner, where a cream band with a rule takes
              over and the cut reads as the band's edge; here the next band is
              white too, so a corner-hung orbit stopped mid-air at the seam.
              Centred on the right edge, the arcs close on the page. */}
          <svg
            className="absolute -right-10 top-1/2 h-[380px] w-[190px] -translate-y-1/2 text-navy opacity-[0.06] md:h-[460px] md:w-[230px] md:opacity-[0.09]"
            viewBox="0 0 230 460"
            fill="none"
          >
            <g stroke="currentColor" strokeWidth="1">
              <circle cx="230" cy="230" r="85" />
              <circle cx="230" cy="230" r="119" />
              <circle cx="230" cy="230" r="153" />
            </g>
            <path d="M63 80 Q64 87 70 88 Q64 89 63 96 Q62 89 56 88 Q62 87 63 80Z" fill="currentColor" />
          </svg>
        </div>

        <div className="shell band-hero">
          <Reveal hero className="flex flex-col">
            <p className="kicker flex items-center gap-3 text-kicker text-navy/65">
              <span className="size-[7px] shrink-0 bg-orange" aria-hidden="true" />
              Safe AI Netherlands
            </p>

            {/* One clause per line, because the mission is three commitments
                and not a paragraph. */}
            <h1 id="mission-heading" className="mt-5 max-w-[900px] font-serif text-display text-navy">
              <span className="block">Raise awareness of the harms from AI.</span>
              <span className="block">Shape the priorities for mitigating them.</span>
              <span className="block">Support the solutions that work.</span>
            </h1>

            <span className="mt-9 block h-px w-full max-w-[900px] bg-navy/14" aria-hidden="true" />

            <p className="mt-6 max-w-[760px] font-sans text-body text-navy/72">
              That is the mission of Stichting Safe AI Netherlands. Our focus is the transformative
              risks of AI: the loss of meaningful human control over increasingly capable systems,
              and what follows from it. This page shows the means: a free path from a first course
              to full-time work on AI safety, and the people who run it.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Why the mission needs an organisation. A reading band: one copy
          column, the paragraphs are the object. The white sheet that started
          at the hero ends here, fading into the paper the funnel sits on. */}
      <section
        aria-labelledby="path-heading"
        className="relative isolate overflow-hidden"
        style={{
          backgroundImage:
            "linear-gradient(in oklab 180deg, var(--color-page) 0%, var(--color-page) 93%, var(--color-cream) 100%)",
        }}
      >
        <SectionOrbits className="-left-20 top-10 h-[400px] w-[300px] md:-left-12" />
        <div className="shell band-section">
          <Reveal className="flex flex-col">
            <h2 id="path-heading" className="max-w-[620px] font-serif text-heading text-navy">
              The Netherlands has the talent. It lacked the path.
            </h2>
            <div className="mt-6 flex max-w-[720px] flex-col gap-5 font-sans text-body text-navy/72">
              <p>
                Some harms from AI are already visible. The ones we focus on grow with the systems
                themselves. The more capability and autonomy we hand to AI, the harder it becomes to
                keep meaningful human control, and a system that fails does not check who built it.
                The harm lands on the people and institutions that deployed it as much as on anyone
                else.
              </p>
              <p>
                Nobody can say how fast this goes, and we will not pretend to. The honest position
                is that readiness is not something the Netherlands has by default. It is something
                people build.
              </p>
              <p>
                This country has world-class universities, a strong tech sector, and institutions
                like ASML. What it lacked was a unified civil-society voice on AI safety, and a
                clear route for a talented person to get from curiosity to meaningful contribution.
                SAIN was created to close that gap. Our answer is not a campaign but human capital:
                people who understand the risks, have the skills to address them, and sit where they
                can act.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* The Funnel Diagram. The argument on the left, the diagram that draws
          it on the right; the prose never recaps the five bands, because the
          drawing has already said them. */}
      <section
        id="pipeline"
        aria-labelledby="pipeline-heading"
        className="scroll-mt-36 border-t border-navy/10 bg-cream"
      >
        <div className="shell band-section grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,436px)] lg:gap-16">
          <Reveal className="flex min-w-0 flex-col">
            <h2 id="pipeline-heading" className="max-w-[620px] font-serif text-heading text-navy">
              Anyone can start. The path narrows as you grow.
            </h2>
            <div className="mt-6 flex max-w-[640px] flex-col gap-5 font-sans text-body text-navy/72">
              <p>
                The Funnel Diagram is the whole organisation. The wide end is a free
                course anyone can join, no technical background required. The narrow end is
                full-time work on AI safety, in policy, research, industry or civil society. Between
                them sit the community, the Research Hub, and fellowships. Progress through it is
                visible, to us and to the person making it, and SAIN&rsquo;s job is to make each
                next step reachable, so that every step someone takes compounds into a more
                effective mission.
              </p>
              <p>
                We are open about where our effort goes. SAIN builds the wide end: getting people
                in, teaching foundations, and scaffolding a first real contribution such as a
                supervised research project. At the narrow end we mainly connect and refer, with
                introductions and referral letters.
              </p>
              <p>
                We designed the pipeline with many good endings. Someone who takes one course and
                returns to law, medicine or public administration carries that knowledge into their
                profession, and a society fluent in AI risk is an outcome we actively want.
              </p>
            </div>

            {/* The record of the pipeline, on its own rule: it is evidence for
                the three paragraphs above, not a fourth paragraph of them. */}
            <p className="mt-7 max-w-[640px] border-t border-navy/14 pt-6 font-sans text-body text-navy/74">
              So far the pipeline has produced more than 100 course graduates across nine-plus
              cohorts, currently around 60 a year, and peer-reviewed research at NeurIPS and ICLR.
              The aim for mid-2027 is 250 or more graduates a year, reached by running the same
              standardised course in more cities.
            </p>

            <div className="pt-7">
              <Link href="/courses" className="btn-accent">
                Start with a free course
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="mx-auto w-full min-w-0 max-w-[436px]">
            <TalentFunnel />
          </Reveal>
        </div>
      </section>

      {/* The record. A thin index: the year does the wayfinding, the title
          makes the claim, one sentence says what happened. Four rules, no
          cards, no icons. */}
      <section
        aria-labelledby="record-heading"
        className="border-t border-navy/10 bg-page"
      >
        <div className="shell band-index flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-16">
          <Reveal className="lg:w-[320px] lg:shrink-0">
            <h2 id="record-heading" className="max-w-[420px] font-serif text-heading-sm text-navy">
              From one student group to a national foundation in three years.
            </h2>
          </Reveal>
          <Reveal delay={0.05} className="min-w-0 flex-1">
            <ol role="list" className="flex flex-col">
              {record.map((entry) => (
                <li
                  key={entry.year}
                  className="grid grid-cols-[56px_minmax(0,1fr)] gap-x-5 border-t border-navy/12 py-5 sm:grid-cols-[72px_minmax(0,1fr)]"
                >
                  <span className="font-serif text-title tabular-nums text-navy/55">
                    {entry.year}
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-serif text-title-sm text-navy">{entry.title}</h3>
                    <p className="mt-1.5 max-w-[620px] font-sans text-body text-navy/72">
                      {entry.line}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* The people. /team redirects to this anchor, so the id stays whatever
          else moves on this page. */}
      <section
        id="team"
        aria-labelledby="team-heading"
        className="relative isolate scroll-mt-36 overflow-hidden border-t border-navy/10 bg-page"
      >
        <SectionOrbits className="-bottom-24 -left-20 h-[500px] w-[375px] rotate-[-20deg] md:-left-12" />
        <div className="shell band-section">
          <Reveal className="flex flex-col">
            <p className="kicker text-kicker text-navy/65">The people behind it</p>
            <h2 id="team-heading" className="mt-4 max-w-[620px] font-serif text-heading text-navy">
              A small leadership, close to the work.
            </h2>
            <p className="mt-5 max-w-[720px] font-sans text-body text-navy/72">
              SAIN is led by its leadership: the national director, the chapter directors of
              Groningen, Amsterdam and Utrecht, and the heads of growth, operations and projects. The leadership takes the strategic decisions; the
              chapters run the courses, events and communities.
            </p>
          </Reveal>

          <Reveal delay={0.05}>
            <ul role="list" className="mt-10 flex flex-wrap gap-x-7 gap-y-9">
              {leadership.map((person) => (
                <Portrait
                  key={person.name}
                  name={person.name}
                  meta={person.role}
                  href={person.linkedin}
                  image={person.image}
                  width="w-[140px] sm:w-[158px]"
                  sizes="(min-width: 640px) 158px, 140px"
                />
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.05} className="mt-14 border-t border-navy/14 pt-10 md:mt-16">
            <h3 className="max-w-[560px] font-serif text-heading-sm text-navy">
              Advised by people already in the field.
            </h3>
            <p className="mt-4 max-w-[720px] font-sans text-body text-navy/72">
              An advisory board of experts in the Dutch AI safety landscape provides strategic
              guidance.
            </p>

            <div className="mt-10 flex flex-col gap-10">
              {advisoryGroups.map((group) => (
                <div key={group.label}>
                  <h4 className="kicker text-kicker-sm text-navy/60">{group.label}</h4>
                  <ul role="list" className="mt-5 flex flex-wrap gap-x-6 gap-y-8">
                    {group.members.map((member) => (
                      <Portrait
                        key={member.name}
                        name={member.name}
                        meta={member.affiliation}
                        href={member.link}
                        image={member.image}
                        width="w-[132px] sm:w-[146px]"
                        sizes="(min-width: 640px) 146px, 132px"
                      />
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* How we work, written down. The documents are the proof; the two lines
          under them are the doors people ask for after reading them. */}
      <section
        id="documents"
        aria-labelledby="documents-heading"
        className="scroll-mt-36 border-t border-navy/10 bg-page"
      >
        <div className="shell band-section">
          <Reveal className="flex flex-col">
            {/* No kicker: the heading already says what the band is, which is
                the case the Kicker Budget gives none. */}
            <h2
              id="documents-heading"
              className="max-w-[620px] font-serif text-heading text-navy"
            >
              The rules we hold ourselves to are public.
            </h2>
            <p className="mt-5 max-w-[760px] font-sans text-body text-navy/72">
              SAIN is a Dutch foundation, a stichting, the standard nonprofit legal form. The
              foundation holds the brand, the legal entity and the finances, so a local chapter
              never has to build those from scratch; chapters run their own courses, events and
              communities. Every programme is free. Three documents define how the whole thing
              works, and anyone can read them.
            </p>
          </Reveal>

          {/* Rows, not cards. Three cream boxes on white repeated the geometry
              of the band above and borrowed the one boxed treatment the system
              has earned, which is publication cards on inverse. As hairline
              rows the documents read as one index with the two doors under
              them, in the same idiom. */}
          <Reveal delay={0.05}>
            <ul role="list" className="mt-10 flex flex-col">
              {sainDocuments.map((document) => (
                <li key={document.slug}>
                  <Link
                    href={`/about/${document.slug}`}
                    className="group flex flex-col gap-3 border-t border-navy/14 py-6 md:flex-row md:items-baseline md:justify-between md:gap-10"
                  >
                    <span className="block min-w-0">
                      <span className="kicker block text-kicker-sm text-navy/60">
                        {document.eyebrow}
                      </span>
                      <span className="mt-1.5 block font-serif text-title-sm text-navy underline decoration-transparent underline-offset-4 transition-[text-decoration-color] duration-200 group-hover:decoration-navy group-focus-visible:decoration-navy">
                        {document.title}
                      </span>
                      <span className="mt-2 block max-w-[620px] font-sans text-kicker-sm text-navy/74">
                        {document.description}
                      </span>
                    </span>
                    <span className="inline-flex shrink-0 items-center gap-2 font-sans text-label text-navy underline decoration-navy/25 underline-offset-4 group-hover:decoration-navy group-focus-visible:decoration-navy">
                      Read document
                      <ArrowRight size={16} weight="regular" aria-hidden="true" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.05} className="flex flex-col">
            <div className="flex flex-col gap-3 border-t border-navy/14 py-6 md:flex-row md:items-baseline md:justify-between md:gap-10">
              <p className="max-w-[620px] font-sans text-body text-navy/72">
                Role addresses and chapter contacts live on one page, so they stay accurate.
              </p>
              <Link
                href="/contact"
                className="inline-flex shrink-0 items-center gap-2 font-sans text-label text-navy underline decoration-navy/25 underline-offset-4 hover:decoration-navy focus-visible:decoration-navy"
              >
                Contact SAIN
                <ArrowRight size={16} weight="regular" aria-hidden="true" />
              </Link>
            </div>
            <div className="flex flex-col gap-3 border-t border-navy/14 py-6 md:flex-row md:items-baseline md:justify-between md:gap-10">
              <p className="max-w-[620px] font-sans text-body text-navy/72">
                Want to bring SAIN to your city? Chapters adopt the brand, the legal umbrella and
                ready-made curricula instead of starting from scratch.
              </p>
              <Link
                href="/community#start-chapter"
                className="inline-flex shrink-0 items-center gap-2 font-sans text-label text-navy underline decoration-navy/25 underline-offset-4 hover:decoration-navy focus-visible:decoration-navy"
              >
                Start a chapter
                <ArrowRight size={16} weight="regular" aria-hidden="true" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* The close. Claim left, the two ways to act right. Nothing else. */}
      <section id="involved" aria-labelledby="involved-heading" className="scroll-mt-36 bg-inverse">
        <div className="shell band-close grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-16">
          <div className="min-w-0">
            <h2 id="involved-heading" className="max-w-[620px] font-serif text-closing text-white">
              The work is already happening. Join it, or help run it.
            </h2>
            <p className="mt-4 max-w-[560px] font-sans text-body text-white/75">
              Every programme is free, and all of it runs on people who show up.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:shrink-0">
            {/* "Join the community" is reserved site-wide for the onboarding
                form (COMMUNITY_JOIN_URL). This goes to the community page, so
                it carries the page label, the way the chapter pages say
                "Visit the Research hub". */}
            <Link href="/community" className="btn-accent">
              Visit the community
            </Link>
            <Link href="/get-involved" className="btn-ghost-inverse">
              Volunteer
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
