import type { Metadata } from "next";
import Link from "next/link";

import ChapterClose from "@/components/chapters/ChapterClose";
import ChapterHero from "@/components/chapters/ChapterHero";
import CourseBand from "@/components/chapters/CourseBand";
import EvidenceBand from "@/components/chapters/EvidenceBand";
import PrintStrip, { type Print } from "@/components/chapters/PrintStrip";
import PublicationChips from "@/components/chapters/PublicationChips";
import ShowUpBand from "@/components/chapters/ShowUpBand";
import TeamBand, { type TeamMember } from "@/components/chapters/TeamBand";
import { aisigTeam } from "@/data/aisigTeam";
import { publications } from "@/data/research";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

export const metadata: Metadata = {
  title: "Groningen chapter",
  description:
    "Free courses, hackathons, and published research, running in Groningen since 2023. It began as the AI Safety Initiative Groningen (AISIG) and continues as SAIN Groningen.",
};

const LUMA_CALENDAR_ID = "cal-jjqTmBdWcqoyEUF";
const LUMA_PUBLIC_URL = "https://luma.com/user/SAINGroningen";

const EVENTS_EMAIL = "eventsgro@safeainetherlands.org";
const EDU_EMAIL = "edugro@safeainetherlands.org";
const INFO_EMAIL = "infogro@safeainetherlands.org";
const LINKTREE_URL = "https://linktr.ee/saingroningen";

/* The roster the chapter confirmed in September 2026, in the order it gave. */
const team: readonly TeamMember[] = aisigTeam;

const tracks = [
  {
    name: "Technical track",
    detail: "Mechanistic interpretability, adversarial attacks, complex systems.",
  },
  {
    name: "Governance track",
    detail:
      "Case studies and the regulatory, legal, and societal challenges of advanced AI.",
  },
];

/* Four photographs from the archive. The archive also holds event posters;
   those are graphics rather than evidence of a room, so they stay on the
   archive page and out of the prints. */
const prints: Print[] = [
  {
    src: "/photos/events/archive/archive-04.jpeg",
    widths: [320, 640],
    alt: "A speaker in front of the graduation slide at a Groningen ceremony",
    caption: "Course graduation · March 2026",
    tilt: "xl:rotate-[-2deg]",
  },
  {
    src: "/photos/events/archive/archive-08.jpeg",
    widths: [320, 640],
    alt: "Two participants presenting their final project to the room",
    caption: "Course graduation · November 2025",
    tilt: "xl:rotate-[1.5deg]",
  },
  {
    src: "/photos/events/archive/archive-10.jpg",
    widths: [320, 640],
    alt: "Organisers presenting to a seated audience at a Groningen evening",
    caption: "Pub quiz · October 2025",
    tilt: "xl:rotate-[-1deg]",
  },
  {
    src: "/photos/events/archive/archive-13.jpeg",
    widths: [320, 640],
    alt: "A full room of students at the start-of-year introduction social",
    caption: "Intro social · September 2025",
    tilt: "xl:rotate-[2deg]",
  },
];

/* The four papers this chapter's people are on, read out of the research hub's
   own file rather than retyped here. Venue, title and author list therefore
   cannot drift from /research, and the venues keep the word "workshop" they
   carry at source: these are workshop papers, and a bare "NeurIPS 2025" reads
   as the main conference to exactly the reader this page is written for. */
const CHIP_TITLES = [
  "Steering LLMs using Conceptors",
  "Self-Ablating Transformers",
  "The Anatomy of Alignment",
  "EU-Agent-Bench",
];

const chips = CHIP_TITLES.map((chipTitle) => {
  const paper = publications.find((p) => p.chipTitle === chipTitle);
  if (!paper) {
    throw new Error(`No publication in research.ts titled "${chipTitle}"`);
  }
  return {
    venue: paper.venueShort,
    title: paper.chipTitle,
    authors: paper.authors,
    url: paper.link,
  };
});

