import type { Meta } from '@storybook/react';

import { Indicator, IndicatorItem } from './Indicator';
import { Badge } from '../Badge';
import type { IndicatorHorizontal, IndicatorVertical } from './types';

const meta = {
  title: 'Components/Indicator',
  component: Indicator,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional CSS classes for the indicator container',
    },
  },
} satisfies Meta<typeof Indicator>;

export default meta;

// Type for Playground story args
interface PlaygroundArgs {
  horizontal: IndicatorHorizontal;
  vertical: IndicatorVertical;
  indicatorClassName: string;
  indicatorItemClassName: string;
}

export const Default = {
  argTypes: {
    horizontal: {
      control: 'select',
      options: ['start', 'center', 'end'] as IndicatorHorizontal[],
      description: 'Horizontal position of the indicator item',
      defaultValue: 'end',
    },
    vertical: {
      control: 'select',
      options: ['top', 'middle', 'bottom'] as IndicatorVertical[],
      description: 'Vertical position of the indicator item',
      defaultValue: 'top',
    },
    indicatorClassName: {
      control: 'text',
      description: 'Additional CSS classes for the indicator container',
    },
    indicatorItemClassName: {
      control: 'text',
      description: 'Additional CSS classes for the indicator item',
    },
  },
  args: {
    horizontal: 'end' as IndicatorHorizontal,
    vertical: 'top' as IndicatorVertical,
  },
  render: (args: PlaygroundArgs) => (
    <Indicator className={args.indicatorClassName}>
      <IndicatorItem horizontal={args.horizontal} vertical={args.vertical}>
        <Badge variant='primary'>New</Badge>
      </IndicatorItem>
      <div className='grid h-32 w-32 place-items-center rounded-lg bg-base-300'>
        Content
      </div>
    </Indicator>
  ),
};
