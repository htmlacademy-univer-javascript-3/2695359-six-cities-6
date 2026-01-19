import { useCallback, useMemo, useState } from 'react';
import OffersList from '../OffersList/OffersList';
import Map from '../Map/Map';
import CitiesList from '../CitiesList/CitiesList';
import SortingOptions from '../SortingOptions/SortingOptions';
import Header from '../Header/Header';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeCity, changeSorting } from '../../store/slices/appSlice';
import { selectCity, selectSortType, selectSortedCityOffers } from '../../store/selectors';
import { CityName, SortType } from '../../const';

function MainPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const currentCity = useAppSelector(selectCity);
  const currentSortType = useAppSelector(selectSortType);
  const offers = useAppSelector(selectSortedCityOffers);

  const [selectedOfferId, setSelectedOfferId] = useState<string | null>(null);

  const handleOfferHover = useCallback((offerId: string | null) => {
    setSelectedOfferId(offerId);
  }, []);

  const handleCityChange = useCallback((city: CityName) => {
    dispatch(changeCity(city));
  }, [dispatch]);

  const handleSortChange = useCallback((sortType: SortType) => {
    dispatch(changeSorting(sortType));
  }, [dispatch]);

  const placesCount = offers.length;
  const selectedOffer = useMemo(
    () => offers.find((offer) => offer.id === selectedOfferId) || null,
    [offers, selectedOfferId]
  );
  const city = offers[0]?.city;

  return (
    <div className="page page--gray page--main">
      <Header />

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <CitiesList currentCity={currentCity} onCityChange={handleCityChange} />
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{placesCount} places to stay in {currentCity}</b>
              <SortingOptions currentSort={currentSortType} onSortChange={handleSortChange} />
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
