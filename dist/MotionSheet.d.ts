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
import React from "react";
import { type StyleProp, type ViewStyle } from "react-native";
export interface MotionSheetProps {
    visible: boolean;
    onRequestClose: () => void;
    children?: React.ReactNode;
    /** Peak backdrop opacity; defaults to the MOTION.opacity.backdrop token. */
    backdropOpacity?: number;
    sheetStyle?: StyleProp<ViewStyle>;
    contentContainerStyle?: StyleProp<ViewStyle>;
    testID?: string;
}
export declare function MotionSheet({ visible, onRequestClose, children, backdropOpacity: backdropOpacityProp, sheetStyle, contentContainerStyle, testID, }: MotionSheetProps): React.JSX.Element | null;
