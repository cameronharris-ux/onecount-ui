/**
 * BrandSplash secondary motifs — the only part of the splash that differs per
 * product. Same skeleton, same clock (MOTION.splashStages), different
 * geometry:
 *
 *   barcode  (OneCount) — hairline bars aligning as the mark assembles
 *   boundary (Shield)   — corner brackets + one lock-in ring pulse
 *   trace    (Trace)    — nodes connected by a line completing at lock-in
 *   workflow (Ops)      — four nodes closing into a loop at lock-in
 *
 * Plain Views + transform/opacity only; motifs render nothing under reduced
 * motion (the splash falls back to mark + name fades).
 */
import React, { useEffect } from "react";
import { StyleSheet, View, type ViewStyle } from "react-native";
import Animated, {
  cancelAnimation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
  type SharedValue,
} from "react-native-reanimated";
import { MOTION } from "@onecount/ui-tokens";

import { EASE } from "./motion";

export type SplashMotifName = "barcode" | "boundary" | "trace" | "workflow";

export interface MotifProps {
  /** Line/texture colour (already alpha'd by the caller). */
  lineColor: string;
  /** Product identity hue — dots and nodes only. */
  accent: string;
  /** Rendered mark height, used to size the motif field. */
  markHeight: number;
}

const STAGES = MOTION.splashStages;

/** Drives 0→1 across the construction window, then a single lock-in pulse 1→2→1. */
function useMotifClock(): { build: SharedValue<number>; pulse: SharedValue<number> } {
  const build = useSharedValue(0);
  const pulse = useSharedValue(0);

  useEffect(() => {
    build.value = withDelay(
      STAGES.construction[0],
      withTiming(1, { duration: STAGES.construction[1] - STAGES.construction[0], easing: EASE.emphasized }),
    );
    pulse.value = withDelay(
      STAGES.lockIn[0],
      withSequence(
        withTiming(1, { duration: 140, easing: EASE.standard }),
        withTiming(0, { duration: 320, easing: EASE.exit }),
      ),
    );
    return () => {
      cancelAnimation(build);
      cancelAnimation(pulse);
    };
  }, [build, pulse]);

  return { build, pulse };
}

/** A single element revealed during its slice of the build window. */
function BuildIn({
  build,
  pulse,
  index,
  count,
  baseOpacity,
  pulseOpacity,
  fromTranslateY = 0,
  fromTranslateX = 0,
  style,
  children,
}: {
  build: SharedValue<number>;
  pulse: SharedValue<number>;
  index: number;
  count: number;
  baseOpacity: number;
  pulseOpacity?: number;
  fromTranslateY?: number;
  fromTranslateX?: number;
  style?: ViewStyle | ViewStyle[];
  children?: React.ReactNode;
}) {
  const animatedStyle = useAnimatedStyle(() => {
    const start = index / (count + 1);
    const end = (index + 1.6) / (count + 1);
    const t = interpolate(build.value, [start, Math.min(end, 1)], [0, 1], "clamp");
    const lift = pulseOpacity == null ? 0 : pulse.value * (pulseOpacity - baseOpacity);
    return {
      opacity: t * baseOpacity + lift,
      transform: [
        { translateY: (1 - t) * fromTranslateY },
        { translateX: (1 - t) * fromTranslateX },
      ],
    };
  });
  return <Animated.View style={[style, animatedStyle]}>{children}</Animated.View>;
}

/** A connecting line that draws (scaleX 0→1) during its slice of the build. */
function DrawLine({
  build,
  index,
  count,
  baseOpacity,
  style,
}: {
  build: SharedValue<number>;
  index: number;
  count: number;
  baseOpacity: number;
  style: ViewStyle | ViewStyle[];
}) {
  const animatedStyle = useAnimatedStyle(() => {
    const start = index / (count + 1);
    const end = (index + 1.4) / (count + 1);
    const t = interpolate(build.value, [start, Math.min(end, 1)], [0, 1], "clamp");
    return { opacity: t > 0 ? baseOpacity : 0, transform: [{ scaleX: t }] };
  });
  return <Animated.View style={[style, animatedStyle]} />;
}

