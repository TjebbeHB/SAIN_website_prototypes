"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, ArrowUpRight, CaretDown } from "@phosphor-icons/react/dist/ssr";

import {
  COURSE_APPLICATION_URL,
  courseApplicationFor,
  type ChapterName,
} from "@/data/courseApplications";
import { ATLAS } from "@/data/chapterAtlas";

/**
 * The chapters as an atlas: the three cities set as a vertical index on the
 * left, and the open chapter on the right with its photograph, its record, its
 * course and its live calendar. This is the page's answer to "which room is
 * mine, and what is on there", in one band instead of an index strip, a
 * deadline table and a calendar band.
 *
 * Every fact here is one the chapter's own page already states; the chapter
 * pages are the source, this is the digest. Course state comes from
 * courseApplications.ts so a cohort can never be open here and closed there.
 *
 * Markup interleaves header, panel, header, panel, so below lg each chapter
 * opens under its own name (the course tabs' reasoning). From lg the grid
 * lifts the headers into the left column and stacks every panel in one cell
 * on the right. A Luma document is expensive to load and flashes as it
 * arrives, so a calendar is mounted on first open and then kept, hidden.
 */

/* Left column rows one to three; every panel shares the right-hand cell. */
const HEAD_CELL = ["lg:row-start-1", "lg:row-start-2", "lg:row-start-3"];
const PANEL_CELL = "lg:col-start-2 lg:row-start-1 lg:row-end-5";

