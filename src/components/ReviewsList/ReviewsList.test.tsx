import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import ReviewsList from './ReviewsList';

const mockStore = configureMockStore();

describe('ReviewsList', () => {
  const mockReview = {
    id: '1',
    comment: 'Great place!',
    date: '2024-01-20T10:00:00.000Z',
    rating: 5,
    user: {
      name: 'John Doe',
      avatarUrl: 'avatar.jpg',
      isPro: false,
    },
  };

  it('should render reviews list', () => {
    const store = mockStore({
      reviews: {
        reviews: [mockReview],
        isSubmitting: false,
      },
    });

    render(
      <Provider store={store}>
        <ReviewsList />
      </Provider>
    );

    expect(screen.getByText('Great place!')).toBeInTheDocument();
    expect(screen.getByText(/Reviews/)).toBeInTheDocument();
  });

  it('should display correct reviews count', () => {
    const reviews = [mockReview, { ...mockReview, id: '2' }, { ...mockReview, id: '3' }];
    const store = mockStore({
      reviews: {
        reviews,
        isSubmitting: false,
      },
    });

    render(
      <Provider store={store}>
        <ReviewsList />
      </Provider>
    );

    expect(screen.getByText(/3/)).toBeInTheDocument();
  });

  it('should render empty list when no reviews', () => {
    const store = mockStore({
      reviews: {
        reviews: [],
        isSubmitting: false,
      },
    });

    const { container } = render(
      <Provider store={store}>
        <ReviewsList />
      </Provider>
    );

    const reviewsList = container.querySelector('.reviews__list');
    expect(reviewsList?.children).toHaveLength(0);
  });

  it('should limit reviews to 10', () => {
    const reviews = Array.from({ length: 15 }, (_, i) => ({
      ...mockReview,
      id: `${i + 1}`,
    }));

    const store = mockStore({
      reviews: {
        reviews,
        isSubmitting: false,
      },
    });

    const { container } = render(
      <Provider store={store}>
        <ReviewsList />
      </Provider>
    );

    const reviewsList = container.querySelector('.reviews__list');
    expect(reviewsList?.children).toHaveLength(10);
  });
});
