import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import { Difference } from './Difference';

describe('Difference Component', () => {
  it('renders with default props', () => {
    render(<Difference>Hello</Difference);
  });
});