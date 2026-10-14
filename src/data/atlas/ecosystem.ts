import { ATLAS } from "@/data/chapterAtlas";

/* The Netherlands map in the homepage hero: SAIN's chapters, the organisations
   around them, and the relationships between them.

   Rules for this file, because the map makes claims:

   - Every node and every line names its `source`: a page on this site, the
     organisation's own site, or the SAIN team with a date. If nobody can say
     where a relationship comes from, it does not get a line.
   - Organisations only. A person appears on the map once they have agreed to
     a line about themselves; until then, the organisation they work for does.
   - Points are city anchors from GeoNames (CC BY 4.0), not office addresses.
     Where several organisations share a city, `offset` spreads their markers
     around it in screen pixels and a leader line runs back to the anchor.
   - Two strengths only. `strong` is a working relationship between
     organisations (one supports, hosts or runs something with the other) and
     draws an orange line that flows. `shared` is people in common: a
     supervisor, an advisor, an alumnus. It draws a quiet dotted line, and its
     label says which people, because the chapter pages are explicit that the
     courses are not affiliated with the universities.

   To add an organisation: add a node with a source, then any links with
   sources. Nothing else needs to change. */

export type EcoKind = "chapter" | "university" | "research" | "field" | "network" | "government";

export type EcoNode = {
  id: string;
  name: string;
  /** The label on the map when the name is long. */
  short?: string;
  kind: EcoKind;
  city: string;
  /** [longitude, latitude] of the city anchor. */
  coordinates: [number, number];
  /** Display offset from the anchor in screen pixels, for a shared city. */
  offset?: [number, number];
  /** Which side of the marker its label sits on. */
  labelSide?: "left" | "right" | "above" | "below";
  /** Zoom (relative to the fitted map) from which the name shows without a
     hover. Leaves the overview readable as the map fills up. */
  labelFrom?: number;
  description: string;
  href?: string;
  /** SAIN's own page, when the node is a chapter. */
  chapterHref?: string;
  facts?: { label: string; value: string }[];
  source: string;
};

/* The national foundation has no single office on the map. Links to it land
   on the centre of the three chapters, where the map writes its name. */
export const NETWORK_ID = "sain";

export type EcoLink = {
  from: string;
  /** A node id, or NETWORK_ID for the foundation as a whole. */
  to: string;
  /* `prospective`: a relationship SAIN is working toward. Drawn dashed, and
     only in the story's look ahead: the explorable map is the present. */
  strength: "strong" | "shared" | "prospective";
  label: string;
  source: string;
};

/* Orientation only: muted dots and names so a reader can find their own city.
   GeoNames anchors, as in the chapter list. */
export const referenceCities: { name: string; coordinates: [number, number] }[] = [
  { name: "Rotterdam", coordinates: [4.47917, 51.9225] },
  { name: "Eindhoven", coordinates: [5.47778, 51.44083] },
  { name: "Leeuwarden", coordinates: [5.80973, 53.20271] },
  { name: "Zwolle", coordinates: [6.09444, 52.5125] },
  { name: "Arnhem", coordinates: [5.91111, 51.98] },
  { name: "Nijmegen", coordinates: [5.85278, 51.8425] },
  { name: "Maastricht", coordinates: [5.68889, 50.84833] },
  { name: "Enschede", coordinates: [6.89583, 52.21833] },
  { name: "Tilburg", coordinates: [5.0913, 51.55551] },
  { name: "Breda", coordinates: [4.77596, 51.58656] },
  { name: "Middelburg", coordinates: [3.61389, 51.5] },
  { name: "Lelystad", coordinates: [5.475, 52.50833] },
];

const chapterFacts = (city: string) => ATLAS.find((chapter) => chapter.city === city)?.facts;

