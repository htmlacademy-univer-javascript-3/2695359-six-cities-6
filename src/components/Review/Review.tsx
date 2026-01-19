import { Review as ReviewType } from '../../types/review';

type ReviewProps = {
  review: ReviewType;
};

function Review({ review }: ReviewProps): JSX.Element {
  const { comment, date, rating, user } = review;
  const ratingPercent = `${(Math.round(rating) / 5) * 100}%`;

  const reviewDate = new Date(date);
  const formattedDate = reviewDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={user.avatarUrl} width="54" height="54" alt="Reviews avatar" />
        </div>
        <span className="reviews__user-name">
          {user.name}
        </span>
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
        <time className="reviews__time" dateTime={date}>{formattedDate}</time>
      </div>
    </li>
  );
}

export default Review;
