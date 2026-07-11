"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BRAND_MARK_SEGMENTS = exports.BRAND_MARK_UNITS = void 0;
exports.segmentStyle = segmentStyle;
exports.BrandMark = BrandMark;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
/** Local mark geometry (viewBox translated to origin; 384 × 524 units). */
exports.BRAND_MARK_UNITS = { width: 384, height: 524 };
// Diagonal flag: stroke (56,146)→(162,50), width 76, round caps → a rotated
// rounded bar: length √(106²+96²)+76 caps ≈ 219, centred at (109,98), −42.15°.
const DIAG_LEN = Math.sqrt(106 * 106 + 96 * 96) + 76;
const DIAG_ANGLE = (Math.atan2(-96, 106) * 180) / Math.PI;
exports.BRAND_MARK_SEGMENTS = [
    { key: "block-1", x: 138, y: 34, width: 118, height: 86, radius: 24 },
    { key: "block-2", x: 138, y: 134, width: 118, height: 86, radius: 24 },
    { key: "block-3", x: 138, y: 234, width: 118, height: 86, radius: 24 },
    { key: "block-4", x: 138, y: 334, width: 118, height: 120, radius: 24 },
    { key: "flag", x: 109 - DIAG_LEN / 2, y: 98 - 38, width: DIAG_LEN, height: 76, radius: 38, rotate: DIAG_ANGLE },
    { key: "base", x: 56, y: 450, width: 304, height: 58, radius: 22 },
    { key: "dot", x: 314 - 22, y: 56 - 22, width: 44, height: 44, radius: 22, dot: true },
];
function segmentStyle(segment, unit) {
    return {
        position: "absolute",
        left: segment.x * unit,
        top: segment.y * unit,
        width: segment.width * unit,
        height: segment.height * unit,
        borderRadius: segment.radius * unit,
        transform: segment.rotate ? [{ rotate: `${segment.rotate}deg` }] : undefined,
    };
}
function BrandMark({ height = 120, color = "#F3F6FC", dotColor = "#00E39A", style }) {
    const unit = height / exports.BRAND_MARK_UNITS.height;
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: false, importantForAccessibility: "no-hide-descendants", style: [{ width: exports.BRAND_MARK_UNITS.width * unit, height }, style], children: exports.BRAND_MARK_SEGMENTS.map((segment) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [segmentStyle(segment, unit), { backgroundColor: segment.dot ? dotColor : color }] }, segment.key))) }));
}
