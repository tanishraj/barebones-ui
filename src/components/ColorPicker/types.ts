import { type VariantProps } from 'class-variance-authority';

import { colorPickerStyles } from './ColorPicker.styles';

export type ColorPickerSize = VariantProps<typeof colorPickerStyles>['size'];
