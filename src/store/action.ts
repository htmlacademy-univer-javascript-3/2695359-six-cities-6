import { createAction } from '@reduxjs/toolkit';
import { Offer } from '../types/offer';
import { CityName, SortType } from '../const';

export const changeCity = createAction<CityName>('city/change');
export const loadOffers = createAction<Offer[]>('offers/load');
export const changeSorting = createAction<SortType>('sorting/change');
