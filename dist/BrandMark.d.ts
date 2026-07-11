/**
 * The OneCount "1" mark rendered from its real vector geometry
 * (OneCount-Brand-Pack/Logo/svg/1-mark-*.svg, viewBox 316 262 384 524) as
 * plain Views — no SVG dependency, and each segment can be animated
 * independently, which is what BrandSplash's construction stage does.
 *
 * Family rule: the mark body renders in the theme text colour; the dot is the
 * one place the per-product identity hue may appear at full strength.
 */
import React from "react";
import { type StyleProp, type ViewStyle } from "react-native";
/** Local mark geometry (viewBox translated to origin; 384 × 524 units). */
export declare const BRAND_MARK_UNITS: {
    readonly width: 384;
    readonly height: 524;
};
export interface MarkSegment {
    key: string;
    x: number;
    y: number;
    width: number;
    height: number;
    radius: number;
    /** Degrees; only the diagonal flag rotates. */
    rotate?: number;
    /** True for the identity-hue dot. */
    dot?: boolean;
}
export declare const BRAND_MARK_SEGMENTS: MarkSegment[];
export interface BrandMarkProps {
    /** Rendered mark height in dp; width scales proportionally. */
    height?: number;
    /** Mark body colour (theme text on dark surfaces). */
    color?: string;
    /** Dot colour — the per-product identity hue. */
    dotColor?: string;
    style?: StyleProp<ViewStyle>;
}
export declare function segmentStyle(segment: MarkSegment, unit: number): ViewStyle;
export declare function BrandMark({ height, color, dotColor, style }: BrandMarkProps): React.JSX.Element;
