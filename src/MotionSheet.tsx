/**
 * MotionSheet — the family's Reanimated bottom-sheet MOTION shell. Keeps RN
 * Modal's semantics (hardware back button, status-bar layering, one native
 * layer) but replaces its native `slide` animation with the house
 * choreography: backdrop fades in on `timing("nav")` while the sheet springs
 * up on `SPRING.soft`, started on the same clock (paired-element rule).
 * Dismissal runs both on `exitTiming("nav")` — the Modal stays mounted and
 * visible for the full exit, only unmounting once it completes.
 *
 * Fully controlled, like RN Modal itself: `visible` is the single source of
 * truth. Backdrop tap and the hardware back button both just call
 * `onRequestClose`; it is the caller's job to flip `visible` to false, which
 * is what actually starts the exit.
 *
 * No gesture-drag in v1 — dismissal is backdrop-tap, hardware back, or a
 * caller-triggered `onRequestClose` only.
 */
import React, { useCallback, useEffect, useState } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  View,
  useWindowDimensions,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated";

import { MOTION, SPRING, exitTiming, timing } from "./motion";
import { useReducedMotion } from "./useReducedMotion";

// Modal scrim: a neutral black dim, independent of any app/brand theme —
// there is no token for it because every product dims the same way.
const SCRIM_COLOR = "#000";

export interface MotionSheetProps {
  visible: boolean;
  onRequestClose: () => void;
  children?: React.ReactNode;
  /** Peak backdrop opacity; defaults to the MOTION.opacity.backdrop token. */
  backdropOpacity?: number;
  /** Screen-reader label for the tap-outside-to-dismiss backdrop. */
  backdropAccessibilityLabel?: string;
  /** Disables backdrop dismissal and exposes its disabled accessibility state. */
  backdropDisabled?: boolean;
  sheetStyle?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  testID?: string;
}

export function MotionSheet({
  visible,
  onRequestClose,
  children,
  backdropOpacity: backdropOpacityProp,
  backdropAccessibilityLabel = "Close",
  backdropDisabled = false,
  sheetStyle,
  contentContainerStyle,
  testID,
}: MotionSheetProps) {
  const reducedMotion = useReducedMotion();
  const { height: windowHeight } = useWindowDimensions();
  // The Modal must stay visible through the exit animation, so "mounted" is
  // one beat behind "visible": it flips true immediately, but only flips
  // back to false once the exit has actually finished.
  const [mounted, setMounted] = useState(visible);
  const backdropTarget = backdropOpacityProp ?? MOTION.opacity.backdrop;

  const backdropOpacity = useSharedValue(0);
  const sheetOpacity = useSharedValue(0);
  const translateY = useSharedValue(windowHeight);

  useEffect(() => {
    if (visible) {
      setMounted(true);
    }
  }, [visible]);

  useEffect(() => {
    if (!mounted) return;

    if (visible) {
      if (reducedMotion) {
        // Reduced motion: cross-fade only, no translation.
        translateY.value = 0;
        backdropOpacity.value = withTiming(backdropTarget, timing("fast"));
        sheetOpacity.value = withTiming(1, timing("fast"));
      } else {
        backdropOpacity.value = withTiming(backdropTarget, timing("nav"));
        sheetOpacity.value = 1;
        translateY.value = withSpring(0, SPRING.soft);
      }
      return;
    }

    const unmount = (finished?: boolean) => {
      "worklet";
      if (finished) {
        runOnJS(setMounted)(false);
      }
    };

    if (reducedMotion) {
      translateY.value = 0;
      backdropOpacity.value = withTiming(0, timing("fast"));
      sheetOpacity.value = withTiming(0, timing("fast"), unmount);
    } else {
      backdropOpacity.value = withTiming(0, exitTiming("nav"));
      sheetOpacity.value = 1;
      translateY.value = withTiming(windowHeight, exitTiming("nav"), unmount);
    }
  }, [visible, mounted, reducedMotion, backdropTarget, windowHeight, backdropOpacity, sheetOpacity, translateY]);

  const backdropStyle = useAnimatedStyle(() => ({ opacity: backdropOpacity.value }));
  const sheetAnimatedStyle = useAnimatedStyle(() => ({
    opacity: sheetOpacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  const handleRequestClose = useCallback(() => {
    onRequestClose();
  }, [onRequestClose]);

  if (!mounted) {
    return null;
  }

  return (
    <Modal transparent animationType="none" statusBarTranslucent visible={mounted} onRequestClose={handleRequestClose} testID={testID}>
      <View style={StyleSheet.absoluteFillObject}>
        <Animated.View style={[StyleSheet.absoluteFillObject, styles.backdrop, backdropStyle]}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={backdropAccessibilityLabel}
            accessibilityState={{ disabled: backdropDisabled }}
            disabled={backdropDisabled}
            style={StyleSheet.absoluteFillObject}
            onPress={handleRequestClose}
          />
        </Animated.View>
        <Animated.View style={[styles.sheetContainer, sheetStyle, sheetAnimatedStyle]}>
          <View style={contentContainerStyle}>{children}</View>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: SCRIM_COLOR,
  },
  sheetContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },
});
