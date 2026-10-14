/**
 * The research hero drawing: fitting the curve.
 *
 * The landing hero draws learning-to-steering. This one draws what the Research
 * Hub actually does to a question. On the left, a scatter of observations and
 * two open question marks: the raw state of a research problem, where the
 * reader arrives. In the middle of the plot a single line is fitted through the
 * scatter, and it is fitted by two people, one seated and working, one standing
 * beside them with a hand up at the plot. That second figure is the supervisor,
 * which is the page's whole argument in one gesture: the line is not drawn by
 * the beginner alone.
 *
 * The fitted line turns orange where it rises clear of the scatter and runs off
 * the plot onto a pinned page, whose one figure carries the same line in
 * miniature. A finding becomes a page somebody else can read. Orange is spent
 * on exactly that: the part of the trajectory the work is responsible for, and
 * its echo in print.
 *
 * Ink linework on the page ground, in the house stroke: navy on white by day,
 * chalk on navy at night (currentColor and fill-page follow the theme). No
 * robots, no brains, no
 * network of dots.
 */
export default function FittingTheCurve() {
  return (
    <svg
      viewBox="0 0 720 500"
      fill="none"
      role="img"
      aria-label="A scatter of observations on a plot. Two researchers, one seated and one standing and pointing, fit a single line through it; the fitted line rises clear of the scatter in orange and runs onto a pinned printed page, whose figure repeats the same line."
      className="h-auto w-full max-w-[560px] text-navy"
    >
      {/* Axes and ticks. Faint: the plot is the ground the work happens on. */}
      <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <path d="M76 58 L76 400 L404 400" strokeWidth="1.6" opacity=".38" />
        <path d="M70 68 L76 58 L82 68 M394 394 L404 400 L394 406" strokeWidth="1.6" opacity=".38" />
        <path
          d="M150 400 L150 405 M224 400 L224 405 M298 400 L298 405 M372 400 L372 405 M71 130 L76 130 M71 205 L76 205 M71 280 L76 280"
          strokeWidth="1.2"
          opacity=".28"
        />
      </g>

      {/* The raw question: two open question marks over the empty half of the plot. */}
      <g stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" opacity=".3">
        <path d="M116 106 Q116 88 133 89 Q149 90 148 103 Q147 115 134 121 L134 131" />
        <path d="M196 84 Q196 71 208 71 Q220 72 219 81 Q218 90 208 94 L208 101" />
      </g>
      <g fill="currentColor" opacity=".3">
        <circle cx="134" cy="140" r="2.6" />
        <circle cx="208" cy="109" r="2.1" />
      </g>

      {/* The observations. */}
      <g fill="currentColor" opacity=".55">
        <circle cx="105" cy="358" r="3.2" />
        <circle cx="120" cy="378" r="3.2" />
        <circle cx="141" cy="333" r="3.2" />
        <circle cx="153" cy="353" r="3.2" />
        <circle cx="173" cy="339" r="3.2" />
        <circle cx="187" cy="310" r="3.2" />
        <circle cx="201" cy="319" r="3.2" />
        <circle cx="215" cy="287" r="3.2" />
        <circle cx="229" cy="302" r="3.2" />
        <circle cx="247" cy="293" r="3.2" />
        <circle cx="259" cy="267" r="3.2" />
        <circle cx="273" cy="281" r="3.2" />
        <circle cx="291" cy="247" r="3.2" />
        <circle cx="303" cy="263" r="3.2" />
        <circle cx="319" cy="229" r="3.2" />
        <circle cx="333" cy="245" r="3.2" />
        <circle cx="351" cy="214" r="3.2" />
        <circle cx="365" cy="228" r="3.2" />
      </g>

      {/* The fit. Navy while it is still inside the scatter. */}
      <path
        d="M100 366 C 158 342, 232 302, 302 258"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      {/* Orange from the point it rises clear of the scatter, off the plot and
          onto the page. */}
      <path
        d="M302 258 C 350 228, 388 196, 412 158 C 442 112, 486 100, 528 108"
        stroke="#FF6025"
        strokeWidth="2.6"
        strokeLinecap="round"
      />

      {/* The printed page, pinned. */}
      <g transform="rotate(-3 612 128)">
        <rect x="534" y="48" width="156" height="162" className="fill-page" stroke="currentColor" strokeWidth="2.2" />
        <g stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" opacity=".35">
          <path d="M552 74 L666 74 M552 86 L628 86 M552 188 L648 188 M552 197 L604 197" />
        </g>
        <rect x="552" y="102" width="116" height="66" fill="currentColor" fillOpacity=".05" stroke="currentColor" strokeWidth="1.4" opacity=".55" />
        <path
          d="M560 158 C 582 152, 600 138, 616 124 C 630 112, 646 110, 660 108"
          stroke="#FF6025"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <g fill="currentColor" opacity=".45">
          <circle cx="572" cy="152" r="1.8" />
          <circle cx="594" cy="141" r="1.8" />
          <circle cx="622" cy="123" r="1.8" />
          <circle cx="644" cy="112" r="1.8" />
        </g>
        <circle cx="612" cy="48" r="5" fill="currentColor" />
      </g>

      {/* Where the line leaves the plot and arrives on the page. */}
      <circle cx="528" cy="108" r="4.5" fill="#FF6025" />

      {/* The two people fitting it. The seated one is working; the standing one
          has a hand up at the plot. */}
      <g stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
        {/* Desk and notebook. */}
        <path d="M486 390 L600 390 M496 390 L494 452 M588 390 L592 452" />
        <path d="M506 384 L536 379 L543 387 L513 392 Z" className="fill-page" />
        <path d="M513 384 L534 381" strokeWidth="1.6" opacity=".45" />

        {/* The chair, drawn in the house stroke so the figure has something to
            sit on: a seat under the hips, a back behind them, legs to the
            floor. One colour and weight throughout, legs included. */}
        <path d="M444 396 L488 396 M447 396 L449 350 M448 396 L444 452 M484 396 L488 452 M446 426 L486 427" />
        {/* Seated figure: hips on the seat, one thigh forward to a shin that
            reaches the floor, the near arm on the desk. One eye over the smile,
            as on the landing hero. */}
        <path d="M456 396 L460 356 Q469 347 478 356 L483 396 Z" className="fill-page" />
        <path d="M479 364 Q501 368 512 384" />
        <path d="M459 366 Q448 376 453 389" />
        <path d="M483 396 L506 399 L508 452 L522 452" />
        <ellipse cx="469" cy="328" rx="15" ry="17" className="fill-page" />
        <path d="M454 325 Q452 304 470 304 Q488 305 485 327 L478 316 Q468 324 454 325 Z" fill="currentColor" />
        <path d="M470 331 L471 332 M465 340 Q470 343 475 339" strokeWidth="2" />

        {/* Standing figure, hand up at the plot. */}
        <path d="M612 394 L615 332 Q624 324 633 332 L638 394 Z" className="fill-page" />
        <path d="M616 394 L613 452 M635 394 L639 452 M613 452 L601 454 M639 452 L651 454" />
        <path d="M634 340 Q647 360 642 382" />
        <path d="M615 338 Q590 324 564 288" />
        <path d="M564 288 L557 280 M564 288 L556 291" strokeWidth="2.2" />
        <ellipse cx="624" cy="302" rx="15" ry="17" className="fill-page" />
        <path d="M609 300 Q606 279 625 279 Q643 280 640 301 L632 291 Q622 299 609 300 Z" fill="currentColor" />
        <path d="M625 305 L626 306 M620 314 Q625 317 630 313" strokeWidth="2" />
      </g>

      {/* The gesture's target, drawn faintly so the pointing lands somewhere. */}
      <path
        d="M552 276 L436 160"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeDasharray="5 7"
        strokeLinecap="round"
        opacity=".25"
      />
    </svg>
  );
}
