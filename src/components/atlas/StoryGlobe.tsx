"use client";

import { memo, useEffect, useMemo, useRef } from "react";
import { geoGraticule10, geoInterpolate, geoOrthographic, geoPath } from "d3-geo";
import type { Feature, FeatureCollection, MultiPolygon } from "geojson";
import { arcPath, projectOrtho, type LonLat, type OrthoCamera } from "@/components/atlas/geo";

/* The globe. Land and sea are drawn on a canvas each frame (vector, so it
   stays sharp from the whole Earth down to the Dutch coast); the routes and
   the labelled pins sit in an SVG above it, positioned with the same
   projection, so they can animate and stay crisp.

   It draws whatever camera it is given. HeroAtlas decides where it looks. */

export type GlobePin = {
  id: string;
  name: string;
  place: string;
  coordinates: LonLat;
  /** -1 to the left of the anchor, 1 to the right, 0 centred. */
  side: number;
  /** 0 to 1, for the arrival animation. */
  presence: number;
};

export type GlobeArc = {
  id: string;
  from: LonLat;
  to: LonLat;
  /** 0 to 1: how much of the route has been drawn. */
  progress: number;
};

type Props = {
  world: FeatureCollection<MultiPolygon, { name: string }> | null;
  camera: OrthoCamera;
  width: number;
  height: number;
  pins: GlobePin[];
  arcs: GlobeArc[];
  /** Points that glow on the Netherlands: the chapters. */
  homes: LonLat[];
  /** 0 to 1: how strongly the Netherlands is lit up. */
  homeGlow: number;
  onPointerDown?: (event: React.PointerEvent<HTMLDivElement>) => void;
};

const graticule = geoGraticule10();

