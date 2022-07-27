import { _SwipeDirection } from './types';
import { _SwipeCardProps, _Speed, _Coordinate, _TemporalCoordinate } from './types';

export const _PropsDefault: _SwipeCardProps = {
    threshold: 300,
    rotationMultiplier: 7.5,
    maxRotation: 90,
    snapBackDuration: 300,
    bouncePower: 0.1,
    onSwipe: () => {},
    onSnapBack: () => {},
    apiRef: {}
};

export const _calcSpeed = (oldCoords: _TemporalCoordinate, newCoords: _TemporalCoordinate): _Speed => {
    const deltaX = newCoords.x - oldCoords.x;
    const deltaY = oldCoords.y - newCoords.y;
    const deltaT = (newCoords.timestamp - oldCoords.timestamp) / 1000;

    const x = deltaX / deltaT;
    const y = deltaY / deltaT;

    return { x, y };
};

export const _calcDirection = (speed: _Speed): _SwipeDirection => {
    if (Math.abs(speed.x) > Math.abs(speed.y)) {
        if (speed.x >= 0) return _SwipeDirection.RIGHT;
        else return _SwipeDirection.LEFT;
    } else {
        if (speed.y >= 0) return _SwipeDirection.UP;
        else return _SwipeDirection.DOWN;
    }
};

export const _pythagoras = (coords: _Coordinate): number => {
    return Math.sqrt(Math.pow(coords.x, 2) + Math.pow(coords.y, 2));
};

export const _mouseCoordinates = (event: MouseEvent): _Coordinate => ({
    x: event.clientX,
    y: event.clientY
});
export const _touchCoordinates = (event: TouchEvent): _Coordinate => ({
    x: event.touches[0].clientX,
    y: event.touches[0].clientY
});
