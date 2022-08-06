import { render } from 'solid-testing-library';

import { SwipeCard } from '../src';

describe('SwipeCard', () => {
    it('renders a div', () => {
        const { getByTestId, unmount } = render(() => <SwipeCard />);
        expect(getByTestId('test-id')).toBeInTheDocument();
        unmount();
    });
});
