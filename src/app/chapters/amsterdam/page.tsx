import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";

import ChapterClose from "@/components/chapters/ChapterClose";
import ChapterHero from "@/components/chapters/ChapterHero";
import CourseBand from "@/components/chapters/CourseBand";
import CourseDisclosure, {
  type Course,
} from "@/components/chapters/CourseDisclosure";
import EvidenceBand from "@/components/chapters/EvidenceBand";
import PastEvents, {
  pastEventsThisYear,
  type RawPastEvent,
} from "@/components/chapters/PastEvents";
import PrintStrip, { type Print } from "@/components/chapters/PrintStrip";
import ShowUpBand from "@/components/chapters/ShowUpBand";
import TeamBand, { type TeamMember } from "@/components/chapters/TeamBand";
import lumaPastEventsAmsterdam from "@/data/lumaPastEventsAmsterdam.json";
import { sainAmsTeam } from "@/data/sainAmsTeam";
import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

export const metadata: Metadata = {
  title: "Amsterdam chapter",
  description:
    "Free courses and a weekly discussion group across UvA, VU Amsterdam, and the city's tech scene, supported by ELLIS Unit Amsterdam.",
};

const LUMA_CALENDAR_ID = "cal-WD5xl5IYLpY7xNm";
const LUMA_PUBLIC_URL = "https://luma.com/user/SAIN_Amsterdam";

const EVENTS_EMAIL = "eventsams@safeainetherlands.org";
const EDU_EMAIL = "eduams@safeainetherlands.org";
const INFO_EMAIL = "infoams@safeainetherlands.org";
const LINKTREE_URL = "https://linktr.ee/sainamsterdam";
const ELLIS_URL = "https://ivi.fnwi.uva.nl/ellis/";

const team: readonly TeamMember[] = sainAmsTeam;

const LINK =
  "underline decoration-navy/25 underline-offset-4 hover:decoration-navy focus-visible:decoration-navy";

function ExternalLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={LINK}>
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

const BLUEDOT_URL = "https://bluedot.org/";

/* Said under each course rather than once under both, because a tab is read
   on its own. */
const courseNote = (
  <>
    The courses are independently run by SAIN Amsterdam and are not affiliated
    with UvA or VU. The certificate of completion is awarded by SAIN Amsterdam,
    not BlueDot Impact.
    <br />
    Questions:{" "}
    <a href={`mailto:${EDU_EMAIL}`} className={LINK}>
      {EDU_EMAIL}
    </a>
    .
  </>
);

/* The two courses behind the same disclosure tabs Utrecht uses, so a reader
   moving between chapter pages meets one device for "this chapter's courses".
   The copy and the week-by-week outline are the chapter's own, each week
   linking to its unit on BlueDot. */
