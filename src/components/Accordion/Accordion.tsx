import { useState } from 'react';
import { type VariantProps } from 'class-variance-authority';
import clsx from 'clsx';

import { accordionStyles } from './Accordion.styles';
import { AccordionItem } from './types';

export interface AccordionProps
  extends VariantProps<typeof accordionStyles>,
    React.HTMLAttributes<HTMLDivElement> {
  items: AccordionItem[];
  defaultOpenIndex?: number;
}

export const Accordion = ({
  items,
  bordered,
  iconStyle,
  className,
  defaultOpenIndex,
}: AccordionProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(
    defaultOpenIndex ?? null,
  );

  return (
    <div className={clsx('join join-vertical w-full', className)}>
      {items.map((item, index) => (
        <div
          key={index}
          className={accordionStyles({ bordered, iconStyle, className })}
        >
          <input
            type='radio'
            name='accordion'
            checked={openIndex === index}
            onChange={() => setOpenIndex(index)}
          />
          <div className='collapse-title text-xl font-medium'>{item.title}</div>
          <div className='collapse-content'>
            <div className='pt-2'>{item.content}</div>
          </div>
        </div>
      ))}
    </div>
  );
};
