import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { Offer, OfferDetail } from '../types/offer';
import { Review } from '../types/review';
import { User } from '../types/user';
import { CityName, SortType, AuthorizationStatus, TOKEN_KEY } from '../const';
import { CityName, SortType, AuthorizationStatus, TOKEN_KEY } from '../const';

export const changeCity = createAction<CityName>('city/change');
export const loadOffers = createAction<Offer[]>('offers/load');
export const changeSorting = createAction<SortType>('sorting/change');
export const setOffersLoadingStatus = createAction<boolean>('offers/setLoadingStatus');
export const setAuthorizationStatus = createAction<AuthorizationStatus>('user/setAuthorizationStatus');
export const setUser = createAction<User | null>('user/setUser');

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

export const checkAuthAction = createAsyncThunk<
  User,
  undefined,
  {
    extra: AxiosInstance;
  }
>('user/checkAuth', async (_arg, { dispatch, extra: api }) => {
  try {
    const { data } = await api.get<User>('/login');
    dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
    dispatch(setUser(data));
    return data;
  } catch {
    dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
    throw new Error('Check auth failed');
  }
});

export const loginAction = createAsyncThunk<
  User,
  { email: string; password: string },
  {
    extra: AxiosInstance;
  }
>('user/login', async ({ email, password }, { dispatch, extra: api }) => {
  const { data } = await api.post<User>('/login', { email, password });
  localStorage.setItem(TOKEN_KEY, data.token);
  dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
  dispatch(setUser(data));
  return data;
});

export const logoutAction = createAsyncThunk<
  void,
  undefined,
  {
    extra: AxiosInstance;
  }
>('user/logout', async (_arg, { dispatch, extra: api }) => {
  await api.delete('/logout');
  localStorage.removeItem(TOKEN_KEY);
  dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
  dispatch(setUser(null));
});

export const setCurrentOffer = createAction<OfferDetail | null>('offer/setCurrent');
export const setNearbyOffers = createAction<Offer[]>('offer/setNearby');
export const setReviews = createAction<Review[]>('reviews/set');
export const setOfferLoadingStatus = createAction<boolean>('offer/setLoadingStatus');

export const fetchOfferAction = createAsyncThunk<
  OfferDetail,
  string,
  {
    extra: AxiosInstance;
  }
>('offer/fetch', async (offerId, { dispatch, extra: api }) => {
  dispatch(setOfferLoadingStatus(true));
  const { data } = await api.get<OfferDetail>(`/offers/${offerId}`);
  dispatch(setCurrentOffer(data));
  return data;
});

export const fetchNearbyOffersAction = createAsyncThunk<
  Offer[],
  string,
  {
    extra: AxiosInstance;
  }
>('offer/fetchNearby', async (offerId, { dispatch, extra: api }) => {
  const { data } = await api.get<Offer[]>(`/offers/${offerId}/nearby`);
  dispatch(setNearbyOffers(data));
  return data;
});

export const fetchReviewsAction = createAsyncThunk<
  Review[],
  string,
  {
    extra: AxiosInstance;
  }
>('reviews/fetch', async (offerId, { dispatch, extra: api }) => {
  const { data } = await api.get<Review[]>(`/comments/${offerId}`);
  dispatch(setReviews(data));
  return data;
});

export const postReviewAction = createAsyncThunk<
  Review,
  { offerId: string; comment: string; rating: number },
  {
    extra: AxiosInstance;
  }
>('reviews/post', async ({ offerId, comment, rating }, { dispatch, extra: api }) => {
  const { data } = await api.post<Review>(`/comments/${offerId}`, { comment, rating });
  dispatch(fetchReviewsAction(offerId));
  return data;
});
