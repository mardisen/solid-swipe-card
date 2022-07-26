import { SwipeCard } from '../../src';
import './index.css';

export default {
    title: 'SwipeCard/SwipeCard',
    component: SwipeCard
};

const BaseCard = (args) => (
    <SwipeCard
        class="relative h-24 w-24 justify-center m-auto flex items-center bg-gradient-to-br from-pink-500 to-sky-500 shadow-md rounded text-white"
        children={args.children ? args.children : args.text}
        {...args}
    />
);

const Template = (args) => (
    <>
        <BaseCard {...args} />
    </>
);

const SnapBackTemplate = (args) => {
    let apiRef: any = {};
    return (
        <div class="flex items-center flex-col">
            <BaseCard {...args} apiRef={apiRef} />
            <button
                class="bg-gradient-to-br from-emerald-500 to-indigo-400 shadow-md rounded-lg p-2 my-4 text-white"
                onClick={apiRef.snapBack}
            >
                {args.snapBackText}
            </button>
        </div>
    );
};

export const Simple = Template.bind({});
Simple.args = {
    text: 'Swipe me!'
};

export const SnapBack = SnapBackTemplate.bind({});
SnapBack.args = {
    text: 'Swipe me!',
    snapBackText: 'Bring it back!'
};
