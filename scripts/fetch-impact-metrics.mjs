#!/usr/bin/env node
/**
 * Count SAIN's community from the SAIN Pipeline base in Airtable and write the
 * totals the landing's impact band draws to src/data/impactMetrics.json.
 *
 * Only aggregates leave Airtable: monthly member counts, how many people sit
 * at each pipeline level, how many moved up, course completions this year,
 * and members per chapter. The script asks the API for the handful of fields
 * those need, by field id, and never for a name, an email, a CV or a note.
 * A chapter count under five is written as null, so a small chapter's
 * numbers cannot single anyone out.
 *
 * Needs a personal access token with data.records:read on the base:
 *   AIRTABLE_TOKEN=pat... npm run fetch-impact-metrics
 *
 * Optional: AIRTABLE_BASE_ID (defaults to the SAIN Pipeline base), and
 * IMPACT_YEAR (defaults to the current year).
 */
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const OUT_PATH = join(dirname(fileURLToPath(import.meta.url)), "..", "src", "data", "impactMetrics.json");

const TOKEN = process.env.AIRTABLE_TOKEN;
const BASE = process.env.AIRTABLE_BASE_ID || "appQC7SP1Qy95K03h";
const YEAR = Number(process.env.IMPACT_YEAR || new Date().getFullYear());

/* Field ids rather than names, so renaming a column in Airtable does not
   quietly zero the chart. Checked against the base on 14 October 2026. */
const PEOPLE = {
  table: "tblN6HnZm6ksDmGM0",
  created: "fldJOWLPvmfg1gTvS",
  firstTouch: "fldFFyrjxGwsIjTd6",
  entryLevel: "fldY3oNeTtuCScNcL",
  currentLevel: "fldIASLOjAhKYJDAn",
  status: "fldvPiu4WYFr0iX0B",
  chapters: "fldPukCG5UPmJtdhr",
};
const CHAPTERS = { table: "tblqwn2EQw0Es10Ji", name: "fldFDEqk0fnSzdwKV" };
const INTERACTIONS = { table: "tbl9uyF7qYs6PmBIB", date: "fldSp6hYcOEutvnQo", type: "fldiTJOr6VR7yL1bU" };

if (!TOKEN) {
  console.error("Set AIRTABLE_TOKEN to a personal access token with data.records:read on the SAIN Pipeline base.");
  process.exit(1);
}

async function records(table, fields) {
  const rows = [];
  let offset;
  do {
    const query = new URLSearchParams({ pageSize: "100", returnFieldsByFieldId: "true" });
    for (const field of fields) query.append("fields[]", field);
    if (offset) query.set("offset", offset);
    const response = await fetch(`https://api.airtable.com/v0/${BASE}/${table}?${query}`, {
      headers: { Authorization: `Bearer ${TOKEN}` },
    });
    if (!response.ok) {
      console.error(`Airtable returned ${response.status} ${response.statusText} for ${table}`);
      process.exit(1);
    }
    const page = await response.json();
    rows.push(...page.records);
    offset = page.offset;
    /* Airtable allows five requests a second per base. */
    if (offset) await new Promise((resolve) => setTimeout(resolve, 220));
  } while (offset);
  return rows;
}

/* "2 - I've completed a full AI safety course" -> 2 */
const levelOf = (value) => {
  if (typeof value === "number") return value;
  const match = typeof value === "string" ? value.match(/^\s*(\d+)/) : null;
  return match ? Number(match[1]) : null;
};

console.log(`Counting the SAIN Pipeline base (${BASE}) for ${YEAR}...`);

const people = (
  await records(PEOPLE.table, [
    PEOPLE.created,
    PEOPLE.firstTouch,
    PEOPLE.entryLevel,
    PEOPLE.currentLevel,
    PEOPLE.status,
    PEOPLE.chapters,
  ])
)
  .map((record) => record.fields)
  /* Someone who asked to be deleted is not counted, whatever the base says. */
  .filter((fields) => fields[PEOPLE.status] !== "Deletion requested");

const joined = people.map((fields) => (fields[PEOPLE.firstTouch] || fields[PEOPLE.created] || "").slice(0, 7));

/* Cumulative members at the end of each month of the year, up to this one. */
const now = new Date();
const lastMonth = YEAR < now.getFullYear() ? 12 : now.getMonth() + 1;
const monthly = [];
for (let month = 1; month <= lastMonth; month++) {
  const key = `${YEAR}-${String(month).padStart(2, "0")}`;
  monthly.push({ month: key, members: joined.filter((value) => value && value <= key).length });
}

const levels = [0, 1, 2, 3, 4, 5].map((level) => ({
  level,
  count: people.filter((fields) => Math.min(5, levelOf(fields[PEOPLE.currentLevel]) ?? -1) === level).length,
}));

const movedUp = people.filter((fields) => {
  const entry = levelOf(fields[PEOPLE.entryLevel]);
  const current = levelOf(fields[PEOPLE.currentLevel]);
  return entry !== null && current !== null && current > entry;
}).length;

const interactions = await records(INTERACTIONS.table, [INTERACTIONS.date, INTERACTIONS.type]);
const courseCompletions = interactions.filter(
  (record) =>
    record.fields[INTERACTIONS.type] === "Course completed" &&
    String(record.fields[INTERACTIONS.date] || "").startsWith(String(YEAR)),
).length;

const chapterNames = new Map(
  (await records(CHAPTERS.table, [CHAPTERS.name])).map((record) => [record.id, record.fields[CHAPTERS.name]]),
);
const perChapter = new Map();
for (const fields of people) {
  for (const id of fields[PEOPLE.chapters] || []) perChapter.set(id, (perChapter.get(id) || 0) + 1);
}
const chapters = [...perChapter.entries()]
  .map(([id, members]) => ({ name: chapterNames.get(id) || "Unnamed chapter", members: members >= 5 ? members : null }))
  .sort((a, b) => (b.members ?? 0) - (a.members ?? 0));

const out = {
  source: "airtable",
  generatedAt: now.toISOString().slice(0, 10),
  year: YEAR,
  note: "Aggregates from the SAIN Pipeline base. Written by scripts/fetch-impact-metrics.mjs; edit nothing by hand.",
  members: people.length,
  monthly,
  levels,
  movedUp,
  courseCompletions,
  chapters,
};

writeFileSync(OUT_PATH, JSON.stringify(out, null, 2) + "\n");
console.log(`Wrote ${people.length} members, ${monthly.length} months, ${courseCompletions} course completions to ${OUT_PATH}`);
