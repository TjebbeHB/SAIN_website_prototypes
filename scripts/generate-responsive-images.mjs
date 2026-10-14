/**
 * Responsive image variants for the landing page.
 *
 * The site builds with `output: 'export'` and `images.unoptimized`, so
 * next/image emits a bare <img> with no srcset and every device downloads the
 * full-size original. The landing was shipping ~15MB of photographs, most of
 * it pixels no viewport ever asks for: 1900px funnel photographs rendered as a
 * 12%-opacity wash inside an 86px band, and a 7990x5329 portrait shown in a
 * 104px circle.
 *
 * This script pre-generates the widths each image is actually displayed at.
 * The markup then carries an explicit srcset/sizes, so the ladder lives in two
 * places and has to agree: change a layout width, change the widths here.
 *
 * Sources are never modified. Variants are written beside them as
 * `<name>-<width><ext>` and are committed, because a static export has no
 * runtime to generate them on demand.
 *
 *   npm run images
 */

import { readFile, writeFile, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const pub = (p) => path.join(ROOT, "public", p);

/* Each entry says where the file is used and how wide it is drawn there, so
   the ladder can be checked against the markup rather than guessed at. An
   entry may set `format` when the rungs should leave the source's container
   behind, for photographs that were handed over as PNG. */
const TARGETS = [
  {
    note: "TalentFunnel bands (<=432 CSS) and PathwayTrail cards (<=520 CSS)",
    files: [1, 2, 3, 4, 5].map((n) => `landing/funnel-0${n}.jpg`),
    widths: [320, 640, 768, 1040],
  },
  {
    note: "/get-involved hero print (420 CSS at lg, 60-84vw below) and the landing community gallery (<=300 CSS)",
    files: [
      "landing/print-graduation-amsterdam.jpg",
      "landing/print-closing-groningen.jpg",
      "landing/print-lecture.jpg",
      "landing/print-cafe-amsterdam.jpg",
      "landing/print-hackathon.jpg",
      "landing/print-circle.jpg",
      "landing/print-indoor.jpg",
    ],
    widths: [320, 640, 900],
  },
  {
    note: "CourseTabs panel: full shell width below xl, 624 CSS at 1440",
    files: [
      "landing/course-fundamentals.jpg",
      "landing/course-technical.jpg",
      "landing/course-policy.jpg",
    ],
    widths: [640, 960, 1280, 1920],
  },
  {
    note: "Header lockup, drawn at 140x37",
    files: ["landing/logo-navy.png"],
    widths: [140, 280, 420],
  },
  {
    note: "Footer lockup",
    files: ["landing/logo-light.png"],
    widths: [113, 226, 339],
  },
  {
    /* Two consumers at very different scales: the landing draws these in an
       88-104px circle (312 covers it to 3x), while /research puts them in a
       4/5 card up to ~336 CSS wide. Anything already smaller than 800 keeps
       its original as the large rung. */
    note: "ResearchPeople circle (88-104 CSS) and /research card (~336 CSS)",
    files: [
      "photos/supervisors/steven.webp",
      "photos/supervisors/Fatih_3.png",
      "photos/supervisors/Jobst.png",
      "photos/supervisors/Guillame.jpg",
      "photos/supervisors/Ana_Lucic.png",
      "photos/supervisors/Leon_Eshuijs.png",
    ],
    widths: [312, 800],
  },
  {
    /* /about portraits: leadership tiles at 140-158 CSS, advisory at 132-146.
       The originals were going into those tiles untouched, 6.6MB of them, one
       of which is 7581px square.

       440 is the top rung because the narrowest source is 459 wide and a rung
       wider than its source is skipped, which would leave a srcSet entry
       pointing at a file that was never written. Every rung is JPEG even where
       the source is a PNG: these are photographs, and the two PNGs carry alpha
       that flattens onto the white ground the band draws them on. */
    note: "About portraits: leadership tiles <=158 CSS, advisory <=146 CSS",
    files: [
      "photos/team/Alexander.jpg",
      "photos/team/Tarteel_Mohamed.jpg",
      "photos/team/Ana_resized.jpeg",
      "photos/team/Andreea_resized.jpeg",
      "photos/team/Riccardo_resized.jpeg",
      "photos/team/Marta.jpg",
      "photos/team/Tjebbe.jpeg",
      "photos/advisory_board/Teun.jpg",
      "photos/advisory_board/Jesse.jpg",
      "photos/advisory_board/nandi.jpg",
      "photos/advisory_board/Jelle.jpeg",
      "photos/advisory_board/lisa_gotoh_revised.jpeg",
      "photos/advisory_board/Robert_Praasjpeg.jpeg",
      "photos/advisory_board/charbel.png",
      "photos/advisory_board/Richard.png",
      "photos/advisory_board/Video_Jesselit_039_close-up.jpg",
      "photos/advisory_board/Stephen_Corlett.jpg",
    ],
    widths: [160, 320, 440],
    format: ".jpg",
  },
  {
    /* /community: the hero pair (<=254 CSS) and the EventPrints strip, which
       is 72vw on a phone and about 260 CSS in the xl scatter. These were the
       last full-size sources on the site, shipping 400 to 590KB each to draw
       a print the width of a postcard. webp because several of the sources are
       phone PNGs, where a PNG rung is still several times a webp one. */
    note: "Community hero prints (<=254 CSS) and EventPrints (72vw, <=260 CSS)",
    files: [
      "photos/events/forecasting-hackathon.png",
      "photos/events/pub-quiz.jpg",
      "photos/events/tedx-broerstraat.webp",
      "photos/events/utrecht/aisfundamentals-graduation-ceremony.jpeg",
      "photos/events/utrecht/discussion-eu2031.jpeg",
      "photos/events/utrecht/win4AISafety_congrats_the_winners.jpg",
    ],
    widths: [320, 640, 900],
    format: ".webp",
  },
  {
    /* The Amsterdam chapter's PrintStrip, drawn at the same widths as the
       community strip above. discussion-group-2 is held back from the page. */
    note: "Amsterdam chapter PrintStrip (78vw on a phone, <=320 CSS at xl)",
    files: [
      "photos/events/amsterdam/governance-graduation.jpg",
      "photos/events/amsterdam/governance-course.jpg",
      "photos/events/amsterdam/discussion-group.jpeg",
      "photos/events/amsterdam/chapter-meeting.jpg",
    ],
    widths: [320, 640, 900],
    format: ".webp",
  },
];

/* Keep the source's format. Switching a transparent PNG to JPEG would fill its
   background with black, and these are only ever resized, never recoded. */
function encode(pipeline, ext) {
  if (ext === ".png") return pipeline.png({ compressionLevel: 9, palette: true });
  if (ext === ".webp") return pipeline.webp({ quality: 82 });
  return pipeline.jpeg({ quality: 78, mozjpeg: true, progressive: true });
}

const kb = (bytes) => `${Math.round(bytes / 1024)}KB`;

let sourceBytes = 0;
let variantBytes = 0;
const rows = [];

for (const target of TARGETS) {
  for (const file of target.files) {
    const src = pub(file);
    const ext = path.extname(src);
    const base = src.slice(0, -ext.length);

    const input = await readFile(src);
    const meta = await sharp(input).metadata();
    sourceBytes += input.length;

    for (const width of target.widths) {
      /* Never upscale: a variant wider than the source is bytes spent to
         invent detail. srcset simply has one rung fewer. */
      if (width >= meta.width) {
        rows.push([`${file} @${width}`, "skipped", `source is only ${meta.width}px`]);
        continue;
      }

      /* A target may recode: a photograph shipped as PNG is a photograph, and
         a rung of it should be JPEG. Alpha is flattened onto white first,
         because JPEG has none and the default fill is black. */
      const outExt = target.format ?? ext;
      const recoding = outExt !== ext;
      const out = `${base}-${width}${outExt}`;
      let pipeline = sharp(input).resize({ width, withoutEnlargement: true });
      if (recoding && meta.hasAlpha) pipeline = pipeline.flatten({ background: "#ffffff" });
      const buffer = await encode(pipeline, outExt).toBuffer();

      await writeFile(out, buffer);
      variantBytes += buffer.length;
      rows.push([
        path.relative(path.join(ROOT, "public"), out).split(path.sep).join("/"),
        `${width}px`,
        `${kb(input.length)} -> ${kb(buffer.length)}`,
      ]);
    }
  }
}

for (const [name, width, size] of rows) {
  console.log(`  ${name.padEnd(44)} ${width.padEnd(9)} ${size}`);
}
console.log(
  `\n  ${rows.length} rows. Sources ${kb(sourceBytes)}, all variants together ${kb(variantBytes)}.`,
);
console.log("  A viewport downloads one rung per image, not the whole ladder.");
