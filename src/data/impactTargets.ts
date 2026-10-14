/* The growth SAIN has committed to, drawn as the dotted line in the impact
   chart on the landing. Edit the anchors to match the current grant plan; the
   chart draws a straight line between them, month by month.

   `members` is the community count the line should reach by the end of that
   month: everyone in the SAIN Pipeline base, the same population
   scripts/fetch-impact-metrics.mjs counts. */

export type TargetAnchor = { month: string; members: number };

export const impactTargets: { year: number; label: string; anchors: TargetAnchor[] } = {
  year: 2026,
  label: "Target",
  anchors: [
    { month: "2026-01", members: 100 },
    { month: "2026-12", members: 600 },
  ],
};

/* The six levels of the SAIN pipeline, as the Entry Level field in the SAIN
   Pipeline base defines them. Level 5 holds both working in AI safety and
   employing people in it. */
export const pipelineLevels: { level: number; name: string; detail: string }[] = [
  { level: 0, name: "New", detail: "Completely new to AI safety" },
  { level: 1, name: "Engaged", detail: "Been to an event or read about it" },
  { level: 2, name: "Trained", detail: "Completed a full AI safety course" },
  { level: 3, name: "Contributing", detail: "Made a real contribution: research, a project, sustained team work" },
  { level: 4, name: "Fellowship", detail: "Done or doing a paid AI safety fellowship" },
  { level: 5, name: "Working in AI safety", detail: "Works in AI safety, or employs people in it" },
];
