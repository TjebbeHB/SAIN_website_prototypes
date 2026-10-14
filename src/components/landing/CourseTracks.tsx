import Link from "next/link";
import type { Icon } from "@phosphor-icons/react";
import { ArrowRight, BookOpenText, Code, Scales } from "@phosphor-icons/react/dist/ssr";

import {
  chapterCourseHref,
  courseTrackHref,
  type ChapterName,
} from "@/data/courseApplications";
import { TRACKS } from "@/data/courseTracks";

/**
 * The landing's three course tracks, named rather than taught. Each column is a small
 * object: a glyph, the title, the tagline, and a fixed three-city grid. The cities sit in the same place under every track, so reading across
 * the columns answers "what runs in my city" without a word: a filled mark
 * where a chapter runs the track (and a link to its programmes), a faint empty
 * one where it does not. The whole column opens its own track's tab on
 * /courses; each city link opens that track's course tab on the chapter page,
 * and sits above the stretched link.
 */

const CITIES: ChapterName[] = ["Utrecht", "Groningen", "Amsterdam"];

/* One glyph per track, in the same light-weight orange line the mission
   statement and the band heading use. */
const GLYPH: Record<string, Icon> = {
  fundamentals: BookOpenText,
  technical: Code,
  policy: Scales,
};

export default function CourseTracks() {
  return (
    <div>
      <ul role="list" className="grid gap-px bg-navy/12 md:grid-cols-3 border-y border-navy/12">
        {TRACKS.map((track) => {
          const Glyph = GLYPH[track.id];
          return (
            <li
              key={track.id}
              className="group relative flex flex-col bg-page px-6 py-8 transition-colors duration-300 hover:bg-cream focus-within:bg-cream md:px-8 md:py-9"
            >
              <Glyph size={32} weight="light" aria-hidden="true" className="text-orange" />

              <h3 className="mt-6 font-serif text-title text-navy">
                <Link
                  href={courseTrackHref(track.id)}
                  className="after:absolute after:inset-0 focus-visible:underline"
                >
                  {track.title}
                </Link>
              </h3>
              <p className="mt-2 font-sans text-ui text-navy/72">{track.tagline}</p>

              <div className="mt-auto pt-8">
                <ul role="list" aria-label="Where it runs" className="grid grid-cols-3 border-t border-navy/12">
                  {CITIES.map((city) => {
                    const entry = track.cities.find((c) => c.city === city);
                    return (
                      <li key={city} className="border-l border-navy/12 pl-3 first:border-l-0 first:pl-0">
                        {entry ? (
                          <Link
                            href={chapterCourseHref(city, track.id)}
                            title={entry.detail}
                            className="relative z-10 flex flex-col gap-2 py-3"
                          >
                            <span aria-hidden="true" className="h-2 w-2 bg-inverse" />
                            <span className="self-start font-sans text-caption text-navy underline decoration-navy/25 underline-offset-4 hover:decoration-navy">
                              {city}
                            </span>
                          </Link>
                        ) : (
                          <span className="flex flex-col gap-2 py-3">
                            <span aria-hidden="true" className="h-2 w-2 border border-navy/25" />
                            <span className="font-sans text-caption text-navy/35">
                              {city}
                              <span className="sr-only"> (not offered)</span>
                            </span>
                          </span>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>

              <ArrowRight
                size={16}
                weight="regular"
                aria-hidden="true"
                className="absolute right-6 top-[5.4rem] text-navy/0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-navy/60 md:right-8"
              />
            </li>
          );
        })}
      </ul>
      <div className="pt-5">
        <Link
          href="/courses"
          className="inline-flex items-center gap-1.5 font-sans text-label text-navy underline decoration-navy/25 underline-offset-4 hover:decoration-navy focus-visible:decoration-navy"
        >
          See all courses
          <ArrowRight size={16} weight="regular" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
