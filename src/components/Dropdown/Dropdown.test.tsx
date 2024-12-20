import { render } from '@testing-library/react';
import { describe, it } from 'vitest';

import Dropdown from './Dropdown';

describe('Button Component', () => {
  it('renders with default props', () => {
    render(<Dropdown />);
  });
});
