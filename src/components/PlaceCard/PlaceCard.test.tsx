import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureMockStore } from '@jedmao/redux-mock-store';
import PlaceCard from './PlaceCard';
import { AuthorizationStatus } from '../../const';

const mockStore = configureMockStore();

describe('PlaceCard', () => {
  const mockOffer = {
    id: '1',
    title: 'Beautiful Apartment',
    type: 'apartment',
    price: 120,
    city: {
      name: 'Paris',
      location: { latitude: 48.8566, longitude: 2.3522, zoom: 10 },
    },
    location: { latitude: 48.8566, longitude: 2.3522, zoom: 10 },
    isFavorite: false,
    isPremium: true,
    rating: 4.5,
    previewImage: 'test.jpg',
  };

  it('should render offer information correctly', () => {
    const store = mockStore({
      user: {
        authorizationStatus: AuthorizationStatus.Auth,
        user: null,
      },
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <PlaceCard offer={mockOffer} />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('Beautiful Apartment')).toBeInTheDocument();
    expect(screen.getByText('€120')).toBeInTheDocument();
    expect(screen.getByText('apartment')).toBeInTheDocument();
    expect(screen.getByText('Premium')).toBeInTheDocument();
  });

  it('should call onMouseEnter when hovering over card', async () => {
    const onMouseEnter = vi.fn();
    const store = mockStore({
      user: {
        authorizationStatus: AuthorizationStatus.Auth,
        user: null,
      },
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <PlaceCard offer={mockOffer} onMouseEnter={onMouseEnter} />
        </BrowserRouter>
      </Provider>
    );

    const card = screen.getByRole('article');
    await userEvent.hover(card);

    expect(onMouseEnter).toHaveBeenCalledWith('1');
  });

  it('should call onMouseLeave when leaving card', async () => {
    const onMouseLeave = vi.fn();
    const store = mockStore({
      user: {
        authorizationStatus: AuthorizationStatus.Auth,
        user: null,
      },
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <PlaceCard offer={mockOffer} onMouseLeave={onMouseLeave} />
        </BrowserRouter>
      </Provider>
    );

    const card = screen.getByRole('article');
    await userEvent.unhover(card);

    expect(onMouseLeave).toHaveBeenCalled();
  });

  it('should display bookmark button as active when isFavorite is true', () => {
    const favoriteOffer = { ...mockOffer, isFavorite: true };
    const store = mockStore({
      user: {
        authorizationStatus: AuthorizationStatus.Auth,
        user: null,
      },
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <PlaceCard offer={favoriteOffer} />
        </BrowserRouter>
      </Provider>
    );

    const button = screen.getByRole('button');
    expect(button).toHaveClass('place-card__bookmark-button--active');
    expect(screen.getByText('In bookmarks')).toBeInTheDocument();
  });

  it('should not show premium mark when isPremium is false', () => {
    const nonPremiumOffer = { ...mockOffer, isPremium: false };
    const store = mockStore({
      user: {
        authorizationStatus: AuthorizationStatus.Auth,
        user: null,
      },
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <PlaceCard offer={nonPremiumOffer} />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.queryByText('Premium')).not.toBeInTheDocument();
  });
});
