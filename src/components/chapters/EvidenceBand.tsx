import type { ReactNode } from "react";

import Reveal from "@/components/landing/Reveal";

/**
 * The record. Photographs, the events that ran, the papers that came out.
 *
 * This is the band that separates a chapter from a landing page: everything in
 * it already happened. Nothing here is a promise, so nothing here is written
 * in the future tense.
 */
export default function EvidenceBand({
  heading,
  body,
  children,
}: {
  heading: string;
  body: string;
  children: ReactNode;
}) {
  return (
    <section
      id="record"
      aria-labelledby="record-heading"
      className="scroll-mt-36 border-t border-navy/10 bg-page"
    >
      <div className="shell band-section">
        <div className="max-w-[var(--container-copy)]">
          <h2 id="record-heading" className="font-serif text-heading text-navy">
            {heading}
          </h2>
          <p className="mt-3 font-sans text-body text-navy/74">{body}</p>
        </div>
        <Reveal className="mt-8 flex flex-col gap-10">{children}</Reveal>
      </div>
    </section>
  );
}
