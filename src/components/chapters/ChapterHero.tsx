import type { ReactNode } from "react";

import Reveal from "@/components/landing/Reveal";
import { COMMUNITY_JOIN_URL } from "@/data/siteContact";
import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

/**
 * The chapter hero. Same split the landing runs: the claim on the left, the
 * evidence on the right. The evidence here is a photograph rather than a
 * diagram, printed on a white mat with the navy-tinted shadow the community
 * prints carry, because what this page has to prove first is that the chapter
 * is a place.
 *
 * The photograph is the one the landing's chapter cell showed under the
 * pointer, so arriving here continues that picture rather than replacing it.
 */

/** Rungs written by the scratch pass documented in the page report. */
const HERO_WIDTHS = [640, 960, 1280];

export default function ChapterHero({
  city,
  subheading,
  photo,
  photoAlt,
  caption,
  belowCta,
}: {
  city: string;
  subheading: string;
  /** Source JPEG under /photos/cities; rungs are its `-{w}.webp` siblings. */
  photo: string;
  photoAlt: string;
  caption: string;
  /** Amsterdam's partner lockup. No other chapter has one. */
  belowCta?: ReactNode;
}) {
  const rung = (w: number) => photo.replace(/\.jpg$/, `-${w}.webp`);

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden"
      style={{
        backgroundImage:
          "linear-gradient(in oklab 180deg, var(--color-page) 0%, var(--color-page) 95%, var(--color-cream) 100%)",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="absolute -left-8 -top-20 h-[400px] w-[200px] opacity-[0.07] md:-left-4 md:-top-12 md:h-[440px] md:w-[260px] md:opacity-[0.12]"
          style={{
            backgroundImage: "url('/illustrations/hero-orbits.svg')",
            backgroundSize: "260px 440px",
            backgroundRepeat: "no-repeat",
            maskImage: "linear-gradient(to right, black 15%, transparent 100%)",
          }}
        />
      </div>

      <div className="shell band-hero grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] lg:gap-14 xl:grid-cols-[minmax(0,640px)_minmax(0,1fr)]">
        <Reveal hero className="flex min-w-0 flex-col gap-6">
          <h1 id="hero-heading" className="font-serif text-display text-navy">
            SAIN {city}
          </h1>
          <p className="max-w-[620px] font-sans text-body text-navy/72">
            {subheading}
          </p>
          <div className="flex flex-wrap items-center gap-x-7 gap-y-4 pt-1">
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
            <a
              href="#events"
              className="inline-flex items-center gap-2 font-sans text-label text-navy underline decoration-navy/25 underline-offset-4 hover:decoration-navy focus-visible:decoration-navy"
            >
              See what&rsquo;s on this week
              <ArrowRight size={16} weight="regular" aria-hidden="true" />
            </a>
          </div>
          {belowCta}
        </Reveal>

        <Reveal
          hero
          delay={0.08}
          className="flex min-w-0 items-center justify-center lg:justify-end"
        >
          <figure className="relative w-full max-w-[520px] bg-page p-2 shadow-[0_7px_22px_#021C4D1F]">
            <div className="relative overflow-hidden">
              <img
                src={rung(HERO_WIDTHS[0])}
                srcSet={HERO_WIDTHS.map((w) => `${rung(w)} ${w}w`).join(", ")}
                sizes="(min-width: 1280px) 520px, (min-width: 1024px) 40vw, calc(100vw - 48px)"
                alt={photoAlt}
                width={1280}
                height={853}
                /* Above the fold on every chapter page, and the only image in
                   the first viewport. */
                fetchPriority="high"
                decoding="async"
                className="aspect-[3/2] w-full object-cover"
              />
            </div>
            {/* Direct child of the figure, so the caption is the figure's
                caption rather than a label inside the crop. */}
            <figcaption className="kicker absolute inset-x-2 bottom-2 bg-inverse/88 px-5 py-2.5 text-kicker-sm text-white">
              {caption}
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
