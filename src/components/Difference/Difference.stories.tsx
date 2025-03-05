import { Meta, StoryFn } from '@storybook/react';

import { Difference } from './Difference';

const meta: Meta = {
  title: 'Components/Difference',
  component: Difference,
  tags: ['autodocs'],
  argTypes: {},
  args: {},
};

export default meta;

export const Default: StoryFn = args => {
  return (
    <Difference className='aspect-16/9 h-96' {...args}>
      <img
        alt='daisy'
        src='https://img.daisyui.com/images/stock/photo-1560717789-0ac7c58ac90a-blur.webp'
      />
      <img
        alt='daisy'
        src='https://img.daisyui.com/images/stock/photo-1560717789-0ac7c58ac90a.webp'
      />
    </Difference>
  );
};

export const TextDiff: StoryFn = args => {
  return (
    <Difference className='aspect-16/9 h-96' {...args}>
      <div className='grid place-content-center bg-primary text-9xl font-black text-primary-content'>
        TANISH
      </div>
      <div className='grid place-content-center bg-base-200 text-9xl font-black'>
        TANISH
      </div>
    </Difference>
  );
};
