export type OneCountApp = "onecount" | "ops" | "shield" | "trace" | "pulse";
export declare const APP_LABELS: Record<OneCountApp, string>;
export declare function appHue(app: OneCountApp): string;
export declare function appTheme(app: OneCountApp, scheme?: "dark" | "light"): import("@onecount/ui-tokens").ThemeColors;
export declare function withAlpha(color: string, alpha: number): string;
