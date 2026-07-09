import React from "react";
import { Platform, StyleSheet, View, type StyleProp, type ViewStyle } from "react-native";
import { CORE } from "@onecount/ui-tokens";

import { appTheme, withAlpha, type OneCountApp } from "./internal";

export interface AiCardProps {
  children?: React.ReactNode;
  app?: OneCountApp;
  scheme?: "dark" | "light";
  halo?: boolean;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
}

export function AiCard({
  children,
  app = "onecount",
  scheme = "dark",
  halo = false,
  style,
  contentStyle,
}: AiCardProps) {
  const theme = appTheme(app, scheme);
  const heroAccent = CORE.elevation.heroAccent;
  const haloStyle = halo
    ? Platform.select<ViewStyle>({
        ios: {
          shadowColor: heroAccent.color ?? CORE.brand.ai,
          shadowOffset: { width: 0, height: heroAccent.y ?? 0 },
          shadowOpacity: heroAccent.opacity ?? 0,
          shadowRadius: heroAccent.radius ?? 0,
        },
        android: {
          elevation: heroAccent.elevation,
        },
        default: {},
      })
    : null;

  return (
    <View
      style={[
        styles.root,
        {
          backgroundColor: theme.surface,
          borderColor: withAlpha(CORE.brand.ai, CORE.keyline.alpha),
        },
        haloStyle,
        style,
      ]}
    >
      <View style={contentStyle}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    borderRadius: CORE.radius.lg,
    borderWidth: StyleSheet.hairlineWidth,
    padding: CORE.spacingRules.cardPadding,
  },
});

