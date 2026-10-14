"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CaretLeft, CaretRight } from "@phosphor-icons/react/dist/ssr";

/**
 * Photographs of rooms that happened, printed on white mats with the navy
 * shadow the landing's community prints carry.
 *
 * Below xl the prints are a strip you push sideways, bleeding to both screen
 * edges: the next print showing past the edge is the affordance, which is why
 * there are no dots. From xl they straighten into a row with a slight tilt
 * apiece. Each print names its room in a navy caption bar, because a
 * photograph on this site is evidence and evidence is captioned.
 *
 * Plain <img> rather than next/image: `output: "export"` ships images
 * unoptimized, so the wrapper would emit no srcset and the `sizes` below would
 * be inert. Rungs are the `-{w}.webp` siblings of each source.
 */

export type Print = {
  /** Source file in /public, extension included. */
  src: string;
  /** Rungs that exist on disk for this source, narrow to wide. */
  widths: number[];
  alt: string;
  caption: string;
  /** Tilt on the row from xl up. Halved on the strip. */
  tilt?: string;
};

const SIZES =
  "(min-width: 1440px) 320px, (min-width: 1280px) 24vw, (min-width: 1024px) 32vw, (min-width: 768px) 40vw, (min-width: 640px) 48vw, 78vw";

/** `gap-4` on the strip, in px. The travel per click is one print plus this. */
const STRIP_GAP = 16;

const ARROW =
  "strip-arrow absolute top-4 bottom-9 z-10 my-auto h-11 w-11 place-items-center bg-page text-navy opacity-55 shadow-[0_4px_14px_#021C4D14] hover:opacity-100 hover:shadow-[0_7px_22px_#021C4D1F] focus-visible:opacity-100 focus-visible:shadow-[0_7px_22px_#021C4D1F] disabled:pointer-events-none disabled:opacity-0";

export default function PrintStrip({
  prints,
  label,
}: {
  prints: Print[];
  label: string;
}) {
  const strip = useRef<HTMLDivElement>(null);
  const [reach, setReach] = useState({ back: false, forward: false });

  const measure = useCallback(() => {
    const el = strip.current;
    if (!el) return;
    const end = el.scrollWidth - el.clientWidth;
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

  const columns =
    prints.length >= 4 ? "xl:grid-cols-4" : prints.length === 3 ? "xl:grid-cols-3" : "xl:grid-cols-2";

  return (
    <div className="relative">
      <div
        ref={strip}
        role="region"
        aria-label={label}
        tabIndex={0}
        className={`scroll-strip -mx-6 flex snap-x snap-mandatory scroll-pl-6 items-start gap-4 overflow-x-auto px-6 pb-9 pt-4 md:-mx-12 md:scroll-pl-12 md:px-12 xl:mx-0 xl:grid ${columns} xl:w-full xl:gap-5 xl:overflow-visible xl:px-2 xl:py-8`}
      >
        {prints.map((print) => (
          <figure
            key={print.src}
            className={`community-print relative w-[78vw] shrink-0 snap-start bg-page p-2 shadow-[0_7px_22px_#021C4D1F] sm:w-[48vw] md:w-[40vw] lg:w-[32vw] xl:w-auto xl:shrink ${
              print.tilt ?? ""
            }`}
          >
            <div className="relative overflow-hidden">
              <img
                src={print.src.replace(
                  /\.[a-zA-Z]+$/,
                  `-${print.widths[0]}.webp`,
                )}
                srcSet={print.widths
                  .map(
                    (w) =>
                      `${print.src.replace(/\.[a-zA-Z]+$/, `-${w}.webp`)} ${w}w`,
                  )
                  .join(", ")}
                sizes={SIZES}
                alt={print.alt}
                width={640}
                height={480}
                loading="lazy"
                decoding="async"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
            <figcaption className="kicker absolute inset-x-2 bottom-2 bg-inverse/88 px-4 py-2 text-kicker-sm text-white">
              {print.caption}
            </figcaption>
          </figure>
        ))}
      </div>

      <button
        type="button"
        onClick={() => push(-1)}
        disabled={!reach.back}
        aria-label="Previous photographs"
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
