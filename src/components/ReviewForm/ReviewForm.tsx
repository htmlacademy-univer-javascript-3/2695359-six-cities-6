import { useState, ChangeEvent, FormEvent } from 'react';
import { useAppDispatch } from '../../hooks';
import { postReviewAction } from '../../store/action';

const RATING_VALUES = [
  { value: 5, title: 'perfect' },
  { value: 4, title: 'good' },
  { value: 3, title: 'not bad' },
  { value: 2, title: 'badly' },
  { value: 1, title: 'terribly' },
];

const MIN_REVIEW_LENGTH = 50;
const MAX_REVIEW_LENGTH = 300;

type ReviewFormProps = {
  offerId: string;
};

function ReviewForm({ offerId }: ReviewFormProps): JSX.Element {
  const dispatch = useAppDispatch();
  const [rating, setRating] = useState<number>(0);
  const [review, setReview] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const isFormValid = rating > 0 && review.length >= MIN_REVIEW_LENGTH && review.length <= MAX_REVIEW_LENGTH;

  const handleRatingChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRating(Number(event.target.value));
  };

  const handleReviewChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setReview(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isFormValid && !isSubmitting) {
      setIsSubmitting(true);
      dispatch(postReviewAction({ offerId, comment: review, rating }))
        .unwrap()
        .then(() => {
          setRating(0);
          setReview('');
        })
        .catch(() => {})
        .finally(() => {
          setIsSubmitting(false);
        });
    }
  };

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {RATING_VALUES.map(({ value, title }) => (
          <div key={value}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={value}
              id={`${value}-stars`}
              type="radio"
              checked={rating === value}
              onChange={handleRatingChange}
              disabled={isSubmitting}
            />
            <label
              htmlFor={`${value}-stars`}
              className="reviews__rating-label form__rating-label"
              title={title}
            >
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </div>
        ))}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={review}
        onChange={handleReviewChange}
        disabled={isSubmitting}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={!isFormValid || isSubmitting}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default ReviewForm;
