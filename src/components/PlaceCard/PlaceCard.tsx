import { memo, useMemo, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Offer } from '../../types/offer';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { toggleFavoriteAction } from '../../store/actions/favoritesActions';
import { selectAuthorizationStatus } from '../../store/selectors';
import { AuthorizationStatus } from '../../const';

type PlaceCardProps = {
  offer: Offer;
  onMouseEnter?: (id: string) => void;
  onMouseLeave?: () => void;
  cardType?: 'cities' | 'favorites' | 'near-places';
};

const PlaceCard = memo(({ offer, onMouseEnter, onMouseLeave, cardType = 'cities' }: PlaceCardProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authorizationStatus = useAppSelector(selectAuthorizationStatus);
  const { id, title, type, price, isFavorite, isPremium, rating, previewImage } = offer;

  const ratingPercent = useMemo(() => `${(Math.round(rating) / 5) * 100}%`, [rating]);

  const handleMouseEnter = () => {
    if (onMouseEnter) {
      onMouseEnter(id);
    }
  };

  const handleMouseLeave = () => {
    if (onMouseLeave) {
      onMouseLeave();
    }
  };

  const handleFavoriteClick = useCallback(() => {
    if (authorizationStatus !== AuthorizationStatus.Auth) {
      navigate('/login');
      return;
    }

    dispatch(toggleFavoriteAction({ offerId: id, status: isFavorite ? 0 : 1 }));
  }, [authorizationStatus, dispatch, id, isFavorite, navigate]);

  let cardClassName = 'cities__card';
  let imageWrapperClassName = 'cities__image-wrapper';
  let imageWidth = 260;
  let imageHeight = 200;
  let cardInfoClassName = '';

  if (cardType === 'favorites') {
    cardClassName = 'favorites__card';
    imageWrapperClassName = 'favorites__image-wrapper';
    imageWidth = 150;
    imageHeight = 110;
    cardInfoClassName = 'favorites__card-info';
  } else if (cardType === 'near-places') {
    cardClassName = 'near-places__card';
    imageWrapperClassName = 'near-places__image-wrapper';
  }

  return (
    <article
      className={`${cardClassName} place-card`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className={`${imageWrapperClassName} place-card__image-wrapper`}>
        <Link to={`/offer/${id}`}>
          <img className="place-card__image" src={previewImage} width={imageWidth} height={imageHeight} alt="Place image" />
        </Link>
      </div>
      <div className={`${cardInfoClassName} place-card__info`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button button ${isFavorite ? 'place-card__bookmark-button--active' : ''}`}
            type="button"
            onClick={handleFavoriteClick}
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">{isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: ratingPercent }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
});

PlaceCard.displayName = 'PlaceCard';

export default PlaceCard;