export const ecoNodes: EcoNode[] = [
  {
    id: "sain-groningen",
    name: "SAIN Groningen",
    kind: "chapter",
    city: "Groningen",
    coordinates: [6.56667, 53.21917],
    labelSide: "left",
    description:
      "Where SAIN began, in 2023, as the AI Safety Initiative Groningen (AISIG). Free courses, hackathons, and published research.",
    chapterHref: "/chapters/groningen",
    facts: chapterFacts("Groningen"),
    source: "/about (the record); /chapters/groningen",
  },
  {
    id: "sain-utrecht",
    name: "SAIN Utrecht",
    kind: "chapter",
    city: "Utrecht",
    coordinates: [5.12222, 52.09083],
    labelSide: "right",
    description:
      "A free AI safety course, two discussion groups, and a growing research track. Run by volunteers, open to anyone in the city.",
    chapterHref: "/chapters/utrecht",
    facts: chapterFacts("Utrecht"),
    source: "/chapters/utrecht",
  },
  {
    id: "sain-amsterdam",
    name: "SAIN Amsterdam",
    kind: "chapter",
    city: "Amsterdam",
    coordinates: [4.88969, 52.37403],
    labelSide: "right",
    description:
      "Free courses and a weekly discussion group, from BSc students to working professionals. Formerly AI Safety Amsterdam (AISA).",
    chapterHref: "/chapters/amsterdam",
    facts: chapterFacts("Amsterdam"),
    source: "/chapters/amsterdam",
  },
  {
    id: "ellis-amsterdam",
    name: "ELLIS Unit Amsterdam",
    short: "ELLIS Unit Amsterdam",
    kind: "research",
    city: "Amsterdam",
    coordinates: [4.88969, 52.37403],
    offset: [-14, -64],
    labelSide: "above",
    description:
      "The Amsterdam unit of the European Laboratory for Learning and Intelligent Systems. It supports SAIN Amsterdam.",
    href: "https://ellis.eu/units/amsterdam",
    source: "/chapters/amsterdam (Supported by ELLIS Unit Amsterdam)",
  },
  {
    id: "uva",
    name: "University of Amsterdam",
    short: "UvA",
    kind: "university",
    city: "Amsterdam",
    coordinates: [4.88969, 52.37403],
    offset: [-78, -28],
    labelSide: "left",
    description:
      "SAIN Amsterdam draws members from the UvA, and a UvA assistant professor supervises in the SAIN Project Hub. The courses are run independently of the university.",
    href: "https://www.uva.nl/",
    source: "/chapters/amsterdam; src/data/research.ts (supervisors)",
  },
  {
    id: "vu",
    name: "Vrije Universiteit Amsterdam",
    short: "VU Amsterdam",
    kind: "university",
    city: "Amsterdam",
    coordinates: [4.88969, 52.37403],
    offset: [-74, 22],
    labelSide: "left",
    description:
      "SAIN Amsterdam draws members from VU Amsterdam, and a VU PhD researcher supervises in the SAIN Project Hub. VU security researchers also signed the 2026 open letter on containing cyber-capable AI. The courses are run independently of the university.",
    href: "https://vu.nl/",
    source: "/chapters/amsterdam; src/data/research.ts (supervisors)",
  },
  {
    id: "ero",
    name: "Existential Risk Observatory",
    short: "Existential Risk Observatory",
    kind: "field",
    city: "Amsterdam",
    coordinates: [4.88969, 52.37403],
    offset: [58, -52],
    labelSide: "right",
    description:
      "An Amsterdam organisation working on AI risk. A SAIN community member interned there, mapping research on AI alignment techniques and government interventions.",
    href: "https://www.existentialriskobservatory.org/",
    source: "Landing page careers quote (internship, Existential Risk Observatory)",
  },
  {
    id: "uu",
    name: "Utrecht University",
    kind: "university",
    city: "Utrecht",
    coordinates: [5.12222, 52.09083],
    offset: [64, 36],
    labelSide: "right",
    description:
      "SAIN Utrecht's courses run in person at Utrecht University, where the chapter's research track is growing.",
    href: "https://www.uu.nl/",
    source: "/chapters/utrecht (course venue); src/data/chapterAtlas.ts",
  },
  {
    id: "rug",
    name: "University of Groningen",
    kind: "university",
    city: "Groningen",
    coordinates: [6.56667, 53.21917],
    offset: [-10, 54],
    labelSide: "left",
    description:
      "Two University of Groningen researchers supervise in the SAIN Project Hub. SAIN Groningen's course is run independently of the university.",
    href: "https://www.rug.nl/",
    source: "src/data/research.ts (supervisors); /chapters/groningen",
  },
  {
    id: "minbuza",
    name: "Ministry of Foreign Affairs",
    kind: "government",
    city: "The Hague",
    coordinates: [4.29861, 52.07667],
    labelSide: "left",
    description:
      "A Senior Policy Officer for AI at the Dutch Ministry of Foreign Affairs sits on SAIN's advisory board.",
    href: "https://www.government.nl/ministries/ministry-of-foreign-affairs",
    source: "/about (advisory board)",
  },
];

