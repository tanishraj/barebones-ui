import { useState } from 'react';
import { type VariantProps } from 'class-variance-authority';
import clsx from 'clsx';

import { accordionContainerStyles, accordionStyles } from './Accordion.styles';
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

  const containerClassName = clsx(accordionContainerStyles, className);
  const accordionClassName = accordionStyles({
    bordered,
    iconStyle,
    className,
  });

  return (
    <div className={containerClassName}>
      {items.map((item, index) => (
        <div key={index} className={accordionClassName}>
          <input
            type='radio'
            name='accordion'
            checked={openIndex === index}
            onChange={() => setOpenIndex(index)}
          />
          <div className='collapse-title text-xl font-medium'>{item.title}</div>
          <div className='collapse-content'>
            <div>{item.content}</div>
          </div>
        </div>
      ))}
    </div>
  );
};
