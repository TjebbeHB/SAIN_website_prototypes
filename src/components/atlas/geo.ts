import type { Feature, FeatureCollection, MultiPolygon } from "geojson";
import region from "@/data/atlas/northSeaRegion.json";

/* Geometry shared by the globe and the Netherlands map. Coordinates are always
   [longitude, latitude]. Display offsets belong to markers and labels; these
   functions never move a place. */

export type LonLat = [number, number];

/* ------------------------------------------------------------------ world -- */

type EncodedWorld = { countries: { name: string; polygons: number[][][] }[] };

/* Reverses scripts/build-atlas-geography.mjs: hundredths of a degree, each
   point after the first stored as the step from the one before. */
export function decodeWorld(world: EncodedWorld): FeatureCollection<MultiPolygon, { name: string }> {
  const features: Feature<MultiPolygon, { name: string }>[] = world.countries.map((country) => ({
    type: "Feature",
    properties: { name: country.name },
    geometry: {
      type: "MultiPolygon",
      coordinates: country.polygons.map((rings) =>
        rings.map((ring) => {
          const points: LonLat[] = [];
          let lon = 0;
          let lat = 0;
          for (let i = 0; i < ring.length; i += 2) {
            lon += ring[i];
            lat += ring[i + 1];
            points.push([lon / 100, lat / 100]);
          }
          /* GeoJSON rings close on their first point. */
          const [first] = points;
          const last = points[points.length - 1];
          if (first[0] !== last[0] || first[1] !== last[1]) points.push([first[0], first[1]]);
          return points;
        }),
      ),
    },
  }));
  return { type: "FeatureCollection", features };
}

/* -------------------------------------------------------------- the globe -- */

const radians = Math.PI / 180;

export type OrthoCamera = {
  center: LonLat;
  /** Sphere radius in CSS pixels. */
  radius: number;
  /** Where the sphere's centre sits in the container, CSS pixels. */
  x: number;
  y: number;
};

export type ScreenPoint = { x: number; y: number; z: number };

/* The orthographic projection the canvas draws with (d3's geoOrthographic,
   rotated to the camera centre), in closed form so the SVG overlay can ask
   for depth as well: z > 0 is the hemisphere facing the reader. */
export function projectOrtho([lon, lat]: LonLat, camera: OrthoCamera): ScreenPoint {
  const lambda = (lon - camera.center[0]) * radians;
  const phi = lat * radians;
  const phi0 = camera.center[1] * radians;
  const cosPhi = Math.cos(phi);
  const sinPhi = Math.sin(phi);
  return {
    x: camera.x + camera.radius * cosPhi * Math.sin(lambda),
    y:
      camera.y -
      camera.radius * (Math.cos(phi0) * sinPhi - Math.sin(phi0) * cosPhi * Math.cos(lambda)),
    z: Math.sin(phi0) * sinPhi + Math.cos(phi0) * cosPhi * Math.cos(lambda),
  };
}

/* A great circle between two places, lifted off the sphere towards its middle
   so it reads as a route rather than a scratch on the surface. Split wherever
   it passes behind the globe, so no segment joins across the back. */
export function arcPath(
  interpolate: (t: number) => LonLat,
  camera: OrthoCamera,
  lift = 0.16,
  steps = 72,
): string {
  let path = "";
  let drawing = false;
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const point = projectOrtho(interpolate(t), camera);
    const raise = 1 + lift * Math.sin(Math.PI * t);
    /* A raised route can clear the horizon a little before the ground does. */
    const visible = point.z > -0.08 * Math.sin(Math.PI * t);
    if (!visible) {
      drawing = false;
      continue;
    }
    const x = camera.x + (point.x - camera.x) * raise;
    const y = camera.y + (point.y - camera.y) * raise;
    path += `${drawing ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`;
    drawing = true;
  }
  return path;
}

/* ------------------------------------------------------- the Netherlands -- */

