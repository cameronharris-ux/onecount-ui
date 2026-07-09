import React, { useEffect } from "react";
import { StyleSheet, View, type ViewStyle } from "react-native";
import Svg, { Defs, Ellipse, RadialGradient, Stop } from "react-native-svg";
import Animated, {
  Easing,
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { CORE } from "@onecount/ui-tokens";

import { appHue, type OneCountApp } from "./internal";
import { useReducedMotion } from "./useReducedMotion";

const W = 390;
const H = 800;

export interface AuroraProps {
  app?: OneCountApp;
  hue?: string;
  variant?: "static" | "ambient";
  full?: boolean;
  height?: number;
  intensity?: number;
}

interface LayerProps {
  id: string;
  color: string;
  firstStopOpacity: number;
  secondStopOffset: string;
  cx: number;
  cy: number;
  rx: number;
  ry: number;
}

function containerStyle(full: boolean, height: number | undefined, intensity: number): ViewStyle {
  return full
    ? {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: intensity,
      }
    : {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: height ?? 300,
        opacity: intensity,
      };
}

function useLayerDrift(enabled: boolean, offset: number, x: number, y: number, scaleBy: number) {
  const phase = useSharedValue(0);

  useEffect(() => {
    if (!enabled) {
      cancelAnimation(phase);
      phase.value = 0;
      return;
    }

    phase.value = 0;
    phase.value = withRepeat(
      withTiming(1, {
        duration: CORE.motion.ambient.durationMs,
        easing: Easing.linear,
      }),
      -1,
      false,
    );

    return () => {
      cancelAnimation(phase);
    };
  }, [enabled, phase]);

  return useAnimatedStyle(() => {
    const angle = (phase.value + offset) * Math.PI * 2;
    return {
      transform: [
        { translateX: Math.sin(angle) * x },
        { translateY: Math.cos(angle) * y },
        { scale: 1 + Math.sin(angle) * scaleBy },
      ],
    };
  });
}

function StaticSvg({ mint, identity, teal }: { mint: string; identity: string; teal: string }) {
  return (
    <Svg width="100%" height="100%" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
      <Defs>
        <RadialGradient id="ocMint" cx="50%" cy="50%" rx="50%" ry="50%">
          <Stop offset="0" stopColor={mint} stopOpacity={0.32} />
          <Stop offset="0.65" stopColor={mint} stopOpacity={0} />
        </RadialGradient>
        <RadialGradient id="ocIdentity" cx="50%" cy="50%" rx="50%" ry="50%">
          <Stop offset="0" stopColor={identity} stopOpacity={0.22} />
          <Stop offset="0.65" stopColor={identity} stopOpacity={0} />
        </RadialGradient>
        <RadialGradient id="ocTeal" cx="50%" cy="50%" rx="50%" ry="50%">
          <Stop offset="0" stopColor={teal} stopOpacity={0.16} />
          <Stop offset="0.7" stopColor={teal} stopOpacity={0} />
        </RadialGradient>
      </Defs>
      <Ellipse cx={W * 0.2} cy={H * 0.06} rx={W * 0.7} ry={H * 0.22} fill="url(#ocMint)" />
      <Ellipse cx={W * 0.95} cy={H * 0.1} rx={W * 0.6} ry={H * 0.2} fill="url(#ocIdentity)" />
      <Ellipse cx={W * 0.3} cy={H * 0.92} rx={W * 0.75} ry={H * 0.24} fill="url(#ocTeal)" />
    </Svg>
  );
}

function AnimatedLayer({ layer, style }: { layer: LayerProps; style: ReturnType<typeof useAnimatedStyle> }) {
  return (
    <Animated.View pointerEvents="none" style={[StyleSheet.absoluteFillObject, style]}>
      <Svg width="100%" height="100%" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
        <Defs>
          <RadialGradient id={layer.id} cx="50%" cy="50%" rx="50%" ry="50%">
            <Stop offset="0" stopColor={layer.color} stopOpacity={layer.firstStopOpacity} />
            <Stop offset={layer.secondStopOffset} stopColor={layer.color} stopOpacity={0} />
          </RadialGradient>
        </Defs>
        <Ellipse cx={layer.cx} cy={layer.cy} rx={layer.rx} ry={layer.ry} fill={`url(#${layer.id})`} />
      </Svg>
    </Animated.View>
  );
}

export function Aurora({
  app = "onecount",
  hue,
  variant = "static",
  full = true,
  height,
  intensity = 0.6,
}: AuroraProps) {
  const reducedMotion = useReducedMotion();
  const animate = variant === "ambient" && !reducedMotion;
  const mint = CORE.brand.accent;
  const identity = hue ?? appHue(app);
  const teal = CORE.brand.tealBridge;

  const mintDrift = useLayerDrift(animate, 0, 10, 6, 0.018);
  const identityDrift = useLayerDrift(animate, 0.33, 12, 8, 0.022);
  const tealDrift = useLayerDrift(animate, 0.67, 8, 5, 0.014);

  const layers: LayerProps[] = [
    {
      id: "ocMintAmbient",
      color: mint,
      firstStopOpacity: 0.32,
      secondStopOffset: "0.65",
      cx: W * 0.2,
      cy: H * 0.06,
      rx: W * 0.7,
      ry: H * 0.22,
    },
    {
      id: "ocIdentityAmbient",
      color: identity,
      firstStopOpacity: 0.22,
      secondStopOffset: "0.65",
      cx: W * 0.95,
      cy: H * 0.1,
      rx: W * 0.6,
      ry: H * 0.2,
    },
    {
      id: "ocTealAmbient",
      color: teal,
      firstStopOpacity: 0.16,
      secondStopOffset: "0.7",
      cx: W * 0.3,
      cy: H * 0.92,
      rx: W * 0.75,
      ry: H * 0.24,
    },
  ];

  return (
    <View pointerEvents="none" style={containerStyle(full, height, intensity)}>
      {animate ? (
        <>
          <AnimatedLayer layer={layers[0]} style={mintDrift} />
          <AnimatedLayer layer={layers[1]} style={identityDrift} />
          <AnimatedLayer layer={layers[2]} style={tealDrift} />
        </>
      ) : (
        <StaticSvg mint={mint} identity={identity} teal={teal} />
      )}
    </View>
  );
}

