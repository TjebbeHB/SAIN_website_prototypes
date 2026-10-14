import data from "@/data/impactMetrics.json";
import { impactTargets, pipelineLevels } from "@/data/impactTargets";

/* The shape scripts/fetch-impact-metrics.mjs writes. */
type ImpactMetricsData = {
  source: "airtable" | "illustrative";
  generatedAt: string;
  year: number;
  members: number;
  monthly: { month: string; members: number }[];
  levels: { level: number; count: number }[];
  movedUp: number;
  courseCompletions: number;
  /** null where a chapter has fewer than five members. */
  chapters: { name: string; members: number | null }[];
};

const metrics = data as ImpactMetricsData;

/* Impact, for the readers who come looking for it: funders, course partners,
   the board. It sits below the hero rather than in it, because the person
   deciding whether to join a course does not need a growth curve to decide.

   Every number is read from src/data/impactMetrics.json, which
   scripts/fetch-impact-metrics.mjs writes from the SAIN Pipeline base in
   Airtable as aggregates only (no names, no rows). While that file holds
   the design's illustrative figures, the chart says so on its face. */

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

type Point = { month: number; members: number };

function monthIndex(value: string) {
  return Number(value.slice(5, 7)) - 1;
}

/* The dotted line: straight between the plan's anchors, month by month. */
function targetSeries(): Point[] {
  const anchors = impactTargets.anchors
    .map((anchor) => ({ month: monthIndex(anchor.month), members: anchor.members }))
    .sort((a, b) => a.month - b.month);
  const series: Point[] = [];
  for (let month = anchors[0].month; month <= anchors[anchors.length - 1].month; month++) {
    const after = anchors.findIndex((anchor) => anchor.month >= month);
    const b = anchors[after];
    const a = anchors[Math.max(0, after - 1)];
    const t = b.month === a.month ? 1 : (month - a.month) / (b.month - a.month);
    series.push({ month, members: Math.round(a.members + (b.members - a.members) * t) });
  }
  return series;
}

/* Gridlines on round numbers: a step of 1, 2, 2.5 or 5 times a power of ten,
   about four of them, and the axis ends on the first one past the data. */
function niceAxis(value: number) {
  const rough = value / 4;
  const magnitude = Math.pow(10, Math.floor(Math.log10(rough)));
  const step = [1, 2, 2.5, 5, 10].map((m) => m * magnitude).find((candidate) => candidate >= rough) ?? 10 * magnitude;
  const max = Math.ceil(value / step) * step;
  return { max, ticks: Array.from({ length: Math.round(max / step) + 1 }, (_, i) => i * step) };
}

const formatter = new Intl.NumberFormat("en-GB");
const format = (value: number) => formatter.format(value);

