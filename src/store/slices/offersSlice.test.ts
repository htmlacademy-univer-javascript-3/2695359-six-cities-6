import { describe, it, expect } from 'vitest';
import offersReducer, { setOffers } from './offersSlice';
import { fetchOffersAction } from '../actions/offersActions';
import { toggleFavoriteAction } from '../actions/favoritesActions';

describe('offersSlice', () => {
  const initialState = {
    offers: [],
    isLoading: false,
  };

  const mockOffer = {
    id: '1',
    title: 'Test Offer',
    type: 'apartment',
    price: 100,
    city: {
      name: 'Paris',
      location: {
        latitude: 48.8566,
        longitude: 2.3522,
        zoom: 10,
      },
    },
    location: {
      latitude: 48.8566,
      longitude: 2.3522,
      zoom: 10,
    },
    isFavorite: false,
    isPremium: false,
    rating: 4.5,
    previewImage: 'test.jpg',
  };

  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const result = offersReducer(undefined, emptyAction);

    expect(result).toEqual(initialState);
  });

  it('should set offers with "setOffers" action', () => {
    const offers = [mockOffer];
    const result = offersReducer(initialState, setOffers(offers));

    expect(result.offers).toEqual(offers);
  });

  it('should set isLoading to true with "fetchOffersAction.pending"', () => {
    const result = offersReducer(initialState, fetchOffersAction.pending('', undefined));

    expect(result.isLoading).toBe(true);
  });

  it('should set offers and isLoading to false with "fetchOffersAction.fulfilled"', () => {
    const offers = [mockOffer];
    const result = offersReducer(
      { ...initialState, isLoading: true },
      fetchOffersAction.fulfilled(offers, '', undefined)
    );

    expect(result.offers).toEqual(offers);
    expect(result.isLoading).toBe(false);
  });

  it('should set isLoading to false with "fetchOffersAction.rejected"', () => {
    const result = offersReducer(
      { ...initialState, isLoading: true },
      fetchOffersAction.rejected(null, '', undefined)
    );

    expect(result.isLoading).toBe(false);
  });

  it('should update offer isFavorite with "toggleFavoriteAction.fulfilled"', () => {
    const stateWithOffer = { ...initialState, offers: [mockOffer] };
    const updatedOffer = { ...mockOffer, isFavorite: true };
    const result = offersReducer(
      stateWithOffer,
      toggleFavoriteAction.fulfilled(updatedOffer, '', { offerId: '1', status: 1 })
    );

    expect(result.offers[0].isFavorite).toBe(true);
  });
});
