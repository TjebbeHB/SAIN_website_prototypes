import Image from "next/image";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { publications } from "@/data/research";

/**
 * The three featured papers, as cream cards on the process band's navy.
 *
 * Same object the landing ships, on the page the landing sends readers to: a
 * paper the reader met on the landing has to look like the same paper here, or
 * the proof reads as two different sets of three. Five rows at lg (plate,
 * venue, title, summary, link) with each card a subgrid of them, so the three
 * titles start on one line and the three links end on one line whatever the
 * copy does.
 *
 * The venue label is the honest one from the data file: every one of these is a
 * workshop paper and says so.
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
