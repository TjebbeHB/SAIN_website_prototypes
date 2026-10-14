import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

/**
 * Published work with a chapter's people on it.
 *
 * The chip is the system's list treatment for a paper: cream fill on the white
 * sheet, a hairline, the venue in orange-ink (#FF6025 as a letterform on a
 * light ground is 3.02:1 and fails), the title in the serif. The whole chip is
 * the link, and it leaves the site, so it leans the arrow the way it sends you.
 */

export type Publication = {
  venue: string;
  title: string;
  /** Named authors, where the chapter has them. */
  authors?: string;
  url: string;
  /** Trailing label, used where a single paper carries the band. */
  readLabel?: boolean;
};

export default function PublicationChips({
  publications,
}: {
  publications: Publication[];
}) {
  return (
    <ul role="list" className="flex flex-col gap-3">
      {publications.map((paper) => (
        <li key={paper.url}>
          <a
            href={paper.url}
            target="_blank"
            rel="noopener noreferrer"
            className="pub-chip w-full"
          >
            <span className="w-[128px] shrink-0 font-sans text-footnote font-medium text-orange-ink">
              {paper.venue}
            </span>
            <span className="flex min-w-0 flex-1 flex-col gap-0.5">
              <span className="font-serif text-[15px] leading-5 text-navy">
                {paper.title}
              </span>
              {paper.authors && (
                <span className="font-sans text-footnote text-navy/65">
                  {paper.authors}
                </span>
              )}
            </span>
            {paper.readLabel && (
              <span className="hidden shrink-0 font-sans text-label text-navy sm:inline">
                Read paper
              </span>
            )}
            <ArrowUpRight
              size={16}
              weight="regular"
              aria-hidden="true"
              className="shrink-0 text-navy/55"
            />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
