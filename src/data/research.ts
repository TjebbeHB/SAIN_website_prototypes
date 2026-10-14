/**
 * Research Hub facts: what has been published, and who supervises.
 *
 * Shared by the landing page (the inverse "Already in the literature" band and
 * the supervisor list) and /research, so a new paper or a new supervisor is
 * added in exactly one place.
 *
 * Venue strings say "workshop" wherever the paper is a workshop paper. All five
 * formal-venue papers here are workshop papers, and a bare "NeurIPS 2025" reads
 * as main track to the exact reader this page is written for. Saying it plainly
 * is the credibility move, not a weakness.
 *
 * The Apart Research placements ("1st Place", "3rd Place", "4th Place") are
 * repo-only: design/briefs/research-evidence.md could not confirm any rank at
 * source. They are held as the soft "Apart Research hackathon" label until
 * someone reads the rank off each project page.
 *
 * "Playing with Perception" is the one entry behind a Google Drive link rather
 * than arXiv, OpenReview, or Apart Research, and the hero's publication count is
 * counted off this array, so a private file would break a counted claim. Checked
 * signed out on 13 September 2026: the file downloads anonymously, so the chip
 * stays. Re-check if the count or the link ever changes.
 *
 * Self-Ablating Transformers is a four-person paper (Ferrao, Mikaelson, Pepper,
 * Perez-Campanero Antolin), not Ferrao solo; the author list was corrected
 * against the published paper.
 */

export type Publication = {
  title: string;
  /** Short form used on the landing chips, where the full venue does not fit. */
  venueShort: string;
  venue: string;
  /** Short form used on the landing chips, where the full title does not fit. */
  chipTitle: string;
  authors: string;
  link: string;
  /** Selected landing-page evidence; summaries are grounded in the linked papers. */
  featured?: {
    illustration: "alignment" | "ablation" | "eu-agents";
    venueLabel: string;
    summary: string;
  };
};

