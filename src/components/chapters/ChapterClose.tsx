import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

import { COMMUNITY_JOIN_URL } from "@/data/siteContact";

/**
 * The close. Inverse navy, because this band asks for a decision.
 *
 * The claim on the left, the two ways to act on the right, and the chapter's
 * three inboxes on one footnote line under the hairline. The accent button
 * says exactly what the hero's said: one label per destination, so the second
 * ask reads as the same door rather than a new one.
 */
export default function ChapterClose({
  city,
  eventsEmail,
  eduEmail,
  infoEmail,
  linktreeUrl,
}: {
  city: string;
  eventsEmail: string;
  eduEmail: string;
  infoEmail: string;
  linktreeUrl: string;
}) {
  const mailto =
    "underline decoration-white/35 underline-offset-4 hover:decoration-white focus-visible:decoration-white";

  return (
    <section
      id="join"
      aria-labelledby="join-heading"
      className="scroll-mt-36 bg-inverse"
    >
      <div className="shell band-close">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-16">
          <div className="min-w-0">
            <h2
              id="join-heading"
              className="max-w-[620px] font-serif text-closing text-white"
            >
              Everything SAIN runs in {city} is free. The only step is showing
              up.
            </h2>
            <p className="mt-4 max-w-[560px] font-sans text-body text-white/78">
              Fill in the onboarding form and the chapter will find you a first
              session.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:shrink-0">
            <a
              href={COMMUNITY_JOIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-accent gap-2"
            >
              Join the community
              <ArrowUpRight size={16} weight="regular" aria-hidden="true" />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            <Link href="/get-involved" className="btn-ghost-inverse">
              Volunteer
            </Link>
          </div>
        </div>

        <p className="mt-10 flex flex-wrap items-center gap-x-2 gap-y-1 border-t border-white/16 pt-5 font-sans text-footnote text-white/60">
          <span>
            Events:{" "}
            <a href={`mailto:${eventsEmail}`} className={mailto}>
              {eventsEmail}
            </a>
          </span>
          <span aria-hidden="true" className="text-white/30">
            ·
          </span>
          <span>
            Courses:{" "}
            <a href={`mailto:${eduEmail}`} className={mailto}>
              {eduEmail}
            </a>
          </span>
          <span aria-hidden="true" className="text-white/30">
            ·
          </span>
          <span>
            Everything else:{" "}
            <a href={`mailto:${infoEmail}`} className={mailto}>
              {infoEmail}
            </a>
          </span>
          <span aria-hidden="true" className="hidden text-white/30 sm:inline">
            ·
          </span>
          <a
            href={linktreeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-1.5 ${mailto}`}
          >
            All {city} links
            <ArrowUpRight size={14} weight="regular" aria-hidden="true" />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </p>
      </div>
    </section>
  );
}
