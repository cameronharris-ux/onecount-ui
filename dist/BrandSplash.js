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
exports.BrandSplash = BrandSplash;
const jsx_runtime_1 = require("react/jsx-runtime");
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
const react_1 = require("react");
const react_native_1 = require("react-native");
const react_native_reanimated_1 = __importStar(require("react-native-reanimated"));
const ui_tokens_1 = require("@onecount/ui-tokens");
const BrandMark_1 = require("./BrandMark");
const haptics_1 = require("./haptics");
const motion_1 = require("./motion");
const motifs_1 = require("./motifs");
const splashContract_1 = require("./splashContract");
const useReducedMotion_1 = require("./useReducedMotion");
const STAGES = ui_tokens_1.MOTION.splashStages;
/** Where each segment starts before it assembles (barcode-lines-aligning). */
function segmentStart(segment) {
    switch (segment.key) {
        case "block-1":
            return { x: 0, y: -46, rotate: 0 };
        case "block-2":
            return { x: 0, y: 38, rotate: 0 };
        case "block-3":
            return { x: 0, y: -34, rotate: 0 };
        case "block-4":
            return { x: 0, y: 50, rotate: 0 };
        case "flag":
            return { x: -26, y: 18, rotate: 9 };
        case "base":
            return { x: 0, y: 64, rotate: 0 };
        case "dot":
            return { x: 18, y: -40, rotate: 0 };
        default:
            return { x: 0, y: 24, rotate: 0 };
    }
}
function AssemblingSegment({ segment, unit, color, index, reducedMotion, }) {
    const progress = (0, react_native_reanimated_1.useSharedValue)(reducedMotion ? 1 : 0);
    const start = segmentStart(segment);
    (0, react_1.useEffect)(() => {
        if (reducedMotion) {
            progress.value = 1;
            return;
        }
        progress.value = (0, react_native_reanimated_1.withDelay)(STAGES.construction[0] + index * STAGES.segmentStaggerMs, (0, react_native_reanimated_1.withTiming)(1, { duration: STAGES.segmentDurationMs, easing: motion_1.EASE.emphasized }));
        return () => (0, react_native_reanimated_1.cancelAnimation)(progress);
    }, [index, progress, reducedMotion]);
    const animatedStyle = (0, react_native_reanimated_1.useAnimatedStyle)(() => {
        var _a;
        const t = progress.value;
        const rotate = (_a = segment.rotate) !== null && _a !== void 0 ? _a : 0;
        return {
            opacity: t,
            transform: [
                { translateX: (1 - t) * start.x * unit },
                { translateY: (1 - t) * start.y * unit },
                { rotate: `${rotate + (1 - t) * start.rotate}deg` },
                { scaleY: 1 + (1 - t) * 0.18 },
            ],
        };
    });
    return ((0, jsx_runtime_1.jsx)(react_native_reanimated_1.default.View, { style: [
            (0, BrandMark_1.segmentStyle)(segment, unit),
            // Rotation handled in the animated transform so it composes with assembly.
            { transform: undefined, backgroundColor: color },
            animatedStyle,
        ] }));
}
function BrandSplash({ app, productName, wordmark, descriptor, motif, backgroundColor, accent, haptics = true, autoHide = true, dismiss = false, onDone, style, }) {
    var _a, _b;
    const reducedMotion = (0, useReducedMotion_1.useReducedMotion)();
    const { theme, themeName } = (0, ui_tokens_1.themeForApp)(app);
    const colors = theme.colors.dark;
    const bg = backgroundColor !== null && backgroundColor !== void 0 ? backgroundColor : colors.background;
    const markColor = colors.text;
    const identity = accent !== null && accent !== void 0 ? accent : ui_tokens_1.CORE.identityHues[themeName];
    const motifName = motif !== null && motif !== void 0 ? motif : splashContract_1.DEFAULT_SPLASH_MOTIF[themeName];
    const Motif = motifs_1.SPLASH_MOTIFS[motifName];
    const markHeight = 128;
    const unit = markHeight / BrandMark_1.BRAND_MARK_UNITS.height;
    const root = (0, react_native_reanimated_1.useSharedValue)(1);
    const markScale = (0, react_native_reanimated_1.useSharedValue)(reducedMotion ? 1 : 1.03);
    const nameOpacity = (0, react_native_reanimated_1.useSharedValue)(0);
    const nameY = (0, react_native_reanimated_1.useSharedValue)(ui_tokens_1.MOTION.distance.md + ui_tokens_1.MOTION.distance.sm);
    const descOpacity = (0, react_native_reanimated_1.useSharedValue)(0);
    (0, react_1.useEffect)(() => {
        let cancelled = false;
        const finish = () => {
            if (!cancelled)
                onDone === null || onDone === void 0 ? void 0 : onDone();
        };
        const lockIn = () => {
            if (!cancelled && haptics)
                void (0, haptics_1.hapticMoment)("brand-lock-in");
        };
        (0, react_native_reanimated_1.cancelAnimation)(root);
        (0, react_native_reanimated_1.cancelAnimation)(markScale);
        (0, react_native_reanimated_1.cancelAnimation)(nameOpacity);
        (0, react_native_reanimated_1.cancelAnimation)(nameY);
        (0, react_native_reanimated_1.cancelAnimation)(descOpacity);
        if (reducedMotion) {
            // Static composition: fade in fast, brief hold, fade out. Under 900 ms.
            markScale.value = 1;
            nameOpacity.value = 1;
            nameY.value = 0;
            descOpacity.value = descriptor ? 1 : 0;
            root.value = 0;
            root.value = autoHide
                ? (0, react_native_reanimated_1.withSequence)((0, react_native_reanimated_1.withTiming)(1, { duration: motion_1.DUR.fast, easing: motion_1.EASE.standard }), (0, react_native_reanimated_1.withDelay)(400, (0, react_native_reanimated_1.withTiming)(0, { duration: motion_1.DUR.standard, easing: motion_1.EASE.exit }, (done) => {
                    if (done)
                        (0, react_native_reanimated_1.runOnJS)(finish)();
                })))
                : (0, react_native_reanimated_1.withTiming)(1, { duration: motion_1.DUR.fast, easing: motion_1.EASE.standard });
            const hold = setTimeout(lockIn, motion_1.DUR.fast);
            return () => {
                cancelled = true;
                clearTimeout(hold);
                (0, react_native_reanimated_1.cancelAnimation)(root);
            };
        }
        // Stage 3 — lock-in: precise settle + single haptic at settle start, then
        // stage 5's gentle zoom-through chained after the spring lands (sequenced:
        // a second .value assignment would cancel the spring).
        const handoffDurForScale = STAGES.handoff[1] - STAGES.handoff[0];
        markScale.value = autoHide
            ? (0, react_native_reanimated_1.withSequence)((0, react_native_reanimated_1.withDelay)(STAGES.lockIn[0], (0, react_native_reanimated_1.withSpring)(1, motion_1.SPRING.precise)), (0, react_native_reanimated_1.withTiming)(1.04, { duration: handoffDurForScale, easing: motion_1.EASE.standard }))
            : (0, react_native_reanimated_1.withDelay)(STAGES.lockIn[0], (0, react_native_reanimated_1.withSpring)(1, motion_1.SPRING.precise));
        const hapticTimer = setTimeout(lockIn, STAGES.lockIn[0]);
        // Stage 4 — identity.
        const identityDur = STAGES.identity[1] - STAGES.identity[0];
        nameOpacity.value = (0, react_native_reanimated_1.withDelay)(STAGES.identity[0], (0, react_native_reanimated_1.withTiming)(1, { duration: identityDur, easing: motion_1.EASE.standard }));
        nameY.value = (0, react_native_reanimated_1.withDelay)(STAGES.identity[0], (0, react_native_reanimated_1.withTiming)(0, { duration: identityDur, easing: motion_1.EASE.standard }));
        descOpacity.value = (0, react_native_reanimated_1.withDelay)(STAGES.identity[0] + 60, (0, react_native_reanimated_1.withTiming)(1, { duration: identityDur, easing: motion_1.EASE.standard }));
        // Stage 5 — handoff: fade out over the already-rendered app beneath.
        // With autoHide=false the overlay holds after identity; the `dismiss`
        // effect below runs the handoff when the caller is ready.
        if (autoHide) {
            const handoffDur = STAGES.handoff[1] - STAGES.handoff[0];
            root.value = (0, react_native_reanimated_1.withDelay)(STAGES.handoff[0], (0, react_native_reanimated_1.withTiming)(0, { duration: handoffDur, easing: motion_1.EASE.exit }, (done) => {
                if (done)
                    (0, react_native_reanimated_1.runOnJS)(finish)();
            }));
        }
        return () => {
            cancelled = true;
            clearTimeout(hapticTimer);
            (0, react_native_reanimated_1.cancelAnimation)(root);
            (0, react_native_reanimated_1.cancelAnimation)(markScale);
            (0, react_native_reanimated_1.cancelAnimation)(nameOpacity);
            (0, react_native_reanimated_1.cancelAnimation)(nameY);
            (0, react_native_reanimated_1.cancelAnimation)(descOpacity);
        };
    }, [autoHide, descriptor, haptics, onDone, reducedMotion, root, markScale, nameOpacity, nameY, descOpacity]);
    // Caller-driven handoff for autoHide=false boot screens.
    const dismissed = (0, react_native_reanimated_1.useSharedValue)(false);
    (0, react_1.useEffect)(() => {
        if (autoHide || !dismiss || dismissed.value)
            return;
        dismissed.value = true;
        const finish = () => onDone === null || onDone === void 0 ? void 0 : onDone();
        root.value = (0, react_native_reanimated_1.withTiming)(0, { duration: Math.round(motion_1.DUR.nav * ui_tokens_1.MOTION.exitRatio), easing: motion_1.EASE.exit }, (done) => {
            if (done)
                (0, react_native_reanimated_1.runOnJS)(finish)();
        });
    }, [autoHide, dismiss, dismissed, onDone, root]);
    const rootStyle = (0, react_native_reanimated_1.useAnimatedStyle)(() => ({ opacity: root.value }));
    const markWrapStyle = (0, react_native_reanimated_1.useAnimatedStyle)(() => ({ transform: [{ scale: markScale.value }] }));
    const nameStyle = (0, react_native_reanimated_1.useAnimatedStyle)(() => ({
        opacity: nameOpacity.value,
        transform: [{ translateY: nameY.value }],
    }));
    const descStyle = (0, react_native_reanimated_1.useAnimatedStyle)(() => ({ opacity: descOpacity.value }));
    return ((0, jsx_runtime_1.jsxs)(react_native_reanimated_1.default.View, { pointerEvents: "none", accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", style: [react_native_1.StyleSheet.absoluteFill, styles.root, { backgroundColor: bg }, rootStyle, style], children: [!reducedMotion ? ((0, jsx_runtime_1.jsx)(Motif, { lineColor: withAlpha(markColor, 0.6), accent: identity, markHeight: markHeight })) : null, wordmark ? ((0, jsx_runtime_1.jsxs)(react_native_reanimated_1.default.View, { style: [styles.nameWrap, markWrapStyle, nameStyle], children: [wordmark, descriptor ? ((0, jsx_runtime_1.jsx)(react_native_reanimated_1.default.Text, { style: [styles.descriptor, { color: (_a = colors.textMuted) !== null && _a !== void 0 ? _a : withAlpha(markColor, 0.55) }, descStyle], children: descriptor })) : null] })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(react_native_reanimated_1.default.View, { style: markWrapStyle, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: BrandMark_1.BRAND_MARK_UNITS.width * unit, height: markHeight }, children: BrandMark_1.BRAND_MARK_SEGMENTS.map((segment, index) => ((0, jsx_runtime_1.jsx)(AssemblingSegment, { segment: segment, unit: unit, color: segment.dot ? identity : markColor, index: index, reducedMotion: reducedMotion }, segment.key))) }) }), (0, jsx_runtime_1.jsxs)(react_native_reanimated_1.default.View, { style: [styles.nameWrap, nameStyle], children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: [styles.name, { color: markColor }], children: productName }), descriptor ? ((0, jsx_runtime_1.jsx)(react_native_reanimated_1.default.Text, { style: [styles.descriptor, { color: (_b = colors.textMuted) !== null && _b !== void 0 ? _b : withAlpha(markColor, 0.55) }, descStyle], children: descriptor })) : null] })] }))] }));
}
/** #RRGGBB → rgba(...) — local, avoids a color dependency. */
function withAlpha(hex, alpha) {
    const match = /^#?([0-9a-f]{6})$/i.exec(hex.trim());
    if (!match)
        return hex;
    const value = parseInt(match[1], 16);
    const r = (value >> 16) & 255;
    const g = (value >> 8) & 255;
    const b = value & 255;
    return `rgba(${r},${g},${b},${alpha})`;
}
const styles = react_native_1.StyleSheet.create({
    root: {
        alignItems: "center",
        justifyContent: "center",
    },
    nameWrap: {
        alignItems: "center",
        marginTop: 26,
        gap: 6,
    },
    name: {
        fontFamily: ui_tokens_1.CORE.fonts.displayBold,
        fontSize: 28,
    },
    descriptor: {
        fontFamily: ui_tokens_1.CORE.fonts.medium,
        fontSize: 12,
        letterSpacing: 3.2,
        textTransform: "uppercase",
    },
});
