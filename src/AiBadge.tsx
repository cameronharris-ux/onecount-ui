import React from "react";
import { StyleSheet, Text, View, type StyleProp, type TextStyle, type ViewStyle } from "react-native";
import Svg, { Path } from "react-native-svg";
import { CORE } from "@onecount/ui-tokens";

import { withAlpha } from "./internal";

export interface AiBadgeProps {
  label?: string;
  showIcon?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  accessibilityLabel?: string;
}

export function AiBadge({
  label = "AI",
  showIcon = true,
  style,
  textStyle,
  accessibilityLabel,
}: AiBadgeProps) {
  const ai = CORE.brand.ai;
  return (
    <View
      accessible
      accessibilityLabel={accessibilityLabel ?? label}
      style={[
        styles.root,
        {
          backgroundColor: withAlpha(ai, CORE.keyline.alpha),
          borderColor: withAlpha(ai, CORE.keyline.alpha * 2),
        },
        style,
      ]}
    >
      {showIcon ? (
        <Svg width={CORE.icons.sizes.inline} height={CORE.icons.sizes.inline} viewBox="0 0 16 16">
          <Path
            d="M8 1.5 9.4 5.9 14 7.3 9.4 8.7 8 13.5 6.6 8.7 2 7.3 6.6 5.9 8 1.5Z"
            fill="none"
            stroke={ai}
            strokeWidth={CORE.icons.strokeWidth}
            strokeLinejoin="round"
          />
        </Svg>
      ) : null}
      <Text style={[styles.label, { color: ai }, textStyle]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: CORE.radius.pill,
    paddingHorizontal: 9,
    paddingVertical: 4,
  },
  label: {
    fontFamily: CORE.fonts.bold,
    fontSize: CORE.typography.label.fontSize,
    fontWeight: "700",
    letterSpacing: 0,
  },
});