/* Added 14 October 2026 from the SAIN team's list. Same rules: a source for
   every node, and city anchors from GeoNames. */
ecoNodes.push(
  {
    id: "sias",
    name: "Socially Intelligent Artificial Systems (SIAS)",
    short: "SIAS, UvA",
    kind: "research",
    city: "Amsterdam",
    coordinates: [4.88969, 52.37403],
    offset: [-104, -70],
    labelSide: "left",
    labelFrom: 1.4,
    description:
      "A research group at the University of Amsterdam's Informatics Institute working on the unintended effects of AI on people and society.",
    href: "https://www.sias-uva.nl",
    source: "sias-uva.nl; SAIN team, 14 October 2026",
  },
  {
    id: "pauseai-nl",
    name: "PauseAI Netherlands",
    short: "PauseAI NL",
    kind: "field",
    city: "Utrecht",
    coordinates: [5.12222, 52.09083],
    offset: [4, 44],
    labelSide: "below",
    labelFrom: 1.4,
    description:
      "The Dutch chapter of PauseAI, founded in Utrecht in 2023. It campaigns for the Netherlands to use its export licensing of ASML's machines in support of an international pause on superintelligence.",
    href: "https://pauseai.info/asml-pause-button",
    source: "pauseai.info/asml-pause-button",
  },
  {
    id: "rails",
    name: "RAILS, Rotterdam AI Literacy & Safety",
    short: "RAILS Rotterdam",
    kind: "field",
    city: "Rotterdam",
    coordinates: [4.47917, 51.9225],
    offset: [10, 10],
    labelSide: "right",
    labelFrom: 1.4,
    description:
      "A student-run community at Erasmus University Rotterdam, open to anyone in the city: workshops, speaker events and discussion groups on AI and its risks.",
    href: "https://rails010.nl/",
    source: "rails010.nl",
  },
  {
    id: "ellis-delft",
    name: "ELLIS Unit Delft",
    kind: "research",
    city: "Delft",
    coordinates: [4.35556, 52.00667],
    offset: [12, 4],
    labelSide: "right",
    labelFrom: 1.4,
    description:
      "TU Delft's unit of the European Laboratory for Learning and Intelligent Systems. Safe and responsible AI is one of its research themes.",
    href: "https://ellis.eu/units/delft",
    source: "ellis.eu/units/delft",
  },
  {
    id: "algorithm-audit",
    name: "Algorithm Audit",
    kind: "field",
    city: "The Hague",
    coordinates: [4.29861, 52.07667],
    offset: [-52, -34],
    labelSide: "left",
    labelFrom: 1.4,
    description:
      "A Dutch non-profit knowledge platform for responsible algorithms and AI, working with the Ministry of the Interior (BZK) among others.",
    href: "https://algorithmaudit.eu",
    source: "algorithmaudit.eu (partners); SAIN team, 14 October 2026",
  },
  {
    id: "ecp",
    name: "ECP and Platform AI & Overheid",
    short: "ECP · AI & Overheid",
    kind: "network",
    city: "The Hague",
    coordinates: [4.29861, 52.07667],
    offset: [-30, -60],
    labelSide: "left",
    labelFrom: 1.4,
    description:
      "ECP is an independent platform where government, science, business and civil society shape a digital society together. Its Platform AI & Overheid brings public-sector professionals together on AI.",
    href: "https://platformaioverheid.nl/home/events/",
    source: "ecp.nl; platformaioverheid.nl",
  },
  {
    id: "jenv",
    name: "Ministry of Justice and Security",
    short: "Ministry of Justice and Security",
    kind: "government",
    city: "The Hague",
    coordinates: [4.29861, 52.07667],
    offset: [-52, 22],
    labelSide: "left",
    labelFrom: 1.4,
    description: "The Dutch Ministry of Justice and Security (JenV).",
    href: "https://www.government.nl/ministries/ministry-of-justice-and-security",
    source: "SAIN team, 14 October 2026",
  },
  {
    id: "vng",
    name: "VNG, Association of Netherlands Municipalities",
    short: "VNG",
    kind: "government",
    city: "The Hague",
    coordinates: [4.29861, 52.07667],
    offset: [-28, 46],
    labelSide: "left",
    labelFrom: 1.4,
    description:
      "The association of Dutch municipalities. It publishes GEM, a virtual assistant municipalities built on their own data, as a good practice in public-sector AI.",
    href: "https://vng.nl/artikelen/virtuele-assistent-gem",
    source: "vng.nl/artikelen/virtuele-assistent-gem",
  },
);

