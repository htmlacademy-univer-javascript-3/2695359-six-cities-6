export const CITIES = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'] as const;

export type CityName = typeof CITIES[number];

export const SortType = {
  Popular: 'Popular',
  PriceLowToHigh: 'Price: low to high',
  PriceHighToLow: 'Price: high to low',
  TopRatedFirst: 'Top rated first',
} as const;

export type SortType = typeof SortType[keyof typeof SortType];

export const SORT_TYPES = [
  SortType.Popular,
  SortType.PriceLowToHigh,
  SortType.PriceHighToLow,
  SortType.TopRatedFirst,
] as const;

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const TOKEN_KEY = 'six-cities-token';
