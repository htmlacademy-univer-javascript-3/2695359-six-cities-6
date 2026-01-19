import { describe, it, expect } from 'vitest';
import favoritesReducer from './favoritesSlice';
import { fetchFavoritesAction, toggleFavoriteAction } from '../actions/favoritesActions';

describe('favoritesSlice', () => {
  const initialState = {
    favorites: [],
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
    isFavorite: true,
    isPremium: false,
    rating: 4.5,
    previewImage: 'test.jpg',
  };

  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const result = favoritesReducer(undefined, emptyAction);

    expect(result).toEqual(initialState);
  });

  it('should set isLoading to true with "fetchFavoritesAction.pending"', () => {
    const result = favoritesReducer(
      initialState,
      fetchFavoritesAction.pending('', undefined)
    );

    expect(result.isLoading).toBe(true);
  });

  it('should set favorites and isLoading to false with "fetchFavoritesAction.fulfilled"', () => {
    const favorites = [mockOffer];
    const result = favoritesReducer(
      { ...initialState, isLoading: true },
      fetchFavoritesAction.fulfilled(favorites, '', undefined)
    );

    expect(result.favorites).toEqual(favorites);
    expect(result.isLoading).toBe(false);
  });

  it('should set isLoading to false with "fetchFavoritesAction.rejected"', () => {
    const result = favoritesReducer(
      { ...initialState, isLoading: true },
      fetchFavoritesAction.rejected(null, '', undefined)
    );

    expect(result.isLoading).toBe(false);
  });

  it('should add offer to favorites with "toggleFavoriteAction.fulfilled" when isFavorite is true', () => {
    const result = favoritesReducer(
      initialState,
      toggleFavoriteAction.fulfilled(mockOffer, '', { offerId: '1', status: 1 })
    );

    expect(result.favorites).toHaveLength(1);
    expect(result.favorites[0]).toEqual(mockOffer);
  });

  it('should remove offer from favorites with "toggleFavoriteAction.fulfilled" when isFavorite is false', () => {
    const stateWithFavorite = { ...initialState, favorites: [mockOffer] };
    const updatedOffer = { ...mockOffer, isFavorite: false };
    const result = favoritesReducer(
      stateWithFavorite,
      toggleFavoriteAction.fulfilled(updatedOffer, '', { offerId: '1', status: 0 })
    );

    expect(result.favorites).toHaveLength(0);
  });
});
