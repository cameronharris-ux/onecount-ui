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
exports.Aurora = Aurora;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_native_1 = require("react-native");
const react_native_svg_1 = __importStar(require("react-native-svg"));
const react_native_reanimated_1 = __importStar(require("react-native-reanimated"));
const ui_tokens_1 = require("@onecount/ui-tokens");
const internal_1 = require("./internal");
const useReducedMotion_1 = require("./useReducedMotion");
const W = 390;
const H = 800;
function containerStyle(full, height, intensity) {
    return full
        ? {
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: intensity,
        }
        : {
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: height !== null && height !== void 0 ? height : 300,
            opacity: intensity,
        };
}
function useLayerDrift(enabled, offset, x, y, scaleBy) {
    const phase = (0, react_native_reanimated_1.useSharedValue)(0);
    (0, react_1.useEffect)(() => {
        if (!enabled) {
            (0, react_native_reanimated_1.cancelAnimation)(phase);
            phase.value = 0;
            return;
        }
        phase.value = 0;
        phase.value = (0, react_native_reanimated_1.withRepeat)((0, react_native_reanimated_1.withTiming)(1, {
            duration: ui_tokens_1.CORE.motion.ambient.durationMs,
            easing: react_native_reanimated_1.Easing.linear,
        }), -1, false);
        return () => {
            (0, react_native_reanimated_1.cancelAnimation)(phase);
        };
    }, [enabled, phase]);
    return (0, react_native_reanimated_1.useAnimatedStyle)(() => {
        const angle = (phase.value + offset) * Math.PI * 2;
        return {
            transform: [
                { translateX: Math.sin(angle) * x },
                { translateY: Math.cos(angle) * y },
                { scale: 1 + Math.sin(angle) * scaleBy },
            ],
        };
    });
}
function StaticSvg({ mint, identity, teal }) {
    return ((0, jsx_runtime_1.jsxs)(react_native_svg_1.default, { width: "100%", height: "100%", viewBox: `0 0 ${W} ${H}`, preserveAspectRatio: "none", children: [(0, jsx_runtime_1.jsxs)(react_native_svg_1.Defs, { children: [(0, jsx_runtime_1.jsxs)(react_native_svg_1.RadialGradient, { id: "ocMint", cx: "50%", cy: "50%", rx: "50%", ry: "50%", children: [(0, jsx_runtime_1.jsx)(react_native_svg_1.Stop, { offset: "0", stopColor: mint, stopOpacity: 0.32 }), (0, jsx_runtime_1.jsx)(react_native_svg_1.Stop, { offset: "0.65", stopColor: mint, stopOpacity: 0 })] }), (0, jsx_runtime_1.jsxs)(react_native_svg_1.RadialGradient, { id: "ocIdentity", cx: "50%", cy: "50%", rx: "50%", ry: "50%", children: [(0, jsx_runtime_1.jsx)(react_native_svg_1.Stop, { offset: "0", stopColor: identity, stopOpacity: 0.22 }), (0, jsx_runtime_1.jsx)(react_native_svg_1.Stop, { offset: "0.65", stopColor: identity, stopOpacity: 0 })] }), (0, jsx_runtime_1.jsxs)(react_native_svg_1.RadialGradient, { id: "ocTeal", cx: "50%", cy: "50%", rx: "50%", ry: "50%", children: [(0, jsx_runtime_1.jsx)(react_native_svg_1.Stop, { offset: "0", stopColor: teal, stopOpacity: 0.16 }), (0, jsx_runtime_1.jsx)(react_native_svg_1.Stop, { offset: "0.7", stopColor: teal, stopOpacity: 0 })] })] }), (0, jsx_runtime_1.jsx)(react_native_svg_1.Ellipse, { cx: W * 0.2, cy: H * 0.06, rx: W * 0.7, ry: H * 0.22, fill: "url(#ocMint)" }), (0, jsx_runtime_1.jsx)(react_native_svg_1.Ellipse, { cx: W * 0.95, cy: H * 0.1, rx: W * 0.6, ry: H * 0.2, fill: "url(#ocIdentity)" }), (0, jsx_runtime_1.jsx)(react_native_svg_1.Ellipse, { cx: W * 0.3, cy: H * 0.92, rx: W * 0.75, ry: H * 0.24, fill: "url(#ocTeal)" })] }));
}
function AnimatedLayer({ layer, style }) {
    return ((0, jsx_runtime_1.jsx)(react_native_reanimated_1.default.View, { pointerEvents: "none", style: [react_native_1.StyleSheet.absoluteFillObject, style], children: (0, jsx_runtime_1.jsxs)(react_native_svg_1.default, { width: "100%", height: "100%", viewBox: `0 0 ${W} ${H}`, preserveAspectRatio: "none", children: [(0, jsx_runtime_1.jsx)(react_native_svg_1.Defs, { children: (0, jsx_runtime_1.jsxs)(react_native_svg_1.RadialGradient, { id: layer.id, cx: "50%", cy: "50%", rx: "50%", ry: "50%", children: [(0, jsx_runtime_1.jsx)(react_native_svg_1.Stop, { offset: "0", stopColor: layer.color, stopOpacity: layer.firstStopOpacity }), (0, jsx_runtime_1.jsx)(react_native_svg_1.Stop, { offset: layer.secondStopOffset, stopColor: layer.color, stopOpacity: 0 })] }) }), (0, jsx_runtime_1.jsx)(react_native_svg_1.Ellipse, { cx: layer.cx, cy: layer.cy, rx: layer.rx, ry: layer.ry, fill: `url(#${layer.id})` })] }) }));
}
function Aurora({ app = "onecount", hue, variant = "static", full = true, height, intensity = 0.6, }) {
    const reducedMotion = (0, useReducedMotion_1.useReducedMotion)();
    const animate = variant === "ambient" && !reducedMotion;
    const mint = ui_tokens_1.CORE.brand.accent;
    const identity = hue !== null && hue !== void 0 ? hue : (0, internal_1.appHue)(app);
    const teal = ui_tokens_1.CORE.brand.tealBridge;
    const mintDrift = useLayerDrift(animate, 0, 10, 6, 0.018);
    const identityDrift = useLayerDrift(animate, 0.33, 12, 8, 0.022);
    const tealDrift = useLayerDrift(animate, 0.67, 8, 5, 0.014);
    const layers = [
        {
            id: "ocMintAmbient",
            color: mint,
            firstStopOpacity: 0.32,
            secondStopOffset: "0.65",
            cx: W * 0.2,
            cy: H * 0.06,
            rx: W * 0.7,
            ry: H * 0.22,
        },
        {
            id: "ocIdentityAmbient",
            color: identity,
            firstStopOpacity: 0.22,
            secondStopOffset: "0.65",
            cx: W * 0.95,
            cy: H * 0.1,
            rx: W * 0.6,
            ry: H * 0.2,
        },
        {
            id: "ocTealAmbient",
            color: teal,
            firstStopOpacity: 0.16,
            secondStopOffset: "0.7",
            cx: W * 0.3,
            cy: H * 0.92,
            rx: W * 0.75,
            ry: H * 0.24,
        },
    ];
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { pointerEvents: "none", style: containerStyle(full, height, intensity), children: animate ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(AnimatedLayer, { layer: layers[0], style: mintDrift }), (0, jsx_runtime_1.jsx)(AnimatedLayer, { layer: layers[1], style: identityDrift }), (0, jsx_runtime_1.jsx)(AnimatedLayer, { layer: layers[2], style: tealDrift })] })) : ((0, jsx_runtime_1.jsx)(StaticSvg, { mint: mint, identity: identity, teal: teal })) }));
}
