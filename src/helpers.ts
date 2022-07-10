import { SwipeDirection } from './types';
import type { SwipeCardProps, Speed, Coordinate, TemporalCoordinate } from './types';

export const PropsDefault: SwipeCardProps = {
    threshold: 300,
    rotationMultiplier: 7.5,
    maxRotation: 90,
    snapBackDuration: 300,
    bounce: 0.1,
    onSwipe: () => { },
};

export const calcSpeed = (oldCoords: TemporalCoordinate, newCoords: TemporalCoordinate): Speed => {
    const deltaX = newCoords.x - oldCoords.x;
    const deltaY = oldCoords.y - newCoords.y;
    const deltaT = (newCoords.timestamp - oldCoords.timestamp) / 1000;

    const x = deltaX / deltaT;
    const y = deltaY / deltaT;

    return { x, y };
};

export const calcDirection = (speed: Speed): SwipeDirection => {
    if (Math.abs(speed.x) > Math.abs(speed.y)) {
        if (speed.x >= 0)
            return SwipeDirection.RIGHT;
        else
            return SwipeDirection.LEFT;
    }
    else {
        if (speed.y >= 0)
            return SwipeDirection.UP;
        else
            return SwipeDirection.DOWN;
    }
};

export const pythagoras = (coords: Coordinate): number => {
    return Math.sqrt(Math.pow(coords.x, 2) + Math.pow(coords.y, 2));
};

export const mouseCoordinates = (event: MouseEvent): Coordinate => ({ x: event.clientX, y: event.clientY });
export const touchCoordinates = (event: TouchEvent): Coordinate => ({ x: event.touches[0].clientX, y: event.touches[0].clientY });
