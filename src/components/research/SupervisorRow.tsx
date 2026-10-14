import Image from "next/image";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { supervisors } from "@/data/research";

/* The supervisors, as a left-aligned row of 140px square portraits on white.
 *
 * The landing runs this device on inverse navy; here the ground is white, so
 * the frame is a navy hairline that deepens rather than a white one that
 * brightens, and the role sits in navy at 65%. Everything else is the same
 * object: squares, never circles, never avatars, the full position under the
 * name, and an orange rule drawing under the name on hover.
 *
 * The full `position` runs here rather than the landing's trimmed
 * `positionShort`. This is the page where the reader is checking people, and an
 * affiliation is the thing being checked.
 *
 * Hover cues repeat on focus-visible, because a keyboard never fires hover, and
 * both transforms sit behind motion-safe.
 */
export default function SupervisorRow() {
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
            <span className="block isolate overflow-hidden border border-navy/20 transition-colors duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:border-navy/50 group-focus-visible:border-navy/50">
              <Image
                src={person.imageSmall}
                alt=""
                width={312}
                height={312}
                className="aspect-square w-full object-cover transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] motion-safe:group-hover:scale-[1.04] motion-safe:group-focus-visible:scale-[1.04]"
              />
            </span>

            <h3 className="mt-3.5 font-serif text-title-sm leading-6 text-navy">
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
            </h3>

            <p className="mt-1.5 text-footnote leading-5 text-navy/65">
              {person.position}
            </p>
            {/* The whole portrait is the link, so the destination has to be
                named for anyone who cannot see the hover state. */}
            <span className="sr-only">Research agenda (opens in a new tab)</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
