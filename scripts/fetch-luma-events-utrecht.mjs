#!/usr/bin/env node
/**
 * Fetch past Luma events for the SAIN Utrecht calendar and write them to
 * src/data/lumaPastEventsUtrecht.json. Run manually, then commit the JSON.
 *
 * Usage:
 *   npm run fetch-luma-events-utrecht
 *
 * Optional: set LUMA_API_KEY in .env.local if Luma requires auth for your
 * calendar (do not commit secrets). The public calendar/items endpoint
 * usually works without a key for public calendars.
 *
 * Calendar HTML exposes cal-… in page source; embed uses the same ID:
 * https://luma.com/embed/calendar/<CALENDAR_ID>/events
 */
import { writeFileSync, readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const LUMA_CALENDAR_ID = "cal-SEgERCbTEKinGaJ";
const OUT_PATH = join(
  dirname(fileURLToPath(import.meta.url)),
  "..",
  "src",
  "data",
  "lumaPastEventsUtrecht.json",
);

const url = `https://api.lu.ma/calendar/get-items?calendar_api_id=${LUMA_CALENDAR_ID}&period=past&pagination_limit=50`;

const headers = { Accept: "application/json" };
if (process.env.LUMA_API_KEY) {
  headers.Authorization = `Bearer ${process.env.LUMA_API_KEY}`;
}

console.log(`Fetching past events from Luma (${LUMA_CALENDAR_ID})...`);
const res = await fetch(url, { headers });
if (!res.ok) {
  console.error(`Luma API returned ${res.status} ${res.statusText}`);
  process.exit(1);
}

const data = await res.json();
const fromApi = (data.entries ?? []).map(({ event }) => ({
  name: event.name,
  url: `https://lu.ma/${event.url}`,
  startAt: event.start_at,
}));

let existing = [];
if (existsSync(OUT_PATH)) {
  try {
    existing = JSON.parse(readFileSync(OUT_PATH, "utf8"));
    if (!Array.isArray(existing)) existing = [];
  } catch {
    existing = [];
  }
}

const apiUrls = new Set(fromApi.map((e) => e.url));
const merged = [...fromApi];
for (const row of existing) {
  if (row?.url && !apiUrls.has(row.url)) {
    merged.push({
      name: row.name,
      url: row.url,
      startAt: row.startAt,
    });
  }
}

merged.sort(
  (a, b) => new Date(b.startAt).getTime() - new Date(a.startAt).getTime(),
);

writeFileSync(OUT_PATH, JSON.stringify(merged, null, 2) + "\n");
console.log(
  `Wrote ${merged.length} event(s) (${fromApi.length} from API + kept non-Luma URLs).`,
);
if (fromApi.length === 0) {
  console.warn(
    "API returned no past events — off-calendar rows (e.g. LinkedIn) were preserved if present.",
  );
}
