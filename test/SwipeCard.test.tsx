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

        fireEvent.mouseDown(element, { clientX: 0, clientY: 0 });
        fireEvent.mouseMove(element, { clientX: 0, clientY: 0 });
        fireEvent.mouseUp(element);

        expect(apiRef.hasSwiped()).toBeFalsy();
        unmount();
    });

    it('can be grabbed (touch)', async () => {
        const apiRef: SwipeCardRef = {};
        const { getByTestId, unmount } = render(() => <SwipeCard id="test-id" apiRef={apiRef} />);
        const element = getByTestId('test-id') as HTMLElement;

        fireEvent.touchStart(element, { touches: [{ clientX: 0, clientY: 0 }] });
        fireEvent.touchMove(element, { touches: [{ clientX: 0, clientY: 0 }] });
        fireEvent.touchEnd(element);

        expect(apiRef.hasSwiped()).toBeFalsy();
        unmount();
    });

    it('can be swiped', async () => {
        const apiRef: SwipeCardRef = {};
        const { getByTestId, unmount } = render(() => <SwipeCard id="test-id" apiRef={apiRef} />);
        const element = getByTestId('test-id') as HTMLElement;

        fireEvent.mouseDown(element, { clientX: 0, clientY: 0 });
        fireEvent.mouseMove(element, { clientX: 300, clientY: 0 });
        fireEvent.mouseUp(element);

        expect(apiRef.hasSwiped()).toBeTruthy();
        unmount();
    });

    it('can be swiped (touch)', async () => {
        const apiRef: SwipeCardRef = {};
        const { getByTestId, unmount } = render(() => <SwipeCard id="test-id" apiRef={apiRef} />);
        const element = getByTestId('test-id') as HTMLElement;

        fireEvent.touchStart(element, { touches: [{ clientX: 0, clientY: 0 }] });
        fireEvent.touchMove(element, { touches: [{ clientX: 300, clientY: 0 }] });
        fireEvent.touchEnd(element);

        expect(apiRef.hasSwiped()).toBeTruthy();
        unmount();
    });

    it('doesn\'t move if it isn\'t grabbed', async () => {
        const apiRef: SwipeCardRef = {};
        const { getByTestId, unmount } = render(() => <SwipeCard id="test-id" apiRef={apiRef} />);
        const element = getByTestId('test-id') as HTMLElement;

        fireEvent.mouseMove(element, { clientX: 300, clientY: 0 });
        fireEvent.mouseUp(element);

        expect(apiRef.hasSwiped()).toBeFalsy();
        unmount();
    });

    it('doesn\'t move if it isn\'t grabbed (touch)', async () => {
        const apiRef: SwipeCardRef = {};
        const { getByTestId, unmount } = render(() => <SwipeCard id="test-id" apiRef={apiRef} />);
        const element = getByTestId('test-id') as HTMLElement;

        fireEvent.touchMove(element, { touches: [{ clientX: 300, clientY: 0 }] });
        fireEvent.touchEnd(element);

        expect(apiRef.hasSwiped()).toBeFalsy();
        unmount();
    });

    it('can be snapped back', async () => {
        const apiRef: SwipeCardRef = {};
        const { getByTestId, unmount } = render(() => <SwipeCard id="test-id" apiRef={apiRef} />);
        const element = getByTestId('test-id') as HTMLElement;

        fireEvent.mouseDown(element, { clientX: 0, clientY: 0 });
        fireEvent.mouseMove(element, { clientX: 300, clientY: 0 });
        fireEvent.mouseUp(element);

        expect(apiRef.hasSwiped()).toBeTruthy();

        await apiRef.snapBack();
        expect(apiRef.hasSwiped()).toBeFalsy();
        unmount();
    });

    it('doesn\'t snap back if it has not been swiped', async () => {
        const apiRef: SwipeCardRef = {};
        const { getByTestId, unmount } = render(() => <SwipeCard id="test-id" apiRef={apiRef} />);
        const element = getByTestId('test-id') as HTMLElement;

        fireEvent.mouseDown(element, { clientX: 0, clientY: 0 });
        fireEvent.mouseMove(element, { clientX: 0, clientY: 0 });
        fireEvent.mouseUp(element);

        expect(apiRef.hasSwiped()).toBeFalsy();

        await apiRef.snapBack();
        expect(apiRef.hasSwiped()).toBeFalsy();
        unmount();
    });

    it('calls a callback on swipe', async () => {
        const mockCallback = jest.fn();
        const apiRef: SwipeCardRef = {};
        const { getByTestId, unmount } = render(() => (
            <SwipeCard id="test-id" apiRef={apiRef} onSwipe={mockCallback} />
        ));
        const element = getByTestId('test-id') as HTMLElement;

        fireEvent.mouseDown(element, { clientX: 0, clientY: 0 });
        fireEvent.mouseMove(element, { clientX: 300, clientY: 0 });
        fireEvent.mouseUp(element);

        expect(apiRef.hasSwiped()).toBeTruthy();
        expect(mockCallback).toBeCalled();
        unmount();
    });

    it('calls a callback on snap back', async () => {
        const mockCallback = jest.fn();
        const apiRef: SwipeCardRef = {};
        const { getByTestId, unmount } = render(() => (
            <SwipeCard id="test-id" apiRef={apiRef} onSnapBack={mockCallback} />
        ));
        const element = getByTestId('test-id') as HTMLElement;

        fireEvent.mouseDown(element, { clientX: 0, clientY: 0 });
        fireEvent.mouseMove(element, { clientX: 300, clientY: 0 });
        fireEvent.mouseUp(element);

        expect(apiRef.hasSwiped()).toBeTruthy();

        await apiRef.snapBack();
        expect(apiRef.hasSwiped()).toBeFalsy();
        expect(mockCallback).toBeCalled();
        unmount();
    });
});
