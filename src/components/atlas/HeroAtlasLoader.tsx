"use client";

import dynamic from "next/dynamic";

/* The atlas is the heaviest thing on the site (d3-geo, two maps, a story
   clock), so it loads after the page it sits in: the claim and the button
   on the left are readable and usable before a coastline is drawn. Until then
   the space holds a quiet sphere, so nothing shifts when it arrives. */

function Placeholder() {
  return (
    <div className="absolute inset-0 grid place-items-center" aria-hidden="true">
      <div className="aspect-square w-[min(78%,620px)] rounded-full bg-[radial-gradient(circle_at_36%_30%,#1d5487,#0b3366_55%,#041d45)] opacity-60 shadow-[0_0_80px_rgb(64_146_220/20%)]" />
    </div>
  );
}

const HeroAtlas = dynamic(() => import("@/components/atlas/HeroAtlas"), {
  ssr: false,
  loading: Placeholder,
});

export default function HeroAtlasLoader() {
  return <HeroAtlas />;
}
