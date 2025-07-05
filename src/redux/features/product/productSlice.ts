import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductType } from '../../../utils/types';
import { storage, StorageKeys } from '../../../utils/storage';

interface SliceState {
  favouriteItems: ProductType[];
}

const initialState: SliceState = {
  favouriteItems: [],
};

const productSlice = createSlice({
  name: 'product',
  initialState: (): SliceState => {
    const favouriteItemsJson = storage.getString(StorageKeys.Favourite);
    if (favouriteItemsJson) {
      const favouriteItems = JSON.parse(favouriteItemsJson);
      return {
        ...initialState,
        favouriteItems: favouriteItems,
      };
    } else {
      return initialState;
    }
  },
  reducers: {
    setFavouriteItem: (state, action: PayloadAction<ProductType>) => {
      const isFavourite = state.favouriteItems.findIndex(
        i => i.id === action.payload.id,
      );
      if (isFavourite === -1) {
        state.favouriteItems.unshift(action.payload);
      } else {
        const rest = state.favouriteItems.filter(
          i => i.id !== action.payload.id,
        );
        state.favouriteItems = rest;
      }
      storage.set(StorageKeys.Favourite, JSON.stringify(state.favouriteItems));
    },
  },
});

export const { setFavouriteItem } = productSlice.actions;
export default productSlice.reducer;
