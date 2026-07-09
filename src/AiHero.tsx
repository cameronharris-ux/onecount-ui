import React from "react";
import { Platform, StyleSheet, Text, View, type StyleProp, type TextStyle, type ViewStyle } from "react-native";
import { CORE } from "@onecount/ui-tokens";

import { Aurora } from "./Aurora";
import { AiBadge } from "./AiBadge";
import { appTheme, withAlpha, type OneCountApp } from "./internal";

export interface AiHeroProps {
  title: string;
  subtitle?: string;
  badge?: React.ReactNode;
  children?: React.ReactNode;
  app?: OneCountApp;
  scheme?: "dark" | "light";
  aurora?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  subtitleStyle?: StyleProp<TextStyle>;
}

export function AiHero({
  title,
  subtitle,
  badge,
  children,
  app = "onecount",
  scheme = "dark",
  aurora,
  style,
  contentStyle,
  titleStyle,
  subtitleStyle,
}: AiHeroProps) {
  const theme = appTheme(app, scheme);
  const heroAccent = CORE.elevation.heroAccent;
  const haloStyle = Platform.select<ViewStyle>({
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
  });

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
      {aurora === undefined ? <Aurora app={app} hue={CORE.brand.ai} variant="static" full intensity={0.5} /> : aurora}
      <View style={[styles.content, contentStyle]}>
        <View style={styles.badgeRow}>{badge ?? <AiBadge />}</View>
        <View style={styles.copy}>
          <Text style={[styles.title, { color: theme.text }, titleStyle]}>{title}</Text>
          {subtitle ? <Text style={[styles.subtitle, { color: theme.text2 ?? theme.textMuted }, subtitleStyle]}>{subtitle}</Text> : null}
        </View>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    borderRadius: CORE.radius.xl,
    borderWidth: StyleSheet.hairlineWidth,
    overflow: "hidden",
  },
  content: {
    padding: CORE.spacingRules.cardPadding,
    gap: CORE.spacingScales.onecountCanonical.sm,
  },
  badgeRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  copy: {
    gap: 5,
  },
  title: {
    fontFamily: CORE.fonts.displayBold,
    fontSize: CORE.typography.h2.fontSize,
    fontWeight: "700",
    lineHeight: CORE.typography.h2.lineHeight,
    letterSpacing: 0,
  },
  subtitle: {
    fontFamily: CORE.fonts.body,
    fontSize: CORE.typography.bodySmall.fontSize,
    lineHeight: CORE.typography.bodySmall.lineHeight,
  },
});

