import { ParentComponent, ParentProps } from 'solid-js';
import { _SwipeCardProps } from './types';
import { _createSwipeCard } from './createSwipeCard';

export const _SwipeCard: ParentComponent<_SwipeCardProps> = (initialProps: ParentProps<_SwipeCardProps>) => {
    const { element } = _createSwipeCard(initialProps);

    return element;
};
