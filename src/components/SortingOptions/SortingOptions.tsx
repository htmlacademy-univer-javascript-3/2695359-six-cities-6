import { useState } from 'react';
import { SortType, SORT_TYPES } from '../../const';

type SortingOptionsProps = {
  currentSort: SortType;
  onSortChange: (sortType: SortType) => void;
};

function SortingOptions({ currentSort, onSortChange }: SortingOptionsProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSortClick = (sortType: SortType) => {
    onSortChange(sortType);
    setIsOpen(false);
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={handleToggle}
      >
        {currentSort}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isOpen ? 'places__options--opened' : ''}`}>
        {SORT_TYPES.map((sortType) => (
          <li
            key={sortType}
            className={`places__option ${sortType === currentSort ? 'places__option--active' : ''}`}
            tabIndex={0}
            onClick={() => handleSortClick(sortType)}
          >
            {sortType}
          </li>
        ))}
      </ul>
    </form>
  );
}

export default SortingOptions;
