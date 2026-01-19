import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import CitiesList from './CitiesList';
import { CITIES } from '../../const';

describe('CitiesList', () => {
  const mockOnCityChange = vi.fn();

  it('should render all cities', () => {
    render(<CitiesList currentCity="Paris" onCityChange={mockOnCityChange} />);

    CITIES.forEach((city) => {
      expect(screen.getByText(city)).toBeInTheDocument();
    });
  });

  it('should highlight current city', () => {
    const { container } = render(<CitiesList currentCity="Paris" onCityChange={mockOnCityChange} />);

    const activeTab = container.querySelector('.tabs__item--active');
    expect(activeTab).toBeInTheDocument();
    expect(activeTab?.textContent).toBe('Paris');
  });

  it('should render with different current city', () => {
    const { container } = render(<CitiesList currentCity="Amsterdam" onCityChange={mockOnCityChange} />);

    const activeTab = container.querySelector('.tabs__item--active');
    expect(activeTab?.textContent).toBe('Amsterdam');
  });
});
