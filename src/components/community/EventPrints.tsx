"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { CaretLeft, CaretRight } from "@phosphor-icons/react/dist/ssr";

/**
 * Five photographs from rooms that happened, each named by its caption bar.
 *
 * The landing's prints argue "there are real rooms"; these have a harder job.
 * This band claims a rhythm -- a hackathon weekend, a graduation dinner, a
 * scenario discussion, a pub quiz -- so each print has to say which city and
 * which kind of evening it is, or the reader has five crowds and no month. That
 * is the caption bar (navy at 88%, serif italic), the treatment design.md gives
 * a course image, carried onto the mat.
 *
 * Geometry follows the landing: a snap strip you push with a thumb below xl,
 * where a print is between roughly 280 and 390 CSS wide and the next one runs
 * off the screen edge as the affordance, and a tilted scatter from xl where the
 * five of them reach their full width on the 1440 canvas.
 *
 * `output: "export"` ships next/image unoptimized, so each print carries its
 * own srcSet off the webp rungs scripts/generate-responsive-images.mjs writes
 * beside the sources. The ladder therefore lives in two places and has to
 * agree: `rungs` below names only the widths that exist on disk, because a
 * rung wider than its source is skipped by the generator and a srcSet entry
 * pointing at a file nobody wrote is a broken image at that breakpoint.
 */

type Print = {
  /** The source on disk; the rungs sit beside it as `<name>-<width>.webp`. */
  src: string;
  /** Widths the generator actually wrote for this source. */
  rungs: number[];
  alt: string;
  caption: string;
  /** Where the crop sits in the frame. */
  position: string;
  /** Square on the strip; the scatter's own crop from xl up. */
  crop: string;
  /** Tilt on the strip: half the scatter's, so the rhythm stays readable. */
  tilt: string;
  /** Where the print lands in the desktop scatter. */
  scatter: string;
};

const PRINTS: Print[] = [
  {
    /* The forecasting hackathon poster. It used to open the page's hero,
       and the control hackathon poster sat here; the two swapped places in
       September 2026 so the hero carries the more legible of the pair. */
    src: "/photos/events/forecasting-hackathon.png",
    rungs: [320, 640, 900],
    alt: "Announcement for the AISIG AI forecasting and timeline models hackathon in Groningen",
    caption: "AI forecasting hackathon · SAIN Groningen",
    position: "50% 45%",
    crop: "aspect-[4/3]",
    tilt: "rotate-[-1.5deg]",
    scatter: "xl:translate-y-4 xl:rotate-[-5deg]",
  },
  {
    src: "/photos/events/tedx-broerstraat.webp",
    rungs: [320, 640],
    alt: "A SAIN Groningen speaker on the TEDxBroerstraat stage",
    caption: "TEDxBroerstraat · SAIN Groningen",
    position: "50% 40%",
    crop: "aspect-[4/3] xl:aspect-[4/5]",
    tilt: "rotate-[1deg]",
    scatter: "xl:-translate-y-2 xl:rotate-[3deg]",
  },
  {
    src: "/photos/events/utrecht/aisfundamentals-graduation-ceremony.jpeg",
    rungs: [320, 640, 900],
    alt: "An AI Safety Fundamentals cohort at its graduation ceremony in Utrecht",
    caption: "Course graduation · SAIN Utrecht",
    position: "50% 40%",
    crop: "aspect-[4/3]",
    /* The overlap only exists in the scatter, so the lift does too. */
    tilt: "rotate-[-1deg]",
    scatter: "xl:z-10 xl:rotate-[-2deg] xl:scale-110",
  },
  {
    src: "/photos/events/pub-quiz.jpg",
    rungs: [320, 640, 900],
    alt: "A SAIN Groningen pub quiz in the evening",
    caption: "Pub quiz · SAIN Groningen",
    position: "50% 50%",
    crop: "aspect-[4/3]",
    tilt: "rotate-[1.5deg]",
    scatter: "xl:translate-y-5 xl:rotate-[5deg]",
  },
  {
    src: "/photos/events/utrecht/discussion-eu2031.jpeg",
    rungs: [320, 640],
    alt: "A discussion group in Utrecht working through a Europe 2031 scenario",
    caption: "Europe 2031 scenario discussion · SAIN Utrecht",
    position: "50% 45%",
    crop: "aspect-[4/3]",
    tilt: "rotate-[-1deg]",
    scatter: "xl:-translate-y-2 xl:rotate-[-4deg]",
  },
];

/** `gap-4` on the strip, in px. The travel per click is one print plus this. */
const STRIP_GAP = 16;

/* Square paper chips, sized and shadowed like the prints they sit on. Faint at
   rest: the photographs are the argument, and a control at full strength on top
   of one competes with it. Gated on a fine pointer in globals.css, because a
   phone already has the gesture. */
