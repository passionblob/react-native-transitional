import React, { Component } from 'react';
import { ViewProps } from 'react-native';
import { TransitionConfig } from './types';
export declare class TransitionalView extends Component<ViewProps & {
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
export default TransitionalView;
