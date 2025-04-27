import { VariantProps } from 'class-variance-authority';

import { breadcrumbVariants } from './Breadcrumbs.styles';

export type BreadcrumbsSizes = NonNullable<
  VariantProps<typeof breadcrumbVariants>['size']
>;
