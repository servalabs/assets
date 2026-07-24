#!/usr/bin/env node
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));

const polygons = [
  "139.63,79 206.6,195 186.97,195 129.81,96",
  "129.81,96 186.97,195 167.34,195 120,113",
  "167.34,195 33.4,195 43.21,178 157.53,178",
  "157.53,178 43.21,178 53.03,161 147.71,161",
  "53.03,161 120,45 129.81,62 72.66,161",
  "72.66,161 129.81,62 139.63,79 92.29,161",
];

const palettes = {
  darkSurface: ["#71808c", "#58646d", "#3d4a55", "#6b8295", "#e4ebf1", "#b2b7bc"],
  lightSurface: ["#4d5a63", "#879ead", "#9aa7b0", "#788289", "#12181d", "#202a33"],
  faviconLight: ["#107572", "#0b5f5d", "#7b858c", "#5e6870", "#111820", "#24313a"],
  faviconDark: ["#69d9d1", "#42b7b0", "#6f7e88", "#91a1aa", "#f5efe5", "#d7cec1"],
};

const files = {
  "servalabs-mark.svg": markSvg(palettes.darkSurface),
  "servalabs-mark-light.svg": markSvg(palettes.lightSurface),
  "favicon.svg": faviconSvg(),
};

function markSvg(colors) {
  const body = polygons
    .map((points, index) => `<polygon points="${points}" fill="${colors[index]}"/>`)
    .join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" role="img" aria-label="ServaLabs">${body}</svg>`;
}

function faviconSvg() {
  const classes = ["a", "b", "c", "d", "e", "f"];
  const light = classes.map((name, index) => `.${name}{fill:${palettes.faviconLight[index]}}`).join("");
  const dark = classes.map((name, index) => `.${name}{fill:${palettes.faviconDark[index]}}`).join("");
  const body = polygons
    .map((points, index) => `<polygon class="${classes[index]}" points="${points}" transform="translate(0 1)"/>`)
    .join("\n");

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240">
<style>
.bg{fill:#f2ede4;stroke:#d0c7ba;stroke-width:8}
${light}
@media (prefers-color-scheme:dark){.bg{fill:#14171a;stroke:#344149}${dark}}
</style>
<rect class="bg" x="16" y="16" width="208" height="208" rx="44"/>
${body}
</svg>
`;
}

function writeAll() {
  for (const [name, content] of Object.entries(files)) {
    writeFileSync(join(here, name), content, "utf8");
    console.log(`wrote ${name}`);
  }
}

function checkAll() {
  let ok = true;
  for (const [name, expected] of Object.entries(files)) {
    const actual = readFileSync(join(here, name), "utf8");
    if (actual !== expected) {
      ok = false;
      console.error(`mismatch: ${name}`);
    }
  }
  if (!ok) {
    console.error("Run `node brand/servalabs/gen-logo.mjs` to regenerate.");
    process.exit(1);
  }
  console.log("brand SVGs match gen-logo.mjs");
}

const args = new Set(process.argv.slice(2));
if (args.has("--check")) {
  checkAll();
} else {
  writeAll();
}

