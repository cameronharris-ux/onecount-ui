/**
 * AnimatedRing — the family's one ring sweep. Generalised from Shield's score
 * dial, Ops's shift-score dial, and Trace's freshness ring: an SVG circle
 * whose strokeDashoffset sweeps in via useAnimatedProps, on the data-reveal
 * motion token. Callers own their own size/stroke math, colour band, and
 * centred content (numeral, caption, status row) — this component owns only
 * the ring geometry and the motion.
 */
import React from "react";
import { type StyleProp, type ViewStyle } from "react-native";
export interface AnimatedRingProps {
    size: number;
    strokeWidth: number;
    /** 0..1 — callers normalise their own 0–100 (or other range) score first. */
    progress: number;
    color: string;
    trackColor: string;
    /** Round stroke caps; every existing ring in the family uses this. */
    rounded?: boolean;
    /** Delay before the sweep starts (ms). Ops's dial staggers 120ms after mount. */
    delayMs?: number;
    /** Overrides the sweep duration; defaults to the data-reveal motion token. */
    durationMs?: number;
    style?: StyleProp<ViewStyle>;
    /** Absolutely-centred content — numeral, caption, status row. */
    children?: React.ReactNode;
}
export declare function AnimatedRing({ size, strokeWidth, progress, color, trackColor, rounded, delayMs, durationMs, style, children, }: AnimatedRingProps): React.JSX.Element;
