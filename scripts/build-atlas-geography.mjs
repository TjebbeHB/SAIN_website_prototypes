#!/usr/bin/env node
/**
 * Build the two maps the homepage hero draws, from Natural Earth (public
 * domain), pinned to v5.1.2 so a rebuild never moves a coastline:
 *
 *   public/atlas/world.json            the globe: 1:50m countries, simplified
 *                                      for a sphere about 700px across, in
 *                                      [longitude, latitude].
 *   src/data/atlas/northSeaRegion.json the map under the hero: 1:10m countries,
 *                                      lakes and major rivers, clipped to
 *                                      north-west Europe and projected into a
 *                                      fixed Mercator frame as SVG paths.
 *
 * Downloads land in .cache/ (git-ignored) and are reused. Nothing here is
 * drawn by hand: every outline is the source geometry, clipped and simplified.
 *
 * Usage: npm run build-atlas-geography
 */
import { mkdir, readFile, writeFile, access } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const CACHE = join(ROOT, ".cache", "atlas-geography");
const SOURCE =
  "https://raw.githubusercontent.com/nvkelso/natural-earth-vector/v5.1.2/geojson/";

/* The region frame: north-west Europe, one map for both views. The hero fits
   the Netherlands into it; zooming out shows Oxford to Eindhoven and Paris to
   Groningen. A margin past those cities on every side keeps the frame's own
   edge out of view at either zoom. */
export const REGION = {
  bounds: { west: -4.8, south: 47.8, east: 9.0, north: 54.6 },
  width: 1600,
};

async function exists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

async function source(name) {
  const path = join(CACHE, name);
  if (!(await exists(path))) {
    console.log(`Downloading ${name}...`);
    const response = await fetch(SOURCE + name);
    if (!response.ok) {
      throw new Error(`${name}: ${response.status} ${response.statusText}`);
    }
    await mkdir(CACHE, { recursive: true });
    await writeFile(path, Buffer.from(await response.arrayBuffer()));
  }
  return JSON.parse(await readFile(path, "utf8"));
}

/* Douglas-Peucker on one ring or line, iterative so a long coastline cannot
   overflow the stack. `tolerance` is in the units of the points. */
function simplify(points, tolerance) {
  if (points.length <= 4) return points;
  const keep = new Uint8Array(points.length);
  keep[0] = keep[points.length - 1] = 1;
  const stack = [[0, points.length - 1]];
  const squared = tolerance * tolerance;
  while (stack.length) {
    const [first, last] = stack.pop();
    const [ax, ay] = points[first];
    const [bx, by] = points[last];
    const dx = bx - ax;
    const dy = by - ay;
    const length = dx * dx + dy * dy;
    let worst = 0;
    let index = -1;
    for (let i = first + 1; i < last; i++) {
      const [px, py] = points[i];
      let t = length ? ((px - ax) * dx + (py - ay) * dy) / length : 0;
      t = Math.max(0, Math.min(1, t));
      const ex = ax + t * dx - px;
      const ey = ay + t * dy - py;
      const distance = ex * ex + ey * ey;
      if (distance > worst) {
        worst = distance;
        index = i;
      }
    }
    if (worst > squared && index > 0) {
      keep[index] = 1;
      stack.push([first, index], [index, last]);
    }
  }
  return points.filter((_, i) => keep[i]);
}

function ringArea(ring) {
  let area = 0;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    area += (ring[j][0] - ring[i][0]) * (ring[j][1] + ring[i][1]);
  }
  return Math.abs(area / 2);
}

function polygonsOf(geometry) {
  if (!geometry) return [];
  if (geometry.type === "Polygon") return [geometry.coordinates];
  if (geometry.type === "MultiPolygon") return geometry.coordinates;
  return [];
}

function linesOf(geometry) {
  if (!geometry) return [];
  if (geometry.type === "LineString") return [geometry.coordinates];
  if (geometry.type === "MultiLineString") return geometry.coordinates;
  return [];
}

