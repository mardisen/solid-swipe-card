import { SwipeCard } from '../src';

export default {
    title: 'SwipeCard/Default',
    component: SwipeCard
};

const Template = args => <SwipeCard {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    class: 'z-10 relative h-24 w-24 justify-center m-auto flex items-center bg-slate-400 rounded'
};
