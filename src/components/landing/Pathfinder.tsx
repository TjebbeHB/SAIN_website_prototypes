"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpRightIcon,
  XIcon,
} from "@phosphor-icons/react/dist/ssr";
import { PATHFINDER_FORM_URL } from "@/data/siteContact";
import { SUPERVISOR_INTEREST_FORM_URL } from "@/data/research";

/* "Find your next step": the hero's one decision. It opens the Airtable form
   SAIN routes people with (PATHFINDER_FORM_URL); until that form exists, it
   asks the form's first question itself and sends each answer to the page
   that already handles it. The three answers are the path the site argues
   for: a course first, then a project, and for researchers, supervising.

   A native <dialog>: focus moves in and is trapped, Escape closes it, and the
   page behind is inert, without a line of focus-management code. */

type Path = {
  id: string;
  situation: string;
  title: string;
  body: string;
  cta: string;
  href: string;
  external?: boolean;
};

const paths: Path[] = [
  {
    id: "course",
    situation: "I am new to AI safety, or not sure where to start.",
    title: "Start with a free course",
    body: "Pick a track. Every programme is free and taught in person, in a small group, and no background in AI is needed.",
    cta: "See the courses",
    href: "/courses",
  },
  {
    id: "project",
    situation: "I have done a course and want to work on something real.",
    title: "Choose a research project",
    body: "Join a project or bring your own question, including a thesis. The Project Hub matches you with a supervisor and helps with compute.",
    cta: "Visit the Project hub",
    href: "/research",
  },
  {
    id: "supervise",
    situation: "I am an experienced researcher.",
    title: "Become a supervisor",
    body: "Guide an emerging researcher through a focused AI Safety project, at a commitment you set per project.",
    cta: "Become a supervisor",
    href: SUPERVISOR_INTEREST_FORM_URL,
    external: true,
  },
];

/* Airtable serves a form for embedding at /embed/…; a share link is the same
   path without it. */
function embedUrl(url: string) {
  return url.includes("/embed/") ? url : url.replace("airtable.com/", "airtable.com/embed/");
}

export default function Pathfinder({ className = "" }: { className?: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [choice, setChoice] = useState<Path | null>(null);
  const form = PATHFINDER_FORM_URL.trim();

  useEffect(() => {
    const element = dialog.current;
    if (!element) return;
    const onClose = () => setChoice(null);
    element.addEventListener("close", onClose);
    return () => element.removeEventListener("close", onClose);
  }, []);

  const open = () => dialog.current?.showModal();
  const close = () => dialog.current?.close();

  return (
    <>
      <button type="button" onClick={open} className={`btn-accent group gap-5 ${className}`}>
        Find your next step
        <ArrowRightIcon
          size={22}
          weight="regular"
          aria-hidden="true"
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      </button>

      <dialog
        ref={dialog}
        aria-labelledby="pathfinder-title"
        className="pathfinder m-auto w-[min(640px,calc(100vw-2rem))] max-h-[calc(100dvh-2rem)] overflow-hidden rounded-[14px] border border-navy/12 bg-page p-0 text-navy shadow-[0_24px_80px_rgb(1_12_36/45%)] backdrop:bg-inverse/60 backdrop:backdrop-blur-sm"
        onClick={(event) => {
          /* A click on the backdrop lands on the dialog element itself. */
          if (event.target === event.currentTarget) close();
        }}
      >
        <div className="flex max-h-[calc(100dvh-2rem)] flex-col">
          <div className="flex items-start justify-between gap-4 border-b border-navy/10 px-6 pb-4 pt-5 md:px-8">
            <div>
              <p className="eyebrow">Your next step</p>
              <h2 id="pathfinder-title" className="mt-2 font-serif text-heading-sm text-navy">
                {choice ? choice.title : "Where are you right now?"}
              </h2>
            </div>
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="-mr-2 grid size-10 shrink-0 place-items-center rounded-[4px] text-navy/70 hover:bg-navy/5 hover:text-navy"
            >
              <XIcon size={20} aria-hidden="true" />
            </button>
          </div>

          {form ? (
            <div className="min-h-0 flex-1 overflow-y-auto">
              <iframe
                src={embedUrl(form)}
                title="Find your next step with SAIN"
                className="block h-[min(620px,70dvh)] w-full border-0 bg-transparent"
                loading="lazy"
              />
              <p className="border-t border-navy/10 px-6 py-3 text-caption text-navy/65 md:px-8">
                Trouble with the form?{" "}
                <a href={form} target="_blank" rel="noopener noreferrer" className="underline decoration-navy/25 underline-offset-4 hover:decoration-navy">
                  Open it in a new tab
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
                .
              </p>
            </div>
          ) : choice ? (
            <div className="overflow-y-auto px-6 pb-7 pt-5 md:px-8">
              <p className="text-body text-navy/74">{choice.body}</p>
              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-4">
                {choice.external ? (
                  <a href={choice.href} target="_blank" rel="noopener noreferrer" className="btn-accent gap-2.5">
                    {choice.cta}
                    <ArrowUpRightIcon size={16} aria-hidden="true" />
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                ) : (
                  <Link href={choice.href} onClick={close} className="btn-accent gap-2.5">
                    {choice.cta}
                    <ArrowRightIcon size={16} aria-hidden="true" />
                  </Link>
                )}
                <button
                  type="button"
                  onClick={() => setChoice(null)}
                  className="inline-flex items-center gap-2 text-label text-navy/72 underline decoration-navy/25 underline-offset-4 hover:text-navy hover:decoration-navy"
                >
                  <ArrowLeftIcon size={16} aria-hidden="true" />
                  Choose again
                </button>
              </div>
            </div>
          ) : (
            <ul role="list" className="grid gap-3 overflow-y-auto px-6 pb-7 pt-5 md:px-8">
              {paths.map((path, i) => (
                <li key={path.id}>
                  <button
                    type="button"
                    onClick={() => setChoice(path)}
                    className="group flex w-full items-center gap-4 rounded-[8px] border border-navy/14 px-4 py-4 text-left transition-colors hover:border-orange hover:bg-orange/5 focus-visible:border-orange md:px-5"
                  >
                    <span className="font-serif text-[22px] font-bold tabular-nums text-orange-ink">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[15.5px] font-medium leading-[22px] text-navy">{path.situation}</span>
                      <span className="mt-0.5 block text-caption text-navy/65">{path.title}</span>
                    </span>
                    <ArrowRightIcon
                      size={18}
                      aria-hidden="true"
                      className="shrink-0 text-navy/40 transition-all group-hover:translate-x-0.5 group-hover:text-orange-ink"
                    />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </dialog>
    </>
  );
}
