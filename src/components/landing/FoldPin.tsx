"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Pins a band so the next one slides over it (the fold on the landing).
 *
 * Sticky at the header's height would hide the bottom of any band taller than
 * the viewport under the header, so the offset is measured: the band pins at
 * the header when it fits, and otherwise scrolls until its bottom edge meets
 * the bottom of the viewport and pins there. Every line of it is on screen
 * before the next band covers it, at any window height. Measured on resize
 * (ResizeObserver plus window resize), never on scroll.
 */
const HEADER = 96;

export default function FoldPin({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [top, setTop] = useState(HEADER);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const measure = () =>
      setTop(Math.min(HEADER, window.innerHeight - node.offsetHeight));
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <div ref={ref} className="sticky z-0" style={{ top }}>
      {children}
    </div>
  );
}
