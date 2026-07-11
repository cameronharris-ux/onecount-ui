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
import { View, type StyleProp, type ViewStyle } from "react-native";

/** Local mark geometry (viewBox translated to origin; 384 × 524 units). */
export const BRAND_MARK_UNITS = { width: 384, height: 524 } as const;

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

// Diagonal flag: stroke (56,146)→(162,50), width 76, round caps → a rotated
// rounded bar: length √(106²+96²)+76 caps ≈ 219, centred at (109,98), −42.15°.
const DIAG_LEN = Math.sqrt(106 * 106 + 96 * 96) + 76;
const DIAG_ANGLE = (Math.atan2(-96, 106) * 180) / Math.PI;

export const BRAND_MARK_SEGMENTS: MarkSegment[] = [
  { key: "block-1", x: 138, y: 34, width: 118, height: 86, radius: 24 },
  { key: "block-2", x: 138, y: 134, width: 118, height: 86, radius: 24 },
  { key: "block-3", x: 138, y: 234, width: 118, height: 86, radius: 24 },
  { key: "block-4", x: 138, y: 334, width: 118, height: 120, radius: 24 },
  { key: "flag", x: 109 - DIAG_LEN / 2, y: 98 - 38, width: DIAG_LEN, height: 76, radius: 38, rotate: DIAG_ANGLE },
  { key: "base", x: 56, y: 450, width: 304, height: 58, radius: 22 },
  { key: "dot", x: 314 - 22, y: 56 - 22, width: 44, height: 44, radius: 22, dot: true },
];

export interface BrandMarkProps {
  /** Rendered mark height in dp; width scales proportionally. */
  height?: number;
  /** Mark body colour (theme text on dark surfaces). */
  color?: string;
  /** Dot colour — the per-product identity hue. */
  dotColor?: string;
  style?: StyleProp<ViewStyle>;
}

export function segmentStyle(segment: MarkSegment, unit: number): ViewStyle {
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

export function BrandMark({ height = 120, color = "#F3F6FC", dotColor = "#00E39A", style }: BrandMarkProps) {
  const unit = height / BRAND_MARK_UNITS.height;
  return (
    <View
      accessible={false}
      importantForAccessibility="no-hide-descendants"
      style={[{ width: BRAND_MARK_UNITS.width * unit, height }, style]}
    >
      {BRAND_MARK_SEGMENTS.map((segment) => (
        <View
          key={segment.key}
          style={[segmentStyle(segment, unit), { backgroundColor: segment.dot ? dotColor : color }]}
        />
      ))}
    </View>
  );
}
