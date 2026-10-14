"use client";

/* eslint-disable jsx-a11y/role-supports-aria-props -- SVG markers are buttons with aria-pressed. */

import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { geoDistance, geoInterpolate } from "d3-geo";
import Link from "next/link";
import {
  ArrowSquareOutIcon,
  ArrowsOutCardinalIcon,
  MinusIcon,
  PlusIcon,
  XIcon,
  CornersInIcon,
  GlobeHemisphereWestIcon,
  MapPinIcon,
} from "@phosphor-icons/react/dist/ssr";
import region from "@/data/atlas/northSeaRegion.json";
import {
  NETWORK_ID,
  abroadNodes,
  allEcoNodes,
  ecoKindLabel,
  ecoLinks,
  ecoNodes,
  referenceCities,
  type EcoNode,
} from "@/data/atlas/ecosystem";
import { storyPlayers } from "@/data/atlas/story";
import {
  easeInOutCubic,
  netherlandsCentre,
  northWestEuropeView,
  projectRegion,
  type LonLat,
  type MapView,
} from "@/components/atlas/geo";
import type { AbroadNode, EcoLink } from "@/data/atlas/ecosystem";

/* The story's funders and curricula are organisations abroad too: on the
   zoomed-out map they sit in their cities like any other. */
const storyNodes: AbroadNode[] = storyPlayers
  .filter((player) => player.coordinates)
  .map((player) => ({
    id: player.id,
    name: player.name,
    kind: player.kind === "funding" ? "network" : "field",
    city: player.place,
    coordinates: player.coordinates,
    description: `${player.role}.`,
    href: player.href,
    source: player.source,
  }));
const storyLinks: EcoLink[] = storyPlayers.map((player) => ({
  from: player.id,
  to: player.to,
  strength: "strong",
  label: player.role,
  source: player.source,
}));
const mapAbroad: AbroadNode[] = [...abroadNodes, ...storyNodes];
const everyNode: AbroadNode[] = [...allEcoNodes, ...storyNodes];
const everyLink: EcoLink[] = [...ecoLinks, ...storyLinks];

/* Context for the zoomed-out map: cities with no organisation of their own. */
const wideCities: { name: string; coordinates: LonLat }[] = [
  { name: "Antwerp", coordinates: [4.40346, 51.21989] },
  { name: "Lille", coordinates: [3.05858, 50.63297] },
  { name: "Cologne", coordinates: [6.95, 50.93333] },
  { name: "Düsseldorf", coordinates: [6.77616, 51.22172] },
  { name: "Southampton", coordinates: [-1.40428, 50.90395] },
  { name: "Rouen", coordinates: [1.09932, 49.44313] },
];

/* The Netherlands, as the place the work happens: chapters, the
   organisations around them, and the lines between them.

   Geography (sea, land, lakes, rivers, the swell) is drawn in the region
   frame under one transform, so panning and zooming move it as a piece.
   Markers, labels and lines are placed in screen pixels on top, so they stay
   one size while the land grows under them.

   Moving parts, each with a job: the swell says "sea", the wind says the map
   is live, the flowing lines say which relationships are working ones. All of
   it stops under prefers-reduced-motion and while the hero is off screen. */

/* "future" is the story's look ahead (prospective lines); "all" is the
   explorable map, which shows the present only. */
export type Reveal = "none" | "origin" | "chapters" | "partners" | "future" | "all";
const revealOrder: Reveal[] = ["none", "origin", "chapters", "partners", "future", "all"];
const shows = (reveal: Reveal, from: Reveal) => revealOrder.indexOf(reveal) >= revealOrder.indexOf(from);

type Props = {
  width: number;
  height: number;
  baseView: MapView;
  reveal: Reveal;
  interactive: boolean;
  motion: boolean;
  showAbroad: boolean;
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  /** Leave room for the story card: the detail panel sits clear of it. */
  onExitExplore?: () => void;
};

const KIND_FILL: Record<EcoNode["kind"], string> = {
  chapter: "#ff6025",
  university: "#cfe0f5",
  research: "#8fc1ff",
  field: "#ffc98f",
  network: "#7fd6c2",
  government: "#ffffff",
};

const WAVE_LENGTH = 120;

/* Which side of its city a stack of organisations hangs on, zoomed out, so
   London's list reaches into the Channel rather than across Oxford's. */
const CITY_SIDE: Record<string, "left" | "right"> = {
  London: "right",
  Oxford: "left",
  "Cambridge, UK": "left",
  Paris: "right",
  Brussels: "right",
};

/* Sinusoidal swell lines across the whole frame, a wavelength wider than it so
   the slow drift loops without a seam. Land is drawn over them. */
function swellPaths() {
  const lines: string[] = [];
  for (let y = 18, row = 0; y < region.height; y += 26, row++) {
    const start = -WAVE_LENGTH * 2 + (row % 2) * (WAVE_LENGTH / 2);
    let d = `M${start} ${y}`;
    for (let x = start; x < region.width + WAVE_LENGTH * 2; x += WAVE_LENGTH) {
      d += `q${WAVE_LENGTH / 4} -3.2 ${WAVE_LENGTH / 2} 0t${WAVE_LENGTH / 2} 0`;
    }
    lines.push(d);
  }
  return lines;
}
const SWELL = swellPaths();

function curve(ax: number, ay: number, bx: number, by: number, bend = 0.18) {
  const mx = (ax + bx) / 2;
  const my = (ay + by) / 2;
  const dx = bx - ax;
  const dy = by - ay;
  return `M${ax.toFixed(1)} ${ay.toFixed(1)}Q${(mx - dy * bend).toFixed(1)} ${(my + dx * bend).toFixed(1)} ${bx.toFixed(1)} ${by.toFixed(1)}`;
}

function clampView(view: MapView, width: number, height: number, min: number, max: number): MapView {
  const k = Math.max(min, Math.min(max, view.k));
  const tx = Math.min(0, Math.max(width - region.width * k, view.tx));
  const ty = Math.min(0, Math.max(height - region.height * k, view.ty));
  return { k, tx, ty };
}

/* --------------------------------------------------------------- wind -- */

