import Link from "next/link";
import type { ReactNode } from "react";

/* The renderer behind /about/vision, /about/theory-of-change,
   /about/code-of-conduct and /research/handbook.

   These are SAIN documents, so they are set like documents: a serif claim for
   every turn, one reading column, hairlines instead of boxes, square corners,
   and orange only where a numeral is doing the ordering. The markdown in
   docs/*.md is written for GitHub, not for this page, so four things are
   normalised on the way in: the escapes GitHub's exporter leaves behind, the
   em dashes design.md forbids in copy, the American spellings the rest of the
   site does not use, and the document's own H1, which the page already prints
   as its title. */

type Block =
  | { type: "heading"; level: number; text: string; id: string }
  | { type: "paragraph"; text: string }
  | { type: "unordered-list"; items: string[] }
  | { type: "ordered-list"; items: string[] }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "rule" };

/* design.md: "Never use an em dash anywhere in copy." The source documents are
   full of them, and rewriting docs/*.md by hand would drift from whatever the
   board last approved, so the dash is resolved here instead. An em dash in
   these files always joins two clauses, which a comma carries; a dash between
   two numbers is a range, which a hyphen carries. */
function normaliseDashes(text: string) {
  return text
    .replace(/(\d)\s*[–—]\s*(\d)/g, "$1-$2")
    .replace(/\s*—\s*/g, ", ")
    .replace(/\s+–\s+/g, ", ")
    .replace(/,\s*,/g, ",")
    .replace(/,\s*([.;:!?])/g, "$1");
}

/* A pair of em dashes is not two dashes. When two of them bound an
   interjection, they are doing the work of parentheses, and turning each one
   into a comma collapses the interjection into whatever list sits beside it
   ("the right ecosystem, education, research, community, and visibility, and
   make it easy to enter"). So the pair is resolved first, on the whole block,
   before the bold/italic split hands single fragments to cleanInline. A pair
   that spans a sentence boundary is not a pair, and is left to the single-dash
   rule. */
function normalisePairedDashes(text: string) {
  return text
    .replace(/\s*—\s*([^—]+?)\s*—\s*/g, (match, inner: string) =>
      /\.\s/.test(inner) ? match : ` (${inner}) `,
    )
    .replace(/\)\s+([.,;:!?])/g, ")$1")
    .replace(/^\s+\(/, "(");
}

/* design.md: British spelling. The documents are written in American spelling,
   so /about renders "organisation" while /about/vision one click later renders
   "organization". Same argument as the dashes: normalise on the way in rather
   than editing markdown the board approved. The stem list is closed, and holds
   only what actually occurs in docs/*.md. */
const izePattern =
  /\b(organi|centrali|prioriti|recogni|reali|standardi|professionali|polari|authori)z(es|ed|ing|ers|er|ations|ational|ation|e)\b/gi;

function normaliseSpelling(text: string) {
  return text
    .replace(izePattern, "$1s$2")
    .replace(/\b([Bb]ehavio)r/g, "$1ur")
    .replace(/\b([Pp]rogram)(s?)\b/g, "$1me$2")
    .replace(/\b([Mm]odel)(ed|ing)\b/g, "$1l$2")
    .replace(/\b([Cc])enter\b/g, "$1entre");
}

