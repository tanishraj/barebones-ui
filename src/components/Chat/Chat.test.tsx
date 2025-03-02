import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import { Chat } from './Chat';

describe('Chat Component', () => {
  describe('Root Component', () => {
    it('should render with default placement (start)', () => {
      const { container } = render(<Chat>Test Content</Chat>);
      expect(container.querySelector('.chat')).toHaveClass('chat-start');
    });

    it('should apply placement classes correctly', () => {
      const { container } = render(<Chat placement='start'>Test</Chat>);
      expect(container.querySelector('.chat')).toHaveClass('chat-start');

      const { container: rerenderedContainer } = render(
        <Chat placement='end'>Test</Chat>,
      );
      expect(rerenderedContainer.querySelector('.chat')).toHaveClass(
        'chat-end',
      );
    });

    it('should merge custom class names', () => {
      const { container } = render(<Chat className='custom-class'>Test</Chat>);
      const chatElement = container.querySelector('.custom-class');
      expect(chatElement).toHaveClass('chat');
    });

    it('should only render valid React elements', () => {
      render(
        <Chat>
          <div>Valid Child</div>
          Invalid String Child
          {null}
        </Chat>,
      );
      expect(screen.getByText('Valid Child')).toBeInTheDocument();
      expect(
        screen.queryByText('Invalid String Child'),
      ).not.toBeInTheDocument();
    });
  });

  describe('Avatar Subcomponent', () => {
    it('should render avatar with image', () => {
      render(
        <Chat>
          <Chat.Avatar src='test.jpg' alt='Test Avatar' />
        </Chat>,
      );

      const avatarImage = screen.getByAltText('Test Avatar');
      expect(avatarImage).toBeInTheDocument();
      expect(avatarImage).toHaveAttribute('src', 'test.jpg');
    });

    it('should apply avatar classes correctly', () => {
      render(
        <Chat>
          <Chat.Avatar src='test.jpg' alt='Test' className='custom-avatar' />
        </Chat>,
      );

      const avatarContainer = screen
        .getByRole('img', { name: 'Test' })
        .closest('div')?.parentElement;
      expect(avatarContainer).toHaveClass('avatar');
      expect(avatarContainer).toHaveClass('custom-avatar');
    });
  });

  describe('Header Subcomponent', () => {
    it('should render header content', () => {
      render(
        <Chat>
          <Chat.Header>Header Content</Chat.Header>
        </Chat>,
      );

      expect(screen.getByText('Header Content')).toHaveClass('chat-header');
    });

    it('should merge header classes', () => {
      render(
        <Chat>
          <Chat.Header className='custom-header'>Test</Chat.Header>
        </Chat>,
      );

      const header = screen.getByText('Test');
      expect(header).toHaveClass('chat-header');
      expect(header).toHaveClass('custom-header');
    });
  });

  describe('Bubble Subcomponent', () => {
    it('should render with default styling', () => {
      render(
        <Chat>
          <Chat.Bubble>Test</Chat.Bubble>
        </Chat>,
      );

      expect(screen.getByText('Test')).toHaveClass('chat-bubble');
    });

    it('should apply color variants correctly', () => {
      const { rerender } = render(
        <Chat>
          <Chat.Bubble variant='primary'>Test</Chat.Bubble>
        </Chat>,
      );
      expect(screen.getByText('Test')).toHaveClass('chat-bubble-primary');

      rerender(
        <Chat>
          <Chat.Bubble variant='error'>Test</Chat.Bubble>
        </Chat>,
      );
      expect(screen.getByText('Test')).toHaveClass('chat-bubble-error');
    });

    it('should merge custom bubble classes', () => {
      render(
        <Chat>
          <Chat.Bubble className='custom-bubble'>Test</Chat.Bubble>
        </Chat>,
      );

      const bubble = screen.getByText('Test');
      expect(bubble).toHaveClass('chat-bubble');
      expect(bubble).toHaveClass('custom-bubble');
    });
  });

  describe('Footer Subcomponent', () => {
    it('should render footer content', () => {
      render(
        <Chat>
          <Chat.Footer>Footer Content</Chat.Footer>
        </Chat>,
      );

      expect(screen.getByText('Footer Content')).toHaveClass('chat-footer');
    });

    it('should merge footer classes', () => {
      render(
        <Chat>
          <Chat.Footer className='custom-footer'>Test</Chat.Footer>
        </Chat>,
      );

      const footer = screen.getByText('Test');
      expect(footer).toHaveClass('chat-footer');
      expect(footer).toHaveClass('custom-footer');
    });
  });

  describe('Component Composition', () => {
    it('should render complete chat structure', () => {
      render(
        <Chat placement='end'>
          <Chat.Avatar src='user.jpg' alt='User' />
          <Chat.Header>Header</Chat.Header>
          <Chat.Bubble variant='info'>Message</Chat.Bubble>
          <Chat.Footer>Footer</Chat.Footer>
        </Chat>,
      );

      expect(screen.getByAltText('User')).toBeInTheDocument();
      expect(screen.getByText('Header')).toBeInTheDocument();
      expect(screen.getByText('Message')).toHaveClass('chat-bubble-info');
      expect(screen.getByText('Footer')).toBeInTheDocument();
    });
  });
});
