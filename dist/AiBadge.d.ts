import React from "react";
import { type StyleProp, type TextStyle, type ViewStyle } from "react-native";
export interface AiBadgeProps {
    label?: string;
    showIcon?: boolean;
    style?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
    accessibilityLabel?: string;
}
export declare function AiBadge({ label, showIcon, style, textStyle, accessibilityLabel, }: AiBadgeProps): React.JSX.Element;
