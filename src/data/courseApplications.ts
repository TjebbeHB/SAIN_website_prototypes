/**
 * Course application status, per chapter.
 *
 * Single source of truth for the chapter course pages, the courses page and the
 * landing course tabs, so a cohort is never advertised as open in one place and
 * closed in another.
 *
 * To open or close a cohort: flip `open` for that chapter and edit its
 * deadlines.
 *
 * An open entry also carries `closesAfter`, the later deadline as an ISO date.
 * Every read of this file goes through `resolve` below, which reports the entry
 * as closed once that date has passed. A file nobody remembered to edit can
 * therefore go quiet, but it can never print an expired deadline beside a live
 * apply button. The site is a static export, so "now" is the build date: a
 * rebuild is what retires a lapsed cohort.
 *
 * A chapter that takes applications all year, placing each applicant in its
 * next cohort, is open with `rolling: true` and a `rollingNote` instead of
 * deadlines. It has no date to lapse on, so it stays open until someone closes
 * it here. It may also carry a `chapterNote`, a cohort-specific line (a nominal
 * deadline, a start date) shown only on its own chapter page, in place of the
 * rolling note. That note is dated by `chapterNoteUntil` and drops out once the
 * date passes, leaving the rolling note, so a stale deadline never lingers.
 */

/** Shared intake form for participants and facilitators, all chapters. */
export const COURSE_APPLICATION_URL =
  "https://sainonboard.fillout.com/new";

export type ChapterName = "Amsterdam" | "Groningen" | "Utrecht";

export type CourseApplication = {
  chapter: ChapterName;
  /** Anchor into the chapter page's Programs section. */
  href: string;
} & (
  | {
      open: true;
      rolling?: false;
      /** Written out the way they appear on the page, with the year, e.g.
       *  "18 September 2026". The year is not decoration: a date without one
       *  reads as ambiguous rather than expired once it has passed. */
      deadlines: { participants: string; facilitators: string };
      /** The later of the two deadlines, ISO `YYYY-MM-DD`, for the guard. */
      closesAfter: string;
      /** Stands in for `closedNote` once the deadlines above have passed. */
      lapsedNote?: string;
    }
  | {
      open: true;
      /** Applications are always open; each one joins the next cohort. */
      rolling: true;
      /** Stands in for the deadlines, e.g. "Apply any time ...". */
      rollingNote: string;
      /** Replaces `rollingNote` on the chapter's own page only. */
      chapterNote?: string;
      /** ISO `YYYY-MM-DD`; `chapterNote` is dropped after this date. */
      chapterNoteUntil?: string;
    }
  | {
      open: false;
      /** Shown in place of the sign-up CTA while applications are closed. */
      closedNote: string;
    }
);

const DEFAULT_LAPSED_NOTE = "Sign ups for the next cohort will open soon.";

/** True once the whole of an ISO date has passed; false if missing or malformed. */
function hasPassed(isoDate: string | undefined): boolean {
  const end = new Date(`${isoDate}T23:59:59`);
  return !Number.isNaN(end.getTime()) && end.getTime() < Date.now();
}

/**
 * An entry whose deadlines have passed reports closed, whatever the file says.
 * This is the one place the guard lives, so no page has to remember it.
 */
function resolve(entry: CourseApplication): CourseApplication {
  if (!entry.open) return entry;
  if (entry.rolling) {
    if (!entry.chapterNote || !hasPassed(entry.chapterNoteUntil)) return entry;
    const { chapterNote: _note, chapterNoteUntil: _until, ...rest } = entry;
    return rest;
  }
  if (!hasPassed(entry.closesAfter)) return entry;
  return {
    chapter: entry.chapter,
    href: entry.href,
    open: false,
    closedNote: entry.lapsedNote ?? DEFAULT_LAPSED_NOTE,
  };
}

const cohorts: CourseApplication[] = [
  {
    chapter: "Amsterdam",
    href: "/chapters/amsterdam#programs",
    open: true,
    rolling: true,
    rollingNote:
      "Applications are always open, and you will join the next cohort that starts.",
    chapterNote:
      "Applications are open. Apply by 23 October 2026; the courses start in the first week of November.",
    chapterNoteUntil: "2026-10-23",
  },
  {
    chapter: "Groningen",
    href: "/chapters/groningen#programs",
    /* Registration stays open for every future cohort: an applicant is
       placed in the next one that starts. */
    open: true,
    rolling: true,
    rollingNote:
      "Applications are always open, and you will join the next cohort that starts.",
  },
  {
    chapter: "Utrecht",
    href: "/chapters/utrecht#programs",
    /* The 18 September 2026 cohort has closed; the course itself runs from
       23 September, see the session dates on the Utrecht page. */
    open: false,
    closedNote: "Sign ups for the next cohort will open next semester.",
  },
];

export const courseApplications: CourseApplication[] = cohorts.map(resolve);

export function courseApplicationFor(chapter: ChapterName): CourseApplication {
  const entry = courseApplications.find((c) => c.chapter === chapter);
  if (!entry) throw new Error(`No course application entry for ${chapter}`);
  return entry;
}

/* The chapter course tab each national track lands on, where the chapter has
   one. Groningen runs its two tracks as one course without tabs, and Utrecht's
   governance offering is a discussion group, so those fall back to the
   chapter's programmes band. Keys are the track ids on the landing and
   /courses; values are the `id`s of the chapter page's CourseDisclosure. */
const CHAPTER_COURSE_TAB: Partial<Record<ChapterName, Record<string, string>>> = {
  Utrecht: { fundamentals: "fundamentals", technical: "technical" },
  Amsterdam: { technical: "technical", policy: "governance" },
};

/** A track's page in one chapter: its course tab there, or its programmes. */
export function chapterCourseHref(chapter: ChapterName, trackId: string): string {
  const tab = CHAPTER_COURSE_TAB[chapter]?.[trackId];
  return tab
    ? `/chapters/${chapter.toLowerCase()}#course-${tab}`
    : courseApplicationFor(chapter).href;
}

/** The track's own tab on /courses. CourseTabs there opens it from the hash. */
export function courseTrackHref(trackId: string): string {
  return `/courses#track-${trackId}`;
}

export type OpenCourseApplication = Extract<CourseApplication, { open: true }>;

/** Chapters currently taking applications, for the popup and shared CTAs. */
export const openCourseApplications = courseApplications.filter(
  (c): c is OpenCourseApplication => c.open,
);

/** "Utrecht", "Utrecht or Groningen", "A, B or C", for prose. */
export function formatCityList(chapters: readonly { chapter: string }[]): string {
  const names = chapters.map((c) => c.chapter);
  if (names.length <= 1) return names.join("");
  return `${names.slice(0, -1).join(", ")} or ${names[names.length - 1]}`;
}
