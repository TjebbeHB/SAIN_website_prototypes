import { Cpu, FileText, Globe, UsersThree } from "@phosphor-icons/react/dist/ssr";

/**
 * What the hub gives a researcher, as one strip under the band's claim.
 *
 * These four used to sit inside step one, which made step one carry the whole
 * offer while steps two and three then repeated half of it in prose: step two
 * already says supervisor feedback and compute, step three already shows the
 * NeurIPS and ICLR papers. None of the four is about *choosing a project*, so
 * none of them belonged to that step. Up here they are read by everyone, and
 * the three steps are left as the narrative they were written to be.
 *
 * Hairlines rather than cards, and the icons are white rather than orange.
 * design.md keeps orange for joining, hiring, the active track, the last step
 * of the path and the rising part of the chart -- "if a page uses orange only
 * as a bullet dot, it is not SAIN" -- and four icons marking four nouns is the
 * bullet-dot use. The band still spends orange where it means something: the
 * step numerals, the chart in the illustration, and "Join as a researcher".
 */
const offer = [
  {
    title: "Supervised matching",
    icon: UsersThree,
    description: "Connect with PhD+ supervisors for structured, mentored AI Safety research.",
  },
  {
    title: "Compute & support",
    icon: Cpu,
    description: "Access compute and logistical support for your project or open collaboration.",
  },
  {
    title: "National network",
    icon: Globe,
    description: "Work with researchers, advisors, and practitioners across SAIN’s Dutch chapters.",
  },
  {
    title: "Publication track",
    icon: FileText,
    description: "Build your research track record in a community with work at NeurIPS, ICLR, and other leading venues.",
  },
];

export default function ResearchOffer() {
  return (
    /* Two rows at lg, and each column is a subgrid of them, so the four
       descriptions start on one line however long a title runs. That is what
       the `min-h` reservation here used to approximate, and it broke the
       moment a title wrapped to a line nobody had counted. */
    <dl className="mt-10 grid border-t border-white/15 md:mt-12 lg:grid-cols-4 lg:grid-rows-[auto_1fr]">
      {offer.map(({ title, description, icon: Icon }) => (
        <div
          key={title}
          className="border-b border-white/10 py-5 last:border-b-0 lg:row-span-2 lg:grid lg:grid-rows-subgrid lg:border-b-0 lg:border-l lg:px-6 lg:py-7 lg:first:border-l-0 lg:first:pl-0 lg:last:pr-0 xl:px-8"
        >
          <dt className="flex items-center gap-3 font-serif text-title text-white lg:block">
            <Icon size={26} weight="light" aria-hidden="true" className="shrink-0 text-white/45 lg:mb-4" />
            <span className="lg:block lg:max-w-[170px]">{title}</span>
          </dt>
          <dd className="mt-3 text-kicker-sm leading-6 text-white/75">{description}</dd>
        </div>
      ))}
    </dl>
  );
}
