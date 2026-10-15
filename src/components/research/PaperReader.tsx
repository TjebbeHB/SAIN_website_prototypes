"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  ArrowSquareOutIcon,
  DownloadSimpleIcon,
  MagnifyingGlassMinusIcon,
  MagnifyingGlassPlusIcon,
} from "@phosphor-icons/react/dist/ssr";

/* A paper, read on the page instead of behind a link.

   The browser's own PDF viewer would be one <iframe>, but it brings its own
   grey chrome, and on phones it shows a download button rather than the
   paper. So the pages are drawn with PDF.js: white sheets on the navy band,
   one SAIN toolbar, and a text layer over each sheet so the text can be
   selected, copied and found with the browser's search.

   PDF.js is vendored in public/pdfjs (pdfjs-dist 4.10.38, legacy build) and
   imported at runtime, outside webpack. Next 14's bundler and pdfjs-dist 4 do
   not get along, and only these pages need it. The two paths below are root
   paths so the GitHub Pages build prefixes them like any other public file.

   Only the sheets near the screen hold a canvas. A 24-page paper drawn at
   phone resolution all at once is a few hundred megabytes, which is enough
   for iOS to kill the tab. */

const PDFJS_SRC = "/pdfjs/pdf.min.mjs";
const PDFJS_WORKER_SRC = "/pdfjs/pdf.worker.min.mjs";

/* The sheet's width at 100%: wide enough for a two-column paper to read at
   desk distance, narrow enough to leave the band showing either side. */
const MAX_FIT_WIDTH = 880;
const ZOOM_STEPS = [0.6, 0.75, 0.9, 1, 1.25, 1.5, 1.75, 2, 2.5];

type Viewport = { width: number; height: number; scale: number };
type RenderTask = { promise: Promise<void>; cancel(): void };
type PdfPage = {
  getViewport(options: { scale: number }): Viewport;
  render(options: {
    canvasContext: CanvasRenderingContext2D;
    viewport: Viewport;
    transform?: number[];
  }): RenderTask;
  streamTextContent(): ReadableStream;
};
type PdfDocument = {
  numPages: number;
  getPage(pageNumber: number): Promise<PdfPage>;
  destroy(): Promise<void>;
};
type PdfJs = {
  GlobalWorkerOptions: { workerSrc: string };
  getDocument(src: string): { promise: Promise<PdfDocument>; destroy(): Promise<void> };
  TextLayer: new (options: {
    textContentSource: ReadableStream;
    container: HTMLElement;
    viewport: Viewport;
  }) => { render(): Promise<void>; cancel(): void };
};

let pdfjsPromise: Promise<PdfJs> | null = null;
function loadPdfJs() {
  pdfjsPromise ??= import(/* webpackIgnore: true */ PDFJS_SRC).then((module: PdfJs) => {
    module.GlobalWorkerOptions.workerSrc = PDFJS_WORKER_SRC;
    return module;
  });
  return pdfjsPromise;
}

type PageSize = { width: number; height: number };

function Sheet({
  pdfjs,
  doc,
  pageNumber,
  pageCount,
  size,
  width,
}: {
  pdfjs: PdfJs;
  doc: PdfDocument;
  pageNumber: number;
  pageCount: number;
  size: PageSize;
  width: number;
}) {
  const sheetRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);
  const height = Math.round((width * size.height) / size.width);

  useEffect(() => {
    const sheet = sheetRef.current;
    if (!sheet) return;
    const observer = new IntersectionObserver(
      ([entry]) => setNear(entry.isIntersecting),
      { rootMargin: "150% 0px" },
    );
    observer.observe(sheet);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const text = textRef.current;
    if (!canvas || !text) return;
    if (!near || width === 0) {
      canvas.width = 0;
      canvas.height = 0;
      text.replaceChildren();
      return;
    }

    let cancelled = false;
    let renderTask: RenderTask | null = null;
    let textLayer: { cancel(): void } | null = null;

    doc.getPage(pageNumber).then((page) => {
      if (cancelled) return;
      const viewport = page.getViewport({ scale: width / size.width });
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(viewport.width * ratio);
      canvas.height = Math.floor(viewport.height * ratio);
      const context = canvas.getContext("2d");
      if (!context) return;
      renderTask = page.render({
        canvasContext: context,
        viewport,
        transform: ratio === 1 ? undefined : [ratio, 0, 0, ratio, 0, 0],
      });
      renderTask.promise.catch(() => {});

      text.replaceChildren();
      text.style.setProperty("--scale-factor", String(viewport.scale));
      const layer = new pdfjs.TextLayer({
        textContentSource: page.streamTextContent(),
        container: text,
        viewport,
      });
      textLayer = layer;
      layer.render().catch(() => {});
    });

    return () => {
      cancelled = true;
      renderTask?.cancel();
      textLayer?.cancel();
    };
  }, [near, width, doc, pdfjs, pageNumber, size.width]);

  return (
    <div
      ref={sheetRef}
      data-page={pageNumber}
      role="group"
      aria-label={`Page ${pageNumber} of ${pageCount}`}
      className="relative shrink-0 bg-white shadow-[0_1px_2px_rgb(0_0_0/0.25),0_12px_32px_-12px_rgb(0_0_0/0.5)]"
      style={{ width, height }}
    >
      <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 h-full w-full" />
      <div ref={textRef} className="textLayer" />
    </div>
  );
}

