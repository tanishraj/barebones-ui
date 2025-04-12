import { VariantProps } from 'class-variance-authority';

import { tableStyles } from './Table.styles';

export type TableSize = VariantProps<typeof tableStyles>['size'];
