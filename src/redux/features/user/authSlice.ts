import { createSlice } from '@reduxjs/toolkit';
import { storage, StorageKeys } from '../../../utils/storage';

interface SliceState {
  accessToken?: string | null;
}

const authSlice = createSlice({
  name: 'auth',
  initialState: (): SliceState => {
    const accessToken = storage.getString(StorageKeys.User);
    return {
      accessToken: accessToken,
    };
  },
  reducers: {
    setAccessToken: (state, { payload }) => {
      state.accessToken = payload;
      storage.set(StorageKeys.User, payload);
    },
  },
});

export const { setAccessToken } = authSlice.actions;

export default authSlice.reducer;
