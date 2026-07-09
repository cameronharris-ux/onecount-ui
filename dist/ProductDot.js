"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductDot = ProductDot;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const internal_1 = require("./internal");
function ProductDot({ app, size = 8, style }) {
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: `from ${internal_1.APP_LABELS[app]}`, style: [
            {
                width: size,
                height: size,
                borderRadius: size / 2,
                backgroundColor: (0, internal_1.appHue)(app),
            },
            style,
        ] }));
}
