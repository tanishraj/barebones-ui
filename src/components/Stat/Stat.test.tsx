import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import {
  Stats,
  Stat,
  StatTitle,
  StatValue,
  StatDesc,
  StatFigure,
  StatActions,
} from './Stat';

describe('Stats Component', () => {
  it('renders Stats component with correct classes', () => {
    render(<Stats data-testid='stats' direction='horizontal' shadow />);
    const statsElement = screen.getByTestId('stats');
    expect(statsElement).toHaveClass('stats stats-horizontal shadow');
  });

  it('renders Stat component with correct class', () => {
    render(<Stat data-testid='stat' />);
    const statElement = screen.getByTestId('stat');
    expect(statElement).toHaveClass('stat');
  });

  it('renders StatTitle component with correct class', () => {
    render(<StatTitle data-testid='stat-title'>Title</StatTitle>);
    const statTitleElement = screen.getByTestId('stat-title');
    expect(statTitleElement).toHaveClass('stat-title');
    expect(statTitleElement).toHaveTextContent('Title');
  });

  it('renders StatValue component with correct class', () => {
    render(<StatValue data-testid='stat-value'>100</StatValue>);
    const statValueElement = screen.getByTestId('stat-value');
    expect(statValueElement).toHaveClass('stat-value');
    expect(statValueElement).toHaveTextContent('100');
  });

  it('renders StatDesc component with correct class', () => {
    render(<StatDesc data-testid='stat-desc'>Description</StatDesc>);
    const statDescElement = screen.getByTestId('stat-desc');
    expect(statDescElement).toHaveClass('stat-desc');
    expect(statDescElement).toHaveTextContent('Description');
  });

  it('renders StatFigure component with correct class', () => {
    render(<StatFigure data-testid='stat-figure' />);
    const statFigureElement = screen.getByTestId('stat-figure');
    expect(statFigureElement).toHaveClass('stat-figure');
  });

  it('renders StatActions component with correct class', () => {
    render(<StatActions data-testid='stat-actions' />);
    const statActionsElement = screen.getByTestId('stat-actions');
    expect(statActionsElement).toHaveClass('stat-actions');
  });

  it('renders a complete Stats component with all subcomponents', () => {
    render(
      <Stats data-testid='stats'>
        <Stat>
          <StatFigure>Icon</StatFigure>
          <StatTitle>Users</StatTitle>
          <StatValue>1,000</StatValue>
          <StatDesc>Total registered users</StatDesc>
          <StatActions>
            <button>View Details</button>
          </StatActions>
        </Stat>
      </Stats>,
    );

    expect(screen.getByTestId('stats')).toBeInTheDocument();
    expect(screen.getByText('Icon')).toBeInTheDocument();
    expect(screen.getByText('Users')).toBeInTheDocument();
    expect(screen.getByText('1,000')).toBeInTheDocument();
    expect(screen.getByText('Total registered users')).toBeInTheDocument();
    expect(screen.getByText('View Details')).toBeInTheDocument();
  });
});
