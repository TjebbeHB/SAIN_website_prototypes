import type { CSSProperties } from "react";

/**
 * The SAIN Talent Pipeline. Every band points at the landing section that
 * describes its step, so the diagram reads the same from /about and from the
 * landing's own closing band.
 *
 * Two tones. On paper the fills are navy at four percent, the labels navy, the
 * photographs multiplied into the fill, and a drop shadow puts the diagram on
 * the table. None of that survives on the inverse ground: multiply on navy is
 * navy. So the fills go to white at low opacity, the labels to cream, the
 * photographs to luminosity, the rules to white, and the shadow goes, because
 * there is nothing under it to fall on.
 *
 * The trapezoids narrow because the path narrows:
 * a course is open to anyone, a full-time role is not. The last band is solid
 * orange because that is the destination, and the photographs inside the bands
 * are texture, evidence that each step is a room that exists, not hero crops.
 */

type Band = {
  /** Trapezoid width at the top, in the 432px design canvas. */
  width: number;
  /** Label size as a fraction of the funnel's width, so it scales with it. */
  labelCqw: number;
  /** Bottom edge inset, as a percentage of the band width. */
  inset: number;
  /** The section of this page that describes the step. */
  href: string;
  label: string;
  labelClass: string;
  photo: string;
  objectPosition: string;
  fill: string;
  /** The same band on the inverse ground. The terminus is orange on both. */
  fillInverse: string;
  restOpacity: number;
  hoverOpacity: number;
  blend: "multiply" | "luminosity";
};

const BANDS: Band[] = [
  {
    width: 432,
    inset: 8.8,
    href: "/#courses",
    /* Not "Start with a free course": that label belongs to the accent CTA
       beside this diagram, which goes to /courses, while this band goes to the
       landing's courses section. One label per destination. */
    label: "Take a free course, open to anyone",
    labelCqw: 3.7,
    labelClass: "max-w-[78%] text-center leading-[1.25]",
    photo: "/landing/funnel-01.jpg",
    objectPosition: "38% 34%",
    fill: "#021C4D09",
    fillInverse: "#FFFFFF0C",
    restOpacity: 0.1,
    hoverOpacity: 0.26,
    blend: "multiply",
  },
  {
    width: 356,
    inset: 9,
    href: "/#community",
    label: "Participate in SAIN's community",
    labelCqw: 3.47,
    labelClass: "max-w-[78%] text-center leading-[1.27]",
    photo: "/landing/funnel-02.jpg",
    objectPosition: "72% 42%",
    fill: "#021C4D09",
    fillInverse: "#FFFFFF0C",
    restOpacity: 0.14,
    hoverOpacity: 0.26,
    blend: "multiply",
  },
  {
    width: 292,
    inset: 8.9,
    href: "/#research",
    label: "Contribute and collaborate on research or projects",
    labelCqw: 3.24,
    labelClass: "max-w-[78%] text-center leading-[1.29]",
    photo: "/landing/funnel-03.jpg",
    objectPosition: "82% 30%",
    fill: "#021C4D0A",
    fillInverse: "#FFFFFF0E",
    restOpacity: 0.1,
    hoverOpacity: 0.26,
    blend: "multiply",
  },
  {
    width: 240,
    inset: 9.2,
    href: "/#careers",
    label: "Undertake a fellowship or internship in AI safety",
    labelCqw: 3.01,
    labelClass: "max-w-[78%] text-center leading-[1.31]",
    photo: "/landing/funnel-04.jpg",
    objectPosition: "42% 48%",
    fill: "#021C4D0B",
    fillInverse: "#FFFFFF10",
    restOpacity: 0.1,
    hoverOpacity: 0.26,
    blend: "multiply",
  },
  {
    width: 196,
    inset: 10.2,
    href: "/#careers",
    label: "Work full-time in AI safety",
    labelCqw: 3.24,
    labelClass: "max-w-[78%] text-center leading-[1.29]",
    photo: "/landing/funnel-05.jpg",
    objectPosition: "50% 40%",
    fill: "#FF6025",
    fillInverse: "#FF6025",
    restOpacity: 0.12,
    hoverOpacity: 0.32,
    blend: "luminosity",
  },
];

