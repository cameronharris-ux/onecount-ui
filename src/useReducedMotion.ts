import { useEffect, useState } from "react";
import { AccessibilityInfo } from "react-native";

export function useReducedMotion(): boolean {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    let cancelled = false;

    AccessibilityInfo.isReduceMotionEnabled()
      .then((reduced) => {
        if (!cancelled) {
          setReduceMotion(reduced);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setReduceMotion(false);
        }
      });

    let subscription: { remove: () => void } | undefined;
    try {
      subscription = AccessibilityInfo.addEventListener("reduceMotionChanged", setReduceMotion);
    } catch {
      subscription = undefined;
    }

    return () => {
      cancelled = true;
      subscription?.remove();
    };
  }, []);

  return reduceMotion;
}

