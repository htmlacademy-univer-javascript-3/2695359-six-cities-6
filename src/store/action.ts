import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { Offer } from '../types/offer';
import { User } from '../types/user';
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
