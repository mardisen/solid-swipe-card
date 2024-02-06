import { JSX } from 'solid-js/jsx-runtime';
import { Accessor } from 'solid-js';

export type _SwipeDirection = 'right' | 'left' | 'up' | 'down';

export type _SwipeCardRef = {
    snapBack?: () => Promise<void> | void;
    swipe?: (direction: _SwipeDirection, velocity?: number) => Promise<void> | void;
    swiped?: Accessor<boolean>;
};

export type _SwipeCardProps = Omit<JSX.HTMLAttributes<HTMLDivElement>, 'style'> & {
    style?: JSX.CSSProperties;
    threshold?: number;
    minSpeed?: number;
    rotationMultiplier?: number;
    maxRotation?: number;
    bouncePower?: number;
    snapBackDuration?: number;
    smoothDuration?: number;
    onSwipe?: (direction: _SwipeDirection) => Promise<void> | void;
    onSnapBack?: () => Promise<void> | void;
    apiRef?: NonNullable<_SwipeCardRef & any>;
};

export type _Coordinate = {
    x: number;
    y: number;
};

export type _Speed = _Coordinate;

export type _TemporalCoordinate = _Coordinate & {
    timestamp: number;
};