// ---------------------------------------------------------------------------
// OneCount — barcode field
// ---------------------------------------------------------------------------

const BAR_HEIGHTS = [0.34, 0.58, 0.42, 0.66, 0.5];

function BarcodeMotif({ lineColor, accent, markHeight }: MotifProps) {
  const { build, pulse } = useMotifClock();
  const gap = Math.round(markHeight * 0.11);
  // Clear the mark (width ≈ 0.73 × height) plus breathing room on each side.
  const clearance = Math.round(markHeight * 0.73 + markHeight * 0.34);

  const group = (dir: -1 | 1) => (
    <View style={[styles.rowCenter, { gap }]}>
      {BAR_HEIGHTS.map((h, i) => (
        <BuildIn
          key={i}
          build={build}
          pulse={pulse}
          index={dir === -1 ? BAR_HEIGHTS.length - 1 - i : i}
          count={BAR_HEIGHTS.length}
          baseOpacity={0.16}
          pulseOpacity={0.34}
          fromTranslateY={(i % 2 === 0 ? -1 : 1) * 14}
          style={{ width: 2, height: markHeight * h, borderRadius: 1, backgroundColor: lineColor }}
        />
      ))}
    </View>
  );

  return (
    <View pointerEvents="none" style={[styles.fill, styles.center]}>
      <View style={[styles.rowCenter, { gap: clearance }]}>
        {group(-1)}
        {group(1)}
      </View>
      {/* Static offset lives on the wrapper: BuildIn owns its own transform. */}
      <View
        style={[
          styles.absCenter,
          { transform: [{ translateX: clearance * 0.62 }, { translateY: -markHeight * 0.36 }] },
        ]}
      >
        <BuildIn
          build={build}
          pulse={pulse}
          index={BAR_HEIGHTS.length - 1}
          count={BAR_HEIGHTS.length}
          baseOpacity={0.9}
          fromTranslateY={-8}
          style={[styles.dotStatic, { backgroundColor: accent }]}
        />
      </View>
    </View>
  );
}

// ---------------------------------------------------------------------------
// Shield — boundary brackets + one ring pulse
// ---------------------------------------------------------------------------

function BoundaryMotif({ lineColor, accent, markHeight }: MotifProps) {
  const { build, pulse } = useMotifClock();
  const boxW = markHeight * 0.98;
  const boxH = markHeight * 1.3;
  const arm = Math.round(markHeight * 0.16);
  const thick = 2;

  const corners: Array<{ key: string; pos: ViewStyle; out: [number, number] }> = [
    { key: "tl", pos: { left: 0, top: 0 }, out: [-10, -10] },
    { key: "tr", pos: { right: 0, top: 0 }, out: [10, -10] },
    { key: "bl", pos: { left: 0, bottom: 0 }, out: [-10, 10] },
    { key: "br", pos: { right: 0, bottom: 0 }, out: [10, 10] },
  ];

  const ringStyle = useAnimatedStyle(() => ({
    opacity: pulse.value * 0.25,
    transform: [{ scale: 1 + pulse.value * 0.12 }],
  }));

  return (
    <View pointerEvents="none" style={[styles.fill, styles.center]}>
      <View style={{ width: boxW, height: boxH }}>
        {corners.map((corner, i) => (
          <BuildIn
            key={corner.key}
            build={build}
            pulse={pulse}
            index={i}
            count={4}
            baseOpacity={0.32}
            pulseOpacity={0.5}
            fromTranslateX={corner.out[0]}
            fromTranslateY={corner.out[1]}
            style={[{ position: "absolute" }, corner.pos]}
          >
            <View
              style={{
                width: arm,
                height: thick,
                backgroundColor: lineColor,
                alignSelf: corner.pos.right != null ? "flex-end" : "flex-start",
              }}
            />
            <View
              style={{
                width: thick,
                height: arm - thick,
                backgroundColor: lineColor,
                alignSelf: corner.pos.right != null ? "flex-end" : "flex-start",
                marginTop: corner.pos.bottom != null ? -(arm - thick) - thick : 0,
              }}
            />
          </BuildIn>
        ))}
        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            { borderWidth: 1.5, borderColor: accent, borderRadius: markHeight * 0.16 },
            ringStyle,
          ]}
        />
      </View>
    </View>
  );
}

