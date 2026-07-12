/**
 * BrandSplash — the OneCount family's shared startup choreography
 * (docs/MOTION.md §5). One clock, five stages, per-app motif:
 *
 *   1 environment   — theme-dark background (matches the native splash tile)
 *   2 construction  — the "1" mark assembles from its real segments
 *   3 lock-in       — precise-spring settle + one brand-lock-in haptic
 *   4 identity      — product name + descriptor rise in
 *   5 handoff       — overlay fades over the already-rendered app
 *
 * Apps supply only { app, productName, descriptor, motif, onDone }. An app
 * with a canonical lockup asset may also provide `wordmark`; it replaces the
 * constructed mark + text while preserving the same motif, identity timing,
 * lock-in haptic, reduced-motion behavior, and handoff.
 * overlay is pointerEvents="none" and must be mounted only once the app is
 * ready (after SplashScreen.hideAsync) — it never blocks input or readiness.
 * Reduced motion: static mark + name fade-in/hold/fade-out, under 900 ms,
 * haptic preserved.
 */
import React, { type ReactNode } from "react";
import { type StyleProp, type ViewStyle } from "react-native";
import { type AppKey } from "@onecount/ui-tokens";
import { type SplashMotifName } from "./motifs";
export interface BrandSplashProps {
    /** App key from @onecount/ui-tokens — drives theme, identity hue, motif. */
    app: AppKey;
    /** Product name shown in stage 4 (e.g. "OneCount", "Shield"). */
    productName: string;
    /** Canonical product lockup. Replaces the assembled mark + text when supplied. */
    wordmark?: ReactNode;
    /** Optional short descriptor beneath the name. */
    descriptor?: string;
    /** Motif override; defaults per app (barcode/workflow/boundary/trace). */
    motif?: SplashMotifName;
    backgroundColor?: string;
    /** Identity hue override for the mark dot + motif accents. */
    accent?: string;
    /** Fire the brand-lock-in haptic at mark settle (default true, one per mount). */
    haptics?: boolean;
    /**
     * When false, stages 1–4 play and the overlay HOLDS (no stage-5 fade); the
     * caller later flips `dismiss` to run the handoff. For boot screens that
     * must persist until the app is actually ready. Default true.
     */
    autoHide?: boolean;
    /** With autoHide=false: flip to true to run the stage-5 handoff now. */
    dismiss?: boolean;
    onDone?: () => void;
    style?: StyleProp<ViewStyle>;
}
export declare function BrandSplash({ app, productName, wordmark, descriptor, motif, backgroundColor, accent, haptics, autoHide, dismiss, onDone, style, }: BrandSplashProps): React.JSX.Element;
