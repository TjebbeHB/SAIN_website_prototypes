import type { ChapterName } from "@/data/courseApplications";

/* The three course tracks the landing offers, read by the landing's
   CourseTracks. Each track's per-city routes resolve through
   courseApplications, so they cannot drift from the chapter pages. */

export type Track = {
  id: string;
  index: string;
  title: string;
  tagline: string;
  summary: string;
  outlineTitle: string;
  outline: string[];
  /* Typed as the chapter name rather than a loose string, so each row can
     resolve its own route out of courseApplications instead of carrying a
     second copy of it here. */
  cities: { city: ChapterName; detail: string }[];
  photo: string;
  /** Rungs on disk for `photo`. See scripts/generate-responsive-images.mjs. */
  photoWidths: number[];
  photoAlt: string;
  caption: string;
};

export const TRACKS: Track[] = [
  {
    id: "fundamentals",
    index: "01",
    title: "AI Safety Fundamentals",
    tagline: "First principles. Drop in any week.",
    summary:
      "A weekly series on risks, technical safety and governance, taught so newcomers can drop in. Three editions in Utrecht have reached more than 100 students, researchers, engineers and public-sector people.",
    outlineTitle: "Weekly themes",
    outline: [
      "Introduction: capabilities, risks, and solution families",
      "Risks and incidents: social harms, misuse, loss of control",
      "Technical AI Safety: oversight, evaluations, interpretability",
      "Regulation and governance: EU AI Act, audits, GPAI duties",
      "Why safety is hard: incentives, funding gaps, race dynamics",
      "Pathways: thesis, fellowship, then a full-time role",
    ],
    cities: [
      {
        city: "Utrecht",
        detail: "Weekly, modular. Drop in for any theme. ~60 min.",
      },
    ],
    photo: "/landing/course-fundamentals.jpg",
    photoWidths: [640, 960, 1280, 1920],
    photoAlt: "SAIN Utrecht cohort at graduation",
    caption: "Cohort graduation · SAIN Utrecht",
  },
  {
    id: "technical",
    index: "02",
    title: "Technical Alignment",
    tagline: "ARENA, CAIS or BlueDot, by city.",
    summary:
      "Each chapter runs a technical track, with a different curriculum. Utrecht teaches from ARENA. Groningen uses the Center for AI Safety course. Amsterdam uses BlueDot.",
    outlineTitle: "Utrecht ARENA",
    outline: [
      "Transformers and mechanistic interpretability",
      "Probing and representations: linear probes, SAEs",
      "PPO and RLHF: the alignment pipeline",
      "GRPO and reward hacking: seeing failure modes",
    ],
    cities: [
      {
        city: "Utrecht",
        detail: "ARENA. 4 weeks. Streamed lectures; notebook certificate.",
      },
      {
        city: "Groningen",
        detail:
          "Technical track of AI Safety, Ethics, and Society. 6 weeks, 3 to 4 cohorts a year.",
      },
      {
        city: "Amsterdam",
        detail:
          "BlueDot Technical AI Safety. 6 weeks, on-site, application-based.",
      },
    ],
    photo: "/landing/course-technical.jpg",
    /* The source is 1024 wide, so the ladder stops at 960. */
    photoWidths: [640, 960],
    photoAlt:
      "Six technical track graduates standing beside the SAIN Amsterdam banner",
    caption: "Technical AI Safety graduation · SAIN Amsterdam",
  },
  {
    id: "policy",
    index: "03",
    title: "Governance & Policy",
    tagline: "Course or discussion group, by city.",
    summary:
      "Amsterdam runs BlueDot Frontier AI Governance. Groningen runs the governance track of AI Safety, Ethics, and Society. Utrecht hosts a weekly AI Governance & Policy discussion group. Facilitators include researchers, risk consultants, and public-sector people.",
    outlineTitle: "Six-week courses (Groningen and Amsterdam)",
    outline: [
      "The EU AI Act: duties across the lifecycle",
      "Dutch implementation: ministries, regulators, standards",
      "Accountability: audits, evidence, GPAI obligations",
      "Risk management: NIST and frontier evaluation",
      "Case studies: accidents, misuse, institutional lag",
      "Pathways: policy fellowships, ministries, standards bodies",
    ],
    cities: [
      {
        city: "Utrecht",
        detail: "Weekly AI Governance & Policy discussion group.",
      },
      {
        city: "Groningen",
        detail: "Governance track of AI Safety, Ethics, and Society. On-site.",
      },
      {
        city: "Amsterdam",
        detail: "BlueDot Frontier AI Governance. On-site, application-based.",
      },
    ],
    photo: "/landing/course-policy.jpg",
    /* The master is 1920 wide, so the ladder stops at 1280. */
    photoWidths: [640, 960, 1280],
    photoAlt: "Discussion groups talking around tables at SAIN Amsterdam",
    caption: "Discussion group · SAIN Amsterdam",
  },
];
