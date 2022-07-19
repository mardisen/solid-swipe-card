# SolidJS Swipe Card

A SolidJS swipeable card component (tinder-like) heavily inspired by [react-tinder-card](https://github.com/3DJakob/react-tinder-card).

Bootstrapped using [tsdx](https://github.com/jaredpalmer/tsdx).

## Installing

To install, run

```bash
npm install solidjs-swipe-card
# or
yarn add solidjs-swipe-card
```

## Quick Start

```jsx
import { SwipeCard } from 'solidjs-swipe-card';

const App = () => {
    return (
        <div>
            <SwipeCard class="...">
                <div>I'm a Swipe Card!</div>
            </SwipeCard>
        </div>
    );
};
```

## Props

Both `createSwipeCard` and `SwipeCard` use the same prop structure, defined as follows:

### `class`

-   optional
-   type: `string`

Additional CSS class(es) to assign to the component.

### `threshold`

-   optional
-   type:`number`
-   default: `300`

The threshold for considering wether or not a card is swiped. It is based on the speed of which the component moves (px/s). A lower number will make it easier to register a swipe, a higher one will make it harder.

### `rotationMultiplier`

-   optional
-   type: `number`
-   default: 7.5

The coefficient of the rotation. A lower number will make it rotate less, a higher one more.

### `maxRotation`

-   optional
-   type: `number`
-   default: 90

The maximum rotation degrees (ranging from `-maxRotation/2` to `+maxRotation/2`) to add when releasing a card.

### `bounce`

-   optional
-   type: `number`
-   default: 0.1

The bounce power of which the card will sway back before returning to its original position when [`bringBack`](#bringback) is called.

Keep it between -0.5 and 0.5 to avoid the card flinging on the other side of the screen.

### `snapBackDuration`

-   optional
-   type: `number`
-   default: 300

The duration of the animation (in ms) triggered by [`bringBack`](#bringback).

### `onSwipe`

-   optional
-   type: `(direction: SwipeDirection) => void`
-   default: `() => {}`

The callback to invoke after the card has registered a swipe (before it has finished animating).

### `apiRef`

-   optional
-   type: `SwipeCardRef`

The reference to access the methods of the card. See [apiRef](#apiref-1) for the available methods.

> NOTE: Currently, to pass it in typescript, you'd need to declare the apiRef as follows: `const swipeCardRef: SwipeCardRef = {};`

### `ref`

-   optional
-   type: `any`

The ref variable that will be forwarded directly to the card component.

## createSwipeCard

```js
import { createSwipeCard } from 'solidjs-swipe-card';
const { element, ref, apiRef } = createSwipeCard(props);
```

This primitive returns 3 objects:

### `element`

The rendered solid-js component, ready for use.

### `ref`

The ref that attaches directly to the component.

### `apiRef`

`apiRef` exposes utility methods to control the behaviour of the card.

Currently, the available methods are:

#### `snapBack()`

-   Returns `Promise<void>`

It will reset to the original position the card if it has been swiped. Since it is async, it can be awaited if needed. 

## SwipeCard

Under the hood, SwipeCard uses `createSwipeCard`, passing its props and returning the element.

```jsx
import { SwipeCard } from 'solidjs-swipe-card';
let ref;
let apiRef;
//...
<SwipeCard class="..." ref={ref} apiRef={apiRef}>
    <div>I'm a Swipe Card!</div>
</SwipeCard>;
//...
```

## Contributing

TODO

## Additional Notes

This is my first library that I'm writing, I'm open to constructive criticism about the repo structure, code quality and design choices.
