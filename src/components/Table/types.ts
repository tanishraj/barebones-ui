import { VariantProps } from 'class-variance-authority';

import { tableStyles } from './Table.styles';

export type TableSize = NonNullable<VariantProps<typeof tableStyles>['size']>;
