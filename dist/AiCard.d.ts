import React from "react";
import { type StyleProp, type ViewStyle } from "react-native";
import { type OneCountApp } from "./internal";
export interface AiCardProps {
    children?: React.ReactNode;
    app?: OneCountApp;
    scheme?: "dark" | "light";
    halo?: boolean;
    style?: StyleProp<ViewStyle>;
    contentStyle?: StyleProp<ViewStyle>;
}
export declare function AiCard({ children, app, scheme, halo, style, contentStyle, }: AiCardProps): React.JSX.Element;
