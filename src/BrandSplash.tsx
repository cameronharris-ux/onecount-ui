/**
 * BrandSplash — the OneCount family's shared startup choreography
 * (docs/MOTION.md §5). One clock, five stages, per-app motif:
 *
 *   1 environment   — theme-dark background (matches the native splash tile)
 *   2 construction  — the "1" mark assembles from its real segments
 *   3 lock-in       — precise-spring settle + one brand-lock-in haptic
 *   4 identity      — product name + descriptor rise in
 *   5 handoff       — overlay fades over the already-rendered app
 *
 * Apps supply only { app, productName, descriptor, motif, onDone }. The
 * overlay is pointerEvents="none" and must be mounted only once the app is
 * ready (after SplashScreen.hideAsync) — it never blocks input or readiness.
 * Reduced motion: static mark + name fade-in/hold/fade-out, under 900 ms,
 * haptic preserved.
 */
import React, { useEffect } from "react";
import { StyleSheet, Text, View, type StyleProp, type ViewStyle } from "react-native";
import Animated, {
  cancelAnimation,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { CORE, MOTION, themeForApp, type AppKey } from "@onecount/ui-tokens";

import { BRAND_MARK_SEGMENTS, BRAND_MARK_UNITS, segmentStyle, type MarkSegment } from "./BrandMark";
import { hapticMoment } from "./haptics";
import { DUR, EASE, SPRING } from "./motion";
import { SPLASH_MOTIFS, type SplashMotifName } from "./motifs";
import { useReducedMotion } from "./useReducedMotion";

const STAGES = MOTION.splashStages;

const DEFAULT_MOTIF: Record<string, SplashMotifName> = {
  onecount: "barcode",
  ops: "workflow",
  shield: "boundary",
  trace: "trace",
};

/** Where each segment starts before it assembles (barcode-lines-aligning). */
function segmentStart(segment: MarkSegment): { x: number; y: number; rotate: number } {
  switch (segment.key) {
    case "block-1":
      return { x: 0, y: -46, rotate: 0 };
    case "block-2":
      return { x: 0, y: 38, rotate: 0 };
    case "block-3":
      return { x: 0, y: -34, rotate: 0 };
    case "block-4":
      return { x: 0, y: 50, rotate: 0 };
    case "flag":
      return { x: -26, y: 18, rotate: 9 };
    case "base":
      return { x: 0, y: 64, rotate: 0 };
    case "dot":
      return { x: 18, y: -40, rotate: 0 };
    default:
      return { x: 0, y: 24, rotate: 0 };
  }
}

function AssemblingSegment({
  segment,
  unit,
  color,
  index,
  reducedMotion,
}: {
  segment: MarkSegment;
  unit: number;
  color: string;
  index: number;
  reducedMotion: boolean;
}) {
  const progress = useSharedValue(reducedMotion ? 1 : 0);
  const start = segmentStart(segment);

  useEffect(() => {
    if (reducedMotion) {
      progress.value = 1;
      return;
    }
    progress.value = withDelay(
      STAGES.construction[0] + index * STAGES.segmentStaggerMs,
      withTiming(1, { duration: STAGES.segmentDurationMs, easing: EASE.emphasized }),
    );
    return () => cancelAnimation(progress);
  }, [index, progress, reducedMotion]);

  const animatedStyle = useAnimatedStyle(() => {
    const t = progress.value;
    const rotate = segment.rotate ?? 0;
    return {
      opacity: t,
      transform: [
        { translateX: (1 - t) * start.x * unit },
        { translateY: (1 - t) * start.y * unit },
        { rotate: `${rotate + (1 - t) * start.rotate}deg` },
        { scaleY: 1 + (1 - t) * 0.18 },
      ],
    };
  });

  return (
    <Animated.View
      style={[
        segmentStyle(segment, unit),
        // Rotation handled in the animated transform so it composes with assembly.
        { transform: undefined, backgroundColor: color },
        animatedStyle,
      ]}
    />
  );
}

export interface BrandSplashProps {
  /** App key from @onecount/ui-tokens — drives theme, identity hue, motif. */
  app: AppKey;
  /** Product name shown in stage 4 (e.g. "OneCount", "Shield"). */
  productName: string;
  /** Optional short descriptor beneath the name. */
  descriptor?: string;
  /** Motif override; defaults per app (barcode/workflow/boundary/trace). */
  motif?: SplashMotifName;
  backgroundColor?: string;
  /** Identity hue override for the mark dot + motif accents. */
  accent?: string;
  /** Fire the brand-lock-in haptic at mark settle (default true, one per mount). */
  haptics?: boolean;
  onDone?: () => void;
  style?: StyleProp<ViewStyle>;
}

export function BrandSplash({
  app,
  productName,
  descriptor,
  motif,
  backgroundColor,
  accent,
  haptics = true,
  onDone,
  style,
}: BrandSplashProps) {
  const reducedMotion = useReducedMotion();
  const { theme, themeName } = themeForApp(app);
  const colors = theme.colors.dark;
  const bg = backgroundColor ?? colors.background;
  const markColor = colors.text;
  const identity = accent ?? CORE.identityHues[themeName];
  const motifName = motif ?? DEFAULT_MOTIF[themeName] ?? "barcode";
  const Motif = SPLASH_MOTIFS[motifName];

  const markHeight = 128;
  const unit = markHeight / BRAND_MARK_UNITS.height;

  const root = useSharedValue(1);
  const markScale = useSharedValue(reducedMotion ? 1 : 1.03);
  const nameOpacity = useSharedValue(0);
  const nameY = useSharedValue(MOTION.distance.md + MOTION.distance.sm);
  const descOpacity = useSharedValue(0);

  useEffect(() => {
    let cancelled = false;
    const finish = () => {
      if (!cancelled) onDone?.();
    };
    const lockIn = () => {
      if (!cancelled && haptics) void hapticMoment("brand-lock-in");
    };

    cancelAnimation(root);
    cancelAnimation(markScale);
    cancelAnimation(nameOpacity);
    cancelAnimation(nameY);
    cancelAnimation(descOpacity);

    if (reducedMotion) {
      // Static composition: fade in fast, brief hold, fade out. Under 900 ms.
      markScale.value = 1;
      nameOpacity.value = 1;
      nameY.value = 0;
      descOpacity.value = descriptor ? 1 : 0;
      root.value = 0;
      root.value = withSequence(
        withTiming(1, { duration: DUR.fast, easing: EASE.standard }),
        withDelay(
          400,
          withTiming(0, { duration: DUR.standard, easing: EASE.exit }, (done) => {
            if (done) runOnJS(finish)();
          }),
        ),
      );
      const hold = setTimeout(lockIn, DUR.fast);
      return () => {
        cancelled = true;
        clearTimeout(hold);
        cancelAnimation(root);
      };
    }

    // Stage 3 — lock-in: precise settle + single haptic at settle start, then
    // stage 5's gentle zoom-through chained after the spring lands (sequenced:
    // a second .value assignment would cancel the spring).
    const handoffDurForScale = STAGES.handoff[1] - STAGES.handoff[0];
    markScale.value = withSequence(
      withDelay(STAGES.lockIn[0], withSpring(1, SPRING.precise)),
      withTiming(1.04, { duration: handoffDurForScale, easing: EASE.standard }),
    );
    const hapticTimer = setTimeout(lockIn, STAGES.lockIn[0]);

    // Stage 4 — identity.
    const identityDur = STAGES.identity[1] - STAGES.identity[0];
    nameOpacity.value = withDelay(STAGES.identity[0], withTiming(1, { duration: identityDur, easing: EASE.standard }));
    nameY.value = withDelay(STAGES.identity[0], withTiming(0, { duration: identityDur, easing: EASE.standard }));
    descOpacity.value = withDelay(
      STAGES.identity[0] + 60,
      withTiming(1, { duration: identityDur, easing: EASE.standard }),
    );

    // Stage 5 — handoff: fade out over the already-rendered app beneath.
    const handoffDur = STAGES.handoff[1] - STAGES.handoff[0];
    root.value = withDelay(
      STAGES.handoff[0],
      withTiming(0, { duration: handoffDur, easing: EASE.exit }, (done) => {
        if (done) runOnJS(finish)();
      }),
    );

    return () => {
      cancelled = true;
      clearTimeout(hapticTimer);
      cancelAnimation(root);
      cancelAnimation(markScale);
      cancelAnimation(nameOpacity);
      cancelAnimation(nameY);
      cancelAnimation(descOpacity);
    };
  }, [descriptor, haptics, onDone, reducedMotion, root, markScale, nameOpacity, nameY, descOpacity]);

  const rootStyle = useAnimatedStyle(() => ({ opacity: root.value }));
  const markWrapStyle = useAnimatedStyle(() => ({ transform: [{ scale: markScale.value }] }));
  const nameStyle = useAnimatedStyle(() => ({
    opacity: nameOpacity.value,
    transform: [{ translateY: nameY.value }],
  }));
  const descStyle = useAnimatedStyle(() => ({ opacity: descOpacity.value }));

  return (
    <Animated.View
      pointerEvents="none"
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      style={[StyleSheet.absoluteFill, styles.root, { backgroundColor: bg }, rootStyle, style]}
    >
      {!reducedMotion ? (
        <Motif lineColor={withAlpha(markColor, 0.6)} accent={identity} markHeight={markHeight} />
      ) : null}
      <Animated.View style={markWrapStyle}>
        <View style={{ width: BRAND_MARK_UNITS.width * unit, height: markHeight }}>
          {BRAND_MARK_SEGMENTS.map((segment, index) => (
            <AssemblingSegment
              key={segment.key}
              segment={segment}
              unit={unit}
              color={segment.dot ? identity : markColor}
              index={index}
              reducedMotion={reducedMotion}
            />
          ))}
        </View>
      </Animated.View>
      <Animated.View style={[styles.nameWrap, nameStyle]}>
        <Text style={[styles.name, { color: markColor }]}>{productName}</Text>
        {descriptor ? (
          <Animated.Text style={[styles.descriptor, { color: colors.textMuted ?? withAlpha(markColor, 0.55) }, descStyle]}>
            {descriptor}
          </Animated.Text>
        ) : null}
      </Animated.View>
    </Animated.View>
  );
}

/** #RRGGBB → rgba(...) — local, avoids a color dependency. */
function withAlpha(hex: string, alpha: number): string {
  const match = /^#?([0-9a-f]{6})$/i.exec(hex.trim());
  if (!match) return hex;
  const value = parseInt(match[1], 16);
  const r = (value >> 16) & 255;
  const g = (value >> 8) & 255;
  const b = value & 255;
  return `rgba(${r},${g},${b},${alpha})`;
}

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    justifyContent: "center",
  },
  nameWrap: {
    alignItems: "center",
    marginTop: 26,
    gap: 6,
  },
  name: {
    fontFamily: CORE.fonts.displayBold,
    fontSize: 28,
  },
  descriptor: {
    fontFamily: CORE.fonts.medium,
    fontSize: 12,
    letterSpacing: 3.2,
    textTransform: "uppercase",
  },
});
