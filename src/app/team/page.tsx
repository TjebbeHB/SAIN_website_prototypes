import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

/* /team is an old address for the people band on /about.
 *
 * `redirect()` is a server 307, and this site builds with `output: "export"`,
 * so the exported team page had an empty body: anyone arriving from a search
 * result, a pasted link or a new tab got a white screen. A static host can
 * serve a meta refresh, so the page carries one, plus the link in plain sight
 * for anyone whose browser or reader does not follow it. */
const TARGET = "/about#team";

export const metadata: Metadata = {
  title: "Team",
  description: "The board and advisory board of Stichting Safe AI Netherlands, on the about page.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/about" },
};

export default function TeamPage() {
  return (
    <>
      {/* Honoured in the body by every current browser; the link below is the
          fallback for anything that is not. */}
      <meta httpEquiv="refresh" content={`0;url=${TARGET}`} />
      <section aria-labelledby="team-redirect-heading" className="bg-page">
        <div className="shell band-hero flex flex-col">
          <h1
            id="team-redirect-heading"
            className="max-w-[620px] font-serif text-heading text-navy"
          >
            The team now lives on the about page.
          </h1>
          <p className="mt-5 max-w-[620px] font-sans text-body text-navy/72">
            The board and the advisory board are listed there, with the mission and the talent
            pipeline around them.
          </p>
          <p className="mt-6">
            <Link
              href={TARGET}
              className="inline-flex items-center gap-2 font-sans text-label text-navy underline decoration-navy/25 underline-offset-4 hover:decoration-navy focus-visible:decoration-navy"
            >
              The people running SAIN
              <ArrowRight size={16} weight="regular" aria-hidden="true" />
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
