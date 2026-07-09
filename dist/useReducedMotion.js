"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useReducedMotion = useReducedMotion;
const react_1 = require("react");
const react_native_1 = require("react-native");
function useReducedMotion() {
    const [reduceMotion, setReduceMotion] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        let cancelled = false;
        react_native_1.AccessibilityInfo.isReduceMotionEnabled()
            .then((reduced) => {
            if (!cancelled) {
                setReduceMotion(reduced);
            }
        })
            .catch(() => {
            if (!cancelled) {
                setReduceMotion(false);
            }
        });
        let subscription;
        try {
            subscription = react_native_1.AccessibilityInfo.addEventListener("reduceMotionChanged", setReduceMotion);
        }
        catch {
            subscription = undefined;
        }
        return () => {
            cancelled = true;
            subscription === null || subscription === void 0 ? void 0 : subscription.remove();
        };
    }, []);
    return reduceMotion;
}