/* ---------------------------------------------------------------- globe -- */

/* Each ring is written as whole hundredths of a degree, every point after the
   first as the step from the one before: [lon0, lat0, dLon1, dLat1, ...].
   Steps along a coastline are small numbers, which is most of the saving;
   src/components/atlas/geo.ts reads it back into GeoJSON. */
function encodeRing(ring) {
  const out = [];
  let lastLon = 0;
  let lastLat = 0;
  for (const [lon, lat] of ring) {
    const x = Math.round(lon * 100);
    const y = Math.round(lat * 100);
    if (out.length && x === lastLon && y === lastLat) continue;
    out.push(x - lastLon, y - lastLat);
    lastLon = x;
    lastLat = y;
  }
  return out;
}

async function buildWorld() {
  const world = await source("ne_50m_admin_0_countries.geojson");
  const countries = [];
  let points = 0;
  for (const feature of world.features) {
    const name = feature.properties.NAME_EN ?? feature.properties.NAME;
    const polygons = [];
    for (const polygon of polygonsOf(feature.geometry)) {
      const [outer, ...holes] = polygon;
      /* Islands smaller than about 20 km across disappear on a sphere this
         size; dropping them halves the file without changing the picture. */
      if (ringArea(outer) < 0.04) continue;
      const rings = [outer, ...holes.filter((hole) => ringArea(hole) > 0.08)]
        .map((ring) => encodeRing(simplify(ring, 0.06)))
        .filter((ring) => ring.length >= 8);
      if (rings.length) {
        polygons.push(rings);
        points += rings.reduce((sum, ring) => sum + ring.length / 2, 0);
      }
    }
    if (polygons.length) countries.push({ name, polygons });
  }
  const out = join(ROOT, "public", "atlas", "world.json");
  await mkdir(dirname(out), { recursive: true });
  await writeFile(
    out,
    JSON.stringify({
      source: "Natural Earth 1:50m admin-0 countries v5.1.2 (public domain), simplified",
      encoding: "hundredths of a degree, delta-encoded per ring",
      countries,
    }),
  );
  console.log(`world.json: ${countries.length} countries, ${points} points`);
}

/* --------------------------------------------------------------- region -- */

const radians = Math.PI / 180;
const mercatorY = (lat) => Math.log(Math.tan(Math.PI / 4 + (lat * radians) / 2)) / radians;

function regionFrame() {
  const { west, east, north, south } = REGION.bounds;
  const scale = REGION.width / (east - west);
  const height = Math.round((mercatorY(north) - mercatorY(south)) * scale);
  return { ...REGION, scale, height };
}

/* Sutherland-Hodgman against the four bounds, in degrees. */
function clipRing(ring, { west, east, south, north }) {
  let points = ring.map((p) => [p[0], p[1]]);
  for (const [axis, limit, greater] of [
    [0, west, true],
    [0, east, false],
    [1, south, true],
    [1, north, false],
  ]) {
    const input = points;
    points = [];
    if (!input.length) break;
    let a = input[input.length - 1];
    let aIn = greater ? a[axis] >= limit : a[axis] <= limit;
    for (const b of input) {
      const bIn = greater ? b[axis] >= limit : b[axis] <= limit;
      if (aIn !== bIn) {
        const t = (limit - a[axis]) / (b[axis] - a[axis]);
        points.push([a[0] + t * (b[0] - a[0]), a[1] + t * (b[1] - a[1])]);
      }
      if (bIn) points.push(b);
      a = b;
      aIn = bIn;
    }
  }
  return points;
}

/* A line is cut where it leaves the frame, so a river that exits and comes
   back becomes two runs instead of a chord across the map. */
