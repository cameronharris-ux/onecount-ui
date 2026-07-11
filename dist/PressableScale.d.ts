import React from "react";
import { type PressableProps, type StyleProp, type ViewStyle } from "react-native";
import { type HapticMoment } from "./haptics";
export interface PressableScaleProps extends Omit<PressableProps, "style"> {
    pressedScale?: number;
    pressedOpacity?: number;
    /** Fire this haptic moment on press-in (opt-in; keep off high-frequency rows). */
    haptic?: HapticMoment;
    style?: StyleProp<ViewStyle>;
    children?: React.ReactNode;
}
export declare function PressableScale({ pressedScale, pressedOpacity, haptic, disabled, onPressIn, onPressOut, style, children, ...rest }: PressableScaleProps): React.JSX.Element;