function useWind(canvas: React.RefObject<HTMLCanvasElement | null>, width: number, height: number, running: boolean) {
  useEffect(() => {
    const element = canvas.current;
    if (!element || !width || !height) return;
    const ratio = Math.min(2, window.devicePixelRatio || 1);
    element.width = Math.round(width * ratio);
    element.height = Math.round(height * ratio);
    const context = element.getContext("2d");
    if (!context) return;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    context.clearRect(0, 0, width, height);
    if (!running) return;

    const count = Math.round(Math.min(170, (width * height) / 5200));
    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      age: Math.random() * 160,
      life: 120 + Math.random() * 120,
    }));
    let frame = 0;
    let last = 0;
    const step = (now: number) => {
      frame = requestAnimationFrame(step);
      /* Thirty frames a second is plenty for a breeze. */
      if (now - last < 32) return;
      last = now;
      context.globalCompositeOperation = "destination-out";
      context.fillStyle = "rgba(0, 0, 0, 0.13)";
      context.fillRect(0, 0, width, height);
      context.globalCompositeOperation = "source-over";
      context.lineWidth = 1;
      context.lineCap = "round";
      const t = now * 0.00012;
      for (const p of particles) {
        /* Prevailing south-westerly, bent by two slow waves. */
        const angle =
          -0.32 + 0.38 * Math.sin(p.x * 0.0042 + t) + 0.26 * Math.cos(p.y * 0.0057 - t * 1.3);
        const speed = 0.85 + 0.45 * Math.sin(p.y * 0.003 + t * 2);
        const nx = p.x + Math.cos(angle) * speed * 1.6;
        const ny = p.y + Math.sin(angle) * speed * 1.6;
        const fade = Math.sin(Math.PI * Math.min(1, p.age / p.life));
        context.strokeStyle = `rgba(214, 232, 255, ${0.22 * fade})`;
        context.beginPath();
        context.moveTo(p.x, p.y);
        context.lineTo(nx, ny);
        context.stroke();
        p.x = nx;
        p.y = ny;
        p.age += 1;
        if (p.age > p.life || p.x > width + 10 || p.y < -10 || p.y > height + 10) {
          p.x = Math.random() * width * 0.9 - width * 0.05;
          p.y = Math.random() * height;
          p.age = 0;
          p.life = 120 + Math.random() * 120;
        }
      }
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [canvas, width, height, running]);
}

/* ---------------------------------------------------------------- map -- */

