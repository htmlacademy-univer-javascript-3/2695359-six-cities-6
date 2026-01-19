import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { Offer } from '../types/offer';
import { CityName, SortType } from '../const';

export const changeCity = createAction<CityName>('city/change');
export const loadOffers = createAction<Offer[]>('offers/load');
export const changeSorting = createAction<SortType>('sorting/change');
export const setOffersLoadingStatus = createAction<boolean>('offers/setLoadingStatus');

export const fetchOffersAction = createAsyncThunk<
  Offer[],
  undefined,
  {
    extra: AxiosInstance;
  }
>('offers/fetch', async (_arg, { dispatch, extra: api }) => {
  dispatch(setOffersLoadingStatus(true));
  const { data } = await api.get<Offer[]>('/offers');
  dispatch(loadOffers(data));
  return data;
});
