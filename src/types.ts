import { JSX } from 'solid-js/jsx-runtime';

export enum _SwipeDirection {
    RIGHT = 'right',
    LEFT = 'left',
    UP = 'up',
    DOWN = 'down'
}

export type _SwipeCardRef = {
    snapBack?: () => Promise<void> | void;
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
    // TODO: refactor so the type won't be needed
    apiRef?: _SwipeCardRef;
};

export type _Coordinate = {
    x: number;
    y: number;
};

export type _Speed = _Coordinate;

export type _TemporalCoordinate = _Coordinate & {
    timestamp: number;
};
