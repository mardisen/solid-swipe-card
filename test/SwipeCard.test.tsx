import { render, fireEvent } from 'solid-testing-library';

import { SwipeCard } from '../src';

describe('SwipeCard', () => {
    it('renders a div', () => {
        const { getByTestId, unmount } = render(() => <SwipeCard id="test-id" />);
        expect(getByTestId('test-id')).toBeInTheDocument();
        unmount();
    });

    it('can be grabbed', () => {
        const { getByTestId, unmount } = render(() => <SwipeCard id="test-id" />);
        const element = getByTestId('test-id') as HTMLElement;

        const initialPosition = {
            x: element.getBoundingClientRect().left,
            y: element.getBoundingClientRect().top
        };
        fireEvent.mouseDown(element);
        fireEvent.mouseUp(element);
        const finalPosition = {
            x: element.getBoundingClientRect().left,
            y: element.getBoundingClientRect().top
        };

        expect(initialPosition).toEqual(finalPosition);
        unmount();
    });
});
