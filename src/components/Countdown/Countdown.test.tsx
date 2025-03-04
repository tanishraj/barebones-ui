import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import { Countdown } from './Countdown';

describe('Countdown Component', () => {
  it('renders with default props', () => {
    render(<Countdown>Hello</Countdown);
  });
});