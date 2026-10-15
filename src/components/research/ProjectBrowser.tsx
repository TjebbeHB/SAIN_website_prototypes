"use client";

import { useMemo, useState } from "react";
import {
  ArrowUpRightIcon,
  CaretDownIcon,
  MagnifyingGlassIcon,
} from "@phosphor-icons/react/dist/ssr";
import {
  PROJECTS_EMAIL,
  projectCategories,
  projects,
  type Project,
  type ProjectCategory,
} from "@/data/projects";
import { RESEARCH_INTEREST_FORM_URL } from "@/data/research";

/* The open projects, findable the way SPAR lists its own: filter by topic
   and place, search across everything, open a card for the detail. The
   difference is the last step, which stays human: "I'm interested" opens the
   Project Hub sign-up form, and the projects team introduces the candidate
   to the supervisor. No accounts, no application system. */

const BASES = ["Amsterdam", "Groningen", "Remote"] as const;

function matches(project: Project, query: string) {
  if (!query) return true;
  const haystack = [
    project.title,
    project.summary,
    ...project.details,
    project.supervisor.name,
    project.supervisor.role,
    project.categories.join(" "),
    project.format ?? "",
    project.lookingFor ?? "",
  ]
    .join(" ")
    .toLowerCase();
  return query
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((word) => haystack.includes(word));
}

