import { SwipeCard, SwipeCardProps } from '../../src';
import './index.css';

type SwipeCardArgs = SwipeCardProps & {
    text: string;
    snapBackText: string;
};

export default {
    title: 'SwipeCard/SwipeCard',
    component: SwipeCard,
    argTypes: {
        text: 'string'
    }
};

const BaseCard = (props: SwipeCardProps) => (
    <SwipeCard
        class="relative h-36 w-36 p-2 justify-center m-auto flex items-center bg-gradient-to-br from-pink-500 to-sky-500 shadow-md rounded text-white text-center"
        {...props}
    />
);

const Template = (args: SwipeCardArgs) => (
    <>
        <BaseCard {...args} children={args.text ? args.text : args.children} />
    </>
);

const SnapBackTemplate = (args: SwipeCardArgs) => {
    let apiRef: any = {};
    return (
        <div class="flex items-center flex-col">
            <BaseCard {...args} apiRef={apiRef} children={args.text ? args.text : args.children} />
            <button
                class="bg-gradient-to-br from-emerald-500 to-indigo-400 shadow-md rounded-lg p-2 my-4 text-white"
                onClick={apiRef.snapBack}
            >
                Bring it back!
            </button>
        </div>
    );
};

export const Index = SnapBackTemplate.bind({});
Index.args = {
    text: 'Swipe me!',
    threshold: 300,
    rotationMultiplier: 7.5,
    maxRotation: 90,
    snapBackDuration: 300,
    bouncePower: 0.1
};

export const Simple = Template.bind({});
Simple.args = {
    text: 'Swipe me!'
};

export const WithoutBounce = SnapBackTemplate.bind({});
WithoutBounce.args = {
    text: "I won't bounce when brought back!",
    bouncePower: 0
};

export const SlowReturn = SnapBackTemplate.bind({});
SlowReturn.args = {
    text: 'I take my time...',
    snapBackDuration: 4000
};

export const NoRotation = SnapBackTemplate.bind({});
NoRotation.args = {
    text: 'I refuse to rotate',
    rotationMultiplier: 0
};