function CourseLine({ city, course }: { city: ChapterName; course: string }) {
  const entry = courseApplicationFor(city);
  return (
    <div className="border-t border-navy/10 pt-4">
      <p className="kicker text-kicker-sm text-navy/65">The free course</p>
      <p className="mt-1.5 font-serif text-title-sm text-navy">{course}</p>
      {entry.open ? (
        <>
          <p className="mt-1.5 font-sans text-caption text-navy/65">
            {entry.rolling ? (
              entry.rollingNote
            ) : (
              <>
                Participants by {entry.deadlines.participants}. Facilitators by{" "}
                {entry.deadlines.facilitators}.
              </>
            )}
          </p>
          <a
            href={COURSE_APPLICATION_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-accent mt-4 gap-2"
          >
            Apply to the free course
            <ArrowUpRight size={16} weight="regular" aria-hidden="true" />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </>
      ) : (
        <p className="mt-1.5 font-sans text-caption text-navy/65">
          Applications are closed. {entry.closedNote}
        </p>
      )}
    </div>
  );
}

export default function ChapterAtlas() {
  const [activeId, setActiveId] = useState(ATLAS[0].id);
  const [visited, setVisited] = useState<string[]>([ATLAS[0].id]);
  const headRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const reduce = useReducedMotion();

  const open = (id: string) => {
    setActiveId(id);
    setVisited((ids) => (ids.includes(id) ? ids : [...ids, id]));
  };

  /* The hero prints link to #chapter-<city>; land on that chapter. */
  useEffect(() => {
    const fromHash = () => {
      const id = window.location.hash.replace("#chapter-", "");
      if (!ATLAS.some((c) => c.id === id)) return;
      open(id);
      /* No element carries the hash (the panels share one cell from lg), so
         scroll here: to the band from lg, to the chapter's own header below. */
      const target = window.matchMedia("(min-width: 1024px)").matches
        ? document.getElementById("chapters")
        : document.getElementById(`atlas-head-${id}`);
      requestAnimationFrame(() => target?.scrollIntoView({ block: "start" }));
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, []);

  const onHeadKeyDown = (index: number) => (event: React.KeyboardEvent) => {
    const delta =
      event.key === "ArrowDown" || event.key === "ArrowRight"
        ? 1
        : event.key === "ArrowUp" || event.key === "ArrowLeft"
          ? -1
          : 0;
    if (!delta) return;
    event.preventDefault();
    const next = (index + delta + ATLAS.length) % ATLAS.length;
    open(ATLAS[next].id);
    headRefs.current[next]?.focus();
  };

  return (
    <div
      role="group"
      aria-label="The chapters"
      className="lg:grid lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] lg:grid-rows-[auto_auto_auto_1fr] lg:gap-x-14 xl:grid-cols-[minmax(0,380px)_minmax(0,1fr)] xl:gap-x-20"
    >
      {ATLAS.map((chapter, i) => {
        const on = chapter.id === activeId;
        return (
          <Fragment key={chapter.id}>
            <button
              ref={(node) => {
                headRefs.current[i] = node;
              }}
              type="button"
              id={`atlas-head-${chapter.id}`}
              aria-expanded={on}
              aria-controls={`atlas-panel-${chapter.id}`}
              onClick={() => open(chapter.id)}
              onKeyDown={onHeadKeyDown(i)}
              className={`group relative flex w-full scroll-mt-36 items-center gap-5 border-t border-navy/12 py-6 text-left lg:col-start-1 lg:py-7 ${HEAD_CELL[i]} ${
                i === ATLAS.length - 1 ? "border-b lg:border-b-navy/12" : ""
              }`}
            >
              <span className="flex min-w-0 flex-1 flex-col gap-1.5">
                <span className="relative self-start">
                  <span
                    className={`font-serif text-heading transition-colors duration-300 ${
                      on ? "text-navy" : "text-navy/40 group-hover:text-navy/70 group-focus-visible:text-navy/70"
                    }`}
                  >
                    {chapter.city}
                  </span>
                  {on && (
                    <motion.span
                      layoutId="atlas-rule"
                      aria-hidden="true"
                      className="absolute -bottom-1 left-0 h-[3px] w-full bg-orange"
                      transition={{ duration: reduce ? 0 : 0.35, ease: [0.16, 1, 0.3, 1] }}
                    />
                  )}
                </span>
                <span
                  className={`kicker text-kicker-sm transition-colors duration-300 ${
                    on ? "text-navy/65" : "text-navy/45"
                  }`}
                >
                  {chapter.origin}
                </span>
              </span>
              <CaretDown
                size={14}
                weight="bold"
                aria-hidden="true"
                className={`shrink-0 text-navy/45 transition-transform duration-200 lg:hidden ${
                  on ? "rotate-180" : ""
                }`}
              />
            </button>

            {visited.includes(chapter.id) && (
              <div
                id={`atlas-panel-${chapter.id}`}
                role="region"
                aria-labelledby={`atlas-head-${chapter.id}`}
                hidden={!on}
                className={`${PANEL_CELL} pb-8 lg:pb-0`}
              >
                <motion.div
                  key={on ? "on" : "off"}
                  initial={reduce ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col"
                >
                  <figure className="relative aspect-[2/1] overflow-hidden bg-cream xl:aspect-[3/1]">
                    <img
                      src={`${chapter.photo}-960.webp`}
                      srcSet={`${chapter.photo}-640.webp 640w, ${chapter.photo}-960.webp 960w, ${chapter.photo}-1280.webp 1280w`}
                      sizes="(min-width: 1440px) 880px, (min-width: 1024px) 64vw, 100vw"
                      alt={chapter.photoAlt}
                      className="absolute inset-0 size-full object-cover"
                    />
                    <figcaption className="kicker absolute bottom-0 left-0 bg-inverse/88 px-5 py-2.5 text-kicker-sm text-white">
                      SAIN {chapter.city}
                    </figcaption>
                  </figure>

                  <div className="grid gap-10 pt-8 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] xl:gap-12">
                    <div className="flex flex-col gap-6">
                      <p className="font-sans text-body text-navy/78">{chapter.summary}</p>
                      <dl className="flex flex-col">
                        {chapter.facts.map((fact) => (
                          <div
                            key={fact.label}
                            className="grid gap-1 border-t border-navy/10 py-3 sm:grid-cols-[132px_minmax(0,1fr)] sm:gap-4"
                          >
                            <dt className="kicker text-kicker-sm text-navy/60">{fact.label}</dt>
                            <dd className="font-sans text-ui text-navy">{fact.value}</dd>
                          </div>
                        ))}
                      </dl>
                      <CourseLine city={chapter.city} course={chapter.course} />
                      <Link
                        href={chapter.href}
                        className="group/link inline-flex items-center gap-2 self-start font-sans text-label text-navy underline decoration-navy/25 underline-offset-4 hover:decoration-navy focus-visible:decoration-navy"
                      >
                        Everything on SAIN {chapter.city}
                        <ArrowRight
                          size={16}
                          weight="regular"
                          aria-hidden="true"
                          className="transition-transform duration-300 group-hover/link:translate-x-0.5"
                        />
                      </Link>
                    </div>

                    <div className="flex flex-col">
                      <p className="kicker pb-3 text-kicker-sm text-navy/65">
                        Coming up in {chapter.city}
                      </p>
                      {/* A third-party document does not get to decide how
                          tall this band is: fixed height, its own scrollport,
                          white like Luma's light theme so it does not flash. */}
                      <div className="h-[460px] overflow-auto border border-navy/10 bg-page">
                        <iframe
                          src={`https://luma.com/embed/calendar/${chapter.calendar}/events?lt=light`}
                          title={`Upcoming SAIN ${chapter.city} events`}
                          loading="lazy"
                          className="h-full w-full border-0"
                          allowFullScreen
                        />
                      </div>
                      <a
                        href={chapter.calendarUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-flex items-center gap-1.5 self-start font-sans text-caption text-navy/72 underline decoration-navy/20 underline-offset-4 hover:text-navy hover:decoration-navy focus-visible:decoration-navy"
                      >
                        The full {chapter.city} calendar on Luma
                        <ArrowUpRight size={14} weight="regular" aria-hidden="true" />
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </Fragment>
        );
      })}

      {/* Under the index, from lg: the one note every calendar shares. */}
      <div className="hidden lg:col-start-1 lg:row-start-4 lg:block lg:self-end">
        <p className="pt-8 font-sans text-caption text-navy/60">
          Events are walk-in unless the event page says otherwise. Questions? Each
          chapter lists its events contact on its own page.
        </p>
      </div>
    </div>
  );
}
