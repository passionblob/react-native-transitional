import React, { Component } from 'react';
import { TextProps } from 'react-native';
import { TransitionConfig } from './types';
export declare class TransitionalText extends Component<TextProps & {
    config?: TransitionConfig;
}> {
    private anim;
    private styleHolder;
    private progress;
    constructor(props: Readonly<TextProps & {
        config?: TransitionConfig;
    }>);
    componentDidUpdate(): void;
    render(): React.ReactNode;
}
export default TransitionalText;
