import { describe, expect, test } from 'vitest';
import { render } from '@testing-library/react';

import { Carousel } from './Carousel';

describe('Carousel', () => {
  test('renders children correctly', () => {
    const { container } = render(
      <Carousel>
        <div>Child 1</div>
        <div>Child 2</div>
      </Carousel>,
    );

    const items = container.querySelectorAll('.carousel-item');
    expect(items).toHaveLength(2);
    expect(items[0].textContent).toBe('Child 1');
    expect(items[1].textContent).toBe('Child 2');
  });

  test('applies base carousel class', () => {
    const { container } = render(
      <Carousel>
        <div>Child 1</div>
        <div>Child 2</div>
      </Carousel>,
    );
    const carousel = container.firstChild;
    expect(carousel).toHaveClass('carousel');
  });

  test.each(['start', 'center', 'end'] as const)(
    'applies snapPosition %s class',
    snapPosition => {
      const { container } = render(
        <Carousel snapPosition={snapPosition}>
          <div>Child 1</div>
          <div>Child 2</div>
        </Carousel>,
      );
      const carousel = container.firstChild;
      expect(carousel).toHaveClass(`carousel-${snapPosition}`);
    },
  );

  test('applies verticalScroll class when verticalScroll is true', () => {
    const { container } = render(
      <Carousel verticalScroll={true}>
        <div>Child 1</div>
        <div>Child 2</div>
      </Carousel>,
    );
    const carousel = container.firstChild;
    expect(carousel).toHaveClass('carousel-vertical');
  });

  test('does not apply verticalScroll class when verticalScroll is false or undefined', () => {
    const { container: container1 } = render(
      <Carousel verticalScroll={false}>
        <div>Child 1</div>
        <div>Child 2</div>
      </Carousel>,
    );
    const carousel1 = container1.firstChild;
    expect(carousel1).not.toHaveClass('carousel-vertical');

    const { container: container2 } = render(
      <Carousel>
        <div>Child 1</div>
        <div>Child 2</div>
      </Carousel>,
    );
    const carousel2 = container2.firstChild;
    expect(carousel2).not.toHaveClass('carousel-vertical');
  });

  test('merges custom className', () => {
    const { container } = render(
      <Carousel className='custom-class'>
        <div>Child 1</div>
        <div>Child 2</div>
      </Carousel>,
    );
    const carousel = container.firstChild;
    expect(carousel).toHaveClass('carousel', 'custom-class');
  });

  test('has only base class when no variants are provided', () => {
    const { container } = render(
      <Carousel>
        <div>Child 1</div>
        <div>Child 2</div>
      </Carousel>,
    );
    const carousel = container.firstChild;
    expect(carousel).toHaveClass('carousel');
    expect(carousel).not.toHaveClass(
      'carousel-start',
      'carousel-center',
      'carousel-end',
      'carousel-vertical',
    );
  });
});
