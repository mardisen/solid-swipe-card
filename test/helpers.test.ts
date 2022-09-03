import { SwipeCardProps, SwipeDirection } from '../src';
import {
    _calcDirection,
    _calcSpeed,
    _extractDivProps,
    _mouseCoordinates,
    _PropsDefault,
    _touchCoordinates
} from '../src/helpers';

describe('helpers', () => {
    it('calculates speed', () => {
        const oldCoords = { x: 0, y: 0, timestamp: 0 };

        const newCoords = { x: 0, y: 100, timestamp: 1000 };
        const speed = _calcSpeed(oldCoords, newCoords);

        expect(speed).toBeDefined();
        expect(speed.x).toBe(0);
        expect(speed.y).toBe(100);
    });
    it('calculates direction', () => {
        let speed = { x: 0, y: 100 };

        let direction = _calcDirection(speed);

        expect(direction).toBe('up');

        speed = { x: 100, y: 0 };

        direction = _calcDirection(speed);

        expect(direction).toBe('right');

        speed = { x: 0, y: -100 };

        direction = _calcDirection(speed);

        expect(direction).toBe('down');

        speed = { x: -100, y: 0 };

        direction = _calcDirection(speed);

        expect(direction).toBe('left');
    });
    it('calculates coordinates from mouse event', () => {
        const mouseEvent = new MouseEvent('mousemove', { clientX: 100, clientY: 100 });

        const coords = _mouseCoordinates(mouseEvent);

        expect(coords).toEqual({ x: 100, y: 100 });
    });
    it('calculates coordinates from touch event', () => {
        const touchEvent = new TouchEvent('touchmove', {
            touches: [
                {
                    clientX: 100,
                    clientY: 100,
                    force: 10,
                    radiusX: 10,
                    radiusY: 10,
                    pageX: 10,
                    pageY: 10,
                    target: null,
                    rotationAngle: 0,
                    screenX: 900,
                    screenY: 900,
                    identifier: 0
                }
            ]
        });

        const coords = _touchCoordinates(touchEvent);

        expect(coords).toEqual({ x: 100, y: 100 });
    });
    it('extracts standalone div props', () => {
        const props: SwipeCardProps = { ..._PropsDefault, id: 'test-id' };

        const extractedProps = _extractDivProps(props);

        expect(extractedProps).toEqual({ id: 'test-id' });
    });
});
