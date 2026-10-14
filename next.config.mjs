/** @type {import('next').NextConfig} */

/* PAGES_BASE_PATH is set only by the GitHub Pages build in the prototypes
   repo (.github/workflows/pages.yml), which serves the site from
   /<repo-name>/. Unset, this is the normal root-served static export. */
const basePath = process.env.PAGES_BASE_PATH || "";

const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  ...(basePath ? { basePath, assetPrefix: basePath, trailingSlash: true } : {}),
};

export default nextConfig;
