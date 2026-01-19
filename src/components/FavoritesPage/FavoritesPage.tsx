import { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import PlaceCard from '../PlaceCard/PlaceCard';
import Spinner from '../Spinner/Spinner';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectFavorites, selectFavoritesLoading } from '../../store/selectors';
import { fetchFavoritesAction } from '../../store/actions/favoritesActions';
import { Offer } from '../../types/offer';

function FavoritesPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector(selectFavorites);
  const isLoading = useAppSelector(selectFavoritesLoading);

  useEffect(() => {
    dispatch(fetchFavoritesAction());
  }, [dispatch]);

  const offersByCity = useMemo(() =>
    favorites.reduce<Record<string, Offer[]>>((acc, offer) => {
      if (!acc[offer.city.name]) {
        acc[offer.city.name] = [];
      }
      acc[offer.city.name].push(offer);
      return acc;
    }, {}), [favorites]
  );

  if (isLoading) {
    return <Spinner />;
  }

  const isEmpty = favorites.length === 0;

  if (isEmpty) {
    return (
      <div className="page page--favorites-empty">
        <Header />

        <main className="page__main page__main--favorites page__main--favorites-empty">
          <div className="page__favorites-container container">
            <section className="favorites favorites--empty">
              <h1 className="visually-hidden">Favorites (empty)</h1>
              <div className="favorites__status-wrapper">
                <b className="favorites__status">Nothing yet saved.</b>
                <p className="favorites__status-description">
                  Save properties to narrow down search or plan your future trips.
                </p>
              </div>
            </section>
          </div>
        </main>
        <footer className="footer">
          <Link className="footer__logo-link" to="/">
            <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
          </Link>
        </footer>
      </div>
    );
  }

  return (
    <div className="page">
      <Header />

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {Object.entries(offersByCity).map(([city, cityOffers]) => (
                <li className="favorites__locations-items" key={city}>
                  <div className="favorites__locations locations locations--current">
                    <div className="locations__item">
                      <Link className="locations__item-link" to="/">
                        <span>{city}</span>
                      </Link>
                    </div>
                  </div>
                  <div className="favorites__places">
                    {cityOffers.map((offer) => (
                      <PlaceCard key={offer.id} offer={offer} cardType="favorites" />
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <Link className="footer__logo-link" to="/">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </Link>
      </footer>
    </div>
  );
}

export default FavoritesPage;
