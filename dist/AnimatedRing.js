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
exports.AnimatedRing = AnimatedRing;
const jsx_runtime_1 = require("react/jsx-runtime");
/**
 * AnimatedRing — the family's one ring sweep. Generalised from Shield's score
 * dial, Ops's shift-score dial, and Trace's freshness ring: an SVG circle
 * whose strokeDashoffset sweeps in via useAnimatedProps, on the data-reveal
 * motion token. Callers own their own size/stroke math, colour band, and
 * centred content (numeral, caption, status row) — this component owns only
 * the ring geometry and the motion.
 */
const react_1 = require("react");
const react_native_1 = require("react-native");
const react_native_svg_1 = __importStar(require("react-native-svg"));
const react_native_reanimated_1 = __importStar(require("react-native-reanimated"));
const motion_1 = require("./motion");
const useReducedMotion_1 = require("./useReducedMotion");
const AnimatedCircle = react_native_reanimated_1.default.createAnimatedComponent(react_native_svg_1.Circle);
function AnimatedRing({ size, strokeWidth, progress, color, trackColor, rounded = true, delayMs = 0, durationMs, style, children, }) {
    const reducedMotion = (0, useReducedMotion_1.useReducedMotion)();
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const clamped = Math.max(0, Math.min(1, progress));
    // Undelayed by default (Shield/Trace); reduced motion snaps straight to the
    // end state instead of sweeping, same contract as every ring it replaces.
    const fraction = (0, react_native_reanimated_1.useSharedValue)(reducedMotion ? clamped : 0);
    (0, react_1.useEffect)(() => {
        if (reducedMotion) {
            fraction.value = clamped;
            return;
        }
        const config = durationMs === undefined ? (0, motion_1.timing)("data") : { duration: durationMs, easing: motion_1.EASE.standard };
        fraction.value = delayMs > 0 ? (0, react_native_reanimated_1.withDelay)(delayMs, (0, react_native_reanimated_1.withTiming)(clamped, config)) : (0, react_native_reanimated_1.withTiming)(clamped, config);
    }, [clamped, delayMs, durationMs, fraction, reducedMotion]);
    const animatedProps = (0, react_native_reanimated_1.useAnimatedProps)(() => ({
        strokeDashoffset: circumference * (1 - fraction.value),
    }));
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ width: size, height: size, alignItems: "center", justifyContent: "center" }, style], children: [(0, jsx_runtime_1.jsxs)(react_native_svg_1.default, { width: size, height: size, children: [(0, jsx_runtime_1.jsx)(react_native_svg_1.Circle, { cx: size / 2, cy: size / 2, r: radius, stroke: trackColor, strokeWidth: strokeWidth, fill: "none" }), (0, jsx_runtime_1.jsx)(AnimatedCircle, { cx: size / 2, cy: size / 2, r: radius, stroke: color, strokeWidth: strokeWidth, strokeLinecap: rounded ? "round" : "butt", strokeDasharray: `${circumference} ${circumference}`, animatedProps: animatedProps, fill: "none", transform: `rotate(-90 ${size / 2} ${size / 2})` })] }), children ? (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { position: "absolute", alignItems: "center" }, children: children }) : null] }));
}