/* The rungs `npm run images` writes. These and the widths in
   scripts/generate-responsive-images.mjs have to agree. */
const PHOTO_WIDTHS = [320, 640, 768, 1040];
const srcSet = (photo: string) =>
  PHOTO_WIDTHS.map((w) => `${photo.replace(/\.jpg$/, `-${w}.jpg`)} ${w}w`).join(", ");

const WIDEST = BANDS[0].width;
const BAND_HEIGHT = 86;
const LAST = BANDS.length - 1;

/**
 * Left-edge x at every horizontal rule, accumulated from the band insets. The
 * funnel is concave rather than a straight cone (each band tapers less
 * sharply than the one above it), so the side is a polyline, and it has to be
 * drawn as one path. Five separate trapezoid outlines gave every junction two
 * stacked horizontal rules and five independent stroke runs, which is what
 * made the bands read as stacked shapes instead of one funnel.
 */
const EDGES = BANDS.reduce<number[]>(
  (acc, band) => [
    ...acc,
    acc[acc.length - 1] + (band.inset / 100) * band.width,
  ],
  [0],
);

const y = (i: number) => i * BAND_HEIGHT;
const right = (i: number) => WIDEST - EDGES[i];

/* Top edge, then the right side down to the orange band, then the left side. */
const SILHOUETTE =
  `M 0 0 L ${WIDEST} 0` +
  Array.from({ length: LAST }, (_, i) => ` L ${right(i + 1)} ${y(i + 1)}`).join(
    "",
  ) +
  ` M 0 0` +
  Array.from({ length: LAST }, (_, i) => ` L ${EDGES[i + 1]} ${y(i + 1)}`).join(
    "",
  );

/* The terminus keeps its own closed outline, because it is orange, not navy. */
const TERMINUS =
  `M ${EDGES[LAST]} ${y(LAST)} L ${right(LAST)} ${y(LAST)}` +
  ` L ${right(LAST + 1)} ${y(LAST + 1)} L ${EDGES[LAST + 1]} ${y(LAST + 1)} Z`;

