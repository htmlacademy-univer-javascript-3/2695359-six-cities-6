import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import { changeCity, loadOffers, changeSorting, setOffersLoadingStatus } from './action';
import { Offer } from '../types/offer';
import { CityName, SortType } from '../const';

type State = {
  city: CityName;
  offers: Offer[];
  sortType: SortType;
  isOffersLoading: boolean;
};

const initialState: State = {
  city: 'Paris',
  offers: [],
  sortType: SortType.Popular,
  isOffersLoading: false,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action: PayloadAction<CityName>) => {
      state.city = action.payload;
    })
    .addCase(loadOffers, (state, action: PayloadAction<Offer[]>) => {
      state.offers = action.payload;
      state.isOffersLoading = false;
    })
    .addCase(changeSorting, (state, action: PayloadAction<SortType>) => {
      state.sortType = action.payload;
    })
    .addCase(setOffersLoadingStatus, (state, action: PayloadAction<boolean>) => {
      state.isOffersLoading = action.payload;
    });
});
