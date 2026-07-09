import React, { useCallback } from "react";
import { Pressable, type PressableProps, type StyleProp, type ViewStyle } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { CORE } from "@onecount/ui-tokens";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const PRESS_SPRING = { damping: 18, stiffness: 320, mass: 0.6 } as const;
const RELEASE_SPRING = { damping: 14, stiffness: 220, mass: 0.7 } as const;

export interface PressableScaleProps extends Omit<PressableProps, "style"> {
  pressedScale?: number;
  pressedOpacity?: number;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

export function PressableScale({
  pressedScale = CORE.componentState.pressScale,
  pressedOpacity = CORE.componentState.pressOpacity,
  disabled,
  onPressIn,
  onPressOut,
  style,
  children,
  ...rest
}: PressableScaleProps) {
  const pressed = useSharedValue(0);
  const disabledOpacity = CORE.componentState.disabledOpacity;

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: 1 + pressed.value * (pressedScale - 1) }],
    opacity: disabled ? disabledOpacity : 1 + pressed.value * (pressedOpacity - 1),
  }));

  const handlePressIn = useCallback<NonNullable<PressableProps["onPressIn"]>>(
    (event) => {
      if (!disabled) {
        pressed.value = withSpring(1, PRESS_SPRING);
      }
      onPressIn?.(event);
    },
    [disabled, onPressIn, pressed],
  );

  const handlePressOut = useCallback<NonNullable<PressableProps["onPressOut"]>>(
    (event) => {
      if (!disabled) {
        pressed.value = withSpring(0, RELEASE_SPRING);
      }
      onPressOut?.(event);
    },
    [disabled, onPressOut, pressed],
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

