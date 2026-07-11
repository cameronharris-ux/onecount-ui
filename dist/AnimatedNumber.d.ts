/**
 * AnimatedNumber — the family's KPI/data-reveal numeral. Two engines share
 * one public API:
 *
 * - Default (no `formatValue`): the ReText pattern — a disabled TextInput
 *   whose native `text` prop is driven by `useAnimatedProps`, so the sweep
 *   from the old value to the new one runs entirely on the UI thread. No JS
 *   thread, no React state, no re-render per frame.
 * - `formatValue` supplied: the original JS-thread rAF/setState engine.
 *   Arbitrary formatting (currency, grouping, units) can't run as a UI-thread
 *   worklet, so this path stays on `Text` + `requestAnimationFrame`. It is
 *   also the jest-safe path — kept verbatim because `formatValue` consumers
 *   are rare and its tests must keep passing without a native Reanimated
 *   runtime.
 *
 * Both engines snap straight to the final value under reduced motion.
 */
import React from "react";
import { type StyleProp, type TextProps, type TextStyle } from "react-native";
export interface AnimatedNumberProps extends Omit<TextProps, "children"> {
    value: number;
    prefix?: string;
    suffix?: string;
    /** Defaults to the data-reveal motion token. */
    durationMs?: number;
    style?: StyleProp<TextStyle>;
    mono?: boolean;
    formatValue?: (value: number) => string;
}
export declare function AnimatedNumber(props: AnimatedNumberProps): React.JSX.Element;
