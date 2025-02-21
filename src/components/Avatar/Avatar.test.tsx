import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';

import { Avatar } from './Avatar';

describe('Avatar Component', () => {
  test('renders image when url is provided', () => {
    const item = {
      url: 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp',
      text: 'User',
    };
    render(<Avatar item={item} size='md' shape='circle' status='none' />);

    const image = screen.getByRole('img');

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', item.url);
    expect(image).toHaveAttribute('alt', `${item.text} avatar`);
  });

  test('renders text when url is not provided', () => {
    const item = { text: 'AB' };
    render(<Avatar item={item} size='md' shape='circle' status='none' />);

    expect(screen.getByText(item.text)).toBeInTheDocument();
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  test('applies correct size and shape classes', () => {
    const { container } = render(
      <Avatar
        item={{ text: 'T' }}
        size='lg'
        shape='squircle'
        status='online'
      />,
    );

    const avatarElement = container.querySelector('.avatar');
    const shapeElement = container.querySelector('.mask-squircle');

    expect(avatarElement).toHaveClass('online');
    expect(shapeElement).toBeInTheDocument();
    expect(screen.getByText('T')).toHaveClass('text-3xl');
  });

  test('applies status indicator classes', () => {
    const { container } = render(
      <Avatar item={{ text: 'S' }} status='online' size='md' shape='circle' />,
    );

    expect(container.firstChild).toHaveClass('online');
  });

  test('does not render content when neither url nor text is provided', () => {
    const { container } = render(
      <Avatar item={{}} size='md' shape='circle' status='none' />,
    );

    expect(container.querySelector('img')).not.toBeInTheDocument();
    expect(container.querySelector('span')).not.toBeInTheDocument();
  });
});
