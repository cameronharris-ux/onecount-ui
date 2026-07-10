"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HAPTIC_MOMENTS = void 0;
exports.hapticMoment = hapticMoment;
const ui_tokens_1 = require("@onecount/ui-tokens");
exports.HAPTIC_MOMENTS = ui_tokens_1.CORE.haptics;
let cachedHaptics;
function loadHaptics() {
    if (cachedHaptics !== undefined) {
        return cachedHaptics;
    }
    try {
        // Static require, guarded: Metro resolves it at bundle time (expo-haptics
        // is a peer in every consumer) and jest can mock it. An eval'd require
        // escapes BOTH module systems — under Hermes there is no runtime
        // `require`, so the old (0, eval)("require") pattern silently no-opped
        // every haptic in production. Keep the catch for non-RN environments.
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        cachedHaptics = require("expo-haptics");
    }
    catch {
        cachedHaptics = null;
    }
    return cachedHaptics;
}
async function hapticMoment(moment) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
    const strength = exports.HAPTIC_MOMENTS[moment];
    if (!strength) {
        return;
    }
    const haptics = loadHaptics();
    if (!haptics) {
        return;
    }
    try {
        if (strength === "success") {
            await ((_a = haptics.notificationAsync) === null || _a === void 0 ? void 0 : _a.call(haptics, (_c = (_b = haptics.NotificationFeedbackType) === null || _b === void 0 ? void 0 : _b.Success) !== null && _c !== void 0 ? _c : "success"));
            return;
        }
        if (strength === "warning") {
            await ((_d = haptics.notificationAsync) === null || _d === void 0 ? void 0 : _d.call(haptics, (_f = (_e = haptics.NotificationFeedbackType) === null || _e === void 0 ? void 0 : _e.Warning) !== null && _f !== void 0 ? _f : "warning"));
            return;
        }
        if (strength === "error") {
            await ((_g = haptics.notificationAsync) === null || _g === void 0 ? void 0 : _g.call(haptics, (_j = (_h = haptics.NotificationFeedbackType) === null || _h === void 0 ? void 0 : _h.Error) !== null && _j !== void 0 ? _j : "error"));
            return;
        }
        if (strength === "medium") {
            await ((_k = haptics.impactAsync) === null || _k === void 0 ? void 0 : _k.call(haptics, (_m = (_l = haptics.ImpactFeedbackStyle) === null || _l === void 0 ? void 0 : _l.Medium) !== null && _m !== void 0 ? _m : "medium"));
            return;
        }
        if (strength === "strong") {
            await ((_o = haptics.impactAsync) === null || _o === void 0 ? void 0 : _o.call(haptics, (_q = (_p = haptics.ImpactFeedbackStyle) === null || _p === void 0 ? void 0 : _p.Heavy) !== null && _q !== void 0 ? _q : "heavy"));
            return;
        }
        await ((_r = haptics.impactAsync) === null || _r === void 0 ? void 0 : _r.call(haptics, (_t = (_s = haptics.ImpactFeedbackStyle) === null || _s === void 0 ? void 0 : _s.Light) !== null && _t !== void 0 ? _t : "light"));
    }
    catch {
        // Haptics should never break a UI action.
    }
}
