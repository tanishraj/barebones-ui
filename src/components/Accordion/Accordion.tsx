import { useState } from 'react';
import { type VariantProps } from 'class-variance-authority';
import clsx from 'clsx';

import {
  accordionContainerStyles,
  accordionStyles,
  bgStyles,
  borderStyles,
  titleStyles,
} from './Accordion.styles';
import { AccordionItem } from './types';

export interface AccordionProps
  extends VariantProps<typeof accordionStyles>,
    VariantProps<typeof titleStyles>,
    VariantProps<typeof borderStyles>,
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
  variant,
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
  const bgOrBordered = bordered
    ? borderStyles({ variant, bordered })
    : bgStyles({ variant });
  const accordionClassName = clsx(
    accordionStyles({
      iconStyle,
      merged,
    }),
    bgOrBordered,
  );
  const titleClassName = clsx(
    'collapse-title font-bold',
    titleStyles({ size }),
  );
  const contentClassName = clsx('collapse-content', titleStyles({ size }));

  return (
    <div className={containerClassName}>
      {items.map((item, index) => (
        <div className={accordionClassName}>
          {expandAll ? (
            <input
              type='checkbox'
              name={name}
              defaultChecked={expandAll || index === openIndex}
              onChange={() => setOpenIndex(index)}
              style={{ minHeight: '0' }}
            />
          ) : (
            <input
              type='radio'
              name={name}
              defaultChecked={expandAll || index === openIndex}
              onChange={() => setOpenIndex(index)}
              style={{ minHeight: '0' }}
            />
          )}
          <div className={titleClassName} style={{ minHeight: '0' }}>
            {item.title}
          </div>
          <div className={contentClassName}>{item.content}</div>
        </div>
      ))}
    </div>
  );
};
