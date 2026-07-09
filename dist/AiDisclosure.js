"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiDisclosure = AiDisclosure;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const ui_tokens_1 = require("@onecount/ui-tokens");
const AiBadge_1 = require("./AiBadge");
const internal_1 = require("./internal");
function AiDisclosure({ children = "AI-assisted — check it before you rely on it.", app = "onecount", scheme = "dark", style, textStyle, }) {
    var _a;
    const theme = (0, internal_1.appTheme)(app, scheme);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [styles.root, style], children: [(0, jsx_runtime_1.jsx)(AiBadge_1.AiBadge, { label: "AI", showIcon: false }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: [styles.text, { color: (_a = theme.text2) !== null && _a !== void 0 ? _a : theme.textMuted }, textStyle], children: children })] }));
}
const styles = react_native_1.StyleSheet.create({
    root: {
        flexDirection: "row",
        alignItems: "center",
        gap: ui_tokens_1.CORE.spacingScales.siblings.sm,
    },
    text: {
        flex: 1,
        fontFamily: ui_tokens_1.CORE.fonts.medium,
        fontSize: ui_tokens_1.CORE.typography.caption.fontSize,
        lineHeight: ui_tokens_1.CORE.typography.caption.lineHeight,
    },
});
