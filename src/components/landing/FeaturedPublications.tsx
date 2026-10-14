import Image from "next/image";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { publications } from "@/data/research";

/**
 * The three featured papers, as cream cards on the band's navy.
 *
 * Five rows at lg -- plate, venue, title, summary, link -- and each card is a
 * subgrid of them, so the three titles start on one line and the three links
 * end on one line whatever the copy does. The `min-h` reservations this used
 * to carry did the same thing by guessing a line count, and a venue label one
 * word longer was enough to break the row.
 *
 * The card carries the paper's full title, the same string /research lists it
 * under, so a reader who follows "View all publications" is looking for a name
 * they have already read. It ran here under a short `chipTitle` before, which
 * left the same paper with two names on two pages, and the full one reached
 * nobody: it was in `title=`, which is a tooltip, so no keyboard, no touch and
 * no screen reader ever saw it.
 *
 * Set a step down from the summary's neighbours at `text-title-sm`. An
 * academic title runs three or four lines in a card this wide, and at 21px it
 * became the only thing on the card.
 *
 * Hover had one cue and it was invisible: cream to white is about a percent of
 * luminance. Now the plate behind the drawing deepens, the title underlines,
 * and the arrow leans the way it sends you. design.md keeps this landing still
 * by default, so all three are small, all three are the same 200ms, and the
 * only one that moves is gated on motion-safe.
 *
 * The plate runs the full width of the card. It used to be inset by the same
 * 24px as the text, which drew a second box inside the first one and left the
 * drawing sitting in a tinted rectangle floating on a cream rectangle. A card
 * with a picture in it has one field at the top and one column of type under
 * it; the drawing keeps its own inset, so nothing actually touches the edge
 * except the tint.
 */
export default function FeaturedPublications() {
  return (
    <div className="mt-7 grid gap-5 lg:grid-cols-3 lg:grid-rows-[auto_auto_auto_1fr_auto]">
      {publications.flatMap((paper) => paper.featured ? [
        <a
          key={paper.link}
          href={paper.link}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${paper.title} (opens in a new tab)`}
          className="group grid min-w-0 bg-cream text-navy outline-offset-4 transition-colors duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-page focus-visible:bg-page lg:row-span-5 lg:grid-rows-subgrid"
        >
          <div className="bg-navy/[0.04] px-7 py-6 transition-colors duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:bg-navy/[0.07] group-focus-visible:bg-navy/[0.07]">
            <Image
              src={`/landing/research/${paper.featured.illustration}.svg`}
              alt=""
              width={360}
              height={190}
              className="mx-auto h-[150px] w-full max-w-[320px] object-contain"
            />
          </div>
          <p className="px-6 pt-5 text-footnote text-orange-ink">{paper.featured.venueLabel}</p>
          <h4 className="mt-3 px-6 font-serif text-title-sm underline-offset-4 group-hover:underline group-focus-visible:underline">{paper.title}</h4>
          <p className="mt-3 px-6 text-kicker-sm leading-6 text-navy/75">{paper.featured.summary}</p>
          <span className="mt-6 flex items-center gap-2 px-6 pb-6 text-label">
            Read paper
            <ArrowUpRight
              size={16}
              aria-hidden="true"
              className="transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5 motion-safe:group-focus-visible:translate-x-0.5 motion-safe:group-focus-visible:-translate-y-0.5"
            />
          </span>
        </a>,
      ] : [])}
    </div>
  );
}
