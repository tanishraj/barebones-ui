import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

import { Card } from './Card';

describe('Card Component', () => {
  describe('Root Component', () => {
    it('should render with default classes', () => {
      const { container } = render(<Card />);
      const card = container.querySelector('.card');

      expect(card).toHaveClass('bg-base-200');
      expect(card).not.toHaveClass('shadow-md');
    });

    it('should apply variant classes', () => {
      const { container } = render(<Card variant='primary' />);
      const card = container.querySelector('.card');

      expect(card).toHaveClass('bg-primary');
      expect(card).toHaveClass('text-primary-content');
    });

    it('should apply size classes', () => {
      const { container } = render(<Card layout='side' />);
      const card = container.querySelector('.card');

      expect(card).toHaveClass('card-side');
    });

    it('should apply shadow size classes', () => {
      const { container } = render(<Card shadow='xl' />);
      const card = container.querySelector('.card');

      expect(card).toHaveClass('shadow-xl');
    });

    it('should combine custom className', () => {
      const { container } = render(<Card className='custom-class' />);
      const card = container.querySelector('.card');

      expect(card).toHaveClass('custom-class');
    });

    it('should forward ref', () => {
      const ref = vi.fn();
      const { container } = render(<Card ref={ref} />);
      const card = container.querySelector('.card');

      expect(ref).toHaveBeenCalledWith(card);
    });
  });

  describe('Subcomponents', () => {
    it('Title should render with correct classes and element', () => {
      render(<Card.Title>Test Title</Card.Title>);
      const title = screen.getByRole('heading', { level: 2 });

      expect(title).toHaveClass('card-title');
      expect(title).toHaveTextContent('Test Title');
    });

    it('Body should render with correct classes', () => {
      render(<Card.Body>Test Content</Card.Body>);
      const body = screen.getByText('Test Content');

      expect(body).toHaveClass('card-body');
    });

    it('Actions should render with correct classes', () => {
      render(<Card.Actions>Test Actions</Card.Actions>);
      const actions = screen.getByText('Test Actions');

      expect(actions).toHaveClass('card-actions');
    });

    it('Image should wrap children in figure', () => {
      render(
        <Card.Image>
          <img src='test.jpg' alt='Test' />
        </Card.Image>,
      );
      const figure = screen.getByRole('figure');
      const img = screen.getByRole('img');

      expect(figure).toContainElement(img);
    });

    it('should allow custom classes on subcomponents', () => {
      render(<Card.Title className='custom-title'>Test</Card.Title>);
      const title = screen.getByRole('heading', { level: 2 });

      expect(title).toHaveClass('custom-title');
    });
  });

  describe('Display Names', () => {
    it('should have correct display names', () => {
      expect(Card.displayName).toBe('Card');
      expect(Card.Title.displayName).toBe('Card.Title');
      expect(Card.Body.displayName).toBe('Card.Body');
      expect(Card.Actions.displayName).toBe('Card.Actions');
      expect(Card.Image.displayName).toBe('Card.Image');
    });
  });
});
