import React, { Component } from 'react';
import { FlatListProps } from 'react-native';
import { TransitionConfig } from './types';
export declare class TransitionalFlatList<Item> extends Component<FlatListProps<Item> & {
    config?: TransitionConfig;
}> {
    private anim;
    private styleHolder;
    private progress;
    constructor(props: Readonly<FlatListProps<Item> & {
        config?: TransitionConfig;
    }>);
    componentDidUpdate(): void;
    render(): React.ReactNode;
}
export default TransitionalFlatList;
