import { ButtonProps } from '@/components/Button';

export const getSelectedBtnProps = (isSelected: boolean) =>
  isSelected
    ? {
        variant: 'primary' as ButtonProps['variant'],
      }
    : { variant: 'ghost' as ButtonProps['variant'] };
