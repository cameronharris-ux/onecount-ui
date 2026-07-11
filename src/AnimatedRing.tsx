/**
 * AnimatedRing — the family's one ring sweep. Generalised from Shield's score
 * dial, Ops's shift-score dial, and Trace's freshness ring: an SVG circle
 * whose strokeDashoffset sweeps in via useAnimatedProps, on the data-reveal
 * motion token. Callers own their own size/stroke math, colour band, and
 * centred content (numeral, caption, status row) — this component owns only
 * the ring geometry and the motion.
 */
import React, { useEffect } from "react";
import { View, type StyleProp, type ViewStyle } from "react-native";
import Svg, { Circle } from "react-native-svg";
import Animated, { useAnimatedProps, useSharedValue, withDelay, withTiming } from "react-native-reanimated";

import { EASE, timing } from "./motion";
import { useReducedMotion } from "./useReducedMotion";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export interface AnimatedRingProps {
  size: number;
  strokeWidth: number;
  /** 0..1 — callers normalise their own 0–100 (or other range) score first. */
  progress: number;
  color: string;
  trackColor: string;
  /** Round stroke caps; every existing ring in the family uses this. */
  rounded?: boolean;
  /** Delay before the sweep starts (ms). Ops's dial staggers 120ms after mount. */
  delayMs?: number;
  /** Overrides the sweep duration; defaults to the data-reveal motion token. */
  durationMs?: number;
  style?: StyleProp<ViewStyle>;
  /** Absolutely-centred content — numeral, caption, status row. */
  children?: React.ReactNode;
}

export function AnimatedRing({
  size,
  strokeWidth,
  progress,
  color,
  trackColor,
  rounded = true,
  delayMs = 0,
  durationMs,
  style,
  children,
}: AnimatedRingProps) {
  const reducedMotion = useReducedMotion();
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.max(0, Math.min(1, progress));

  // Undelayed by default (Shield/Trace); reduced motion snaps straight to the
  // end state instead of sweeping, same contract as every ring it replaces.
  const fraction = useSharedValue(reducedMotion ? clamped : 0);

  useEffect(() => {
    if (reducedMotion) {
      fraction.value = clamped;
      return;
    }
    const config = durationMs === undefined ? timing("data") : { duration: durationMs, easing: EASE.standard };
    fraction.value = delayMs > 0 ? withDelay(delayMs, withTiming(clamped, config)) : withTiming(clamped, config);
  }, [clamped, delayMs, durationMs, fraction, reducedMotion]);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: circumference * (1 - fraction.value),
  }));

  return (
    <View style={[{ width: size, height: size, alignItems: "center", justifyContent: "center" }, style]}>
      <Svg width={size} height={size}>
        <Circle cx={size / 2} cy={size / 2} r={radius} stroke={trackColor} strokeWidth={strokeWidth} fill="none" />
        <AnimatedCircle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap={rounded ? "round" : "butt"}
          strokeDasharray={`${circumference} ${circumference}`}
          animatedProps={animatedProps}
          fill="none"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </Svg>
      {children ? <View style={{ position: "absolute", alignItems: "center" }}>{children}</View> : null}
    </View>
  );
}
