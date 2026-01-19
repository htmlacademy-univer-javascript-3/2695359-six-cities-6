import { useState } from 'react';
import { Link } from 'react-router-dom';
import OffersList from '../OffersList/OffersList';
import Map from '../Map/Map';
import CitiesList from '../CitiesList/CitiesList';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeCity } from '../../store/action';
import { CityName } from '../../const';

function MainPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const currentCity = useAppSelector((state) => state.city);
  const allOffers = useAppSelector((state) => state.offers);

  const offers = allOffers.filter((offer) => offer.city.name === currentCity);
  const placesCount = offers.length;
  const [selectedOfferId, setSelectedOfferId] = useState<string | null>(null);

  const handleOfferHover = (offerId: string | null) => {
    setSelectedOfferId(offerId);
  };

  const handleCityChange = (city: CityName) => {
    dispatch(changeCity(city));
  };

  const selectedOffer = offers.find((offer) => offer.id === selectedOfferId) || null;
  const city = offers[0]?.city;
  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link header__logo-link--active" to="/">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </Link>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="#">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                    <span className="header__favorite-count">3</span>
                  </a>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <CitiesList currentCity={currentCity} onCityChange={handleCityChange} />
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{placesCount} places to stay in {currentCity}</b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={0}>
                  Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                  <li className="places__option" tabIndex={0}>Price: low to high</li>
                  <li className="places__option" tabIndex={0}>Price: high to low</li>
                  <li className="places__option" tabIndex={0}>Top rated first</li>
                </ul>
              </form>
              <OffersList offers={offers} onOfferHover={handleOfferHover} />
            </section>
            <div className="cities__right-section">
              {city && <Map city={city} offers={offers} selectedOffer={selectedOffer} />}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainPage;
