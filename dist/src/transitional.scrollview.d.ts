import React, { Component } from 'react';
import { ViewProps, ScrollViewProps } from 'react-native';
import { TransitionConfig } from './types';
export declare class TransitionalScrollView extends Component<ScrollViewProps & {
    config?: TransitionConfig;
}> {
    private anim;
    private styleHolder;
    private progress;
    constructor(props: Readonly<ViewProps & {
        config?: TransitionConfig;
    }>);
    componentDidUpdate(): void;
    render(): React.ReactNode;
}
export default TransitionalScrollView;
