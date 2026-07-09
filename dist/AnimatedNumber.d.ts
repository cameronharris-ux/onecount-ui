import React from "react";
import { type StyleProp, type TextProps, type TextStyle } from "react-native";
export interface AnimatedNumberProps extends Omit<TextProps, "children"> {
    value: number;
    prefix?: string;
    suffix?: string;
    durationMs?: number;
    style?: StyleProp<TextStyle>;
    mono?: boolean;
    formatValue?: (value: number) => string;
}
export declare function AnimatedNumber({ value, prefix, suffix, durationMs, style, mono, formatValue, ...rest }: AnimatedNumberProps): React.JSX.Element;