export default function PaperReader({ src, title }: { src: string; title: string }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [pdfjs, setPdfjs] = useState<PdfJs | null>(null);
  const [doc, setDoc] = useState<PdfDocument | null>(null);
  const [sizes, setSizes] = useState<PageSize[]>([]);
  const [failed, setFailed] = useState(false);
  const [fitWidth, setFitWidth] = useState(0);
  const [zoomIndex, setZoomIndex] = useState(ZOOM_STEPS.indexOf(1));
  const [current, setCurrent] = useState(1);

  /* Open the document and read every page's size up front, so the column has
     its full height before a single page is drawn and the scrollbar does not
     jump as the reader goes. */
  useEffect(() => {
    let cancelled = false;
    let loaded: PdfDocument | null = null;
    loadPdfJs()
      .then(async (module) => {
        const pdf = await module.getDocument(src).promise;
        loaded = pdf;
        const pages = await Promise.all(
          Array.from({ length: pdf.numPages }, (_, i) =>
            pdf.getPage(i + 1).then((page) => {
              const { width, height } = page.getViewport({ scale: 1 });
              return { width, height };
            }),
          ),
        );
        if (cancelled) return;
        setPdfjs(() => module);
        setDoc(pdf);
        setSizes(pages);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });
    return () => {
      cancelled = true;
      loaded?.destroy();
    };
  }, [src]);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const measure = () => setFitWidth(Math.min(scroller.clientWidth, MAX_FIT_WIDTH));
    measure();
    const observer = new ResizeObserver(() => {
      clearTimeout(timer);
      timer = setTimeout(measure, 120);
    });
    observer.observe(scroller);
    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  /* The page number is whichever sheet crosses the middle of the screen. */
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller || sizes.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setCurrent(Number((entry.target as HTMLElement).dataset.page));
        }
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    scroller.querySelectorAll("[data-page]").forEach((sheet) => observer.observe(sheet));
    return () => observer.disconnect();
  }, [sizes.length]);

  const zoom = ZOOM_STEPS[zoomIndex];
  const width = Math.round(fitWidth * zoom);
  const ready = pdfjs && doc && sizes.length > 0;

  /* Zooming changes every sheet's height, so the same scroll offset would land
     on another page. Remember how far into the current sheet the middle of the
     screen was, and put it back there once the sheets have their new size. */
  const anchorRef = useRef<{ page: number; fraction: number } | null>(null);
  function zoomTo(index: number) {
    const sheet = scrollerRef.current?.querySelector<HTMLElement>(`[data-page="${current}"]`);
    if (sheet) {
      const rect = sheet.getBoundingClientRect();
      anchorRef.current = {
        page: current,
        fraction: (window.innerHeight / 2 - rect.top) / rect.height,
      };
    }
    setZoomIndex(index);
  }
  useLayoutEffect(() => {
    const anchor = anchorRef.current;
    anchorRef.current = null;
    if (!anchor) return;
    const sheet = scrollerRef.current?.querySelector<HTMLElement>(`[data-page="${anchor.page}"]`);
    if (!sheet) return;
    const rect = sheet.getBoundingClientRect();
    /* Instant: the site scrolls smoothly by default, and a zoom that glides
       back to the reader's place reads as the page running away. */
    window.scrollBy({
      top: rect.top + anchor.fraction * rect.height - window.innerHeight / 2,
      behavior: "instant",
    });
  }, [width]);

  const toolButton =
    "inline-flex h-9 min-w-9 items-center justify-center gap-1.5 rounded-[6px] px-2 text-white/80 transition-colors hover:bg-white/10 hover:text-white focus-visible:bg-white/10 focus-visible:text-white disabled:pointer-events-none disabled:opacity-35";

  return (
    <div className="flex flex-col">
      {/* Sticky under the site's 74px navbar. Outside the sideways scroller,
          because a sticky element inside an overflow box sticks to the box. */}
      <div
        role="toolbar"
        aria-label="Paper reader"
        className="sticky top-[74px] z-20 flex items-center justify-between gap-3 border border-white/10 bg-[#03173d]/90 px-2 py-1.5 backdrop-blur-md sm:px-3"
      >
        <p className="min-w-0 truncate pl-1 font-sans text-footnote text-white/70">
          <span className="hidden font-serif text-kicker-sm text-white sm:inline">{title}</span>
          <span className="hidden text-white/30 sm:inline" aria-hidden="true">
            {"  ·  "}
          </span>
          {ready ? (
            <span className="tabular-nums">
              <span className="sm:hidden">
                {current} / {sizes.length}
              </span>
              <span className="hidden sm:inline">
                Page {current} of {sizes.length}
              </span>
            </span>
          ) : (
            <span>Loading…</span>
          )}
        </p>
        <div className="flex shrink-0 items-center gap-0.5">
          <button
            type="button"
            className={toolButton}
            onClick={() => zoomTo(Math.max(0, zoomIndex - 1))}
            disabled={!ready || zoomIndex === 0}
            aria-label="Zoom out"
          >
            <MagnifyingGlassMinusIcon size={18} aria-hidden="true" />
          </button>
          <button
            type="button"
            className={`${toolButton} w-[52px] font-sans text-footnote tabular-nums`}
            onClick={() => zoomTo(ZOOM_STEPS.indexOf(1))}
            disabled={!ready}
            aria-label={`Zoom ${Math.round(zoom * 100)} percent, reset to fit`}
          >
            {Math.round(zoom * 100)}%
          </button>
          <button
            type="button"
            className={toolButton}
            onClick={() => zoomTo(Math.min(ZOOM_STEPS.length - 1, zoomIndex + 1))}
            disabled={!ready || zoomIndex === ZOOM_STEPS.length - 1}
            aria-label="Zoom in"
          >
            <MagnifyingGlassPlusIcon size={18} aria-hidden="true" />
          </button>
          <span className="mx-1.5 h-5 w-px bg-white/15" aria-hidden="true" />
          <a href={src} download className={toolButton} aria-label="Download PDF">
            <DownloadSimpleIcon size={18} aria-hidden="true" />
            <span className="hidden font-sans text-footnote sm:inline">PDF</span>
          </a>
          <a
            href={src}
            target="_blank"
            rel="noopener noreferrer"
            className={toolButton}
            aria-label="Open the PDF in a new tab"
          >
            <ArrowSquareOutIcon size={18} aria-hidden="true" />
          </a>
        </div>
      </div>

      <div ref={scrollerRef} className="overflow-x-auto">
        <div className="mx-auto flex w-max min-w-full flex-col items-center gap-5 py-8 md:gap-7 md:py-10">
          {failed ? (
            <div className="flex max-w-[520px] flex-col items-center gap-4 py-16 text-center">
              <p className="text-body text-white/80">
                The reader could not open this paper here.
              </p>
              <a href={src} download className="btn-accent gap-2">
                Download the PDF
                <DownloadSimpleIcon size={16} aria-hidden="true" />
              </a>
            </div>
          ) : ready ? (
            sizes.map((size, i) => (
              <Sheet
                key={i}
                pdfjs={pdfjs}
                doc={doc}
                pageNumber={i + 1}
                pageCount={sizes.length}
                size={size}
                width={width}
              />
            ))
          ) : (
            /* Two blank sheets while the PDF downloads, so the band already
               reads as a document; the bigger papers take a few seconds. */
            [0, 1].map((i) => (
              <div
                key={i}
                className="flex shrink-0 items-center justify-center bg-white/[0.08] motion-safe:animate-pulse"
                style={{ width: fitWidth || "100%", aspectRatio: "8.5 / 11" }}
              >
                {i === 0 ? (
                  <p className="font-sans text-footnote text-white/60">Loading the paper…</p>
                ) : null}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
