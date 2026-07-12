import React from "react";
import { type AuroraPalette } from "./auroraPalette";
import type { OneCountApp } from "./internal";
export interface AuroraProps {
    app?: OneCountApp;
    hue?: string;
    palette?: AuroraPalette;
    variant?: "static" | "ambient";
    full?: boolean;
    height?: number;
    intensity?: number;
}
export declare function Aurora({ app, hue, palette, variant, full, height, intensity, }: AuroraProps): React.JSX.Element;