export default function ImpactMetrics() {
  const live = metrics.source === "airtable";
  const actual: Point[] = metrics.monthly
    .filter((item) => item.month.startsWith(String(metrics.year)))
    .map((item) => ({ month: monthIndex(item.month), members: item.members }));
  const target = targetSeries();
  const latest = actual[actual.length - 1];
  const yearEnd = target[target.length - 1];
  const onTrack = target.find((point) => point.month === latest.month);

  /* Plot geometry, in the SVG's own units. */
  const W = 640;
  const H = 286;
  const left = 46;
  const right = 618;
  const top = 26;
  const bottom = 226;
  const axis = niceAxis(Math.max(...actual.map((p) => p.members), ...target.map((p) => p.members)) * 1.04);
  const yMax = axis.max;
  const x = (month: number) => left + (month / 11) * (right - left);
  const y = (members: number) => bottom - (members / yMax) * (bottom - top);
  const line = (points: Point[]) =>
    points.map((point, i) => `${i ? "L" : "M"}${x(point.month).toFixed(1)} ${y(point.members).toFixed(1)}`).join("");
  const area = `${line(actual)}L${x(latest.month).toFixed(1)} ${bottom}L${x(actual[0].month).toFixed(1)} ${bottom}Z`;
  const ticks = axis.ticks;
  /* The quarter marks carry values; every month carries a point. */
  const labelled = new Set([0, 3, 6, 9]);

  const levelTotal = metrics.levels.reduce((sum, level) => sum + level.count, 0);
  const levelMax = Math.max(...metrics.levels.map((level) => level.count));
  const advanced = metrics.levels.filter((level) => level.level >= 4).reduce((sum, level) => sum + level.count, 0);
  const updated = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric" }).format(
    new Date(metrics.generatedAt),
  );

  const kpis = [
    { value: format(latest.members), label: `people in the community, against a target of ${format(yearEnd.members)} by December` },
    { value: format(metrics.movedUp), label: "have moved up at least one level since they joined" },
    { value: format(metrics.courseCompletions), label: "course completions this year" },
    { value: format(advanced), label: "have reached a paid fellowship or a job in AI safety" },
  ];

  return (
    <section id="impact" aria-labelledby="impact-heading" className="scroll-mt-28 border-t border-navy/10 bg-cream">
      <div className="shell band-section">
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16 xl:gap-24">
          <div className="min-w-0">
            <p className="eyebrow">Our impact</p>
            <h2 id="impact-heading" className="mt-4 max-w-[520px] font-serif text-heading text-navy">
              More people, further along the path.
            </h2>
            <p className="mt-4 max-w-[540px] text-body text-navy/74">
              For funders and partners: how many people SAIN reaches, and how far they go. Counted from SAIN&rsquo;s
              member records, where every member has a level from new to working in AI safety.
            </p>
            <dl className="mt-8 grid gap-x-10 gap-y-6 border-t border-navy/14 pt-7 sm:grid-cols-2">
              {kpis.map((kpi) => (
                <div key={kpi.label} className="min-w-0">
                  <dt className="sr-only">{kpi.label}</dt>
                  <dd className="font-serif text-[44px] font-bold leading-none tracking-[-0.03em] text-navy tabular-nums">
                    {kpi.value}
                  </dd>
                  <dd className="mt-2 max-w-[240px] text-caption text-navy/68">{kpi.label}</dd>
                </div>
              ))}
            </dl>
            {metrics.chapters.length > 0 && (
              <p className="mt-6 text-caption text-navy/68">
                By chapter:{" "}
                {metrics.chapters
                  .map((chapter) => `${chapter.name} ${chapter.members === null ? "(fewer than 5)" : format(chapter.members)}`)
                  .join(" · ")}
              </p>
            )}
            {!live && (
              <p className="mt-6 text-footnote text-navy/60">
                Illustrative figures for the design. They become SAIN&rsquo;s own once the Airtable connection is switched on.
              </p>
            )}
          </div>

          <figure className="min-w-0 rounded-[14px] border border-white/10 bg-inverse p-5 text-white shadow-[0_24px_60px_rgb(2_28_77/18%)] md:p-7">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="eyebrow !text-[#ff8a5b]">Growing the community</p>
                <p className="mt-3 flex flex-wrap items-baseline gap-x-6 gap-y-1">
                  <span className="font-serif text-[52px] font-bold leading-none tracking-[-0.035em] tabular-nums">
                    {format(latest.members)}
                  </span>
                  <span className="text-[14px] leading-5 text-white/72">
                    people joined
                    <br />
                    by {MONTHS[latest.month]} {metrics.year}
                  </span>
                  <span aria-hidden="true" className="hidden h-10 w-px self-center bg-white/20 sm:block" />
                  <span className="font-serif text-[38px] font-bold leading-none tracking-[-0.03em] text-white/90 tabular-nums">
                    {format(yearEnd.members)}
                  </span>
                  <span className="text-[14px] leading-5 text-white/72">
                    year-end
                    <br />
                    target
                  </span>
                </p>
              </div>
              <span className="rounded-full border border-white/30 px-3 py-1.5 text-[12.5px] text-white/85">
                {live ? "Live from member records" : "Illustrative data"}
              </span>
            </div>

            <div className="mt-5 flex gap-6 text-[13px] text-white/75" aria-hidden="true">
              <span className="flex items-center gap-2.5">
                <span className="h-[3px] w-7 rounded-full bg-orange" />
                Actual
              </span>
              <span className="flex items-center gap-2.5">
                <span className="w-7 border-t-[2.5px] border-dotted border-[#7ea7ff]" />
                {impactTargets.label}
              </span>
            </div>

            <svg
              viewBox={`0 0 ${W} ${H}`}
              className="mt-2 block h-auto w-full"
              role="img"
              aria-label={`Community members in ${metrics.year}: ${format(latest.members)} by ${MONTHS[latest.month]}, against a target of ${format(onTrack?.members ?? yearEnd.members)} for that month and ${format(yearEnd.members)} by December.`}
            >
              <defs>
                <linearGradient id="impact-area" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#ff6025" stopOpacity="0.5" />
                  <stop offset="1" stopColor="#ff6025" stopOpacity="0.02" />
                </linearGradient>
              </defs>
              <g stroke="rgb(255 255 255 / 12%)" strokeDasharray="2 5">
                {ticks.slice(1).map((tick) => (
                  <line key={tick} x1={left} x2={right} y1={y(tick)} y2={y(tick)} />
                ))}
              </g>
              <line x1={left} x2={left} y1={top - 8} y2={bottom} stroke="rgb(255 255 255 / 35%)" />
              <line x1={left} x2={right} y1={bottom} y2={bottom} stroke="rgb(255 255 255 / 35%)" />
              <g fill="rgb(255 255 255 / 70%)" fontSize="13" fontFamily="var(--font-poppins), sans-serif">
                {ticks.map((tick) => (
                  <text key={tick} x={left - 10} y={y(tick) + 4} textAnchor="end">
                    {format(Math.round(tick))}
                  </text>
                ))}
                {[0, 3, 6, 9, 11].map((month) => (
                  <text key={month} x={x(month)} y={bottom + 22} textAnchor="middle">
                    {MONTHS[month]}
                  </text>
                ))}
                <text x={x(latest.month)} y={bottom + 40} textAnchor="middle" fill="#ffffff" fontWeight="600">
                  Today
                </text>
              </g>
              <path d={area} fill="url(#impact-area)" />
              <line
                x1={x(latest.month)}
                x2={x(latest.month)}
                y1={top - 10}
                y2={bottom}
                stroke="rgb(255 255 255 / 45%)"
                strokeDasharray="2 3"
              />
              <path d={line(target)} fill="none" stroke="#7ea7ff" strokeWidth="2.4" strokeDasharray="3 5" strokeLinecap="round" />
              <path d={line(actual)} fill="none" stroke="#ff6025" strokeWidth="3.4" strokeLinejoin="round" strokeLinecap="round" />
              <g>
                {target
                  .filter((point) => labelled.has(point.month) || point.month === yearEnd.month)
                  .map((point) => (
                    <g key={point.month}>
                      <circle cx={x(point.month)} cy={y(point.members)} r="4.5" fill="#01112f" stroke="#7ea7ff" strokeWidth="2" />
                      <text
                        x={x(point.month)}
                        y={y(point.members) - 11}
                        textAnchor="middle"
                        fill={point.month === yearEnd.month ? "#a9c3ff" : "rgb(255 255 255 / 80%)"}
                        fontSize="12.5"
                        fontFamily="var(--font-poppins), sans-serif"
                      >
                        {format(point.members)}
                      </text>
                    </g>
                  ))}
                {actual.map((point) => (
                  <circle
                    key={point.month}
                    cx={x(point.month)}
                    cy={y(point.members)}
                    r={labelled.has(point.month) || point === latest ? 4.5 : 2.6}
                    fill="#ff6025"
                    stroke="#ffffff"
                    strokeWidth={labelled.has(point.month) || point === latest ? 1.5 : 0}
                  />
                ))}
                {/* Both lines start together; the target's label already
                    names the first month. */}
                {actual
                  .filter((point) => labelled.has(point.month) && point !== latest && point.month !== target[0].month)
                  .map((point) => (
                    <text
                      key={point.month}
                      x={x(point.month)}
                      y={y(point.members) + 20}
                      textAnchor="middle"
                      fill="rgb(255 255 255 / 80%)"
                      fontSize="12.5"
                      fontFamily="var(--font-poppins), sans-serif"
                    >
                      {format(point.members)}
                    </text>
                  ))}
                <text
                  x={x(latest.month) + 12}
                  y={y(latest.members) + 5}
                  fill="#ff8a5b"
                  fontSize="18"
                  fontWeight="600"
                  fontFamily="var(--font-poppins), sans-serif"
                >
                  {format(latest.members)}
                </text>
              </g>
            </svg>

            <figcaption className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-white/12 pt-4 text-[13px] text-white/60">
              <span>Cumulative community members · {metrics.year}</span>
              <span>{live ? `Updated ${updated}` : "Design figures, not yet SAIN's records"}</span>
            </figcaption>

            <table className="sr-only">
              <caption>Community members by month, {metrics.year}</caption>
              <thead>
                <tr>
                  <th scope="col">Month</th>
                  <th scope="col">Members</th>
                  <th scope="col">Target</th>
                </tr>
              </thead>
              <tbody>
                {target.map((point) => (
                  <tr key={point.month}>
                    <th scope="row">{MONTHS[point.month]}</th>
                    <td>{actual.find((item) => item.month === point.month)?.members ?? "Not yet"}</td>
                    <td>{point.members}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </figure>
        </div>

        {/* The pipeline itself: where the community stands today, level by
            level. Orange marks the end of the path, as it does everywhere. */}
        <div className="mt-14 border-t border-navy/14 pt-8 md:mt-16">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h3 className="font-serif text-heading-sm text-navy">Where our members are on the path</h3>
            <p className="text-caption text-navy/65">
              {format(levelTotal)} members by their current level · {live ? `updated ${updated}` : "illustrative"}
            </p>
          </div>
          <ol role="list" className="mt-6 grid gap-x-10 gap-y-4 md:grid-cols-2 xl:grid-cols-3">
            {pipelineLevels.map((level) => {
              const count = metrics.levels.find((item) => item.level === level.level)?.count ?? 0;
              const share = levelTotal ? count / levelTotal : 0;
              const end = level.level >= 4;
              return (
                <li key={level.level} className="grid grid-cols-[40px_minmax(0,1fr)] gap-x-3">
                  <span
                    className={`grid size-10 place-items-center rounded-full border-[1.5px] font-serif text-[15px] font-bold ${
                      end ? "border-orange text-orange-ink" : "border-navy/20 text-navy"
                    }`}
                  >
                    L{level.level}
                  </span>
                  <div className="min-w-0">
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="text-[15px] font-medium leading-5 text-navy">{level.name}</span>
                      <span className="text-[15px] font-semibold tabular-nums text-navy">
                        {format(count)}
                        <span className="ml-1.5 text-caption font-normal text-navy/60">{Math.round(share * 100)}%</span>
                      </span>
                    </div>
                    <span className="mt-2 block h-[6px] overflow-hidden rounded-full bg-navy/[0.08]" aria-hidden="true">
                      <span
                        className={`block h-full rounded-full ${end ? "bg-orange" : "bg-navy/70"}`}
                        style={{ width: `${Math.max(2, (count / levelMax) * 100)}%` }}
                      />
                    </span>
                    <span className="mt-1.5 block text-footnote text-navy/60">{level.detail}</span>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
