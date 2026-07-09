import React, { useEffect } from "react";
import {
  Image,
  StyleSheet,
  Text,
  type ImageSourcePropType,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import Animated, {
  Easing,
  cancelAnimation,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import { CORE, themeForApp } from "@onecount/ui-tokens";

import { useReducedMotion } from "./useReducedMotion";

const OUT = Easing.out(Easing.cubic);

export interface AnimatedSplashProps {
  markSource: ImageSourcePropType;
  wordmarkSource?: ImageSourcePropType;
  backgroundColor?: string;
  accent?: string;
  onDone?: () => void;
  style?: StyleProp<ViewStyle>;
}

export function AnimatedSplash({
  markSource,
  wordmarkSource,
  backgroundColor = themeForApp("onecount").theme.colors.dark.background,
  accent = CORE.brand.accent,
  onDone,
  style,
}: AnimatedSplashProps) {
  const reducedMotion = useReducedMotion();
  const root = useSharedValue(1);
  const markOpacity = useSharedValue(0);
  const markScale = useSharedValue(0.92);
  const wordOpacity = useSharedValue(0);
  const wordY = useSharedValue(12);

  useEffect(() => {
    let cancelled = false;
    const finish = () => {
      if (!cancelled) {
        onDone?.();
      }
    };

    cancelAnimation(root);
    cancelAnimation(markOpacity);
    cancelAnimation(markScale);
    cancelAnimation(wordOpacity);
    cancelAnimation(wordY);

    if (reducedMotion) {
      markOpacity.value = 1;
      markScale.value = 1;
      wordOpacity.value = 1;
      wordY.value = 0;
      root.value = withDelay(
        220,
        withTiming(0, { duration: 220, easing: OUT }, (done) => {
          if (done) runOnJS(finish)();
        }),
      );
    } else {
      markOpacity.value = withTiming(1, { duration: 420, easing: OUT });
      markScale.value = withTiming(1, { duration: 420, easing: OUT });
      wordOpacity.value = withDelay(180, withTiming(1, { duration: 360, easing: OUT }));
      wordY.value = withDelay(180, withTiming(0, { duration: 360, easing: OUT }));
      root.value = withDelay(
        1150,
        withTiming(0, { duration: 300, easing: OUT }, (done) => {
          if (done) runOnJS(finish)();
        }),
      );
    }

    return () => {
      cancelled = true;
      cancelAnimation(root);
      cancelAnimation(markOpacity);
      cancelAnimation(markScale);
      cancelAnimation(wordOpacity);
      cancelAnimation(wordY);
    };
  }, [markOpacity, markScale, onDone, reducedMotion, root, wordOpacity, wordY]);

  const rootStyle = useAnimatedStyle(() => ({ opacity: root.value }));
  const markStyle = useAnimatedStyle(() => ({
    opacity: markOpacity.value,
    transform: [{ scale: markScale.value }],
  }));
  const wordStyle = useAnimatedStyle(() => ({
    opacity: wordOpacity.value,
    transform: [{ translateY: wordY.value }],
  }));

  return (
    <Animated.View
      pointerEvents="none"
      style={[StyleSheet.absoluteFill, styles.root, { backgroundColor }, rootStyle, style]}
    >
      <Animated.View style={markStyle}>
        <Image source={markSource} style={styles.mark} accessibilityIgnoresInvertColors />
      </Animated.View>
      <Animated.View style={[styles.wordRow, wordStyle]}>
        {wordmarkSource ? (
          <Image source={wordmarkSource} style={styles.wordmark} resizeMode="contain" accessibilityIgnoresInvertColors />
        ) : (
          <Text style={styles.word}>
            One<Text style={[styles.wordAccent, { color: accent }]}>Count</Text>
          </Text>
        )}
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    justifyContent: "center",
    gap: 22,
  },
  mark: {
    width: 104,
    height: 104,
    borderRadius: CORE.radius.xl,
  },
  wordRow: {
    alignItems: "center",
    gap: 4,
  },
  word: {
    fontFamily: CORE.fonts.displayBold,
    fontSize: 30,
    letterSpacing: 0,
    color: themeForApp("onecount").theme.colors.dark.text,
  },
  wordAccent: {
    color: CORE.brand.accent,
  },
  wordmark: {
    width: 180,
    height: 38,
  },
});

