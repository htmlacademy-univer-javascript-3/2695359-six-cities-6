import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import MainEmpty from './MainEmpty';

describe('MainEmpty', () => {
  it('should render correctly with city name', () => {
    render(<MainEmpty city="Paris" />);

    expect(screen.getByText('No places to stay available')).toBeInTheDocument();
    expect(screen.getByText(/We could not find any property available at the moment in Paris/i)).toBeInTheDocument();
  });

  it('should render with different city', () => {
    render(<MainEmpty city="Amsterdam" />);

    expect(screen.getByText(/Amsterdam/i)).toBeInTheDocument();
  });
});