export const publications: Publication[] = [
  {
    title:
      "The Anatomy of Alignment: Decomposing Preference Optimization by Steering Sparse Features",
    venueShort: "NeurIPS 2025 workshop · Spotlight",
    venue: "NeurIPS 2025 Mechanistic Interpretability Workshop · Spotlight",
    authors: "Jeremias Ferrao, Matthijs van der Lende, Ilija Lichkovski",
    link: "https://arxiv.org/abs/2509.12934",
    chipTitle: "The Anatomy of Alignment",
    featured: {
      illustration: "alignment",
      venueLabel: "NeurIPS 2025 workshop · Spotlight",
      summary: "A transparent view of preference optimisation reveals how models can learn to favour style and formatting over honesty.",
    },
  },
  {
    title: "Self-Ablating Transformers: More Interpretability, Less Sparsity",
    venueShort: "ICLR 2025 workshop",
    venue: "ICLR 2025 Building Trust Workshop",
    authors:
      "Jeremias Ferrao, Luhan Mikaelson, Keenan Pepper, Natalia Perez-Campanero Antolin",
    link: "https://openreview.net/pdf?id=QcmEb490bK",
    chipTitle: "Self-Ablating Transformers",
    featured: {
      illustration: "ablation",
      venueLabel: "ICLR 2025 · Building Trust Workshop",
      summary: "Training small language models to select their active components produces more specialised, interpretable circuits without sacrificing language modelling performance.",
    },
  },
  {
    title: "EU-Agent-Bench: Measuring Illegal Behavior of LLM Agents Under EU Law",
    venueShort: "NeurIPS 2025 workshop",
    venue: "NeurIPS 2025 Regulatable ML Workshop",
    authors: "Ilija Lichkovski, Alexander Müller, Mariam Ibrahim, Tiwai Mhundwa",
    link: "https://arxiv.org/abs/2510.21524",
    chipTitle: "EU-Agent-Bench",
    featured: {
      illustration: "eu-agents",
      venueLabel: "NeurIPS 2025 · Regulatable ML Workshop",
      summary: "A benchmark tests whether AI agents take unlawful actions under EU law, even when the user’s request is benign.",
    },
  },
  {
    title:
      "Contextual Sparsity as a Tool for Mechanistic Understanding of Retrieval in Hybrid Foundation Models",
    venueShort: "ICLR 2025 workshop",
    venue: "ICLR 2025 SLLM Workshop",
    authors: "Davide Zani, Felix Michalak, Steven Abreu",
    link: "https://openreview.net/pdf?id=TGWzg86kYv",
    chipTitle: "Contextual Sparsity",
  },
  {
    title: "Steering Large Language Models using Conceptors",
    venueShort: "NeurIPS 2024 workshop",
    venue: "NeurIPS 2024 Workshop on Foundation Model Interventions",
    authors: "Joris Postmus, Steven Abreu",
    link: "https://jorispos.github.io/conceptor_steering/",
    chipTitle: "Steering LLMs using Conceptors",
  },
  {
    title: "AutoSteer: Weight-Preserving Reinforcement Learning for Interpretable Model Control",
    venueShort: "Apart Research hackathon",
    venue: "Apart Research hackathon",
    authors: "Jeremias Ferrao",
    link: "https://www.apartresearch.com/project/autosteer-weight-preserving-reinforcement-learning-for-interpretable-model-control",
    chipTitle: "AutoSteer",
  },
  {
    title: "Local Learning Coefficients Predict Developmental Milestones During GRPO",
    venueShort: "Apart Research hackathon",
    venue: "Apart Research hackathon",
    authors: "Jeremias Ferrao, Ilija Lichkovski",
    link: "https://apartresearch.com/project/local-learning-coefficients-predict-developmental-milestones-during-group-relative-policy-optimization-2te2",
    chipTitle: "Local Learning Coefficients",
  },
  {
    title: "Collective Deliberation for Safer CBRN Decisions: A Multi-Agent LLM Debate Pipeline",
    venueShort: "Apart Research hackathon",
    venue: "Apart Research hackathon",
    authors: "Alexander Müller, Arsenijs Golicins, Galina Lesnic",
    link: "https://apartresearch.com/project/collective-deliberation-for-safer-cbrn-decisions-a-multi-agent-llm-debate-pipeline-3w8q",
    chipTitle: "Collective Deliberation",
  },
  {
    title: "Sandbagging LLMs using Activation Steering",
    venueShort: "Apart Research",
    venue: "Apart Research",
    authors: "Jeremias Ferrao, Davide Zani",
    link: "https://www.apartresearch.com/project/sandbagging-llms-using-activation-steering",
    chipTitle: "Sandbagging LLMs using Activation Steering",
  },
  {
    title: "Cybersecurity Persistence Benchmark",
    venueShort: "Apart Research",
    venue: "Apart Research",
    authors: "Davide Zani, Felix Michalak, Jeremias Ferrao",
    link: "https://www.apartresearch.com/project/cybersecurity-persistence-benchmark",
    chipTitle: "Cybersecurity Persistence Benchmark",
  },
  {
    title: "Playing with Perception: Fooling Traffic Sign Classifiers via Copy-Paste Manipulation",
    venueShort: "Research project",
    venue: "Research project",
    authors: "Davide Zani, Alexandru Dimofte",
    link: "https://drive.google.com/file/d/1JvhstWaLIHB9QPI-cg5S-1ASexhmqLSN/view",
    chipTitle: "Playing with Perception",
  },
  {
    title: "AI Misinformation and Threats to Democratic Rights",
    venueShort: "Apart Research",
    venue: "Apart Research",
    authors: "Davide Zani, Mariam Ibrahim, Tiwai Mhundwa, Felix Michalak, Andrei Avram",
    link: "https://www.apartresearch.com/project/ai-misinformation-and-threats-to-democratic-rights",
    chipTitle: "AI Misinformation and Democratic Rights",
  },
];

