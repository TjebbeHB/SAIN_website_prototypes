import { readFile } from "fs/promises";
import path from "path";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react/dist/ssr";

import MarkdownDocument from "@/components/MarkdownDocument";
import { getSainDocument, sainDocuments } from "@/data/sainDocuments";

type DocumentPageProps = {
  params: {
    document: string;
  };
};

async function readDocumentMarkdown(fileName: string) {
  return readFile(path.join(process.cwd(), "docs", fileName), "utf8");
}

export function generateStaticParams() {
  return sainDocuments.map((document) => ({
    document: document.slug,
  }));
}

export function generateMetadata({ params }: DocumentPageProps): Metadata {
  const document = getSainDocument(params.document);

  if (!document) {
    return {};
  }

  return {
    title: document.title,
    description: document.description,
  };
}

export default async function DocumentPage({ params }: DocumentPageProps) {
  const document = getSainDocument(params.document);

  if (!document) {
    notFound();
  }

  const markdown = await readDocumentMarkdown(document.fileName);
  const others = sainDocuments.filter((entry) => entry.slug !== document.slug);

  return (
    <>
      {/* Front matter on paper. These are the foundation's written rules, so
          the page opens like the cover of a printed programme: where it sits,
          what kind of document it is, its title, and what it covers. */}
      <section
        aria-labelledby="document-heading"
        className="border-b border-navy/10 bg-cream"
      >
        <div className="shell band-hero flex flex-col gap-6">
          <Link
            href="/about"
            className="inline-flex w-fit items-center gap-1.5 font-sans text-label text-navy/65 underline decoration-navy/20 underline-offset-4 hover:text-navy hover:decoration-navy focus-visible:text-navy"
          >
            <ArrowLeft size={16} weight="regular" aria-hidden="true" />
            About SAIN
          </Link>

          <div className="flex flex-col gap-4">
            <p className="kicker text-kicker text-navy/65">{document.eyebrow}</p>
            <h1
              id="document-heading"
              className="max-w-[720px] font-serif text-display text-navy"
            >
              {document.title}
            </h1>
            <p className="max-w-[var(--container-copy)] font-sans text-body text-navy/72">
              {document.description}
            </p>
          </div>
        </div>
      </section>

      {/* One reading column at the published copy width. Nothing in the margin:
          the document is the band. */}
      <section className="bg-page">
        <div className="shell band-section">
          <div className="max-w-[var(--container-copy)]">
            <MarkdownDocument markdown={markdown} />
          </div>
        </div>
      </section>

      {/* The other two documents, because a reader who opened one of these came
          to check what SAIN has written down, not to read one file. */}
      <section
        aria-labelledby="other-documents-heading"
        className="border-t border-navy/10 bg-page"
      >
        <div className="shell band-index flex flex-col gap-6">
          <h2
            id="other-documents-heading"
            className="font-serif text-heading-sm text-navy"
          >
            The rest of what SAIN has written down.
          </h2>
          <ul className="flex flex-wrap gap-4">
            {others.map((entry) => (
              <li key={entry.slug}>
                <Link
                  href={`/about/${entry.slug}`}
                  className="pub-chip w-full max-w-[340px] justify-between gap-6 sm:w-auto"
                >
                  <span className="flex min-w-0 flex-col gap-1">
                    <span className="font-sans text-footnote font-medium text-orange-ink">
                      {entry.eyebrow}
                    </span>
                    <span className="font-serif text-[15px] leading-5 text-navy">
                      {entry.title}
                    </span>
                  </span>
                  <ArrowRight
                    size={16}
                    weight="regular"
                    aria-hidden="true"
                    className="shrink-0 text-navy"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
