"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnimatedNumber = AnimatedNumber;
const jsx_runtime_1 = require("react/jsx-runtime");
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
const react_1 = require("react");
const react_native_1 = require("react-native");
const react_native_reanimated_1 = __importStar(require("react-native-reanimated"));
const ui_tokens_1 = require("@onecount/ui-tokens");
const motion_1 = require("./motion");
const useReducedMotion_1 = require("./useReducedMotion");
const AnimatedTextInput = react_native_reanimated_1.default.createAnimatedComponent(react_native_1.TextInput);
function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
}
function monoStyle(mono) {
    return mono
        ? {
            fontFamily: ui_tokens_1.CORE.fonts.monoBold,
            fontVariant: ["tabular-nums"],
        }
        : null;
}
/** JS-thread rAF/setState engine — see file header. */
function FormattedAnimatedNumber({ value, prefix = "", suffix = "", durationMs = ui_tokens_1.MOTION.duration.data, style, mono = true, formatValue, ...rest }) {
    const reducedMotion = (0, useReducedMotion_1.useReducedMotion)();
    const [shown, setShown] = (0, react_1.useState)(value);
    const shownRef = (0, react_1.useRef)(value);
    shownRef.current = shown;
    (0, react_1.useEffect)(() => {
        const from = shownRef.current;
        if (from === value)
            return;
        if (reducedMotion) {
            setShown(value);
            return;
        }
        let frame = 0;
        const start = Date.now();
        const tick = () => {
            const t = Math.min(1, (Date.now() - start) / durationMs);
            const next = Math.round(from + (value - from) * easeOutCubic(t));
            setShown(next);
            if (t < 1) {
                frame = requestAnimationFrame(tick);
            }
        };
        frame = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frame);
    }, [durationMs, reducedMotion, value]);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { ...rest, style: [monoStyle(mono), style], children: [prefix, formatValue(shown), suffix] }));
}
/** UI-thread ReText engine — see file header. Plain rounded numerals only. */
function NumericAnimatedNumber({ value, prefix = "", suffix = "", durationMs, style, mono = true, accessibilityLabel, ...rest }) {
    const reducedMotion = (0, useReducedMotion_1.useReducedMotion)();
    const progress = (0, react_native_reanimated_1.useSharedValue)(value);
    (0, react_1.useEffect)(() => {
        if (reducedMotion) {
            progress.value = value;
            return;
        }
        // durationMs undefined => the token duration+easing pair; a caller
        // override keeps the standard easing curve, only the duration changes.
        progress.value = (0, react_native_reanimated_1.withTiming)(value, durationMs === undefined ? (0, motion_1.timing)("data") : { duration: durationMs, easing: motion_1.EASE.standard });
    }, [durationMs, progress, reducedMotion, value]);
    // `text` is a real native prop on TextInput's view manager (how ReText-style
    // components drive the displayed string on the UI thread) but it isn't in
    // RN's TextInputProps type, so the updater's return is cast through
    // `unknown` to match what `animatedProps` expects.
    const animatedProps = (0, react_native_reanimated_1.useAnimatedProps)(() => ({
        text: `${prefix}${Math.round(progress.value)}${suffix}`,
    }));
    // Screen readers get the real final value, never a mid-sweep number.
    const finalLabel = accessibilityLabel !== null && accessibilityLabel !== void 0 ? accessibilityLabel : `${prefix}${value}${suffix}`;
    return ((0, jsx_runtime_1.jsx)(AnimatedTextInput
    // `rest` is typed as the Text-facing public prop set (see file header:
    // "...TextProps where sensible") but the underlying primitive is a
    // TextInput; only the intersection is meaningful, and any extra prop
    // still passes through untyped to the native view harmlessly.
    , { ...rest, editable: false, underlineColorAndroid: "transparent", pointerEvents: "none", accessible: true, accessibilityLabel: finalLabel, defaultValue: `${prefix}${value}${suffix}`, animatedProps: animatedProps, style: [monoStyle(mono), styles.input, style] }));
}
function AnimatedNumber(props) {
    if (props.formatValue) {
        return (0, jsx_runtime_1.jsx)(FormattedAnimatedNumber, { ...props, formatValue: props.formatValue });
    }
    return (0, jsx_runtime_1.jsx)(NumericAnimatedNumber, { ...props });
}
const styles = react_native_1.StyleSheet.create({
    input: {
        padding: 0,
    },
});
