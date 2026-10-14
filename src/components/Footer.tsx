import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { COMMUNITY_JOIN_URL } from "@/data/siteContact";

/* Inverse navy close. Poppins italic for the stichting line and the
   column titles, Poppins for the links. One bottom rule, then the legal line
   and the cities. No second logo treatment.

   The nav above carries three routes only, so the footer carries the whole
   map: the community and its city doors, every programme, and the
   organisation pages the nav no longer names. */

type FooterLink = { name: string; href: string; external?: boolean };

const columns: { title: string; links: FooterLink[] }[] = [
  {
    title: "Community",
    links: [
      { name: "Community", href: "/community" },
      { name: "Utrecht", href: "/chapters/utrecht" },
      { name: "Groningen", href: "/chapters/groningen" },
      { name: "Amsterdam", href: "/chapters/amsterdam" },
      { name: "Join the community", href: COMMUNITY_JOIN_URL, external: true },
    ],
  },
  {
    title: "Programmes",
    links: [
      { name: "Courses", href: "/courses" },
      { name: "Project hub", href: "/research" },
      { name: "Research handbook", href: "/research/handbook" },
      { name: "Volunteer", href: "/get-involved" },
    ],
  },
  {
    title: "Organisation",
    links: [
      { name: "About", href: "/about" },
      { name: "Team", href: "/team" },
      { name: "Open positions", href: "/open-positions" },
      { name: "Contact", href: "/contact" },
    ],
  },
];

/* The same three channels layout.tsx declares in the organisation's JSON-LD. */
const socials: FooterLink[] = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/safe-ai-netherlands/",
    external: true,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/sainetherlands/",
    external: true,
  },
  {
    name: "Newsletter",
    href: "https://safeainetherlands.substack.com/",
    external: true,
  },
];

const documents: FooterLink[] = [
  { name: "Vision", href: "/about/vision" },
  { name: "Theory of Change", href: "/about/theory-of-change" },
  { name: "Code of Conduct", href: "/about/code-of-conduct" },
];

function FooterAnchor({
  link,
  iconSize = 16,
}: {
  link: FooterLink;
  iconSize?: 14 | 16;
}) {
  const className =
    "font-sans text-sm leading-5 text-white/78 transition-colors hover:text-white focus-visible:text-white";

  if (link.external) {
    return (
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-1.5 ${className}`}
      >
        {link.name}
        <ArrowUpRight size={iconSize} weight="regular" aria-hidden="true" />
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }

  return (
    <Link href={link.href} className={className}>
      {link.name}
    </Link>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-white/16 bg-inverse">
      <div className="shell pb-10 pt-[52px]">
        <div className="flex flex-col gap-8 lg:flex-row">
          <div className="flex w-full max-w-[420px] flex-col gap-3.5 lg:max-w-[300px] lg:shrink-0 xl:max-w-[420px]">
            {/* The chalk lockup rather than the boxed light one: its navy box
                was painted for the day footer and shows as a patch on the
                deeper night ground. */}
            <img
              src="/landing/logo-chalk-140.png"
              srcSet="/landing/logo-chalk-140.png 1x, /landing/logo-chalk-280.png 2x, /landing/logo-chalk-420.png 3x"
              alt="Safe AI Netherlands"
              className="h-10 w-auto self-start"
              width={151}
              height={40}
            />
            <p className="kicker text-kicker-sm text-white/50">
              Stichting Safe AI Netherlands
            </p>
            <a
              href="mailto:info@safeainetherlands.org"
              className="font-sans text-sm leading-5 text-white/78 transition-colors hover:text-white focus-visible:text-white"
            >
              info@safeainetherlands.org
            </a>
            <ul role="list" className="flex flex-wrap gap-x-5 gap-y-1">
              {socials.map((social) => (
                <li key={social.name}>
                  <FooterAnchor link={social} iconSize={14} />
                </li>
              ))}
            </ul>
          </div>

          <div className="grid flex-1 gap-8 sm:grid-cols-3 lg:grid-cols-[repeat(3,max-content)] lg:justify-end lg:gap-x-28 xl:gap-x-40">
            {columns.map((column) => (
              <div key={column.title} className="flex flex-col gap-[11px]">
                <p className="kicker text-kicker-sm text-white/50">{column.title}</p>
                {column.links.map((link) => (
                  <FooterAnchor key={link.name} link={link} />
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-[26px] flex flex-col justify-between gap-3 border-t border-white/16 pt-[18px] sm:flex-row sm:items-center">
          <p className="font-sans text-footnote text-white/60">
            &copy; {new Date().getFullYear()} Safe AI Netherlands
          </p>
          <div className="flex flex-wrap gap-5">
            {documents.map((document) => (
              <Link
                key={document.name}
                href={document.href}
                className="font-sans text-footnote text-white/60 transition-colors hover:text-white focus-visible:text-white"
              >
                {document.name}
              </Link>
            ))}
          </div>
          <p className="font-sans text-footnote text-white/60">
            Utrecht &middot; Groningen &middot; Amsterdam
          </p>
        </div>
      </div>
    </footer>
  );
}
