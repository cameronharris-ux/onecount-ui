import { type ImageSourcePropType, type StyleProp, type ViewStyle } from "react-native";
export interface AnimatedSplashProps {
    markSource: ImageSourcePropType;
    wordmarkSource?: ImageSourcePropType;
    backgroundColor?: string;
    accent?: string;
    onDone?: () => void;
    style?: StyleProp<ViewStyle>;
}
export declare function AnimatedSplash({ markSource, wordmarkSource, backgroundColor, accent, onDone, style, }: AnimatedSplashProps): import("react/jsx-runtime").JSX.Element;
