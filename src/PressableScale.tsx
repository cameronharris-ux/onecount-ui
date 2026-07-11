import React, { useCallback } from "react";
import { Pressable, type PressableProps, type StyleProp, type ViewStyle } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { CORE } from "@onecount/ui-tokens";

import { hapticMoment, type HapticMoment } from "./haptics";
import { SPRING } from "./motion";
import { useReducedMotion } from "./useReducedMotion";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export interface PressableScaleProps extends Omit<PressableProps, "style"> {
  pressedScale?: number;
  pressedOpacity?: number;
  /** Fire this haptic moment on press-in (opt-in; keep off high-frequency rows). */
  haptic?: HapticMoment;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

export function PressableScale({
  pressedScale = CORE.componentState.pressScale,
  pressedOpacity = CORE.componentState.pressOpacity,
  haptic,
  disabled,
  onPressIn,
  onPressOut,
  style,
  children,
  ...rest
}: PressableScaleProps) {
  const pressed = useSharedValue(0);
  const reducedMotion = useReducedMotion();
  const disabledOpacity = CORE.componentState.disabledOpacity;

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: reducedMotion ? 1 : 1 + pressed.value * (pressedScale - 1) }],
    // Opacity press feedback is state, not motion — it survives reduced motion.
    opacity: disabled ? disabledOpacity : 1 + pressed.value * (pressedOpacity - 1),
  }));

  const handlePressIn = useCallback<NonNullable<PressableProps["onPressIn"]>>(
    (event) => {
      if (!disabled) {
        pressed.value = reducedMotion ? 1 : withSpring(1, SPRING.press);
        if (haptic) void hapticMoment(haptic);
      }
      onPressIn?.(event);
    },
    [disabled, haptic, onPressIn, pressed, reducedMotion],
  );

  const handlePressOut = useCallback<NonNullable<PressableProps["onPressOut"]>>(
    (event) => {
      if (!disabled) {
        pressed.value = reducedMotion ? 0 : withSpring(0, SPRING.release);
      }
      onPressOut?.(event);
    },
    [disabled, onPressOut, pressed, reducedMotion],
  );

  return (
    <AnimatedPressable
      {...rest}
      disabled={disabled}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[animatedStyle, style]}
    >
      {children}
    </AnimatedPressable>
  );
}
