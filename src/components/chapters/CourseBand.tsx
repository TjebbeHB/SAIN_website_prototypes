import type { ReactNode } from "react";

import SectionOrbits from "@/components/landing/SectionOrbits";
import {
  COURSE_APPLICATION_URL,
  courseApplicationFor,
  type ChapterName,
} from "@/data/courseApplications";
import { COMMUNITY_JOIN_URL } from "@/data/siteContact";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

/**
 * The chapter's course, and whether you can apply to it today.
 *
 * Every word of the application state comes out of
 * `src/data/courseApplications.ts`: a cohort can never read open here and
 * closed on the landing, and a deadline is edited in one file. While a cohort
 * is closed the band carries no accent button at all, because the honest next
 * step is the community, not a form that will reject you.
 *
 * `#programs` is the anchor the rest of the site already links to. It does not
 * move.
 */
export default function CourseBand({
  city,
  heading,
  openLead = "Applications are open.",
  footnote,
  children,
  tail,
}: {
  city: ChapterName;
  heading: string;
  /** First sentence of the open state, where a city names its cohort. */
  openLead?: string;
  footnote?: ReactNode;
  children: ReactNode;
  /** What keeps running between cohorts, after the course's own footnote. */
  tail?: ReactNode;
}) {
  const application = courseApplicationFor(city);

  return (
    <section
      id="programs"
      aria-labelledby="programs-heading"
      className="relative isolate scroll-mt-36 overflow-hidden border-t border-navy/10 bg-page"
    >
      <SectionOrbits className="-left-20 top-10 h-[400px] w-[300px] md:-left-12" />
      <div className="shell band-section">
        <div className="max-w-[var(--container-copy)]">
          <h2
            id="programs-heading"
            className="font-serif text-heading text-navy"
          >
            {heading}
          </h2>

          {application.open ? (
            <>
              <p className="mt-3 font-sans text-body text-navy/74">
                {application.rolling ? (
                  application.chapterNote ?? application.rollingNote
                ) : (
                  <>
                    {openLead} Participants apply by{" "}
                    {application.deadlines.participants}; facilitators by{" "}
                    {application.deadlines.facilitators}.
                  </>
                )}
              </p>
              <a
                href={COURSE_APPLICATION_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-accent mt-6 gap-2"
              >
                Apply to the free course
                <ArrowUpRight size={16} weight="regular" aria-hidden="true" />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </>
          ) : (
            <p className="mt-3 font-sans text-body text-navy/74">
              Applications are closed. {application.closedNote}{" "}
              <a
                href={COMMUNITY_JOIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 underline decoration-navy/25 underline-offset-4 hover:decoration-navy focus-visible:decoration-navy"
              >
                Join the community
                <ArrowUpRight size={14} weight="regular" aria-hidden="true" />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>{" "}
              and you will hear when they open.
            </p>
          )}
        </div>

        <div className="mt-10 flex flex-col gap-8">{children}</div>

        {footnote ? (
          <p className="mt-8 max-w-[var(--container-copy-wide)] border-t border-navy/10 pt-4 font-sans text-footnote text-navy/65">
            {footnote}
          </p>
        ) : null}

        {tail && (
          <div className="mt-10 flex max-w-[var(--container-copy)] flex-col gap-5">
            {tail}
          </div>
        )}
      </div>
    </section>
  );
}