ecoNodes.push({
  id: "radboud",
  name: "Radboud University",
  short: "Radboud University",
  kind: "university",
  city: "Nijmegen",
  coordinates: [5.85278, 51.8425],
  offset: [10, 8],
  labelSide: "right",
  labelFrom: 1.4,
  description:
    "Researchers at Radboud, including its iHub, work on AI security and regulation; several signed the 2026 open letter calling for containment standards for cyber-capable AI.",
  href: "https://www.ru.nl/",
  source: "ai-security-letter.org (signatory affiliations)",
});

/* The Ministry of Foreign Affairs moves into the fan of The Hague markers. */
const foreignAffairs = ecoNodes.find((node) => node.id === "minbuza");
if (foreignAffairs) {
  foreignAffairs.offset = [-62, -6];
  foreignAffairs.labelFrom = 1.4;
}

/* Outside the Netherlands map. Each sits at the map's edge, in the direction
   of its city, with an arrow pointing the rest of the way. `coordinates: null`
   is an organisation with no single base (an online programme): those are
   listed together under "Online". */
export type AbroadNode = Omit<EcoNode, "coordinates" | "offset" | "labelSide" | "labelFrom"> & {
  coordinates: [number, number] | null;
};

export const abroadNodes: AbroadNode[] = [
  {
    id: "apart",
    name: "Apart Research",
    kind: "field",
    city: "Denver",
    coordinates: [-104.9847, 39.73915],
    description:
      "An AI safety research organisation that runs research sprints, evaluations and talent programmes. AISIG hosted hackathons with Apart Research, and members published through them.",
    href: "https://apartresearch.com/research",
    source: "/about (2024: hackathons with Apart Research); apartresearch.com",
  },
  {
    id: "lawai",
    name: "Institute for Law & AI",
    short: "LawAI",
    kind: "research",
    city: "Cambridge, UK",
    coordinates: [0.11667, 52.2],
    description: "A research institute on law and AI governance, with an office in Cambridge, UK.",
    href: "https://law-ai.org",
    source: "law-ai.org (careers: Cambridge, UK office)",
  },
  {
    id: "cambridge-commentary",
    name: "Cambridge Commentary on EU General-Purpose AI Law",
    short: "Cambridge Commentary",
    kind: "research",
    city: "Cambridge, UK",
    coordinates: [0.11667, 52.2],
    description:
      "Running commentary on the general-purpose AI provisions of the EU AI Act, by the Cambridge Programme on AI Science & Policy and the Institute for Law & AI.",
    href: "https://cambridge-commentary.ai",
    source: "cambridge-commentary.ai",
  },
  {
    id: "mistral",
    name: "Mistral AI",
    kind: "field",
    city: "Paris",
    coordinates: [2.3488, 48.85341],
    description: "A French developer of frontier AI models, based in Paris.",
    href: "https://mistral.ai",
    source: "mistral.ai",
  },
  /* From SAIN's own pages: where its advisory board and supervisors work.
     A general mention only; the people are named on /about and /research. */
  {
    id: "apollo",
    name: "Apollo Research",
    kind: "field",
    city: "London",
    coordinates: [-0.12574, 51.50853],
    description:
      "An AI safety organisation evaluating frontier models for deceptive behaviour. A member of SAIN's advisory board is a research scientist here.",
    href: "https://www.apolloresearch.ai/",
    source: "/about (advisory board)",
  },
  {
    id: "pivotal",
    name: "Pivotal Research",
    short: "Pivotal",
    kind: "field",
    city: "London",
    coordinates: [-0.12574, 51.50853],
    description:
      "A London non-profit running paid, mentored research fellowships in AI safety, AI policy and biosecurity: a possible next step for SAIN members.",
    href: "https://pivotal-research.org",
    source: "pivotal-research.org",
  },
  {
    id: "oxford",
    name: "University of Oxford",
    kind: "university",
    city: "Oxford",
    coordinates: [-1.25596, 51.75222],
    description: "People here work on AI safety research; a member of SAIN's advisory board is a postdoctoral fellow at Oxford.",
    href: "https://www.ox.ac.uk/",
    source: "/about (advisory board)",
  },
  {
    id: "cesia",
    name: "CeSIA, Centre pour la Sécurité de l'IA",
    short: "CeSIA",
    kind: "field",
    city: "Paris",
    coordinates: [2.3488, 48.85341],
    description: "The French centre for AI safety. Its executive director sits on SAIN's advisory board.",
    href: "https://cesiafr.substack.com/",
    source: "/about (advisory board)",
  },
  {
    id: "ceps",
    name: "CEPS, Centre for European Policy Studies",
    short: "CEPS",
    kind: "research",
    city: "Brussels",
    coordinates: [4.34878, 50.85045],
    description: "A Brussels think tank on EU policy, including AI. A member of SAIN's advisory board works here as a data scientist.",
    href: "https://www.ceps.eu/",
    source: "/about (advisory board)",
  },
  {
    id: "pik",
    name: "Potsdam Institute for Climate Impact Research",
    short: "Potsdam Institute",
    kind: "research",
    city: "Potsdam",
    coordinates: [13.06566, 52.39886],
    description: "A senior scientist here supervises in the SAIN Project Hub.",
    href: "https://www.pik-potsdam.de/",
    source: "src/data/research.ts (supervisors)",
  },
  {
    id: "spar",
    name: "SPAR, run by Kairos",
    short: "SPAR (Kairos)",
    kind: "field",
    city: "Online",
    coordinates: null,
    description:
      "A part-time, remote research fellowship pairing aspiring AI safety and policy researchers with professionals. Fully online, open to applicants worldwide.",
    href: "https://sparai.org/",
    source: "sparai.org; SAIN team, 14 October 2026",
  },
];

