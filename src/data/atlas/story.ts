import { NETWORK_ID } from "@/data/atlas/ecosystem";

/* The story the homepage atlas tells on its own, once, then hands over to the
   reader: where SAIN's money and its curricula come from, then the
   Netherlands, where the work happens.

   Same rules as ecosystem.ts. A player is pinned only where its city is
   established (`coordinates: null` keeps it on the card and off the globe),
   and every line names its source. Copy follows design/design.md: British
   spelling, sentence case, no em dashes. */

export type StoryPlayer = {
  id: string;
  name: string;
  place: string;
  /** [longitude, latitude] of the city, or null when no single base is mapped. */
  coordinates: [number, number] | null;
  /** What it does in SAIN's story, in a few words. */
  role: string;
  /** The node on the Netherlands map its arc lands on. */
  to: string;
  kind: "funding" | "curriculum";
  href: string;
  source: string;
};

export const storyPlayers: StoryPlayer[] = [
  {
    id: "coefficient-giving",
    name: "Coefficient Giving",
    place: "San Francisco",
    coordinates: [-122.41942, 37.77493],
    role: "Funds Safe AI Netherlands",
    to: NETWORK_ID,
    kind: "funding",
    href: "https://coefficientgiving.org/",
    source:
      "SAIN's own funding records. Link the funder's public grant entry here once it is listed.",
  },
  {
    id: "beri",
    name: "BERI",
    place: "United States",
    coordinates: null,
    role: "Funds the work of SAIN Utrecht",
    to: "sain-utrecht",
    kind: "funding",
    href: "https://existence.org/",
    source: "/chapters/utrecht (funded by BERI, with mentorship from Pathfinder)",
  },
  {
    id: "cais",
    name: "Center for AI Safety",
    place: "San Francisco",
    coordinates: [-122.41942, 37.77493],
    role: "Its course is taught by SAIN Groningen",
    to: "sain-groningen",
    kind: "curriculum",
    href: "https://www.safe.ai/",
    source: "/chapters/groningen (AI Safety, Ethics, and Society)",
  },
  {
    id: "bluedot",
    name: "BlueDot Impact",
    place: "London",
    coordinates: [-0.12574, 51.50853],
    role: "SAIN Amsterdam facilitates its courses",
    to: "sain-amsterdam",
    kind: "curriculum",
    href: "https://bluedot.org/",
    source: "/chapters/amsterdam (Technical AI Safety, Frontier AI Governance)",
  },
  {
    id: "arena",
    name: "ARENA",
    place: "London",
    coordinates: [-0.12574, 51.50853],
    role: "SAIN Utrecht teaches its technical curriculum",
    to: "sain-utrecht",
    kind: "curriculum",
    href: "https://www.arena.education/",
    source: "/chapters/utrecht (Technical AI safety, ARENA)",
  },
];

export type Camera = { center: [number, number]; zoom: number };

export type GlobeStep = {
  view: "globe";
  id: string;
  /** The progress rail's name for the step. */
  label: string;
  eyebrow: string;
  title: string;
  body: string;
  camera: Camera;
  players: string[];
  hold: number;
};

export type MapStep = {
  view: "netherlands";
  id: string;
  label: string;
  eyebrow: string;
  title: string;
  body: string;
  /** What the map has drawn by the end of this step. */
  reveal: "origin" | "chapters" | "partners" | "future";
  hold: number;
};

export type StoryStep = GlobeStep | MapStep;

export const storySteps: StoryStep[] = [
  {
    view: "globe",
    id: "field",
    label: "The field",
    eyebrow: "The SAIN story",
    title: "AI safety is a global field.",
    body: "Its funders, curricula and labs sit all over the world. SAIN brings that field to students and professionals in the Netherlands.",
    camera: { center: [-38, 34], zoom: 1 },
    players: [],
    hold: 4200,
  },
  {
    view: "globe",
    id: "funding",
    label: "Funding",
    eyebrow: "01 · Funding",
    title: "It starts with funders who back the work.",
    body: "Coefficient Giving funds Safe AI Netherlands. BERI funds the work of SAIN Utrecht.",
    camera: { center: [-98, 44], zoom: 1.28 },
    players: ["coefficient-giving", "beri"],
    hold: 5600,
  },
  {
    view: "globe",
    id: "curricula",
    label: "Curricula",
    eyebrow: "02 · Curricula",
    title: "We teach the field's own curricula.",
    body: "Every chapter teaches from an established curriculum: the Center for AI Safety in Groningen, BlueDot Impact in Amsterdam, ARENA in Utrecht.",
    camera: { center: [-26, 50], zoom: 1.42 },
    players: ["cais", "bluedot", "arena"],
    hold: 6000,
  },
  {
    view: "netherlands",
    id: "origin",
    label: "Groningen",
    eyebrow: "03 · The Netherlands",
    title: "It began in Groningen, in 2023.",
    body: "The AI Safety Initiative Groningen started as a student-led group teaching AI safety.",
    reveal: "origin",
    hold: 4200,
  },
  {
    view: "netherlands",
    id: "chapters",
    label: "Chapters",
    eyebrow: "2026 · One foundation",
    title: "Three chapters, one national foundation.",
    body: "Groningen, Amsterdam and Utrecht share one infrastructure. Every programme is free.",
    reveal: "chapters",
    hold: 4600,
  },
  {
    view: "netherlands",
    id: "partners",
    label: "Around us",
    eyebrow: "The network",
    title: "The organisations around the chapters.",
    body: "Orange lines are working relationships. Dotted lines are people in common, such as supervisors and advisors.",
    reveal: "partners",
    hold: 5200,
  },
  {
    view: "netherlands",
    id: "next",
    label: "Next",
    eyebrow: "July 2027 · What comes next",
    title: "Three new chapters, and the institutions around them.",
    body: "SAIN's targets: three new local chapters, 250+ course graduates a year and 25+ supervised research projects. Dashed lines are partnerships it is working toward.",
    reveal: "future",
    hold: 5600,
  },
];
