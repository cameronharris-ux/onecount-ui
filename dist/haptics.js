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
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u;
    const strength = exports.HAPTIC_MOMENTS[moment];
    if (!strength) {
        return;
    }
    const haptics = loadHaptics();
    if (!haptics) {
        return;
    }
    try {
        if (strength === "selection") {
            await ((_a = haptics.selectionAsync) === null || _a === void 0 ? void 0 : _a.call(haptics));
            return;
        }
        if (strength === "success") {
            await ((_b = haptics.notificationAsync) === null || _b === void 0 ? void 0 : _b.call(haptics, (_d = (_c = haptics.NotificationFeedbackType) === null || _c === void 0 ? void 0 : _c.Success) !== null && _d !== void 0 ? _d : "success"));
            return;
        }
        if (strength === "warning") {
            await ((_e = haptics.notificationAsync) === null || _e === void 0 ? void 0 : _e.call(haptics, (_g = (_f = haptics.NotificationFeedbackType) === null || _f === void 0 ? void 0 : _f.Warning) !== null && _g !== void 0 ? _g : "warning"));
            return;
        }
        if (strength === "error") {
            await ((_h = haptics.notificationAsync) === null || _h === void 0 ? void 0 : _h.call(haptics, (_k = (_j = haptics.NotificationFeedbackType) === null || _j === void 0 ? void 0 : _j.Error) !== null && _k !== void 0 ? _k : "error"));
            return;
        }
        if (strength === "medium") {
            await ((_l = haptics.impactAsync) === null || _l === void 0 ? void 0 : _l.call(haptics, (_o = (_m = haptics.ImpactFeedbackStyle) === null || _m === void 0 ? void 0 : _m.Medium) !== null && _o !== void 0 ? _o : "medium"));
            return;
        }
        if (strength === "strong") {
            await ((_p = haptics.impactAsync) === null || _p === void 0 ? void 0 : _p.call(haptics, (_r = (_q = haptics.ImpactFeedbackStyle) === null || _q === void 0 ? void 0 : _q.Heavy) !== null && _r !== void 0 ? _r : "heavy"));
            return;
        }
        await ((_s = haptics.impactAsync) === null || _s === void 0 ? void 0 : _s.call(haptics, (_u = (_t = haptics.ImpactFeedbackStyle) === null || _t === void 0 ? void 0 : _t.Light) !== null && _u !== void 0 ? _u : "light"));
    }
    catch {
        // Haptics should never break a UI action.
    }
}
