import { createSignal, JSX, mergeProps, ParentProps } from 'solid-js';
import {
    _calcDirection,
    _calcSpeed,
    _mouseCoordinates,
    _PropsDefault,
    _pythagoras,
    _touchCoordinates
} from './helpers';
import { _Coordinate, _Speed, _SwipeCardProps, _SwipeCardRef, _TemporalCoordinate } from './types';

export const _createSwipeCard = (initialProps: ParentProps<_SwipeCardProps>) => {
    const props = mergeProps(_PropsDefault, initialProps);
    const apiRef: _SwipeCardRef = {};

    const [style, setStyle] = createSignal<JSX.CSSProperties>({});

    let isDragging = false;
    let isReleased = false;
    let rotation = 0;
    let speed: _Speed = { x: 0, y: 0 };
    let lastPosition: _TemporalCoordinate = {
        x: 0,
        y: 0,
        timestamp: new Date().getTime()
    };
    let offset: _Coordinate = { x: 0, y: 0 };

    const handleMove = (coords: _Coordinate) => {
        const finalPosition: _TemporalCoordinate = {
            x: coords.x - offset.x,
            y: coords.y - offset.y,
            timestamp: new Date().getTime()
        };

        speed = _calcSpeed(lastPosition, finalPosition);
        rotation = isDragging ? (speed.x / 1000) * props.rotationMultiplier : 0;

        setStyle({
            transform: `translate(${finalPosition.x}px, ${finalPosition.y}px)
            rotate(${rotation}deg)`
        });

        lastPosition = finalPosition;
    };

    const snapBack = async () => {
        if (isReleased) {
            isReleased = false;
            setStyle({
                transform: `translate(${lastPosition.x * -props.bouncePower}px, ${
                    lastPosition.y * -props.bouncePower
                }px)
                rotate(${rotation * -props.bouncePower}deg)`,
                transition: `ease-out ${props.snapBackDuration / 1000}s`
            });

            await new Promise<void>((resolve) =>
                setTimeout(() => {
                    setStyle({
                        transform: 'none',
                        'transition-property': 'all',
                        'transition-timing-function': 'cubic-bezier(0.4, 0, 0.2, 1)',
                        'transition-duration': props.snapBackDuration / 2 + 'ms'
                    });
                    resolve();
                }, props.snapBackDuration + 25)
            );

            speed = { x: 0, y: 0 };
            props.onSnapBack();
        }
    };

    const release = () => {
        const velocity = _pythagoras(speed);
        isDragging = false;
        if (velocity < props.threshold) {
            handleMove(offset);
        } else {
            const diagonal = _pythagoras({ x: document.body.clientWidth, y: document.body.clientHeight });
            const multiplier = diagonal / velocity;

            const finalPosition: _Coordinate = {
                x: lastPosition.x + speed.x * multiplier,
                y: lastPosition.y + -speed.y * multiplier
            };

            const finalRotation = rotation + props.maxRotation * (Math.random() - 0.5);

            setStyle({
                transform: `translate(${finalPosition.x}px, ${finalPosition.y}px)
                rotate(${finalRotation}deg)`,
                transition: `ease-out ${multiplier}s`
            });

            lastPosition = { ...lastPosition, ...finalPosition };
            isReleased = true;

            props.onSwipe(_calcDirection(speed));
        }
    };

    const onMouseDown: JSX.EventHandlerUnion<HTMLDivElement, MouseEvent> = (event) => {
        event.preventDefault();
        isDragging = true;
        offset = _mouseCoordinates(event);
    };

    const onTouchStart: JSX.EventHandlerUnion<HTMLDivElement, TouchEvent> = (event) => {
        event.preventDefault();
        isDragging = true;
        offset = _touchCoordinates(event);
    };

    const onMouseMove: JSX.EventHandlerUnion<HTMLDivElement, MouseEvent> = (event) => {
        event.preventDefault();
        if (isDragging) handleMove(_mouseCoordinates(event));
    };

    const onTouchMove: JSX.EventHandlerUnion<HTMLDivElement, TouchEvent> = (event) => {
        event.preventDefault();
        if (isDragging) handleMove(_touchCoordinates(event));
    };

    const onDragEnd: JSX.EventHandlerUnion<HTMLDivElement, MouseEvent | TouchEvent> = (event) => {
        event.preventDefault();
        if (isDragging) {
            release();
        }
    };

    const element = (
        <div
            {...props}
            style={{ ...props.style, ...style() }}
            onMouseMove={onMouseMove}
            onTouchMove={onTouchMove}
            onMouseDown={onMouseDown}
            onTouchStart={onTouchStart}
            onMouseLeave={onDragEnd}
            onMouseUp={onDragEnd}
            onTouchEnd={onDragEnd}
        >
            {props.children}
        </div>
    );

    // Ref setup
    const oldCallback = props.apiRef.snapBack;

    props.apiRef.snapBack = async () => {
        await snapBack();
        if (oldCallback) await oldCallback();
    };

    return { element, ref: props.ref, apiRef };
};