export const ecoLinks: EcoLink[] = [
  /* One national foundation, three chapters, one shared infrastructure. */
  {
    from: "sain-groningen",
    to: "sain-utrecht",
    strength: "strong",
    label: "One national foundation",
    source: "/about (2026: Safe AI Netherlands)",
  },
  {
    from: "sain-groningen",
    to: "sain-amsterdam",
    strength: "strong",
    label: "One national foundation",
    source: "/about (2026: Safe AI Netherlands)",
  },
  {
    from: "sain-utrecht",
    to: "sain-amsterdam",
    strength: "strong",
    label: "One national foundation",
    source: "/about (2026: Safe AI Netherlands)",
  },
  {
    from: "ellis-amsterdam",
    to: "sain-amsterdam",
    strength: "strong",
    label: "Supports SAIN Amsterdam",
    source: "/chapters/amsterdam",
  },
  {
    from: "uu",
    to: "sain-utrecht",
    strength: "strong",
    label: "Where SAIN Utrecht's courses run",
    source: "/chapters/utrecht",
  },
  {
    from: "uva",
    to: "sain-amsterdam",
    strength: "shared",
    label: "Members and a Project Hub supervisor",
    source: "/chapters/amsterdam; src/data/research.ts",
  },
  {
    from: "vu",
    to: "sain-amsterdam",
    strength: "shared",
    label: "Members and a Project Hub supervisor",
    source: "/chapters/amsterdam; src/data/research.ts",
  },
  {
    from: "rug",
    to: "sain-groningen",
    strength: "shared",
    label: "Two Project Hub supervisors",
    source: "src/data/research.ts",
  },
  {
    from: "ero",
    to: NETWORK_ID,
    strength: "shared",
    label: "A community member's internship",
    source: "Landing page careers quote",
  },
  {
    from: "minbuza",
    to: NETWORK_ID,
    strength: "shared",
    label: "An advisory board member",
    source: "/about (advisory board)",
  },
  /* Added 14 October 2026. */
  {
    from: "apart",
    to: "sain-groningen",
    strength: "strong",
    label: "Hackathons together since AISIG",
    source: "/about (2024: hackathons with Apart Research)",
  },
  {
    from: "ellis-delft",
    to: "ellis-amsterdam",
    strength: "shared",
    label: "Both units of the ELLIS network",
    source: "ellis.eu",
  },
  {
    from: "sias",
    to: "sain-amsterdam",
    strength: "shared",
    label: "A SAIN member works with the group",
    source: "SAIN team, 14 October 2026",
  },
  {
    from: "spar",
    to: NETWORK_ID,
    strength: "shared",
    label: "Known to SAIN's leadership",
    source: "SAIN team, 14 October 2026",
  },
  {
    from: "algorithm-audit",
    to: NETWORK_ID,
    strength: "shared",
    label: "Known to people in SAIN's network",
    source: "SAIN team, 14 October 2026",
  },
  {
    from: "jenv",
    to: NETWORK_ID,
    strength: "shared",
    label: "Contacts at the ministry",
    source: "SAIN team, 14 October 2026",
  },
];

