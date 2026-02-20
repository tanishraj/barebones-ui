import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import { [FTName] } from './[FTName]';

describe('[FTName] Component', () => {
  it('renders with default props', () => {
    render(<[FTName]>Hello</[FTName>);
  });
});
