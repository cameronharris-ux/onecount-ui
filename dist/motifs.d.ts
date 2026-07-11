/**
 * BrandSplash secondary motifs — the only part of the splash that differs per
 * product. Same skeleton, same clock (MOTION.splashStages), different
 * geometry:
 *
 *   barcode  (OneCount) — hairline bars aligning as the mark assembles
 *   boundary (Shield)   — corner brackets + one lock-in ring pulse
 *   trace    (Trace)    — nodes connected by a line completing at lock-in
 *   workflow (Ops)      — four nodes closing into a loop at lock-in
 *
 * Plain Views + transform/opacity only; motifs render nothing under reduced
 * motion (the splash falls back to mark + name fades).
 */
import React from "react";
export type SplashMotifName = "barcode" | "boundary" | "trace" | "workflow";
export interface MotifProps {
    /** Line/texture colour (already alpha'd by the caller). */
    lineColor: string;
    /** Product identity hue — dots and nodes only. */
    accent: string;
    /** Rendered mark height, used to size the motif field. */
    markHeight: number;
}
export declare const SPLASH_MOTIFS: Record<SplashMotifName, React.ComponentType<MotifProps>>;
