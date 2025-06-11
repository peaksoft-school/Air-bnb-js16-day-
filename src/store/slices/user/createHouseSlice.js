import { createSlice } from '@reduxjs/toolkit';
import { createHouseBase } from './createHouseThunk';

const createHouseSlice = createSlice({
  name: 'createHouse',
  initialState: {
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    resetState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createHouseBase.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createHouseBase.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(createHouseBase.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || 'Ошибка при создании дома';
      });
  },
});

export const { resetState } = createHouseSlice.actions;
export default createHouseSlice.reducer;