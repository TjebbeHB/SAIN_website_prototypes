"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { geoDistance } from "d3-geo";
import type { FeatureCollection, MultiPolygon } from "geojson";
import {
  ArrowCounterClockwiseIcon,
  ArrowRightIcon,
  CaretLeftIcon,
  CaretRightIcon,
  MapTrifoldIcon,
  PauseIcon,
  PlayIcon,
} from "@phosphor-icons/react/dist/ssr";
import StoryGlobe, { type GlobeArc, type GlobePin } from "@/components/atlas/StoryGlobe";
import NetherlandsAtlas, { type Reveal } from "@/components/atlas/NetherlandsAtlas";
import { storyPlayers, storySteps, type Camera, type GlobeStep } from "@/data/atlas/story";
import { NETWORK_ID, ecoNodes } from "@/data/atlas/ecosystem";
import {
  cameraForView,
  decodeWorld,
  easeInOutCubic,
  netherlandsView,
  prefersReducedMotion,
  type LonLat,
  type OrthoCamera,
} from "@/components/atlas/geo";

/* The right-hand two thirds of the homepage hero: SAIN's story told on a
   globe, ending on the Netherlands, then handed to the reader to explore.

   One clock drives everything. `time` is milliseconds into the story; every
   frame derives the camera, the pins, the routes and the map's reveal from
   it, so pausing is just not advancing it, a step button just sets it, and
   the story can never drift out of step with its own captions.

   It plays once, on its own, and stops on the map. It pauses when the hero
   leaves the screen or the tab is hidden, and it never plays under
   prefers-reduced-motion: those readers get the finished map and step
   through the story by hand. */

const FLIGHT = 2400;
const DIVE = 3400;

type World = FeatureCollection<MultiPolygon, { name: string }>;

const nodeById = new Map(ecoNodes.map((node) => [node.id, node]));
const chapterHomes = ecoNodes.filter((node) => node.kind === "chapter").map((node) => node.coordinates);
const networkHome: LonLat = [
  chapterHomes.reduce((sum, [lon]) => sum + lon, 0) / chapterHomes.length,
  chapterHomes.reduce((sum, [, lat]) => sum + lat, 0) / chapterHomes.length,
];
const homeOf = (id: string): LonLat => (id === NETWORK_ID ? networkHome : nodeById.get(id)?.coordinates ?? networkHome);

/* Where the story opens from, a little west of the first view, so the very
   first thing the globe does is turn. */
const OPENING: Camera = { center: [-62, 28], zoom: 0.94 };

const durations = storySteps.map((step, i) => {
  if (step.view === "globe") return (i === 0 ? 1600 : FLIGHT) + step.hold;
  const first = storySteps.findIndex((item) => item.view === "netherlands");
  return (i === first ? DIVE : 700) + step.hold;
});
const starts = durations.map((_, i) => durations.slice(0, i).reduce((sum, d) => sum + d, 0));
const TOTAL = durations.reduce((sum, d) => sum + d, 0);
const firstMapStep = storySteps.findIndex((step) => step.view === "netherlands");

const clamp01 = (value: number) => Math.max(0, Math.min(1, value));
const smooth = (from: number, to: number, value: number) => {
  const t = clamp01((value - from) / (to - from));
  return t * t * (3 - 2 * t);
};

function locate(time: number) {
  const t = Math.max(0, Math.min(TOTAL - 1, time));
  let index = 0;
  while (index < storySteps.length - 1 && t >= starts[index + 1]) index++;
  return { index, local: t - starts[index] };
}

