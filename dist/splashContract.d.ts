import type { ThemeName } from "@onecount/ui-tokens";
export type SplashMotifName = "barcode" | "boundary" | "trace" | "workflow" | "pulse";
export declare const PULSE_SIGNAL_PATH = "M42 133H74L89 116L103 137L120 72L136 158L151 120L166 133H198";
export declare const PULSE_SIGNAL_HIGHLIGHT_PATH = "M44 130H74L89 113L103 134L120 69L136 155L151 117L166 130H196";
export declare const PULSE_SIGNAL_POINTS: readonly [readonly [42, 133], readonly [74, 133], readonly [89, 116], readonly [103, 137], readonly [120, 72], readonly [136, 158], readonly [151, 120], readonly [166, 133], readonly [198, 133]];
export declare const PULSE_SIGNAL_SEGMENTS: {
    x: 120 | 42 | 74 | 89 | 103 | 136 | 151 | 166 | 198;
    y: 120 | 133 | 116 | 137 | 72 | 158;
    length: number;
    angleDeg: number;
}[];
export declare const DEFAULT_SPLASH_MOTIF: Record<ThemeName, SplashMotifName>;
