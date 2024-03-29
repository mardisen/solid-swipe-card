import { SwipeCard, SwipeCardProps } from '../../src';
import './index.css';

type SwipeCardArgs = SwipeCardProps & {
    text: string;
    snapBackText: string;
    velocity?: number;
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
        class="flex relative justify-center items-center p-2 m-auto my-4 w-36 h-36 text-center text-white bg-gradient-to-br from-pink-500 to-sky-500 rounded shadow-md"
        {...props}
    />
);

const Template = (args: SwipeCardArgs) => (
    <div class="flex overflow-hidden flex-col items-center w-full h-svh">
        <BaseCard {...args} children={args.text ? args.text : args.children} />
    </div>
);

const SnapBackTemplate = (args: SwipeCardArgs) => {
    const apiRef: any = {};
    return (
        <div class="flex overflow-hidden flex-col items-center w-full h-svh">
            <BaseCard {...args} apiRef={apiRef} children={args.text ? args.text : args.children} />
            <button
                class="p-2 my-4 text-white bg-gradient-to-tr from-emerald-500 to-indigo-400 rounded shadow-md"
                onClick={apiRef.snapBack}
            >
                Bring it back!
            </button>
        </div>
    );
};

const SwipeTemplate = (args: SwipeCardArgs) => {
    const apiRef: any = {};
    return (
        <div class="flex overflow-hidden flex-col items-center w-full h-svh">
            <BaseCard {...args} apiRef={apiRef} children={args.text ? args.text : args.children} />
            <div class="flex flex-row space-x-2">
                <button
                    class="p-2 my-4 text-white bg-gradient-to-r from-emerald-500 to-indigo-400 rounded shadow-md"
                    onClick={() => apiRef.swipe('left', args.velocity)}
                >
                    Swipe Left
                </button>
                <button
                    class="p-2 my-4 text-white bg-gradient-to-r from-indigo-400 to-purple-500 rounded shadow-md"
                    onClick={() => apiRef.swipe('right', args.velocity)}
                >
                    Swipe Right
                </button>
                <button
                    class="p-2 my-4 text-white bg-gradient-to-r from-purple-500 to-rose-500 rounded shadow-md"
                    onClick={() => apiRef.swipe('up', args.velocity)}
                >
                    Swipe Up
                </button>
                <button
                    class="p-2 my-4 text-white bg-gradient-to-r from-rose-500 to-orange-500 rounded shadow-md"
                    onClick={() => apiRef.swipe('down', args.velocity)}
                >
                    Swipe Down
                </button>
            </div>
            <button
                class="p-2 my-4 text-white bg-gradient-to-tr from-emerald-500 to-indigo-400 rounded shadow-md"
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
    minSpeed: 0,
    rotationMultiplier: 7.5,
    maxRotation: 90,
    snapBackDuration: 300,
    smoothDuration: 40,
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
    rotationMultiplier: 0,
    maxRotation: 0
};

export const HighRotation = SnapBackTemplate.bind({});
HighRotation.args = {
    text: 'I spin like crazy',
    rotationMultiplier: 30,
    maxRotation: 1800
};

export const FastRelease = SnapBackTemplate.bind({});
FastRelease.args = {
    text: "I'm speed",
    minSpeed: 3000
};

export const Choppy = SnapBackTemplate.bind({});
Choppy.args = {
    text: 'I might be choppy on low refresh rates',
    smoothDuration: 0
};

export const SwipeFromAPIRef = SwipeTemplate.bind({});
SwipeFromAPIRef.args = {
    text: 'Swipe me!',
    velocity: 500
};
