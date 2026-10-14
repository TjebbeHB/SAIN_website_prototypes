import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

/* The handbook's reading furniture.

   This page is a document, so its vocabulary is smaller than a landing band's:
   a paragraph, a bulleted list, a numbered outline row, a cream aside, and two
   numeral devices. Everything is built from the published roles and a 1px
   hairline; there are no cards here, and nothing on this page is a box except
   the four callouts, which are asides lifted out of the reading order on
   purpose. */

/** A reading paragraph. Body role, navy at 74%, never wider than the column. */
export function P({ children }: { children: ReactNode }) {
  return <p className="font-sans text-body text-navy/74">{children}</p>;
}

/** A chapter turn inside a section. One step quieter than the h2 above it. */
export function Turn({ id, children }: { id?: string; children: ReactNode }) {
  return (
    <h3
      id={id}
      className="mt-10 font-serif text-heading-sm text-navy first:mt-0"
    >
      {children}
    </h3>
  );
}

/** The title over a peer sub-block (a role, a topic bucket, a standard). */
export function SubTitle({ children }: { children: ReactNode }) {
  return (
    <h4 className="font-serif text-title-sm text-navy">{children}</h4>
  );
}

/* A bulleted list of rules.

   The marker is a 14px navy hairline rather than a dot: design.md keeps orange
   for joining and active state, and a grey disc would be the one grey on a page
   whose whole ink system is navy at an opacity. The rule sits on the optical
   centre of a 27px first line. */
export function Bullets({ items }: { items: ReactNode[] }) {
  return (
    <ul className="flex flex-col gap-2.5">
      {items.map((item, i) => (
        <li
          key={i}
          className="relative pl-6 font-sans text-body text-navy/74 before:absolute before:left-0 before:top-[13px] before:h-px before:w-3.5 before:bg-navy/30"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

/* The course-outline row, borrowed from the landing's course tabs.

   A hairline above every row, a number in the 22px column in orange-ink, and
   the text at UI size. It is the right treatment for material the reader
   works through rather than reads: the proposal checklist, the four principles,
   the supervisor procedure. `ordered` distinguishes the three that are a
   sequence from the one that is simply a list. */
export function OutlineList({
  items,
  ordered = true,
}: {
  items: ReactNode[];
  ordered?: boolean;
}) {
  const rows = items.map((item, i) => (
    <li
      key={i}
      className="flex gap-3 border-t border-navy/10 py-[7px] font-sans text-ui text-navy"
    >
      {/* The list element carries the sequence for assistive tech; the numeral
          is the visible half of the same fact, so it is not read twice. */}
      <span
        aria-hidden="true"
        className="w-[22px] shrink-0 pt-[3px] font-sans text-[12px] leading-4 tabular-nums text-orange-ink"
      >
        {String(i + 1).padStart(2, "0")}
      </span>
      <span className="min-w-0 flex-1">{item}</span>
    </li>
  ));

  return ordered ? (
    <ol className="flex flex-col">{rows}</ol>
  ) : (
    <ul className="flex flex-col">{rows}</ul>
  );
}

/* Peers under one hairline.

   Used twice: the two programme modes, and the three roles during a project.
   design.md asks equivalent peers to share a rule position rather than be
   separated by gap alone, and it keeps them out of cards. One left hairline
   runs the height of the group; each member sits at the same 18px inset. */
export function Rail({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col gap-9 border-l border-navy/14 pl-[18px]">
      {children}
    </div>
  );
}

/* The serif numeral device, in its light-ground variant.

   On inverse the landing sets these at white/40 in a 40px column beside the
   step title. Here the ground is white, so the numeral is navy at 40%: loud
   enough to count the steps, quiet enough that the sentence beside it is still
   the thing being read. */
export function NumberedSteps({ steps }: { steps: ReactNode[] }) {
  return (
    <ol className="flex flex-col gap-5">
      {steps.map((step, i) => (
        <li key={i} className="flex gap-4">
          <span
            aria-hidden="true"
            className="w-10 shrink-0 font-serif text-heading-sm tabular-nums text-navy/40"
          >
            {i + 1}
          </span>
          <span className="min-w-0 flex-1 pt-1 font-sans text-body text-navy/74">
            {step}
          </span>
        </li>
      ))}
    </ol>
  );
}

/* The cream aside.

   Four of these carry the facts a reader comes back for: eligibility, hours,
   Sunday deadlines, the one address. Cream on white, a navy/14 hairline, square
   corners, no shadow. The label is the serif italic kicker-sm, which is the
   system's way of naming a thing without an uppercase eyebrow. */
export function Callout({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <aside
      aria-label={label}
      className="border border-navy/14 bg-cream px-6 py-6 md:px-7"
    >
      <p className="kicker text-kicker-sm text-navy/65">{label}</p>
      <div className="mt-3 flex flex-col gap-3">{children}</div>
    </aside>
  );
}

/* An inline link that leaves the page.

   ArrowUpRight leans the way it sends you, the same glyph "Read paper" uses on
   the publication cards. The new tab is announced rather than left for a reader
   to discover after the fact. */
export function OutLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-baseline gap-1.5 font-sans text-label text-navy underline decoration-navy/25 underline-offset-4 hover:decoration-navy focus-visible:decoration-navy"
    >
      {children}
      <ArrowUpRight size={16} weight="regular" aria-hidden="true" className="translate-y-[2px]" />
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

/** A plain inline link that stays on the site. Same-page anchors stay a plain
    anchor; a route on the site routes through next/link, so a cross-page
    reference is a client navigation and not a fresh document load. */
export function InLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  const className =
    "font-sans text-navy underline decoration-navy/25 underline-offset-4 hover:decoration-navy focus-visible:decoration-navy";
  return href.startsWith("/") ? (
    <Link href={href} className={className}>
      {children}
    </Link>
  ) : (
    <a href={href} className={className}>
      {children}
    </a>
  );
}
