import Reveal from "@/components/landing/Reveal";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

/**
 * The chapter's calendar, pinned to the page.
 *
 * The Luma embed is the only truthful source of what is on next, so this band
 * leans on it rather than restating it in copy that would go stale. It sits in
 * a hairline frame at copy width: a timetable on the wall, not a widget in a
 * card.
 */
export default function ShowUpBand({
  city,
  calendarId,
  calendarUrl,
  eventsEmail,
}: {
  city: string;
  /** The `cal-…` id from the chapter's Luma calendar. */
  calendarId: string;
  /** Public calendar page, for readers who want the whole thing. */
  calendarUrl: string;
  eventsEmail: string;
}) {
  return (
    <section
      id="events"
      aria-labelledby="events-heading"
      className="scroll-mt-36 border-t border-navy/10 bg-cream"
    >
      <div className="shell band-section">
        <div className="max-w-[var(--container-copy)]">
          <h2 id="events-heading" className="font-serif text-heading text-navy">
            Show up this week
          </h2>
          <p className="mt-3 font-sans text-body text-navy/74">
            Everything on the calendar is free and open. You do not need to be a
            member, and you do not need to have taken the course. Details and
            registration are on the chapter&rsquo;s Luma calendar below.
          </p>
        </div>

        <Reveal className="mt-8 max-w-[var(--container-copy-wide)]">
          <div className="border border-navy/14 bg-page">
            <iframe
              src={`https://luma.com/embed/calendar/${calendarId}/events?lt=light`}
              title={`SAIN ${city} events calendar`}
              loading="lazy"
              className="block h-[460px] w-full border-0 md:h-[520px]"
            />
          </div>
          <p className="mt-4 flex flex-wrap items-center gap-x-2">
            <a
              href={calendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-sans text-label text-navy underline decoration-navy/25 underline-offset-4 hover:decoration-navy focus-visible:decoration-navy"
            >
              See the full calendar on Luma
              <ArrowUpRight size={16} weight="regular" aria-hidden="true" />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </p>
          <p className="mt-2 font-sans text-footnote text-navy/65">
            Questions about an event:{" "}
            <a
              href={`mailto:${eventsEmail}`}
              className="underline decoration-navy/25 underline-offset-4 hover:decoration-navy focus-visible:decoration-navy"
            >
              {eventsEmail}
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
