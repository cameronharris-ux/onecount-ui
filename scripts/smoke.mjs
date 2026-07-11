import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const root = process.cwd();
const distDir = path.join(root, "dist");
const indexJs = path.join(distDir, "index.js");
const indexDts = path.join(distDir, "index.d.ts");

const expectedFiles = [
  "AiBadge",
  "AiCard",
  "AiDisclosure",
  "AiHero",
  "AnimatedNumber",
  "AnimatedSplash",
  "Aurora",
  "BrandMark",
  "BrandSplash",
  "StaggerIn",
  "motion",
  "motifs",
  "PressableScale",
  "ProductDot",
  "haptics",
  "useReducedMotion",
];

const expectedExports = [
  "tokens",
  "Aurora",
  "AnimatedSplash",
  "PressableScale",
  "AnimatedNumber",
  "ProductDot",
  "AiBadge",
  "AiCard",
  "AiHero",
  "AiDisclosure",
  "useReducedMotion",
  "MOTION",
  "EASE",
  "DUR",
  "SPRING",
  "timing",
  "exitTiming",
  "BrandMark",
  "BrandSplash",
  "SPLASH_MOTIFS",
  "StaggerIn",
  "HAPTIC_MOMENTS",
  "hapticMoment",
  "HapticMoment",
  "OneCountApp",
];

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

assert(fs.existsSync(indexJs), "dist/index.js is missing");
assert(fs.existsSync(indexDts), "dist/index.d.ts is missing");

for (const file of expectedFiles) {
  assert(fs.existsSync(path.join(distDir, `${file}.js`)), `dist/${file}.js is missing`);
  assert(fs.existsSync(path.join(distDir, `${file}.d.ts`)), `dist/${file}.d.ts is missing`);
}

const dts = fs.readFileSync(indexDts, "utf8");
for (const name of expectedExports) {
  assert(dts.includes(name), `dist/index.d.ts does not mention export ${name}`);
}

const require = createRequire(import.meta.url);
const { CORE, TOKENS_VERSION } = require("@onecount/ui-tokens");
assert(TOKENS_VERSION === "0.5.0", "ui-tokens version did not resolve to 0.5.0");
assert(CORE.brand.accent === CORE.identityHues.onecount, "brand accent and OneCount identity hue drifted");
assert(CORE.brand.ai === CORE.ai, "AI core token drifted");
assert(CORE.componentState.pressScale === CORE.motion.micro.pressScaleButton, "press scale token drifted");
assert(CORE.haptics["destructive-confirmed"] === "strong", "haptic vocabulary did not resolve");

console.log("smoke ok");

