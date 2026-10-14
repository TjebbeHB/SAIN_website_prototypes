import type { Metadata } from "next";
import Link from "next/link";

import Reveal from "@/components/landing/Reveal";
import SectionOrbits from "@/components/landing/SectionOrbits";
import {
  ArrowRight,
  CalendarBlank,
  Flask,
  GraduationCap,
  HandWaving,
  Megaphone,
  UsersThree,
} from "@phosphor-icons/react/dist/ssr";

export const metadata: Metadata = {
  title: "Volunteer",
  description:
    "SAIN runs on volunteers. Six teams across Amsterdam, Utrecht and Groningen, three to ten hours a week, one short application reviewed as it arrives.",
};

/* The six teams every chapter runs, with the hours that make the ask
   evaluable in one scan. Hour ranges and mission lines are condensed from the
   role catalogue in src/data/openPositions.ts; if a role's hours change there,
   change the range here in the same commit.

   Icons are 26px Phosphor at light weight, orange stroke on a light ground,
   with no tile behind them: design.md's career row. */
const TEAMS = [
  {
    name: "Education",
    icon: GraduationCap,
    description:
      "Run course cohorts and discussion groups. Facilitate weekly sessions, support participants, and keep quality high across iterations.",
    hours: "3 to 10 hours a week",
  },
  {
    name: "Events",
    icon: CalendarBlank,
    description:
      "Plan and deliver the chapter's calendar. Hackathons, expert talks, socials, and the logistics behind them.",
    hours: "3 to 10 hours a week",
  },
  {
    name: "Communications",
    icon: Megaphone,
    description:
      "Writing, design, photography, video and the website. Make the chapter's work visible and on-brand.",
    hours: "3 to 10 hours a week",
  },
  {
    name: "Community",
    icon: UsersThree,
    description:
      "Welcome new members, be the first point of contact, and help people find their way into deeper involvement.",
    hours: "4 to 6 hours a week",
  },
  {
    name: "Outreach",
    icon: HandWaving,
    description:
      "Be SAIN's face on campus. Tabling, flyers, and inviting students to upcoming events.",
    hours: "3 to 5 hours a week",
  },
  {
    name: "Research operations",
    icon: Flask,
    description:
      "Keep the Research Hub running day to day. Onboard researchers and supervisors, track projects, and unblock problems.",
    hours: "2 to 8 hours a week",
  },
];

const RETURNS = [
  "Experience with real responsibility, not shadowing",
  "A network across three chapter cities",
  "A track record in the field: cohorts taught, events run, work published",
];

/* The way in, in the order it happens. Four steps on a light ground, so the
   numerals are orange-ink outline rows rather than the inverse serif device. */
const STEPS = [
  {
    title: "Apply.",
    body: "Pick the chapter and the role, attach your CV, and write a short motivation letter. One page is plenty.",
  },
  {
    title: "Hear back.",
    body: "We read applications as they arrive. First response within 2 to 3 weeks.",
  },
  {
    title: "Talk.",
    body: "A 30 to 45 minute call about the role, your motivation, and a small task or scenario relevant to the team.",
  },
  {
    title: "Start.",
    body: "If that goes well, onboarding begins with the next cycle, and joining at other dates is possible.",
  },
];

const PRINT_WIDTHS = [320, 640, 900];
const printSrcSet = (src: string) =>
  PRINT_WIDTHS.map((w) => `${src.replace(/\.jpg$/, `-${w}.jpg`)} ${w}w`).join(", ");

