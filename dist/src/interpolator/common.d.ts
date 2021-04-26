import { Animated } from "react-native";
export declare const interpolateNumber: (prev: number | undefined, next: number | undefined, ratio: number) => number;
export declare const mapNumberToAnimated: (prev: number | undefined, next: number | undefined, animated: Animated.Value) => Animated.AnimatedInterpolation;
export declare const makeRecords: <Keys extends readonly string[], T>(keys: Keys, value: T) => Record<Keys[number], T>;
export declare const returnNext: <Prev, Next>(prev: Prev, next: Next) => Next;
