import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Review } from '../../types/review';
import { fetchReviewsAction, postReviewAction } from '../actions/reviewsActions';

type ReviewsState = {
  reviews: Review[];
  isSubmitting: boolean;
};

const initialState: ReviewsState = {
  reviews: [],
  isSubmitting: false,
};

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    setReviews: (state, action: PayloadAction<Review[]>) => {
      state.reviews = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
      })
      .addCase(postReviewAction.pending, (state) => {
        state.isSubmitting = true;
      })
      .addCase(postReviewAction.fulfilled, (state) => {
        state.isSubmitting = false;
      })
      .addCase(postReviewAction.rejected, (state) => {
        state.isSubmitting = false;
      });
  },
});

export const { setReviews } = reviewsSlice.actions;
export default reviewsSlice.reducer;
