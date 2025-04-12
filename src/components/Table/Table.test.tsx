import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { createRef } from 'react';

import { Table } from './Table';

describe('Table Component', () => {
  it('renders a table with default classes', () => {
    render(<Table />);
    const table = screen.getByRole('table');
    expect(table).toHaveClass('table');
  });

  it('applies size variants correctly', () => {
    const { rerender } = render(<Table size='sm' />);
    expect(screen.getByRole('table')).toHaveClass('table-sm');

    rerender(<Table size='lg' />);
    expect(screen.getByRole('table')).toHaveClass('table-lg');
  });

  it('applies layout and style variants', () => {
    render(<Table pinRows pinColumns zebra />);
    const table = screen.getByRole('table');
    expect(table).toHaveClass(
      'table-pin-rows',
      'table-pin-cols',
      'table-zebra',
    );
  });

  it('merges custom class names', () => {
    render(<Table className='custom-table' />);
    expect(screen.getByRole('table')).toHaveClass('custom-table');
  });

  it('forwards ref to table element', () => {
    const ref = createRef<HTMLTableElement>();
    render(<Table ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLTableElement);
  });
});

describe('Table Subcomponents', () => {
  describe('Table.Head', () => {
    it('renders with hover styling and custom class', () => {
      const { container } = render(
        <table>
          <Table.Head className='custom-head' />
        </table>,
      );
      const thead = container.querySelector('thead');
      expect(thead).toHaveClass('[&>tr]:hover:bg-base-200', 'custom-head');
    });

    it('forwards ref', () => {
      const ref = createRef<HTMLTableSectionElement>();
      render(
        <table>
          <Table.Head ref={ref} />
        </table>,
      );
      expect(ref.current?.tagName).toBe('THEAD');
    });
  });

  describe('Table.Body', () => {
    it('renders with hover styling and custom class', () => {
      const { container } = render(
        <table>
          <Table.Body className='custom-body' />
        </table>,
      );
      const tbody = container.querySelector('tbody');
      expect(tbody).toHaveClass('[&>tr:hover]:bg-base-200', 'custom-body');
    });

    it('forwards ref', () => {
      const ref = createRef<HTMLTableSectionElement>();
      render(
        <table>
          <Table.Body ref={ref} />
        </table>,
      );
      expect(ref.current?.tagName).toBe('TBODY');
    });
  });

  describe('Table.Row', () => {
    it('applies active and hover states', () => {
      const { container } = render(
        <table>
          <tbody>
            <Table.Row active hover={false} className='custom-row' />
          </tbody>
        </table>,
      );
      const tr = container.querySelector('tr');
      expect(tr).toHaveClass('bg-base-200', 'custom-row');
      expect(tr).not.toHaveClass('hover:bg-base-200');
    });

    it('forwards ref', () => {
      const ref = createRef<HTMLTableRowElement>();
      render(
        <table>
          <tbody>
            <Table.Row ref={ref} />
          </tbody>
        </table>,
      );
      expect(ref.current?.tagName).toBe('TR');
    });
  });

  describe('Table.HeaderCell', () => {
    it('renders with action alignment and custom class', () => {
      const { container } = render(
        <table>
          <thead>
            <tr>
              <Table.HeaderCell action className='custom-header' />
            </tr>
          </thead>
        </table>,
      );
      const th = container.querySelector('th');
      expect(th).toHaveClass(
        'text-right',
        'pr-6',
        'bg-base-200',
        'custom-header',
      );
    });

    it('forwards ref', () => {
      const ref = createRef<HTMLTableCellElement>();
      render(
        <table>
          <thead>
            <tr>
              <Table.HeaderCell ref={ref} />
            </tr>
          </thead>
        </table>,
      );
      expect(ref.current?.tagName).toBe('TH');
    });
  });

  describe('Table.Cell', () => {
    it('renders with action alignment and custom class', () => {
      const { container } = render(
        <table>
          <tbody>
            <tr>
              <Table.Cell action className='custom-cell' />
            </tr>
          </tbody>
        </table>,
      );
      const td = container.querySelector('td');
      expect(td).toHaveClass('text-right', 'pr-6', 'custom-cell');
    });

    it('forwards ref', () => {
      const ref = createRef<HTMLTableCellElement>();
      render(
        <table>
          <tbody>
            <tr>
              <Table.Cell ref={ref} />
            </tr>
          </tbody>
        </table>,
      );
      expect(ref.current?.tagName).toBe('TD');
    });
  });
});
