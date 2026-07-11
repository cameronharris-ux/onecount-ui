/**
 * Reanimated adapter over the OneCount Motion System scale
 * (@onecount/ui-tokens CORE.motionSpec — see docs/MOTION.md).
 *
 * Apps consume these instead of hand-rolling durations/easings/springs:
 *   withTiming(1, timing("standard"))
 *   withSpring(0, SPRING.release)
 *   withTiming(0, exitTiming("nav"))
 */
import { Easing } from "react-native-reanimated";
import { MOTION, type MotionDurationName, type MotionEasingName, type SpringSpec } from "@onecount/ui-tokens";
export { MOTION };
export type { MotionDurationName, MotionEasingName, SpringSpec };
type EasingFn = ReturnType<typeof Easing.bezier>;
/** Motion-token easings as Reanimated easing functions. */
export declare const EASE: Record<MotionEasingName, EasingFn | typeof Easing.linear>;
/** Motion-token durations (ms). */
export declare const DUR: Record<MotionDurationName, number>;
/** Motion-token spring configs, usable directly in withSpring. */
export declare const SPRING: Record<"soft" | "precise" | "press" | "release", SpringSpec>;
export interface TimingConfig {
    duration: number;
    easing: EasingFn | typeof Easing.linear;
}
/** withTiming config from the token scale. Easing defaults to `standard`. */
export declare function timing(duration: MotionDurationName, easing?: MotionEasingName): TimingConfig;
/** Exit counterpart of an entrance: exitRatio × duration on the exit curve. */
export declare function exitTiming(duration: MotionDurationName, easing?: MotionEasingName): TimingConfig;
