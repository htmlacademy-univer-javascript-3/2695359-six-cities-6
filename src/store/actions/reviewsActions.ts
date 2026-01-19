import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { Review } from '../../types/review';

export const fetchReviewsAction = createAsyncThunk<
  Review[],
  string,
  {
    extra: AxiosInstance;
  }
>('reviews/fetch', async (offerId, { extra: api }) => {
  const { data } = await api.get<Review[]>(`/comments/${offerId}`);
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
