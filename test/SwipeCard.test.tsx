import { render, fireEvent } from 'solid-testing-library';

import { SwipeCard, SwipeCardRef } from '../src';

describe('SwipeCard', () => {
    it('renders a div', () => {
        const { getByTestId, unmount } = render(() => <SwipeCard id="test-id" />);
        expect(getByTestId('test-id')).toBeInTheDocument();
        unmount();
    });

    it('can be grabbed', async () => {
        const apiRef: SwipeCardRef = {};
        const { getByTestId, unmount } = render(() => <SwipeCard id="test-id" apiRef={apiRef} />);
        const element = getByTestId('test-id') as HTMLElement;

        fireEvent.mouseDown(element);
        fireEvent.mouseMove(element, {clientX: 0, clientY:0});
        fireEvent.mouseUp(element);

        expect(apiRef.isReleased()).toBeFalsy();
        unmount();
    });

    it('can be swiped', async () => {
        const apiRef: SwipeCardRef = {};
        const { getByTestId, unmount } = render(() => <SwipeCard id="test-id" apiRef={apiRef} />);
        const element = getByTestId('test-id') as HTMLElement;

        fireEvent.mouseDown(element);
        fireEvent.mouseMove(element, {clientX: 300, clientY:0});
        fireEvent.mouseUp(element);

        expect(apiRef.isReleased()).toBeTruthy();
        unmount();
    });
});
