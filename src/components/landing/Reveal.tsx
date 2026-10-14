"use client";

import { useEffect, useRef, type ReactNode } from "react";

/* The rest state is the visible one.

   This used to hand the initial state to motion/react, which meant the
   prerendered HTML carried `opacity:0` on nine blocks — the hero claim, the
   hero paragraph and the page's only call to action among them. A reader on a
   slow connection got a navbar and empty coloured grounds until the bundle
   arrived, and a reader without JS got nothing at all. Now nothing is hidden
   unless script is running to bring it back.

   The hero animates straight from CSS, which needs no script and so survives
   both cases. Everything below it is armed here, and only while it is still off
   screen, so an element already in front of the reader is never hidden and
   played back at them. */
export default function Reveal({ children, className, delay = 0, hero = false }: {
  children: ReactNode; className?: string; delay?: number; hero?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (hero || !el) return;

    /* Anything on screen at mount has already been read. */
    if (el.getBoundingClientRect().top < window.innerHeight * 0.88) return;

    el.classList.add("reveal-armed");

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        if (delay) el.style.animationDelay = `${delay}s`;
        el.classList.replace("reveal-armed", "reveal-in");
        observer.disconnect();
      },
      { threshold: 0.12 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [hero, delay]);

  return (
    <div
      ref={ref}
      className={hero ? `reveal-hero${className ? ` ${className}` : ""}` : className}
      style={hero && delay ? { animationDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
  );
}
