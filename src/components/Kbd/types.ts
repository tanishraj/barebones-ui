import { VariantProps } from 'class-variance-authority';

import { kbdStyles } from './Kbd.styles';

export type KbdSize = VariantProps<typeof kbdStyles>['size'];
export type KbdStyleProps = VariantProps<typeof kbdStyles>;
