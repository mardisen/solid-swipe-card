import { createSignal, JSX, mergeProps, ParentProps } from 'solid-js';
import {
    _calcDirection,
    _calcSpeed,
    _extractDivProps,
    _mouseCoordinates,
    _PropsDefault,
    _touchCoordinates
} from './helpers';
import { _Coordinate, _Speed, _SwipeCardProps, _SwipeCardRef, _SwipeDirection, _TemporalCoordinate } from './types';

export const _createSwipeCard = (initialProps: ParentProps<_SwipeCardProps>) => {
    const props = mergeProps(_PropsDefault, initialProps);
    const divProps = _extractDivProps(props);
    const apiRef: _SwipeCardRef = {};

    const [swiped, setSwiped] = createSignal(false);
    const [style, setStyle] = createSignal<JSX.CSSProperties>({});

    let isDragging = false;
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
            rotate(${rotation}deg)`,
            transition: `ease-out ${props.smoothDuration / 1000}s`
        });

        lastPosition = finalPosition;
    };

    const snapBack = async () => {
        if (swiped()) {
            setSwiped(false);
            setStyle({
                transform: `translate(${lastPosition.x * -props.bouncePower}px, ${
                    lastPosition.y * -props.bouncePower
                }px)
                rotate(${rotation * -props.bouncePower}deg)`,
                transition: `ease-out ${props.snapBackDuration / 1000}s`
            });
            lastPosition = {
                x: 0,
                y: 0,
                timestamp: new Date().getTime()
            };

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
        const velocity = Math.hypot(speed.x, speed.y);
        isDragging = false;
        if (velocity < props.threshold) {
            handleMove(offset);
        } else {
            const diagonal = Math.hypot(document.body.clientWidth, document.body.clientHeight);
            const multiplier = diagonal / velocity;

            const speedRatio: _Speed = { x: speed.x / velocity, y: speed.y / velocity };

            const finalPosition: _Coordinate =
                velocity >= props.minSpeed
                    ? {
                          x: lastPosition.x + speed.x * multiplier,
                          y: lastPosition.y + speed.y * multiplier
                      }
                    : {
                          x: lastPosition.x + speedRatio.x * props.minSpeed * multiplier,
                          y: lastPosition.y + speedRatio.y * props.minSpeed * multiplier
                      };

            const finalRotation = rotation + props.maxRotation * (Math.random() - 0.5);

            setStyle({
                transform: `translate(${finalPosition.x}px, ${finalPosition.y}px)
                rotate(${finalRotation}deg)`,
                transition: `ease-out ${multiplier}s`
            });

            lastPosition = { ...lastPosition, ...finalPosition };
            setSwiped(true);

            props.onSwipe(_calcDirection(speed));
        }
    };

    const swipe = async (direction: _SwipeDirection, velocity?: number) => {
        if (swiped()) return;
        const finalVelocity = velocity ? velocity : props.minSpeed || props.threshold;
        const diagonal = Math.hypot(document.body.clientWidth, document.body.clientHeight);
        const multiplier = diagonal / finalVelocity;

        let speedX = 0;
        let speedY = 0;

        switch (direction) {
            case _SwipeDirection.RIGHT:
                speedX = 1;
                break;
            case _SwipeDirection.LEFT:
                speedX = -1;
                break;
            case _SwipeDirection.UP:
                speedY = -1;
                break;
            case _SwipeDirection.DOWN:
                speedY = 1;
                break;
        }

        const finalPosition: _Coordinate = {
            x: lastPosition.x + finalVelocity * speedX * multiplier,
            y: lastPosition.y + finalVelocity * speedY * multiplier
        };

        const finalRotation = rotation + props.maxRotation * (Math.random() - 0.5);

        setStyle({
            transform: `translate(${finalPosition.x}px, ${finalPosition.y}px)
                rotate(${finalRotation}deg)`,
            transition: `ease-out ${multiplier}s`
        });

        lastPosition = { ...lastPosition, ...finalPosition };
        setSwiped(true);

        props.onSwipe(direction);
    };

    const onMouseDown: JSX.EventHandlerUnion<HTMLDivElement, MouseEvent> = (event) => {
        event.preventDefault();
        if (!swiped()) {
            isDragging = true;
            offset = _mouseCoordinates(event);
        }
    };

    const onTouchStart: JSX.EventHandlerUnion<HTMLDivElement, TouchEvent> = (event) => {
        event.preventDefault();
        if (!swiped()) {
            isDragging = true;
            offset = _touchCoordinates(event);
        }
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
            {...divProps}
            attr:data-testid={props.id}
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
    props.apiRef.snapBack = snapBack;
    props.apiRef.swipe = swipe;
    props.apiRef.swiped = swiped;

    return { element, ref: props.ref, apiRef };
};
