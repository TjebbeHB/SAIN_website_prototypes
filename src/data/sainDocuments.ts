export const sainDocuments = [
  {
    slug: "vision",
    title: "Vision",
    eyebrow: "Where SAIN is going",
    description:
      "SAIN's mission, national role, strategic pillars, and long-term ambition for AI safety in the Netherlands.",
    fileName: "vision.md",
  },
  {
    slug: "theory-of-change",
    title: "Theory of Change",
    eyebrow: "How change happens",
    description:
      "The causal logic behind SAIN's work: inputs, activities, outputs, outcomes, and scaling dynamics.",
    fileName: "theory_of_change.md",
  },
  {
    slug: "code-of-conduct",
    title: "Code of Conduct",
    eyebrow: "How we work together",
    description:
      "Behavioural standards for SAIN participants and operational standards for chapters under the SAIN brand.",
    fileName: "code_of_conduct.md",
  },
] as const;

export type SainDocument = (typeof sainDocuments)[number];

export function getSainDocument(slug: string) {
  return sainDocuments.find((document) => document.slug === slug);
}