export const regionFrame = {
  width: region.width,
  height: region.height,
  scale: region.scale,
  bounds: region.bounds,
};

const mercatorY = (lat: number) => Math.log(Math.tan(Math.PI / 4 + (lat * radians) / 2)) / radians;
const regionTop = mercatorY(region.bounds.north);

/** [longitude, latitude] to the region frame, the space the map's paths are in. */
export function projectRegion([lon, lat]: LonLat): [number, number] {
  return [(lon - region.bounds.west) * region.scale, (regionTop - mercatorY(lat)) * region.scale];
}

/* The part of the frame the map has to show whatever the container: the whole
   of the Netherlands, Wadden islands to Limburg. */
const nl = {
  west: projectRegion([3.25, 51.5])[0],
  east: projectRegion([7.28, 51.5])[0],
  north: projectRegion([5, 53.58])[1],
  south: projectRegion([5, 50.72])[1],
};
export const netherlandsCentre: LonLat = [5.3, 52.15];

export type MapView = { k: number; tx: number; ty: number };

/* Fit the Netherlands into a container, then place it: `focusX` is where its
   centre sits across the container (0.5 is the middle). The frame always
   covers the container, so a wide hero shows more North Sea rather than an
   edge of nothing. */
export function netherlandsView(
  width: number,
  height: number,
  { padding = 28, focusX = 0.56, focusY = 0.5 }: { padding?: number; focusX?: number; focusY?: number } = {},
): MapView {
  const fit = Math.min(
    (width - padding * 2) / (nl.east - nl.west),
    (height - padding * 2) / (nl.south - nl.north),
  );
  const cover = Math.max(width / region.width, height / region.height);
  const k = Math.max(fit, cover);
  const [cx, cy] = projectRegion(netherlandsCentre);
  let tx = width * focusX - cx * k;
  let ty = height * focusY - cy * k;
  /* Never pull the frame's own edge into view. */
  tx = Math.min(0, Math.max(width - region.width * k, tx));
  ty = Math.min(0, Math.max(height - region.height * k, ty));
  return { k, tx, ty };
}

/* The zoomed-out view: Oxford to Eindhoven across, Paris to Groningen top
   to bottom, with some sea and land around them, centred in the container. */
const northWest = {
  west: projectRegion([-1.75, 51])[0],
  east: projectRegion([7.4, 51])[0],
  north: projectRegion([3, 53.75])[1],
  south: projectRegion([3, 48.45])[1],
};
export function northWestEuropeView(width: number, height: number, padding = 28, leftInset = 0): MapView {
  const room = width - leftInset;
  const k = Math.max(
    Math.min((room - padding * 2) / (northWest.east - northWest.west), (height - padding * 2) / (northWest.south - northWest.north)),
    Math.max(width / region.width, height / region.height),
  );
  /* `leftInset` keeps Oxford clear of whatever overlaps the map's left edge
     (the hero's fade into the copy column). */
  let tx = leftInset + room / 2 - ((northWest.west + northWest.east) / 2) * k;
  let ty = height / 2 - ((northWest.north + northWest.south) / 2) * k;
  tx = Math.min(0, Math.max(width - region.width * k, tx));
  ty = Math.min(0, Math.max(height - region.height * k, ty));
  return { k, tx, ty };
}

/* The globe camera that lands exactly on a map view: the same centre on the
   same pixel, at the same scale. Mercator and the orthographic projection
   agree in shape at the centre, so the crossfade between them reads as one
   picture coming into focus. */
export function cameraForView(view: MapView, at: LonLat = netherlandsCentre): OrthoCamera {
  const [fx, fy] = projectRegion(at);
  const pixelsPerDegree = region.scale * view.k;
  return {
    center: at,
    radius: (pixelsPerDegree / radians) / Math.cos(at[1] * radians),
    x: view.tx + fx * view.k,
    y: view.ty + fy * view.k,
  };
}

/* ------------------------------------------------------------- motion -- */

export const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

export const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

export function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