export default function GroningenPage() {
  return (
    <>
      <ChapterHero
        city="Groningen"
        subheading="Free courses, hackathons, and published research, running in Groningen since 2023. It began as the AI Safety Initiative Groningen (AISIG) and continues as SAIN Groningen."
        photo="/photos/cities/groningen-hero.jpg"
        photoAlt="A canal in Groningen with the Der Aa-kerk tower behind the houses"
        caption="Groningen, home of the chapter since 2023"
      />

      <ShowUpBand
        city="Groningen"
        calendarId={LUMA_CALENDAR_ID}
        calendarUrl={LUMA_PUBLIC_URL}
        eventsEmail={EVENTS_EMAIL}
      />

      <CourseBand
        city="Groningen"
        heading="One free course, two tracks"
        footnote={
          <>
            The course is independently run by SAIN Groningen and is not
            affiliated with the University of Groningen. Questions:{" "}
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
          <p className="font-sans text-body text-navy/74">
            Two discussion groups meet through the year, each with at least one
            experienced mentor: technical AI alignment (scalable oversight,
            evaluation and red-teaming, preference learning, robustness,
            deployment risks) and AI governance and privacy (policies,
            regulations, accountability, transparency and fairness).
          </p>
        }
      >
        <p className="max-w-[var(--container-copy)] font-sans text-body text-navy/74">
          We facilitate the Center for AI Safety course &ldquo;AI Safety,
          Ethics, and Society&rdquo; in two cohorts, one technical and one
          governance. Six weeks per block, about two hours of reading and two
          hours of discussion a week, on site in Groningen, with a certificate
          on completion. Selection is application-based. We run three to four
          cohorts a year, reaching around 60 people annually.
        </p>

        <dl className="grid max-w-[var(--container-copy-wide)] gap-6 md:grid-cols-2 md:gap-8">
          {tracks.map((track) => (
            <div
              key={track.name}
              className="border-l border-navy/14 py-1 pl-[18px]"
            >
              <dt className="font-serif text-title-sm text-navy">
                {track.name}
              </dt>
              <dd className="mt-1.5 font-sans text-ui text-navy/74">
                {track.detail}
              </dd>
            </div>
          ))}
        </dl>
      </CourseBand>

      <TeamBand
        city="Groningen"
        body="SAIN Groningen is directed by Tarteel Mohamed, with work organised across four teams: education, events, communications, and research operations; a structure other chapters are adopting as they spin up. The chapter grew out of the AI Safety Initiative Groningen (AISIG), running since 2023."
        team={team}
      />

      <EvidenceBand
        heading="30 events and counting"
        body="Since October 2023 the chapter has run 30 events: hackathons, course graduations, research talks, pub quizzes, and socials; first as AISIG and, since 30 April 2026, as SAIN Groningen. Members' research has been published at NeurIPS and ICLR workshops."
      >
        <div>
          <PrintStrip
            prints={prints}
            label="Photographs from SAIN Groningen events"
          />
          <Link
            href="/chapters/groningen/events"
            className="btn-outline-ink mt-2"
          >
            Browse the events archive
          </Link>
        </div>

        <div className="max-w-[var(--container-copy-wide)]">
          <PublicationChips publications={chips} />
          <p className="mt-4">
            <Link
              href="/research"
              className="inline-flex items-center gap-2 font-sans text-label text-navy underline decoration-navy/25 underline-offset-4 hover:decoration-navy focus-visible:decoration-navy"
            >
              Visit the Research hub
              <ArrowRight size={16} weight="regular" aria-hidden="true" />
            </Link>
          </p>
        </div>
      </EvidenceBand>

      <ChapterClose
        city="Groningen"
        eventsEmail={EVENTS_EMAIL}
        eduEmail={EDU_EMAIL}
        infoEmail={INFO_EMAIL}
        linktreeUrl={LINKTREE_URL}
      />
    </>
  );
}
