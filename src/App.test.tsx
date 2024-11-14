import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test } from 'vitest';

import App from './App';

describe('App Component', () => {
  test('renders Vite and React logos with correct links', () => {
    render(<App />);

    // Check for React logo link and image
    const reactLink = screen.getAllByRole('link')[1]; // Second link
    expect(reactLink).toHaveAttribute('href', 'https://react.dev');
    const reactImage = screen.getByAltText('React logo');
    expect(reactImage).toBeInTheDocument();
  });

  test('renders the main heading', () => {
    render(<App />);
    const headingElement = screen.getByRole('heading', {
      name: /vite \+ react/i,
    });
    expect(headingElement).toBeInTheDocument();
  });

  test('renders the button with initial count and updates count on click', async () => {
    render(<App />);
    const buttonElement = screen.getByRole('button', { name: /count is 0/i });
    expect(buttonElement).toBeInTheDocument();

    // Simulate button clicks and verify count updates
    await userEvent.click(buttonElement);
    expect(buttonElement).toHaveTextContent('count is 1');

    await userEvent.click(buttonElement);
    expect(buttonElement).toHaveTextContent('count is 2');
  });
});
