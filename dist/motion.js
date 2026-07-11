"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SPRING = exports.DUR = exports.EASE = exports.MOTION = void 0;
exports.timing = timing;
exports.exitTiming = exitTiming;
/**
 * Reanimated adapter over the OneCount Motion System scale
 * (@onecount/ui-tokens CORE.motionSpec — see docs/MOTION.md).
 *
 * Apps consume these instead of hand-rolling durations/easings/springs:
 *   withTiming(1, timing("standard"))
 *   withSpring(0, SPRING.release)
 *   withTiming(0, exitTiming("nav"))
 */
const react_native_reanimated_1 = require("react-native-reanimated");
const ui_tokens_1 = require("@onecount/ui-tokens");
Object.defineProperty(exports, "MOTION", { enumerable: true, get: function () { return ui_tokens_1.MOTION; } });
function bezier(name) {
    const [x1, y1, x2, y2] = ui_tokens_1.MOTION.easing[name];
    return react_native_reanimated_1.Easing.bezier(x1, y1, x2, y2);
}
/** Motion-token easings as Reanimated easing functions. */
exports.EASE = {
    standard: bezier("standard"),
    enter: bezier("enter"),
    exit: bezier("exit"),
    emphasized: bezier("emphasized"),
    move: bezier("move"),
    linear: react_native_reanimated_1.Easing.linear,
};
/** Motion-token durations (ms). */
exports.DUR = ui_tokens_1.MOTION.duration;
/** Motion-token spring configs, usable directly in withSpring. */
exports.SPRING = ui_tokens_1.MOTION.spring;
/** withTiming config from the token scale. Easing defaults to `standard`. */
function timing(duration, easing = "standard") {
    return { duration: exports.DUR[duration], easing: exports.EASE[easing] };
}
/** Exit counterpart of an entrance: exitRatio × duration on the exit curve. */
function exitTiming(duration, easing = "exit") {
    return { duration: Math.round(exports.DUR[duration] * ui_tokens_1.MOTION.exitRatio), easing: exports.EASE[easing] };
}
