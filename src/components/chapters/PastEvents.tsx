import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

/**
 * What the chapter has already run this academic year, pulled from the Luma
 * export in `src/data/`.
 *
 * The list is cut at 1 September so it reads as the year now in progress
 * rather than as an archive; Groningen's full record has a page of its own.
 * Utrecht's rows link to whichever platform the recap actually lives on, which
 * is Luma for some events and LinkedIn for others: the row sends you to the
 * write-up, not to a particular website.
 */

export type RawPastEvent = { name: string; url: string; startAt: string };

/**
 * Luma titles arrive with em dashes in them ("Discussion Group — Europe 2031").
 * The design system bans the character in copy, and a string's provenance does
 * not change what the reader sees, so the separator is re-set on the way to the
 * page as the middot the print captions already use. A colon would collide with
 * the colons several of these titles carry ("Week 4: RLHF, GRPO").
 */
function withoutDashes(name: string): string {
  return name.replace(/\s*[—–]\s*/g, " · ");
}

function academicYearStart(now: Date): Date {
  const year = now.getMonth() >= 8 ? now.getFullYear() : now.getFullYear() - 1;
  return new Date(year, 8, 1);
}

/**
 * The academic year now in progress, or the last six events if that year has
 * not started producing any yet.
 *
 * The fallback matters in September: on the first day of an academic year the
 * strict filter empties the list, and a chapter page whose record reads "no
 * past events" is the exact staleness this band exists to disprove. Every row
 * prints its own month and year, so nothing is passed off as recent.
 */
export function pastEventsThisYear(raw: RawPastEvent[]) {
  const from = academicYearStart(new Date());
  const all = raw
    .map((event) => ({ ...event, startAt: new Date(event.startAt) }))
    .sort((a, b) => b.startAt.getTime() - a.startAt.getTime());
  const thisYear = all.filter((event) => event.startAt >= from);
  return thisYear.length > 0 ? thisYear : all.slice(0, 6);
}

export default function PastEvents({
  events,
  recapsUrl,
  recapsLabel,
}: {
  events: ReturnType<typeof pastEventsThisYear>;
  recapsUrl?: string;
  recapsLabel?: string;
}) {
  if (events.length === 0) {
    return (
      <p className="max-w-[var(--container-copy)] border-t border-navy/10 pt-4 font-sans text-body text-navy/65">
        No past events are listed here yet.
      </p>
    );
  }

  return (
    <div className="max-w-[var(--container-copy-wide)]">
      <ul role="list">
        {events.map((event) => (
          <li key={event.url}>
            <a
              href={event.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-baseline gap-4 border-t border-navy/10 py-3 transition-colors duration-200 hover:bg-navy/5 focus-visible:bg-navy/5"
            >
              <span className="w-[76px] shrink-0 font-sans text-footnote text-navy/65">
                {event.startAt.toLocaleDateString("en-GB", {
                  month: "short",
                  year: "numeric",
                })}
              </span>
              <span className="flex-1 font-sans text-ui text-navy">
                {withoutDashes(event.name)}
              </span>
              <ArrowUpRight
                size={14}
                weight="regular"
                aria-hidden="true"
                className="shrink-0 self-center text-navy/45"
              />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </li>
        ))}
      </ul>
      {recapsUrl && recapsLabel && (
        <p className="mt-4 font-sans text-footnote text-navy/65">
          <a
            href={recapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 underline decoration-navy/25 underline-offset-4 hover:decoration-navy focus-visible:decoration-navy"
          >
            {recapsLabel}
            <ArrowUpRight size={14} weight="regular" aria-hidden="true" />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </p>
      )}
    </div>
  );
}
