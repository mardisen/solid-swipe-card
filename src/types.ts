import { JSX } from 'solid-js/jsx-runtime';

export enum _SwipeDirection {
    RIGHT = 'right',
    LEFT = 'left',
    UP = 'up',
    DOWN = 'down'
}

export type _SwipeCardRef = {
    snapBack?: () => Promise<void> | void;
    hasSwiped?: () => boolean;
};

export type _SwipeCardProps = Omit<JSX.HTMLAttributes<HTMLDivElement>, 'style'> & {
    style?: JSX.CSSProperties;
    threshold?: number;
    rotationMultiplier?: number;
    maxRotation?: number;
    bouncePower?: number;
    snapBackDuration?: number;
    onSwipe?: (direction: _SwipeDirection) => void;
    onSnapBack?: () => void;
    // TODO: find a way to pass it as nullable
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