function ProjectCard({ project }: { project: Project }) {
  const [open, setOpen] = useState(false);
  const detailsId = `project-${project.id}-details`;
  const hasMore = project.details.length > 0 || project.lookingFor || project.commitment || project.supervisor.links.length > 0;
  return (
    <li className="flex min-w-0">
      <article
        aria-labelledby={`project-${project.id}-title`}
        className="flex w-full flex-col rounded-[10px] border border-navy/12 bg-page p-5 transition-colors hover:border-navy/25 md:p-6"
      >
        <div className="flex flex-wrap gap-1.5">
          {project.categories.map((category) => (
            <span key={category} className="rounded-full bg-navy/[0.06] px-2.5 py-1 text-[12px] leading-4 text-navy/75">
              {category}
            </span>
          ))}
          {project.format && (
            <span className="rounded-full border border-orange/50 px-2.5 py-1 text-[12px] leading-4 text-orange-ink">
              {project.format}
            </span>
          )}
        </div>

        <h3 id={`project-${project.id}-title`} className="mt-4 font-serif text-title-sm text-navy">
          {project.title}
        </h3>
        <p className="mt-2 text-caption text-navy/70">
          <span className="font-medium text-navy">{project.supervisor.name}</span>
          {" · "}
          {project.supervisor.role}
        </p>
        <p className="mt-3 text-[15px] leading-[24px] text-navy/78">{project.summary}</p>

        {open && (
          <div id={detailsId} className="mt-4 flex flex-col gap-3 border-t border-navy/10 pt-4">
            {project.details.map((line) => (
              <p key={line} className="text-[14.5px] leading-[23px] text-navy/74">
                {line}
              </p>
            ))}
            {(project.lookingFor || project.commitment) && (
              <dl className="grid gap-2">
                {project.lookingFor && (
                  <div>
                    <dt className="text-footnote text-navy/60">Looking for</dt>
                    <dd className="text-[14.5px] leading-[22px] text-navy">{project.lookingFor}</dd>
                  </div>
                )}
                {project.commitment && (
                  <div>
                    <dt className="text-footnote text-navy/60">Supervision</dt>
                    <dd className="text-[14.5px] leading-[22px] text-navy">{project.commitment}</dd>
                  </div>
                )}
              </dl>
            )}
            {project.supervisor.links.length > 0 && (
              <ul role="list" className="flex flex-wrap gap-x-4 gap-y-1.5">
                {project.supervisor.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-label text-navy underline decoration-navy/25 underline-offset-4 hover:decoration-navy"
                    >
                      {link.label}
                      <ArrowUpRightIcon size={14} aria-hidden="true" />
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-5">
          {project.open ? (
            <a
              href={RESEARCH_INTEREST_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-accent gap-2 !px-4 !py-2.5 !text-[14px]"
            >
              I&rsquo;m interested
              <ArrowUpRightIcon size={16} aria-hidden="true" />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          ) : (
            <span className="text-caption text-navy/60">Closed for now</span>
          )}
          {hasMore && (
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls={detailsId}
              className="inline-flex min-h-[40px] items-center gap-1.5 text-label text-navy/75 hover:text-navy"
            >
              {open ? "Less" : "Details"}
              <CaretDownIcon size={14} weight="bold" aria-hidden="true" className={open ? "rotate-180 transition-transform" : "transition-transform"} />
            </button>
          )}
        </div>
      </article>
    </li>
  );
}

export default function ProjectBrowser() {
  const [category, setCategory] = useState<ProjectCategory | "All">("All");
  const [base, setBase] = useState<(typeof BASES)[number] | "Anywhere">("Anywhere");
  const [query, setQuery] = useState("");

  const searched = useMemo(
    () => projects.filter((project) => matches(project, query) && (base === "Anywhere" || project.supervisor.base === base)),
    [query, base],
  );
  const shown = searched.filter((project) => category === "All" || project.categories.includes(category));
  const count = (value: ProjectCategory | "All") =>
    value === "All" ? searched.length : searched.filter((project) => project.categories.includes(value)).length;
  const supervisors = new Set(projects.map((project) => project.supervisor.name)).size;

  const chip = (active: boolean) =>
    `inline-flex min-h-[38px] items-center gap-2 rounded-full border px-3.5 text-[14px] transition-colors ${
      active ? "border-navy bg-navy text-on-ink" : "border-navy/18 text-navy/80 hover:border-navy/40 hover:text-navy"
    }`;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <label className="relative block w-full max-w-[460px]">
          <span className="sr-only">Search projects</span>
          <MagnifyingGlassIcon
            size={18}
            aria-hidden="true"
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-navy/50"
          />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by topic, method or supervisor"
            className="h-12 w-full rounded-[8px] border border-navy/18 bg-page pl-10 pr-4 text-[15px] text-navy placeholder:text-navy/45 focus:border-navy/50"
          />
        </label>
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Where the supervisor is based">
          {(["Anywhere", ...BASES] as const).map((value) => (
            <button key={value} type="button" aria-pressed={base === value} onClick={() => setBase(value)} className={chip(base === value)}>
              {value}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by topic">
        {(["All", ...projectCategories] as const).map((value) => (
          <button key={value} type="button" aria-pressed={category === value} onClick={() => setCategory(value)} className={chip(category === value)}>
            {value}
            <span className={`text-[12px] tabular-nums ${category === value ? "text-on-ink/70" : "text-navy/50"}`}>{count(value)}</span>
          </button>
        ))}
      </div>

      <p className="text-caption text-navy/65" aria-live="polite">
        {shown.length} {shown.length === 1 ? "project" : "projects"} from {supervisors} supervisors
        {category !== "All" ? ` in ${category}` : ""}
        {base !== "Anywhere" ? `, ${base === "Remote" ? "supervised remotely" : `based in ${base}`}` : ""}
        {query ? ` matching "${query}"` : ""}
      </p>

      {shown.length > 0 ? (
        <ul role="list" className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {shown.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </ul>
      ) : (
        <div className="rounded-[10px] border border-dashed border-navy/20 p-8 text-center">
          <p className="text-body text-navy/74">No project matches yet.</p>
          <p className="mt-1 text-caption text-navy/60">
            Have your own idea? Email{" "}
            <a href={`mailto:${PROJECTS_EMAIL}?subject=${encodeURIComponent("Project Hub: my own project idea")}`} className="underline decoration-navy/25 underline-offset-4 hover:decoration-navy">
              {PROJECTS_EMAIL}
            </a>
            .
          </p>
        </div>
      )}
    </div>
  );
}
