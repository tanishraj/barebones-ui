import { type VariantProps } from 'class-variance-authority';
import { clsx } from 'clsx';
import { ComponentProps, ReactNode } from 'react';

import { stepsContainerStyles, stepItemStyles } from './Stepper.styles';

type StepsProps = VariantProps<typeof stepsContainerStyles> & {
  scrollable?: boolean;
  children: ReactNode;
  className?: string;
};

export const Stepper = ({
  direction = 'horizontal',
  scrollable = false,
  responsive,
  children,
  className,
}: StepsProps) => {
  console.log(direction);
  const containerClasses = clsx(
    stepsContainerStyles({ direction, responsive }),
    className,
  );
  console.log(containerClasses);
  const content = <ul className={containerClasses}>{children}</ul>;

  return scrollable ? (
    <div className='overflow-x-auto'>{content}</div>
  ) : (
    content
  );
};

type StepProps = VariantProps<typeof stepItemStyles> &
  ComponentProps<'li'> & {
    dataContent?: string;
  };

export const StepperItem = ({
  variant,
  dataContent,
  children,
  className,
  ...props
}: StepProps) => {
  return (
    <li
      className={clsx(stepItemStyles({ variant }), className)}
      data-content={dataContent}
      {...props}
    >
      {children}
    </li>
  );
};
