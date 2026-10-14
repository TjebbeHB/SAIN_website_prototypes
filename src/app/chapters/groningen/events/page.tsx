import type { Metadata } from "next";
import Link from "next/link";

import Reveal from "@/components/landing/Reveal";
import {
  groningenEventYears,
  groningenEventsArchive,
} from "@/data/groningenEventsArchive";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";

export const metadata: Metadata = {
  title: "Groningen events archive",
  description:
    "Every event the Groningen chapter has run since October 2023, first as AISIG and then as SAIN Groningen.",
};

/* The archive images are announcement graphics as often as they are
   photographs, so they are printed small and left to do their own work. Rungs
   are the `-{w}.webp` siblings written for this page. */
const WIDTHS = [320, 640];
const rung = (src: string, width: number) =>
  src.replace(/\.[a-zA-Z]+$/, `-${width}.webp`);

export default function GroningenEventsArchivePage() {
  return (
    <>
      {/* A record, not a pitch: white ground, no photograph behind the claim,
          and the only action is back to the chapter. */}
      <section
        aria-labelledby="archive-heading"
        className="border-b border-navy/10 bg-page"
      >
        <div className="shell band-hero">
          <Link
            href="/chapters/groningen"
            className="inline-flex items-center gap-2 font-sans text-label text-navy underline decoration-navy/25 underline-offset-4 hover:decoration-navy focus-visible:decoration-navy"
          >
            <ArrowLeft size={16} weight="regular" aria-hidden="true" />
            SAIN Groningen
          </Link>
          <h1
            id="archive-heading"
            className="mt-6 max-w-[720px] font-serif text-display text-navy"
          >
            Every event the chapter has run
          </h1>
          <p className="mt-5 max-w-[var(--container-copy)] font-sans text-body text-navy/72">
            Everything before 30 April 2026 was organised as the AI Safety
            Initiative Groningen (AISIG); everything after it continues as SAIN
            Groningen. Each entry keeps the chapter&rsquo;s own announcement
            from the time, so the wording is the wording it went out with.
          </p>
        </div>
      </section>

      <section id="archive-events" className="scroll-mt-36 bg-page">
        <div className="shell band-section flex flex-col gap-14">
          {groningenEventYears.map((year) => {
            const events = groningenEventsArchive.filter((event) =>
              event.date.includes(year),
            );
            if (events.length === 0) return null;

            return (
              <div key={year}>
                <div className="flex items-baseline justify-between gap-6 border-b border-navy/14 pb-3">
                  <h2 className="font-serif text-heading-sm text-navy">
                    {year}
                  </h2>
                  <p className="font-sans text-footnote text-navy/65">
                    {events.length} {events.length === 1 ? "event" : "events"}
                  </p>
                </div>

                <ul role="list">
                  {events.map((event) => (
                    <li
                      key={`${event.title}-${event.date}`}
                      className="grid gap-5 border-b border-navy/10 py-7 sm:grid-cols-[200px_minmax(0,1fr)] sm:gap-8 lg:grid-cols-[240px_minmax(0,1fr)]"
                    >
                      <div className="bg-page p-2 shadow-[0_7px_22px_#021C4D1F]">
                        <img
                          src={rung(event.image, WIDTHS[0])}
                          srcSet={WIDTHS.map(
                            (w) => `${rung(event.image, w)} ${w}w`,
                          ).join(", ")}
                          sizes="(min-width: 1024px) 224px, (min-width: 640px) 184px, calc(100vw - 48px)"
                          alt=""
                          width={640}
                          height={427}
                          loading="lazy"
                          decoding="async"
                          className="aspect-[3/2] w-full object-cover"
                        />
                      </div>

                      <div className="min-w-0">
                        <p className="font-sans text-footnote text-navy/65">
                          {event.date}
                          {event.time ? `, ${event.time}` : ""}
                        </p>
                        <h3 className="mt-1.5 font-serif text-title-sm text-navy">
                          {event.title}
                        </h3>
                        {/* The blurbs are the original announcements, so many
                            of them invite you to something that has already
                            happened. Attributing the tense per row is what
                            keeps a 2023 entry from reading as a live one. */}
                        <p className="kicker mt-3 text-kicker-sm text-navy/55">
                          From the announcement at the time
                        </p>
                        <div className="mt-1.5 flex max-w-[var(--container-copy)] flex-col gap-2.5 font-sans text-[15.5px] leading-[25px] text-navy/74">
                          {event.description
                            .split("\n\n")
                            .map((paragraph) => (
                              <p key={paragraph}>{paragraph}</p>
                            ))}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-inverse">
        <div className="shell band-close flex flex-col items-start gap-6">
          <Reveal>
            <p className="max-w-[560px] font-serif text-closing text-white">
              Every one of these was free and open to walk into.
            </p>
          </Reveal>
          <Link href="/chapters/groningen#events" className="btn-accent">
            See what&rsquo;s on this week
          </Link>
        </div>
      </section>
    </>
  );
}