function StoryGlobe({ world, camera, width, height, pins, arcs, homes, homeGlow, onPointerDown }: Props) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const netherlands = useMemo<Feature<MultiPolygon> | undefined>(
    () => world?.features.find((feature) => feature.properties.name === "Netherlands"),
    [world],
  );

  useEffect(() => {
    const element = canvas.current;
    if (!element || !width || !height) return;
    const ratio = Math.min(2, window.devicePixelRatio || 1);
    if (element.width !== Math.round(width * ratio) || element.height !== Math.round(height * ratio)) {
      element.width = Math.round(width * ratio);
      element.height = Math.round(height * ratio);
    }
    const context = element.getContext("2d");
    if (!context) return;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    context.clearRect(0, 0, width, height);

    const { x, y, radius: r } = camera;
    const projection = geoOrthographic()
      .rotate([-camera.center[0], -camera.center[1]])
      .scale(r)
      .translate([x, y])
      .clipAngle(90)
      /* Past the edges nothing is drawn. Matters at the end of the dive into
         the Netherlands, where the sphere is a hundred times the screen. */
      .clipExtent([
        [-40, -40],
        [width + 40, height + 40],
      ])
      .precision(0.4);
    const path = geoPath(projection, context);

    /* Atmosphere: a thin cold halo outside the limb. */
    if (r < Math.max(width, height) * 1.6) {
      const halo = context.createRadialGradient(x, y, r * 0.94, x, y, r * 1.2);
      halo.addColorStop(0, "rgba(64, 146, 220, 0.26)");
      halo.addColorStop(0.35, "rgba(56, 138, 210, 0.08)");
      halo.addColorStop(1, "rgba(56, 138, 210, 0)");
      context.fillStyle = halo;
      context.beginPath();
      context.arc(x, y, r * 1.2, 0, Math.PI * 2);
      context.fill();
    }

    /* Sea, lit from the upper left. */
    const sea = context.createRadialGradient(x - r * 0.38, y - r * 0.46, r * 0.05, x, y, r * 1.02);
    sea.addColorStop(0, "#1d5487");
    sea.addColorStop(0.55, "#0b3366");
    sea.addColorStop(1, "#041d45");
    context.beginPath();
    path({ type: "Sphere" });
    context.fillStyle = sea;
    context.fill();

    context.beginPath();
    path(graticule);
    context.strokeStyle = "rgba(130, 172, 210, 0.11)";
    context.lineWidth = 0.6;
    context.stroke();

    if (world) {
      context.beginPath();
      path(world);
      context.fillStyle = "#1b5788";
      context.fill();
      context.strokeStyle = "rgba(112, 166, 206, 0.5)";
      context.lineWidth = 0.5;
      context.stroke();

      if (netherlands && homeGlow > 0) {
        context.beginPath();
        path(netherlands);
        context.fillStyle = `rgba(255, 128, 74, ${0.18 + 0.22 * homeGlow})`;
        context.fill();
        context.strokeStyle = `rgba(255, 150, 100, ${0.5 + 0.4 * homeGlow})`;
        context.lineWidth = 1.1;
        context.stroke();
      }
    }

    /* Shade: a soft terminator so the sphere reads as round. */
    const shade = context.createRadialGradient(x - r * 0.42, y - r * 0.5, 0, x - r * 0.1, y - r * 0.12, r * 1.18);
    shade.addColorStop(0, "rgba(255, 255, 255, 0.10)");
    shade.addColorStop(0.5, "rgba(255, 255, 255, 0)");
    shade.addColorStop(1, "rgba(0, 9, 32, 0.5)");
    context.beginPath();
    path({ type: "Sphere" });
    context.fillStyle = shade;
    context.fill();

    context.beginPath();
    path({ type: "Sphere" });
    context.strokeStyle = "rgba(126, 178, 222, 0.32)";
    context.lineWidth = 1.1;
    context.stroke();
  }, [world, netherlands, camera, width, height, homeGlow]);

  const visible = (point: { z: number }) => point.z > 0.04;

  return (
    <div className="absolute inset-0" onPointerDown={onPointerDown}>
      <canvas ref={canvas} className="absolute inset-0 size-full" aria-hidden="true" />
      <svg
        className="absolute inset-0 size-full overflow-visible"
        viewBox={`0 0 ${width || 1} ${height || 1}`}
        aria-hidden="true"
      >
        <g fill="none" strokeLinecap="round">
          {arcs.map((arc) => {
            const d = arcPath(geoInterpolate(arc.from, arc.to), camera);
            if (!d) return null;
            const drawn = Math.max(0, Math.min(1, arc.progress));
            return (
              <g key={arc.id}>
                <path d={d} pathLength={1} stroke="#ff6025" strokeOpacity={0.28} strokeWidth={7}
                  strokeDasharray="1 1" strokeDashoffset={1 - drawn} />
                <path d={d} pathLength={1} stroke="#ff8a55" strokeWidth={1.6}
                  strokeDasharray="1 1" strokeDashoffset={1 - drawn} />
                {drawn > 0.98 && (
                  <path className="atlas-flow" d={d} stroke="#ffe3cc" strokeWidth={2.2} strokeDasharray="0.012 0.07" pathLength={1} />
                )}
              </g>
            );
          })}
        </g>

        <g>
          {homes.map((home, i) => {
            const point = projectOrtho(home, camera);
            if (!visible(point)) return null;
            return (
              <g key={i} opacity={0.35 + 0.65 * homeGlow}>
                <circle cx={point.x} cy={point.y} r={9} fill="#ff6025" opacity={0.18} />
                <circle cx={point.x} cy={point.y} r={3.2} fill="#ffb48a" />
              </g>
            );
          })}
        </g>

        <g>
          {pins.map((pin) => {
            const point = projectOrtho(pin.coordinates, camera);
            if (!visible(point) || pin.presence <= 0) return null;
            const lift = 34 + 14 * (1 - pin.presence);
            const labelX = point.x + pin.side * 26;
            const labelY = point.y - lift;
            const width = Math.max(pin.name.length * 7.4, pin.place.length * 6.2) + 26;
            const left = pin.side < 0 ? labelX - width : pin.side > 0 ? labelX : labelX - width / 2;
            return (
              <g key={pin.id} opacity={pin.presence} style={{ transition: "opacity 300ms" }}>
                <line x1={point.x} y1={point.y} x2={labelX} y2={labelY + 22} stroke="#ffb48a" strokeOpacity={0.75} strokeWidth={1} />
                <circle cx={point.x} cy={point.y} r={11} fill="#ff6025" opacity={0.16} />
                <circle cx={point.x} cy={point.y} r={4} fill="#ff6025" stroke="#fff3e8" strokeWidth={1.2} />
                <rect x={left} y={labelY - 4} width={width} height={42} rx={6} fill="#f7f5f2" />
                <rect x={left} y={labelY - 4} width={4} height={42} rx={2} fill="#ff6025" />
                <text x={left + 14} y={labelY + 14} fill="#021c4d" fontSize={13.5} fontWeight={600} fontFamily="var(--font-poppins), sans-serif">
                  {pin.name}
                </text>
                <text x={left + 14} y={labelY + 30} fill="#021c4d" fillOpacity={0.62} fontSize={11} fontFamily="var(--font-poppins), sans-serif">
                  {pin.place}
                </text>
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
}

export default memo(StoryGlobe);
