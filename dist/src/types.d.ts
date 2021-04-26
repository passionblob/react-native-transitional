import { Animated, FlexStyle, StyleProp } from "react-native";
export declare type CommonConfig = {
    onTransitionStart?: () => any;
    onTransitionEnd?: Animated.EndCallback;
    useNativeDriver?: boolean;
};
export declare type SpringConfig = Omit<Animated.SpringAnimationConfig, "toValue" | "useNativeDriver"> & CommonConfig & {
    type?: "spring";
};
export declare type TimingConfig = Omit<Animated.TimingAnimationConfig, "toValue" | "useNativeDriver"> & CommonConfig & {
    type?: "timing";
};
export declare type TransitionConfig = SpringConfig | TimingConfig;
export declare type PickStylePropNames<T> = NonNullable<{
    [K in keyof T]: T[K] extends StyleProp<FlexStyle> | FlexStyle ? K : undefined;
}[keyof T]>;
export declare type StyleHolder<T> = {
    prev?: T;
    cur?: T;
    next?: T;
};
export declare type StyleHolderOf<Props> = {
    [K in PickStylePropNames<Props>]?: StyleHolder<Props[K]>;
};
export declare type StyleInterpolator<T> = {
    [key in NonNullable<keyof Animated.AnimatedProps<T>>]: (prev?: T[key], next?: T[key], ratio?: number) => T[key];
};
export declare type AnimatedStyleMapper<T> = {
    [key in NonNullable<keyof Animated.AnimatedProps<T>>]: (prev?: T[key], next?: T[key], animatedValue?: Animated.Value) => Animated.WithAnimatedValue<T[key]> | T[key];
};
