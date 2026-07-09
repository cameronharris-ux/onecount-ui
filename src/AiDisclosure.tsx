import React from "react";
import { StyleSheet, Text, View, type StyleProp, type TextStyle, type ViewStyle } from "react-native";
import { CORE } from "@onecount/ui-tokens";

import { AiBadge } from "./AiBadge";
import { appTheme, type OneCountApp } from "./internal";

export interface AiDisclosureProps {
  children?: string;
  app?: OneCountApp;
  scheme?: "dark" | "light";
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export function AiDisclosure({
  children = "AI-assisted — check it before you rely on it.",
  app = "onecount",
  scheme = "dark",
  style,
  textStyle,
}: AiDisclosureProps) {
  const theme = appTheme(app, scheme);
  return (
    <View style={[styles.root, style]}>
      <AiBadge label="AI" showIcon={false} />
      <Text style={[styles.text, { color: theme.text2 ?? theme.textMuted }, textStyle]}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    alignItems: "center",
    gap: CORE.spacingScales.siblings.sm,
  },
  text: {
    flex: 1,
    fontFamily: CORE.fonts.medium,
    fontSize: CORE.typography.caption.fontSize,
    lineHeight: CORE.typography.caption.lineHeight,
  },
});

