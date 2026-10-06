// Fails if any em dash (U+2014) or en dash (U+2013) appears in the project text files.
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const targets = ["src", "public", "scripts", "README.md", "TODO_CONTENT.md"];
const textExt = /\.(tsx?|jsx?|mjs|cjs|css|md|mdx|json|txt|xml|html|svg|webmanifest)$/i;
const bad = new RegExp(`[${String.fromCharCode(0x2013)}${String.fromCharCode(0x2014)}]`);

async function walk(p) {
  let entries;
  try {
    entries = await readdir(p, { withFileTypes: true });
  } catch {
    return [p];
  }
  const out = [];
  for (const e of entries) out.push(...(await walk(path.join(p, e.name))));
  return out;
}

const problems = [];
for (const t of targets) {
  for (const file of await walk(path.join(root, t))) {
    if (!textExt.test(file)) continue;
    let text;
    try {
      text = await readFile(file, "utf8");
    } catch {
      continue;
    }
    text.split("\n").forEach((line, i) => {
      if (bad.test(line)) problems.push(`${path.relative(root, file)}:${i + 1}: ${line.trim().slice(0, 120)}`);
    });
  }
}

if (problems.length) {
  console.error("Found em or en dashes. Replace them with a period, comma, colon, or the word \"to\":\n");
  console.error(problems.join("\n"));
  process.exit(1);
}
console.log("check:dashes passed. No em or en dashes found.");
