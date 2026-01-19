import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Offer, OfferDetail } from '../../types/offer';
import { fetchOfferAction, fetchNearbyOffersAction } from '../actions/offerActions';
import { toggleFavoriteAction } from '../actions/favoritesActions';

type OfferState = {
  currentOffer: OfferDetail | null;
  nearbyOffers: Offer[];
  isLoading: boolean;
};

const initialState: OfferState = {
  currentOffer: null,
  nearbyOffers: [],
  isLoading: false,
};

const offerSlice = createSlice({
  name: 'offer',
  initialState,
  reducers: {
    setCurrentOffer: (state, action: PayloadAction<OfferDetail | null>) => {
      state.currentOffer = action.payload;
    },
    setNearbyOffers: (state, action: PayloadAction<Offer[]>) => {
      state.nearbyOffers = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOfferAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchOfferAction.fulfilled, (state, action) => {
        state.currentOffer = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchOfferAction.rejected, (state) => {
        state.isLoading = false;
        state.currentOffer = null;
      })
      .addCase(fetchNearbyOffersAction.fulfilled, (state, action) => {
        state.nearbyOffers = action.payload;
      })
      .addCase(toggleFavoriteAction.fulfilled, (state, action) => {
        const updatedOffer = action.payload;
        if (state.currentOffer && state.currentOffer.id === updatedOffer.id) {
          state.currentOffer.isFavorite = updatedOffer.isFavorite;
        }
        const nearbyIndex = state.nearbyOffers.findIndex((offer) => offer.id === updatedOffer.id);
        if (nearbyIndex !== -1) {
          state.nearbyOffers[nearbyIndex] = updatedOffer;
        }
      });
  },
});

export const { setCurrentOffer, setNearbyOffers } = offerSlice.actions;
export default offerSlice.reducer;
