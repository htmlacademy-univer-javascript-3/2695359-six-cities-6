import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Review from './Review';

describe('Review', () => {
  const mockReview = {
    id: '1',
    comment: 'Great place to stay!',
    date: '2024-01-20T10:00:00.000Z',
    rating: 5,
    user: {
      name: 'John Doe',
      avatarUrl: 'avatar.jpg',
      isPro: true,
    },
  };

  it('should render review correctly', () => {
    render(<Review review={mockReview} />);

    expect(screen.getByText('Great place to stay!')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByAltText('Reviews avatar')).toBeInTheDocument();
  });

  it('should display correct rating', () => {
    render(<Review review={mockReview} />);

    const ratingElement = screen.getByText('Rating').previousElementSibling;
    expect(ratingElement).toHaveStyle({ width: '100%' });
  });

  it('should format date correctly', () => {
    render(<Review review={mockReview} />);

    expect(screen.getByText('January 2024')).toBeInTheDocument();
  });

  it('should show pro badge for pro user', () => {
    const { container } = render(<Review review={mockReview} />);

    const avatarWrapper = container.querySelector('.user__avatar-wrapper--pro');
    expect(avatarWrapper).toBeInTheDocument();
  });

  it('should not show pro badge for non-pro user', () => {
    const nonProReview = { ...mockReview, user: { ...mockReview.user, isPro: false } };
    const { container } = render(<Review review={nonProReview} />);

    const avatarWrapper = container.querySelector('.user__avatar-wrapper--pro');
    expect(avatarWrapper).not.toBeInTheDocument();
  });
});
