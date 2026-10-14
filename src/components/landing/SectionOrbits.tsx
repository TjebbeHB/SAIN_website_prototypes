/** Quiet edge decoration that continues the hero's orbital linework. */
export default function SectionOrbits({ className }: { className: string }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className={`pointer-events-none absolute -z-10 overflow-visible text-navy opacity-[0.025] md:opacity-[0.035] ${className}`}
      viewBox="0 0 300 400"
      fill="none"
    >
      <g stroke="currentColor" strokeWidth="1">
        <circle cx="0" cy="200" r="148" />
        <circle cx="0" cy="200" r="186" />
      </g>
    </svg>
  );
}
