import type { Metadata } from "next";
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
import PublicationChips from "@/components/chapters/PublicationChips";
import ShowUpBand from "@/components/chapters/ShowUpBand";
import TeamBand, { type TeamMember } from "@/components/chapters/TeamBand";
import lumaPastEventsUtrecht from "@/data/lumaPastEventsUtrecht.json";
import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

export const metadata: Metadata = {
  title: "Utrecht chapter",
  description:
    "A free AI safety course, two discussion groups, and a growing research track at Utrecht University. Run by volunteers, open to anyone in the city.",
};

/* Utrecht's Luma calendar, as read out of the chapter's own embed. The fetch
   script that writes lumaPastEventsUtrecht.json still points at a different
   `cal-` id; see the report filed with this page. */
const LUMA_CALENDAR_ID = "cal-2gYun0D26BriJ5z";
const LUMA_PUBLIC_URL = "https://lu.ma/sain-utrecht-events";

const EVENTS_EMAIL = "eventsutr@safeainetherlands.org";
const EDU_EMAIL = "eduutr@safeainetherlands.org";
const INFO_EMAIL = "infoutr@safeainetherlands.org";
const LINKTREE_URL = "https://linktr.ee/sainutrecht";
const LINKEDIN_POSTS_URL = "https://www.linkedin.com/company/sain-utrecht/posts/";
const DEVPOST_URL =
  "https://win4aisafety-sain-utrecht.devpost.com/project-gallery";

const courses: Course[] = [
  {
    id: "fundamentals",
    title: "AI Safety Fundamentals",
    summary:
      "AI Safety Fundamentals has run three times in Utrecht, reaching more than 100 participants: BSc and MSc students, researchers, engineers, and public-sector staff. Four weeks, one hour of reading and a one-hour lecture a week, at Utrecht University in the city centre. In week four you choose a technical path, a governance path, or both. You get a certificate for attending all sessions; no previous background is needed.",
    /* The autumn 2026 cohort's calendar, session by session, as the chapter
       published it (upstream #54). Update the dates and rooms with each
       cohort, or drop the meta lines back to plain themes between cohorts. */
    outlineTitle: "Sessions, autumn 2026",
    outline: [
      {
        title: "Introduction",
        meta: "Wed 23 Sep · 18:00-19:00 · Janskerkhof 2-3, Room 0.19",
        detail:
          "High-level overview of AI safety, why it matters now, capabilities and diffusion, types of risks, and solution strategies, technical and governance.",
      },
      {
        title: "Types of risks and incidents",
        meta: "Wed 30 Sep · 18:00-19:00 · Janskerkhof 2-3, Room 0.19",
        detail:
          "Social harms, frontier risks, misuse, loss of control; real-world cases and how research lags behind deployment.",
      },
      {
        title: "Why AI safety is difficult",
        meta: "Wed 7 Oct · 18:00-19:00 · Janskerkhof 15A, Room 101",
        detail:
          "Industry incentives, funding gaps, expert disagreement, slow regulation against fast labs, geopolitical race dynamics.",
      },
      {
        title: "Path specialisation",
        detail: "The fourth week splits in two. Take one path, or both.",
        paths: [
          {
            title: "Technical AI safety",
            meta: "Wed 14 Oct · 18:00-19:00 · Janskerkhof 2-3, Room 0.19",
            detail: "Jailbreaking, the scalable oversight problem, RLHF and reward signals.",
          },
          {
            title: "Governance",
            meta: "Thu 15 Oct · 18:00-19:00 · Drift 23, Room 103",
            detail:
              "Overview of the EU AI Act, accountability in AI systems, international actors in AI safety.",
          },
        ],
      },
    ],
  },
  {
    id: "technical",
    title: "Technical AI safety (ARENA)",
    summary:
      "The technical course teaches from ARENA, an open technical AI safety curriculum; SAIN Utrecht is the first SAIN chapter to teach from it. Four weeks of weekly lectures (about 90 minutes) plus hands-on notebooks, in person at Utrecht University and streamed online. Prerequisites: Python, plus linear algebra and probability. You get the certificate by completing the notebooks and attending in person.",
    outlineTitle: "Weekly themes",
    outline: [
      "Transformers and mechanistic interpretability (opening a model up to study what its internals compute)",
      "Probing and representations",
      "PPO and RLHF (the techniques used to train models from human feedback)",
      "RLHF, GRPO and reward hacking",
    ],
  },
];

const team: readonly TeamMember[] = [
  {
    name: "Riccardo Campanella",
    title: "Director",
    linkedin: "https://www.linkedin.com/in/riccardo-campanella/",
  },
  {
    name: "Luca 'Dug' Dughera",
    title: "Events Lead",
    linkedin: "https://www.linkedin.com/in/luca-dughera/",
  },
  {
    name: "Carolien Tran",
    title: "Discussion Group Lead",
    linkedin: "https://www.linkedin.com/in/carolientran/",
  },
  {
    name: "Elena Clacova",
    title: "Communication Lead",
    linkedin: "https://www.linkedin.com/in/elenaclacova/",
  },
  {
    name: "Cem Kaya",
    title: "Research Operations",
    linkedin: "https://www.linkedin.com/in/cem-kaya-om8/",
  },
  {
    name: "Dimitra Tsolka",
    title: "Facilitator",
    linkedin: "https://www.linkedin.com/in/dimitra-tsolka/",
  },
  {
    name: "Max Schaffelder",
    title: "Advisor",
    linkedin: "https://www.linkedin.com/in/maxschaffelder/",
  },
];

