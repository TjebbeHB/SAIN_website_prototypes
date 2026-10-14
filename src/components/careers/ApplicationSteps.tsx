import type { TimelineStep } from "@/data/openPositions";

/* The stepped journey from design.md, on a light ground: a serif numeral in a
   40px column beside the step title, and a 1px spine joining the numerals so
   the five stages read as one process rather than five notices.

   The numeral is set in the page's own serif at the title's size, so its
   baseline lands on the title's without a nudge. */
export default function ApplicationSteps({
  steps,
  className,
}: {
  steps: TimelineStep[];
  className?: string;
}) {
  return (
    <ol role="list" className={className}>
      {steps.map((step, i) => (
        <li
          key={step.label}
          className="relative pb-8 before:absolute before:bottom-0 before:left-[19px] before:top-9 before:w-px before:bg-navy/12 last:pb-0 last:before:hidden"
        >
          <div className="grid grid-cols-[40px_minmax(0,1fr)] gap-x-4">
            <span
              aria-hidden="true"
              className="font-serif text-title tabular-nums text-navy/40"
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="min-w-0">
              <h4 className="font-serif text-title-sm text-navy">
                {step.label}
              </h4>
              <p className="mt-1.5 font-sans text-caption leading-[20px] text-navy/72">
                {step.detail}
              </p>
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}