const courses: Course[] = [
  {
    id: "technical",
    title: "Technical AI Safety",
    summary: (
      <>
        <p>
          Curious where your technical skills could make the biggest difference
          for AI safety?
        </p>
        <p>
          SAIN Amsterdam facilitates the{" "}
          <ExternalLink href={BLUEDOT_URL}>BlueDot Impact</ExternalLink>{" "}
          <ExternalLink href="https://bluedot.org/courses/technical-ai-safety">
            Technical AI Safety
          </ExternalLink>{" "}
          course for people who want to help close the gap between how fast AI
          capabilities are advancing and how well we can make them safe. Over
          six weeks, you&rsquo;ll diagnose why building safe AI is so
          technically hard, evaluate current safety techniques (what works,
          what doesn&rsquo;t, and where the gaps are), and map how defences
          might break by building your own &ldquo;kill chain&rdquo;. You&rsquo;ll
          leave with a fundable action plan for where your skills can make the
          biggest difference. SAIN Amsterdam supports ambitious students in
          finding their next steps in an AI safety career.
        </p>
        <p>
          Technical understanding is ideal, but not a prerequisite. This is a
          foundational course, covering the foundations of technical AI safety.
        </p>
      </>
    ),
    outlineTitle: "What you will learn each week",
    outline: [
      {
        title: "The technical challenge with AI",
        href: "https://bluedot.org/courses/technical-ai-safety/1/1",
      },
      {
        title: "Training safer models",
        href: "https://bluedot.org/courses/technical-ai-safety/2/1",
      },
      {
        title: "Detecting danger",
        href: "https://bluedot.org/courses/technical-ai-safety/3/1",
      },
      {
        title: "Understanding AI",
        href: "https://bluedot.org/courses/technical-ai-safety/4/1",
      },
      {
        title: "Minimising harm",
        href: "https://bluedot.org/courses/technical-ai-safety/5/1",
      },
      {
        title: "Plan your AI safety career",
        href: "https://bluedot.org/courses/technical-ai-safety/6/1",
      },
    ],
    note: courseNote,
  },
  {
    id: "governance",
    title: "Frontier AI Governance",
    summary: (
      <>
        <p>
          What would it take to govern technology that is advancing faster than
          the rules meant to guide it?
        </p>
        <p>
          SAIN Amsterdam facilitates the{" "}
          <ExternalLink href={BLUEDOT_URL}>BlueDot Impact</ExternalLink>{" "}
          <ExternalLink href="https://bluedot.org/courses/ai-governance#curriculum">
            Frontier AI Governance
          </ExternalLink>{" "}
          course, which helps you build the judgment to shape how frontier AI
          is governed. Over six weeks, you&rsquo;ll assess the evidence,
          compare competing strategies, and test your ideas through practical
          exercises and group discussion, leaving with a concrete plan for how
          you can contribute. Because the course leans heavily on US and China
          perspectives, our facilitators are encouraged to also bring in
          European and Dutch materials. Whatever your background, Safe AI
          Netherlands is here to help you take your next step toward a career
          in AI safety.
        </p>
        <p>
          No governance background needed. This is a foundational course that
          builds up the core ideas of AI governance step by step.
        </p>
      </>
    ),
    outlineTitle: "What you will learn each week",
    outline: [
      {
        title: "Assess frontier AI evidence",
        href: "https://bluedot.org/courses/ai-governance/1/1",
      },
      {
        title: "Map institutions and power",
        href: "https://bluedot.org/courses/ai-governance/2/1",
      },
      {
        title: "Compare governance strategies",
        href: "https://bluedot.org/courses/ai-governance/3/1",
      },
      {
        title: "Test proposals under pressure",
        href: "https://bluedot.org/courses/ai-governance/4/1",
      },
      {
        title: "Defend a position",
        href: "https://bluedot.org/courses/ai-governance/5/1",
      },
      {
        title: "Plan your AI safety career",
        href: "https://bluedot.org/courses/ai-governance/6/1",
      },
    ],
    note: courseNote,
  },
];

const prints: Print[] = [
  {
    src: "/photos/events/amsterdam/governance-graduation.jpg",
    widths: [320, 640, 900],
    alt: "Frontier AI Governance graduates holding their certificates of completion",
    caption: "Governance course graduation · SAIN Amsterdam",
    tilt: "xl:rotate-[-2deg]",
  },
  {
    src: "/photos/events/amsterdam/governance-course.jpg",
    widths: [320, 640, 900],
    alt: "Participants mapping AI governance mechanisms on a whiteboard covered in sticky notes",
    caption: "Frontier AI Governance session",
    tilt: "xl:rotate-[1.5deg]",
  },
  {
    src: "/photos/events/amsterdam/discussion-group.jpeg",
    widths: [320, 640, 900],
    alt: "A discussion group around a café table, some holding SAIN Amsterdam mugs",
    caption: "Discussion group · SAIN Amsterdam",
    tilt: "xl:rotate-[-1deg]",
  },
  {
    src: "/photos/events/amsterdam/chapter-meeting.jpg",
    widths: [320, 640, 900],
    alt: "Two organisers presenting the chapter's plans to a full room",
    caption: "Chapter meeting",
    tilt: "xl:rotate-[2deg]",
  },
];

