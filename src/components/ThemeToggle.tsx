"use client";

import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "@phosphor-icons/react/dist/ssr";

/* The light/dark switch. The page already carries a theme when this mounts:
   the script in layout.tsx set it before first paint, from the reader's
   earlier choice or their system. This only flips it and remembers the flip.

   Both glyphs are always rendered and the theme CSS shows one, so the button
   is right on the very first frame instead of after hydration. */

type Theme = "light" | "dark";

const STORAGE_KEY = "sain-theme";

function currentTheme(): Theme {
  return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
}

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    setTheme(currentTheme());

    /* Until the reader picks a theme, keep following the system. */
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const follow = () => {
      try {
        if (localStorage.getItem(STORAGE_KEY)) return;
      } catch {
        /* Storage blocked: following the system is still right. */
      }
      const next: Theme = media.matches ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", next);
      setTheme(next);
    };
    media.addEventListener("change", follow);
    return () => media.removeEventListener("change", follow);
  }, []);

  function toggle() {
    const next: Theme = currentTheme() === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* Private windows can refuse storage; the switch still works here. */
    }
    setTheme(next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Dark theme"
      aria-pressed={theme === null ? undefined : theme === "dark"}
      title={theme === "dark" ? "Switch to the light theme" : "Switch to the dark theme"}
      className={`inline-flex size-11 shrink-0 items-center justify-center rounded-[4px] border border-navy/20 text-navy transition-colors hover:border-navy/50 hover:bg-navy/5 ${className}`}
    >
      <MoonIcon size={18} weight="regular" aria-hidden="true" className="only-light" />
      <SunIcon size={18} weight="regular" aria-hidden="true" className="only-dark" />
    </button>
  );
}
