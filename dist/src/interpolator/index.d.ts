import { Animated } from "react-native";
import { StyleHolder, StyleHolderOf, StyleInterpolator, AnimatedStyleMapper } from "../types";
declare type TransitionalInterpolatorProps<T> = {
    default?: T;
    properties: {
        color: string[];
        number: string[];
        length: string[];
        layout: string[];
        nonInterpolable: string[];
    };
};
export declare class TransitionalInterpolator<T extends Record<any, any>> {
    props: TransitionalInterpolatorProps<T>;
    styleInterpolator: StyleInterpolator<T>;
    animatedStyleMapper: AnimatedStyleMapper<T>;
    constructor(props: TransitionalInterpolatorProps<T>);
    getDefaultValue: <T_1>(key: keyof T_1) => T[keyof T_1] | undefined;
    getInterpolatedStyle: <T_1>(prevStyle: T_1, nextStyle: T_1, ratio: number) => T_1;
    getTransitionalStyle: <T_1>(prevStyle: T_1, nextStyle: T_1, anim: Animated.Value) => Animated.AnimatedProps<T_1>;
}
export declare const createStyleHolder: <T>() => StyleHolder<T>;
export declare function getTransitionalStyles<OriginalProps>(params: {
    styleHolder: StyleHolderOf<OriginalProps>;
    targets: (keyof StyleHolderOf<OriginalProps>)[];
    props: OriginalProps;
    interpolator: TransitionalInterpolator<any>;
    progress: number;
    anim: Animated.Value;
}): any;
export {};
