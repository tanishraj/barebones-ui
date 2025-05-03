import { VariantProps } from 'class-variance-authority';

import { checkboxStyles } from './Checkbox.styles';

export type CheckboxSize = VariantProps<typeof checkboxStyles>['size'];
export type CheckboxVariant = VariantProps<typeof checkboxStyles>['variant'];
