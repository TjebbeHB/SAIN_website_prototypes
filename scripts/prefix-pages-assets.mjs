#!/usr/bin/env node
/**
 * GitHub Pages serves this prototype from /<repo-name>/. Next's basePath
 * prefixes routes and its own chunks, but not the plain <img src="/photos/...">,
 * srcSet rungs, CSS url()s and fetch("/atlas/...") the site uses for files in
 * public/. This rewrites those after `next build`, in out/ only: the source
 * keeps root paths.
 *
 * Usage: PAGES_BASE_PATH=/SAIN_website_prototypes node scripts/prefix-pages-assets.mjs
 */
import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const base = process.env.PAGES_BASE_PATH;
if (!base) {
  console.error("Set PAGES_BASE_PATH, e.g. /SAIN_website_prototypes");
  process.exit(1);
}

const OUT = "out";
/* The top-level entries of public/. Anything else that starts with "/" is a
   route, which basePath already handled. */
const roots = readdirSync("public").map((name) => name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
const pattern = new RegExp(`(["'(\\s,=])/(${roots.join("|")})(?=[/"'?)\\s,])`, "g");

let files = 0;
let hits = 0;
function walk(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path);
    else if (/\.(html|js|css|txt|json)$/.test(name)) {
      const text = readFileSync(path, "utf8");
      let count = 0;
      const next = text.replace(pattern, (_, before, root) => {
        count++;
        return `${before}${base}/${root}`;
      });
      if (count) {
        writeFileSync(path, next);
        files++;
        hits += count;
      }
    }
  }
}
walk(OUT);
/* Pages ignores folders that start with "_" (Next's _next) unless told not
   to run Jekyll. */
writeFileSync(join(OUT, ".nojekyll"), "");
/* A prototype must not compete with safeainetherlands.org in search. */
writeFileSync(join(OUT, "robots.txt"), "User-agent: *\nDisallow: /\n");
console.log(`Prefixed ${hits} asset paths in ${files} files with ${base}`);
