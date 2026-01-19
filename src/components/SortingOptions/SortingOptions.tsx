import { memo, useState, useCallback } from 'react';
import { SortType, SORT_TYPES } from '../../const';

type SortingOptionsProps = {
  currentSort: SortType;
  onSortChange: (sortType: SortType) => void;
};

function SortingOptions({ currentSort, onSortChange }: SortingOptionsProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleOptionClick = useCallback((sortType: SortType) => {
    onSortChange(sortType);
    setIsOpen(false);
  }, [onSortChange]);

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0} onClick={handleToggle}>
        {currentSort}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isOpen ? 'places__options--opened' : ''}`}>
        {SORT_TYPES.map((sortType) => (
          <li
            className={`places__option ${currentSort === sortType ? 'places__option--active' : ''}`}
            tabIndex={0}
            key={sortType}
            onClick={() => handleOptionClick(sortType)}
          >
            {sortType}
          </li>
        ))}
      </ul>
    </form>
  );
}

export default memo(SortingOptions);
