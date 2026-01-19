import { configureStore } from '@reduxjs/toolkit';
import { createAPI } from '../services/api';
import appReducer from './slices/appSlice';
import offersReducer from './slices/offersSlice';
import offerReducer from './slices/offerSlice';
import reviewsReducer from './slices/reviewsSlice';
import userReducer from './slices/userSlice';

const api = createAPI();

export const store = configureStore({
  reducer: {
    app: appReducer,
    offers: offersReducer,
    offer: offerReducer,
    reviews: reviewsReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
