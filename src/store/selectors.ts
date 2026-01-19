import { createSelector } from '@reduxjs/toolkit';
import { RootState } from './index';
import { sortOffers } from '../utils/sorting';

export const selectCity = (state: RootState) => state.app.city;
export const selectSortType = (state: RootState) => state.app.sortType;
export const selectOffers = (state: RootState) => state.offers.offers;
export const selectOffersLoading = (state: RootState) => state.offers.isLoading;

export const selectCurrentOffer = (state: RootState) => state.offer.currentOffer;
export const selectNearbyOffers = (state: RootState) => state.offer.nearbyOffers;
export const selectOfferLoading = (state: RootState) => state.offer.isLoading;

export const selectReviews = (state: RootState) => state.reviews.reviews;
export const selectReviewsSubmitting = (state: RootState) => state.reviews.isSubmitting;

export const selectAuthorizationStatus = (state: RootState) => state.user.authorizationStatus;
export const selectUser = (state: RootState) => state.user.user;

export const selectCityOffers = createSelector(
  [selectOffers, selectCity],
  (offers, city) => offers.filter((offer) => offer.city.name === city)
);

export const selectSortedCityOffers = createSelector(
  [selectCityOffers, selectSortType],
  (offers, sortType) => sortOffers(offers, sortType)
);

export const selectFavorites = (state: RootState) => state.favorites.favorites;
export const selectFavoritesLoading = (state: RootState) => state.favorites.isLoading;

export const selectFavoriteCount = createSelector(
  [selectFavorites],
  (favorites) => favorites.length
);