export default function TalentFunnel({ tone = "paper" }: { tone?: "paper" | "inverse" }) {
  const inverse = tone === "inverse";
  return (
    <div
      className={`flex w-full max-w-[436px] flex-col items-center overflow-visible ${
        inverse ? "" : "drop-shadow-[0_2px_16px_#00000033]"
      }`}
    >
      {/* Origin: a dot and an arrow into the mouth of the funnel. */}
      <div className="flex flex-col items-center">
        <span className="size-[7px] rounded-full bg-orange" />
        <svg width="9" height="16" viewBox="0 0 9 16" aria-hidden="true">
          <line x1="4.5" y1="0" x2="4.5" y2="10" stroke="#FF6025" />
          <polygon points="4.5,16 1.25,10 7.75,10" fill="#FF6025" />
        </svg>
      </div>

      {/* The bands sit in a box exactly as wide as the widest band, so the
          silhouette drawn over them lines up with their geometry. */}
      {/* The containment context every cqw below is measured against. */}
      <div className="@container relative w-full max-w-[432px]">
        {BANDS.map((band, i) => {
          const last = i === BANDS.length - 1;
          const bottom = band.width - (band.inset / 100) * band.width * 2;
          const offset = (band.inset / 100) * band.width;

          return (
            <a
              key={band.label}
              href={band.href}
              /* 86 of the 432 canvas. The height has to scale with the width
                 or the funnel stops being the shape the outline draws over. */
              className={`group relative mx-auto flex h-[19.907cqw] items-center justify-center outline-offset-2 focus-visible:outline-2 ${
                inverse ? "focus-visible:outline-white" : "focus-visible:outline-navy"
              }`}
              style={{ width: `${(band.width / WIDEST) * 100}%` }}
            >
              {/* Fill only. The outline is drawn once, over the whole funnel. */}
              <svg
                className="absolute inset-0 size-full"
                viewBox={`0 0 ${band.width} ${BAND_HEIGHT}`}
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <polygon
                  points={`0,0 ${band.width},0 ${offset + bottom},${BAND_HEIGHT} ${offset},${BAND_HEIGHT}`}
                  fill={inverse ? band.fillInverse : band.fill}
                />
              </svg>

              <div
                className="absolute inset-0 overflow-hidden"
                style={{
                  clipPath: `polygon(0 0, 100% 0, ${100 - band.inset}% 100%, ${band.inset}% 100%)`,
                }}
              >
                <img
                  src={band.photo.replace(/\.jpg$/, "-320.jpg")}
                  srcSet={srcSet(band.photo)}
                  /* Each band is a fraction of a container that is 436 wide at
                     xl, 340 at lg, and the shell below that. */
                  sizes={`(min-width: 1280px) ${band.width}px, (min-width: 1024px) ${Math.round((band.width / WIDEST) * 340)}px, (min-width: 512px) ${band.width}px, calc(${Math.round((band.width / WIDEST) * 100)}vw - ${Math.round((band.width / WIDEST) * 48)}px)`}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="size-full scale-100 object-cover opacity-[var(--rest)] transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:group-hover:scale-[1.06] group-hover:opacity-[var(--hover)] motion-safe:group-focus-visible:scale-[1.06] group-focus-visible:opacity-[var(--hover)]"
                  style={
                    {
                      objectPosition: band.objectPosition,
                      mixBlendMode: inverse ? "luminosity" : band.blend,
                      "--rest": inverse && !last ? band.restOpacity + 0.06 : band.restOpacity,
                      "--hover": inverse && !last ? band.hoverOpacity + 0.06 : band.hoverOpacity,
                    } as CSSProperties
                  }
                />
              </div>

              {/* Underlined at rest, not only on hover. Five bands that look
                  like diagram and behave like links taught the reader nothing,
                  and the close draws near-identical cards that are inert -- so
                  the affordance has to be visible standing still. Same idiom as
                  every other text link on the page, so it reads as one system.

                  The rule takes the ink of the label above it, because the
                  terminus is the one band on a solid orange fill and so the one
                  label set in white; a navy rule under white letters read as
                  something else on the line rather than as their underline.
                  White at /45 is the rest value the navbar strip already uses
                  for a white underline on orange. */}
              <p
                className={`relative font-sans underline underline-offset-4 transition-colors duration-200 ${
                  last || inverse
                    ? "decoration-white/45 group-hover:decoration-white group-focus-visible:decoration-white"
                    : "decoration-navy/25 group-hover:decoration-navy group-focus-visible:decoration-navy"
                } ${last ? "text-white" : inverse ? "text-chalk" : "text-navy"} ${band.labelClass}`}
                /* Floored so the last band stays legible on a narrow phone,
                   capped at what it measures on the 432 canvas. */
                style={{
                  fontSize: `clamp(11px, ${band.labelCqw}cqw, ${((band.labelCqw / 100) * WIDEST).toFixed(1)}px)`,
                }}
              >
                {band.label}
              </p>
            </a>
          );
        })}

        {/* One outline for the whole funnel, so the sides are continuous
            through every slope change and no junction carries a doubled rule.
            The rules between bands are deliberately quieter than the
            silhouette: the funnel is one object, subdivided. */}
        <svg
          className="pointer-events-none absolute inset-0 size-full"
          viewBox={`0 0 ${WIDEST} ${y(BANDS.length)}`}
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <g stroke={inverse ? "#FFFFFF29" : "#021C4D26"} vectorEffect="non-scaling-stroke">
            {Array.from({ length: LAST - 1 }, (_, i) => i + 1).map((i) => (
              <line key={i} x1={EDGES[i]} y1={y(i)} x2={right(i)} y2={y(i)} />
            ))}
          </g>
          <path
            d={SILHOUETTE}
            fill="none"
            stroke={inverse ? "#FFFFFF52" : "#021C4D52"}
            vectorEffect="non-scaling-stroke"
          />
          <path
            d={TERMINUS}
            fill="none"
            stroke="#FF6025"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>

      {/* Terminus: a short stem and a dot, so the diagram ends rather than stops. */}
      <div className="flex flex-col items-center pt-0.5">
        <span className={inverse ? "h-2.5 w-px bg-white/25" : "h-2.5 w-px bg-navy/20"} />
        <span className="size-[7px] rounded-full bg-orange" />
      </div>
    </div>
  );
}