function cleanInline(text: string) {
  return normaliseSpelling(
    normaliseDashes(text.replace(/\\([\\.*+\-[\](){}#|>_~!`])/g, "$1")),
  ).replace(/\s{2,}$/g, "");
}

function stripFormatting(text: string) {
  return cleanInline(normalisePairedDashes(text))
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/\*(.*?)\*/g, "$1");
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function renderFormatted(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const boldPattern = /\*\*(.*?)\*\*/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = boldPattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(cleanInline(text.slice(lastIndex, match.index)));
    }

    nodes.push(
      <strong
        key={`${keyPrefix}-bold-${match.index}`}
        className="font-medium text-navy"
      >
        {cleanInline(match[1])}
      </strong>,
    );
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    nodes.push(cleanInline(text.slice(lastIndex)));
  }

  return nodes.flatMap((node, index) => {
    if (typeof node !== "string") return node;

    const italicNodes: ReactNode[] = [];
    const italicPattern = /(?<!\*)\*([^*]+)\*(?!\*)/g;
    let italicLastIndex = 0;
    let italicMatch: RegExpExecArray | null;

    while ((italicMatch = italicPattern.exec(node)) !== null) {
      if (italicMatch.index > italicLastIndex) {
        italicNodes.push(cleanInline(node.slice(italicLastIndex, italicMatch.index)));
      }

      italicNodes.push(
        <em key={`${keyPrefix}-italic-${index}-${italicMatch.index}`}>
          {cleanInline(italicMatch[1])}
        </em>,
      );
      italicLastIndex = italicMatch.index + italicMatch[0].length;
    }

    if (italicLastIndex < node.length) {
      italicNodes.push(cleanInline(node.slice(italicLastIndex)));
    }

    return italicNodes;
  });
}

/* The inline link, per design.md: navy label, underline at ink/25 with a 4px
   offset, deepening to full on hover. No colour change, because colour is not
   the only sign of anything here. */
const linkClass =
  "text-navy underline decoration-navy/25 underline-offset-4 transition-[text-decoration-color] hover:decoration-navy focus-visible:decoration-navy";

function renderInline(source: string, keyPrefix: string): ReactNode[] {
  /* Whole-block first, so a dash pair is still a pair when it wraps a bold
     phrase and the split below would otherwise cut it in two. */
  const text = normalisePairedDashes(source);
  const nodes: ReactNode[] = [];
  const linkPattern = /\[([^\]]+)\]\(([^)]+)\)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = linkPattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(
        ...renderFormatted(
          text.slice(lastIndex, match.index),
          `${keyPrefix}-text-${match.index}`,
        ),
      );
    }

    const [, label, href] = match;
    const isExternal = href.startsWith("http") || href.startsWith("mailto:");

    nodes.push(
      isExternal ? (
        <a
          key={`${keyPrefix}-link-${match.index}`}
          href={href}
          {...(href.startsWith("http")
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
          className={linkClass}
        >
          {renderFormatted(label, `${keyPrefix}-link-label-${match.index}`)}
        </a>
      ) : (
        <Link key={`${keyPrefix}-link-${match.index}`} href={href} className={linkClass}>
          {renderFormatted(label, `${keyPrefix}-link-label-${match.index}`)}
        </Link>
      ),
    );

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    nodes.push(...renderFormatted(text.slice(lastIndex), `${keyPrefix}-tail`));
  }

  return nodes;
}

function parseTableRow(line: string) {
  return line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => cell.trim());
}

function isTableSeparator(line: string) {
  return /^\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?$/.test(line.trim());
}

function parseMarkdown(markdown: string): Block[] {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const blocks: Block[] = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index].trim();

    if (!line) {
      index += 1;
      continue;
    }

    if (/^-{3,}$/.test(line)) {
      blocks.push({ type: "rule" });
      index += 1;
      continue;
    }

    const headingMatch = /^(#{1,6})\s+(.+?)(?:\s+\{#([^}]+)\})?$/.exec(line);
    if (headingMatch) {
      const text = stripFormatting(headingMatch[2]);
      blocks.push({
        type: "heading",
        level: headingMatch[1].length,
        text,
        /* An explicit {#anchor} in the source wins, because other documents
           already link to it; otherwise the heading slugs itself so in-page
           links keep working. */
        id: headingMatch[3] ?? slugify(text),
      });
      index += 1;
      continue;
    }

    if (
      line.includes("|") &&
      lines[index + 1] &&
      isTableSeparator(lines[index + 1])
    ) {
      const headers = parseTableRow(line);
      const rows: string[][] = [];
      index += 2;

      while (index < lines.length && lines[index].trim().includes("|")) {
        rows.push(parseTableRow(lines[index]));
        index += 1;
      }

      blocks.push({ type: "table", headers, rows });
      continue;
    }

    if (/^[*-]\s+/.test(line)) {
      const items: string[] = [];

      while (index < lines.length && /^[*-]\s+/.test(lines[index].trim())) {
        items.push(lines[index].trim().replace(/^[*-]\s+/, ""));
        index += 1;
      }

      blocks.push({ type: "unordered-list", items });
      continue;
    }

    if (/^\d+\.\s+/.test(line)) {
      const items: string[] = [];

      while (index < lines.length && /^\d+\.\s+/.test(lines[index].trim())) {
        items.push(lines[index].trim().replace(/^\d+\.\s+/, ""));
        index += 1;
      }

      blocks.push({ type: "ordered-list", items });
      continue;
    }

    const paragraphLines = [line];
    index += 1;

    while (
      index < lines.length &&
      lines[index].trim() &&
      !/^-{3,}$/.test(lines[index].trim()) &&
      !/^(#{1,6})\s+/.test(lines[index].trim()) &&
      !/^[*-]\s+/.test(lines[index].trim()) &&
      !/^\d+\.\s+/.test(lines[index].trim()) &&
      !(lines[index].trim().includes("|") && lines[index + 1] && isTableSeparator(lines[index + 1]))
    ) {
      paragraphLines.push(lines[index].trim());
      index += 1;
    }

    blocks.push({ type: "paragraph", text: paragraphLines.join(" ") });
  }

  return blocks;
}

