import { Animated, FlexStyle, StyleProp } from "react-native"

export type CommonConfig = {
    onTransitionStart?: () => any
    onTransitionEnd?: () => any
}

export type SpringConfig =
Omit<Animated.SpringAnimationConfig, "toValue">
& CommonConfig
& {
    type: "spring"
}

export type TimingConfig =
Omit<Animated.TimingAnimationConfig, "toValue">
& CommonConfig
& {
    type: "timing"
}

export type TransitionConfig = SpringConfig | TimingConfig

export type PickStylePropNames<T> = NonNullable<{
    [K in keyof T]: T[K] extends StyleProp<FlexStyle> | FlexStyle ? K : undefined
}[keyof T]>

export type StyleHolder<T> = {
    prev?: T
    cur?: T
    next?: T
}

export type StyleHolderOf<Props> = {
    [K in PickStylePropNames<Props>]?: StyleHolder<Props[K]>
}


export type StyleInterpolator<T> = {
    [key in NonNullable<keyof Animated.AnimatedProps<T>>]: (
        prev?: T[key],
        next?: T[key],
        ratio?: number
    ) => T[key]
}

export type AnimatedStyleMapper<T> = {
    [key in NonNullable<keyof Animated.AnimatedProps<T>>]: (
        prev?: T[key],
        next?: T[key],
        animatedValue?: Animated.Value
    ) => Animated.WithAnimatedValue<T[key]> | T[key]
}