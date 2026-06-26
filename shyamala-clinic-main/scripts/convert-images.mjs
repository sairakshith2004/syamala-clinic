import sharp from "sharp";
import { existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ASSETS = join(__dirname, "../src/assets");

const images = [
  // Doctor portraits — display at ~400px wide in 3/4 card, 2× retina
  { src: "anusha.png",        out: "anusha.webp",        width: 520, quality: 82 },
  { src: "rahul.png",         out: "rahul.webp",          width: 520, quality: 82 },
  { src: "Syamala_Devi.jpg",  out: "Syamala_Devi.webp",  width: 520, quality: 82 },
  // Hero building — LCP element, keep crisp; 5/12 col at 1200px = ~500px, 2× = 800px
  { src: "building.jpg",      out: "building.webp",       width: 800, quality: 85 },
  // About section — 2-col grid inside 7/12 col ≈ 280px, 2× = 560px
  { src: "hosp_entrance.jpeg",out: "hosp_entrance.webp",  width: 600, quality: 82 },
  { src: "laparoscopic.jpeg", out: "laparoscopic.webp",   width: 600, quality: 82 },
  // Gallery — 1/3 of 1200px = 400px, 2× = 600px
  { src: "newborn.jpeg",      out: "newborn.webp",        width: 600, quality: 82 },
  { src: "nurse.jpeg",        out: "nurse.webp",           width: 600, quality: 82 },
  // Logo — nav height 5.2rem ≈ 83px, retina 2× = 166px; also used in intro at 12rem = 192px, 2× = 384px
  { src: "Logo.png",          out: "Logo.webp",            width: 400, quality: 90 },
];

let totalBefore = 0;
let totalAfter  = 0;

for (const { src, out, width, quality } of images) {
  const inPath  = join(ASSETS, src);
  const outPath = join(ASSETS, out);
  if (!existsSync(inPath)) { console.warn(`  skip (not found): ${src}`); continue; }

  const { size: before } = await import("fs").then(m => m.statSync(inPath));
  await sharp(inPath).resize({ width, withoutEnlargement: true }).webp({ quality }).toFile(outPath);
  const { size: after } = await import("fs").then(m => m.statSync(outPath));

  totalBefore += before;
  totalAfter  += after;
  console.log(
    `  ${src.padEnd(24)} ${(before/1024).toFixed(0).padStart(6)}KB → ${out}  ${(after/1024).toFixed(0).padStart(5)}KB  (${Math.round((1-after/before)*100)}% saved)`
  );
}

console.log(`\n  Total: ${(totalBefore/1024/1024).toFixed(2)}MB → ${(totalAfter/1024).toFixed(0)}KB  (${Math.round((1-totalAfter/totalBefore)*100)}% saved)`);
