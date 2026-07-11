/**
 * AnimatedNumber — the family's KPI/data-reveal numeral. Two engines share
 * one public API:
 *
 * - Default (no `formatValue`): the ReText pattern — a disabled TextInput
 *   whose native `text` prop is driven by `useAnimatedProps`, so the sweep
 *   from the old value to the new one runs entirely on the UI thread. No JS
 *   thread, no React state, no re-render per frame.
 * - `formatValue` supplied: the original JS-thread rAF/setState engine.
 *   Arbitrary formatting (currency, grouping, units) can't run as a UI-thread
 *   worklet, so this path stays on `Text` + `requestAnimationFrame`. It is
 *   also the jest-safe path — kept verbatim because `formatValue` consumers
 *   are rare and its tests must keep passing without a native Reanimated
 *   runtime.
 *
 * Both engines snap straight to the final value under reduced motion.
 */
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, TextInput, type StyleProp, type TextInputProps, type TextProps, type TextStyle } from "react-native";
import Animated, { useAnimatedProps, useSharedValue, withTiming } from "react-native-reanimated";
import { CORE, MOTION } from "@onecount/ui-tokens";

import { EASE, timing } from "./motion";
import { useReducedMotion } from "./useReducedMotion";

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

export interface AnimatedNumberProps extends Omit<TextProps, "children"> {
  value: number;
  prefix?: string;
  suffix?: string;
  /** Defaults to the data-reveal motion token. */
  durationMs?: number;
  style?: StyleProp<TextStyle>;
  mono?: boolean;
  formatValue?: (value: number) => string;
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

function monoStyle(mono: boolean): TextStyle | null {
  return mono
    ? {
        fontFamily: CORE.fonts.monoBold,
        fontVariant: ["tabular-nums"],
      }
    : null;
}

/** JS-thread rAF/setState engine — see file header. */
function FormattedAnimatedNumber({
  value,
  prefix = "",
  suffix = "",
  durationMs = MOTION.duration.data,
  style,
  mono = true,
  formatValue,
  ...rest
}: AnimatedNumberProps & { formatValue: (value: number) => string }) {
  const reducedMotion = useReducedMotion();
  const [shown, setShown] = useState(value);
  const shownRef = useRef(value);
  shownRef.current = shown;

  useEffect(() => {
    const from = shownRef.current;
    if (from === value) return;

    if (reducedMotion) {
      setShown(value);
      return;
    }

    let frame = 0;
    const start = Date.now();
    const tick = () => {
      const t = Math.min(1, (Date.now() - start) / durationMs);
      const next = Math.round(from + (value - from) * easeOutCubic(t));
      setShown(next);
      if (t < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [durationMs, reducedMotion, value]);

  return (
    <Text {...rest} style={[monoStyle(mono), style]}>
      {prefix}
      {formatValue(shown)}
      {suffix}
    </Text>
  );
}

/** UI-thread ReText engine — see file header. Plain rounded numerals only. */
function NumericAnimatedNumber({
  value,
  prefix = "",
  suffix = "",
  durationMs,
  style,
  mono = true,
  accessibilityLabel,
  ...rest
}: Omit<AnimatedNumberProps, "formatValue">) {
  const reducedMotion = useReducedMotion();
  const progress = useSharedValue(value);

  useEffect(() => {
    if (reducedMotion) {
      progress.value = value;
      return;
    }
    // durationMs undefined => the token duration+easing pair; a caller
    // override keeps the standard easing curve, only the duration changes.
    progress.value = withTiming(
      value,
      durationMs === undefined ? timing("data") : { duration: durationMs, easing: EASE.standard },
    );
  }, [durationMs, progress, reducedMotion, value]);

  // `text` is a real native prop on TextInput's view manager (how ReText-style
  // components drive the displayed string on the UI thread) but it isn't in
  // RN's TextInputProps type, so the updater's return is cast through
  // `unknown` to match what `animatedProps` expects.
  const animatedProps = useAnimatedProps<TextInputProps>(
    () =>
      ({
        text: `${prefix}${Math.round(progress.value)}${suffix}`,
      }) as unknown as Partial<TextInputProps>,
  );

  // Screen readers get the real final value, never a mid-sweep number.
  const finalLabel = accessibilityLabel ?? `${prefix}${value}${suffix}`;

  return (
    <AnimatedTextInput
      // `rest` is typed as the Text-facing public prop set (see file header:
      // "...TextProps where sensible") but the underlying primitive is a
      // TextInput; only the intersection is meaningful, and any extra prop
      // still passes through untyped to the native view harmlessly.
      {...(rest as unknown as TextInputProps)}
      editable={false}
      underlineColorAndroid="transparent"
      pointerEvents="none"
      accessible
      accessibilityLabel={finalLabel}
      defaultValue={`${prefix}${value}${suffix}`}
      animatedProps={animatedProps}
      style={[monoStyle(mono), styles.input, style]}
    />
  );
}

export function AnimatedNumber(props: AnimatedNumberProps) {
  if (props.formatValue) {
    return <FormattedAnimatedNumber {...props} formatValue={props.formatValue} />;
  }
  return <NumericAnimatedNumber {...props} />;
}

const styles = StyleSheet.create({
  input: {
    padding: 0,
  },
});
