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
exports.PressableScale = PressableScale;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_native_1 = require("react-native");
const react_native_reanimated_1 = __importStar(require("react-native-reanimated"));
const ui_tokens_1 = require("@onecount/ui-tokens");
const AnimatedPressable = react_native_reanimated_1.default.createAnimatedComponent(react_native_1.Pressable);
const PRESS_SPRING = { damping: 18, stiffness: 320, mass: 0.6 };
const RELEASE_SPRING = { damping: 14, stiffness: 220, mass: 0.7 };
function PressableScale({ pressedScale = ui_tokens_1.CORE.componentState.pressScale, pressedOpacity = ui_tokens_1.CORE.componentState.pressOpacity, disabled, onPressIn, onPressOut, style, children, ...rest }) {
    const pressed = (0, react_native_reanimated_1.useSharedValue)(0);
    const disabledOpacity = ui_tokens_1.CORE.componentState.disabledOpacity;
    const animatedStyle = (0, react_native_reanimated_1.useAnimatedStyle)(() => ({
        transform: [{ scale: 1 + pressed.value * (pressedScale - 1) }],
        opacity: disabled ? disabledOpacity : 1 + pressed.value * (pressedOpacity - 1),
    }));
    const handlePressIn = (0, react_1.useCallback)((event) => {
        if (!disabled) {
            pressed.value = (0, react_native_reanimated_1.withSpring)(1, PRESS_SPRING);
        }
        onPressIn === null || onPressIn === void 0 ? void 0 : onPressIn(event);
    }, [disabled, onPressIn, pressed]);
    const handlePressOut = (0, react_1.useCallback)((event) => {
        if (!disabled) {
            pressed.value = (0, react_native_reanimated_1.withSpring)(0, RELEASE_SPRING);
        }
        onPressOut === null || onPressOut === void 0 ? void 0 : onPressOut(event);
    }, [disabled, onPressOut, pressed]);
    return ((0, jsx_runtime_1.jsx)(AnimatedPressable, { ...rest, disabled: disabled, onPressIn: handlePressIn, onPressOut: handlePressOut, style: [animatedStyle, style], children: children }));
}
