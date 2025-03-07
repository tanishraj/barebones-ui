import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { createRef } from 'react';

import { List, ListRow, ListCol } from './List';

describe('List Components', () => {
  describe('List', () => {
    it('should render a ul element with correct classes', () => {
      render(<List data-testid='list' />);
      const list = screen.getByTestId('list');
      expect(list).toBeInTheDocument();
      expect(list.tagName).toBe('UL');
      expect(list).toHaveClass('list bg-base-100 rounded-box shadow-md');
    });

    it('should merge custom className', () => {
      render(<List data-testid='list' className='custom-class' />);
      const list = screen.getByTestId('list');
      expect(list).toHaveClass(
        'list bg-base-100 rounded-box shadow-md custom-class',
      );
    });

    it('should render children', () => {
      render(
        <List>
          <span data-testid='child'>Test</span>
        </List>,
      );
      expect(screen.getByTestId('child')).toBeInTheDocument();
    });

    it('should forward ref', () => {
      const ref = createRef<HTMLUListElement>();
      render(<List ref={ref} data-testid='list' />);
      expect(ref.current).toBe(screen.getByTestId('list'));
    });
  });

  describe('ListRow', () => {
    it('should render a li element with correct classes', () => {
      render(<ListRow data-testid='row' />);
      const row = screen.getByTestId('row');
      expect(row).toBeInTheDocument();
      expect(row.tagName).toBe('LI');
      expect(row).toHaveClass('list-row');
    });

    it('should merge custom className', () => {
      render(<ListRow data-testid='row' className='custom-row' />);
      const row = screen.getByTestId('row');
      expect(row).toHaveClass('list-row custom-row');
    });

    it('should render children', () => {
      render(
        <ListRow>
          <span data-testid='child'>Test</span>
        </ListRow>,
      );
      expect(screen.getByTestId('child')).toBeInTheDocument();
    });

    it('should forward ref', () => {
      const ref = createRef<HTMLLIElement>();
      render(<ListRow ref={ref} data-testid='row' />);
      expect(ref.current).toBe(screen.getByTestId('row'));
    });
  });

  describe('ListCol', () => {
    it('should render a div element with correct base classes', () => {
      render(<ListCol data-testid='col' />);
      const col = screen.getByTestId('col');
      expect(col).toBeInTheDocument();
      expect(col.tagName).toBe('DIV');
    });

    it('should apply wrap class when wrap prop is true', () => {
      render(<ListCol wrap data-testid='col' />);
      expect(screen.getByTestId('col')).toHaveClass('list-col-wrap');
    });

    it('should apply grow class when grow prop is true', () => {
      render(<ListCol grow data-testid='col' />);
      expect(screen.getByTestId('col')).toHaveClass('list-col-grow');
    });

    it('should merge custom className', () => {
      render(<ListCol className='custom-col' data-testid='col' />);
      expect(screen.getByTestId('col')).toHaveClass('custom-col');
    });

    it('should combine variant classes with custom className', () => {
      render(<ListCol wrap grow className='custom-col' data-testid='col' />);
      const col = screen.getByTestId('col');
      expect(col).toHaveClass('list-col-wrap');
      expect(col).toHaveClass('list-col-grow');
      expect(col).toHaveClass('custom-col');
    });

    it('should render children', () => {
      render(
        <ListCol>
          <span data-testid='child'>Test</span>
        </ListCol>,
      );
      expect(screen.getByTestId('child')).toBeInTheDocument();
    });

    it('should forward ref', () => {
      const ref = createRef<HTMLDivElement>();
      render(<ListCol ref={ref} data-testid='col' />);
      expect(ref.current).toBe(screen.getByTestId('col'));
    });
  });

  describe('Compound Components', () => {
    it('should have Row attached to List', () => {
      expect(List.Row).toBe(ListRow);
    });

    it('should have Col attached to List', () => {
      expect(List.Col).toBe(ListCol);
    });
  });

  describe('Display Names', () => {
    it('should have proper display names', () => {
      expect(List.displayName).toBe('List');
      expect(ListRow.displayName).toBe('ListRow');
      expect(ListCol.displayName).toBe('ListCol');
    });
  });
});
