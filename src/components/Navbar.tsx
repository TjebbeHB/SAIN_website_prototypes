"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { hasOpenPositions } from "@/data/openPositions";
import { ListIcon, XIcon } from "@phosphor-icons/react/dist/ssr";
import ThemeToggle from "@/components/ThemeToggle";

/* The authorship shell: a civic broadcast strip, then the header. The strip
   scrolls away once read; the header pins to the top for the rest of the page.

   The lockup sits beside the organisation's name in full, behind a hairline,
   as on the atlas: "SAIN" alone is a wordmark a newcomer has to decode. The
   nav is a flat row, with Impact pointing at the numbers on the landing for
   the funders and partners who come looking for them. */

const navigation: {
  name: string;
  href: string;
  isActive: (path: string) => boolean;
}[] = [
  {
    name: "Courses",
    href: "/courses",
    isActive: (p) => p === "/courses" || p.startsWith("/courses/"),
  },
  {
    name: "Community",
    href: "/community",
    /* The chapter pages live under the Community door, so they light it up. */
    isActive: (p) =>
      p === "/community" ||
      p.startsWith("/community/") ||
      p.startsWith("/chapters"),
  },
  {
    name: "Research hub",
    href: "/research",
    isActive: (p) => p.startsWith("/research"),
  },
  {
    name: "About",
    href: "/about",
    isActive: (p) => p === "/about" || p.startsWith("/about/"),
  },
  {
    name: "Impact",
    href: "/#impact",
    isActive: () => false,
  },
];

function Lockup() {
  return (
    <>
      <img
        src="/landing/logo-navy-140.png"
        srcSet="/landing/logo-navy-140.png 1x, /landing/logo-navy-280.png 2x, /landing/logo-navy-420.png 3x"
        alt="Safe AI Netherlands"
        className="only-light h-[37px] w-auto"
        width={140}
        height={37}
      />
      <img
        src="/landing/logo-chalk-140.png"
        srcSet="/landing/logo-chalk-140.png 1x, /landing/logo-chalk-280.png 2x, /landing/logo-chalk-420.png 3x"
        alt="Safe AI Netherlands"
        className="only-dark h-[37px] w-auto"
        width={140}
        height={37}
      />
    </>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      {/* The broadcast is read once on arrival, then it scrolls away. Only the
          header pins, so the nav sits at the very top rather than 42px down
          behind a strip the reader has already taken in. */}
      {hasOpenPositions && (
        <div className="flex items-center justify-center gap-3 bg-orange px-6 py-[11px] md:px-12">
          <p className="kicker text-kicker-sm text-white/85">
            We are hiring
          </p>
          <span
            className="hidden h-px w-[22px] bg-white/50 sm:block"
            aria-hidden="true"
          />
          <Link
            href="/open-positions"
            className="font-sans text-caption text-white underline decoration-white/45 underline-offset-4 transition-colors hover:decoration-white focus-visible:decoration-white"
          >
            See open positions
          </Link>
        </div>
      )}

      {/* The mobile panel lives inside the sticky box so it travels with the
          header instead of being left behind at its original offset. */}
      <div className="sticky top-0 z-50">
        <header className="border-b border-navy/10 bg-page/94 backdrop-blur-md">
          <div className="shell flex min-h-[74px] items-center justify-between gap-6 py-2.5">
            <Link
              href="/"
              className="flex shrink-0 items-center gap-5"
              aria-label="Safe AI Netherlands home"
            >
              <Lockup />
              <span className="hidden h-9 w-px bg-navy/16 xl:block" aria-hidden="true" />
              <span className="hidden font-serif text-[21px] font-medium leading-none tracking-[-0.01em] text-navy xl:block">
                Safe AI Netherlands
              </span>
            </Link>

            <div className="flex items-center gap-7">
              <nav
                className="hidden items-center gap-[28px] lg:flex"
                aria-label="Primary"
              >
                {navigation.map((item) => {
                  const active = item.isActive(pathname);
                  const underline = active
                    ? "border-orange"
                    : "border-transparent hover:border-navy/40 focus-visible:border-navy/40";

                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`border-b-2 py-1 font-sans text-[14.5px] font-medium leading-5 text-navy transition-colors ${underline}`}
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </nav>

              <div className="flex items-center gap-2.5">
                <ThemeToggle className="hidden sm:inline-flex" />
                <Link href="/get-involved" className="btn-ghost hidden min-h-[44px] sm:inline-flex">
                  Volunteer
                </Link>
                <Link href="/courses" className="btn-ink hidden min-h-[44px] sm:inline-flex">
                  Join a free course
                </Link>
                <button
                  type="button"
                  onClick={() => setMobileOpen((open) => !open)}
                  className="inline-flex size-11 items-center justify-center rounded-[4px] border border-navy/20 text-navy lg:hidden"
                  aria-expanded={mobileOpen}
                  aria-controls="mobile-nav"
                  aria-label={mobileOpen ? "Close menu" : "Open menu"}
                >
                  {mobileOpen ? (
                    <XIcon size={18} weight="light" aria-hidden="true" />
                  ) : (
                    <ListIcon size={18} weight="light" aria-hidden="true" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </header>

        {mobileOpen && (
          <nav
            id="mobile-nav"
            className="border-b border-navy/10 bg-page lg:hidden"
            aria-label="Mobile"
          >
            <div className="shell flex flex-col gap-1 py-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  aria-current={item.isActive(pathname) ? "page" : undefined}
                  className="flex min-h-[44px] items-center font-sans text-sm leading-5 text-navy"
                >
                  {item.name}
                </Link>
              ))}
              {/* The header keeps both calls to action and the theme switch
                  from sm up, so the sheet only carries them on the narrowest
                  screens -- otherwise the same controls show twice. */}
              <div className="mt-2 flex items-center gap-3 sm:hidden">
                <ThemeToggle />
                <span className="font-sans text-caption text-navy/65">Light or dark page</span>
              </div>
              <Link
                href="/get-involved"
                onClick={() => setMobileOpen(false)}
                className="btn-ghost mt-2 min-h-[44px] sm:hidden"
              >
                Volunteer
              </Link>
              <Link
                href="/courses"
                onClick={() => setMobileOpen(false)}
                className="btn-ink min-h-[44px] sm:hidden"
              >
                Join a free course
              </Link>
            </div>
          </nav>
        )}
      </div>
    </>
  );
}