export type Supervisor = {
  name: string;
  position: string;
  /** Trimmed to fit the landing's 196px name column plus affiliation. */
  positionShort: string;
  /** The /research card, up to ~336 CSS wide. */
  image: string;
  /** The landing circle, 88-104 CSS. Written by `npm run images`. */
  imageSmall: string;
  agenda: string;
};

export const supervisors: Supervisor[] = [
  {
    name: "Steven Abreu",
    position: "Research Scientist, MakerMaker",
    positionShort: "Research Scientist, MakerMaker",
    image: "/photos/supervisors/steven-800.webp",
    imageSmall: "/photos/supervisors/steven-312.webp",
    agenda:
      "https://docs.google.com/document/d/1UIGpTGYUk9nGvH1H5l5oHclRfNT4pCJ7ArQoIIdDNT4/edit?usp=sharing",
  },
  {
    name: "Fatih Turkmen",
    position: "Associate Professor of Computer Science, University of Groningen",
    positionShort: "Associate Professor, University of Groningen",
    image: "/photos/supervisors/Fatih_3.png",
    imageSmall: "/photos/supervisors/Fatih_3-312.png",
    agenda:
      "https://docs.google.com/document/d/15UNTtMQYEfO0WQjNKC3QyXHdYW1S2TtITbU94ZltZOc/edit?usp=sharing",
  },
  {
    name: "Jobst Heitzig",
    position:
      "Working Group Leader, Senior Scientist, Potsdam Institute for Climate Impact Research",
    positionShort: "Senior Scientist, Potsdam Institute",
    image: "/photos/supervisors/Jobst.png",
    imageSmall: "/photos/supervisors/Jobst-312.png",
    agenda:
      "https://docs.google.com/document/d/1jGBETx0wVUSAZhk4RK6Rett4FVRwTgdUna7Wi2aMg_k/edit?usp=sharing",
  },
  {
    name: "Guillaume Pourcel",
    position: "PhD AI Candidate, University of Groningen",
    positionShort: "PhD AI Candidate, University of Groningen",
    image: "/photos/supervisors/Guillame.jpg",
    imageSmall: "/photos/supervisors/Guillame-312.jpg",
    agenda:
      "https://docs.google.com/document/d/1kr-lo1Qr_k7Yq3C1eoPg9gwFKlJ9PflTWqGrexA8Nxc/edit?usp=sharing",
  },
  {
    name: "Ana Lucic",
    position: "Assistant Professor, University of Amsterdam",
    positionShort: "Assistant Professor, University of Amsterdam",
    image: "/photos/supervisors/Ana_Lucic-800.png",
    imageSmall: "/photos/supervisors/Ana_Lucic-312.png",
    agenda:
      "https://docs.google.com/document/d/1IhPnQWQEN6ykshxW9B6xWehtfPwSl0B4T5HzrKyMnn8/edit?usp=sharing",
  },
  {
    name: "Leon Eshuijs",
    position: "PhD student, Vrije Universiteit Amsterdam",
    positionShort: "PhD student, VU Amsterdam",
    /* The source is 640px square, so there is no 800 rung; the card uses the
       original. */
    image: "/photos/supervisors/Leon_Eshuijs.png",
    imageSmall: "/photos/supervisors/Leon_Eshuijs-312.png",
    agenda:
      "https://docs.google.com/document/d/122Bvbp-Om_6-KKq8f_DorvbDnEXYEzcNrsvVPbmpa2o/edit?usp=drivesdk",
  },
];

export const RESEARCH_EMAIL = "research@safeainetherlands.org";
export const RESEARCH_INTEREST_FORM_URL = "https://forms.gle/na3wbBR4V1YVHAnFA";
/* Every "Become a supervisor" link goes here (upstream #57), not to the inbox. */
export const SUPERVISOR_INTEREST_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLScpE5jSBGAihD_8qJn7wRWdEFGieYQdLaPUZ8JiZyUVpn519g/viewform";
