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

function bezier(name: MotionEasingName): EasingFn {
  const [x1, y1, x2, y2] = MOTION.easing[name];
  return Easing.bezier(x1, y1, x2, y2);
}

/** Motion-token easings as Reanimated easing functions. */
export const EASE: Record<MotionEasingName, EasingFn | typeof Easing.linear> = {
  standard: bezier("standard"),
  enter: bezier("enter"),
  exit: bezier("exit"),
  emphasized: bezier("emphasized"),
  move: bezier("move"),
  linear: Easing.linear,
};

/** Motion-token durations (ms). */
export const DUR: Record<MotionDurationName, number> = MOTION.duration;

/** Motion-token spring configs, usable directly in withSpring. */
export const SPRING: Record<"soft" | "precise" | "press" | "release", SpringSpec> = MOTION.spring;

export interface TimingConfig {
  duration: number;
  easing: EasingFn | typeof Easing.linear;
}

/** withTiming config from the token scale. Easing defaults to `standard`. */
export function timing(duration: MotionDurationName, easing: MotionEasingName = "standard"): TimingConfig {
  return { duration: DUR[duration], easing: EASE[easing] };
}

/** Exit counterpart of an entrance: exitRatio × duration on the exit curve. */
export function exitTiming(duration: MotionDurationName, easing: MotionEasingName = "exit"): TimingConfig {
  return { duration: Math.round(DUR[duration] * MOTION.exitRatio), easing: EASE[easing] };
}
