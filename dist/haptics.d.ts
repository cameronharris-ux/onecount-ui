export declare const HAPTIC_MOMENTS: Record<string, "light" | "medium" | "strong" | "success" | "warning" | "error" | "selection"> & {
    $comment?: string;
};
export type HapticMoment = keyof typeof HAPTIC_MOMENTS;
export declare function hapticMoment(moment: HapticMoment): Promise<void>;
