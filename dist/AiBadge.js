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
exports.AiBadge = AiBadge;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const react_native_svg_1 = __importStar(require("react-native-svg"));
const ui_tokens_1 = require("@onecount/ui-tokens");
const internal_1 = require("./internal");
function AiBadge({ label = "AI", showIcon = true, style, textStyle, accessibilityLabel, }) {
    const ai = ui_tokens_1.CORE.brand.ai;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityLabel: accessibilityLabel !== null && accessibilityLabel !== void 0 ? accessibilityLabel : label, style: [
            styles.root,
            {
                backgroundColor: (0, internal_1.withAlpha)(ai, ui_tokens_1.CORE.keyline.alpha),
                borderColor: (0, internal_1.withAlpha)(ai, ui_tokens_1.CORE.keyline.alpha * 2),
            },
            style,
        ], children: [showIcon ? ((0, jsx_runtime_1.jsx)(react_native_svg_1.default, { width: ui_tokens_1.CORE.icons.sizes.inline, height: ui_tokens_1.CORE.icons.sizes.inline, viewBox: "0 0 16 16", children: (0, jsx_runtime_1.jsx)(react_native_svg_1.Path, { d: "M8 1.5 9.4 5.9 14 7.3 9.4 8.7 8 13.5 6.6 8.7 2 7.3 6.6 5.9 8 1.5Z", fill: "none", stroke: ai, strokeWidth: ui_tokens_1.CORE.icons.strokeWidth, strokeLinejoin: "round" }) })) : null, (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: [styles.label, { color: ai }, textStyle], children: label })] }));
}
const styles = react_native_1.StyleSheet.create({
    root: {
        alignSelf: "flex-start",
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
        borderWidth: react_native_1.StyleSheet.hairlineWidth,
        borderRadius: ui_tokens_1.CORE.radius.pill,
        paddingHorizontal: 9,
        paddingVertical: 4,
    },
    label: {
        fontFamily: ui_tokens_1.CORE.fonts.bold,
        fontSize: ui_tokens_1.CORE.typography.label.fontSize,
        fontWeight: "700",
        letterSpacing: 0,
    },
});
