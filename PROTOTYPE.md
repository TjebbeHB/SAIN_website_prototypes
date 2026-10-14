# SAIN website prototype

A clickable prototype of the Safe AI Netherlands website redesign: the atlas
hero (story globe and Netherlands map), "Find your next step", the impact
band, and light and dark themes across the site.

- **Live prototype:** served by GitHub Pages from the `gh-pages` branch, when
  Pages is switched on (Settings → Pages → Deploy from a branch → `gh-pages`).
- **Source:** this branch, a snapshot of `redesign/atlas-home` in
  AlexanderAKM/Safe-AI-Netherlands. Changes are made there; this repo is for
  showing them.
- The impact figures are illustrative until the Airtable connection is on.

To rebuild the Pages site locally:

    npm ci
    PAGES_BASE_PATH=/SAIN_website_prototypes npx next build
    PAGES_BASE_PATH=/SAIN_website_prototypes node scripts/prefix-pages-assets.mjs
    # then publish out/ to the gh-pages branch
