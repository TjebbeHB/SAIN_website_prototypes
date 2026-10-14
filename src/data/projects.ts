/* The Project Hub's open projects: what each supervisor has offered to
   supervise, written up from the documents they wrote for SAIN (the
   "Supervisors" folder in the SAIN drive, read 14 October 2026).

   A summary here paraphrases the supervisor's own words and adds nothing to
   them: no prerequisite, commitment or level appears unless the supervisor
   stated it. Interest goes to the projects inbox by email; the projects team
   introduces the candidate to the supervisor.

   To add a project: add an entry with its supervisor and categories. To close
   one: set `open: false` (it stays listed, marked closed) or delete it. */

export const PROJECTS_EMAIL = "projects@safeainetherlands.org";

export type ProjectCategory =
  | "Interpretability"
  | "Evaluations"
  | "Alignment and RL"
  | "Multi-agent"
  | "Security and privacy"
  | "Societal";

export const projectCategories: ProjectCategory[] = [
  "Interpretability",
  "Evaluations",
  "Alignment and RL",
  "Multi-agent",
  "Security and privacy",
  "Societal",
];

export type ProjectSupervisor = {
  name: string;
  role: string;
  /** Where the supervisor is based, for the location filter. */
  base: "Amsterdam" | "Groningen" | "Remote";
  links: { label: string; href: string }[];
};

export type Project = {
  id: string;
  title: string;
  supervisor: ProjectSupervisor;
  summary: string;
  details: string[];
  categories: ProjectCategory[];
  /** Only what the supervisor said: "Thesis", "MSc thesis", "Team project"... */
  format?: string;
  /** Only when the supervisor stated it. */
  lookingFor?: string;
  commitment?: string;
  open: boolean;
};

const filip: ProjectSupervisor = {
  name: "Filip Ilievski",
  role: "Assistant Professor of Commonsense AI, Vrije Universiteit Amsterdam",
  base: "Amsterdam",
  links: [{ label: "Website", href: "https://www.ilievski.info/" }],
};
const sandro: ProjectSupervisor = {
  name: "Sandro Pezzelle",
  role: "Assistant Professor in Responsible AI, ILLC, University of Amsterdam",
  base: "Amsterdam",
  links: [
    { label: "Website", href: "https://sandropezzelle.github.io/" },
    { label: "Mulini Lab", href: "https://projects.illc.uva.nl/mulinilab/" },
  ],
};
const fausto: ProjectSupervisor = {
  name: "Fausto Carcassi",
  role: "Assistant Professor, ILLC, University of Amsterdam",
  base: "Amsterdam",
  links: [{ label: "Website", href: "https://faustocarcassi.com/" }],
};
const leon: ProjectSupervisor = {
  name: "Leon Eshuijs",
  role: "PhD researcher in technical AI safety, Vrije Universiteit Amsterdam",
  base: "Amsterdam",
  links: [
    { label: "Research agenda", href: "https://docs.google.com/document/d/122Bvbp-Om_6-KKq8f_DorvbDnEXYEzcNrsvVPbmpa2o/edit?usp=drivesdk" },
    { label: "Website", href: "https://watermeleon.github.io/" },
  ],
};
const ana: ProjectSupervisor = {
  name: "Ana Lucic",
  role: "Assistant Professor in AI, University of Amsterdam",
  base: "Amsterdam",
  links: [
    { label: "Research agenda", href: "https://docs.google.com/document/d/1IhPnQWQEN6ykshxW9B6xWehtfPwSl0B4T5HzrKyMnn8/edit?usp=sharing" },
    { label: "Website", href: "https://a-lucic.github.io" },
  ],
};
const fatih: ProjectSupervisor = {
  name: "Fatih Turkmen",
  role: "Associate Professor of Computer Science, University of Groningen",
  base: "Groningen",
  links: [
    { label: "Research agenda", href: "https://docs.google.com/document/d/15UNTtMQYEfO0WQjNKC3QyXHdYW1S2TtITbU94ZltZOc/edit?usp=sharing" },
    { label: "Website", href: "https://www.cs.rug.nl/~turkmen/" },
  ],
};
const jobst: ProjectSupervisor = {
  name: "Jobst Heitzig",
  role: "Senior Scientist, Potsdam Institute for Climate Impact Research",
  base: "Remote",
  links: [
    { label: "Research agenda", href: "https://docs.google.com/document/d/1jGBETx0wVUSAZhk4RK6Rett4FVRwTgdUna7Wi2aMg_k/edit?usp=sharing" },
    { label: "Theory paper", href: "https://arxiv.org/abs/2508.00159v2" },
    { label: "Code", href: "https://github.com/pik-gane/empo" },
  ],
};
const guillaume: ProjectSupervisor = {
  name: "Guillaume Pourcel",
  role: "PhD researcher, University of Groningen",
  base: "Groningen",
  links: [
    { label: "Research agenda", href: "https://docs.google.com/document/d/1kr-lo1Qr_k7Yq3C1eoPg9gwFKlJ9PflTWqGrexA8Nxc/edit?usp=sharing" },
  ],
};
const steven: ProjectSupervisor = {
  name: "Steven Abreu",
  role: "Research Scientist, MakerMaker; formerly PhD, University of Groningen",
  base: "Remote",
  links: [
    { label: "Research agenda", href: "https://docs.google.com/document/d/1UIGpTGYUk9nGvH1H5l5oHclRfNT4pCJ7ArQoIIdDNT4/edit?usp=sharing" },
    { label: "Website", href: "https://stevenabreu.com/" },
  ],
};

