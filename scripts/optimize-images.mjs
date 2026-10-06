// Builds web-ready images from the source files.
//   brand-assets/*  ->  public/images/<name>.png + <name>-<width>.webp
//   team-photos/*   ->  public/images/team/<name>.png + <name>-<width>.webp
// Also writes the favicon set into src/app from the GDG Southeastern logo.
// Skips any file whose outputs are already newer than the source.
import { readdir, stat, mkdir, readFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const widths = JSON.parse(await readFile(path.join(root, "src/lib/image-widths.json"), "utf8"));
const sources = [
  { from: "brand-assets", to: "public/images" },
  { from: "team-photos", to: "public/images/team" },
];
const imageExt = /\.(png|jpe?g|webp)$/i;

async function mtime(file) {
  try {
    return (await stat(file)).mtimeMs;
  } catch {
    return 0;
  }
}

async function processDir({ from, to }) {
  const srcDir = path.join(root, from);
  const outDir = path.join(root, to);
  let files = [];
  try {
    files = (await readdir(srcDir)).filter((f) => imageExt.test(f));
  } catch {
    return;
  }
  await mkdir(outDir, { recursive: true });

  for (const file of files) {
    const input = path.join(srcDir, file);
    const name = path.parse(file).name;
    const fallback = path.join(outDir, `${name}.png`);
    const srcTime = await mtime(input);
    if ((await mtime(fallback)) > srcTime && (await mtime(path.join(outDir, `${name}-${widths.at(-1)}.webp`))) > srcTime) {
      continue;
    }
    await sharp(input).png({ compressionLevel: 9, palette: false }).toFile(fallback);
    for (const w of widths) {
      await sharp(input)
        .resize({ width: w, withoutEnlargement: true })
        .webp({ quality: 82 })
        .toFile(path.join(outDir, `${name}-${w}.webp`));
    }
    console.log(`optimized ${from}/${file}`);
  }
}

for (const s of sources) await processDir(s);

// Favicon set from the GDG Southeastern logo.
const logo = (await readdir(path.join(root, "brand-assets"))).find((f) => f.startsWith("gdg-southeastern-logo."));
if (logo) {
  const input = path.join(root, "brand-assets", logo);
  const icons = [
    { file: "src/app/icon.png", size: 192 },
    { file: "src/app/apple-icon.png", size: 180 },
  ];
  for (const { file, size } of icons) {
    const out = path.join(root, file);
    if ((await mtime(out)) > (await mtime(input))) continue;
    await sharp(input).resize(size, size, { fit: "contain", background: "#ffffff" }).png().toFile(out);
    console.log(`wrote ${file}`);
  }
}