const prints: Print[] = [
  {
    src: "/photos/events/utrecht/aisfundamentals-graduation-ceremony.jpeg",
    widths: [320, 640, 900],
    alt: "The AI Safety Fundamentals cohort together at their graduation",
    caption: "Programme graduation · SAIN Utrecht",
    tilt: "xl:rotate-[-2deg]",
  },
  {
    src: "/photos/events/utrecht/win4AISafety_congrats_the_winners.jpg",
    widths: [320, 640, 900],
    alt: "The winning team of the Win4AISafety research challenge",
    caption: "Win4AISafety winners · SAIN Utrecht",
    tilt: "xl:rotate-[1.5deg]",
  },
  {
    src: "/photos/events/utrecht/discussion-eu2031.jpeg",
    widths: [320, 640],
    alt: "A discussion group seated around a table in Utrecht",
    caption: "Europe 2031 scenario discussion",
    tilt: "xl:rotate-[-1deg]",
  },
  {
    src: "/photos/events/utrecht/technical-week-2.jpeg",
    widths: [320, 640, 900],
    alt: "A lecture during week two of the technical AI safety course",
    caption: "Technical course, week 2",
    tilt: "xl:rotate-[2deg]",
  },
];

const pastEvents = pastEventsThisYear(
  lumaPastEventsUtrecht as RawPastEvent[],
);

export default function UtrechtPage() {
  return (
    <>
      <ChapterHero
        city="Utrecht"
        subheading="A free AI safety course, two discussion groups, and a growing research track at Utrecht University. Run by volunteers, open to anyone in the city."
        photo="/photos/cities/utrecht-hero.jpg"
        photoAlt="The Dom tower rising over the houses of Utrecht city centre"
        caption="Utrecht city centre, where the course meets"
      />

      <ShowUpBand
        city="Utrecht"
        calendarId={LUMA_CALENDAR_ID}
        calendarUrl={LUMA_PUBLIC_URL}
        eventsEmail={EVENTS_EMAIL}
      />

      <CourseBand
        city="Utrecht"
        heading="Two free courses run in Utrecht"
        openLead="Applications for the autumn cohort are open."
        footnote={
          <>
            These courses are independently run by SAIN Utrecht and are not
            affiliated with Utrecht University. Questions:{" "}
            <a
              href={`mailto:${EDU_EMAIL}`}
              className="underline decoration-navy/25 underline-offset-4 hover:decoration-navy focus-visible:decoration-navy"
            >
              {EDU_EMAIL}
            </a>
            .
          </>
        }
        tail={
          <>
            <p className="font-sans text-body text-navy/74">
              Between cohorts, two discussion groups keep meeting: one on
              technical AI safety, currently a mechanistic interpretability
              reading group, and one on AI governance and policy.
            </p>
            <p className="-mt-2 font-sans text-label text-navy/74">
              Find the next discussion group on{" "}
              <a
                href={LUMA_PUBLIC_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-navy underline decoration-navy/25 underline-offset-4 hover:decoration-navy focus-visible:decoration-navy"
              >
                SAIN Utrecht&rsquo;s Luma page
                <ArrowUpRight size={16} weight="regular" aria-hidden="true" />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </p>
            <p className="font-sans text-body text-navy/74">
              The chapter is building a research track: red-teaming language
              models, safety evaluation, interpretability, and agent behaviour.
              The Research Hub launches in October 2026.
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
        city="Utrecht"
        body="SAIN Utrecht is directed by Riccardo Campanella. The team is growing across four areas: education, events, communication, and research. The chapter's work is funded by BERI, with mentorship from Pathfinder."
        team={team}
      />

      <EvidenceBand
        heading="This already happened in Utrecht"
        body="Over the past year the chapter ran the Win4AISafety open research summer challenge, a full technical course with a closing dinner, discussion groups including a Europe 2031 scenario session, and research talks, including an Anthropic researcher speaking to more than 60 people."
      >
        <div>
          <PrintStrip
            prints={prints}
            label="Photographs from SAIN Utrecht events"
          />
          <p className="font-sans text-footnote text-navy/65 xl:mt-2">
            <a
              href={DEVPOST_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 underline decoration-navy/25 underline-offset-4 hover:decoration-navy focus-visible:decoration-navy"
            >
              See the submissions on Devpost
              <ArrowUpRight size={14} weight="regular" aria-hidden="true" />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </p>
        </div>

        <PastEvents
          events={pastEvents}
          recapsUrl={LINKEDIN_POSTS_URL}
          recapsLabel="Recaps on LinkedIn"
        />

        <div className="max-w-[var(--container-copy-wide)]">
          <PublicationChips
            publications={[
              {
                venue: "arXiv",
                title:
                  "Are LLM Belief Updates Consistent with Bayes' Theorem?",
                url: "https://arxiv.org/abs/2507.17951",
                readLabel: true,
              },
            ]}
          />
          <p className="mt-3 font-sans text-footnote text-navy/65">
            Members of SAIN Utrecht contributed to this research.
          </p>
        </div>
      </EvidenceBand>

      <ChapterClose
        city="Utrecht"
        eventsEmail={EVENTS_EMAIL}
        eduEmail={EDU_EMAIL}
        infoEmail={INFO_EMAIL}
        linktreeUrl={LINKTREE_URL}
      />
    </>
  );
}
