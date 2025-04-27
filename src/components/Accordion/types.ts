import { VariantProps } from 'class-variance-authority';

import { accordionStyles, bgStyles, titleStyles } from './Accordion.styles';

export interface AccordionItem {
  title: string;
  content: React.ReactNode;
}

export type AccordionTitleSize = NonNullable<
  VariantProps<typeof titleStyles>['size']
>;
export type AccordionVariant = NonNullable<
  VariantProps<typeof bgStyles>['variant']
>;
export type AccordionIconStyle = NonNullable<
  VariantProps<typeof accordionStyles>['iconStyle']
>;
