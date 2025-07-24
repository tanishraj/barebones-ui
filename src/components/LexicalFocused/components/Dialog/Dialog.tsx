import './Dialog.css';

import { ReactNode } from 'react';

type Props = Readonly<{
  'data-test-id'?: string;
  children: ReactNode;
}>;

export const DialogButtonsList = ({ children }: Props): JSX.Element => {
  return <div className='DialogButtonsList'>{children}</div>;
};

export const DialogActions = ({
  'data-test-id': dataTestId,
  children,
}: Props): JSX.Element => {
  return (
    <div className='DialogActions' data-test-id={dataTestId}>
      {children}
    </div>
  );
};
