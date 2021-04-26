import React, { Component } from 'react';
import { SectionListProps } from 'react-native';
import { TransitionConfig } from './types';
export declare class TransitionalSectionList<Item> extends Component<SectionListProps<Item> & {
    config?: TransitionConfig;
}> {
    private anim;
    private styleHolder;
    private progress;
    constructor(props: Readonly<SectionListProps<Item> & {
        config?: TransitionConfig;
    }>);
    componentDidUpdate(): void;
    render(): React.ReactNode;
}
export default TransitionalSectionList;
