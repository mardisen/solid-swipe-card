export enum SwipeDirection {
    RIGHT = "right",
    LEFT = "left",
    UP = "up",
    DOWN = "down"
}

export type SwipeCardRef = {
    bringBack?: () => void;
};

export type SwipeCardProps = {
    class?: string;
    threshold?: number;
    rotationMultiplier?: number;
    maxRotation?: number;
    bounce?: number;
    snapBackDuration?: number;
    onSwipe?: (direction: SwipeDirection) => void;
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