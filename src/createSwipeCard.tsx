import { createSignal, JSX, mergeProps, ParentProps } from 'solid-js';
import { calcDirection, calcSpeed, mouseCoordinates, PropsDefault, pythagoras, touchCoordinates } from './helpers';
import { Coordinate, Speed, SwipeCardProps, SwipeCardRef, TemporalCoordinate } from './types';

const createSwipeCard = (initialProps: ParentProps<SwipeCardProps>) => {
    const props = mergeProps(PropsDefault, initialProps);
    const apiRef: SwipeCardRef = {};

    const [style, setStyle] = createSignal<JSX.CSSProperties>({});

    let isDragging: boolean = false;
    let isReleased: boolean = false;
    let rotation: number = 0;
    let speed: Speed = { x: 0, y: 0 };
    let lastPosition: TemporalCoordinate = {
        x: 0,
        y: 0,
        timestamp: new Date().getTime()
    };
    let offset: Coordinate = { x: 0, y: 0 };

    const handleMove = (coords: Coordinate) => {
        const finalPosition: TemporalCoordinate = {
            x: coords.x - offset.x,
            y: coords.y - offset.y,
            timestamp: new Date().getTime()
        };

        speed = calcSpeed(lastPosition, finalPosition);
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
                transform: `translate(${lastPosition.x * -props.bounce}px, ${lastPosition.y * -props.bounce}px)
                rotate(${rotation * -props.bounce}deg)`,
                transition: `ease-out ${props.snapBackDuration / 1000}s`
            });

            await new Promise(() => setTimeout(() => setStyle({ transform: 'none' }), props.snapBackDuration + 25));

            speed = { x: 0, y: 0 };
        }
    };

    const release = () => {
        const velocity = pythagoras(speed);
        isDragging = false;
        if (velocity < props.threshold) {
            handleMove(offset);
        } else {
            const diagonal = pythagoras({ x: document.body.clientWidth, y: document.body.clientHeight });
            const multiplier = diagonal / velocity;

            const finalPosition: Coordinate = {
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

            props.onSwipe(calcDirection(speed));
        }
    };

    const onMouseDown: JSX.EventHandlerUnion<HTMLDivElement, MouseEvent> = event => {
        event.preventDefault();
        isDragging = true;
        offset = mouseCoordinates(event);
    };

    const onTouchStart: JSX.EventHandlerUnion<HTMLDivElement, TouchEvent> = event => {
        event.preventDefault();
        isDragging = true;
        offset = touchCoordinates(event);
    };

    const onMouseMove: JSX.EventHandlerUnion<HTMLDivElement, MouseEvent> = event => {
        event.preventDefault();
        if (isDragging) handleMove(mouseCoordinates(event));
    };

    const onTouchMove: JSX.EventHandlerUnion<HTMLDivElement, TouchEvent> = event => {
        event.preventDefault();
        if (isDragging) handleMove(touchCoordinates(event));
    };

    const onDragEnd: JSX.EventHandlerUnion<HTMLDivElement, MouseEvent | TouchEvent> = event => {
        event.preventDefault();
        if (isDragging) {
            release();
        }
    };

    const element = (
        <div
            ref={props.ref}
            class={`${!isDragging && 'transition-all'} ` + props.class}
            style={style()}
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
    if (props.apiRef) {
        const oldCallback = props.apiRef.bringBack;

        props.apiRef.bringBack = async () => {
            if (oldCallback) oldCallback();
            await snapBack();
        };
    }

    return { element, ref: props.ref, apiRef };
};

export default createSwipeCard;
