/**
 * StaggerIn — the family's one list/section entrance. Replaces the ~50
 * hand-rolled `entering={FadeInDown.delay(i * 30).duration(220)}` sites across
 * the apps with a single reduced-motion-aware, token-timed implementation.
 *
 * Stagger is capped (default 8 steps) so long lists settle quickly, and the
 * whole entrance is skipped under reduced motion — state feedback belongs to
 * the content, not the entrance.
 */
import React from "react";
import type { StyleProp, ViewStyle } from "react-native";
export interface StaggerInProps {
    /** Index in the list; delay = min(index, maxSteps) × stepMs. */
    index?: number;
    /** Per-step delay (ms). */
    stepMs?: number;
    /** Cap on counted steps so long lists don't accumulate delay. */
    maxSteps?: number;
    /** Extra flat delay before the stagger (ms). */
    baseDelayMs?: number;
    /** Entrance duration; defaults to the standard motion token. */
    durationMs?: number;
    style?: StyleProp<ViewStyle>;
    children?: React.ReactNode;
}
export declare function StaggerIn({ index, stepMs, maxSteps, baseDelayMs, durationMs, style, children, }: StaggerInProps): React.JSX.Element;
