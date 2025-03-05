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
    <Difference {...args}>
      <img
        alt='daisy'
        src='https://img.daisyui.com/images/stock/photo-1560717789-0ac7c58ac90a.webp'
      />
      <img
        alt='daisy'
        src='https://img.daisyui.com/images/stock/photo-1560717789-0ac7c58ac90a-blur.webp'
      />
    </Difference>
  );
};
