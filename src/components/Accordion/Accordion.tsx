import { useState } from 'react';
import { type VariantProps } from 'class-variance-authority';
import clsx from 'clsx';

import {
  accordionContainerStyles,
  accordionStyles,
  titleStyles,
} from './Accordion.styles';
import { AccordionItem } from './types';

export interface AccordionProps
  extends VariantProps<typeof accordionStyles>,
    VariantProps<typeof titleStyles>,
    React.HTMLAttributes<HTMLDivElement> {
  name: string;
  items: AccordionItem[];
  defaultOpenIndex?: number;
  expandAll?: boolean;
  merged?: boolean;
}

export const Accordion = ({
  name,
  items,
  bordered,
  iconStyle,
  defaultOpenIndex,
  expandAll,
  size,
  merged,
}: AccordionProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(
    defaultOpenIndex ?? null,
  );

  const containerClassName = accordionContainerStyles({ merged });
  const accordionClassName = accordionStyles({
    bordered,
    iconStyle,
    merged,
  });

  return (
    <div className={containerClassName}>
      {items.map((item, index) => (
        <div className={accordionClassName}>
          <input
            type='radio'
            name={expandAll ? '' : name}
            defaultChecked={expandAll || index === openIndex}
            onChange={() => setOpenIndex(index)}
          />
          <div
            className={clsx(
              'collapse-title text-lg font-bold',
              titleStyles({ size }),
            )}
          >
            {item.title}
          </div>
          <div className='collapse-content'>{item.content}</div>
        </div>
      ))}
    </div>
  );
};
