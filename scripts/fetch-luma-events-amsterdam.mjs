#!/usr/bin/env node
/**
 * Fetch past Luma events for the SAIN Amsterdam calendar and write them to
 * src/data/lumaPastEventsAmsterdam.json. Run manually every few weeks, then
 * commit the JSON change. Builds never hit Luma at runtime.
 *
 * Usage: npm run fetch-luma-events-amsterdam
 */
import { writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const LUMA_CALENDAR_ID = "cal-WD5xl5IYLpY7xNm";
const OUT_PATH = join(
  dirname(fileURLToPath(import.meta.url)),
  "..",
  "src",
  "data",
  "lumaPastEventsAmsterdam.json",
);

const url = `https://api.lu.ma/calendar/get-items?calendar_api_id=${LUMA_CALENDAR_ID}&period=past&pagination_limit=50`;

console.log(`Fetching past events from Luma (${LUMA_CALENDAR_ID})...`);
const res = await fetch(url);
if (!res.ok) {
  console.error(`Luma API returned ${res.status} ${res.statusText}`);
  process.exit(1);
}

const data = await res.json();
const events = (data.entries ?? [])
  .map(({ event }) => ({
    name: event.name,
    url: `https://lu.ma/${event.url}`,
    startAt: event.start_at,
  }))
  .sort((a, b) => new Date(b.startAt).getTime() - new Date(a.startAt).getTime());

writeFileSync(OUT_PATH, JSON.stringify(events, null, 2) + "\n");
console.log(`Wrote ${events.length} events to ${OUT_PATH}`);
