"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiCard = AiCard;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const ui_tokens_1 = require("@onecount/ui-tokens");
const internal_1 = require("./internal");
function AiCard({ children, app = "onecount", scheme = "dark", halo = false, style, contentStyle, }) {
    var _a, _b, _c, _d;
    const theme = (0, internal_1.appTheme)(app, scheme);
    const heroAccent = ui_tokens_1.CORE.elevation.heroAccent;
    const haloStyle = halo
        ? react_native_1.Platform.select({
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
        })
        : null;
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [
            styles.root,
            {
                backgroundColor: theme.surface,
                borderColor: (0, internal_1.withAlpha)(ui_tokens_1.CORE.brand.ai, ui_tokens_1.CORE.keyline.alpha),
            },
            haloStyle,
            style,
        ], children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: contentStyle, children: children }) }));
}
const styles = react_native_1.StyleSheet.create({
    root: {
        borderRadius: ui_tokens_1.CORE.radius.lg,
        borderWidth: react_native_1.StyleSheet.hairlineWidth,
        padding: ui_tokens_1.CORE.spacingRules.cardPadding,
    },
});
