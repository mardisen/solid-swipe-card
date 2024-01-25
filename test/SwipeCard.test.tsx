import { render, fireEvent } from '@solidjs/testing-library';

import { SwipeCard, SwipeCardRef } from '../src';

describe('SwipeCard', () => {
    describe('Basic', () => {
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

            expect(apiRef.swiped()).toBeFalsy();
            unmount();
        });

        it('can be grabbed (touch)', async () => {
            const apiRef: SwipeCardRef = {};
            const { getByTestId, unmount } = render(() => <SwipeCard id="test-id" apiRef={apiRef} />);
            const element = getByTestId('test-id') as HTMLElement;

            fireEvent.touchStart(element, { touches: [{ clientX: 0, clientY: 0 }] });
            fireEvent.touchMove(element, { touches: [{ clientX: 0, clientY: 0 }] });
            fireEvent.touchEnd(element);

            expect(apiRef.swiped()).toBeFalsy();
            unmount();
        });

        it('can be swiped', async () => {
            const apiRef: SwipeCardRef = {};
            const { getByTestId, unmount } = render(() => <SwipeCard id="test-id" apiRef={apiRef} />);
            const element = getByTestId('test-id') as HTMLElement;

            fireEvent.mouseDown(element, { clientX: 0, clientY: 0 });
            fireEvent.mouseMove(element, { clientX: 300, clientY: 0 });
            fireEvent.mouseUp(element);

            expect(apiRef.swiped()).toBeTruthy();
            unmount();
        });

        it('can be swiped (touch)', async () => {
            const apiRef: SwipeCardRef = {};
            const { getByTestId, unmount } = render(() => <SwipeCard id="test-id" apiRef={apiRef} />);
            const element = getByTestId('test-id') as HTMLElement;

            fireEvent.touchStart(element, { touches: [{ clientX: 0, clientY: 0 }] });
            fireEvent.touchMove(element, { touches: [{ clientX: 300, clientY: 0 }] });
            fireEvent.touchEnd(element);

            expect(apiRef.swiped()).toBeTruthy();
            unmount();
        });

        it("doesn't move if it isn't grabbed", async () => {
            const apiRef: SwipeCardRef = {};
            const { getByTestId, unmount } = render(() => <SwipeCard id="test-id" apiRef={apiRef} />);
            const element = getByTestId('test-id') as HTMLElement;

            fireEvent.mouseMove(element, { clientX: 300, clientY: 0 });
            fireEvent.mouseUp(element);

            expect(apiRef.swiped()).toBeFalsy();
            unmount();
        });

        it("doesn't move if it isn't grabbed (touch)", async () => {
            const apiRef: SwipeCardRef = {};
            const { getByTestId, unmount } = render(() => <SwipeCard id="test-id" apiRef={apiRef} />);
            const element = getByTestId('test-id') as HTMLElement;

            fireEvent.touchMove(element, { touches: [{ clientX: 300, clientY: 0 }] });
            fireEvent.touchEnd(element);

            expect(apiRef.swiped()).toBeFalsy();
            unmount();
        });

        it('will release at minSpeed speed', async () => {
            const apiRef: SwipeCardRef = {};
            const { getByTestId, unmount } = render(() => <SwipeCard id="test-id" apiRef={apiRef} minSpeed={3000} />);
            const element = getByTestId('test-id') as HTMLElement;

            fireEvent.mouseDown(element, { clientX: 0, clientY: 0 });
            await new Promise((resolve) => setTimeout(resolve, 500));
            fireEvent.mouseMove(element, { clientX: 300, clientY: 0 });
            fireEvent.mouseUp(element);

            expect(apiRef.swiped()).toBeTruthy();
            unmount();
        });

        it("can't be grabbed if it has been swiped", async () => {
            const mockCallback = jest.fn();
            const apiRef: SwipeCardRef = {};
            const { getByTestId, unmount } = render(() => (
                <SwipeCard id="test-id" apiRef={apiRef} onSwipe={mockCallback} />
            ));
            const element = getByTestId('test-id') as HTMLElement;

            apiRef.swipe('right');

            expect(apiRef.swiped()).toBeTruthy();
            expect(mockCallback).toBeCalledTimes(1);

            fireEvent.mouseDown(element);
            fireEvent.mouseMove(element, { clientX: 300, clientY: 0 });
            fireEvent.mouseUp(element);

            expect(apiRef.swiped()).toBeTruthy();
            expect(mockCallback).toBeCalledTimes(1);

            fireEvent.touchStart(element, { touches: [{ clientX: 0, clientY: 0 }] });
            fireEvent.touchMove(element, { touches: [{ clientX: 300, clientY: 0 }] });
            fireEvent.touchEnd(element);

            expect(apiRef.swiped()).toBeTruthy();
            expect(mockCallback).toBeCalledTimes(1);
            unmount();
        });
    });

    describe('Callbacks', () => {
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

            expect(apiRef.swiped()).toBeTruthy();
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

            expect(apiRef.swiped()).toBeTruthy();

            await apiRef.snapBack();
            expect(apiRef.swiped()).toBeFalsy();
            expect(mockCallback).toBeCalled();
            unmount();
        });
    });

    describe('APIRef', () => {
        describe('snapBack()', () => {
            it('can be snapped back', async () => {
                const apiRef: SwipeCardRef = {};
                const { getByTestId, unmount } = render(() => <SwipeCard id="test-id" apiRef={apiRef} />);
                const element = getByTestId('test-id') as HTMLElement;

                fireEvent.mouseDown(element, { clientX: 0, clientY: 0 });
                fireEvent.mouseMove(element, { clientX: 300, clientY: 0 });
                fireEvent.mouseUp(element);

                expect(apiRef.swiped()).toBeTruthy();

                await apiRef.snapBack();
                expect(apiRef.swiped()).toBeFalsy();
                unmount();
            });

            it("doesn't snap back if it has not been swiped", async () => {
                const apiRef: SwipeCardRef = {};
                const { getByTestId, unmount } = render(() => <SwipeCard id="test-id" apiRef={apiRef} />);
                const element = getByTestId('test-id') as HTMLElement;

                fireEvent.mouseDown(element, { clientX: 0, clientY: 0 });
                await new Promise((resolve) => setTimeout(resolve, 500));
                fireEvent.mouseMove(element, { clientX: 0, clientY: 0 });
                fireEvent.mouseUp(element);

                expect(apiRef.swiped()).toBeFalsy();

                await apiRef.snapBack();
                expect(apiRef.swiped()).toBeFalsy();
                unmount();
            });
        });

        describe('swipe()', () => {
            it('swipe from apiRef `swipe()` call', async () => {
                const apiRef: SwipeCardRef = {};
                const { unmount } = render(() => <SwipeCard id="test-id" apiRef={apiRef} />);

                apiRef.swipe('left');

                expect(apiRef.swiped()).toBeTruthy();
                unmount();
            });

            it('swipe from apiRef `swipe()` call using custom velocity', async () => {
                const apiRef: SwipeCardRef = {};
                const { unmount } = render(() => <SwipeCard id="test-id" apiRef={apiRef} />);

                apiRef.swipe('left', 500);

                expect(apiRef.swiped()).toBeTruthy();
                unmount();
            });

            it('swipe from apiRef `swipe()` call using `minSpeed` as fallBack', async () => {
                const apiRef: SwipeCardRef = {};
                const { unmount } = render(() => <SwipeCard id="test-id" apiRef={apiRef} minSpeed={3000} />);

                apiRef.swipe('left');

                expect(apiRef.swiped()).toBeTruthy();
                unmount();
            });

            it("won't swipe from apiRef `swipe()` call if `swiped()` is true", async () => {
                const mockCallback = jest.fn();
                const apiRef: SwipeCardRef = {};
                const { unmount } = render(() => (
                    <SwipeCard id="test-id" onSwipe={mockCallback} apiRef={apiRef} minSpeed={3000} />
                ));

                await apiRef.swipe('left');
                expect(apiRef.swiped()).toBeTruthy();

                await apiRef.swipe('left');
                expect(mockCallback).toBeCalledTimes(1);
                unmount();
            });

            it('`swipe()` can swipe in multiple directions', async () => {
                const apiRef: SwipeCardRef = {};
                const { unmount } = render(() => <SwipeCard id="test-id" apiRef={apiRef} minSpeed={3000} />);

                apiRef.swipe('left');

                expect(apiRef.swiped()).toBeTruthy();

                await apiRef.snapBack();
                apiRef.swipe('right');

                expect(apiRef.swiped()).toBeTruthy();

                await apiRef.snapBack();
                apiRef.swipe('up');

                expect(apiRef.swiped()).toBeTruthy();

                await apiRef.snapBack();
                apiRef.swipe('down');

                expect(apiRef.swiped()).toBeTruthy();
                unmount();
            });
        });
    });
});
