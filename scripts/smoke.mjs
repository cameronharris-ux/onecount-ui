import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const root = process.cwd();
const distDir = path.join(root, "dist");
const indexJs = path.join(distDir, "index.js");
const indexDts = path.join(distDir, "index.d.ts");
const brandSplashDts = path.join(distDir, "BrandSplash.d.ts");
const motionSheetJs = path.join(distDir, "MotionSheet.js");
const motionSheetDts = path.join(distDir, "MotionSheet.d.ts");
const internalDts = path.join(distDir, "internal.d.ts");

const expectedFiles = [
  "AiBadge",
  "AiCard",
  "AiDisclosure",
  "AiHero",
  "AnimatedNumber",
  "AnimatedRing",
  "AnimatedSplash",
  "Aurora",
  "auroraPalette",
  "BrandMark",
  "BrandSplash",
  "MotionSheet",
  "StaggerIn",
  "splashContract",
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
  "AnimatedRing",
  "MotionSheet",
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
  "DEFAULT_SPLASH_MOTIF",
  "PULSE_SIGNAL_HIGHLIGHT_PATH",
  "PULSE_SIGNAL_PATH",
  "PULSE_SIGNAL_POINTS",
  "PULSE_SIGNAL_SEGMENTS",
  "SplashMotifName",
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

const brandSplashTypes = fs.readFileSync(brandSplashDts, "utf8");
assert(
  brandSplashTypes.includes("wordmark?: ReactNode"),
  "BrandSplash must expose the shared canonical wordmark slot",
);

const packageJson = JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8"));
assert(packageJson.version === "0.4.1", "shared UI version must be 0.4.1");

const motionSheetTypes = fs.readFileSync(motionSheetDts, "utf8");
assert(
  motionSheetTypes.includes("backdropDisabled?: boolean"),
  "MotionSheet must expose semantic backdrop disabling",
);
const motionSheetRuntime = fs.readFileSync(motionSheetJs, "utf8");
assert(
  motionSheetRuntime.includes("backdropDisabled = false"),
  "MotionSheet must default backdropDisabled to false",
);
assert(
  motionSheetRuntime.includes(
    "accessibilityState: { disabled: backdropDisabled }, disabled: backdropDisabled",
  ),
  "MotionSheet must make its backdrop pressable semantically disabled",
);

const internalTypes = fs.readFileSync(internalDts, "utf8");
assert(internalTypes.includes('"pulse"'), "OneCountApp must include pulse");

const require = createRequire(import.meta.url);
const { CORE, TOKENS_VERSION } = require("@onecount/ui-tokens");
const { resolveAuroraSecondaryHue } = require(path.join(distDir, "auroraPalette.js"));
const { APP_LABELS } = require(path.join(distDir, "internal.js"));
const {
  DEFAULT_SPLASH_MOTIF,
  PULSE_SIGNAL_HIGHLIGHT_PATH,
  PULSE_SIGNAL_PATH,
  PULSE_SIGNAL_POINTS,
  PULSE_SIGNAL_SEGMENTS,
} = require(path.join(distDir, "splashContract.js"));
assert(TOKENS_VERSION === "0.6.0", "ui-tokens version did not resolve to 0.6.0");
assert(APP_LABELS.pulse === "Pulse", "Pulse app label did not resolve");
assert(CORE.brand.accent === CORE.identityHues.onecount, "brand accent and OneCount identity hue drifted");
assert(CORE.brand.ai === CORE.ai, "AI core token drifted");
assert(CORE.componentState.pressScale === CORE.motion.micro.pressScaleButton, "press scale token drifted");
assert(CORE.haptics["destructive-confirmed"] === "strong", "haptic vocabulary did not resolve");
assert(
  resolveAuroraSecondaryHue("shield", "brand") === CORE.brand.ai,
  "Aurora brand palette did not preserve the original magenta layer",
);
assert(
  resolveAuroraSecondaryHue("shield", "product") === CORE.identityHues.shield,
  "Aurora product palette did not resolve the app identity hue",
);
assert(
  resolveAuroraSecondaryHue("trace", "brand", "#123456") === "#123456",
  "Aurora explicit hue did not override the selected palette",
);
assert(
  resolveAuroraSecondaryHue("pulse", "brand") === CORE.brand.ai,
  "Pulse Aurora brand palette did not preserve the original magenta layer",
);
assert(
  resolveAuroraSecondaryHue("pulse", "product") === CORE.identityHues.pulse,
  "Pulse Aurora product palette did not resolve the violet identity hue",
);
assert(DEFAULT_SPLASH_MOTIF.pulse === "pulse", "Pulse did not resolve its default splash motif");
assert(
  PULSE_SIGNAL_PATH === "M42 133H74L89 116L103 137L120 72L136 158L151 120L166 133H198",
  "Pulse signal path drifted from the approved design",
);
assert(
  PULSE_SIGNAL_HIGHLIGHT_PATH === "M44 130H74L89 113L103 134L120 69L136 155L151 117L166 130H196",
  "Pulse signal highlight path drifted from the approved design",
);
assert(PULSE_SIGNAL_SEGMENTS.length === 8, "Pulse signal must contain eight segments");
assert(
  PULSE_SIGNAL_POINTS[0][0] === 42 &&
    PULSE_SIGNAL_POINTS[0][1] === 133 &&
    PULSE_SIGNAL_POINTS[1][0] === 74 &&
    PULSE_SIGNAL_POINTS[1][1] === 133,
  "Pulse signal first horizontal endpoints drifted",
);
assert(
  PULSE_SIGNAL_POINTS[7][0] === 166 &&
    PULSE_SIGNAL_POINTS[7][1] === 133 &&
    PULSE_SIGNAL_POINTS[8][0] === 198 &&
    PULSE_SIGNAL_POINTS[8][1] === 133,
  "Pulse signal last horizontal endpoints drifted",
);
assert(
  PULSE_SIGNAL_SEGMENTS.some(({ angleDeg }) => angleDeg > 0),
  "Pulse signal must contain a positive diagonal angle",
);
assert(
  PULSE_SIGNAL_SEGMENTS.some(({ angleDeg }) => angleDeg < 0),
  "Pulse signal must contain a negative diagonal angle",
);

console.log("smoke ok");
