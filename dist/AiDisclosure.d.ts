import { type StyleProp, type TextStyle, type ViewStyle } from "react-native";
import { type OneCountApp } from "./internal";
export interface AiDisclosureProps {
    children?: string;
    app?: OneCountApp;
    scheme?: "dark" | "light";
    style?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
}
export declare function AiDisclosure({ children, app, scheme, style, textStyle, }: AiDisclosureProps): import("react/jsx-runtime").JSX.Element;
