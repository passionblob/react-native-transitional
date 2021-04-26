import React, { Component } from 'react';
import { ImageProps } from 'react-native';
import { TransitionConfig } from './types';
export declare class TransitionalImage extends Component<ImageProps & {
    config?: TransitionConfig;
}> {
    private anim;
    private styleHolder;
    private progress;
    constructor(props: Readonly<ImageProps & {
        config?: TransitionConfig;
    }>);
    componentDidUpdate(): void;
    render(): React.ReactNode;
}
export default TransitionalImage;
