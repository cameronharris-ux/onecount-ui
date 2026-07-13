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
exports.SPLASH_MOTIFS = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
/**
 * BrandSplash secondary motifs — the only part of the splash that differs per
 * product. Same skeleton, same clock (MOTION.splashStages), different
 * geometry:
 *
 *   barcode  (OneCount) — hairline bars aligning as the mark assembles
 *   boundary (Shield)   — corner brackets + one lock-in ring pulse
 *   trace    (Trace)    — nodes connected by a line completing at lock-in
 *   workflow (Ops)      — four nodes closing into a loop at lock-in
 *   pulse    (Pulse)    — eight signal segments drawing in path order
 *
 * Plain Views + transform/opacity only; motifs render nothing under reduced
 * motion (the splash falls back to mark + name fades).
 */
const react_1 = require("react");
const react_native_1 = require("react-native");
const react_native_reanimated_1 = __importStar(require("react-native-reanimated"));
const ui_tokens_1 = require("@onecount/ui-tokens");
const motion_1 = require("./motion");
const splashContract_1 = require("./splashContract");
const STAGES = ui_tokens_1.MOTION.splashStages;
/** Drives 0→1 across the construction window, then a single lock-in pulse 1→2→1. */
function useMotifClock() {
    const build = (0, react_native_reanimated_1.useSharedValue)(0);
    const pulse = (0, react_native_reanimated_1.useSharedValue)(0);
    (0, react_1.useEffect)(() => {
        build.value = (0, react_native_reanimated_1.withDelay)(STAGES.construction[0], (0, react_native_reanimated_1.withTiming)(1, { duration: STAGES.construction[1] - STAGES.construction[0], easing: motion_1.EASE.emphasized }));
        pulse.value = (0, react_native_reanimated_1.withDelay)(STAGES.lockIn[0], (0, react_native_reanimated_1.withSequence)((0, react_native_reanimated_1.withTiming)(1, { duration: 140, easing: motion_1.EASE.standard }), (0, react_native_reanimated_1.withTiming)(0, { duration: 320, easing: motion_1.EASE.exit })));
        return () => {
            (0, react_native_reanimated_1.cancelAnimation)(build);
            (0, react_native_reanimated_1.cancelAnimation)(pulse);
        };
    }, [build, pulse]);
    return { build, pulse };
}
/** A single element revealed during its slice of the build window. */
function BuildIn({ build, pulse, index, count, baseOpacity, pulseOpacity, fromTranslateY = 0, fromTranslateX = 0, style, children, }) {
    const animatedStyle = (0, react_native_reanimated_1.useAnimatedStyle)(() => {
        const start = index / (count + 1);
        const end = (index + 1.6) / (count + 1);
        const t = (0, react_native_reanimated_1.interpolate)(build.value, [start, Math.min(end, 1)], [0, 1], "clamp");
        const lift = pulseOpacity == null ? 0 : pulse.value * (pulseOpacity - baseOpacity);
        return {
            opacity: t * baseOpacity + lift,
            transform: [
                { translateY: (1 - t) * fromTranslateY },
                { translateX: (1 - t) * fromTranslateX },
            ],
        };
    });
    return (0, jsx_runtime_1.jsx)(react_native_reanimated_1.default.View, { style: [style, animatedStyle], children: children });
}
/** A connecting line that draws (scaleX 0→1) during its slice of the build. */
function DrawLine({ build, index, count, baseOpacity, style, }) {
    const animatedStyle = (0, react_native_reanimated_1.useAnimatedStyle)(() => {
        const start = index / (count + 1);
        const end = (index + 1.4) / (count + 1);
        const t = (0, react_native_reanimated_1.interpolate)(build.value, [start, Math.min(end, 1)], [0, 1], "clamp");
        return { opacity: t > 0 ? baseOpacity : 0, transform: [{ scaleX: t }] };
    });
    return (0, jsx_runtime_1.jsx)(react_native_reanimated_1.default.View, { style: [style, animatedStyle] });
}
// ---------------------------------------------------------------------------
// OneCount — barcode field
// ---------------------------------------------------------------------------
const BAR_HEIGHTS = [0.34, 0.58, 0.42, 0.66, 0.5];
function BarcodeMotif({ lineColor, markHeight }) {
    const { build, pulse } = useMotifClock();
    const gap = Math.round(markHeight * 0.11);
    // Clear the mark (width ≈ 0.73 × height) plus breathing room on each side.
    const clearance = Math.round(markHeight * 0.73 + markHeight * 0.34);
    const group = (dir) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [styles.rowCenter, { gap }], children: BAR_HEIGHTS.map((h, i) => ((0, jsx_runtime_1.jsx)(BuildIn, { build: build, pulse: pulse, index: dir === -1 ? BAR_HEIGHTS.length - 1 - i : i, count: BAR_HEIGHTS.length, baseOpacity: 0.16, pulseOpacity: 0.34, fromTranslateY: (i % 2 === 0 ? -1 : 1) * 14, style: { width: 2, height: markHeight * h, borderRadius: 1, backgroundColor: lineColor } }, i))) }));
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { pointerEvents: "none", style: [styles.fill, styles.center], children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [styles.rowCenter, { gap: clearance }], children: [group(-1), group(1)] }) }));
}
// ---------------------------------------------------------------------------
// Shield — boundary brackets + one ring pulse
// ---------------------------------------------------------------------------
function BoundaryMotif({ lineColor, accent, markHeight }) {
    const { build, pulse } = useMotifClock();
    const boxW = markHeight * 1.06;
    const boxH = markHeight * 1.26;
    const arm = Math.round(markHeight * 0.16);
    const thick = 2;
    const radius = 10;
    // Each corner bracket is one View drawing exactly two borders.
    const corners = [
        {
            key: "tl",
            pos: { left: 0, top: 0 },
            border: { borderTopWidth: thick, borderLeftWidth: thick, borderTopLeftRadius: radius },
            out: [-10, -10],
        },
        {
            key: "tr",
            pos: { right: 0, top: 0 },
            border: { borderTopWidth: thick, borderRightWidth: thick, borderTopRightRadius: radius },
            out: [10, -10],
        },
        {
            key: "bl",
            pos: { left: 0, bottom: 0 },
            border: { borderBottomWidth: thick, borderLeftWidth: thick, borderBottomLeftRadius: radius },
            out: [-10, 10],
        },
        {
            key: "br",
            pos: { right: 0, bottom: 0 },
            border: { borderBottomWidth: thick, borderRightWidth: thick, borderBottomRightRadius: radius },
            out: [10, 10],
        },
    ];
    const ringStyle = (0, react_native_reanimated_1.useAnimatedStyle)(() => ({
        opacity: pulse.value * 0.25,
        transform: [{ scale: 1 + pulse.value * 0.12 }],
    }));
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { pointerEvents: "none", style: [styles.fill, styles.center], children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { width: boxW, height: boxH }, children: [corners.map((corner, i) => ((0, jsx_runtime_1.jsx)(BuildIn, { build: build, pulse: pulse, index: i, count: 4, baseOpacity: 0.32, pulseOpacity: 0.5, fromTranslateX: corner.out[0], fromTranslateY: corner.out[1], style: [{ position: "absolute", width: arm, height: arm, borderColor: lineColor }, corner.pos, corner.border] }, corner.key))), (0, jsx_runtime_1.jsx)(react_native_reanimated_1.default.View, { style: [
                        react_native_1.StyleSheet.absoluteFill,
                        { borderWidth: 1.5, borderColor: accent, borderRadius: markHeight * 0.16 },
                        ringStyle,
                    ] })] }) }));
}
// ---------------------------------------------------------------------------
// Trace — nodes connected by a completing line
// ---------------------------------------------------------------------------
function TraceMotif({ lineColor, accent, markHeight }) {
    const { build, pulse } = useMotifClock();
    // Above the mark — the identity text owns the space below it.
    const y = -markHeight * 0.92;
    const span = markHeight * 0.42;
    const nodes = [-1, 0, 1];
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { pointerEvents: "none", style: [styles.fill, styles.center], children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { top: y, width: span * 2 + 24, height: 8, justifyContent: "center" }, children: [nodes.slice(0, -1).map((n, i) => ((0, jsx_runtime_1.jsx)(DrawLine, { build: build, index: i * 2 + 1, count: 5, baseOpacity: 0.3, style: {
                        position: "absolute",
                        left: 12 + (n + 1) * span,
                        width: span,
                        height: 1.5,
                        backgroundColor: lineColor,
                        transformOrigin: "left",
                    } }, `seg-${i}`))), nodes.map((n, i) => ((0, jsx_runtime_1.jsx)(BuildIn, { build: build, pulse: pulse, index: i * 2, count: 5, baseOpacity: i === nodes.length - 1 ? 0.9 : 0.5, pulseOpacity: i === nodes.length - 1 ? 1 : 0.5, style: [
                        styles.dot,
                        {
                            left: 12 + (n + 1) * span - 4,
                            top: 0,
                            backgroundColor: i === nodes.length - 1 ? accent : lineColor,
                        },
                    ] }, `node-${i}`)))] }) }));
}
// ---------------------------------------------------------------------------
// Ops — four nodes closing into a loop
// ---------------------------------------------------------------------------
function WorkflowMotif({ lineColor, accent, markHeight }) {
    const { build, pulse } = useMotifClock();
    // Corners of a square large enough to frame the mark AND the identity text
    // as one organised system — no edge crosses the mark or the type.
    const d = markHeight * 1.15;
    const positions = [
        { x: -d, y: -d },
        { x: d, y: -d },
        { x: d, y: d },
        { x: -d, y: d },
    ];
    const edgeLen = 2 * d;
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { pointerEvents: "none", style: [styles.fill, styles.center], children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { width: 0, height: 0 }, children: [positions.map((pos, i) => {
                    const next = positions[(i + 1) % positions.length];
                    const angle = (Math.atan2(next.y - pos.y, next.x - pos.x) * 180) / Math.PI;
                    return ((0, jsx_runtime_1.jsx)(DrawLine, { build: build, index: i, count: 4, baseOpacity: 0.28, style: {
                            position: "absolute",
                            left: pos.x,
                            top: pos.y,
                            width: edgeLen,
                            height: 1.5,
                            backgroundColor: lineColor,
                            transformOrigin: "left",
                            transform: [{ rotate: `${angle}deg` }],
                        } }, `edge-${i}`));
                }), positions.map((pos, i) => ((0, jsx_runtime_1.jsx)(BuildIn, { build: build, pulse: pulse, index: i, count: 4, baseOpacity: i === 0 ? 0.9 : 0.55, pulseOpacity: i === 0 ? 1 : 0.8, style: [
                        styles.dot,
                        { left: pos.x - 4, top: pos.y - 4, backgroundColor: i === 0 ? accent : lineColor },
                    ] }, `node-${i}`)))] }) }));
}
// ---------------------------------------------------------------------------
// Pulse — workforce signal waveform
// ---------------------------------------------------------------------------
function PulseMotif({ lineColor, accent, markHeight }) {
    const { build, pulse } = useMotifClock();
    const scale = markHeight / 240;
    const accentStyle = (0, react_native_reanimated_1.useAnimatedStyle)(() => ({ opacity: pulse.value * 0.24 }));
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { pointerEvents: "none", style: [styles.fill, styles.center], children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 0, height: 0 }, children: splashContract_1.PULSE_SIGNAL_SEGMENTS.map((segment, index) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    position: "absolute",
                    left: (segment.x - 120) * scale,
                    top: (segment.y - 120) * scale - 1,
                    width: segment.length * scale,
                    height: 2,
                    transformOrigin: "left",
                    transform: [{ rotate: `${segment.angleDeg}deg` }],
                }, children: [(0, jsx_runtime_1.jsx)(DrawLine, { build: build, index: index, count: splashContract_1.PULSE_SIGNAL_SEGMENTS.length, baseOpacity: 0.42, style: {
                            width: "100%",
                            height: 2,
                            borderRadius: 1,
                            backgroundColor: lineColor,
                            transformOrigin: "left",
                        } }), (0, jsx_runtime_1.jsx)(react_native_reanimated_1.default.View, { style: [styles.pulseAccent, { backgroundColor: accent }, accentStyle] })] }, `signal-${index}`))) }) }));
}
exports.SPLASH_MOTIFS = {
    barcode: BarcodeMotif,
    boundary: BoundaryMotif,
    trace: TraceMotif,
    workflow: WorkflowMotif,
    pulse: PulseMotif,
};
const styles = react_native_1.StyleSheet.create({
    fill: react_native_1.StyleSheet.absoluteFillObject,
    center: { alignItems: "center", justifyContent: "center" },
    rowCenter: { flexDirection: "row", alignItems: "center" },
    absCenter: { position: "absolute" },
    dot: { position: "absolute", width: 8, height: 8, borderRadius: 4 },
    dotStatic: { width: 8, height: 8, borderRadius: 4 },
    pulseAccent: { ...react_native_1.StyleSheet.absoluteFillObject, borderRadius: 1 },
});
