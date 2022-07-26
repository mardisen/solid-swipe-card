import { SwipeCard } from '../../src';
import './index.css';

export default {
    title: 'SwipeCard/SwipeCard',
    component: SwipeCard
};

const Template = (args) => (
    <>
        <SwipeCard {...args} />
    </>
);

export const Simple = Template.bind({});
Simple.args = {
    class: 'relative h-24 w-24 justify-center m-auto flex items-center bg-slate-400 rounded',
    children: 'Swipe me!'
};
