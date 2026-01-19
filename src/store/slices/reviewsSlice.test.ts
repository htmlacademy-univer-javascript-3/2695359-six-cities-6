import { describe, it, expect } from 'vitest';
import reviewsReducer, { setReviews } from './reviewsSlice';
import { fetchReviewsAction, postReviewAction } from '../actions/reviewsActions';

describe('reviewsSlice', () => {
  const initialState = {
    reviews: [],
    isSubmitting: false,
  };

  const mockReview = {
    id: '1',
    comment: 'Great place!',
    date: '2024-01-20T10:00:00.000Z',
    rating: 5,
    user: {
      name: 'John Doe',
      avatarUrl: 'avatar.jpg',
      isPro: false,
    },
  };

  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const result = reviewsReducer(undefined, emptyAction);

    expect(result).toEqual(initialState);
  });

  it('should set reviews with "setReviews" action', () => {
    const reviews = [mockReview];
    const result = reviewsReducer(initialState, setReviews(reviews));

    expect(result.reviews).toEqual(reviews);
  });

  it('should set reviews with "fetchReviewsAction.fulfilled"', () => {
    const reviews = [mockReview];
    const result = reviewsReducer(
      initialState,
      fetchReviewsAction.fulfilled(reviews, '', '1')
    );

    expect(result.reviews).toEqual(reviews);
  });

  it('should set isSubmitting to true with "postReviewAction.pending"', () => {
    const result = reviewsReducer(
      initialState,
      postReviewAction.pending('', { offerId: '1', comment: 'test', rating: 5 })
    );

    expect(result.isSubmitting).toBe(true);
  });

  it('should set isSubmitting to false with "postReviewAction.fulfilled"', () => {
    const result = reviewsReducer(
      { ...initialState, isSubmitting: true },
      postReviewAction.fulfilled(mockReview, '', { offerId: '1', comment: 'test', rating: 5 })
    );

    expect(result.isSubmitting).toBe(false);
  });

  it('should set isSubmitting to false with "postReviewAction.rejected"', () => {
    const result = reviewsReducer(
      { ...initialState, isSubmitting: true },
      postReviewAction.rejected(null, '', { offerId: '1', comment: 'test', rating: 5 })
    );

    expect(result.isSubmitting).toBe(false);
  });
});