const ARROW =
  "strip-arrow absolute top-4 bottom-9 z-10 my-auto h-11 w-11 place-items-center bg-page text-navy opacity-55 shadow-[0_4px_14px_#021C4D14] hover:opacity-100 hover:shadow-[0_7px_22px_#021C4D1F] focus-visible:opacity-100 focus-visible:shadow-[0_7px_22px_#021C4D1F] disabled:pointer-events-none disabled:opacity-0";

export default function EventPrints() {
  const strip = useRef<HTMLDivElement>(null);
  /* An arrow that is lit but moves nothing is worse than no arrow, so the ends
     disable rather than dead-click. */
  const [reach, setReach] = useState({ back: false, forward: false });

  const measure = useCallback(() => {
    const el = strip.current;
    if (!el) return;
    const end = el.scrollWidth - el.clientWidth;
    /* A pixel of slack: fractional print widths leave a sliver of scroll
       behind that no click can spend. */
    const back = el.scrollLeft > 1;
    const forward = el.scrollLeft < end - 1;
    setReach((prev) =>
      prev.back === back && prev.forward === forward ? prev : { back, forward },
    );
  }, []);

  useEffect(() => {
    const el = strip.current;
    if (!el) return;
    measure();
    el.addEventListener("scroll", measure, { passive: true });
    /* The strip's own resize covers both the viewport changing and the xl
       switch to the scatter, where there is nothing left to scroll. */
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => {
      el.removeEventListener("scroll", measure);
      observer.disconnect();
    };
  }, [measure]);

  const push = (direction: 1 | -1) => {
    const el = strip.current;
    if (!el) return;
    const print = el.querySelector("figure");
    /* One print and one gap, so the travel ends on the next snap point
       instead of being dragged there afterwards. */
    const step = print
      ? print.getBoundingClientRect().width + STRIP_GAP
      : el.clientWidth * 0.8;
    el.scrollBy({
      left: direction * step,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  };

  return (
    <div className="relative">
      <div
        ref={strip}
        /* A scroll container has to be reachable without a thumb, so it carries
           a name and a tab stop of its own. */
        role="region"
        aria-label="Photographs from SAIN chapter events"
        tabIndex={0}
        /* The negative margin matches the shell's gutter at each size, so the
           strip reaches the screen edge while its first print still lines up
           with the copy above it. */
        className="scroll-strip -mx-6 flex snap-x snap-mandatory scroll-pl-6 items-center gap-4 overflow-x-auto px-6 pb-9 pt-4 md:-mx-12 md:scroll-pl-12 md:px-12 xl:mx-0 xl:grid xl:w-full xl:grid-cols-5 xl:gap-3 xl:overflow-visible xl:px-2 xl:py-8"
      >
        {PRINTS.map((print) => {
          const base = print.src.replace(/\.[^.]+$/, "");
          return (
          <figure
            key={print.src}
            className={`community-print relative w-[72vw] shrink-0 snap-start bg-page p-2 shadow-[0_7px_22px_#021C4D1F] sm:w-[46vw] md:w-[38vw] lg:w-[30vw] xl:w-auto xl:shrink ${print.tilt} ${print.scatter}`}
          >
            <div className="relative overflow-hidden">
              <img
                src={`${base}-${print.rungs[print.rungs.length - 1]}.webp`}
                srcSet={print.rungs
                  .map((w) => `${base}-${w}.webp ${w}w`)
                  .join(", ")}
                /* 72vw on a phone down to one fifth of the 1440 canvas in the
                   scatter, where the anchored print's 1.1 scale is the widest
                   any of them is drawn. */
                sizes="(min-width: 1280px) 290px, (min-width: 1024px) 30vw, (min-width: 768px) 38vw, (min-width: 640px) 46vw, 72vw"
                alt={print.alt}
                width={480}
                height={360}
                loading="lazy"
                decoding="async"
                className={`w-full object-cover ${print.crop}`}
                style={{ objectPosition: print.position }}
              />
              {/* The caption names the city and the kind of evening. Without it
                  the band is five crowds; with it, it is a month. */}
              <figcaption className="kicker absolute inset-x-0 bottom-0 bg-inverse/88 px-3 py-2 text-kicker-sm text-white">
                {print.caption}
              </figcaption>
            </div>
          </figure>
          );
        })}
      </div>

      <button
        type="button"
        onClick={() => push(-1)}
        disabled={!reach.back}
        aria-label="Previous photographs"
        /* The nudge runs along the axis of travel rather than lifting: the chip
           leans the way it is about to take you. */
        className={`${ARROW} left-0 hover:-translate-x-0.5 focus-visible:-translate-x-0.5`}
      >
        <CaretLeft size={18} weight="bold" aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={() => push(1)}
        disabled={!reach.forward}
        aria-label="Next photographs"
        className={`${ARROW} right-0 hover:translate-x-0.5 focus-visible:translate-x-0.5`}
      >
        <CaretRight size={18} weight="bold" aria-hidden="true" />
      </button>
    </div>
  );
}
