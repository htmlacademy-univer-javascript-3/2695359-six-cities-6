import { Offer } from '../types/offer';
import { SortType } from '../const';

export const sortOffers = (offers: Offer[], sortType: SortType): Offer[] => {
  const sorted = [...offers];

  switch (sortType) {
    case SortType.PriceLowToHigh:
      return sorted.sort((a, b) => a.price - b.price);
    case SortType.PriceHighToLow:
      return sorted.sort((a, b) => b.price - a.price);
    case SortType.TopRatedFirst:
      return sorted.sort((a, b) => b.rating - a.rating);
    case SortType.Popular:
    default:
      return sorted;
  }
};