/* Three depths of turn, so a document with Parts and a document without them
   both start at the same weight. Depth is measured from the shallowest heading
   left in the file, not from the hash count. */
const headingStyles = [
  {
    Tag: "h2" as const,
    className:
      "mt-14 border-t border-navy/14 pt-7 font-serif text-heading-sm text-navy first:mt-0",
  },
  { Tag: "h3" as const, className: "mt-11 font-serif text-title text-navy" },
  { Tag: "h4" as const, className: "mt-9 font-serif text-title-sm text-navy" },
  {
    Tag: "h5" as const,
    className: "mt-8 font-serif text-title-sm text-navy/85",
  },
];

export default function MarkdownDocument({ markdown }: { markdown: string }) {
  const parsed = parseMarkdown(markdown);

  /* The page prints the document's title in its own h1. Carrying the file's
     H1 through as well would give the page two, so the leading one is
     dropped; a later H1 (the Code of Conduct's two Parts) is structure and
     stays. */
  const blocks =
    parsed[0]?.type === "heading" && parsed[0].level === 1
      ? parsed.slice(1)
      : parsed;

  const shallowest = blocks.reduce(
    (level, block) => (block.type === "heading" ? Math.min(level, block.level) : level),
    6,
  );

  return (
    <article className="font-sans text-body text-navy/78">
      {blocks.map((block, index) => {
        if (block.type === "rule") {
          /* Every section in these files ends with a `---` and starts with a
             heading, and the heading already carries its own rule. Only the
             separators that are doing something on their own are drawn. */
          const next = blocks[index + 1];
          if (!next || next.type === "heading") return null;

          return (
            <hr
              key={index}
              className="mt-9 border-0 border-t border-navy/10"
            />
          );
        }

        if (block.type === "heading") {
          const depth = Math.min(
            Math.max(block.level - shallowest, 0),
            headingStyles.length - 1,
          );
          const { Tag, className } = headingStyles[depth];

          return (
            <Tag key={index} id={block.id} className={`scroll-mt-32 ${className}`}>
              {block.text}
            </Tag>
          );
        }

        if (block.type === "paragraph") {
          return (
            <p key={index} className="mt-5">
              {renderInline(block.text, `paragraph-${index}`)}
            </p>
          );
        }

        if (block.type === "unordered-list") {
          return (
            <ul key={index} className="mt-5 flex flex-col gap-3">
              {block.items.map((item, itemIndex) => (
                <li key={itemIndex} className="flex gap-3.5">
                  {/* The landing's list marker: a 1px navy rule on the first
                      line, not a dot and not an orange bullet. */}
                  <span
                    className="mt-[13px] h-px w-3.5 shrink-0 bg-navy/30"
                    aria-hidden="true"
                  />
                  <span className="min-w-0">
                    {renderInline(item, `list-${index}-${itemIndex}`)}
                  </span>
                </li>
              ))}
            </ul>
          );
        }

        if (block.type === "ordered-list") {
          /* The course outline row from design.md: a top hairline per row, the
             numeral in Poppins at orange-ink in a 22px column. Ordering is the
             one place a number carries meaning, so it is the one place the
             orange goes. */
          return (
            <ol key={index} className="mt-6 flex flex-col">
              {block.items.map((item, itemIndex) => (
                <li
                  key={itemIndex}
                  className="flex gap-3 border-t border-navy/10 py-2.5"
                >
                  <span
                    className="w-[22px] shrink-0 font-sans text-[12px] leading-[27px] tabular-nums text-orange-ink"
                    aria-hidden="true"
                  >
                    {itemIndex + 1}
                  </span>
                  <span className="min-w-0">
                    {renderInline(item, `list-${index}-${itemIndex}`)}
                  </span>
                </li>
              ))}
            </ol>
          );
        }

        return (
          <div
            key={index}
            className="mt-7 overflow-x-auto border-t border-navy/14"
          >
            <table className="w-full min-w-[540px] border-collapse text-left">
              <thead>
                <tr className="bg-cream">
                  {block.headers.map((header) => (
                    <th
                      key={header}
                      scope="col"
                      className="border-b border-navy/14 px-4 py-3 align-bottom font-sans text-footnote font-medium text-navy/70"
                    >
                      {renderInline(header, `table-${index}-header-${header}`)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((row, rowIndex) => (
                  <tr key={rowIndex} className="border-b border-navy/10">
                    {row.map((cell, cellIndex) => (
                      <td
                        key={cellIndex}
                        className="px-4 py-3 align-top font-sans text-caption leading-[21px] text-navy/78"
                      >
                        {renderInline(cell, `table-${index}-${rowIndex}-${cellIndex}`)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      })}
    </article>
  );
}
