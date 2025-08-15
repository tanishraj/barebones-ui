import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { Indicator, IndicatorItem } from './Indicator';

describe('Indicator', () => {
  it('renders without crashing', () => {
    render(
      <Indicator>
        <div>Content</div>
      </Indicator>,
    );
    const content = screen.getByText('Content');
    expect(content).toBeInTheDocument();
  });

  it('applies indicator class to container', () => {
    const { container } = render(
      <Indicator>
        <div>Content</div>
      </Indicator>,
    );
    const indicator = container.firstChild;
    expect(indicator).toHaveClass('indicator');
  });

  it('renders children correctly', () => {
    render(
      <Indicator>
        <IndicatorItem>Badge</IndicatorItem>
        <div>Main Content</div>
      </Indicator>,
    );
    expect(screen.getByText('Badge')).toBeInTheDocument();
    expect(screen.getByText('Main Content')).toBeInTheDocument();
  });

  it('applies custom className to Indicator', () => {
    const { container } = render(
      <Indicator className='custom-class'>
        <div>Content</div>
      </Indicator>,
    );
    const indicator = container.firstChild;
    expect(indicator).toHaveClass('indicator');
    expect(indicator).toHaveClass('custom-class');
  });

  describe('IndicatorItem', () => {
    it('renders without crashing', () => {
      render(<IndicatorItem>Item</IndicatorItem>);
      expect(screen.getByText('Item')).toBeInTheDocument();
    });

    it('applies default classes', () => {
      render(<IndicatorItem>Item</IndicatorItem>);
      const item = screen.getByText('Item');
      expect(item).toHaveClass('indicator-item');
      expect(item).toHaveClass('indicator-end');
      expect(item).toHaveClass('indicator-top');
    });

    it('applies horizontal position classes', () => {
      const { rerender } = render(
        <IndicatorItem horizontal='start'>Start</IndicatorItem>,
      );
      let item = screen.getByText('Start');
      expect(item).toHaveClass('indicator-start');
      expect(item).not.toHaveClass('indicator-center');
      expect(item).not.toHaveClass('indicator-end');

      rerender(<IndicatorItem horizontal='center'>Center</IndicatorItem>);
      item = screen.getByText('Center');
      expect(item).toHaveClass('indicator-center');
      expect(item).not.toHaveClass('indicator-start');
      expect(item).not.toHaveClass('indicator-end');

      rerender(<IndicatorItem horizontal='end'>End</IndicatorItem>);
      item = screen.getByText('End');
      expect(item).toHaveClass('indicator-end');
      expect(item).not.toHaveClass('indicator-start');
      expect(item).not.toHaveClass('indicator-center');
    });

    it('applies vertical position classes', () => {
      const { rerender } = render(
        <IndicatorItem vertical='top'>Top</IndicatorItem>,
      );
      let item = screen.getByText('Top');
      expect(item).toHaveClass('indicator-top');
      expect(item).not.toHaveClass('indicator-middle');
      expect(item).not.toHaveClass('indicator-bottom');

      rerender(<IndicatorItem vertical='middle'>Middle</IndicatorItem>);
      item = screen.getByText('Middle');
      expect(item).toHaveClass('indicator-middle');
      expect(item).not.toHaveClass('indicator-top');
      expect(item).not.toHaveClass('indicator-bottom');

      rerender(<IndicatorItem vertical='bottom'>Bottom</IndicatorItem>);
      item = screen.getByText('Bottom');
      expect(item).toHaveClass('indicator-bottom');
      expect(item).not.toHaveClass('indicator-top');
      expect(item).not.toHaveClass('indicator-middle');
    });

    it('combines horizontal and vertical positions', () => {
      render(
        <IndicatorItem horizontal='start' vertical='bottom'>
          Combined
        </IndicatorItem>,
      );
      const item = screen.getByText('Combined');
      expect(item).toHaveClass('indicator-item');
      expect(item).toHaveClass('indicator-start');
      expect(item).toHaveClass('indicator-bottom');
    });

    it('applies custom className to IndicatorItem', () => {
      render(
        <IndicatorItem className='custom-indicator-item'>Custom</IndicatorItem>,
      );
      const item = screen.getByText('Custom');
      expect(item).toHaveClass('indicator-item');
      expect(item).toHaveClass('custom-indicator-item');
    });

    it('renders as span element', () => {
      render(<IndicatorItem>Span Item</IndicatorItem>);
      const item = screen.getByText('Span Item');
      expect(item.tagName).toBe('SPAN');
    });

    it('can render without children', () => {
      const { container } = render(<IndicatorItem />);
      const item = container.querySelector('.indicator-item');
      expect(item).toBeInTheDocument();
      expect(item?.textContent).toBe('');
    });
  });

  describe('Integration', () => {
    it('renders multiple indicator items', () => {
      render(
        <Indicator>
          <IndicatorItem horizontal='start' vertical='top'>
            Top Left
          </IndicatorItem>
          <IndicatorItem horizontal='end' vertical='top'>
            Top Right
          </IndicatorItem>
          <IndicatorItem horizontal='center' vertical='bottom'>
            Bottom Center
          </IndicatorItem>
          <div>Main Content</div>
        </Indicator>,
      );

      expect(screen.getByText('Top Left')).toBeInTheDocument();
      expect(screen.getByText('Top Right')).toBeInTheDocument();
      expect(screen.getByText('Bottom Center')).toBeInTheDocument();
      expect(screen.getByText('Main Content')).toBeInTheDocument();

      const topLeft = screen.getByText('Top Left');
      expect(topLeft).toHaveClass('indicator-start');
      expect(topLeft).toHaveClass('indicator-top');

      const topRight = screen.getByText('Top Right');
      expect(topRight).toHaveClass('indicator-end');
      expect(topRight).toHaveClass('indicator-top');

      const bottomCenter = screen.getByText('Bottom Center');
      expect(bottomCenter).toHaveClass('indicator-center');
      expect(bottomCenter).toHaveClass('indicator-bottom');
    });

    it('maintains proper structure', () => {
      const { container } = render(
        <Indicator className='test-indicator'>
          <IndicatorItem horizontal='end' vertical='top' className='test-item'>
            Badge
          </IndicatorItem>
          <button>Button</button>
        </Indicator>,
      );

      const indicator = container.firstChild as HTMLElement;
      expect(indicator.tagName).toBe('DIV');
      expect(indicator).toHaveClass('indicator');
      expect(indicator).toHaveClass('test-indicator');

      const indicatorItem = indicator.querySelector('.indicator-item');
      expect(indicatorItem?.tagName).toBe('SPAN');
      expect(indicatorItem).toHaveClass('test-item');
      expect(indicatorItem).toHaveClass('indicator-end');
      expect(indicatorItem).toHaveClass('indicator-top');

      const button = indicator.querySelector('button');
      expect(button).toBeInTheDocument();
      expect(button?.textContent).toBe('Button');
    });
  });
});
