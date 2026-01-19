import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { User } from '../../types/user';
import { TOKEN_KEY } from '../../const';

export const checkAuthAction = createAsyncThunk<
  User,
  undefined,
  {
    extra: AxiosInstance;
  }
>('user/checkAuth', async (_arg, { extra: api }) => {
  const { data } = await api.get<User>('/login');
  return data;
});

export const loginAction = createAsyncThunk<
  User,
  { email: string; password: string },
  {
    extra: AxiosInstance;
  }
>('user/login', async ({ email, password }, { extra: api }) => {
  const { data } = await api.post<User>('/login', { email, password });
  localStorage.setItem(TOKEN_KEY, data.token);
  return data;
});

export const logoutAction = createAsyncThunk<
  void,
  undefined,
  {
    extra: AxiosInstance;
  }
>('user/logout', async (_arg, { extra: api }) => {
  await api.delete('/logout');
  localStorage.removeItem(TOKEN_KEY);
});