/* People in common abroad: drawn when one end is selected, like every line
   to the foundation as a whole. */
ecoLinks.push(
  { from: "apollo", to: NETWORK_ID, strength: "shared", label: "An advisory board member", source: "/about" },
  { from: "oxford", to: NETWORK_ID, strength: "shared", label: "An advisory board member", source: "/about" },
  { from: "cesia", to: NETWORK_ID, strength: "shared", label: "An advisory board member", source: "/about" },
  { from: "ceps", to: NETWORK_ID, strength: "shared", label: "An advisory board member", source: "/about" },
  { from: "pik", to: NETWORK_ID, strength: "shared", label: "A Project Hub supervisor", source: "src/data/research.ts" },
  /* Where SAIN is heading: the story's look ahead only. */
  {
    from: "rails",
    to: NETWORK_ID,
    strength: "prospective",
    label: "A student community in Rotterdam SAIN could work with",
    source: "SAIN team, 14 October 2026",
  },
  {
    from: "vng",
    to: NETWORK_ID,
    strength: "prospective",
    label: "Municipalities engaging with SAIN, a 2027 outcome",
    source: "docs/theory_of_change.md (Outcomes: institutional partnerships)",
  },
  {
    from: "ecp",
    to: NETWORK_ID,
    strength: "prospective",
    label: "Reaching public-sector professionals",
    source: "SAIN team, 14 October 2026",
  },
);

export const ecoKindLabel: Record<EcoKind, string> = {
  chapter: "SAIN chapter",
  university: "University",
  research: "Research",
  field: "AI safety organisation",
  network: "Public-private network",
  government: "Government",
};

/* Every organisation, at home or abroad, for lookups by id. */
export const allEcoNodes: AbroadNode[] = [...ecoNodes, ...abroadNodes];
