import { VariantProps } from 'class-variance-authority';

import { breadcrumbVariants } from './Breadcrumbs.styles';

export type BreadcrumbsSizes = VariantProps<typeof breadcrumbVariants>['size'];
