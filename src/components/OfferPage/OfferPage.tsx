import { useEffect, useMemo, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import Spinner from '../Spinner/Spinner';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import ReviewsList from '../ReviewsList/ReviewsList';
import ReviewForm from '../ReviewForm/ReviewForm';
import Map from '../Map/Map';
import PlaceCard from '../PlaceCard/PlaceCard';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchOfferAction, fetchNearbyOffersAction } from '../../store/actions/offerActions';
import { fetchReviewsAction } from '../../store/actions/reviewsActions';
import { toggleFavoriteAction } from '../../store/actions/favoritesActions';
import { selectCurrentOffer, selectNearbyOffers, selectOfferLoading, selectAuthorizationStatus } from '../../store/selectors';
import { AuthorizationStatus } from '../../const';

function OfferPage(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const currentOffer = useAppSelector(selectCurrentOffer);
  const nearbyOffers = useAppSelector(selectNearbyOffers);
  const isLoading = useAppSelector(selectOfferLoading);
  const authorizationStatus = useAppSelector(selectAuthorizationStatus);

  useEffect(() => {
    if (id) {
      dispatch(fetchOfferAction(id));
      dispatch(fetchNearbyOffersAction(id));
      dispatch(fetchReviewsAction(id));
    }
  }, [dispatch, id]);

  const ratingPercent = useMemo(
    () => currentOffer ? `${(Math.round(currentOffer.rating) / 5) * 100}%` : '0%',
    [currentOffer]
  );

  const offersForMap = useMemo(
    () => currentOffer ? [currentOffer, ...nearbyOffers] : nearbyOffers,
    [currentOffer, nearbyOffers]
  );

  const handleOfferHover = useCallback(() => {}, []);

  const handleFavoriteClick = useCallback(() => {
    if (!currentOffer) {
      return;
    }

    if (authorizationStatus !== AuthorizationStatus.Auth) {
      navigate('/login');
      return;
    }

    dispatch(toggleFavoriteAction({
      offerId: currentOffer.id,
      status: currentOffer.isFavorite ? 0 : 1,
    }));
  }, [authorizationStatus, currentOffer, dispatch, navigate]);

  if (isLoading) {
    return <Spinner />;
  }

  if (!currentOffer) {
    return <NotFoundPage />;
  }

  return (
    <div className="page">
      <Header />

      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {currentOffer.images.slice(0, 6).map((image) => (
                <div key={image} className="offer__image-wrapper">
                  <img className="offer__image" src={image} alt="Photo studio" />
                </div>
              ))}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {currentOffer.isPremium && (
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
              )}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {currentOffer.title}
                </h1>
                <button
                  className={`offer__bookmark-button button ${currentOffer.isFavorite ? 'offer__bookmark-button--active' : ''}`}
                  type="button"
                  onClick={handleFavoriteClick}
                >
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">{currentOffer.isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{ width: ratingPercent }}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{currentOffer.rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {currentOffer.type}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {currentOffer.bedrooms} {currentOffer.bedrooms === 1 ? 'Bedroom' : 'Bedrooms'}
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {currentOffer.maxAdults} {currentOffer.maxAdults === 1 ? 'adult' : 'adults'}
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{currentOffer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {currentOffer.goods.map((good) => (
                    <li key={good} className="offer__inside-item">
                      {good}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className={`offer__avatar-wrapper user__avatar-wrapper ${currentOffer.host.isPro ? 'offer__avatar-wrapper--pro' : ''}`}>
                    <img className="offer__avatar user__avatar" src={currentOffer.host.avatarUrl} width="74" height="74" alt="Host avatar" />
                  </div>
                  <span className="offer__user-name">
                    {currentOffer.host.name}
                  </span>
                  {currentOffer.host.isPro && (
                    <span className="offer__user-status">
                      Pro
                    </span>
                  )}
                </div>
                <div className="offer__description">
                  <p className="offer__text">
                    {currentOffer.description}
                  </p>
                </div>
              </div>
              <section className="offer__reviews reviews">
                <ReviewsList />
                {authorizationStatus === AuthorizationStatus.Auth && <ReviewForm offerId={currentOffer.id} />}
              </section>
            </div>
          </div>
          <Map city={currentOffer.city} offers={offersForMap} selectedOffer={currentOffer} className="offer__map" />
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              {nearbyOffers.map((nearbyOffer) => (
                <PlaceCard
                  key={nearbyOffer.id}
                  offer={nearbyOffer}
                  cardType="near-places"
                  onMouseEnter={handleOfferHover}
                  onMouseLeave={handleOfferHover}
                />
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default OfferPage;
