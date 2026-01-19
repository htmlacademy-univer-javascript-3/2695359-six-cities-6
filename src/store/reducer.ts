import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import { changeCity, loadOffers, changeSorting, setOffersLoadingStatus, setAuthorizationStatus, setUser } from './action';
import { Offer } from '../types/offer';
import { User } from '../types/user';
import { CityName, SortType, AuthorizationStatus } from '../const';

type State = {
  city: CityName;
  offers: Offer[];
  sortType: SortType;
  isOffersLoading: boolean;
  authorizationStatus: AuthorizationStatus;
  user: User | null;
};

const initialState: State = {
  city: 'Paris',
  offers: [],
  sortType: SortType.Popular,
  isOffersLoading: false,
  authorizationStatus: AuthorizationStatus.Unknown,
  user: null,
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
    })
    .addCase(setAuthorizationStatus, (state, action: PayloadAction<AuthorizationStatus>) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setUser, (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    });
});
