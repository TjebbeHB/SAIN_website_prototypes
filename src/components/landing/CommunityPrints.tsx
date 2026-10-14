"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { CaretLeft, CaretRight } from "@phosphor-icons/react/dist/ssr";

/* Plain <img>, not next/image: with `images.unoptimized` the wrapper emits no
   srcset, so the `sizes` below would have been inert. The rungs come from
   scripts/generate-responsive-images.mjs. */
const PHOTO_WIDTHS = [320, 640, 900];
const rung = (src: string, w: number) => src.replace(/\.jpg$/, `-${w}.jpg`);
const srcSet = (print: Print) =>
  (print.rungs ?? PHOTO_WIDTHS).map((w) => `${rung(print.src, w)} ${w}w`).join(", ");

/* A print is between roughly 280 and 390 CSS wide the whole way up, which is
   what keeps two to four of them in view at once. From xl it is fixed at 300. */
const SIZES =
  "(min-width: 1280px) 300px, (min-width: 1024px) 30vw, (min-width: 768px) 38vw, (min-width: 640px) 46vw, 72vw";

/** `gap-4` on the strip, in px. The travel per click is one print plus this. */
const STRIP_GAP = 16;

type Print = {
  src: string;
  /** Widths on disk, when the photograph is shared with a band whose ladder
      differs from this one's 320/640/900. */
  rungs?: number[];
  alt: string;
  /** Where the crop sits in the frame. */
  position: string;
  /** Alternating small tilts, so the row reads as prints laid down by hand. */
  tilt: string;
};

/**
 * A row of prints under the chapters: shared work, conversations, and time
 * together. The chapter prints above say where the rooms are; these say what
 * happens in them.
 *
 * It is a strip you push sideways at every width, not the five-across scatter
 * this band once had: the gallery grows as photographs come in, and a scatter
 * only holds a fixed number. The next print showing past the edge is the
 * affordance on touch, which is why there are no dots; a fine pointer also
 * gets the two paper chips. The strip bleeds to both screen edges so it reads
 * as something that continues rather than a box that ended.
 *
 * Adding a photograph: put it in public/landing as `print-<name>.jpg`, add it
 * to the community gallery entry in scripts/generate-responsive-images.mjs,
 * run `npm run images`, and add a row here.
 */
const PRINTS: Print[] = [
  {
    src: "/landing/print-graduation-amsterdam.jpg",
    alt: "SAIN Amsterdam graduates celebrating outdoors with balloons and flowers",
    position: "50% 40%",
    tilt: "rotate-[-1.5deg]",
  },
  {
    src: "/landing/print-closing-groningen.jpg",
    alt: "A SAIN Groningen closing evening on a rooftop terrace at sunset",
    position: "62% 60%",
    tilt: "rotate-[1deg]",
  },
  {
    src: "/landing/print-lecture.jpg",
    alt: "A SAIN lecture filling a university auditorium",
    position: "58% 36%",
    tilt: "rotate-[-1deg]",
  },
  {
    src: "/landing/print-cafe-amsterdam.jpg",
    alt: "SAIN Amsterdam members around a café table with SAIN mugs",
    position: "50% 55%",
    tilt: "rotate-[1.5deg]",
  },
  {
    /* The course band's photograph, so it carries that band's rungs. */
    src: "/landing/course-technical.jpg",
    rungs: [640, 960],
    alt: "Technical AI Safety graduates beside the SAIN Amsterdam banner",
    position: "50% 55%",
    tilt: "rotate-[-1.5deg]",
  },
  {
    src: "/landing/print-circle.jpg",
    alt: "An outdoor community gathering in a circle",
    position: "50% 48%",
    tilt: "rotate-[1deg]",
  },
  {
    src: "/landing/print-indoor.jpg",
    alt: "A SAIN group session indoors",
    position: "64% 40%",
    tilt: "rotate-[-1deg]",
  },
];

/* Two square paper chips, sized and shadowed like the prints they sit on,
   because the corner radius on this site is zero and a pill would be the one
   round thing on the page. They are faint until you are on them: the strip
   already says "there is more" by letting the next print run off the edge.

   `top-4 bottom-9` are the strip's own paddings, so `my-auto` centres the chip
   on the band the photographs occupy rather than on the container.

   After the strip in the DOM: so the tab order reads photographs, then the
   controls for them, and so the chips paint over the prints without a z-index
   race against the rotated figures. */
const ARROW =
  "strip-arrow strip-arrow-always absolute top-4 bottom-9 z-10 my-auto h-11 w-11 place-items-center bg-page text-navy opacity-55 shadow-[0_4px_14px_#021C4D14] hover:opacity-100 hover:shadow-[0_7px_22px_#021C4D1F] focus-visible:opacity-100 focus-visible:shadow-[0_7px_22px_#021C4D1F] disabled:pointer-events-none disabled:opacity-0";

export default function CommunityPrints() {
  const strip = useRef<HTMLDivElement>(null);
  /* Which directions still have somewhere to go. An arrow that is lit but
     moves nothing is worse than no arrow, so the ends disable rather than
     dead-click. */
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
    const step = print ? print.getBoundingClientRect().width + STRIP_GAP : el.clientWidth * 0.8;
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
        aria-label="Photographs from SAIN events"
        tabIndex={0}
        /* The negative margin matches the shell's gutter at each size, so the
           strip reaches the screen edge while its first print still lines up
           with the copy above it. */
        className="scroll-strip -mx-6 flex snap-x snap-mandatory scroll-pl-6 items-center gap-4 overflow-x-auto px-6 pb-9 pt-4 md:-mx-12 md:scroll-pl-12 md:px-12"
      >
        {PRINTS.map((print) => (
          <figure
            key={print.src}
            className={`community-print relative w-[72vw] shrink-0 snap-start bg-page p-2 shadow-[0_7px_22px_#021C4D1F] sm:w-[46vw] md:w-[38vw] lg:w-[30vw] xl:w-[300px] ${print.tilt}`}
          >
            <div className="overflow-hidden">
              <img
                src={rung(print.src, (print.rungs ?? PHOTO_WIDTHS)[0])}
                srcSet={srcSet(print)}
                sizes={SIZES}
                alt={print.alt}
                width={480}
                height={360}
                loading="lazy"
                decoding="async"
                className="aspect-[4/3] w-full object-cover"
                style={{ objectPosition: print.position }}
              />
            </div>
          </figure>
        ))}
      </div>

      <button
        type="button"
        onClick={() => push(-1)}
        disabled={!reach.back}
        aria-label="Previous photographs"
        /* The nudge runs along the axis of travel rather than lifting: the
           chip leans the way it is about to take you. */
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
