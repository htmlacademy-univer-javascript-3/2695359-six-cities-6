import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CityName, SortType } from '../../const';

type AppState = {
  city: CityName;
  sortType: SortType;
};

const initialState: AppState = {
  city: 'Paris',
  sortType: SortType.Popular,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    changeCity: (state, action: PayloadAction<CityName>) => {
      state.city = action.payload;
    },
    changeSorting: (state, action: PayloadAction<SortType>) => {
      state.sortType = action.payload;
    },
  },
});

export const { changeCity, changeSorting } = appSlice.actions;
export default appSlice.reducer;