export default function HeroAtlas() {
  const root = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [world, setWorld] = useState<World | null>(null);
  const [time, setTime] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [reduced, setReduced] = useState(false);
  const [onScreen, setOnScreen] = useState(true);
  const [pageVisible, setPageVisible] = useState(true);
  const [exploring, setExploring] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [legendOpen, setLegendOpen] = useState(false);
  const [desktop, setDesktop] = useState(true);
  const announce = useRef(false);

  /* -------------------------------------------------------- environment -- */
  useEffect(() => {
    if (prefersReducedMotion()) {
      setReduced(true);
      setPlaying(false);
      setTime(TOTAL);
    }
    const media = window.matchMedia("(min-width: 1024px)");
    const update = () => setDesktop(media.matches);
    update();
    media.addEventListener("change", update);
    const onVisibility = () => setPageVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      media.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  useEffect(() => {
    const element = stageRef.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) => {
      setSize({ width: Math.round(entry.contentRect.width), height: Math.round(entry.contentRect.height) });
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting), { threshold: 0.15 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let cancelled = false;
    fetch("/atlas/world.json")
      .then((response) => response.json())
      .then((data) => {
        if (!cancelled) setWorld(decodeWorld(data));
      })
      .catch(() => {
        /* Without the coastlines the story still reads: sea, routes, pins. */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  /* -------------------------------------------------------------- clock -- */
  const running = playing && onScreen && pageVisible && !exploring && !!world && size.width > 0;
  useEffect(() => {
    if (!running) return;
    let frame = 0;
    let last = performance.now();
    const tick = (now: number) => {
      /* A long gap (a dropped tab, a debugger) resumes rather than jumps. */
      const delta = Math.min(64, now - last);
      last = now;
      setTime((current) => Math.min(TOTAL, current + delta));
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [running]);

  const finished = time >= TOTAL;
  useEffect(() => {
    if (finished) setPlaying(false);
  }, [finished]);

  /* Development only: scrub the story from the console to check one frame,
     e.g. __sainAtlas.at(26000). Never shipped to the built site. */
  useEffect(() => {
    if (process.env.NODE_ENV === "production") return;
    const handle = {
      total: TOTAL,
      starts,
      at: (ms: number) => {
        setPlaying(false);
        setTime(Math.max(0, Math.min(TOTAL, ms)));
      },
      play: () => setPlaying(true),
    };
    (window as unknown as { __sainAtlas?: typeof handle }).__sainAtlas = handle;
  }, []);
  const { index, local } = locate(time);
  const step = storySteps[index];

  /* ------------------------------------------------------------- layout -- */
  const { width, height } = size;
  const mapView = useMemo(
    () => netherlandsView(width || 1, height || 1, { focusX: desktop ? 0.64 : 0.5, focusY: desktop ? 0.49 : 0.47, padding: desktop ? 30 : 16 }),
    [width, height, desktop],
  );
  const globeCamera = useCallback(
    (camera: Camera): OrthoCamera => {
      const base = Math.min(width, height) * (desktop ? 0.39 : 0.42);
      return {
        center: camera.center,
        radius: base * camera.zoom,
        x: width * (desktop ? 0.57 : 0.5),
        y: height * (desktop ? 0.47 : 0.45),
      };
    },
    [width, height, desktop],
  );

  /* -------------------------------------------- the frame, from the clock -- */
  const frame = useMemo(() => {
    const globeSteps = storySteps
      .map((item, i) => ({ item, i }))
      .filter((entry): entry is { item: GlobeStep; i: number } => entry.item.view === "globe");

    /* Camera at the end of a globe step's hold, drift included. */
    const restingCamera = (i: number): Camera => {
      const target = (storySteps[i] as GlobeStep).camera;
      const hold = (storySteps[i] as GlobeStep).hold;
      return { center: [target.center[0] + hold * 0.0011, target.center[1]], zoom: target.zoom };
    };

    const fly = (from: Camera, to: Camera, p: number): Camera => {
      const e = easeInOutCubic(clamp01(p));
      const distance = geoDistance(from.center, to.center);
      /* Long flights rise a little in the middle, so the reader keeps their
         bearings instead of skimming the surface. */
      const rise = Math.min(0.32, distance * 0.28);
      const zoom = Math.exp(Math.log(from.zoom) + (Math.log(to.zoom) - Math.log(from.zoom)) * e) * (1 - rise * Math.sin(Math.PI * e));
      let deltaLon = to.center[0] - from.center[0];
      if (deltaLon > 180) deltaLon -= 360;
      if (deltaLon < -180) deltaLon += 360;
      return {
        center: [from.center[0] + deltaLon * e, from.center[1] + (to.center[1] - from.center[1]) * e],
        zoom,
      };
    };

    let camera: OrthoCamera = globeCamera(OPENING);
    let globeOpacity = 1;
    let mapOpacity = 0;
    let reveal: Reveal = "none";
    let homeGlow = 0.25;
    const pins: GlobePin[] = [];
    const arcs: GlobeArc[] = [];

    const playersFor = (stepIndex: number, presence: number, drawn: number) => {
      const item = storySteps[stepIndex];
      if (item.view !== "globe") return;
      const located = item.players
        .map((id) => storyPlayers.find((player) => player.id === id)!)
        .filter((player) => player.coordinates);
      located.forEach((player, n) => {
        const sharing = located.filter((other) => other.place === player.place);
        const side = sharing.length > 1 ? (sharing.indexOf(player) === 0 ? -1 : 1) : n % 2 === 0 ? 1 : -1;
        pins.push({
          id: `${stepIndex}-${player.id}`,
          name: player.name,
          place: player.place,
          coordinates: player.coordinates!,
          side,
          presence,
        });
        arcs.push({ id: `${stepIndex}-${player.id}`, from: player.coordinates!, to: homeOf(player.to), progress: drawn });
      });
    };

    if (step.view === "globe") {
      const i = index;
      const flight = i === 0 ? 1600 : FLIGHT;
      const from = i === 0 ? OPENING : restingCamera(i - 1);
      const target = step.camera;
      const p = local / flight;
      const drift = Math.max(0, local - flight) * 0.0011;
      const flown = p < 1 ? fly(from, target, p) : { center: [target.center[0] + drift, target.center[1]] as LonLat, zoom: target.zoom };
      camera = globeCamera(flown);
      homeGlow = [0.3, 0.6, 0.85][Math.min(2, globeSteps.findIndex((entry) => entry.i === i))] ?? 0.6;
      /* The step before leaves while this one arrives. */
      if (i > 0 && p < 0.55) playersFor(i - 1, 1 - p / 0.55, 1);
      playersFor(i, smooth(0.55, 0.85, p), clamp01((local - flight * 0.8) / 1700));
    } else {
      const lastGlobe = firstMapStep - 1;
      const end = cameraForView(mapView);
      if (index === firstMapStep && local < DIVE) {
        /* The dive: turn the Netherlands to face the reader first, then
           fall straight in, down to the map's own scale and position. A turn
           and a zoom at once sends the country sliding off the edge. */
        const start = globeCamera(restingCamera(lastGlobe));
        const q = clamp01(local / DIVE);
        const turn = easeInOutCubic(clamp01(q / 0.42));
        const fall = easeInOutCubic(clamp01((q - 0.14) / 0.86));
        const radius = Math.exp(Math.log(start.radius) + (Math.log(end.radius) - Math.log(start.radius)) * fall);
        let deltaLon = end.center[0] - start.center[0];
        if (deltaLon > 180) deltaLon -= 360;
        if (deltaLon < -180) deltaLon += 360;
        camera = {
          center: [start.center[0] + deltaLon * turn, start.center[1] + (end.center[1] - start.center[1]) * turn],
          radius,
          x: start.x + (end.x - start.x) * fall,
          y: start.y + (end.y - start.y) * fall,
        };
        /* The globe's coastline is the coarse one: hand over to the map's
           1:10m coast before it shows, and let the orange settle back to
           land first so the two pictures meet in the same colours. */
        globeOpacity = 1 - smooth(0.68, 0.9, q);
        mapOpacity = smooth(0.58, 0.86, q);
        reveal = q > 0.88 ? "origin" : "none";
        homeGlow = 1 - smooth(0.4, 0.72, q);
        if (q < 0.5) playersFor(lastGlobe, 1 - q / 0.5, 1);
      } else {
        camera = end;
        globeOpacity = 0;
        mapOpacity = 1;
        reveal = (step.view === "netherlands" ? step.reveal : "partners") as Reveal;
        if (finished) reveal = "all";
      }
    }
    return { camera, globeOpacity, mapOpacity, reveal, homeGlow, pins, arcs };
  }, [step, index, local, finished, mapView, globeCamera]);

  /* --------------------------------------------------------- controls -- */
  const goTo = (stepIndex: number) => {
    announce.current = true;
    setExploring(false);
    setSelectedId(null);
    /* Land on the step's settled view: past its flight, at the start of its
       hold, so the caption and the picture agree at once. */
    const item = storySteps[stepIndex];
    const settle = item.view === "globe" ? (stepIndex === 0 ? 1600 : FLIGHT) : stepIndex === firstMapStep ? DIVE : 700;
    setTime(starts[stepIndex] + (reduced ? durations[stepIndex] - 1 : settle));
  };
  const togglePlay = () => {
    announce.current = true;
    if (finished) {
      setTime(0);
      setPlaying(true);
      return;
    }
    setPlaying((value) => !value);
  };
  const replay = () => {
    announce.current = true;
    setExploring(false);
    setSelectedId(null);
    setTime(0);
    setPlaying(!reduced);
  };
  const skip = () => {
    announce.current = true;
    setTime(TOTAL);
    setPlaying(false);
  };
  const explore = () => {
    setTime(TOTAL);
    setPlaying(false);
    setExploring(true);
    requestAnimationFrame(() => stageRef.current?.querySelector<HTMLElement>(".atlas-map")?.focus({ preventScroll: true }));
  };

  const progress = (i: number) => (i < index || finished ? 1 : i > index ? 0 : clamp01(local / durations[i]));
  const motion = !reduced && onScreen && pageVisible;
  const card = finished ? null : step;
  const showGlobe = frame.globeOpacity > 0.01;
  const showMap = frame.mapOpacity > 0.01;
  const located = step.view === "globe" ? step.players.map((id) => storyPlayers.find((player) => player.id === id)!) : [];

  return (
    <div
      ref={root}
      className="atlas-hero relative flex h-full min-h-[560px] flex-col lg:min-h-0"
      role="region"
      aria-roledescription="story"
      aria-label="The SAIN story, from its funders abroad to its chapters in the Netherlands"
    >
      <div ref={stageRef} className={`relative min-h-[460px] flex-1 overflow-hidden ${motion ? "" : "is-still"}`}>
        {/* The sea runs out under the copy column instead of stopping at a
            seam: the left edge fades into the hero's own navy. */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-[5] hidden w-28 bg-gradient-to-r from-deep to-transparent lg:block" aria-hidden="true" />
        {showMap && width > 0 && (
          <div className="absolute inset-0" style={{ opacity: frame.mapOpacity }}>
            <NetherlandsAtlas
              width={width}
              height={height}
              baseView={mapView}
              reveal={frame.reveal}
              interactive={exploring}
              motion={motion}
              showAbroad
              selectedId={selectedId}
              onSelect={setSelectedId}
              onExitExplore={() => {
                setExploring(false);
                setSelectedId(null);
              }}
            />
          </div>
        )}
        {showGlobe && width > 0 && (
          <div className="absolute inset-0" style={{ opacity: frame.globeOpacity }}>
            <StoryGlobe
              world={world}
              camera={frame.camera}
              width={width}
              height={height}
              pins={frame.pins}
              arcs={frame.arcs}
              homes={chapterHomes}
              homeGlow={frame.homeGlow}
            />
          </div>
        )}
      </div>

      {/* The story card: on top of the map's south-west corner on a wide
          screen, under the map on a phone. */}
      {!exploring && (
        <div className="atlas-card relative z-10 mx-4 -mt-4 mb-4 lg:absolute lg:bottom-8 lg:left-8 lg:m-0 lg:w-[min(372px,40%)]">
          <div aria-live={playing ? "off" : "polite"} aria-atomic="true">
            {card ? (
              <>
                <p className="eyebrow !text-[#ff9a68]">{card.eyebrow}</p>
                <p className="mt-2.5 font-serif text-[23px] font-bold leading-[1.12] tracking-[-0.015em] text-white md:text-[26px]">
                  {card.title}
                </p>
                <p className="mt-2.5 text-[14px] leading-[22px] text-white/74">{card.body}</p>
                {located.length > 0 && (
                  <ul className="mt-3.5 grid gap-1.5 border-t border-white/12 pt-3">
                    {located.map((player) => (
                      <li key={player.id} className="flex items-baseline justify-between gap-3 text-[12.5px] leading-[18px]">
                        <a href={player.href} target="_blank" rel="noopener noreferrer" className="font-medium text-white underline decoration-white/25 underline-offset-[3px] hover:decoration-white">
                          {player.name}
                          <span className="sr-only"> (opens in a new tab)</span>
                        </a>
                        <span className="text-right text-white/55">{player.place}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            ) : (
              <>
                <p className="eyebrow !text-[#ff9a68]">The Netherlands</p>
                <p className="mt-2.5 font-serif text-[23px] font-bold leading-[1.12] tracking-[-0.015em] text-white md:text-[26px]">
                  Find SAIN near you.
                </p>
                <p className="mt-2.5 text-[14px] leading-[22px] text-white/74">
                  Three chapters, the organisations around them, and the routes that reach them from abroad.
                </p>
                <button type="button" onClick={explore} className="btn-accent mt-4 w-full justify-between gap-3 !text-[15px]">
                  <span className="inline-flex items-center gap-2.5">
                    <MapTrifoldIcon size={18} aria-hidden="true" />
                    Explore the Netherlands
                  </span>
                  <ArrowRightIcon size={17} aria-hidden="true" />
                </button>
              </>
            )}
          </div>

          <div className="mt-4 flex items-center gap-3 border-t border-white/12 pt-3.5">
            <div className="flex flex-1 gap-1.5" role="group" aria-label="Story steps">
              {storySteps.map((item, i) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => goTo(i)}
                  className="group flex-1 py-2"
                  aria-label={`Step ${i + 1}: ${item.label}`}
                  aria-current={!finished && i === index ? "step" : undefined}
                  title={item.label}
                >
                  <span className="block h-[3px] overflow-hidden rounded-full bg-white/18 transition-colors group-hover:bg-white/30">
                    <span className="block h-full rounded-full bg-orange" style={{ width: `${progress(i) * 100}%` }} />
                  </span>
                </button>
              ))}
            </div>
            {reduced && !finished ? (
              <div className="flex gap-1">
                <button type="button" className="atlas-tool atlas-tool--small" onClick={() => goTo(Math.max(0, index - 1))} aria-label="Previous step">
                  <CaretLeftIcon size={14} weight="bold" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  className="atlas-tool atlas-tool--small"
                  onClick={() => (index < storySteps.length - 1 ? goTo(index + 1) : skip())}
                  aria-label="Next step"
                >
                  <CaretRightIcon size={14} weight="bold" aria-hidden="true" />
                </button>
              </div>
            ) : reduced ? (
              <button type="button" className="atlas-tool atlas-tool--small" onClick={() => goTo(0)} aria-label="Read the story step by step">
                <PlayIcon size={14} weight="fill" aria-hidden="true" />
              </button>
            ) : finished ? (
              <button type="button" className="atlas-tool atlas-tool--small" onClick={replay} aria-label="Replay the story">
                <ArrowCounterClockwiseIcon size={14} weight="bold" aria-hidden="true" />
              </button>
            ) : (
              <button type="button" className="atlas-tool atlas-tool--small" onClick={togglePlay} aria-label={playing ? "Pause the story" : "Play the story"}>
                {playing ? <PauseIcon size={14} weight="fill" aria-hidden="true" /> : <PlayIcon size={14} weight="fill" aria-hidden="true" />}
              </button>
            )}
          </div>
          {!finished && (
            <button type="button" onClick={skip} className="mt-1 inline-flex items-center gap-1.5 text-[12.5px] text-white/60 underline decoration-white/25 underline-offset-[3px] hover:text-white">
              Skip to the map
              <ArrowRightIcon size={12} aria-hidden="true" />
            </button>
          )}
        </div>
      )}

      {exploring && !selectedId && (
        <div className="absolute bottom-4 left-4 z-10 hidden sm:block lg:left-8">
          {legendOpen ? (
            <div className="atlas-legend">
              <div className="flex items-center justify-between gap-6">
                <p className="eyebrow !text-[10.5px] !text-white/60">On the map</p>
                <button type="button" onClick={() => setLegendOpen(false)} className="text-[12px] text-white/70 underline decoration-white/30 underline-offset-[3px] hover:text-white">
                  Hide
                </button>
              </div>
              <ul className="mt-2 grid gap-1.5 text-[12px] leading-4 text-white/80">
                <li className="flex items-center gap-2"><span className="size-3 rounded-full border-2 border-orange bg-[#f7f5f2]" aria-hidden="true" /> SAIN chapter</li>
                <li className="flex items-center gap-2"><span className="h-[2px] w-5 bg-orange" aria-hidden="true" /> Working relationship</li>
                <li className="flex items-center gap-2"><span className="w-5 border-t-2 border-dotted border-white/70" aria-hidden="true" /> People in common</li>
                <li className="flex items-center gap-2"><span className="size-2.5 rounded-full bg-[#cfe0f5]" aria-hidden="true" /> University</li>
                <li className="flex items-center gap-2"><span className="size-2.5 rounded-full bg-[#8fc1ff]" aria-hidden="true" /> Research</li>
                <li className="flex items-center gap-2"><span className="size-2.5 rounded-full bg-[#ffc98f]" aria-hidden="true" /> AI safety organisation</li>
                <li className="flex items-center gap-2"><span className="size-2.5 rounded-full bg-[#7fd6c2]" aria-hidden="true" /> Public-private network</li>
                <li className="flex items-center gap-2"><span className="size-2.5 rounded-full border-2 border-white bg-[#021c4d]" aria-hidden="true" /> Government</li>
              </ul>
              <p className="mt-2 max-w-[220px] text-[11px] leading-4 text-white/50">
                Points are cities, not offices. Organisations that share a city sit around it; those abroad wait at the edge, pointing home. Zoom in or hover for every name.
              </p>
            </div>
          ) : (
            <button type="button" onClick={() => setLegendOpen(true)} className="atlas-tool atlas-tool--wide">
              Key to the map
            </button>
          )}
        </div>
      )}

      {/* The whole story, for anyone who would rather read it than watch it. */}
      <ol className="sr-only">
        {storySteps.map((item) => (
          <li key={item.id}>
            {item.eyebrow}. {item.title} {item.body}
          </li>
        ))}
      </ol>
    </div>
  );
}
