export enum SwipeDirection {
    RIGHT = 'right',
    LEFT = 'left',
    UP = 'up',
    DOWN = 'down'
}

export type SwipeCardRef = {
    snapBack?: () => Promise<void> | void;
};

export type SwipeCardProps = {
    // TODO: add style
    // TODO: add id
    class?: string;
    threshold?: number;
    rotationMultiplier?: number;
    maxRotation?: number;
    // TODO: rename to bouncePower
    bounce?: number;
    snapBackDuration?: number;
    onSwipe?: (direction: SwipeDirection) => void;
    // TODO: refactor so the type won't be needed
    apiRef?: SwipeCardRef;
    ref?: any;
};

export type Coordinate = {
    x: number;
    y: number;
};

export type Speed = Coordinate;

export type TemporalCoordinate = Coordinate & {
    timestamp: number;
};
