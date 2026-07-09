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
exports.AnimatedSplash = AnimatedSplash;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_native_1 = require("react-native");
const react_native_reanimated_1 = __importStar(require("react-native-reanimated"));
const ui_tokens_1 = require("@onecount/ui-tokens");
const useReducedMotion_1 = require("./useReducedMotion");
const OUT = react_native_reanimated_1.Easing.out(react_native_reanimated_1.Easing.cubic);
function AnimatedSplash({ markSource, wordmarkSource, backgroundColor = (0, ui_tokens_1.themeForApp)("onecount").theme.colors.dark.background, accent = ui_tokens_1.CORE.brand.accent, onDone, style, }) {
    const reducedMotion = (0, useReducedMotion_1.useReducedMotion)();
    const root = (0, react_native_reanimated_1.useSharedValue)(1);
    const markOpacity = (0, react_native_reanimated_1.useSharedValue)(0);
    const markScale = (0, react_native_reanimated_1.useSharedValue)(0.92);
    const wordOpacity = (0, react_native_reanimated_1.useSharedValue)(0);
    const wordY = (0, react_native_reanimated_1.useSharedValue)(12);
    (0, react_1.useEffect)(() => {
        let cancelled = false;
        const finish = () => {
            if (!cancelled) {
                onDone === null || onDone === void 0 ? void 0 : onDone();
            }
        };
        (0, react_native_reanimated_1.cancelAnimation)(root);
        (0, react_native_reanimated_1.cancelAnimation)(markOpacity);
        (0, react_native_reanimated_1.cancelAnimation)(markScale);
        (0, react_native_reanimated_1.cancelAnimation)(wordOpacity);
        (0, react_native_reanimated_1.cancelAnimation)(wordY);
        if (reducedMotion) {
            markOpacity.value = 1;
            markScale.value = 1;
            wordOpacity.value = 1;
            wordY.value = 0;
            root.value = (0, react_native_reanimated_1.withDelay)(220, (0, react_native_reanimated_1.withTiming)(0, { duration: 220, easing: OUT }, (done) => {
                if (done)
                    (0, react_native_reanimated_1.runOnJS)(finish)();
            }));
        }
        else {
            markOpacity.value = (0, react_native_reanimated_1.withTiming)(1, { duration: 420, easing: OUT });
            markScale.value = (0, react_native_reanimated_1.withTiming)(1, { duration: 420, easing: OUT });
            wordOpacity.value = (0, react_native_reanimated_1.withDelay)(180, (0, react_native_reanimated_1.withTiming)(1, { duration: 360, easing: OUT }));
            wordY.value = (0, react_native_reanimated_1.withDelay)(180, (0, react_native_reanimated_1.withTiming)(0, { duration: 360, easing: OUT }));
            root.value = (0, react_native_reanimated_1.withDelay)(1150, (0, react_native_reanimated_1.withTiming)(0, { duration: 300, easing: OUT }, (done) => {
                if (done)
                    (0, react_native_reanimated_1.runOnJS)(finish)();
            }));
        }
        return () => {
            cancelled = true;
            (0, react_native_reanimated_1.cancelAnimation)(root);
            (0, react_native_reanimated_1.cancelAnimation)(markOpacity);
            (0, react_native_reanimated_1.cancelAnimation)(markScale);
            (0, react_native_reanimated_1.cancelAnimation)(wordOpacity);
            (0, react_native_reanimated_1.cancelAnimation)(wordY);
        };
    }, [markOpacity, markScale, onDone, reducedMotion, root, wordOpacity, wordY]);
    const rootStyle = (0, react_native_reanimated_1.useAnimatedStyle)(() => ({ opacity: root.value }));
    const markStyle = (0, react_native_reanimated_1.useAnimatedStyle)(() => ({
        opacity: markOpacity.value,
        transform: [{ scale: markScale.value }],
    }));
    const wordStyle = (0, react_native_reanimated_1.useAnimatedStyle)(() => ({
        opacity: wordOpacity.value,
        transform: [{ translateY: wordY.value }],
    }));
    return ((0, jsx_runtime_1.jsxs)(react_native_reanimated_1.default.View, { pointerEvents: "none", style: [react_native_1.StyleSheet.absoluteFill, styles.root, { backgroundColor }, rootStyle, style], children: [(0, jsx_runtime_1.jsx)(react_native_reanimated_1.default.View, { style: markStyle, children: (0, jsx_runtime_1.jsx)(react_native_1.Image, { source: markSource, style: styles.mark, accessibilityIgnoresInvertColors: true }) }), (0, jsx_runtime_1.jsx)(react_native_reanimated_1.default.View, { style: [styles.wordRow, wordStyle], children: wordmarkSource ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: wordmarkSource, style: styles.wordmark, resizeMode: "contain", accessibilityIgnoresInvertColors: true })) : ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: styles.word, children: ["One", (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: [styles.wordAccent, { color: accent }], children: "Count" })] })) })] }));
}
const styles = react_native_1.StyleSheet.create({
    root: {
        alignItems: "center",
        justifyContent: "center",
        gap: 22,
    },
    mark: {
        width: 104,
        height: 104,
        borderRadius: ui_tokens_1.CORE.radius.xl,
    },
    wordRow: {
        alignItems: "center",
        gap: 4,
    },
    word: {
        fontFamily: ui_tokens_1.CORE.fonts.displayBold,
        fontSize: 30,
        letterSpacing: 0,
        color: (0, ui_tokens_1.themeForApp)("onecount").theme.colors.dark.text,
    },
    wordAccent: {
        color: ui_tokens_1.CORE.brand.accent,
    },
    wordmark: {
        width: 180,
        height: 38,
    },
});