function clipLine(line, { west, east, south, north }) {
  const inside = ([lon, lat]) => lon >= west && lon <= east && lat >= south && lat <= north;
  const runs = [];
  let run = [];
  for (const point of line) {
    if (inside(point)) run.push(point);
    else if (run.length) {
      if (run.length > 1) runs.push(run);
      run = [];
    }
  }
  if (run.length > 1) runs.push(run);
  return runs;
}

function pathData(rings, close) {
  return rings
    .map(
      (ring) =>
        "M" + ring.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join("L") + (close ? "Z" : ""),
    )
    .join("");
}

async function buildRegion() {
  const frame = regionFrame();
  const { bounds, scale } = frame;
  const top = mercatorY(bounds.north);
  const project = ([lon, lat]) => [(lon - bounds.west) * scale, (top - mercatorY(lat)) * scale];
  /* Generous: a degree reaches past the frame, so a country whose only
     vertices lie outside it still clips into the corner it covers. */
  const near = {
    west: bounds.west - 1,
    east: bounds.east + 1,
    south: bounds.south - 1,
    north: bounds.north + 1,
  };
  const touches = (ring) =>
    ring.some(
      ([lon, lat]) => lon >= near.west && lon <= near.east && lat >= near.south && lat <= near.north,
    );

  const countries10 = await source("ne_10m_admin_0_countries_lakes.geojson");
  const countries = [];
  for (const feature of countries10.features) {
    const name = feature.properties.NAME_EN ?? feature.properties.NAME;
    const rings = [];
    for (const polygon of polygonsOf(feature.geometry)) {
      if (!touches(polygon[0])) continue;
      for (const ring of polygon) {
        const clipped = clipRing(ring, bounds);
        if (clipped.length < 3) continue;
        const projected = simplify(clipped.map(project), 0.3);
        if (projected.length >= 3 && ringArea(projected) > 2) rings.push(projected);
      }
    }
    if (rings.length) countries.push({ name, path: pathData(rings, true) });
  }

  const lakes10 = await source("ne_10m_lakes.geojson");
  const lakes = [];
  for (const feature of lakes10.features) {
    for (const polygon of polygonsOf(feature.geometry)) {
      if (!touches(polygon[0])) continue;
      const rings = polygon
        .map((ring) => clipRing(ring, bounds))
        .filter((ring) => ring.length >= 3)
        .map((ring) => simplify(ring.map(project), 0.35))
        .filter((ring) => ring.length >= 3 && ringArea(ring) > 4);
      if (rings.length) {
        lakes.push({ name: feature.properties.name ?? "Lake", path: pathData(rings, true) });
      }
    }
  }

  const rivers10 = await source("ne_10m_rivers_lake_centerlines.geojson");
  const rivers = [];
  for (const feature of rivers10.features) {
    /* Only the rivers a reader would name: the Rhine branches, the Maas,
       the IJssel, the Thames, the Scheldt. */
    if ((feature.properties.scalerank ?? 99) > 6) continue;
    const runs = linesOf(feature.geometry)
      .filter(touches)
      .flatMap((line) => clipLine(line, bounds))
      .map((run) => simplify(run.map(project), 0.5))
      .filter((run) => run.length > 1);
    if (runs.length) {
      rivers.push({ name: feature.properties.name ?? "River", path: pathData(runs, false) });
    }
  }

  const out = join(ROOT, "src", "data", "atlas", "northSeaRegion.json");
  await mkdir(dirname(out), { recursive: true });
  await writeFile(
    out,
    JSON.stringify(
      {
        source:
          "Natural Earth 1:10m admin-0 countries (lakes), lakes and rivers v5.1.2 (public domain), clipped and simplified",
        bounds,
        width: frame.width,
        height: frame.height,
        scale,
        countries,
        lakes,
        rivers,
      },
      null,
      0,
    ) + "\n",
  );
  console.log(
    `northSeaRegion.json: ${countries.length} countries, ${lakes.length} lakes, ${rivers.length} rivers, frame ${frame.width}x${frame.height}`,
  );
}

await buildWorld();
await buildRegion();