const pastEvents = pastEventsThisYear(
  lumaPastEventsAmsterdam as RawPastEvent[],
);

export default function AmsterdamPage() {
  return (
    <>
      <ChapterHero
        city="Amsterdam"
        subheading="Free courses and a weekly discussion group across UvA, VU Amsterdam, and the city's tech scene, supported by ELLIS Unit Amsterdam."
        photo="/photos/cities/amsterdam-hero.jpg"
        photoAlt="Canal houses leaning over the water in central Amsterdam"
        caption="Amsterdam, where the courses run on site"
        belowCta={
          <p className="flex flex-wrap items-center gap-x-3 gap-y-2 pt-1 font-sans text-footnote text-navy/65">
            Supported by
            <a
              href={ELLIS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center"
            >
              <img
                src="/logos/ellis.svg"
                alt="ELLIS Unit Amsterdam"
                width={98}
                height={28}
                className="logo-ink h-7 w-auto"
              />
              <ArrowUpRight
                size={14}
                weight="regular"
                aria-hidden="true"
                className="ml-1 inline-block shrink-0 align-[-2px]"
              />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </p>
        }
      />

      <ShowUpBand
        city="Amsterdam"
        calendarId={LUMA_CALENDAR_ID}
        calendarUrl={LUMA_PUBLIC_URL}
        eventsEmail={EVENTS_EMAIL}
      />

      <CourseBand
        city="Amsterdam"
        heading="Two free courses run in Amsterdam"
        tail={
          <>
            <p className="font-sans text-body text-navy/74">
              A weekly discussion group on technical AI safety reads and
              discusses current research; about two hours a session, guided by
              experienced mentors.
            </p>
            <p className="-mt-2 font-sans text-label text-navy/74">
              Find the next discussion group on{" "}
              <a
                href="https://luma.com/SAIN_Amsterdam"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-navy underline decoration-navy/25 underline-offset-4 hover:decoration-navy focus-visible:decoration-navy"
              >
                SAIN Amsterdam&rsquo;s Luma page
                <ArrowUpRight size={16} weight="regular" aria-hidden="true" />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </p>
            <p className="font-sans text-body text-navy/74">
              Members also run research projects, currently including work on
              failure modes of multi-agent debate.
            </p>
            <Link
              href="/research"
              className="inline-flex items-center gap-2 self-start font-sans text-label text-navy underline decoration-navy/25 underline-offset-4 hover:decoration-navy focus-visible:decoration-navy"
            >
              Visit the Research hub
              <ArrowRight size={16} weight="regular" aria-hidden="true" />
            </Link>
          </>
        }
      >
        <CourseDisclosure courses={courses} />
      </CourseBand>

      <TeamBand
        city="Amsterdam"
        body="SAIN Amsterdam is directed by Ana Paula Castillo Rodriguez, with a team covering research, education, events, and PR. Formerly AI Safety Amsterdam (AISA), the chapter draws people from BSc students to professionals at companies like Deloitte and Shell, and from independent researchers to ELLIS assistant professors."
        team={team}
      />

      <EvidenceBand
        heading="This already happened in Amsterdam"
        body="The chapter's courses have drawn more than 120 applicants. It has also run a season of weekly discussion groups and presented at the AI020 Conference and TEDxUniversiteit van Amsterdam."
      >
        <PrintStrip
          prints={prints}
          label="Photographs from SAIN Amsterdam events"
        />

        <PastEvents events={pastEvents} />
      </EvidenceBand>

      <ChapterClose
        city="Amsterdam"
        eventsEmail={EVENTS_EMAIL}
        eduEmail={EDU_EMAIL}
        infoEmail={INFO_EMAIL}
        linktreeUrl={LINKTREE_URL}
      />
    </>
  );
}
