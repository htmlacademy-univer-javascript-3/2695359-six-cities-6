import { describe, it, expect } from 'vitest';
import offerReducer, { setCurrentOffer, setNearbyOffers } from './offerSlice';
import { fetchOfferAction, fetchNearbyOffersAction } from '../actions/offerActions';
import { toggleFavoriteAction } from '../actions/favoritesActions';

describe('offerSlice', () => {
  const initialState = {
    currentOffer: null,
    nearbyOffers: [],
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
    description: 'Test description',
    bedrooms: 2,
    goods: ['Wi-Fi'],
    host: {
      name: 'Host',
      avatarUrl: 'avatar.jpg',
      isPro: false,
    },
    images: ['image.jpg'],
    maxAdults: 4,
  };

  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const result = offerReducer(undefined, emptyAction);

    expect(result).toEqual(initialState);
  });

  it('should set current offer with "setCurrentOffer" action', () => {
    const result = offerReducer(initialState, setCurrentOffer(mockOffer));

    expect(result.currentOffer).toEqual(mockOffer);
  });

  it('should set nearby offers with "setNearbyOffers" action', () => {
    const nearbyOffers = [mockOffer];
    const result = offerReducer(initialState, setNearbyOffers(nearbyOffers));

    expect(result.nearbyOffers).toEqual(nearbyOffers);
  });

  it('should set isLoading to true with "fetchOfferAction.pending"', () => {
    const result = offerReducer(initialState, fetchOfferAction.pending('', '1'));

    expect(result.isLoading).toBe(true);
  });

  it('should set current offer and isLoading to false with "fetchOfferAction.fulfilled"', () => {
    const result = offerReducer(
      { ...initialState, isLoading: true },
      fetchOfferAction.fulfilled(mockOffer, '', '1')
    );

    expect(result.currentOffer).toEqual(mockOffer);
    expect(result.isLoading).toBe(false);
  });

  it('should set isLoading to false and currentOffer to null with "fetchOfferAction.rejected"', () => {
    const result = offerReducer(
      { ...initialState, isLoading: true, currentOffer: mockOffer },
      fetchOfferAction.rejected(null, '', '1')
    );

    expect(result.isLoading).toBe(false);
    expect(result.currentOffer).toBeNull();
  });

  it('should set nearby offers with "fetchNearbyOffersAction.fulfilled"', () => {
    const nearbyOffers = [mockOffer];
    const result = offerReducer(
      initialState,
      fetchNearbyOffersAction.fulfilled(nearbyOffers, '', '1')
    );

    expect(result.nearbyOffers).toEqual(nearbyOffers);
  });

  it('should update current offer isFavorite with "toggleFavoriteAction.fulfilled"', () => {
    const stateWithOffer = { ...initialState, currentOffer: mockOffer };
    const updatedOffer = { ...mockOffer, isFavorite: true };
    const result = offerReducer(
      stateWithOffer,
      toggleFavoriteAction.fulfilled(updatedOffer, '', { offerId: '1', status: 1 })
    );

    expect(result.currentOffer?.isFavorite).toBe(true);
  });

  it('should update nearby offer isFavorite with "toggleFavoriteAction.fulfilled"', () => {
    const stateWithNearby = { ...initialState, nearbyOffers: [mockOffer] };
    const updatedOffer = { ...mockOffer, isFavorite: true };
    const result = offerReducer(
      stateWithNearby,
      toggleFavoriteAction.fulfilled(updatedOffer, '', { offerId: '1', status: 1 })
    );

    expect(result.nearbyOffers[0].isFavorite).toBe(true);
  });
});
