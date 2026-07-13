import type { ThemeName } from "@onecount/ui-tokens";

export type SplashMotifName = "barcode" | "boundary" | "trace" | "workflow" | "pulse";

export const PULSE_SIGNAL_PATH =
  "M42 133H74L89 116L103 137L120 72L136 158L151 120L166 133H198";
export const PULSE_SIGNAL_HIGHLIGHT_PATH =
  "M44 130H74L89 113L103 134L120 69L136 155L151 117L166 130H196";
export const PULSE_SIGNAL_POINTS = [
  [42, 133], [74, 133], [89, 116], [103, 137], [120, 72],
  [136, 158], [151, 120], [166, 133], [198, 133],
] as const;

export const PULSE_SIGNAL_SEGMENTS = PULSE_SIGNAL_POINTS.slice(0, -1).map(
  ([x1, y1], index) => {
    const [x2, y2] = PULSE_SIGNAL_POINTS[index + 1];
    return {
      x: x1,
      y: y1,
      length: Math.hypot(x2 - x1, y2 - y1),
      angleDeg: (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI,
    };
  },
);

export const DEFAULT_SPLASH_MOTIF: Record<ThemeName, SplashMotifName> = {
  onecount: "barcode",
  ops: "workflow",
  shield: "boundary",
  trace: "trace",
  pulse: "pulse",
};
