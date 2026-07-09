import React from "react";
import { type PressableProps, type StyleProp, type ViewStyle } from "react-native";
export interface PressableScaleProps extends Omit<PressableProps, "style"> {
    pressedScale?: number;
    pressedOpacity?: number;
    style?: StyleProp<ViewStyle>;
    children?: React.ReactNode;
}
export declare function PressableScale({ pressedScale, pressedOpacity, disabled, onPressIn, onPressOut, style, children, ...rest }: PressableScaleProps): React.JSX.Element;
