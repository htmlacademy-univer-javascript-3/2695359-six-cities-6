import { memo, useMemo } from 'react';
import { Review as ReviewType } from '../../types/review';

type ReviewProps = {
  review: ReviewType;
};

function Review({ review }: ReviewProps): JSX.Element {
  const { comment, date, rating, user } = review;

  const ratingPercent = useMemo(() => `${(Math.round(rating) / 5) * 100}%`, [rating]);

  const formattedDate = useMemo(() => {
    const reviewDate = new Date(date);
    return reviewDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
  }, [date]);

  const isoDate = useMemo(() => new Date(date).toISOString().split('T')[0], [date]);

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className={`reviews__avatar-wrapper user__avatar-wrapper ${user.isPro ? 'user__avatar-wrapper--pro' : ''}`}>
          <img className="reviews__avatar user__avatar" src={user.avatarUrl} width="54" height="54" alt="Reviews avatar" />
        </div>
        <span className="reviews__user-name">{user.name}</span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{ width: ratingPercent }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {comment}
        </p>
        <time className="reviews__time" dateTime={isoDate}>{formattedDate}</time>
      </div>
    </li>
  );
}

export default memo(Review);
