import { CORE } from "@onecount/ui-tokens";

export const HAPTIC_MOMENTS = CORE.haptics;
export type HapticMoment = keyof typeof HAPTIC_MOMENTS;

type ExpoHapticsModule = {
  ImpactFeedbackStyle?: {
    Light?: unknown;
    Medium?: unknown;
    Heavy?: unknown;
  };
  NotificationFeedbackType?: {
    Success?: unknown;
    Warning?: unknown;
    Error?: unknown;
  };
  impactAsync?: (style: unknown) => Promise<void>;
  notificationAsync?: (type: unknown) => Promise<void>;
};

let cachedHaptics: ExpoHapticsModule | null | undefined;

function loadHaptics(): ExpoHapticsModule | null {
  if (cachedHaptics !== undefined) {
    return cachedHaptics;
  }

  try {
    const requireFn = (0, eval)("require") as (id: string) => ExpoHapticsModule;
    cachedHaptics = requireFn("expo-haptics");
  } catch {
    cachedHaptics = null;
  }

  return cachedHaptics;
}

export async function hapticMoment(moment: HapticMoment): Promise<void> {
  const strength = HAPTIC_MOMENTS[moment];
  if (!strength) {
    return;
  }

  const haptics = loadHaptics();
  if (!haptics) {
    return;
  }

  try {
    if (strength === "success") {
      await haptics.notificationAsync?.(haptics.NotificationFeedbackType?.Success ?? "success");
      return;
    }
    if (strength === "warning") {
      await haptics.notificationAsync?.(haptics.NotificationFeedbackType?.Warning ?? "warning");
      return;
    }
    if (strength === "error") {
      await haptics.notificationAsync?.(haptics.NotificationFeedbackType?.Error ?? "error");
      return;
    }
    if (strength === "medium") {
      await haptics.impactAsync?.(haptics.ImpactFeedbackStyle?.Medium ?? "medium");
      return;
    }
    if (strength === "strong") {
      await haptics.impactAsync?.(haptics.ImpactFeedbackStyle?.Heavy ?? "heavy");
      return;
    }
    await haptics.impactAsync?.(haptics.ImpactFeedbackStyle?.Light ?? "light");
  } catch {
    // Haptics should never break a UI action.
  }
}

