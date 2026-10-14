import Image from "next/image";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { supervisors } from "@/data/research";

/* The supervisors, as a left-aligned row of square portraits.
 *
 * They were circles with centred captions, which is the stock team-grid and
 * the only rounded thing on a page whose whole system is square: hairlines,
 * square tabs, square buttons, square prints. A square also matches the source
 * photographs exactly, so nobody's face is cropped to fit a frame.
 *
 * The captions are left-aligned under the tile now. This page sets everything
 * from a left margin except one centred section header; five centred captions
 * in a row put five ragged axes into an editorial layout.
 *
 * Fixed 140px tiles in a wrapping flex row rather than five stretched grid
 * columns. Held at this size the 312px source still lands above 2x on a retina
 * screen, and the air between the tiles comes from the gap rather than from
 * columns padding themselves out.
 *
 * Hover and focus: the frame holds still and the portrait moves inside it, the
 * hairline brightens, and an orange rule draws under the name from the left.
 * design.md asks for colour to be paired with a non-colour cue, which is what
 * the rule and the zoom are. Tailwind v4 already gates `hover:` behind
 * `@media (hover: hover)`, so none of it fires from a tap; every cue repeats on
 * `group-focus-visible:` because a keyboard never fires `:hover`, and the two
 * transforms sit behind `motion-safe:`.
 */
export default function ResearchPeople() {
  return (
    <ul role="list" className="flex flex-wrap gap-x-8 gap-y-9 md:gap-x-10">
      {supervisors.map((person) => (
        <li key={person.name} className="w-[140px]">
          <a
            href={person.agenda}
            target="_blank"
            rel="noopener noreferrer"
            className="group block outline-offset-4"
          >
            {/* isolate: a scaled child under a clip needs its own stacking
                context or Safari lets the corners through. */}
            <span className="block isolate overflow-hidden border border-white/20 transition-colors duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:border-white/50 group-focus-visible:border-white/50">
              <Image
                src={person.imageSmall}
                alt=""
                width={312}
                height={312}
                className="aspect-square w-full object-cover transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] motion-safe:group-hover:scale-[1.04] motion-safe:group-focus-visible:scale-[1.04]"
              />
            </span>

            <h4 className="mt-3.5 font-serif text-title-sm leading-6 text-white">
              {/* inline-block so the rule hugs the name rather than the column. */}
              <span className="relative inline-block">
                {person.name}
                <ArrowUpRight
                  size={14}
                  weight="regular"
                  aria-hidden="true"
                  className="ml-1 inline-block shrink-0 align-[-2px]"
                />
                <span
                  aria-hidden="true"
                  className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-orange transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100 group-focus-visible:scale-x-100"
                />
              </span>
            </h4>

            <p className="mt-1.5 text-footnote leading-5 text-white/70">
              {person.positionShort}
            </p>
            {/* The whole supervisor is the link, so the destination has to be
                named for anyone who cannot see the hover state. */}
            <span className="sr-only">Research agenda (opens in a new tab)</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
