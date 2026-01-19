import { memo, useCallback } from 'react';
import { CityName, CITIES } from '../../const';

type CitiesListProps = {
  currentCity: CityName;
  onCityChange: (city: CityName) => void;
};

function CitiesList({ currentCity, onCityChange }: CitiesListProps): JSX.Element {
  const handleCityClick = useCallback((city: CityName) => {
    onCityChange(city);
  }, [onCityChange]);

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {CITIES.map((city) => (
            <li key={city} className="locations__item">
              <a
                className={`locations__item-link tabs__item ${currentCity === city ? 'tabs__item--active' : ''}`}
                href="#"
                onClick={(evt) => {
                  evt.preventDefault();
                  handleCityClick(city);
                }}
              >
                <span>{city}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default memo(CitiesList);
