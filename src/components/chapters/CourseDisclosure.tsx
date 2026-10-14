"use client";

import {
  Fragment,
  type ReactNode,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, CaretDown } from "@phosphor-icons/react/dist/ssr";

/**
 * The landing's disclosure tabs, carrying a chapter's courses instead of the
 * national tracks: square headers over one shared panel, the active one white
 * with a 3px orange underline that slides between them and an orange-ink
 * index, so state is never colour alone.
 *
 * Below md the markup interleaves header and panel, because a strip at the top
 * of a phone screen and a panel below the fold means switching course is a
 * scroll up and a scroll back down. There, one may be closed to nothing; on the
 * strip one is always open.
 *
 * Closed panels leave the flow at every width. They used to stay in the shared
 * cell from md up, invisible, so a short course sat above the empty height of
 * the longest one (Utrecht's ARENA under Fundamentals' session list).
 */

/**
 * One row of a course outline. A plain string is the theme; the object form
 * adds a session line (date, time, room) and a sentence on what the session
 * covers, for a cohort whose calendar is fixed.
 */
export type OutlinePath = {
  title: string;
  meta?: string;
  detail?: string;
};

export type OutlineItem =
  | string
  | {
      title: string;
      /** "Wed 23 Sep · 18:00-19:00 · Janskerkhof 2-3, Room 0.19" */
      meta?: string;
      detail?: string;
      /** Where the session's material lives; the title becomes the link. */
      href?: string;
      /** A session that splits: the reader picks one of these, or both. */
      paths?: OutlinePath[];
    };

export type Course = {
  id: string;
  title: string;
  /** What it is, how long, where, what you leave with. A string is one
   *  paragraph; pass <p> elements for several, or for inline links. */
  summary: ReactNode;
  outlineTitle: string;
  outline: OutlineItem[];
  /** Small print under the outline, read with this course only. */
  note?: ReactNode;
};

/* Written out: Tailwind reads class names as literals, so an interpolated
   column number would never reach the stylesheet. */
const TAB_CELL = ["md:col-start-1", "md:col-start-2", "md:col-start-3"];
const COMPACT = "(max-width: 767.98px)";

function useCompact() {
  return useSyncExternalStore(
    (onChange) => {
      const query = window.matchMedia(COMPACT);
      query.addEventListener("change", onChange);
      return () => query.removeEventListener("change", onChange);
    },
    () => window.matchMedia(COMPACT).matches,
    () => false,
  );
}

