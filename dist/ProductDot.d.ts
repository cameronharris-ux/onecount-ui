import React from "react";
import { type StyleProp, type ViewStyle } from "react-native";
import { type OneCountApp } from "./internal";
export interface ProductDotProps {
    app: OneCountApp;
    size?: number;
    style?: StyleProp<ViewStyle>;
}
export declare function ProductDot({ app, size, style }: ProductDotProps): React.JSX.Element;
