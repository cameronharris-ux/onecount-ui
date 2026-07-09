import React from "react";
import { type OneCountApp } from "./internal";
export interface AuroraProps {
    app?: OneCountApp;
    hue?: string;
    variant?: "static" | "ambient";
    full?: boolean;
    height?: number;
    intensity?: number;
}
export declare function Aurora({ app, hue, variant, full, height, intensity, }: AuroraProps): React.JSX.Element;