export default function VolunteerPage() {
  return (
    <>
      {/* Hero. The claim on the left and, beside it, the evidence that these
          are rooms that happened: one print on its white mat, the same object
          the landing puts five of on a table. */}
      <section
        aria-labelledby="volunteer-heading"
        className="relative isolate overflow-hidden"
        style={{
          backgroundImage:
            "linear-gradient(in oklab 180deg, var(--color-page) 0%, var(--color-page) 95%, var(--color-cream) 100%)",
        }}
      >
        <SectionOrbits className="-left-24 top-0 h-[420px] w-[320px] md:-left-14" />
        <div className="shell band-hero grid items-center gap-10 lg:grid-cols-[minmax(0,640px)_minmax(0,1fr)] lg:gap-16">
          <Reveal hero className="flex min-w-0 flex-col gap-6">
            <h1 id="volunteer-heading" className="font-serif text-display text-navy">
              SAIN runs on volunteers
            </h1>
            <p className="max-w-[620px] font-sans text-body text-navy/72">
              Every programme is free because people give a few hours a week to run it. This
              page is the work, what you get from it, and the way in.
            </p>
            <div className="pt-1">
              <Link href="/open-positions" className="btn-accent self-start">
                See open positions
              </Link>
            </div>
          </Reveal>

          <Reveal hero delay={0.08} className="flex min-w-0 justify-center lg:justify-end">
            <figure className="w-full max-w-[420px] bg-page p-2 shadow-[0_7px_22px_#021C4D1F]">
              <img
                src="/landing/print-hackathon-640.jpg"
                srcSet={printSrcSet("/landing/print-hackathon.jpg")}
                sizes="(min-width: 1024px) 420px, (min-width: 640px) 60vw, 84vw"
                alt="People working together at a table during a hackathon"
                width={640}
                height={480}
                className="aspect-[4/3] w-full object-cover object-[48%_80%]"
              />
            </figure>
          </Reveal>
        </div>
      </section>

      {/* The work. Six rows on hairlines, each with its hours, because the
          question this band answers is whether there is something here the
          reader could actually do on a Tuesday evening. */}
      <section
        id="work"
        aria-labelledby="work-heading"
        className="relative isolate scroll-mt-36 overflow-hidden border-t border-navy/10 bg-page"
      >
        <SectionOrbits className="-bottom-24 -left-20 h-[460px] w-[340px] md:-left-12" />
        <div className="shell band-section">
          <div className="flex max-w-[720px] flex-col gap-4">
            <p className="kicker text-kicker text-navy/65">The work</p>
            <h2 id="work-heading" className="font-serif text-heading text-navy">
              Six teams, three to ten hours a week
            </h2>
            <p className="max-w-[680px] font-sans text-body text-navy/74">
              Amsterdam, Utrecht and Groningen each run the same teams. Leads carry a team and
              report to the chapter&rsquo;s director; team members carry a slice of it. Most
              roles are three to five hours a week, leads six to ten.
            </p>
          </div>

          <Reveal className="mt-10">
            <ul role="list">
              {TEAMS.map(({ name, icon: Icon, description, hours }) => (
                <li
                  key={name}
                  className="flex flex-col gap-4 border-t border-navy/10 py-[18px] sm:flex-row sm:items-start sm:gap-6 md:gap-8"
                >
                  <Icon
                    size={26}
                    weight="light"
                    aria-hidden="true"
                    className="shrink-0 text-orange sm:mt-1"
                  />
                  <div className="min-w-0 flex-1">
                    <h3 className="font-serif text-title text-navy">{name}</h3>
                    <p className="mt-1 max-w-[640px] font-sans text-body leading-[25px] text-navy/74">
                      {description}
                    </p>
                  </div>
                  <p className="shrink-0 font-sans text-caption text-navy/65 sm:w-[164px] sm:pt-1.5 sm:text-right">
                    {hours}
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* The exception, as a footnote rather than a seventh row: it is one
              paid post on a page about volunteering, and a row would give it
              the weight of a team. */}
          <p className="mt-6 max-w-[680px] border-t border-navy/10 pt-5 font-sans text-footnote leading-[19px] text-navy/65">
            SAIN also hires a small number of paid national staff when a role needs it. Those
            roles are listed with the open positions.
          </p>

          <div className="mt-8">
            <Link href="/open-positions" className="btn-outline-ink">
              See open positions
            </Link>
          </div>
        </div>
      </section>

      {/* What a volunteer gets. Paper, and the quote alongside: the one piece
          of real evidence we have that these hours pay back. */}
      <section
        id="what-you-get"
        aria-labelledby="what-you-get-heading"
        className="scroll-mt-36 border-t border-navy/10 bg-cream"
      >
        <div className="shell band-index grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,360px)] lg:gap-16 xl:grid-cols-[minmax(0,1fr)_minmax(280px,420px)]">
          <div className="flex min-w-0 flex-col gap-[22px]">
            <h2
              id="what-you-get-heading"
              className="max-w-[620px] font-serif text-heading-sm text-navy"
            >
              You leave with work you can point to
            </h2>
            <p className="max-w-[680px] font-sans text-body text-navy/74">
              Volunteer roles at SAIN carry real ownership early. Leads report straight to
              chapter directors, and team members run cohorts, events and channels that
              actually happen. You work alongside people across Utrecht, Groningen and
              Amsterdam who are moving into the field themselves, and many of the
              introductions that matter later start here.
            </p>
            <ul className="flex flex-col gap-2.5 border-t border-navy/14 pt-4 font-sans text-kicker-sm leading-[22px] text-navy">
              {RETURNS.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  {/* Navy, not orange: the orange on this page belongs to the
                      buttons and the six icons. */}
                  <span className="h-px w-4 shrink-0 bg-navy/30" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <blockquote className="flex min-w-0 flex-col gap-[18px]">
            <p className="kicker text-base leading-[22px] text-navy/65">
              Internship · Existential Risk Observatory
            </p>
            <p className="font-serif text-title font-light leading-[31px] text-navy">
              &ldquo;Without this community I almost certainly wouldn&rsquo;t be where I
              am.&rdquo;
            </p>
            <footer className="border-t border-navy/14 pt-3">
              <cite className="block font-sans text-sm font-medium not-italic leading-5 text-navy">
                Stefano Zuffi
              </cite>
              <p className="kicker mt-1 text-kicker-sm text-navy/65">
                Mapping research on AI alignment techniques and government interventions
              </p>
            </footer>
          </blockquote>
        </div>
      </section>

      {/* The path in. Four numbered rows, so the reader leaves knowing the next
          step and roughly when she hears back. */}
      <section
        id="how-to-apply"
        aria-labelledby="how-to-apply-heading"
        className="scroll-mt-36 border-t border-navy/10 bg-page"
      >
        {/* One column, not a split: the two bands either side of this one are
            splits, and the four steps read better as a sequence running the
            width of the page than as a column beside a claim. */}
        <div className="shell band-section">
          <div className="flex max-w-[720px] flex-col gap-4">
            <h2
              id="how-to-apply-heading"
              className="font-serif text-heading-sm text-navy"
            >
              One short application, reviewed as it arrives
            </h2>
            <p className="max-w-[680px] font-sans text-body text-navy/74">
              All chapter applications go through the same short form: name, CV, and a
              one-page motivation letter. Applications are reviewed on a rolling basis, so
              apply whenever you are ready.
            </p>
          </div>

          <ol className="mt-9 font-sans text-body text-navy">
            {STEPS.map((step, i) => (
              <li
                key={step.title}
                className="flex items-baseline gap-3 border-t border-navy/10 py-3"
              >
                <span className="w-[22px] shrink-0 font-sans text-xs text-orange-ink">
                  {i + 1}
                </span>
                <span className="max-w-[760px] leading-[25px] text-navy/74">
                  <span className="text-navy">{step.title}</span> {step.body}
                </span>
              </li>
            ))}
          </ol>

          <p className="mt-6 max-w-[680px] font-sans text-body text-navy/74">
            No role that fits? Apply anyway. Tell us what you want to do in your motivation
            letter, and we will figure out together what works well for you.
          </p>

          {/* No accent button here. The close is the page's last ask, and a
              second orange "See open positions" two bands above it turns that
              ask into a repeat. This band ends on the quieter door. */}
          <div className="mt-6">
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 font-sans text-label text-navy underline decoration-navy/25 underline-offset-4 hover:decoration-navy focus-visible:decoration-navy"
            >
              Or get in touch first
              <ArrowRight size={16} weight="regular" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Founders, pointed onward. A thin index band and one link: founding a
          chapter is its own path, and it is argued on /community. */}
      <section
        id="found-a-chapter"
        aria-labelledby="found-a-chapter-heading"
        className="scroll-mt-36 border-t border-navy/10 bg-cream"
      >
        <div className="shell band-index flex flex-col gap-4 lg:flex-row lg:items-baseline lg:gap-16">
          <h2
            id="found-a-chapter-heading"
            className="font-serif text-title text-navy lg:w-[300px] lg:shrink-0"
          >
            Want SAIN in your city?
          </h2>
          <div className="flex min-w-0 flex-col items-start gap-3">
            <p className="max-w-[640px] font-sans text-body text-navy/74">
              Founding a chapter is its own path, with its own playbooks and mentorship, and it
              lives with the community.
            </p>
            <Link
              href="/community#start-chapter"
              className="inline-flex items-center gap-1.5 font-sans text-label text-navy underline decoration-navy/25 underline-offset-4 hover:decoration-navy focus-visible:decoration-navy"
            >
              {/* /about sends readers to this same anchor as "Start a chapter";
                  one label per destination. */}
              Start a chapter
              <ArrowRight size={16} weight="regular" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* The close. The claim on the left, the two ways to act on the right. */}
      <section id="join" aria-labelledby="join-heading" className="scroll-mt-36 bg-inverse">
        <div className="shell band-close grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-16">
          <div className="min-w-0">
            <h2 id="join-heading" className="max-w-[620px] font-serif text-closing text-white">
              Every free programme has volunteers behind it
            </h2>
            <p className="mt-4 max-w-[560px] font-sans text-body text-white/78">
              A few hours a week, a team in your city, and applications reviewed on a rolling
              basis. The next cohort of courses, events and research support gets run by
              whoever joins now.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 lg:shrink-0">
            <Link href="/open-positions" className="btn-accent">
              See open positions
            </Link>
            <Link href="/contact" className="btn-ghost-inverse">
              Or get in touch first
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
