import React from "react";
import { type StyleProp, type TextStyle, type ViewStyle } from "react-native";
import { type OneCountApp } from "./internal";
export interface AiHeroProps {
    title: string;
    subtitle?: string;
    badge?: React.ReactNode;
    children?: React.ReactNode;
    app?: OneCountApp;
    scheme?: "dark" | "light";
    aurora?: React.ReactNode;
    style?: StyleProp<ViewStyle>;
    contentStyle?: StyleProp<ViewStyle>;
    titleStyle?: StyleProp<TextStyle>;
    subtitleStyle?: StyleProp<TextStyle>;
}
export declare function AiHero({ title, subtitle, badge, children, app, scheme, aurora, style, contentStyle, titleStyle, subtitleStyle, }: AiHeroProps): import("react/jsx-runtime").JSX.Element;
