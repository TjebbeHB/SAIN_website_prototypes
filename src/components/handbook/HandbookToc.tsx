"use client";

import { useEffect, useState } from "react";

export type TocItem = { id: string; title: string };

/* The quiet rail beside the handbook's reading column, xl and up only.

   The brief allows it on one condition: label-size navy/60 links, no card, no
   fill. The active chapter is tracked with an IntersectionObserver against a
   narrow band near the top of the viewport (never a scroll listener), and the
   active link simply comes up to full ink. Reduced motion needs no special
   case here: nothing animates, only a colour transition that globals.css
   already collapses. */
export default function HandbookToc({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      /* The band runs from just under the sticky header to 30% down the
         viewport: the chapter crossing it is the one being read. */
      { rootMargin: "-96px 0px -70% 0px", threshold: 0 },
    );
    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav
      aria-label="On this page"
      className="hidden xl:block xl:justify-self-end"
    >
      <ol className="sticky top-28 flex max-w-[200px] flex-col gap-2.5">
        {items.map((item) => {
          const isActive = active === item.id;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={isActive ? "true" : undefined}
                className={`font-sans text-label transition-colors ${
                  isActive ? "text-navy" : "text-navy/60 hover:text-navy focus-visible:text-navy"
                }`}
              >
                {item.title}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
