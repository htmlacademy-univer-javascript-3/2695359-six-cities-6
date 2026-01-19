import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { Offer, OfferDetail } from '../../types/offer';

export const fetchOfferAction = createAsyncThunk<
  OfferDetail,
  string,
  {
    extra: AxiosInstance;
  }
>('offer/fetch', async (offerId, { extra: api }) => {
  const { data } = await api.get<OfferDetail>(`/offers/${offerId}`);
  return data;
});

export const fetchNearbyOffersAction = createAsyncThunk<
  Offer[],
  string,
  {
    extra: AxiosInstance;
  }
>('offer/fetchNearby', async (offerId, { extra: api }) => {
  const { data } = await api.get<Offer[]>(`/offers/${offerId}/nearby`);
  return data;
});
