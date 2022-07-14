import { ParentComponent, ParentProps } from 'solid-js';
import { SwipeCardProps } from './types';
import createSwipeCard from './createSwipeCard';

export const SwipeCard: ParentComponent<SwipeCardProps> = (initialProps: ParentProps<SwipeCardProps>) => {
    const { element } = createSwipeCard(initialProps);

    return element;
};
