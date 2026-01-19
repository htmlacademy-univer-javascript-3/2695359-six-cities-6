import { describe, it, expect } from 'vitest';
import appReducer, { changeCity, changeSorting } from './appSlice';
import { SortType } from '../../const';

describe('appSlice', () => {
  const initialState = {
    city: 'Paris' as const,
    sortType: SortType.Popular,
  };

  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const result = appReducer(undefined, emptyAction);

    expect(result).toEqual(initialState);
  });

  it('should change city with "changeCity" action', () => {
    const expectedCity = 'Amsterdam';
    const result = appReducer(initialState, changeCity(expectedCity));

    expect(result.city).toBe(expectedCity);
  });

  it('should change sort type with "changeSorting" action', () => {
    const expectedSortType = SortType.PriceLowToHigh;
    const result = appReducer(initialState, changeSorting(expectedSortType));

    expect(result.sortType).toBe(expectedSortType);
  });
});