export const projects: Project[] = [
  {
    id: "ai-narratives-media",
    title: "How memes, reels and headlines shape public narratives about AI",
    supervisor: filip,
    summary:
      "Study how short, multimodal media shape what people believe about AI's harms and benefits, combining social-science frameworks with current AI modelling.",
    details: [
      "Formats like memes and reels carry viewpoints in an ambiguous visual grammar that polarises quickly and blurs truth and opinion, and speculative and imminent risk.",
      "Open choices: which formats, how to collect data, which theory to frame them with, how to model and store the knowledge, how much platform context to include, and how to bring in different socio-cultural perspectives.",
      "Rich enough for more than one student. The ambition is publication at a high-quality venue such as ICWSM or an ACL conference.",
    ],
    categories: ["Societal", "Evaluations"],
    format: "Thesis",
    open: true,
  },
  {
    id: "vlm-visual-events",
    title: "Can vision-language models understand and narrate visual events?",
    supervisor: sandro,
    summary:
      "Measure how well current VLMs understand and narrate visual events, and whether human behavioural and cognitive patterns can improve them.",
    details: ["Every project in Sandro's lab can take an AI safety angle."],
    categories: ["Evaluations"],
    open: true,
  },
  {
    id: "ambiguous-language",
    title: "Ambiguous, underspecified and implicit language in LLMs",
    supervisor: sandro,
    summary:
      "How do LLMs and VLMs handle language with several readings, missing information, or an implied message, and can linguistics boost their understanding?",
    details: ["Every project in Sandro's lab can take an AI safety angle."],
    categories: ["Evaluations"],
    open: true,
  },
  {
    id: "human-inspired-interp",
    title: "Human-inspired mechanistic interpretability",
    supervisor: sandro,
    summary:
      "Find the circuits in LLMs and VLMs responsible for a specific behaviour, and ask whether they mirror the cognitive and neural mechanisms seen in humans.",
    details: ["Every project in Sandro's lab can take an AI safety angle."],
    categories: ["Interpretability"],
    open: true,
  },
  {
    id: "communicative-benchmarks",
    title: "Benchmarking LLMs in real communication and collaboration",
    supervisor: sandro,
    summary: "Can LLMs be used, and evaluated, in genuinely communicative and collaborative settings?",
    details: ["Every project in Sandro's lab can take an AI safety angle."],
    categories: ["Evaluations", "Multi-agent"],
    open: true,
  },
  {
    id: "program-synthesis-interp",
    title: "Program synthesis for mechanistic interpretability",
    supervisor: fausto,
    summary:
      "Apply program synthesis to automate building models of how LLMs implement computations.",
    details: ["Fausto supervises at the intersection of mechanistic interpretability, AI safety and cognitive science; directions are open to shaping together."],
    categories: ["Interpretability"],
    open: true,
  },
  {
    id: "cognitive-skills-interp",
    title: "Theory of mind and plausible deniability, from the inside",
    supervisor: fausto,
    summary: "Use mechanistic interpretability to study cognitive skills in LLMs, such as theory of mind and plausible deniability.",
    details: ["Directions are open to shaping together."],
    categories: ["Interpretability"],
    open: true,
  },
  {
    id: "emergent-personas",
    title: "Emergent personas in self-designing LLMs",
    supervisor: fausto,
    summary: "Study the personas that emerge when LLMs design themselves.",
    details: ["Directions are open to shaping together."],
    categories: ["Alignment and RL"],
    open: true,
  },
  {
    id: "ai-poisoning-signatures",
    title: "Detecting AI poisoning at internet scale",
    supervisor: fausto,
    summary:
      "Can you tell, from high-level summaries of its text, whether a small simulated internet has been poisoned by AI-generated traces?",
    details: ["Directions are open to shaping together."],
    categories: ["Security and privacy", "Societal"],
    open: true,
  },
  {
    id: "llm-theory-of-mind",
    title: "Do LLMs model each other's minds to coordinate?",
    supervisor: fausto,
    summary:
      "Study whether LLMs use theory of mind about each other when coordinating, and whether it differs from how they model human users.",
    details: ["Directions are open to shaping together."],
    categories: ["Multi-agent", "Interpretability"],
    open: true,
  },
  {
    id: "dangerous-behaviour-evals",
    title: "Evaluating and interpreting weird or dangerous model behaviour",
    supervisor: leon,
    summary:
      "Build evaluations or use interpretability methods to study behaviours such as sycophancy, or how models analyse user characteristics when they respond.",
    details: [
      "Topics can be brainstormed together; Leon points to the proposed projects from Neel Nanda's earlier MATS stream for inspiration.",
      "Leon is more familiar with some topics than others, so the first step is agreeing a concrete, tractable question.",
    ],
    categories: ["Interpretability", "Evaluations"],
    open: true,
  },
  {
    id: "safe-rl-training",
    title: "Preventing harmful misalignment during RL training",
    supervisor: leon,
    summary:
      "Investigate mitigations such as safe exploration, filtering, or penalising harmful responses that could stop RL training from producing harmful behaviour.",
    details: [
      "RL on LLMs is compute-intensive, so the scope adapts to the resources available: smaller toy experiments on a specific phenomenon, or finding relevant compute.",
    ],
    categories: ["Alignment and RL"],
    open: true,
  },
  {
    id: "llm-reward-values",
    title: "Using LLMs to align reward functions with moral values",
    supervisor: leon,
    summary: "Explore how LLMs themselves can improve reward functions and align them with different moral values.",
    details: [
      "RL on LLMs is compute-intensive, so the scope adapts to the resources available.",
    ],
    categories: ["Alignment and RL"],
    open: true,
  },
  {
    id: "xai-science-thesis",
    title: "Interpretability and AI safety for science (bring your project)",
    supervisor: ana,
    summary:
      "An open call: propose a project related to Ana's work on (mechanistic) interpretability, scientific machine learning and AI safety.",
    details: ["Ana leads the explainable AI for science lab at the University of Amsterdam. Get in touch with a specific project in mind related to her published topics."],
    categories: ["Interpretability"],
    format: "MSc AI thesis or ELLIS honours project",
    open: true,
  },
  {
    id: "llm-rag-security",
    title: "Security and privacy of LLMs and RAG systems",
    supervisor: fatih,
    summary: "Find and fix security and privacy problems in large language models and retrieval-augmented generation.",
    details: ["Fatih's group regularly enters security and privacy of AI challenges, and invites students to team up."],
    categories: ["Security and privacy"],
    open: true,
  },
  {
    id: "decentralised-privacy",
    title: "Privacy-preserving, fully decentralised machine learning",
    supervisor: fatih,
    summary: "Develop privacy-preserving variants of collaborative learning, from federated to peer-to-peer.",
    details: ["Includes identifying attacks such as inference and adversarial manipulation, and defending with privacy-enhancing technologies."],
    categories: ["Security and privacy"],
    open: true,
  },
  {
    id: "neuromorphic-security",
    title: "Security and privacy of neuromorphic systems",
    supervisor: fatih,
    summary: "Study the security and privacy of brain-inspired computing systems.",
    details: [],
    categories: ["Security and privacy"],
    open: true,
  },
  {
    id: "ai-security-testing",
    title: "AI-assisted security testing and vulnerability patching",
    supervisor: fatih,
    summary: "Use LLMs to test software and systems, discover vulnerabilities and patch them automatically.",
    details: [],
    categories: ["Security and privacy"],
    open: true,
  },
  {
    id: "autonomous-cyberdefence",
    title: "Autonomous cyberdefence with reinforcement learning",
    supervisor: fatih,
    summary: "Build autonomous reinforcement learning agents for cyberdefence.",
    details: [],
    categories: ["Security and privacy", "Alignment and RL"],
    open: true,
  },
  {
    id: "empo",
    title: "EMPO: safety by soft-maximising long-term human power",
    supervisor: jobst,
    summary:
      "Test and validate a safe-AI design that hard-codes an objective of empowering humans, through multi-agent reinforcement learning experiments in multigrid environments.",
    details: [
      "The theory (v1.0) is finished and the codebase is nearly done; an AI Safety Camp project with about five volunteers was set to start in January 2026.",
      "Mentoring is remote: about an hour a week one-on-one, plus a weekly team meeting.",
    ],
    categories: ["Alignment and RL", "Multi-agent"],
    format: "Team project",
    lookingFor: "Experienced ML users, ideally with reinforcement learning or multi-agent RL experience",
    commitment: "Weekly one-on-one and team meetings, remote",
    open: true,
  },
  {
    id: "persuasion-benchmark",
    title: "A benchmark for persuasive capabilities in LLMs",
    supervisor: guillaume,
    summary:
      "Build a benchmark that separates superficial persuasion from genuine reasoning in LLM debate, a building block for scalable oversight.",
    details: [
      "Start in mathematics for clear ground truth. Two copies of a model debate; measure whether they can tell valid from flawed arguments, and how robustly they hold a position when challenged.",
      "The aim is to reveal patterns such as models trained for truthfulness defending positions less robustly than models trained to persuade.",
    ],
    categories: ["Evaluations", "Alignment and RL"],
    format: "Thesis",
    open: true,
  },
  {
    id: "curriculum-cooperation",
    title: "Automatic curriculum learning for multi-agent cooperation",
    supervisor: guillaume,
    summary:
      "Choose which partners an agent trains with, adaptively, so it learns to cooperate with new partners faster and more robustly.",
    details: [
      "Start from a population of fixed agents with diverse cooperative and competitive behaviours, apply curriculum methods to select partners, and measure efficiency and generalisation to unseen partners.",
    ],
    categories: ["Multi-agent", "Alignment and RL"],
    format: "Thesis",
    open: true,
  },
  {
    id: "global-curriculum-signals",
    title: "Global curriculum signals for robust RL under mis-specified goals",
    supervisor: guillaume,
    summary:
      "Do task-selection strategies that improve performance across the whole task set beat local learning-progress heuristics when goals are mis-specified?",
    details: [
      "A direct comparison of local and global task selection on unsupervised environment design benchmarks such as Kinetix, measuring learning speed, robustness and generalisation.",
    ],
    categories: ["Alignment and RL"],
    format: "Thesis",
    open: true,
  },
  {
    id: "self-improving-agents",
    title: "Safety of recursively self-improving AI agents",
    supervisor: steven,
    summary:
      "Anything on developing and aligning self-improving agents: scalable oversight, debate, self-play, iterated distillation and amplification.",
    details: ["Brainstorm a specific idea together, or propose your own."],
    categories: ["Alignment and RL"],
    open: true,
  },
  {
    id: "steering",
    title: "Representation engineering and steering",
    supervisor: steven,
    summary:
      "Detect and steer safety-relevant behaviours in LLMs, for example with conceptors as steering matrices.",
    details: ["Brainstorm a specific idea together, or propose your own."],
    categories: ["Interpretability"],
    open: true,
  },
  {
    id: "hybrid-recurrent",
    title: "Inside hybrid transformer-recurrent models",
    supervisor: steven,
    summary:
      "Study recurrent and hybrid transformer-recurrent LLMs, including how they implement retrieval, in the mechanistic interpretability style of earlier AISIG projects.",
    details: ["Brainstorm a specific idea together, or propose your own."],
    categories: ["Interpretability"],
    open: true,
  },
];

/* The email a candidate sends: addressed to the projects team, who make the
   introduction. Everything a supervisor would ask first is already a line. */
export function interestMailto(project: Project) {
  const subject = `Project Hub: ${project.title} (${project.supervisor.name})`;
  const body = [
    "Hi SAIN projects team,",
    "",
    `I'd like to join this project: "${project.title}", supervised by ${project.supervisor.name}.`,
    "",
    "About me (study or work, relevant skills):",
    "",
    "Why this project:",
    "",
    "Hours per week I can commit:",
    "",
    "CV or LinkedIn:",
    "",
  ].join("\n");
  return `mailto:${PROJECTS_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