// ---------------------------------------------------------------------------
// Trace — nodes connected by a completing line
// ---------------------------------------------------------------------------

function TraceMotif({ lineColor, accent, markHeight }: MotifProps) {
  const { build, pulse } = useMotifClock();
  const y = markHeight * 0.78;
  const span = markHeight * 0.42;
  const nodes = [-1, 0, 1];

  return (
    <View pointerEvents="none" style={[styles.fill, styles.center]}>
      <View style={{ top: y, width: span * 2 + 24, height: 8, justifyContent: "center" }}>
        {nodes.slice(0, -1).map((n, i) => (
          <DrawLine
            key={`seg-${i}`}
            build={build}
            index={i * 2 + 1}
            count={5}
            baseOpacity={0.3}
            style={{
              position: "absolute",
              left: 12 + (n + 1) * span,
              width: span,
              height: 1.5,
              backgroundColor: lineColor,
              transformOrigin: "left",
            }}
          />
        ))}
        {nodes.map((n, i) => (
          <BuildIn
            key={`node-${i}`}
            build={build}
            pulse={pulse}
            index={i * 2}
            count={5}
            baseOpacity={i === nodes.length - 1 ? 0.9 : 0.5}
            pulseOpacity={i === nodes.length - 1 ? 1 : 0.5}
            style={[
              styles.dot,
              {
                left: 12 + (n + 1) * span - 4,
                top: 0,
                backgroundColor: i === nodes.length - 1 ? accent : lineColor,
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
}

// ---------------------------------------------------------------------------
// Ops — four nodes closing into a loop
// ---------------------------------------------------------------------------

function WorkflowMotif({ lineColor, accent, markHeight }: MotifProps) {
  const { build, pulse } = useMotifClock();
  const r = markHeight * 0.82;
  const positions = [
    { x: 0, y: -r },
    { x: r, y: 0 },
    { x: 0, y: r },
    { x: -r, y: 0 },
  ];
  const edgeLen = Math.sqrt(2) * r;

  return (
    <View pointerEvents="none" style={[styles.fill, styles.center]}>
      <View style={{ width: 0, height: 0 }}>
        {positions.map((pos, i) => {
          const next = positions[(i + 1) % positions.length];
          const angle = (Math.atan2(next.y - pos.y, next.x - pos.x) * 180) / Math.PI;
          return (
            <DrawLine
              key={`edge-${i}`}
              build={build}
              index={i}
              count={4}
              baseOpacity={0.28}
              style={{
                position: "absolute",
                left: pos.x,
                top: pos.y,
                width: edgeLen,
                height: 1.5,
                backgroundColor: lineColor,
                transformOrigin: "left",
                transform: [{ rotate: `${angle}deg` }],
              }}
            />
          );
        })}
        {positions.map((pos, i) => (
          <BuildIn
            key={`node-${i}`}
            build={build}
            pulse={pulse}
            index={i}
            count={4}
            baseOpacity={i === 0 ? 0.9 : 0.55}
            pulseOpacity={i === 0 ? 1 : 0.8}
            style={[
              styles.dot,
              { left: pos.x - 4, top: pos.y - 4, backgroundColor: i === 0 ? accent : lineColor },
            ]}
          />
        ))}
      </View>
    </View>
  );
}

export const SPLASH_MOTIFS: Record<SplashMotifName, React.ComponentType<MotifProps>> = {
  barcode: BarcodeMotif,
  boundary: BoundaryMotif,
  trace: TraceMotif,
  workflow: WorkflowMotif,
};

const styles = StyleSheet.create({
  fill: StyleSheet.absoluteFillObject,
  center: { alignItems: "center", justifyContent: "center" },
  rowCenter: { flexDirection: "row", alignItems: "center" },
  absCenter: { position: "absolute" },
  dot: { position: "absolute", width: 8, height: 8, borderRadius: 4 },
  dotStatic: { width: 8, height: 8, borderRadius: 4 },
});
