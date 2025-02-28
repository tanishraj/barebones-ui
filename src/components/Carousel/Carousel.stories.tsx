import { Meta, StoryObj } from '@storybook/react';

import { Carousel } from './Carousel';

const meta: Meta<typeof Carousel> = {
  title: 'Components/Carousel',
  component: Carousel,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Carousel>;

export const Default: Story = {
  render: args => <Carousel {...args} />,
  args: {
    items: [
      'https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp',
      'https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.webp',
      'https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.webp',
      'https://img.daisyui.com/images/stock/photo-1494253109108-2e30c049369b.webp',
      'https://img.daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.webp',
      'https://img.daisyui.com/images/stock/photo-1559181567-c3190ca9959b.webp',
      'https://img.daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.webp',
    ],
  },
};
