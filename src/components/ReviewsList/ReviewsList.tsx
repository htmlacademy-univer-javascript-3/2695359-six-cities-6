import { useMemo } from 'react';
import Review from '../Review/Review';
import { useAppSelector } from '../../hooks';
import { selectReviews } from '../../store/selectors';

const MAX_REVIEWS_COUNT = 10;

function ReviewsList(): JSX.Element {
  const reviews = useAppSelector(selectReviews);

  const sortedReviews = useMemo(
    () => [...reviews]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, MAX_REVIEWS_COUNT),
    [reviews]
  );

  return (
    <>
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
      <ul className="reviews__list">
        {sortedReviews.map((review) => (
          <Review key={review.id} review={review} />
        ))}
      </ul>
    </>
  );
}

export default ReviewsList;
