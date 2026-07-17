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
exports.MotionSheet = MotionSheet;
const jsx_runtime_1 = require("react/jsx-runtime");
/**
 * MotionSheet — the family's Reanimated bottom-sheet MOTION shell. Keeps RN
 * Modal's semantics (hardware back button, status-bar layering, one native
 * layer) but replaces its native `slide` animation with the house
 * choreography: backdrop fades in on `timing("nav")` while the sheet springs
 * up on `SPRING.soft`, started on the same clock (paired-element rule).
 * Dismissal runs both on `exitTiming("nav")` — the Modal stays mounted and
 * visible for the full exit, only unmounting once it completes.
 *
 * Fully controlled, like RN Modal itself: `visible` is the single source of
 * truth. Backdrop tap and the hardware back button both just call
 * `onRequestClose`; it is the caller's job to flip `visible` to false, which
 * is what actually starts the exit.
 *
 * No gesture-drag in v1 — dismissal is backdrop-tap, hardware back, or a
 * caller-triggered `onRequestClose` only.
 */
const react_1 = require("react");
const react_native_1 = require("react-native");
const react_native_reanimated_1 = __importStar(require("react-native-reanimated"));
const motion_1 = require("./motion");
const useReducedMotion_1 = require("./useReducedMotion");
// Modal scrim: a neutral black dim, independent of any app/brand theme —
// there is no token for it because every product dims the same way.
const SCRIM_COLOR = "#000";
function MotionSheet({ visible, onRequestClose, children, backdropOpacity: backdropOpacityProp, backdropAccessibilityLabel = "Close", backdropDisabled = false, sheetStyle, contentContainerStyle, testID, }) {
    const reducedMotion = (0, useReducedMotion_1.useReducedMotion)();
    const { height: windowHeight } = (0, react_native_1.useWindowDimensions)();
    // The Modal must stay visible through the exit animation, so "mounted" is
    // one beat behind "visible": it flips true immediately, but only flips
    // back to false once the exit has actually finished.
    const [mounted, setMounted] = (0, react_1.useState)(visible);
    const backdropTarget = backdropOpacityProp !== null && backdropOpacityProp !== void 0 ? backdropOpacityProp : motion_1.MOTION.opacity.backdrop;
    const backdropOpacity = (0, react_native_reanimated_1.useSharedValue)(0);
    const sheetOpacity = (0, react_native_reanimated_1.useSharedValue)(0);
    const translateY = (0, react_native_reanimated_1.useSharedValue)(windowHeight);
    (0, react_1.useEffect)(() => {
        if (visible) {
            setMounted(true);
        }
    }, [visible]);
    (0, react_1.useEffect)(() => {
        if (!mounted)
            return;
        if (visible) {
            if (reducedMotion) {
                // Reduced motion: cross-fade only, no translation.
                translateY.value = 0;
                backdropOpacity.value = (0, react_native_reanimated_1.withTiming)(backdropTarget, (0, motion_1.timing)("fast"));
                sheetOpacity.value = (0, react_native_reanimated_1.withTiming)(1, (0, motion_1.timing)("fast"));
            }
            else {
                backdropOpacity.value = (0, react_native_reanimated_1.withTiming)(backdropTarget, (0, motion_1.timing)("nav"));
                sheetOpacity.value = 1;
                translateY.value = (0, react_native_reanimated_1.withSpring)(0, motion_1.SPRING.soft);
            }
            return;
        }
        const unmount = (finished) => {
            "worklet";
            if (finished) {
                (0, react_native_reanimated_1.runOnJS)(setMounted)(false);
            }
        };
        if (reducedMotion) {
            translateY.value = 0;
            backdropOpacity.value = (0, react_native_reanimated_1.withTiming)(0, (0, motion_1.timing)("fast"));
            sheetOpacity.value = (0, react_native_reanimated_1.withTiming)(0, (0, motion_1.timing)("fast"), unmount);
        }
        else {
            backdropOpacity.value = (0, react_native_reanimated_1.withTiming)(0, (0, motion_1.exitTiming)("nav"));
            sheetOpacity.value = 1;
            translateY.value = (0, react_native_reanimated_1.withTiming)(windowHeight, (0, motion_1.exitTiming)("nav"), unmount);
        }
    }, [visible, mounted, reducedMotion, backdropTarget, windowHeight, backdropOpacity, sheetOpacity, translateY]);
    const backdropStyle = (0, react_native_reanimated_1.useAnimatedStyle)(() => ({ opacity: backdropOpacity.value }));
    const sheetAnimatedStyle = (0, react_native_reanimated_1.useAnimatedStyle)(() => ({
        opacity: sheetOpacity.value,
        transform: [{ translateY: translateY.value }],
    }));
    const handleRequestClose = (0, react_1.useCallback)(() => {
        onRequestClose();
    }, [onRequestClose]);
    if (!mounted) {
        return null;
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Modal, { transparent: true, animationType: "none", statusBarTranslucent: true, visible: mounted, onRequestClose: handleRequestClose, testID: testID, children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: react_native_1.StyleSheet.absoluteFillObject, children: [(0, jsx_runtime_1.jsx)(react_native_reanimated_1.default.View, { style: [react_native_1.StyleSheet.absoluteFillObject, styles.backdrop, backdropStyle], children: (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: backdropAccessibilityLabel, accessibilityState: { disabled: backdropDisabled }, disabled: backdropDisabled, style: react_native_1.StyleSheet.absoluteFillObject, onPress: handleRequestClose }) }), (0, jsx_runtime_1.jsx)(react_native_reanimated_1.default.View, { style: [styles.sheetContainer, sheetStyle, sheetAnimatedStyle], children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: contentContainerStyle, children: children }) })] }) }));
}
const styles = react_native_1.StyleSheet.create({
    backdrop: {
        backgroundColor: SCRIM_COLOR,
    },
    sheetContainer: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
    },
});
