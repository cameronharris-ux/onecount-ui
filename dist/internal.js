"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.APP_LABELS = void 0;
exports.appHue = appHue;
exports.appTheme = appTheme;
exports.withAlpha = withAlpha;
const ui_tokens_1 = require("@onecount/ui-tokens");
exports.APP_LABELS = {
    onecount: "OneCount",
    ops: "Ops",
    shield: "Shield",
    trace: "Trace",
};
function appHue(app) {
    return ui_tokens_1.CORE.identityHues[app];
}
function appTheme(app, scheme = "dark") {
    return (0, ui_tokens_1.themeForApp)(app).theme.colors[scheme];
}
function withAlpha(color, alpha) {
    const value = color.trim();
    const hex = value.startsWith("#") ? value.slice(1) : value;
    if (!/^[\da-f]{6}$/i.test(hex)) {
        return value;
    }
    const r = Number.parseInt(hex.slice(0, 2), 16);
    const g = Number.parseInt(hex.slice(2, 4), 16);
    const b = Number.parseInt(hex.slice(4, 6), 16);
    const safeAlpha = Math.max(0, Math.min(1, alpha));
    return `rgba(${r}, ${g}, ${b}, ${safeAlpha})`;
}
