import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import { List } from './List';

describe('List Component', () => {
  it('renders with default props', () => {
    render(<List>Hello</List);
  });
});