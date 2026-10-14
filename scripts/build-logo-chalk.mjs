#!/usr/bin/env node
/**
 * The header lockup for the dark theme: the navy lockup with its navy turned to
 * chalk, so the wordmark and the pinwheel read on a navy page exactly as the
 * light footer lockup does, at the header's crop and size.
 *
 * Every pixel is read as a mix of the lockup's three inks (navy, orange,
 * white) and rebuilt from the same mix with navy and white both written as
 * chalk. Antialiased edges keep their blend instead of picking up a fringe.
 *
 * Writes public/landing/logo-chalk-{140,280,420}.png beside the navy rungs.
 * Usage: node scripts/build-logo-chalk.mjs
 */
import sharp from "sharp";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const LANDING = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "landing");
const NAVY = [2, 28, 77];
const ORANGE = [255, 96, 37];
const WHITE = [255, 255, 255];
const CHALK = [247, 245, 242];

const { data, info } = await sharp(join(LANDING, "logo-navy.png"))
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

/* p = navy + u (orange - navy) + v (white - navy), least squares in RGB. */
const a = ORANGE.map((c, i) => c - NAVY[i]);
const b = WHITE.map((c, i) => c - NAVY[i]);
const dot = (x, y) => x[0] * y[0] + x[1] * y[1] + x[2] * y[2];
const aa = dot(a, a);
const ab = dot(a, b);
const bb = dot(b, b);
const det = aa * bb - ab * ab;

for (let i = 0; i < data.length; i += 4) {
  if (data[i + 3] === 0) continue;
  const p = [data[i] - NAVY[0], data[i + 1] - NAVY[1], data[i + 2] - NAVY[2]];
  const pa = dot(p, a);
  const pb = dot(p, b);
  const u = Math.max(0, Math.min(1, (pa * bb - pb * ab) / det));
  for (let c = 0; c < 3; c++) {
    data[i + c] = Math.round(CHALK[c] * (1 - u) + ORANGE[c] * u);
  }
}

const recoloured = sharp(data, { raw: info });
const master = await recoloured.png().toBuffer();
for (const width of [140, 280, 420]) {
  await sharp(master)
    .resize({ width })
    .png({ palette: true })
    .toFile(join(LANDING, `logo-chalk-${width}.png`));
}
console.log("Wrote logo-chalk-140/280/420.png");
