"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, X as XIcon } from "@phosphor-icons/react/dist/ssr";

import {
  courseApplications,
  formatCityList,
  openCourseApplications,
} from "@/data/courseApplications";

/**
 * The course announcement, shown once per cohort.
 *
 * It appears only while at least one chapter is taking applications, so the
 * data file is the switch: close the last cohort and the popup is gone
 * site-wide. A reader who dismisses it is not asked again for that cohort;
 * the dismissal is stored against the open chapters and their deadlines, so
 * the next cohort, with new dates, shows it once more without anyone editing
 * a version string.
 *
 * Design review: append `?preview-popup` to any URL and it opens regardless
 * of the data and of any dismissal. Closed chapters then show their closed
 * note in place of a deadline, so the layout can be judged with real copy.
 *
 * Two panels on a square sheet. The claim sits on navy, the ground the
 * system reserves for asking a decision, with the hero's orbital linework
 * and one orange sparkle; the cities sit on white as hairline rows that are
 * themselves the links, a deadline under each name, and one accent button to
 * the courses page. Nothing rounded, nothing glassy.
 */

const OPEN_DELAY_MS = 1500;
const PREVIEW_PARAM = "preview-popup";

/* One key per cohort: the open chapters and their participant deadlines. A
   rolling chapter has no cohort date, so its part of the key never changes. */
const DISMISS_KEY = `sain:course-popup-dismissed:${openCourseApplications
  .map((c) => `${c.chapter}:${c.rolling ? "rolling" : c.deadlines.participants}`)
  .join("|")}`;

export default function CoursePopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [preview, setPreview] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const forced = new URLSearchParams(window.location.search).has(PREVIEW_PARAM);
    setPreview(forced);
    if (forced) {
      setIsOpen(true);
      return;
    }
    if (openCourseApplications.length === 0) return;

    let dismissed = false;
    try {
      dismissed = window.localStorage.getItem(DISMISS_KEY) === "true";
    } catch {
      /* Blocked storage: show it, and it simply returns next visit. */
    }
    if (dismissed) return;

    const timer = window.setTimeout(() => setIsOpen(true), OPEN_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    if (preview) return;
    try {
      window.localStorage.setItem(DISMISS_KEY, "true");
    } catch {
      /* Nothing to persist to. */
    }
  }, [preview]);

  /* Scroll lock, focus trap, Escape. */
  useEffect(() => {
    if (!isOpen) return;
    previouslyFocused.current = document.activeElement as HTMLElement | null;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
        return;
      }
      if (event.key !== "Tab") return;
      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
        "a[href], button:not([disabled])",
      );
      if (!focusable || focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflow;
      previouslyFocused.current?.focus();
    };
  }, [isOpen, close]);

  if (typeof document === "undefined") return null;

  /* Open chapters lead. In preview every chapter is listed so the closed
     state can be seen too. */
  const listed = preview
    ? [...courseApplications].sort((a, b) => Number(b.open) - Number(a.open))
    : openCourseApplications;
  const open = listed.filter((c) => c.open);
  const cities = formatCityList(open.length ? open : listed);

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center p-4 sm:items-center sm:p-6">
          <motion.div
            className="absolute inset-0 bg-inverse/55"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.25 }}
            onClick={close}
          />

          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="course-popup-title"
            aria-describedby="course-popup-description"
            tabIndex={-1}
            className="relative grid max-h-[calc(100dvh-2rem)] w-full max-w-[880px] overflow-y-auto bg-page shadow-[0_18px_60px_#021C4D40] outline-none md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
            transition={{ duration: reduce ? 0 : 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* The claim, on the inverse ground the system reserves for a
                decision, with the hero's orbital linework bleeding off the
                corner and its one sparkle. */}
            <div className="relative isolate overflow-hidden bg-inverse px-7 pb-8 pt-7 text-white sm:px-9 sm:pb-10 sm:pt-9">
              <svg
                className="pointer-events-none absolute -bottom-20 -left-16 h-[300px] w-[300px] text-white opacity-[0.14]"
                viewBox="0 0 300 300"
                fill="none"
                aria-hidden="true"
              >
                <g stroke="currentColor" strokeWidth="1">
                  <circle cx="150" cy="150" r="70" />
                  <circle cx="150" cy="150" r="110" />
                  <circle cx="150" cy="150" r="149" />
                </g>
              </svg>
              <svg
                className="pointer-events-none absolute right-8 top-8 h-4 w-4 text-orange md:bottom-10 md:right-9 md:top-auto"
                viewBox="0 0 16 16"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M8 0 Q8.6 6.8 16 8 Q8.6 9.2 8 16 Q7.4 9.2 0 8 Q7.4 6.8 8 0Z" />
              </svg>

              <h2
                id="course-popup-title"
                className="relative font-serif text-heading text-white"
              >
                Free AI Safety courses, in person.
              </h2>
              <p className="relative mt-3 font-serif text-title-sm text-white/75">
                In {cities}.
              </p>
              <p
                id="course-popup-description"
                className="relative mt-6 max-w-[400px] font-sans text-caption leading-[22px] text-white/72"
              >
                A few weeks of reading and discussion with people entering the
                field, taught by SAIN&rsquo;s chapters. No previous background
                is needed, and every programme is free.
              </p>
            </div>

            {/* The cities, each row the door to its chapter's course. */}
            <div className="relative px-7 pb-7 pt-7 sm:px-9 sm:pb-8 sm:pt-8">
              <button
                type="button"
                onClick={close}
                aria-label="Close"
                className="absolute right-3 top-3 inline-flex size-10 items-center justify-center text-navy/55 transition-colors hover:text-navy focus-visible:text-navy"
              >
                <XIcon size={18} weight="light" aria-hidden="true" />
              </button>

              <p className="kicker pr-10 text-kicker-sm text-navy/65">
                Pick your city
              </p>
              <ul role="list" className="mt-4 border-b border-navy/12">
                {listed.map((course) => (
                  <li key={course.chapter}>
                    <Link
                      href={course.href}
                      onClick={close}
                      className="group -mx-3 flex items-center justify-between gap-4 border-t border-navy/12 px-3 py-4 transition-colors hover:bg-cream focus-visible:bg-cream"
                    >
                      <span className="min-w-0">
                        <span className="block font-serif text-title text-navy underline decoration-transparent underline-offset-4 transition-[text-decoration-color] duration-200 group-hover:decoration-navy group-focus-visible:decoration-navy">
                          {course.chapter}
                        </span>
                        {course.open && course.rolling ? (
                          <span className="mt-1 block font-sans text-footnote text-navy/65">
                            {course.rollingNote}
                          </span>
                        ) : course.open ? (
                          <span className="mt-1 block font-sans text-footnote text-navy/65">
                            Apply by {course.deadlines.participants}
                            <span aria-hidden="true" className="px-2 text-navy/25">
                              ·
                            </span>
                            Facilitators by {course.deadlines.facilitators}
                          </span>
                        ) : (
                          <span className="mt-1 block font-sans text-footnote text-navy/65">
                            Applications are closed. {course.closedNote}
                          </span>
                        )}
                      </span>
                      <ArrowRight
                        size={18}
                        weight="regular"
                        aria-hidden="true"
                        className="shrink-0 text-navy/55 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-navy"
                      />
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-4">
                <Link href="/courses" onClick={close} className="btn-accent">
                  Join a free course
                </Link>
                <button
                  type="button"
                  onClick={close}
                  className="font-sans text-label text-navy/65 underline decoration-navy/25 underline-offset-4 transition-colors hover:text-navy hover:decoration-navy focus-visible:decoration-navy"
                >
                  Maybe later
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
