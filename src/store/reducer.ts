import { createReducer } from '@reduxjs/toolkit';
import { changeCity, loadOffers } from './action';
import { Offer } from '../types/offer';
import { CityName } from '../const';

type State = {
  city: CityName;
  offers: Offer[];
};

const initialState: State = {
  city: 'Paris',
  offers: [],
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    });
});
