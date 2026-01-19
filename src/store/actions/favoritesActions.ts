import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { Offer } from '../../types/offer';

export const fetchFavoritesAction = createAsyncThunk<
  Offer[],
  undefined,
  {
    extra: AxiosInstance;
  }
>('favorites/fetch', async (_arg, { extra: api }) => {
  const { data } = await api.get<Offer[]>('/favorite');
  return data;
});

export const toggleFavoriteAction = createAsyncThunk<
  Offer,
  { offerId: string; status: number },
  {
    extra: AxiosInstance;
  }
>('favorites/toggle', async ({ offerId, status }, { extra: api }) => {
  const { data } = await api.post<Offer>(`/favorite/${offerId}/${status}`);
  return data;
});
