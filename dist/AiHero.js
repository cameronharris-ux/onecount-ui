"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiHero = AiHero;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const ui_tokens_1 = require("@onecount/ui-tokens");
const Aurora_1 = require("./Aurora");
const AiBadge_1 = require("./AiBadge");
const internal_1 = require("./internal");
function AiHero({ title, subtitle, badge, children, app = "onecount", scheme = "dark", aurora, style, contentStyle, titleStyle, subtitleStyle, }) {
    var _a, _b, _c, _d, _e;
    const theme = (0, internal_1.appTheme)(app, scheme);
    const heroAccent = ui_tokens_1.CORE.elevation.heroAccent;
    const haloStyle = react_native_1.Platform.select({
        ios: {
            shadowColor: (_a = heroAccent.color) !== null && _a !== void 0 ? _a : ui_tokens_1.CORE.brand.ai,
            shadowOffset: { width: 0, height: (_b = heroAccent.y) !== null && _b !== void 0 ? _b : 0 },
            shadowOpacity: (_c = heroAccent.opacity) !== null && _c !== void 0 ? _c : 0,
            shadowRadius: (_d = heroAccent.radius) !== null && _d !== void 0 ? _d : 0,
        },
        android: {
            elevation: heroAccent.elevation,
        },
        default: {},
    });
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            styles.root,
            {
                backgroundColor: theme.surface,
                borderColor: (0, internal_1.withAlpha)(ui_tokens_1.CORE.brand.ai, ui_tokens_1.CORE.keyline.alpha),
            },
            haloStyle,
            style,
        ], children: [aurora === undefined ? (0, jsx_runtime_1.jsx)(Aurora_1.Aurora, { app: app, hue: ui_tokens_1.CORE.brand.ai, variant: "static", full: true, intensity: 0.5 }) : aurora, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [styles.content, contentStyle], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: styles.badgeRow, children: badge !== null && badge !== void 0 ? badge : (0, jsx_runtime_1.jsx)(AiBadge_1.AiBadge, {}) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: styles.copy, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: [styles.title, { color: theme.text }, titleStyle], children: title }), subtitle ? (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: [styles.subtitle, { color: (_e = theme.text2) !== null && _e !== void 0 ? _e : theme.textMuted }, subtitleStyle], children: subtitle }) : null] }), children] })] }));
}
const styles = react_native_1.StyleSheet.create({
    root: {
        borderRadius: ui_tokens_1.CORE.radius.xl,
        borderWidth: react_native_1.StyleSheet.hairlineWidth,
        overflow: "hidden",
    },
    content: {
        padding: ui_tokens_1.CORE.spacingRules.cardPadding,
        gap: ui_tokens_1.CORE.spacingScales.onecountCanonical.sm,
    },
    badgeRow: {
        flexDirection: "row",
        alignItems: "center",
    },
    copy: {
        gap: 5,
    },
    title: {
        fontFamily: ui_tokens_1.CORE.fonts.displayBold,
        fontSize: ui_tokens_1.CORE.typography.h2.fontSize,
        fontWeight: "700",
        lineHeight: ui_tokens_1.CORE.typography.h2.lineHeight,
        letterSpacing: 0,
    },
    subtitle: {
        fontFamily: ui_tokens_1.CORE.fonts.body,
        fontSize: ui_tokens_1.CORE.typography.bodySmall.fontSize,
        lineHeight: ui_tokens_1.CORE.typography.bodySmall.lineHeight,
    },
});
