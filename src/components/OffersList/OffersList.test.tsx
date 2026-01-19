import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import OffersList from './OffersList';
import { AuthorizationStatus } from '../../const';

const mockStore = configureMockStore();

describe('OffersList', () => {
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
    isPremium: false,
    rating: 4.5,
    previewImage: 'test.jpg',
  };

  const mockOnOfferHover = vi.fn();

  it('should render offers list', () => {
    const store = mockStore({
      user: {
        authorizationStatus: AuthorizationStatus.Auth,
        user: null,
      },
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <OffersList offers={[mockOffer]} onOfferHover={mockOnOfferHover} />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('Beautiful Apartment')).toBeInTheDocument();
  });

  it('should render empty list when no offers', () => {
    const store = mockStore({
      user: {
        authorizationStatus: AuthorizationStatus.Auth,
        user: null,
      },
    });

    const { container } = render(
      <Provider store={store}>
        <BrowserRouter>
          <OffersList offers={[]} onOfferHover={mockOnOfferHover} />
        </BrowserRouter>
      </Provider>
    );

    const placesList = container.querySelector('.places__list');
    expect(placesList?.children).toHaveLength(0);
  });

  it('should render multiple offers', () => {
    const offers = [
      mockOffer,
      { ...mockOffer, id: '2', title: 'Cozy Studio' },
      { ...mockOffer, id: '3', title: 'Luxury Suite' },
    ];

    const store = mockStore({
      user: {
        authorizationStatus: AuthorizationStatus.Auth,
        user: null,
      },
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <OffersList offers={offers} onOfferHover={mockOnOfferHover} />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('Beautiful Apartment')).toBeInTheDocument();
    expect(screen.getByText('Cozy Studio')).toBeInTheDocument();
    expect(screen.getByText('Luxury Suite')).toBeInTheDocument();
  });
});
