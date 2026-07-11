"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnimatedNumber = AnimatedNumber;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_native_1 = require("react-native");
const ui_tokens_1 = require("@onecount/ui-tokens");
const useReducedMotion_1 = require("./useReducedMotion");
function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
}
function AnimatedNumber({ value, prefix = "", suffix = "", durationMs = ui_tokens_1.MOTION.duration.data, style, mono = true, formatValue, ...rest }) {
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
    return ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { ...rest, style: [
            mono
                ? {
                    fontFamily: ui_tokens_1.CORE.fonts.monoBold,
                    fontVariant: ["tabular-nums"],
                }
                : null,
            style,
        ], children: [prefix, formatValue ? formatValue(shown) : shown, suffix] }));
}