export default function CourseDisclosure({ courses }: { courses: Course[] }) {
  const [activeId, setActiveId] = useState<string | null>(courses[0].id);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const compact = useCompact();
  const reduce = useReducedMotion();

  const toggle = (id: string) =>
    setActiveId((current) => (current === id && compact ? null : id));

  /* Carried back from a phone by a rotation or a resized window. */
  useEffect(() => {
    if (!compact && activeId === null) setActiveId(courses[0].id);
  }, [compact, activeId, courses]);

  /* The landing and /courses link to #course-<id>, the header's own id, so
     the browser already scrolls to it; this opens it too. */
  useEffect(() => {
    const fromHash = () => {
      const id = window.location.hash.replace("#course-", "");
      if (!courses.some((c) => c.id === id)) return;
      setActiveId(id);
      requestAnimationFrame(() =>
        document.getElementById(`course-${id}`)?.scrollIntoView({ block: "start" }),
      );
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, [courses]);

  const onHeaderKeyDown = (index: number) => (event: React.KeyboardEvent) => {
    const delta =
      event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    if (!delta) return;
    event.preventDefault();
    const next = (index + delta + courses.length) % courses.length;
    setActiveId(courses[next].id);
    tabRefs.current[next]?.focus();
  };

  const columns =
    courses.length === 2 ? "md:grid-cols-2" : "md:grid-cols-3";
  const panelSpan =
    courses.length === 2
      ? "md:col-start-1 md:col-end-3 md:row-start-2"
      : "md:col-start-1 md:col-end-4 md:row-start-2";

  return (
    <div
      className={`bg-page md:grid ${columns}`}
      role="group"
      aria-label="Courses in this chapter"
    >
      {courses.map((course, i) => {
        const on = course.id === activeId;
        return (
          <Fragment key={course.id}>
            <button
              ref={(node) => {
                tabRefs.current[i] = node;
              }}
              type="button"
              id={`course-${course.id}`}
              aria-expanded={on}
              aria-controls={`course-panel-${course.id}`}
              onClick={() => toggle(course.id)}
              onKeyDown={onHeaderKeyDown(i)}
              className={`relative flex w-full min-h-[88px] scroll-mt-36 items-center gap-4 border-t border-navy/12 px-6 py-5 text-left transition-colors md:flex-col md:items-stretch md:justify-center md:gap-1.5 md:border-t-0 ${
                i > 0 ? "md:border-l md:border-l-navy/10" : ""
              } ${
                on
                  ? "border-b-[3px] border-b-orange md:border-b-transparent"
                  : "border-b-[3px] border-b-transparent hover:bg-cream focus-visible:bg-cream"
              } ${TAB_CELL[i]} md:row-start-1`}
            >
              {on && (
                <motion.span
                  layoutId="chapter-course-indicator"
                  className="absolute inset-x-0 -bottom-[3px] hidden h-[3px] bg-orange md:block"
                  transition={{
                    duration: reduce ? 0 : 0.3,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                />
              )}
              <span className="flex min-w-0 flex-1 flex-col gap-1.5 md:contents">
                <span
                  className={`font-sans text-index tracking-normal ${
                    on ? "text-orange-ink" : "text-navy/65"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={`font-serif text-xl leading-6 ${
                    on ? "text-navy" : "text-navy/72"
                  }`}
                >
                  {course.title}
                </span>
              </span>
              <CaretDown
                size={13}
                weight="bold"
                aria-hidden="true"
                className={`shrink-0 text-navy/45 transition-transform duration-200 md:hidden ${
                  on ? "rotate-180" : ""
                }`}
              />
            </button>

            <motion.div
              initial={false}
              aria-hidden={!on}
              {...(on ? {} : ({ inert: "" } as Record<string, string>))}
              id={`course-panel-${course.id}`}
              role="region"
              aria-labelledby={`course-${course.id}`}
              tabIndex={on ? 0 : -1}
              animate={{ opacity: on ? 1 : 0 }}
              transition={{
                duration: reduce || !on ? 0 : 0.2,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`${on ? "flex" : "hidden"} ${panelSpan} w-full flex-col gap-[18px] px-6 py-8 md:border-t md:border-navy/12 md:px-8 ${
                on ? "" : "pointer-events-none"
              }`}
            >
              {typeof course.summary === "string" ? (
                <p className="max-w-[var(--container-copy-wide)] font-sans text-[15.5px] leading-[25px] text-navy/78">
                  {course.summary}
                </p>
              ) : (
                <div className="flex max-w-[var(--container-copy-wide)] flex-col gap-3 font-sans text-[15.5px] leading-[25px] text-navy/78">
                  {course.summary}
                </div>
              )}

              <div className="max-w-[var(--container-copy-wide)]">
                <p className="kicker pb-2 text-kicker-sm text-navy/65">
                  {course.outlineTitle}
                </p>
                <ol className="font-sans text-ui text-navy">
                  {course.outline.map((raw, index) => {
                    const item = typeof raw === "string" ? { title: raw } : raw;
                    return (
                      <li
                        key={item.title}
                        className={`flex items-baseline gap-3 border-t border-navy/10 ${
                          item.meta || item.detail || item.paths ? "py-3" : "py-[7px]"
                        }`}
                      >
                        <span className="w-[22px] shrink-0 font-sans text-xs text-orange-ink">
                          {index + 1}
                        </span>
                        <span className="min-w-0">
                          {item.href ? (
                            <a
                              href={item.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-baseline gap-1.5 underline decoration-navy/25 underline-offset-4 hover:decoration-navy focus-visible:decoration-navy"
                            >
                              {item.title}
                              <ArrowUpRight
                                size={13}
                                weight="regular"
                                aria-hidden="true"
                                className="shrink-0 self-center text-navy/55"
                              />
                              <span className="sr-only"> (opens in a new tab)</span>
                            </a>
                          ) : (
                            item.title
                          )}
                          {item.meta ? (
                            <span className="mt-0.5 block font-sans text-footnote text-navy/65">
                              {item.meta}
                            </span>
                          ) : null}
                          {item.detail ? (
                            <span className="mt-1 block font-sans text-caption leading-[20px] text-navy/74">
                              {item.detail}
                            </span>
                          ) : null}
                          {item.paths?.length ? (
                            /* The two-track columns on one hairline, the same
                               geometry Groningen's tracks use, nested in the
                               session that forks. */
                            <span className="mt-4 grid gap-4 md:grid-cols-2 md:gap-6">
                              {item.paths.map((path) => (
                                <span
                                  key={path.title}
                                  className="block border-l border-navy/14 py-0.5 pl-4"
                                >
                                  <span className="block font-serif text-title-sm text-navy">
                                    {path.title}
                                  </span>
                                  {path.meta ? (
                                    <span className="mt-0.5 block font-sans text-footnote text-navy/65">
                                      {path.meta}
                                    </span>
                                  ) : null}
                                  {path.detail ? (
                                    <span className="mt-1 block font-sans text-caption leading-[20px] text-navy/74">
                                      {path.detail}
                                    </span>
                                  ) : null}
                                </span>
                              ))}
                            </span>
                          ) : null}
                        </span>
                      </li>
                    );
                  })}
                </ol>
              </div>

              {course.note ? (
                <p className="max-w-[var(--container-copy-wide)] border-t border-navy/10 pt-4 font-sans text-footnote text-navy/65">
                  {course.note}
                </p>
              ) : null}
            </motion.div>
          </Fragment>
        );
      })}
    </div>
  );
}
