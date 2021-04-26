import { ColorValue, Animated } from "react-native";
export declare const interpolateColor: (prev: ColorValue | undefined, next: ColorValue | undefined, ratio: number) => string;
export declare const interpolateLength: (prev: string | number | undefined, next: string | number | undefined, ratio: number) => string | number;
export declare const interpolateLayout: (prev: {
    width: number;
    height: number;
} | undefined, next: {
    width: number;
    height: number;
} | undefined, ratio: number) => {
    width: number;
    height: number;
};
export declare const mapColorToAnimated: (prev: ColorValue | undefined, next: ColorValue | undefined, animatedValue: Animated.Value) => Animated.AnimatedInterpolation;
export declare const mapLengthToAnimated: (prev: string | number | undefined, next: string | number | undefined, animatedValue: Animated.Value) => Animated.AnimatedInterpolation;
export declare const mapLayoutToAnimated: (prev: {
    width: number;
    height: number;
} | undefined, next: {
    width: number;
    height: number;
} | undefined, animated: Animated.Value) => {
    width: Animated.AnimatedInterpolation;
    height: Animated.AnimatedInterpolation;
};