function NetherlandsAtlas({
  width,
  height,
  baseView,
  reveal,
  interactive,
  motion,
  showAbroad,
  selectedId,
  onSelect,
  onExitExplore,
}: Props) {
  const [view, setView] = useState<MapView>(baseView);
  const moved = useRef(false);
  const drag = useRef<{ x: number; y: number; view: MapView; id: number } | null>(null);
  const pinch = useRef<Map<number, { x: number; y: number }>>(new Map());
  const pinchStart = useRef<{ distance: number; view: MapView; cx: number; cy: number } | null>(null);
  const windCanvas = useRef<HTMLCanvasElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const [hint, setHint] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [openCity, setOpenCity] = useState<string | null>(null);

  /* Follow the container until the reader has moved the map themselves. */
  useEffect(() => {
    if (!moved.current) setView(baseView);
  }, [baseView]);
  useEffect(() => {
    if (!interactive) {
      moved.current = false;
      setView(baseView);
    }
  }, [interactive, baseView]);

  useWind(windCanvas, width, height, motion);

  const wideView = useMemo(
    () => northWestEuropeView(width || 1, height || 1, 28, width > 700 ? 80 : 0),
    [width, height],
  );
  const minK = Math.min(baseView.k * 0.92, wideView.k * 0.97);
  const maxK = baseView.k * 5.5;

  /* Between the Netherlands and north-west Europe the map flies rather than
     jumps, so the reader keeps hold of where the chapters went. */
  const flight = useRef<number | null>(null);
  const flyTo = useCallback(
    (target: MapView) => {
      moved.current = true;
      if (flight.current !== null) cancelAnimationFrame(flight.current);
      if (!motion) {
        setView(target);
        return;
      }
      let from: MapView | null = null;
      const started = performance.now();
      const step = (now: number) => {
        const t = easeInOutCubic(Math.min(1, (now - started) / 1100));
        setView((current) => {
          from = from ?? current;
          /* Scale in log space: a halving should take as long as a doubling. */
          const k = Math.exp(Math.log(from.k) + (Math.log(target.k) - Math.log(from.k)) * t);
          const ratio = (k - from.k) / (target.k - from.k || 1);
          return {
            k,
            tx: from.tx + (target.tx - from.tx) * (Number.isFinite(ratio) ? ratio : t),
            ty: from.ty + (target.ty - from.ty) * (Number.isFinite(ratio) ? ratio : t),
          };
        });
        flight.current = t < 1 ? requestAnimationFrame(step) : null;
      };
      flight.current = requestAnimationFrame(step);
    },
    [motion],
  );
  useEffect(() => () => {
    if (flight.current !== null) cancelAnimationFrame(flight.current);
  }, []);
  const zoomAt = useCallback(
    (factor: number, cx = width / 2, cy = height / 2) => {
      moved.current = true;
      setView((current) => {
        const k = Math.max(minK, Math.min(maxK, current.k * factor));
        const f = k / current.k;
        return clampView({ k, tx: cx - (cx - current.tx) * f, ty: cy - (cy - current.ty) * f }, width, height, minK, maxK);
      });
    },
    [width, height, minK, maxK],
  );
  const reset = () => {
    flyTo(baseView);
    moved.current = false;
  };

  /* ctrl/cmd + wheel (and a trackpad pinch, which arrives as one) zooms; a
     plain wheel keeps scrolling the page, with a hint the first time. */
  useEffect(() => {
    const element = stage.current;
    if (!element || !interactive) return;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const onWheel = (event: WheelEvent) => {
      if (!event.ctrlKey && !event.metaKey) {
        setHint(true);
        clearTimeout(timer);
        timer = setTimeout(() => setHint(false), 1600);
        return;
      }
      event.preventDefault();
      const rect = element.getBoundingClientRect();
      zoomAt(Math.exp(-event.deltaY * 0.004), event.clientX - rect.left, event.clientY - rect.top);
    };
    element.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      element.removeEventListener("wheel", onWheel);
      clearTimeout(timer);
    };
  }, [interactive, zoomAt]);

  const screen = useCallback(
    (coordinates: LonLat): [number, number] => {
      const [x, y] = projectRegion(coordinates);
      return [view.tx + x * view.k, view.ty + y * view.k];
    },
    [view],
  );

  /* Offsets in ecosystem.ts are drawn for a desktop hero. A phone shows the
     country at half that scale, so the cluster around a city shrinks with it;
     zooming in spreads it out again. */
  const compact = width < 640;
  const zoomedIn = view.k / baseView.k;
  const unit = Math.max(0.5, Math.min(1.35, baseView.k / 0.84));
  const spread = Math.min(2.2, 1 + (zoomedIn - 1) * 0.45) * unit;
  /* On a phone, partner names wait until the reader zooms in or picks one.
     Zoomed out to north-west Europe, the Dutch partners become dots. */
  const partnerLabels = !compact || zoomedIn > 1.5;
  const wide = zoomedIn < 0.8;

  const positions = useMemo(() => {
    const map = new Map<string, [number, number]>();
    for (const node of ecoNodes) {
      const [x, y] = screen(node.coordinates);
      const [dx, dy] = node.offset ?? [0, 0];
      map.set(node.id, [x + dx * spread, y + dy * spread]);
    }
    const chapters = ecoNodes.filter((node) => node.kind === "chapter").map((node) => map.get(node.id)!);
    map.set(NETWORK_ID, [
      chapters.reduce((sum, [x]) => sum + x, 0) / chapters.length,
      chapters.reduce((sum, [, y]) => sum + y, 0) / chapters.length,
    ]);
    return map;
  }, [screen, spread]);

  const nodeShown = (node: EcoNode) => {
    if (node.kind === "chapter") {
      return node.id === "sain-groningen" ? shows(reveal, "origin") : shows(reveal, "chapters");
    }
    return shows(reveal, "partners");
  };

  /* Links to the foundation as a whole land on the middle of the country,
     where every other line already crosses; they are drawn only while one of
     their ends is selected, and listed in its details either way. */
  const visibleLinks = ecoLinks.filter((link) => {
    if (link.strength === "prospective") return reveal === "future";
    if (link.to === NETWORK_ID && selectedId !== link.from) return false;
    /* Links from abroad are drawn as routes, below. */
    const from = ecoNodes.find((node) => node.id === link.from);
    if (!from) return false;
    const national = from.kind === "chapter";
    return national ? shows(reveal, "chapters") : shows(reveal, "partners");
  });

  /* Routes from abroad, entering from where they really come from: each is
     the last stretch of the great circle from its city, in this map's
     projection, ending on the chapter it serves. */
  const abroad = useMemo(() => {
    if (!showAbroad || !shows(reveal, "partners")) return [];
    /* The story's funders and curricula, then any organisation abroad with a
       line to a chapter. */
    const routes = [
      ...storyPlayers.map((player) => ({ id: player.id, place: player.place, name: player.name, origin: player.coordinates, to: player.to })),
      /* Working relationships abroad always; people in common only while
         the organisation is selected, as at home. */
      ...ecoLinks.flatMap((link) => {
        const node = abroadNodes.find((item) => item.id === link.from && item.coordinates);
        if (!node || (link.strength !== "strong" && selectedId !== node.id)) return [];
        return [{ id: `${node.id}-${link.to}`, place: node.city, name: node.name, origin: node.coordinates, to: link.to }];
      }),
    ];
    return routes.flatMap((player) => {
      const end = positions.get(player.to);
      if (!end) return [];
      const target = ecoNodes.find((node) => node.id === player.to)?.coordinates ?? ([5.6, 52.5] as LonLat);
      /* No mapped city: come in from the Atlantic, where any route from the
         Americas would. */
      const origin: LonLat = player.origin ?? [-75, 40];
      const interpolate = geoInterpolate(origin, target);
      /* The last twelve degrees of the route (about 1,300 km), or all of it
         when the origin is closer than that, as London is. */
      const start = Math.max(0, 1 - 12 / (geoDistance(origin, target) * (180 / Math.PI)));
      const points: [number, number][] = [];
      for (let i = 0; i <= 48; i++) {
        const t = start + (i / 48) * (1 - start);
        points.push(screen(interpolate(t)));
      }
      /* Bend the last point onto the marker, which may sit off its anchor. */
      const [lx, ly] = points[points.length - 1];
      const [ex, ey] = end;
      const adjusted = points.map(([x, y], i) => {
        const w = Math.pow(i / (points.length - 1), 3);
        return [x + (ex - lx) * w, y + (ey - ly) * w] as [number, number];
      });
      const firstIn = adjusted.find(([x, y]) => x > 12 && y > 12 && x < width - 12 && y < height - 12);
      return [
        {
          id: player.id,
          place: player.place,
          name: player.name,
          d: "M" + adjusted.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join("L"),
          label: firstIn,
        },
      ];
    });
  }, [showAbroad, reveal, positions, screen, width, height, selectedId]);

  const abroadLabels = useMemo(() => {
    const byPlace = new Map<string, { place: string; at: [number, number] }>();
    for (const route of abroad) {
      const home = mapAbroad.find((node) => node.city === route.place)?.coordinates;
      const [hx, hy] = home ? screen(home) : [-1, -1];
      const onMap = hx > 0 && hy > 0 && hx < width && hy < height;
      if (route.label && !onMap && !byPlace.has(route.place)) byPlace.set(route.place, { place: route.place, at: route.label });
    }
    return Array.from(byPlace.values());
  }, [abroad, screen, width, height]);

  /* Organisations abroad wait at the edge of the map, in the direction of
     their city, with an arrow for the rest of the way; online programmes
     are listed together in the top corner. Stacked so no two overlap. */
  const edgeMarkers = useMemo(() => {
    /* The story stays on the Netherlands; the reader exploring sees the
       wider network. One marker per city, opened with a click. */
    if (!interactive || !shows(reveal, "partners")) return [];
    const margin = 20;
    const groups = new Map<string, { city: string; nodes: AbroadNode[]; coordinates: [number, number] | null }>();
    for (const node of mapAbroad) {
      if (node.coordinates) {
        const [hx, hy] = screen(node.coordinates);
        if (hx > 24 && hy > 24 && hx < width - 24 && hy < height - 24) continue;
      }
      const group = groups.get(node.city) ?? { city: node.city, nodes: [], coordinates: node.coordinates };
      group.nodes.push(node);
      groups.set(node.city, group);
    }
    const placed: {
      city: string;
      nodes: AbroadNode[];
      x: number;
      y: number;
      angle: number | null;
      side: "left" | "right";
    }[] = [];
    let online = 0;
    for (const group of Array.from(groups.values())) {
      if (!group.coordinates) {
        placed.push({ ...group, x: margin, y: margin + 34 + online++ * 28, angle: null, side: "left" });
        continue;
      }
      /* Direction is the great circle out of the Netherlands, so a marker
         points where its route arrives from: Denver lies over the North Sea
         and Scotland, not off the bottom-left of a flat map. */
      const away = geoDistance(netherlandsCentre, group.coordinates) * (180 / Math.PI);
      const toward = geoInterpolate(netherlandsCentre, group.coordinates)(Math.min(1, 12 / Math.max(away, 0.001)));
      const [px, py] = screen(toward);
      const x = Math.max(margin, Math.min(width - margin, px));
      /* Clear of the zoom buttons above and the buttons below. */
      const y = Math.max(margin + 90, Math.min(height - 120, py));
      placed.push({ ...group, x, y, angle: Math.atan2(py - y, px - x), side: x > width / 2 ? "right" : "left" });
    }
    const located = placed.filter((item) => item.angle !== null).sort((a, b) => a.y - b.y);
    for (let i = 1; i < located.length; i++) {
      const previous = located[i - 1];
      if (Math.abs(located[i].x - previous.x) < 160 && located[i].y < previous.y + 28) located[i].y = previous.y + 28;
    }
    return placed;
  }, [reveal, interactive, screen, width, height]);

  /* Organisations abroad that fall inside the view when zoomed out: grouped
     by city, stacked beside a city caption. */
  const cityStacks = useMemo(() => {
    if (!interactive || !shows(reveal, "partners")) return [];
    const groups = new Map<string, { city: string; x: number; y: number; nodes: AbroadNode[] }>();
    for (const node of mapAbroad) {
      if (!node.coordinates) continue;
      const [x, y] = screen(node.coordinates);
      if (x < 24 || y < 24 || x > width - 24 || y > height - 24) continue;
      const group = groups.get(node.city) ?? { city: node.city, x, y, nodes: [] };
      group.nodes.push(node);
      groups.set(node.city, group);
    }
    return Array.from(groups.values());
  }, [reveal, interactive, screen, width, height]);

  const selected = everyNode.find((node) => node.id === selectedId) ?? null;
  const related = new Set(
    selected
      ? everyLink.filter((link) => link.from === selected.id || link.to === selected.id).flatMap((link) => [link.from, link.to])
      : [],
  );
  const dimmed = (id: string) => !!selected && id !== selected.id && !related.has(id);

  /* -------- pointer: drag to pan, two fingers to pinch -------- */
  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!interactive) return;
    if ((event.target as Element).closest("[data-atlas-node],button,a")) return;
    pinch.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
    event.currentTarget.setPointerCapture(event.pointerId);
    if (pinch.current.size === 2) {
      const [a, b] = Array.from(pinch.current.values());
      const rect = event.currentTarget.getBoundingClientRect();
      pinchStart.current = {
        distance: Math.hypot(a.x - b.x, a.y - b.y),
        view,
        cx: (a.x + b.x) / 2 - rect.left,
        cy: (a.y + b.y) / 2 - rect.top,
      };
      drag.current = null;
    } else {
      drag.current = { x: event.clientX, y: event.clientY, view, id: event.pointerId };
    }
  };
  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!interactive || !pinch.current.has(event.pointerId)) return;
    pinch.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
    if (pinch.current.size === 2 && pinchStart.current) {
      const [a, b] = Array.from(pinch.current.values());
      const start = pinchStart.current;
      const k = Math.max(minK, Math.min(maxK, start.view.k * (Math.hypot(a.x - b.x, a.y - b.y) / start.distance)));
      const f = k / start.view.k;
      moved.current = true;
      setView(
        clampView(
          { k, tx: start.cx - (start.cx - start.view.tx) * f, ty: start.cy - (start.cy - start.view.ty) * f },
          width,
          height,
          minK,
          maxK,
        ),
      );
      return;
    }
    const start = drag.current;
    if (!start || start.id !== event.pointerId) return;
    moved.current = true;
    setView(
      clampView(
        { k: start.view.k, tx: start.view.tx + event.clientX - start.x, ty: start.view.ty + event.clientY - start.y },
        width,
        height,
        minK,
        maxK,
      ),
    );
  };
  const onPointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    pinch.current.delete(event.pointerId);
    if (pinch.current.size < 2) pinchStart.current = null;
    if (drag.current?.id === event.pointerId) drag.current = null;
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!interactive || event.target !== event.currentTarget) return;
    const pan: Record<string, [number, number]> = {
      ArrowLeft: [60, 0],
      ArrowRight: [-60, 0],
      ArrowUp: [0, 60],
      ArrowDown: [0, -60],
    };
    if (pan[event.key]) {
      event.preventDefault();
      moved.current = true;
      const [dx, dy] = pan[event.key];
      setView((current) => clampView({ ...current, tx: current.tx + dx, ty: current.ty + dy }, width, height, minK, maxK));
    } else if (event.key === "+" || event.key === "=") {
      event.preventDefault();
      zoomAt(1.25);
    } else if (event.key === "-") {
      event.preventDefault();
      zoomAt(1 / 1.25);
    } else if (event.key === "0" || event.key === "Home") {
      event.preventDefault();
      reset();
    } else if (event.key === "Escape") {
      onSelect(null);
    }
  };

  const transform = `translate(${view.tx.toFixed(2)} ${view.ty.toFixed(2)}) scale(${view.k.toFixed(5)})`;
  const label = (x: number, y: number) => projectRegion([x, y]);
  const [northSeaX, northSeaY] = label(3.0, 53.25);
  const [englandX, englandY] = label(1.15, 52.45);
  const [belgiumX, belgiumY] = label(4.55, 50.82);
  const [germanyX, germanyY] = label(7.72, 51.62);
  const [lakeX, lakeY] = label(5.38, 52.78);
  const [franceX, franceY] = label(2.9, 49.45);
  const [channelX, channelY] = label(-0.9, 50.35);
  const [netherlandsX, netherlandsY] = label(5.75, 52.95);

  return (
    <div
      ref={stage}
      className={`atlas-map absolute inset-0 overflow-hidden ${interactive ? "is-exploring" : ""} ${motion ? "" : "is-still"}`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onKeyDown={onKeyDown}
      tabIndex={interactive ? 0 : -1}
      role={interactive ? "application" : undefined}
      aria-roledescription={interactive ? "map" : undefined}
      aria-label={
        interactive
          ? "Map of SAIN in the Netherlands. Drag or use the arrow keys to move, plus and minus to zoom. Tab to the chapters and organisations for details."
          : undefined
      }
    >
      <svg className="absolute inset-0 size-full" viewBox={`0 0 ${width || 1} ${height || 1}`} aria-hidden={!interactive}>
        <defs>
          <radialGradient id="atlas-sea" cx="38%" cy="34%" r="85%">
            <stop offset="0" stopColor="#11406b" />
            <stop offset="0.6" stopColor="#072a57" />
            <stop offset="1" stopColor="#031a3f" />
          </radialGradient>
          <linearGradient id="atlas-land" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#235f8f" />
            <stop offset="1" stopColor="#123f6d" />
          </linearGradient>
          <linearGradient id="atlas-land-near" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#123d66" />
            <stop offset="1" stopColor="#0c2f57" />
          </linearGradient>
          <radialGradient id="atlas-vignette" cx="55%" cy="50%" r="75%">
            <stop offset="0.6" stopColor="#010f2b" stopOpacity="0" />
            <stop offset="1" stopColor="#010f2b" stopOpacity="0.55" />
          </radialGradient>
        </defs>

        <rect width={width} height={height} fill="url(#atlas-sea)" />

        <g transform={transform}>
          <g className="atlas-swell" fill="none" stroke="#9cc6ec" strokeOpacity="0.13" strokeWidth="1" vectorEffect="non-scaling-stroke">
            {SWELL.map((d, i) => (
              <path key={i} d={d} vectorEffect="non-scaling-stroke" />
            ))}
          </g>
          <g className="atlas-swell atlas-swell--slow" fill="none" stroke="#9cc6ec" strokeOpacity="0.07" strokeWidth="1">
            {SWELL.filter((_, i) => i % 2 === 0).map((d, i) => (
              <path key={i} d={d} transform="translate(40 13)" vectorEffect="non-scaling-stroke" />
            ))}
          </g>

          {region.countries.map((country) => {
            const home = country.name === "Netherlands";
            return (
              <path
                key={country.name}
                d={country.path}
                fill={home ? "url(#atlas-land)" : "url(#atlas-land-near)"}
                stroke={home ? "#7fb0d6" : "#3d6489"}
                strokeOpacity={home ? 0.9 : 0.75}
                strokeWidth={home ? 1.3 : 0.9}
                vectorEffect="non-scaling-stroke"
                fillRule="evenodd"
              />
            );
          })}
          {region.lakes.map((lake, i) => (
            <path key={i} d={lake.path} fill="#0b3461" stroke="#6b9cc4" strokeOpacity="0.7" strokeWidth="0.9" vectorEffect="non-scaling-stroke" fillRule="evenodd" />
          ))}
          <g fill="none" stroke="#7fb3df" strokeOpacity="0.32" strokeWidth="1.1" strokeLinejoin="round">
            {region.rivers.map((river, i) => (
              <path key={i} d={river.path} vectorEffect="non-scaling-stroke" />
            ))}
          </g>
        </g>

        <rect width={width} height={height} fill="url(#atlas-vignette)" pointerEvents="none" />

        <g className="atlas-geo-labels" pointerEvents="none">
          <text x={view.tx + northSeaX * view.k} y={view.ty + northSeaY * view.k} className="atlas-sea-label">
            NORTH SEA
          </text>
          <text x={view.tx + englandX * view.k} y={view.ty + englandY * view.k}>ENGLAND</text>
          <text x={view.tx + belgiumX * view.k} y={view.ty + belgiumY * view.k}>BELGIUM</text>
          <text x={view.tx + germanyX * view.k} y={view.ty + germanyY * view.k}>GERMANY</text>
          {wide ? (
            <>
              <text x={view.tx + franceX * view.k} y={view.ty + franceY * view.k}>FRANCE</text>
              <text x={view.tx + channelX * view.k} y={view.ty + channelY * view.k} className="atlas-sea-label">
                ENGLISH CHANNEL
              </text>
              <text x={view.tx + netherlandsX * view.k} y={view.ty + netherlandsY * view.k}>NETHERLANDS</text>
            </>
          ) : (
            <text x={view.tx + lakeX * view.k} y={view.ty + lakeY * view.k} className="atlas-lake-label">
              IJsselmeer
            </text>
          )}
        </g>

        <g pointerEvents="none">
          {(wide ? wideCities : referenceCities).map((city) => {
            const [x, y] = screen(city.coordinates);
            return (
              <g key={city.name} className="atlas-city">
                <circle cx={x} cy={y} r={2.2} />
                {partnerLabels && (
                  <text x={x + 6} y={y + 4}>
                    {city.name}
                  </text>
                )}
              </g>
            );
          })}
        </g>

        {/* Routes from abroad, under everything that happens at home. */}
        <g fill="none" pointerEvents="none" className="atlas-abroad">
          {abroad.map((route) => (
            <g key={route.id} className="atlas-link-in">
              <path d={route.d} stroke="#ff9a68" strokeOpacity="0.38" strokeWidth="1" />
              <path className="atlas-flow-px" d={route.d} stroke="#ffd2b6" strokeOpacity="0.75" strokeWidth="1.6" strokeDasharray="2.5 26" />
            </g>
          ))}
          {/* While exploring, the edge markers name the cities instead. */}
          {!compact && !interactive && abroadLabels.map((item) => (
            <text key={item.place} x={item.at[0] + 4} y={item.at[1] - 8} className="atlas-abroad-label">
              From {item.place}
            </text>
          ))}
        </g>

        <g fill="none" pointerEvents="none">
          {visibleLinks.map((link) => {
            const a = positions.get(link.from);
            const b = positions.get(link.to);
            if (!a || !b) return null;
            const d = curve(a[0], a[1], b[0], b[1], link.to === NETWORK_ID ? 0.12 : 0.2);
            const quiet = selected ? !(related.has(link.from) && related.has(link.to)) : false;
            const key = `${link.from}-${link.to}`;
            if (link.strength === "prospective") {
              return (
                <path
                  key={key}
                  d={d}
                  className="atlas-link-in"
                  stroke="#ff9a68"
                  strokeOpacity="0.85"
                  strokeWidth="1.8"
                  strokeDasharray="7 7"
                  strokeLinecap="round"
                />
              );
            }
            if (link.strength === "shared") {
              return (
                <path
                  key={key}
                  d={d}
                  className="atlas-link-in"
                  stroke="#d6e4f5"
                  strokeOpacity={quiet ? 0.12 : 0.55}
                  strokeWidth="1.3"
                  strokeDasharray="1.5 5"
                  strokeLinecap="round"
                />
              );
            }
            return (
              <g key={key} className="atlas-link-in" opacity={quiet ? 0.25 : 1}>
                <path d={d} stroke="#ff6025" strokeOpacity="0.28" strokeWidth="7" strokeLinecap="round" />
                <path d={d} stroke="#ff8a55" strokeWidth="1.8" strokeLinecap="round" />
                <path className="atlas-flow-px" d={d} stroke="#fff0e2" strokeWidth="2.2" strokeLinecap="round" strokeDasharray="2.5 26" />
              </g>
            );
          })}
        </g>

        {/* The foundation's name, at the middle of its three chapters, while
            the story is introducing them; after that the country fills up
            and the label would only sit under other markers. */}
        {!compact && (reveal === "chapters" || reveal === "future" || (selectedId && ecoLinks.some((link) => link.from === selectedId && link.to === NETWORK_ID))) && (
          <g pointerEvents="none" className="atlas-network-label atlas-fade-in">
            <text x={positions.get(NETWORK_ID)![0]} y={positions.get(NETWORK_ID)![1] + 4} textAnchor="middle">
              SAFE AI NETHERLANDS
            </text>
          </g>
        )}

        <g>
          {ecoNodes.filter(nodeShown).map((node) => {
            const [x, y] = positions.get(node.id)!;
            const chapter = node.kind === "chapter";
            const isSelected = selected?.id === node.id;
            const side = node.labelSide ?? "right";
            const name = node.short ?? node.name;
            const pin = compact ? 15 : 21;
            const lx = side === "left" ? x - (chapter ? pin + 9 : 13) : side === "right" ? x + (chapter ? pin + 9 : 13) : x;
            const ly = side === "above" ? y - (chapter ? pin + 11 : 14) : side === "below" ? y + (chapter ? pin + 21 : 24) : y + 5;
            const ahead = reveal === "future" && ecoLinks.some((link) => link.strength === "prospective" && link.from === node.id);
            const labelled =
              chapter ||
              isSelected ||
              ahead ||
              hoveredId === node.id ||
              (partnerLabels && !wide && zoomedIn >= (node.labelFrom ?? 0));
            const anchor = side === "left" ? "end" : side === "right" ? "start" : "middle";
            return (
              <g
                key={node.id}
                data-atlas-node
                className={`atlas-node atlas-fade-in ${chapter ? "atlas-node--chapter" : ""} ${isSelected ? "is-selected" : ""}`}
                opacity={dimmed(node.id) ? 0.35 : 1}
                role={interactive ? "button" : undefined}
                tabIndex={interactive ? 0 : -1}
                aria-pressed={interactive ? isSelected : undefined}
                aria-label={interactive ? `${node.name}, ${ecoKindLabel[node.kind]} in ${node.city}` : undefined}
                onClick={() => interactive && onSelect(isSelected ? null : node.id)}
                onMouseEnter={() => setHoveredId(node.id)}
                onMouseLeave={() => setHoveredId(null)}
                onFocus={() => setHoveredId(node.id)}
                onBlur={() => setHoveredId(null)}
                onKeyDown={(event) => {
                  if (!interactive) return;
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    onSelect(isSelected ? null : node.id);
                  }
                }}
              >
                <circle cx={x} cy={y} r={chapter ? pin + 9 : 16} fill="transparent" />
                {chapter ? (
                  <>
                    {motion && <circle className="atlas-pulse" cx={x} cy={y} r={pin + 1} fill="#ff6025" />}
                    <circle cx={x} cy={y} r={isSelected ? pin + 3 : pin} fill="#f7f5f2" stroke="#ff6025" strokeWidth={isSelected ? 3.5 : 2.5} />
                    <image href="/sain-symbol.svg" x={x - pin * 0.72} y={y - pin * 0.72} width={pin * 1.44} height={pin * 1.44} />
                  </>
                ) : (
                  <>
                    <circle cx={x} cy={y} r={11} fill={KIND_FILL[node.kind]} opacity={0.16} />
                    <circle
                      cx={x}
                      cy={y}
                      r={isSelected ? 7.5 : 6}
                      fill={node.kind === "government" ? "#021c4d" : KIND_FILL[node.kind]}
                      stroke={node.kind === "government" ? "#ffffff" : "#021c4d"}
                      strokeWidth={node.kind === "government" ? 2 : 1.6}
                    />
                  </>
                )}
                {labelled && (
                  <text
                    x={lx}
                    y={ly}
                    textAnchor={anchor}
                    className={chapter ? "atlas-label atlas-label--chapter" : "atlas-label"}
                    style={compact ? { fontSize: chapter ? 14 : 11.5 } : undefined}
                  >
                    {compact && chapter ? node.city : name}
                  </text>
                )}
                {chapter && node.id === "sain-groningen" && reveal === "origin" && (
                  <text x={lx} y={ly + 18} textAnchor={anchor} className="atlas-label atlas-label--note">
                    AISIG, 2023
                  </text>
                )}
              </g>
            );
          })}
        </g>

        {/* Zoomed out: the organisations abroad in their own cities. */}
        <g>
          {cityStacks.map((group) => {
            const left = (CITY_SIDE[group.city] ?? (group.x < width * 0.45 ? "left" : "right")) === "left";
            const gap = 21;
            const top = group.y - ((group.nodes.length - 1) * gap) / 2;
            return (
              <g key={group.city} className="atlas-fade-in">
                <circle cx={group.x} cy={group.y} r={3} fill="#a8c4dd" fillOpacity={0.7} pointerEvents="none" />
                <text
                  x={group.x + (left ? -14 : 14)}
                  y={top - 16}
                  textAnchor={left ? "end" : "start"}
                  className="atlas-abroad-label"
                  pointerEvents="none"
                >
                  {group.city}
                </text>
                {group.nodes.map((node, i) => {
                  const x = group.x + (left ? -14 : 14);
                  const y = top + i * gap;
                  const isSelected = selected?.id === node.id;
                  return (
                    <g
                      key={node.id}
                      data-atlas-node
                      className="atlas-node"
                      opacity={dimmed(node.id) ? 0.35 : 1}
                      role={interactive ? "button" : undefined}
                      tabIndex={interactive ? 0 : -1}
                      aria-pressed={interactive ? isSelected : undefined}
                      aria-label={interactive ? `${node.name}, ${node.city}` : undefined}
                      onClick={() => interactive && onSelect(isSelected ? null : node.id)}
                      onMouseEnter={() => setHoveredId(node.id)}
                      onMouseLeave={() => setHoveredId(null)}
                      onKeyDown={(event) => {
                        if (!interactive) return;
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          onSelect(isSelected ? null : node.id);
                        }
                      }}
                    >
                      <line x1={group.x} y1={group.y} x2={x} y2={y} stroke="#93b5c5" strokeOpacity={0.45} strokeWidth={1} />
                      <circle cx={x} cy={y} r={12} fill="transparent" />
                      <circle
                        cx={x}
                        cy={y}
                        r={isSelected ? 6.5 : 5}
                        fill={KIND_FILL[node.kind]}
                        stroke="#021c4d"
                        strokeWidth={1.6}
                      />
                      <text x={x + (left ? -11 : 11)} y={y + 4} textAnchor={left ? "end" : "start"} className="atlas-label" style={{ fontSize: 12 }}>
                        {node.short ?? node.name}
                      </text>
                    </g>
                  );
                })}
              </g>
            );
          })}
        </g>

        {edgeMarkers.some((item) => item.angle === null) && (
          <text x={20} y={44} className="atlas-abroad-label" pointerEvents="none">
            Online
          </text>
        )}
        <g>
          {edgeMarkers.map(({ city, nodes, x, y, angle, side }) => {
            const single = nodes.length === 1 ? nodes[0] : null;
            const open = openCity === city;
            const textX = side === "left" ? x + 14 : x - 14;
            const anchor = side === "left" ? "start" : "end";
            const hereSelected = nodes.some((node) => node.id === selected?.id);
            const activate = () => {
              if (single) onSelect(selected?.id === single.id ? null : single.id);
              else setOpenCity(open ? null : city);
            };
            return (
              <g key={city} className="atlas-fade-in">
                <g
                  data-atlas-node
                  className="atlas-node"
                  opacity={selected && !hereSelected && !nodes.some((node) => related.has(node.id)) ? 0.35 : 1}
                  role="button"
                  tabIndex={0}
                  aria-expanded={single ? undefined : open}
                  aria-label={single ? `${single.name}, ${city}` : `${nodes.length} organisations in ${city}`}
                  onClick={activate}
                  onMouseEnter={() => single && setHoveredId(single.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      activate();
                    }
                  }}
                >
                  <circle cx={x} cy={y} r={14} fill="transparent" />
                  {angle !== null && (
                    <path
                      d={`M${x} ${y}l${(Math.cos(angle) * 12).toFixed(1)} ${(Math.sin(angle) * 12).toFixed(1)}`}
                      stroke="#ffb48a"
                      strokeWidth={1.6}
                      strokeLinecap="round"
                    />
                  )}
                  <circle
                    cx={x}
                    cy={y}
                    r={hereSelected ? 6.5 : 5}
                    fill={single ? KIND_FILL[single.kind] : "#f7f5f2"}
                    stroke="#021c4d"
                    strokeWidth={1.6}
                    strokeDasharray={angle === null ? "2 2" : undefined}
                  />
                  {/* On the right edge the name sits above its dot, clear of the
                      country the marker is pointing past. */}
                  <text x={side === "left" ? textX : x + 4} y={side === "left" ? y + 4 : y - 11} textAnchor={anchor} className="atlas-label" style={{ fontSize: 11.5 }}>
                    {single ? `${single.short ?? single.name}${hoveredId === single.id ? ` · ${city}` : ""}` : `${city} · ${nodes.length} ${open ? "−" : "+"}`}
                  </text>
                </g>
                {open &&
                  nodes.map((node, i) => {
                    const rowY = y + 22 * (i + 1);
                    const isSelected = selected?.id === node.id;
                    return (
                      <g
                        key={node.id}
                        data-atlas-node
                        className="atlas-node"
                        role="button"
                        tabIndex={0}
                        aria-pressed={isSelected}
                        aria-label={`${node.name}, ${city}`}
                        onClick={() => onSelect(isSelected ? null : node.id)}
                        onKeyDown={(event) => {
                          if (event.key === "Enter" || event.key === " ") {
                            event.preventDefault();
                            onSelect(isSelected ? null : node.id);
                          }
                        }}
                      >
                        <circle cx={textX + (side === "left" ? 6 : -6)} cy={rowY} r={10} fill="transparent" />
                        <circle cx={textX + (side === "left" ? 6 : -6)} cy={rowY} r={isSelected ? 5 : 4} fill={KIND_FILL[node.kind]} stroke="#021c4d" strokeWidth={1.4} />
                        <text x={textX + (side === "left" ? 16 : -16)} y={rowY + 4} textAnchor={anchor} className="atlas-label" style={{ fontSize: 11.5 }}>
                          {node.short ?? node.name}
                        </text>
                      </g>
                    );
                  })}
              </g>
            );
          })}
        </g>
      </svg>

      <canvas ref={windCanvas} className="pointer-events-none absolute inset-0 size-full" aria-hidden="true" />

      {interactive && (
        <>
          <div className="absolute right-4 top-4 z-10 flex flex-col gap-1.5">
            <button type="button" className="atlas-tool" onClick={() => zoomAt(1.3)} aria-label="Zoom in">
              <PlusIcon size={16} weight="bold" aria-hidden="true" />
            </button>
            <button type="button" className="atlas-tool" onClick={() => zoomAt(1 / 1.3)} aria-label="Zoom out">
              <MinusIcon size={16} weight="bold" aria-hidden="true" />
            </button>
            <button
              type="button"
              className="atlas-tool"
              onClick={() => flyTo(wide ? baseView : wideView)}
              aria-label={wide ? "Back to the Netherlands" : "Zoom out to north-west Europe"}
              title={wide ? "Back to the Netherlands" : "Zoom out to north-west Europe"}
            >
              {wide ? <MapPinIcon size={16} weight="bold" aria-hidden="true" /> : <GlobeHemisphereWestIcon size={16} weight="bold" aria-hidden="true" />}
            </button>
            <button type="button" className="atlas-tool" onClick={reset} aria-label="Reset the map">
              <CornersInIcon size={16} weight="bold" aria-hidden="true" />
            </button>
          </div>
          <p className={`atlas-hint pointer-events-none absolute left-1/2 top-4 z-10 -translate-x-1/2 ${hint ? "is-shown" : ""}`}>
            <ArrowsOutCardinalIcon size={14} aria-hidden="true" /> Drag to move. Use ctrl or cmd and scroll to zoom.
          </p>
          <div className="absolute bottom-4 right-4 z-10 flex flex-col items-end gap-2">
            <button type="button" className="atlas-tool atlas-tool--wide gap-2" onClick={() => flyTo(wide ? baseView : wideView)}>
              {wide ? <MapPinIcon size={15} aria-hidden="true" /> : <GlobeHemisphereWestIcon size={15} aria-hidden="true" />}
              {wide ? "Back to the Netherlands" : "Zoom out to north-west Europe"}
            </button>
            {onExitExplore && (
              <button type="button" className="atlas-tool atlas-tool--wide" onClick={onExitExplore}>
                Done exploring
              </button>
            )}
          </div>
        </>
      )}

      {selected && interactive && (
        <aside className="atlas-detail absolute left-4 top-4 z-20 max-h-[calc(100%-2rem)] w-[min(320px,calc(100%-5rem))] overflow-y-auto lg:left-8" aria-live="polite">
          <div className="flex items-start justify-between gap-3">
            <p className="eyebrow !text-[11px] !text-[#ff9a68]">{ecoKindLabel[selected.kind]} · {selected.city}</p>
            <button type="button" onClick={() => onSelect(null)} aria-label="Close details" className="-mr-1 -mt-1 grid size-8 place-items-center rounded-[4px] text-white/70 hover:bg-white/10 hover:text-white">
              <XIcon size={16} aria-hidden="true" />
            </button>
          </div>
          <h3 className="mt-2 font-serif text-[22px] font-bold leading-tight text-white">{selected.name}</h3>
          <p className="mt-2 text-[13.5px] leading-[21px] text-white/75">{selected.description}</p>
          {selected.facts && (
            <dl className="mt-3 grid gap-2 border-t border-white/12 pt-3">
              {selected.facts.map((fact) => (
                <div key={fact.label}>
                  <dt className="text-[11.5px] text-white/55">{fact.label}</dt>
                  <dd className="text-[13px] leading-5 text-white/85">{fact.value}</dd>
                </div>
              ))}
            </dl>
          )}
          {everyLink.some((link) => link.from === selected.id || link.to === selected.id) && (
            <ul className="mt-3 grid gap-1.5 border-t border-white/12 pt-3">
              {everyLink
                .filter((link) => link.from === selected.id || link.to === selected.id)
                .map((link) => {
                  const otherId = link.from === selected.id ? link.to : link.from;
                  const other = otherId === NETWORK_ID ? "Safe AI Netherlands" : everyNode.find((node) => node.id === otherId)?.name;
                  return (
                    <li key={`${link.from}-${link.to}`} className="flex items-start gap-2 text-[12.5px] leading-[18px] text-white/80">
                      <span
                        aria-hidden="true"
                        className={`mt-[7px] h-[2px] w-4 shrink-0 ${
                          link.strength === "strong"
                            ? "bg-orange"
                            : link.strength === "prospective"
                              ? "border-t-2 border-dashed border-orange/70"
                              : "border-t-2 border-dotted border-white/60"
                        }`}
                      />
                      <span>
                        <strong className="font-medium text-white">{other}</strong>: {link.label}
                      </span>
                    </li>
                  );
                })}
            </ul>
          )}
          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
            {selected.chapterHref && (
              <Link href={selected.chapterHref} className="text-[13px] font-medium text-white underline decoration-orange decoration-2 underline-offset-4">
                View chapter
              </Link>
            )}
            {selected.href && (
              <a href={selected.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[13px] font-medium text-white underline decoration-white/40 underline-offset-4 hover:decoration-white">
                Website <ArrowSquareOutIcon size={13} aria-hidden="true" />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            )}
          </div>
          <p className="mt-3 text-[11px] leading-4 text-white/45">Source: {selected.source}</p>
        </aside>
      )}
    </div>
  );
}

export default memo(NetherlandsAtlas);
