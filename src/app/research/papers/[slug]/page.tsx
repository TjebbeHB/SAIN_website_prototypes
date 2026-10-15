import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight, DownloadSimple } from "@phosphor-icons/react/dist/ssr";

import PaperReader from "@/components/research/PaperReader";
import {
  publications,
  paperSourceName,
  RESEARCH_INTEREST_FORM_URL,
  type Publication,
} from "@/data/research";

/* One paper from the community, read on SAIN's own site.

   The imprint band says what the paper is and where it appeared, in the same
   cream as the handbook's title page. The paper itself sits on the navy band,
   page after page, and the close sends the reader who got to the end towards
   writing the next one. Only papers with a `reader` entry in
   src/data/research.ts get a page; the rest still link to their source. */

type Params = { slug: string };

const readable = publications.filter(
  (paper): paper is Publication & { reader: NonNullable<Publication["reader"]> } =>
    Boolean(paper.reader),
);

function findPaper(slug: string) {
  return readable.find((paper) => paper.reader.slug === slug);
}

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return readable.map((paper) => ({ slug: paper.reader.slug }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const paper = findPaper(params.slug);
  if (!paper) return {};
  return {
    title: paper.chipTitle,
    description: paper.featured?.summary ?? `${paper.title}. ${paper.venue}.`,
    alternates: { canonical: `/research/papers/${paper.reader.slug}` },
  };
}

export default function PaperPage({ params }: { params: Params }) {
  const paper = findPaper(params.slug);
  if (!paper) notFound();
  const source = paperSourceName(paper);

  return (
    <>
      <section aria-labelledby="paper-heading" className="border-b border-navy/10 bg-cream">
        <div className="shell band-index grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,340px)] lg:items-center xl:gap-16">
          <div className="min-w-0 max-w-copy-wide">
            <nav aria-label="Breadcrumb" className="font-sans text-label text-navy/65">
              <Link
                href="/research#publications"
                className="text-navy underline decoration-navy/25 underline-offset-4 hover:decoration-navy focus-visible:decoration-navy"
              >
                Project hub
              </Link>
              <span aria-hidden="true" className="px-2 text-navy/35">
                /
              </span>
              <span aria-current="page">Publications</span>
            </nav>

            <p className="mt-6 font-sans text-footnote text-orange-ink">
              {paper.featured?.venueLabel ?? paper.venue}
            </p>
            <h1 id="paper-heading" className="mt-3 font-serif text-heading text-navy">
              {paper.title}
            </h1>
            <p className="mt-4 font-sans text-body text-navy/72">{paper.authors}</p>
            {paper.featured ? (
              <p className="mt-4 max-w-copy font-sans text-body text-navy/74">
                {paper.featured.summary}
              </p>
            ) : null}

            <div className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-4">
              <a href={paper.reader.pdf} download className="btn-accent gap-2">
                Download PDF
                <DownloadSimple size={16} weight="regular" aria-hidden="true" />
              </a>
              <a
                href={paper.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-sans text-label text-navy underline decoration-navy/25 underline-offset-4 hover:decoration-navy focus-visible:decoration-navy"
              >
                View on {source}
                <ArrowUpRight size={16} weight="regular" aria-hidden="true" />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>

            <p className="mt-7 border-t border-navy/10 pt-4 font-sans text-footnote text-navy/60">
              From the SAIN community. Shared here under {paper.reader.license}; the version of
              record is on {source}.
            </p>
          </div>

          {paper.featured ? (
            <div aria-hidden="true" className="hidden bg-navy/[0.04] px-7 py-8 lg:block">
              <Image
                src={`/landing/research/${paper.featured.illustration}.svg`}
                alt=""
                width={360}
                height={190}
                className="mx-auto h-[170px] w-full max-w-[300px] object-contain"
              />
            </div>
          ) : null}
        </div>
      </section>

      <section aria-label="The paper" className="bg-inverse text-white">
        <div className="shell pb-16 pt-8 md:pb-24 md:pt-10">
          <PaperReader src={paper.reader.pdf} title={paper.chipTitle} />
        </div>
      </section>

      <section aria-labelledby="paper-next-heading" className="bg-cream">
        <div className="shell band-section flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <div className="max-w-[620px]">
            <h2 id="paper-next-heading" className="font-serif text-heading-sm text-navy">
              Write the next one
            </h2>
            <p className="mt-4 font-sans text-body text-navy/74">
              Work like this is what the Project Hub is for. It matches you with a supervisor,
              arranges compute, and takes a project from open question to published finding.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4 lg:shrink-0">
            <a
              href={RESEARCH_INTEREST_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-accent gap-2"
            >
              Register your interest
              <ArrowUpRight size={16} weight="regular" aria-hidden="true" />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            <Link
              href="/research#projects"
              className="inline-flex items-center gap-2 font-sans text-label text-navy underline decoration-navy/25 underline-offset-4 hover:decoration-navy focus-visible:decoration-navy"
            >
              Browse open projects
              <ArrowRight size={16} weight="regular" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
